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

(function () {
    'use strict';

    function openURL(url) {
        let aLabel = document.createElement('a');
        //设置链接
        aLabel.setAttribute('href', url);
        //新窗口打开链接
        aLabel.setAttribute('target', '_blank');
        //设置标签ID
        aLabel.setAttribute('id', 'reportpoint');
        // 防止反复添加
        const reportPoint = document.getElementById('reportpoint');
        if (reportPoint) {
            document.body.removeChild(reportPoint);
        }
        document.body.appendChild(aLabel);
        aLabel.click();
        console.log("打开链接:", url);
        //window.open(url);
    };

    class AutoDownload {
        // auto download 是一个 工具类，用来声明需要下载的内容，他由三个部分组成：
        // 1. url: 匹配的url
        // 2. element: 获取需要点击的元素
        // 3. download: 下载的方法
        url: RegExp;
        getElement: () => HTMLElement | null;
        constructor(url: RegExp, getElement: () => HTMLElement | null) {
            this.url = url;
            this.getElement = getElement;
        }

        downloaded = false;
        download() {
            if (this.downloaded) return;

            const element = this.getElement();
            if (!element) {
                console.log('element not found');
                return;
            }
            
            console.log('element:', element);
            // 在新的页面打开 herf
            //debug
            // console.log('open new window:', element.href);
            // window.location.href = element.href;
            element.click();
            // 下载成功
            this.downloaded = true;
            // openURL(element.href);
        }
        
        tryDownload() {
            if (!location.href.match(this.url)) return;
            console.log('url matched:', this.url);

            const intervalId = setInterval(() => {
                if (this.downloaded) {
                    clearInterval(intervalId);
                    return;
                }
                this.download();
            }, 1000); // 尝试间隔时间为 1 秒
        }

        async tryDownloadAsync(waitTime = 1000, timeOut = 10000) {
            if (!location.href.match(this.url)) return;
            console.log('url matched:', this.url);

            let elapsedTime = 0;
            while (elapsedTime < timeOut) {
                elapsedTime += waitTime;
                if (this.downloaded) {
                    console.log('已经下载过了，为什么还在？');
                    break;
                }
                this.download();
                await new Promise(resolve => setTimeout(resolve, waitTime)); // 等待 1 秒
            }
        }
    }

    // 1. 下载 https://www.sunwenjie.top/article/ 的 mega 链接
    // 匹配url使用 正则表达式 url.match(/https:\/\/www.sunwenjie.top\/article\//)
    // 获取元素使用 document.querySelector('a[href^="https://mega.nz/file/"]')
    // 下载方法是点击元素
    new AutoDownload(
        /https:\/\/www.sunwenjie.top\/article\//,
        () => document.querySelector('a[href^="https://mega.nz/file/"]')
    ).tryDownloadAsync();

    // 2. 下载 https://mega.nz/file/ 的下载按钮
    // 匹配url使用 正则表达式 url.match(/https:\/\/mega.nz\/file\//)
    // 获取的元素为 <button class="mega-button positive js-default-download js-standard-download"> <span>下载</span> </button>
    // 下载方法是点击元素

    new AutoDownload(
        /https:\/\/mega.nz\/file\//,
        () => document.querySelector('button.mega-button.positive.js-default-download.js-standard-download')
    ).tryDownloadAsync();



    // 3. 下载 https://www.nexusmods.com/*/mods/ 的下载按钮
    new AutoDownload(
        /www\.nexusmods\.com\/.*?\/mods\/[0-9]+?\?tab=files\&file_id=/,
        () => document.querySelector('button#slowDownloadButton')
    ).tryDownloadAsync();

    // 4. 下载 https://www.asmrgay.com/*/**  ……  /.+\.[mp3|flac|wav|ogg|m4a] 中的 形如：
    // <a class="hope-button hope-c-ivMHWx hope-c-ivMHWx-kcPQpq-variant-subtle hope-c-ivMHWx-kWSPeQ-size-md hope-c-ivMHWx-dvmlqS-cv hope-c-PJLV hope-c-PJLV-iikaotv-css" type="button" role="button" href="https://asmr.121231234.xyz/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/Flora%E5%9C%86%E5%9C%86/%E5%90%8C%E5%AD%A6%E5%A6%88%E5%A6%88%E5%B8%AE%E4%BD%A0%E8%BA%AB%E5%BF%83%E8%A7%A3%E5%8E%8B%E3%80%90Flora%E5%9C%86%E5%9C%86%E3%80%91.mp3?sign=6-zcMST_ekgGVl5JkAYJ-Ffjl4SawtszJQkIZ6iCWVI=:1827053578" target="_blank">下载</a>
    // 的链接
    new AutoDownload(
        /https:\/\/www\.asmrgay\.com\/.*?\/.+\.(mp3|flac|wav|ogg|m4a)/,
        () => document.querySelector('a.hope-button[href^="https://asmr.121231234.xyz/asmr/"]' +
            '[href$=".mp3"], a.hope-button[href^="https://asmr.121231234.xyz/asmr/"][href$=".flac"], ' +
            '[href$=".wav"], [href$=".ogg"], [href$=".m4a"]')
    ).tryDownloadAsync();

}
)();
