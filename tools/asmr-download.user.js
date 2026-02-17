// ==UserScript==
// @name                AutoTool
// @namespace           https://github.com/XiaoLinXiaoZhu/AutoTool
// @version             0.1
// @description         XLXZ'a AutoTool
// @author              XLXZ
// @license             MIT
// @match               https://www.asmrgay.com/*
// @match               https://cczhhz.asmr.icu/*
// @grant               none
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/asmr-download.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/asmr-download.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/asmr-download/index.ts
  var shutdown = 0;
  var emptyTimes = 0;
  window.onload = function() {
    shutdown = 0;
    emptyTimes = 0;
  };
  function getEndingNumber(str) {
    const match = str.match(/\d{1,3}$/);
    return match ? parseInt(match[0], 10) : null;
  }
  __name(getEndingNumber, "getEndingNumber");
  function tryNextUrl() {
    const currentUrl = window.location.href;
    console.log("=====Now Url is : " + currentUrl);
    let newUrl = currentUrl.slice(0, -4);
    const match = getEndingNumber(newUrl);
    console.log("=====Now Match Url is : " + newUrl);
    console.log("=====Now Match is : " + match);
    if (match) {
      let numberPart = match;
      if (numberPart > 9) {
        newUrl = newUrl.slice(0, -2);
      } else {
        newUrl = newUrl.slice(0, -1);
      }
      numberPart++;
      newUrl = newUrl + numberPart + ".rar";
      console.log("=====Next Url is :" + newUrl);
      window.location.href = newUrl;
    }
  }
  __name(tryNextUrl, "tryNextUrl");
  function tryPartUrl() {
    const currentUrl = window.location.href;
    let newUrl = currentUrl.slice(0, -3);
    newUrl += "part1.exe";
    window.open(newUrl, "_top");
  }
  __name(tryPartUrl, "tryPartUrl");
  setTimeout(function() {
    function checkButton() {
      const currentUrl = window.location.href;
      const lastThreeChars = currentUrl.slice(-3);
      console.log("analying url,end with :" + lastThreeChars);
      if (lastThreeChars !== "zip" && lastThreeChars !== "exe" && lastThreeChars !== "rar") {
        console.log(
          lastThreeChars + "This is a normal page,stop running"
        );
        clearInterval(intervalId);
      }
      console.log("getting");
      let test = document.querySelector(
        "#root > div.hope-c-PJLV.hope-c-PJLV-iicyfOA-css > div > div > div > div:nth-child(3) > div > a"
      );
      if (!test) {
        test = document.querySelector(
          "#root > div.hope-c-PJLV.hope-c-PJLV-iicyfOA-css > div > div > div > div:nth-child(3) > div > a"
        );
      }
      if (!test && lastThreeChars === "zip") {
        if (emptyTimes > 3) {
          tryPartUrl();
        } else {
          emptyTimes++;
        }
      }
      if (test && lastThreeChars === "zip") {
        console.log(test);
        const js = test.href;
        window.location.href = js;
        console.log(js);
        alert("\u5DF2\u5F00\u59CB\u4E0B\u8F7D");
        shutdown = 1;
        clearInterval(intervalId);
      }
      if (lastThreeChars === "exe" || lastThreeChars === "rar") {
        console.log("===== part mod now!");
        if (!test) {
          console.log(
            "===== didn't get the button,try times:" + emptyTimes
          );
          if (emptyTimes > 3) {
            shutdown = 1;
          } else {
            emptyTimes++;
          }
        } else {
          const js = test.href;
          window.open(js, "_blank");
          console.log("\u5C1D\u8BD5\u6253\u5F00\u4E0B\u4E00\u9875\u9762");
          tryNextUrl();
        }
      }
    }
    __name(checkButton, "checkButton");
    const intervalId = setInterval(checkButton, 2e3);
  }, 5e3);
  setTimeout(function() {
    function checkBoolValue() {
      const currentUrl = window.location.href;
      const lastThreeChars = currentUrl.slice(-3);
      if (lastThreeChars !== "zip" && lastThreeChars !== "exe" && lastThreeChars !== "rar") {
        console.log(
          lastThreeChars + "This is a normal page,stop detect ShutDown"
        );
        clearInterval(intervalId);
      }
      if (shutdown === 1) {
        alert("\u5173\u95ED\u9875\u9762\u2026\u2026");
        window.open("about:blank", "_top")?.close();
        clearInterval(intervalId);
      } else {
        console.log("shutdown == 0");
      }
    }
    __name(checkBoolValue, "checkBoolValue");
    const intervalId = setInterval(checkBoolValue, 2e3);
  }, 2e4);
})();
