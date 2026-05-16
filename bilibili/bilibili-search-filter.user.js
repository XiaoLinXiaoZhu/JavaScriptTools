// ==UserScript==
// @name                Bilibili 视频质量筛选器
// @namespace           http://tampermonkey.net/
// @version             1.0.1
// @description         通过播放量和UP主粉丝量加权筛选低质量视频，并使用毛玻璃遮罩
// @author              XLXZ
// @license             MIT
// @match               *://search.bilibili.com/*
// @connect             api.bilibili.com
// @grant               GM_xmlhttpRequest
// @grant               GM_setValue
// @grant               GM_getValue
// @grant               GM_addStyle
// @grant               GM_registerMenuCommand
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/bilibili/bilibili-search-filter.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/bilibili/bilibili-search-filter.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/bilibili-search-filter/style.css
  var style_default = '/* \u6BDB\u73BB\u7483\u906E\u7F69\u57FA\u7840\u6837\u5F0F */\n.qf-low-quality {\n  position: relative !important;\n}\n.qf-low-quality::before {\n  content: "\u4F4E\u8D28\u91CF\u89C6\u9891\u5DF2\u9690\u85CF";\n  position: absolute;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: rgba(255, 255, 255, 0.3);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  z-index: 100;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #666;\n  font-size: 14px;\n  font-weight: bold;\n  pointer-events: auto;\n  transition: opacity 0.3s;\n  border-radius: 8px;\n}\n.qf-low-quality:hover::before {\n  opacity: 0;\n  pointer-events: none;\n}\n\n/* \u96C6\u6210\u5230\u641C\u7D22\u6761\u4EF6\u884C\u7684\u6837\u5F0F */\n.qf-search-condition-row {\n  display: flex;\n  align-items: center;\n  padding: 8px 0;\n  border-bottom: 1px solid #e7e7e7;\n}\n.qf-search-condition-row:last-child {\n  border-bottom: none;\n}\n.qf-condition-label {\n  display: inline-block;\n  width: 80px;\n  font-size: 13px;\n  color: #222;\n  font-weight: 500;\n  margin-right: 10px;\n}\n.qf-condition-controls {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n}\n.qf-condition-input {\n  flex: 1;\n  height: 28px;\n  padding: 0 8px;\n  border: 1px solid #e7e7e7;\n  border-radius: 4px;\n  font-size: 12px;\n  outline: none;\n  transition: border-color 0.2s;\n}\n.qf-condition-input:hover {\n  border-color: #fb7299;\n}\n.qf-condition-input:focus {\n  border-color: #fb7299;\n  box-shadow: 0 0 0 2px rgba(251, 114, 153, 0.1);\n}\n.qf-condition-value {\n  display: inline-block;\n  min-width: 30px;\n  text-align: center;\n  font-size: 12px;\n  color: #666;\n}\n.qf-save-btn {\n  background: #fb7299;\n  color: #fff;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n  transition: background-color 0.2s;\n}\n.qf-save-btn:hover {\n  background: #f57fb9;\n}\n';

  // src/bilibili-search-filter/index.ts
  GM_addStyle(style_default);
  var CONFIG = {
    playWeight: GM_getValue("playWeight", 50),
    fansWeight: GM_getValue("fansWeight", 50),
    threshold: GM_getValue("threshold", 30),
    blurIntensity: GM_getValue("blurIntensity", 10),
    cacheTTL: 24 * 60 * 60 * 1e3
    // 24小时缓存
  };
  var FANS_CACHE = JSON.parse(
    GM_getValue("fansCache", "{}")
  );
  function parseBiliNum(str) {
    if (!str) return 0;
    str = str.trim();
    if (str.includes("\u4E07")) return parseFloat(str) * 1e4;
    if (str.includes("\u4EBF")) return parseFloat(str) * 1e8;
    return parseInt(str.replace(/,/g, "")) || 0;
  }
  __name(parseBiliNum, "parseBiliNum");
  async function getFansCount(mid) {
    const now = Date.now();
    if (FANS_CACHE[mid] && now - FANS_CACHE[mid].ts < CONFIG.cacheTTL) {
      return FANS_CACHE[mid].count;
    }
    return new Promise((resolve) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: `https://api.bilibili.com/x/web-interface/card?mid=${mid}`,
        onload(res) {
          try {
            const data = JSON.parse(res.responseText);
            const fans = data.data.card.fans;
            FANS_CACHE[mid] = { count: fans, ts: now };
            GM_setValue("fansCache", JSON.stringify(FANS_CACHE));
            resolve(fans);
          } catch {
            resolve(0);
          }
        },
        onerror: /* @__PURE__ */ __name(() => resolve(0), "onerror")
      });
    });
  }
  __name(getFansCount, "getFansCount");
  function calculateScore(plays, fans) {
    const playScore = Math.min(100, Math.log10(plays + 1) / 6 * 100);
    const fansScore = Math.min(100, Math.log10(fans + 1) / 6 * 100);
    return playScore * (CONFIG.playWeight / 100) + fansScore * (CONFIG.fansWeight / 100);
  }
  __name(calculateScore, "calculateScore");
  async function processCard(card) {
    if (card.dataset.qfProcessed) return;
    card.dataset.qfProcessed = "true";
    const statsText = card.querySelector(".bili-video-card__stats--item span")?.textContent;
    const plays = parseBiliNum(statsText);
    const midLink = card.querySelector('a[href*="space.bilibili.com/"]');
    const midMatch = midLink?.href.match(/space\.bilibili\.com\/(\d+)/);
    const mid = midMatch ? midMatch[1] : null;
    if (!mid) return;
    const fans = await getFansCount(mid);
    const score = calculateScore(plays, fans);
    if (score < CONFIG.threshold) {
      card.classList.add("qf-low-quality");
    }
  }
  __name(processCard, "processCard");
  var cardObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        const el = node;
        const cards = el.classList.contains("bili-video-card") ? [el] : Array.from(el.querySelectorAll(".bili-video-card"));
        cards.forEach(processCard);
      });
    }
  });
  function createSettings() {
    const container = document.createElement("div");
    container.className = "qf-search-condition-row";
    container.id = "qf-settings-row";
    container.innerHTML = `
    <span class="qf-condition-label">\u8D28\u91CF\u8FC7\u6EE4</span>
    <div class="qf-condition-controls">
      <div style="display: flex; align-items: center; gap: 4px; flex: 1;">
        <label style="font-size: 12px; color: #666;">\u64AD\u653E\u6743\u91CD:</label>
        <input type="range" id="qf-in-pw" class="qf-condition-input" min="0" max="100" value="${CONFIG.playWeight}" style="flex: 0.5;">
        <span id="qf-val-pw" class="qf-condition-value">${CONFIG.playWeight}%</span>
      </div>
      <div style="display: flex; align-items: center; gap: 4px; flex: 1;">
        <label style="font-size: 12px; color: #666;">\u7C89\u4E1D\u6743\u91CD:</label>
        <input type="range" id="qf-in-fw" class="qf-condition-input" min="0" max="100" value="${CONFIG.fansWeight}" style="flex: 0.5;">
        <span id="qf-val-fw" class="qf-condition-value">${CONFIG.fansWeight}%</span>
      </div>
      <div style="display: flex; align-items: center; gap: 4px; flex: 1;">
        <label style="font-size: 12px; color: #666;">\u9608\u503C:</label>
        <input type="range" id="qf-in-th" class="qf-condition-input" min="0" max="100" value="${CONFIG.threshold}" style="flex: 0.5;">
        <span id="qf-val-th" class="qf-condition-value">${CONFIG.threshold}</span>
      </div>
      <button class="qf-save-btn">\u4FDD\u5B58</button>
    </div>
  `;
    container.querySelector("#qf-in-pw").oninput = (e) => {
      document.getElementById("qf-val-pw").textContent = e.target.value + "%";
    };
    container.querySelector("#qf-in-fw").oninput = (e) => {
      document.getElementById("qf-val-fw").textContent = e.target.value + "%";
    };
    container.querySelector("#qf-in-th").oninput = (e) => {
      document.getElementById("qf-val-th").textContent = e.target.value;
    };
    container.querySelector(".qf-save-btn").onclick = () => {
      GM_setValue("playWeight", parseInt(container.querySelector("#qf-in-pw").value));
      GM_setValue("fansWeight", parseInt(container.querySelector("#qf-in-fw").value));
      GM_setValue("threshold", parseInt(container.querySelector("#qf-in-th").value));
      location.reload();
    };
    return container;
  }
  __name(createSettings, "createSettings");
  function insertSettingsIntoMoreConditions() {
    const moreConditionsContainer = document.querySelector(".more-conditions");
    if (!moreConditionsContainer) return;
    if (document.getElementById("qf-settings-row")) return;
    const settingsRow = createSettings();
    moreConditionsContainer.appendChild(settingsRow);
  }
  __name(insertSettingsIntoMoreConditions, "insertSettingsIntoMoreConditions");
  function observeMoreConditions() {
    const settingsObserver = new MutationObserver(() => {
      insertSettingsIntoMoreConditions();
    });
    settingsObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    insertSettingsIntoMoreConditions();
  }
  __name(observeMoreConditions, "observeMoreConditions");
  function init() {
    observeMoreConditions();
    document.querySelectorAll(".bili-video-card").forEach(processCard);
    cardObserver.observe(document.body, { childList: true, subtree: true });
  }
  __name(init, "init");
  if (document.readyState === "complete") init();
  else window.addEventListener("load", init);
})();
