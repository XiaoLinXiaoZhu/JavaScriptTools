// ==UserScript==
// @name         AutoTool_Download
// @namespace    https://github.com/XiaoLinXiaoZhu/JavaScriptTools
// @version      0.4
// @description  XLXZ's 自动下载 小工具，本质上是匹配特殊内容并且模拟点击
// @author       XLXZ
// @match        https://www.sunwenjie.top/article/*
// @match        *://*/*
// @grant        none
// @require
// @license      MIT
// @downloadURL https://raw.githubusercontent.com/XiaoLinXiaoZhu/JavaScriptTools/main/dist/AutoClick.js
// @updateURL https://raw.githubusercontent.com/XiaoLinXiaoZhu/JavaScriptTools/main/dist/AutoClick.js
// ==/UserScript==

(function() {
  function openURL(url) {
    let aLabel = document.createElement("a");
    aLabel.setAttribute("href", url);
    aLabel.setAttribute("target", "_blank");
    aLabel.setAttribute("id", "reportpoint");
    const reportPoint = document.getElementById("reportpoint");
    if (reportPoint) {
      document.body.removeChild(reportPoint);
    }
    document.body.appendChild(aLabel);
    aLabel.click();
    console.log("打开链接:", url);
  }

  class AutoDownload {
    url;
    getElement;
    constructor(url, getElement) {
      this.url = url;
      this.getElement = getElement;
    }
    downloaded = false;
    download() {
      if (this.downloaded)
        return;
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
      if (!location.href.match(this.url))
        return;
      console.log("url matched:", this.url);
      const intervalId = setInterval(() => {
        if (this.downloaded) {
          clearInterval(intervalId);
          return;
        }
        this.download();
      }, 1000);
    }
    async tryDownloadAsync(waitTime = 1000, timeOut = 1e4) {
      if (!location.href.match(this.url))
        return;
      console.log("url matched:", this.url);
      let elapsedTime = 0;
      while (elapsedTime < timeOut || timeOut == -1) {
        elapsedTime += waitTime;
        if (this.downloaded) {
          console.log("已经下载过了，为什么还在？");
          break;
        }
        this.download();
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }

    async tryDownloadAsyncByFetch(waitTime = 1000, timeOut = 1e4) {
      if (!location.href.match(this.url))
        return;
      console.log("url matched:", this.url);
      let elapsedTime = 0;
      while (elapsedTime < timeOut || timeOut == -1) {
        elapsedTime += waitTime;
        if (this.downloaded) {
          console.log("已经下载过了，为什么还在？");
          break;
        }
        const element = this.getElement();
        if (!element) {
          console.log("element not found");
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
        console.log("element:", element);
        const url = element.href || element.getAttribute("href");
        if (!url) {
          console.log("element has no href");
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
        console.log("Fetching URL:", url);
        let filename = url.split("/").pop() || "download";
        filename = filename.split("?")[0];
        filename = decodeURIComponent(filename);
        console.log("Filename:", filename);
        if (filename.length > 255) {
          console.warn("Filename is too long, truncating to 255 characters.");
          filename = filename.slice(0, 255);
        }
        if (filename.length === 0) {
          console.warn("Filename is empty, using 'download' as default.");
          filename = "download";
        }
        try {
          const response = await fetch(url);
          if (!response.ok) {
            console.error("Fetch failed with status:", response.status);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            continue;
          }
          const blob = await response.blob();
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
  }
  new AutoDownload(/https:\/\/www.sunwenjie.top\/article\//, () => document.querySelector('a[href^="https://mega.nz/file/"]')).tryDownloadAsync();
  new AutoDownload(/https:\/\/mega.nz\/file\//, () => document.querySelector("button.mega-button.positive.js-default-download.js-standard-download")).tryDownloadAsync();
  new AutoDownload(/www\.nexusmods\.com\/.*?\/mods\/[0-9]+?\?tab=files\&file_id=/, () => document.querySelector("button#slowDownloadButton")).tryDownloadAsync();
  new AutoDownload(/https:\/\/www\.asmrgay\.com\/.*?\/.+\.(mp3|flac|wav|ogg|m4a)/, () => {
    const elements = document.querySelectorAll("a.hope-button");
    if (!elements)
      return null;
    const okElements = Array.from(document.querySelectorAll("a.hope-button")).filter((el) => {
      const match = el.href.match(/https:\/\/asmr\.\d+\.xyz.*?\.(mp3|flac|wav|ogg|m4a).*/);
      return match;
    });
    return okElements.length > 0 ? okElements[0] : null;
  }).tryDownloadAsyncByFetch(1000, -1);
})();
