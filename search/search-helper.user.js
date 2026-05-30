// ==UserScript==
// @name                搜索引擎快捷跳转
// @name:zh-CN          搜索引擎快捷跳转
// @name:en             Search Engine Quick Switch
// @namespace           https://github.com/XiaoLinXiaoZhu/JavaScriptTools
// @version             0.1.0
// @description         在百度、Google、搜狗、360、Bing 等搜索引擎页面添加浮动按钮，一键将当前搜索词切换到其他搜索引擎。
// @description:en      Add a floating button on search engine pages to switch the current query to another search engine with one click.
// @author              XLXZ
// @license             MIT
// @icon                https://www.google.com/s2/favicons?domain=google.com
// @match               *://www.baidu.com/*
// @match               *://www.google.com/search*
// @match               *://www.sogou.com/web*
// @match               *://www.so.com/s*
// @match               *://cn.bing.com/search*
// @match               *://www.bing.com/search*
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_registerMenuCommand
// @grant               GM_addStyle
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/search/search-helper.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/search/search-helper.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/search-helper/index.ts
  var ENGINES = [
    { name: "\u767E\u5EA6", searchUrl: "https://www.baidu.com/s?wd={q}", icon: "B" },
    { name: "Google", searchUrl: "https://www.google.com/search?q={q}", icon: "G" },
    { name: "\u641C\u72D7", searchUrl: "https://www.sogou.com/web?query={q}&ie=utf8", icon: "S" },
    { name: "360", searchUrl: "https://www.so.com/s?q={q}", icon: "3" },
    { name: "Bing", searchUrl: "https://cn.bing.com/search?q={q}", icon: "B" }
  ];
  var KEY_SELECTORS = {
    "www.baidu.com": "#kw",
    "www.google.com": 'input[name="q"]',
    "www.sogou.com": "#upquery",
    "www.so.com": "#input",
    "cn.bing.com": "#sb_form_q",
    "www.bing.com": "#sb_form_q"
  };
  function getQuery() {
    const host = window.location.hostname;
    const selector = KEY_SELECTORS[host];
    if (selector) {
      const input = document.querySelector(selector);
      if (input?.value?.trim()) return input.value.trim();
    }
    const url = window.location.href;
    const patterns = ["wd", "q", "query", "search", "keyword", "word"];
    for (const key of patterns) {
      const m = url.match(new RegExp(`[?&]${key}=([^&]+)`, "i"));
      if (m) {
        try {
          return decodeURIComponent(m[1].replace(/\+/g, " "));
        } catch {
          return m[1];
        }
      }
    }
    return "";
  }
  __name(getQuery, "getQuery");
  var PANEL_ID = "search-helper-panel";
  function injectStyles() {
    GM_addStyle(`
#${PANEL_ID} {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0.35;
  transition: opacity 0.2s;
}
#${PANEL_ID}:hover {
  opacity: 1;
}
#${PANEL_ID} .sh-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  transition: transform 0.15s, box-shadow 0.15s;
}
#${PANEL_ID} .sh-btn:hover {
  transform: scale(1.12);
  box-shadow: 0 3px 10px rgba(0,0,0,0.25);
}
#${PANEL_ID} .sh-btn.sh-baidu  { background: #2932e1; }
#${PANEL_ID} .sh-btn.sh-google { background: #4285f4; }
#${PANEL_ID} .sh-btn.sh-sogou  { background: #ff6c00; }
#${PANEL_ID} .sh-btn.sh-360    { background: #3cba3c; }
#${PANEL_ID} .sh-btn.sh-bing   { background: #00809d; }
#${PANEL_ID} .sh-toggle {
  width: 38px;
  height: 22px;
  border: none;
  border-radius: 11px;
  cursor: pointer;
  font-size: 9px;
  background: #999;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  opacity: 0.6;
  transition: opacity 0.15s;
}
#${PANEL_ID} .sh-toggle:hover {
  opacity: 1;
}
  `);
  }
  __name(injectStyles, "injectStyles");
  function createPanel() {
    injectStyles();
    const panel = document.createElement("div");
    panel.id = PANEL_ID;
    const query = getQuery();
    if (!query) return panel;
    for (const engine of ENGINES) {
      const host = window.location.hostname;
      const engineHost = new URL(engine.searchUrl.replace("{q}", "test")).hostname;
      if (host === engineHost) continue;
      const btn = document.createElement("button");
      btn.className = `sh-btn sh-${engine.name.toLowerCase()}`;
      btn.textContent = engine.icon;
      btn.title = `\u5728 ${engine.name} \u4E2D\u641C\u7D22\u300C${query}\u300D`;
      btn.addEventListener("click", () => {
        const url = engine.searchUrl.replace("{q}", encodeURIComponent(query));
        window.open(url, "_blank");
      });
      panel.appendChild(btn);
    }
    const toggle = document.createElement("button");
    toggle.className = "sh-toggle";
    toggle.textContent = "\xD7";
    toggle.title = "\u9690\u85CF\u6309\u94AE";
    toggle.addEventListener("click", () => {
      panel.style.display = "none";
      const show = /* @__PURE__ */ __name(() => {
        panel.style.display = "";
        document.removeEventListener("click", show);
      }, "show");
      setTimeout(() => document.addEventListener("click", show), 100);
    });
    panel.appendChild(toggle);
    return panel;
  }
  __name(createPanel, "createPanel");
  function run() {
    const query = getQuery();
    if (!query) return;
    const panel = createPanel();
    document.body.appendChild(panel);
  }
  __name(run, "run");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
