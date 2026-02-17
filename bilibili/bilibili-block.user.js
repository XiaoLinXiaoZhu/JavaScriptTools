// ==UserScript==
// @name                屏蔽B站营销视频和推广视频
// @name:zh-CN          屏蔽B站营销视频和推广视频
// @name:zh-TW          屏蔽B站营销视频和推广视频
// @name:en             Block Bilibili's marketing videos and promotional videos
// @namespace           http://tampermonkey.net/
// @version             2.9
// @description         屏蔽部分B站（bilibili）主页推荐的视频卡片，屏蔽up主粉丝少于一定数量的，屏蔽直播与右侧推广，屏蔽带广告标签的
// @description:zh-CN   屏蔽部分B站（bilibili）主页推荐的视频卡片，屏蔽up主粉丝少于一定数量的，屏蔽直播与右侧推广，屏蔽带广告标签的
// @description:zh-TW   遮罩部分B站（bilibili）主頁推薦的視頻卡片，遮罩up主粉絲少於一定數量的，遮罩直播與右側推廣，遮罩帶廣告標籤的
// @description:en      Block some video cards recommended on the homepage of Bilibili. The rules are to block those from creators with a certain number of small fans, block live streams and right-hand promotion, and block those with advertising tags.
// @author              anonymous
// @license             GNU General Public License v3.0
// @icon                https://www.bilibili.com/favicon.ico
// @match               https://www.bilibili.com/
// @match               https://www.bilibili.com/?spm_id_from=*
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_registerMenuCommand
// @downloadURL         https://update.greasyfork.org/scripts/467384/%F0%9F%9B%A0%EF%B8%8F%E5%B1%8F%E8%94%BDB%E7%AB%99%E8%90%A5%E9%94%80%E8%A7%86%E9%A2%91.user.js
// @updateURL           https://update.greasyfork.org/scripts/467384/%F0%9F%9B%A0%EF%B8%8F%E5%B1%8F%E8%94%BDB%E7%AB%99%E8%90%A5%E9%94%80%E8%A7%86%E9%A2%91.meta.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/bilibili-block/index.ts
  var DEFAULT_FILTER_BLOCK_UIDS = [113560378];
  var DEFAULT_MIN_FOLLOWER = 2e3;
  var FILTER_BLOCK_UIDS = GM_getValue(
    "FILTER_BLOCK_UIDS",
    DEFAULT_FILTER_BLOCK_UIDS
  );
  var MIN_FOLLOWER = GM_getValue(
    "MIN_FOLLOWER",
    DEFAULT_MIN_FOLLOWER
  );
  GM_registerMenuCommand("\u2699\uFE0F \u8BBE\u7F6E\u5C4F\u853DUID\u5217\u8868", () => {
    const current = FILTER_BLOCK_UIDS.join(", ");
    const input = prompt(
      "\u8BF7\u8F93\u5165\u9700\u8981\u5C4F\u853D\u7684UID\u5217\u8868\uFF08\u591A\u4E2AUID\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\uFF09\uFF1A\n\n\u4F8B\u5982\uFF1A113560378, 123456789",
      current
    );
    if (input === null) return;
    const parsed = input.split(",").map((s) => s.trim()).filter((s) => /^\d+$/.test(s)).map(Number);
    FILTER_BLOCK_UIDS = parsed;
    GM_setValue("FILTER_BLOCK_UIDS", parsed);
    alert(`\u2705 \u5DF2\u4FDD\u5B58\u5C4F\u853DUID\u5217\u8868\uFF08${parsed.length} \u4E2AUID\uFF09
\u5237\u65B0\u9875\u9762\u540E\u751F\u6548`);
  });
  GM_registerMenuCommand("\u2699\uFE0F \u8BBE\u7F6E\u6700\u4F4E\u7C89\u4E1D\u6570", () => {
    const input = prompt(
      "\u8BF7\u8F93\u5165\u6700\u4F4E\u7C89\u4E1D\u6570\uFF08\u4F4E\u4E8E\u6B64\u6570\u91CF\u7684UP\u4E3B\u89C6\u9891\u5C06\u88AB\u5C4F\u853D\uFF09\uFF1A",
      String(MIN_FOLLOWER)
    );
    if (input === null) return;
    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed < 0) {
      alert("\u274C \u8BF7\u8F93\u5165\u6709\u6548\u7684\u975E\u8D1F\u6574\u6570");
      return;
    }
    MIN_FOLLOWER = parsed;
    GM_setValue("MIN_FOLLOWER", parsed);
    alert(`\u2705 \u5DF2\u4FDD\u5B58\u6700\u4F4E\u7C89\u4E1D\u6570\uFF1A${parsed}
\u5237\u65B0\u9875\u9762\u540E\u751F\u6548`);
  });
  GM_registerMenuCommand("\u{1F4CB} \u67E5\u770B\u5F53\u524D\u914D\u7F6E", () => {
    alert(
      `\u5F53\u524D\u914D\u7F6E\uFF1A

\u5C4F\u853DUID\u5217\u8868\uFF1A${FILTER_BLOCK_UIDS.length > 0 ? FILTER_BLOCK_UIDS.join(", ") : "\uFF08\u7A7A\uFF09"}
\u6700\u4F4E\u7C89\u4E1D\u6570\uFF1A${MIN_FOLLOWER}`
    );
  });
  var FILTER_CLASSES = [".bili-feed-card"];
  var FILTER_BLOCK_CLASSES = [".floor-single-card"];
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
