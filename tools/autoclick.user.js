// ==UserScript==
// @name                AutoTool_Download
// @namespace           https://github.com/XiaoLinXiaoZhu/JavaScriptTools
// @version             0.4
// @description         XLXZ's 自动下载 小工具，本质上是匹配特殊内容并且模拟点击
// @author              XLXZ
// @license             MIT
// @match               https://www.sunwenjie.top/article/*
// @match               *://*/*
// @grant               none
// @downloadURL         https://raw.githubusercontent.com/XiaoLinXiaoZhu/JavaScriptTools/main/dist/AutoClick.js
// @updateURL           https://raw.githubusercontent.com/XiaoLinXiaoZhu/JavaScriptTools/main/dist/AutoClick.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/autoclick/index.ts
  var _AutoDownload = class _AutoDownload {
    constructor(url, getElement) {
      this.downloaded = false;
      this.url = url;
      this.getElement = getElement;
    }
    download() {
      if (this.downloaded) return;
      const element = this.getElement();
      if (!element) {
        console.log("element not found");
        return;
      }
      console.log("element:", element);
      element.click();
      this.downloaded = true;
    }
    tryDownload() {
      if (!location.href.match(this.url)) return;
      console.log("url matched:", this.url);
      const intervalId = setInterval(() => {
        if (this.downloaded) {
          clearInterval(intervalId);
          return;
        }
        this.download();
      }, 1e3);
    }
    async tryDownloadAsync(waitTime = 1e3, timeOut = 1e4) {
      if (!location.href.match(this.url)) return;
      console.log("url matched:", this.url);
      let elapsedTime = 0;
      while (elapsedTime < timeOut || timeOut === -1) {
        elapsedTime += waitTime;
        if (this.downloaded) {
          console.log("\u5DF2\u7ECF\u4E0B\u8F7D\u8FC7\u4E86\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u5728\uFF1F");
          break;
        }
        this.download();
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
    async tryDownloadAsyncByFetch(waitTime = 1e3, timeOut = 1e4) {
      if (!location.href.match(this.url)) return;
      console.log("url matched:", this.url);
      let elapsedTime = 0;
      while (elapsedTime < timeOut || timeOut === -1) {
        elapsedTime += waitTime;
        if (this.downloaded) {
          console.log("\u5DF2\u7ECF\u4E0B\u8F7D\u8FC7\u4E86\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u5728\uFF1F");
          break;
        }
        const element = this.getElement();
        if (!element) {
          console.log("element not found");
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
        console.log("element:", element);
        let url = null;
        if ("href" in element && typeof element.href === "string") {
          url = element.href;
        } else {
          url = element.getAttribute("href");
        }
        if (!url) {
          console.log("element has no href");
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
        console.log("Fetching URL:", url);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            console.error("Fetch failed with status:", response.status);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            continue;
          }
          const blob = await response.blob();
          let filename = url.split("/").pop() || "download";
          filename = filename.split("?")[0];
          filename = decodeURIComponent(filename);
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = filename;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(downloadLink.href);
          console.log("Download triggered for:", url);
          this.downloaded = true;
        } catch (error) {
          console.error("Download failed:", error);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
      }
    }
  };
  __name(_AutoDownload, "AutoDownload");
  var AutoDownload = _AutoDownload;
  new AutoDownload(
    /https:\/\/www.sunwenjie.top\/article\//,
    () => document.querySelector(
      'a[href^="https://mega.nz/file/"]'
    )
  ).tryDownloadAsync();
  new AutoDownload(
    /https:\/\/mega.nz\/file\//,
    () => document.querySelector(
      "button.mega-button.positive.js-default-download.js-standard-download"
    )
  ).tryDownloadAsync();
  new AutoDownload(
    /www\.nexusmods\.com\/.*?\/mods\/[0-9]+?\?tab=files\&file_id=/,
    () => {
      const shadowHost = document.querySelector("mod-file-download");
      if (!shadowHost) {
        console.log("shadowHost not found");
        return null;
      }
      const shadowRoot = shadowHost.shadowRoot;
      if (!shadowRoot) {
        console.log("shadowRoot not found");
        return null;
      }
      const button = shadowRoot.querySelector("button");
      if (!button) {
        console.log("button not found");
        return null;
      }
      return button;
    }
  ).tryDownloadAsync(1e3, 3e4);
  new AutoDownload(
    /https:\/\/www\.asmrgay\.com\/.*?\/.+\.(mp3|flac|wav|ogg|m4a)/,
    () => {
      const container = document.querySelector("a.hope-button");
      if (!container) return null;
      const okElements = Array.from(container.querySelectorAll("a")).filter(
        (el) => el.href.match(
          /https:\/\/asmr\.\d+\.xyz.*?\.(mp3|flac|wav|ogg|m4a)/
        )
      );
      return okElements.length > 0 ? okElements[0] : null;
    }
  ).tryDownloadAsync(1e3, -1);
})();
