// ==UserScript==
// @name                动画疯自动同意年龄确认，移除广告跳转，广告静音，自动点击跳过广告
// @namespace           http://tampermonkey.net/
// @version             2.0
// @description         能够动画疯自动同意年龄确认，移除广告跳转，广告静音，自动点击跳过广告……安装即可，自动执行
// @author              XLXZ
// @license             MIT
// @icon                https://www.google.com/s2/favicons?sz=64&domain=gamer.com.tw
// @match               https://ani.gamer.com.tw/animeVideo.php?sn=*
// @grant               none
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/entertainment/bahamut-auto.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/entertainment/bahamut-auto.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/bahamut-auto/index.ts
  var ifRemoveAdsJump = true;
  var ifMuteDuringAd = true;
  var adDuringTime = 30;
  function removeAdsJump() {
    const vastBlocker = document.querySelector(".vast-blocker");
    if (vastBlocker) {
      vastBlocker.remove();
      console.log("\u79FB\u9664\u5E7F\u544A\u8DF3\u8F6C");
      return true;
    } else {
      console.log("\u6CA1\u6709\u5E7F\u544A\u8DF3\u8F6C");
      return false;
    }
  }
  __name(removeAdsJump, "removeAdsJump");
  function skipAds() {
    const skipButton = document.querySelector("#adSkipButton");
    if (skipButton && skipButton.classList.contains("enable")) {
      skipButton.click();
      console.log("\u8DF3\u8FC7\u5E7F\u544A");
      return true;
    } else {
      return false;
    }
  }
  __name(skipAds, "skipAds");
  function checkAds() {
    const skipButton = document.querySelector("#adSkipButton");
    if (!skipButton) {
      console.log("\u6CA1\u6709\u5E7F\u544A");
      return false;
    }
    return true;
  }
  __name(checkAds, "checkAds");
  function muteAds() {
    const muteButton = document.querySelector(
      ".vjs-mute-control.vjs-control.vjs-button"
    );
    if (muteButton) {
      if (!muteButton.classList.contains("vjs-vol-0")) {
        muteButton.click();
      } else {
        console.log("\u5DF2\u7ECF\u9759\u97F3\u4E86");
        return true;
      }
      console.log("\u5E7F\u544A\u9759\u97F3");
      return true;
    } else {
      console.log("\u6CA1\u6709\u9759\u97F3\u6309\u94AE");
      return false;
    }
  }
  __name(muteAds, "muteAds");
  function unmuteAds() {
    const muteButton = document.querySelector(
      ".vjs-mute-control.vjs-control.vjs-button"
    );
    if (muteButton) {
      if (muteButton.classList.contains("vjs-vol-0")) {
        muteButton.click();
      } else {
        console.log("\u5DF2\u7ECF\u53D6\u6D88\u9759\u97F3\u4E86");
        return true;
      }
      console.log("\u53D6\u6D88\u9759\u97F3");
      return true;
    } else {
      console.log("\u6CA1\u6709\u9759\u97F3\u6309\u94AE");
      return false;
    }
  }
  __name(unmuteAds, "unmuteAds");
  function agreeAge() {
    const adultButton = document.querySelector("#adult");
    if (adultButton) {
      adultButton.click();
      console.log("\u540C\u610F\u5E74\u9F84\u786E\u8BA4");
      return true;
    } else {
      console.log("\u6CA1\u6709\u5E74\u9F84\u786E\u8BA4\u6309\u94AE");
      return false;
    }
  }
  __name(agreeAge, "agreeAge");
  var timers = [];
  function tryUntillSuccess(func, timeout, functionName = "\u672A\u77E5\u51FD\u6570", interval = 20) {
    let successFunc;
    let failFunc;
    const timer = setInterval(() => {
      if (func()) {
        clearInterval(timer);
        clearTimeout(timeOut);
        console.log("\u6210\u529F\u6267\u884C" + functionName);
        if (successFunc) successFunc();
      }
    }, interval);
    timers.push(timer);
    const timeOut = setTimeout(() => {
      clearInterval(timer);
      console.log(functionName + "\u6267\u884C\u8D85\u65F6\uFF0C\u505C\u6B62\u5C1D\u8BD5");
      if (failFunc) failFunc();
    }, timeout);
    timers.push(timeOut);
    return {
      onSuccess: /* @__PURE__ */ __name((func2) => {
        successFunc = func2;
      }, "onSuccess"),
      onFail: /* @__PURE__ */ __name((func2) => {
        failFunc = func2;
      }, "onFail")
    };
  }
  __name(tryUntillSuccess, "tryUntillSuccess");
  function clearAllTimers() {
    timers.forEach((timer) => {
      clearInterval(timer);
      clearTimeout(timer);
    });
    timers = [];
    console.log("\u6240\u6709\u8BA1\u65F6\u5668\u5DF2\u6E05\u9664");
  }
  __name(clearAllTimers, "clearAllTimers");
  var handleChange = /* @__PURE__ */ __name(() => {
    console.log("\u7C7B\u5C5E\u6027\u53D8\u5316\u4E86,\u5E94\u8BE5\u662F\u5267\u96C6\u53D1\u751F\u53D8\u5316\uFF0C\u91CD\u65B0\u52A0\u8F7D\u811A\u672C\u2026\u2026");
    clearAllTimers();
    tryUntillSuccess(startObserve, 2e3, "\u76D1\u63A7\u5267\u96C6\u53D8\u5316");
    tryUntillSuccess(agreeAge, 2e3, "\u540C\u610F\u5E74\u9F84\u786E\u8BA4");
    if (ifRemoveAdsJump) {
      tryUntillSuccess(removeAdsJump, 2e3, "\u79FB\u9664\u5E7F\u544A\u8DF3\u8F6C");
    }
    if (ifMuteDuringAd) {
      tryUntillSuccess(checkAds, 2e3, "\u68C0\u67E5\u662F\u5426\u6709\u5E7F\u544A\u5E76\u4E14\u9759\u97F3").onSuccess(
        () => {
          tryUntillSuccess(muteAds, 2e3, "\u5E7F\u544A\u9759\u97F3");
        }
      );
    }
    const reCheckAds = setTimeout(() => {
      if (!checkAds()) {
        tryUntillSuccess(unmuteAds, 1e3, "\u53D6\u6D88\u9759\u97F3");
      }
    }, 1e3);
    timers.push(reCheckAds);
    const skipAdsTimer = setTimeout(() => {
      console.log(adDuringTime + "\u79D2\u5230\u4E86\uFF0C\u5C1D\u8BD5\u8DF3\u8FC7\u5E7F\u544A");
      tryUntillSuccess(skipAds, 5e3, "\u8DF3\u8FC7\u5E7F\u544A", 100).onSuccess(() => {
        tryUntillSuccess(unmuteAds, 2e3, "\u8DF3\u8FC7\u5E7F\u544A\u540E\u53D6\u6D88\u9759\u97F3");
      });
    }, adDuringTime * 1e3);
    timers.push(skipAdsTimer);
  }, "handleChange");
  var mutationObserver = new MutationObserver(handleChange);
  var config = {
    attributes: true,
    attributeFilter: ["class"]
  };
  function startObserve() {
    mutationObserver.disconnect();
    const targetNode = document.querySelector(".playing");
    if (targetNode) {
      mutationObserver.observe(targetNode, config);
      console.log("\u627E\u5230\u5267\u96C6\u5143\u7D20");
      return true;
    } else {
      console.log("\u672A\u627E\u5230\u5267\u96C6\u5143\u7D20");
      return false;
    }
  }
  __name(startObserve, "startObserve");
  tryUntillSuccess(startObserve, 2e3, "\u76D1\u63A7\u5267\u96C6\u53D8\u5316").onFail(handleChange);
})();
