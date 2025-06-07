// ==UserScript==
// @name         AutoTool_Download
// @namespace    https://github.com/XiaoLinXiaoZhu/AutoTools/tree/main/ASMRTools
// @version      0.3
// @description  XLXZ's 自动下载 小工具，本质上是匹配特殊内容并且模拟点击
// @author       XLXZ
// @match        https://www.sunwenjie.top/article/*
// @match        *://*/*
// @grant        none
// @require
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/484096/AutoTool_DownloadASMR.user.js
// @updateURL https://update.greasyfork.org/scripts/484096/AutoTool_DownloadASMR.meta.js
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
      while (elapsedTime < timeOut) {
        elapsedTime += waitTime;
        if (this.downloaded) {
          console.log("已经下载过了，为什么还在？");
          break;
        }
        this.download();
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }
  new AutoDownload(/https:\/\/www.sunwenjie.top\/article\//, () => document.querySelector('a[href^="https://mega.nz/file/"]')).tryDownloadAsync();
  new AutoDownload(/https:\/\/mega.nz\/file\//, () => document.querySelector("button.mega-button.positive.js-default-download.js-standard-download")).tryDownloadAsync();
  new AutoDownload(/www\.nexusmods\.com\/.*?\/mods\/[0-9]+?\?tab=files\&file_id=/, () => document.querySelector("button#slowDownloadButton")).tryDownloadAsync();
  new AutoDownload(/https:\/\/www\.asmrgay\.com\/.*?\/.+\.(mp3|flac|wav|ogg|m4a)/, () => document.querySelector('a.hope-button[href^="https://asmr.121231234.xyz/asmr/"][href$=".mp3"], a.hope-button[href^="https://asmr.121231234.xyz/asmr/"][href$=".flac"], [href$=".wav"], [href$=".ogg"], [href$=".m4a"]')).tryDownloadAsync();
})();
