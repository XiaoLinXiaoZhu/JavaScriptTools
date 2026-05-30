// ==UserScript==
// @name                页面自动展开
// @name:zh-CN          页面自动展开
// @name:en             Auto Expand — Unfold hidden page content
// @namespace           https://github.com/XiaoLinXiaoZhu/JavaScriptTools
// @version             0.1.0
// @description         自动展开 CSDN 文章、百度文库、思创等网站被折叠的页面内容，移除展开提示框。
// @description:en      Auto-expand folded content on CSDN, Baidu Wenku, SiChuang and more websites.
// @author              XLXZ
// @license             MIT
// @icon                https://www.google.com/s2/favicons?domain=csdn.net
// @match               *://blog.csdn.net/*
// @match               *://download.csdn.net/download/*
// @match               *://wenku.csdn.net/answer/*
// @match               *://wenku.baidu.com/view/*
// @match               *://ispacesoft.com/*.html
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_registerMenuCommand
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/auto-expand.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/auto-expand.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/auto-expand/index.ts
  var EXPAND_RULES = [
    // CSDN 博客
    {
      host: "blog.csdn.net",
      removeSelectors: [".guide-box", ".wap-shadowbox", ".readall_box", ".btn_open_app_prompt_div"],
      contentSelectors: [".article_content"],
      clickSelectors: [".hide-preCode-bt"],
      extraScript() {
        document.querySelector(".container-fluid")?.addEventListener("click", (e) => {
          const target = e.target;
          const url = target.getAttribute("data-url");
          if (url) {
            window.location.href = url;
            e.preventDefault();
          }
        });
      }
    },
    // CSDN 下载页
    {
      host: "download.csdn.net",
      removeSelectors: [],
      contentSelectors: [".detail.hidden.no-preview"],
      clickSelectors: ["#download-detail .fl[role]"]
    },
    // CSDN 文库
    {
      host: "wenku.csdn.net",
      removeSelectors: [".guide-box", ".wap-shadowbox", ".readall_box", ".btn_open_app_prompt_div"],
      contentSelectors: [".article_content"],
      clickSelectors: [".hide-preCode-bt"]
    },
    // 百度文库
    {
      host: "wenku.baidu.com",
      removeSelectors: [],
      contentSelectors: [],
      clickSelectors: [".goBtn", ".read-all"]
    },
    // 思创
    {
      host: "ispacesoft.com",
      removeSelectors: [],
      contentSelectors: [],
      clickSelectors: [".entry-readmore-btn"]
    }
  ];
  function applyRule(rule) {
    for (const sel of rule.removeSelectors) {
      document.querySelectorAll(sel).forEach((el) => el.remove());
    }
    for (const sel of rule.clickSelectors) {
      const btn = document.querySelector(sel);
      if (btn) {
        btn.click();
      }
    }
    if (rule.contentSelectors.length > 0) {
      const style = document.createElement("style");
      const css = rule.contentSelectors.map((s) => `${s} { height: auto !important; max-height: none !important; }`).join("\n");
      style.textContent = css;
      document.head.appendChild(style);
    }
    if (rule.extraStyle) {
      const style = document.createElement("style");
      style.textContent = rule.extraStyle;
      document.head.appendChild(style);
    }
    rule.extraScript?.();
  }
  __name(applyRule, "applyRule");
  function run() {
    const hostname = window.location.hostname;
    const rule = EXPAND_RULES.find((r) => r.host === hostname);
    if (!rule) return;
    applyRule(rule);
    const tryAgain = /* @__PURE__ */ __name(() => {
      for (const sel of rule.clickSelectors) {
        const btn = document.querySelector(sel);
        if (btn) {
          btn.click();
        }
      }
    }, "tryAgain");
    setTimeout(tryAgain, 2e3);
    setTimeout(tryAgain, 5e3);
  }
  __name(run, "run");
  function baiduWenkuSpecial() {
    if (!window.location.hostname.includes("wenku.baidu.com")) return;
    const tryClick = /* @__PURE__ */ __name(() => {
      const btn = document.querySelector(".goBtn") ?? document.querySelector(".read-all");
      if (btn) {
        btn.click();
      }
    }, "tryClick");
    setInterval(tryClick, 2e3);
  }
  __name(baiduWenkuSpecial, "baiduWenkuSpecial");
  run();
  baiduWenkuSpecial();
})();
