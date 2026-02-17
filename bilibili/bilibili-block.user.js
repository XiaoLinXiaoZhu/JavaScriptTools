// ==UserScript==
// @name                屏蔽B站营销视频和推广视频
// @name:zh-CN          屏蔽B站营销视频和推广视频
// @name:zh-TW          屏蔽B站营销视频和推广视频
// @name:en             Block Bilibili's marketing videos and promotional videos
// @namespace           http://tampermonkey.net/
// @version             2.8
// @description         屏蔽部分B站（bilibili）主页推荐的视频卡片，屏蔽up主粉丝少于一定数量的，屏蔽直播与右侧推广，屏蔽带广告标签的
// @description:zh-CN   屏蔽部分B站（bilibili）主页推荐的视频卡片，屏蔽up主粉丝少于一定数量的，屏蔽直播与右侧推广，屏蔽带广告标签的
// @description:zh-TW   遮罩部分B站（bilibili）主頁推薦的視頻卡片，遮罩up主粉絲少於一定數量的，遮罩直播與右側推廣，遮罩帶廣告標籤的
// @description:en      Block some video cards recommended on the homepage of Bilibili. The rules are to block those from creators with a certain number of small fans, block live streams and right-hand promotion, and block those with advertising tags.
// @author              anonymous
// @license             GNU General Public License v3.0
// @icon                https://www.bilibili.com/favicon.ico
// @match               https://www.bilibili.com/
// @match               https://www.bilibili.com/?spm_id_from=*
// @grant               none
// @downloadURL         https://update.greasyfork.org/scripts/467384/%F0%9F%9B%A0%EF%B8%8F%E5%B1%8F%E8%94%BDB%E7%AB%99%E8%90%A5%E9%94%80%E8%A7%86%E9%A2%91.user.js
// @updateURL           https://update.greasyfork.org/scripts/467384/%F0%9F%9B%A0%EF%B8%8F%E5%B1%8F%E8%94%BDB%E7%AB%99%E8%90%A5%E9%94%80%E8%A7%86%E9%A2%91.meta.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/bilibili-block/index.ts
  var FILTER_CLASSES = [".bili-feed-card"];
  var FILTER_BLOCK_CLASSES = [".floor-single-card"];
  var FILTER_BLOCK_UIDS = [113560378];
  var MIN_FOLLOWER = 2e3;
  var API_USERDATA = "https://api.bilibili.com/x/relation/stat?vmid=";
  var processedCards = 0;
  function getUid(card) {
    const ownerLink = card.querySelector(
      ".bili-video-card__info--owner"
    );
    if (ownerLink) {
      const uid = ownerLink.href.split("/").pop();
      if (uid && uid.match(/^\d+$/)) {
        return Number(uid);
      } else {
        logMessages += `\u{1F7E2}remove becouse can't get uid: ${processedCards}, uid: ${uid}
`;
        return -1;
      }
    }
    logMessages += `\u{1F7E2}remove becouse can't get ownerLink, processedCards: ${processedCards}, ownerLink: ${ownerLink}
`;
    return -1;
  }
  __name(getUid, "getUid");
  async function getFollower(uid) {
    const response = await fetch(`${API_USERDATA}${uid}`);
    logMessages += `\u{1F7E2}getFollower, uid: ${uid}
`;
    const data = await response.json();
    if (data.code === 0) {
      return data.data.follower;
    } else {
      logMessages += `\u{1F534}getFollower error, uid: ${uid}, message: ${data.message}
`;
      return -1;
    }
  }
  __name(getFollower, "getFollower");
  async function editCards(card) {
    processedCards++;
    const uid = getUid(card);
    if (uid === -1) {
      logMessages += `\u{1F7E2}remove because getUid error, uid: ${uid}
`;
      removeCard(card);
      return;
    }
    if (FILTER_BLOCK_UIDS.includes(uid)) {
      logMessages += `\u{1F7E2}remove because uid in FILTER_BLOCK_UIDS, uid: ${uid}
`;
      removeCard(card);
      return;
    }
    const follower = await getFollower(uid);
    if (follower === -1) {
      console.log(`\u{1F534}keep because getFollower error, uid: ${uid}`);
      return;
    }
    if (follower < MIN_FOLLOWER) {
      logMessages += `\u{1F7E2}remove because follower < ${MIN_FOLLOWER}, uid: ${uid}, follower: ${follower}
`;
      removeCard(card);
      return;
    }
  }
  __name(editCards, "editCards");
  function removeCard(card) {
    card.remove();
  }
  __name(removeCard, "removeCard");
  function removeIfBlockByADBlocker(card) {
    const cardContent = card.querySelector(".bili-video-card.is-rcmd");
    if (!cardContent || cardContent.innerHTML.match(
      /<!----><div class=".+?"><\/div><!---->/
    )) {
      removeCard(card);
      return true;
    }
    return false;
  }
  __name(removeIfBlockByADBlocker, "removeIfBlockByADBlocker");
  var isProcessing = false;
  var observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          editCards(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px", threshold: 0.2 }
  );
  function observeNewCards() {
    const blockCards = document.querySelectorAll(
      FILTER_BLOCK_CLASSES.join(", ")
    );
    blockCards.forEach((card) => {
      removeCard(card);
    });
    const filterCards = document.querySelectorAll(FILTER_CLASSES.join(", "));
    filterCards.forEach((card) => {
      if (removeIfBlockByADBlocker(card)) return;
      if (card.dataset.processed) return;
      observer.observe(card);
      card.dataset.processed = "true";
    });
  }
  __name(observeNewCards, "observeNewCards");
  var mutationObserver = new MutationObserver((mutations) => {
    if (isProcessing) return;
    isProcessing = true;
    logMessages += `\u{1F913}mutationObserver, mutations: ${mutations.length}
`;
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        observeNewCards();
      }
    });
    isProcessing = false;
  });
  var container = document.querySelector(".container.is-version8");
  if (container) {
    mutationObserver.observe(container, {
      childList: true
    });
  }
  observeNewCards();
  var logMessages = "";
  setInterval(() => {
    if (logMessages === "") return;
    console.log(logMessages);
    logMessages = "";
  }, 1e4);
})();
