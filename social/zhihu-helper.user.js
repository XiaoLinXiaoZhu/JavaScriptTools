// ==UserScript==
// @name                知乎问题时间显示
// @name:zh-CN          知乎问题时间显示
// @name:en             Zhihu Answer Timestamp
// @namespace           https://github.com/XiaoLinXiaoZhu/JavaScriptTools
// @version             0.1.0
// @description         在知乎问题下的每个回答中显示创建时间和最后编辑时间。
// @description:en      Display creation and last-edit timestamps on Zhihu answer cards.
// @author              XLXZ
// @license             MIT
// @icon                https://www.google.com/s2/favicons?domain=zhihu.com
// @match               *://www.zhihu.com/question/*
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/social/zhihu-helper.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/social/zhihu-helper.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/zhihu-helper/index.ts
  function formatDate(date) {
    const y = date.getFullYear();
    const M = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    return `${y}-${M}-${d} ${h}:${m}`;
  }
  __name(formatDate, "formatDate");
  var PROCESSED_CLASS = "zhihu-time-injected";
  function injectTimestamps() {
    const answers = document.querySelectorAll(
      `.AnswerItem:not(.${PROCESSED_CLASS})`
    );
    for (const answer of answers) {
      const createdEl = answer.querySelector("[itemprop~=dateCreated][content]");
      const modifiedEl = answer.querySelector("[itemprop~=dateModified][content]");
      const created = createdEl?.getAttribute("content");
      const modified = modifiedEl?.getAttribute("content");
      if (!created && !modified) continue;
      const meta = answer.querySelector(".ContentItem-meta");
      if (!meta) continue;
      const div = document.createElement("div");
      div.style.cssText = "color: #8590a6; font-size: 13px; margin-top: 2px;";
      let text = "";
      if (created) text += `\u521B\u5EFA: ${formatDate(new Date(created))}`;
      if (modified) text += `    \u7F16\u8F91: ${formatDate(new Date(modified))}`;
      div.textContent = text;
      meta.appendChild(div);
      answer.classList.add(PROCESSED_CLASS);
    }
  }
  __name(injectTimestamps, "injectTimestamps");
  injectTimestamps();
  var observer = new MutationObserver(() => {
    injectTimestamps();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
