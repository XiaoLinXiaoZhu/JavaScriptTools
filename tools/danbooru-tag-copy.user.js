// ==UserScript==
// @name                Danbooru Tag Copy
// @namespace           https://github.com/XiaoLinXiaoZhu/JavaScriptTools
// @version             0.1
// @description         一键复制 Danbooru 标签，按 meta / rating / character+copyright / @artist / general 分类输出
// @author              XLXZ
// @license             MIT
// @match               https://danbooru.donmai.us/posts/*
// @grant               none
// @run-at              document-idle
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/danbooru-tag-copy.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/danbooru-tag-copy.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/danbooru-tag-copy/index.ts
  function waitForEl(selector, timeout = 5e3) {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);
      const observer = new MutationObserver(() => {
        const el2 = document.querySelector(selector);
        if (el2) {
          observer.disconnect();
          resolve(el2);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout waiting for "${selector}"`));
      }, timeout);
    });
  }
  __name(waitForEl, "waitForEl");
  function getTags(tagList, listClass) {
    const ul = tagList.querySelector(`ul.${listClass}`);
    if (!ul) return [];
    const items = ul.querySelectorAll("li[data-tag-name]");
    return Array.from(items).map((li) => {
      const name = li.getAttribute("data-tag-name") ?? "";
      return name.replace(/_/g, " ").toLowerCase();
    });
  }
  __name(getTags, "getTags");
  function getRating() {
    const el = document.getElementById("post-info-rating");
    if (!el) return "";
    const match = el.textContent?.match(/Rating:\s*(.+)/i);
    return match ? match[1].trim().toLowerCase() : "";
  }
  __name(getRating, "getRating");
  function trailing(line) {
    return line ? line + "," : "";
  }
  __name(trailing, "trailing");
  function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(textarea);
    });
  }
  __name(copyToClipboard, "copyToClipboard");
  async function main() {
    try {
      await waitForEl("#tag-list");
    } catch {
      return;
    }
    const tagList = document.getElementById("tag-list");
    const container = document.createElement("div");
    container.style.marginBottom = "10px";
    container.innerHTML = `
    <button id="danbooru-tag-copy-btn" style="
      padding:6px 14px;background:#1a73e8;color:#fff;border:none;
      border-radius:4px;cursor:pointer;font-size:13px;font-family:sans-serif;
    ">\u{1F4CB} Copy Tags</button>
    <span id="danbooru-tag-copy-msg" style="
      margin-left:10px;font-size:12px;color:#4caf50;display:none;
    ">Copied!</span>`;
    tagList.insertBefore(container, tagList.firstChild);
    const btn = document.getElementById("danbooru-tag-copy-btn");
    const msg = document.getElementById("danbooru-tag-copy-msg");
    btn.addEventListener("click", async () => {
      const metaTags = getTags(tagList, "meta-tag-list");
      const artistTags = getTags(tagList, "artist-tag-list");
      const copyrightTags = getTags(tagList, "copyright-tag-list");
      const characterTags = getTags(tagList, "character-tag-list");
      const generalTags = getTags(tagList, "general-tag-list");
      const rating = getRating();
      const lines = [
        trailing(metaTags.join(", ")),
        // meta
        trailing(rating),
        // rating
        trailing([...characterTags, ...copyrightTags].join(", ")),
        // character + copyright
        trailing(artistTags.map((t) => "@" + t).join(", ")),
        // @artist
        trailing(generalTags.join(", "))
        // general
      ];
      const text = lines.join("\n");
      try {
        await copyToClipboard(text);
        msg.style.display = "inline";
        setTimeout(() => {
          msg.style.display = "none";
        }, 1500);
      } catch {
        alert("Copy failed");
      }
    });
    console.log("[Danbooru Tag Copy] Ready");
  }
  __name(main, "main");
  main();
})();
