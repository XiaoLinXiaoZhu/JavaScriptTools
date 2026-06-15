// ==UserScript==
// @name                评价表自动选择工具
// @namespace           http://tampermonkey.net/
// @version             1.2.0
// @description         自动选择评分项，支持单个填充和全自动批量评价
// @author              XLXZ
// @match               *://*/*
// @grant               none
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/campus/evaluation-auto.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/campus/evaluation-auto.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/evaluation-auto/auto-mode.ts
  var AUTO_KEY = "eval_auto_mode";
  var REFRESH_KEY = "eval_need_refresh";
  var isAutoMode = /* @__PURE__ */ __name(() => localStorage.getItem(AUTO_KEY) === "1", "isAutoMode");
  var enableAutoMode = /* @__PURE__ */ __name(() => {
    localStorage.setItem(AUTO_KEY, "1");
  }, "enableAutoMode");
  var disableAutoMode = /* @__PURE__ */ __name(() => {
    localStorage.removeItem(AUTO_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }, "disableAutoMode");
  var markNeedRefresh = /* @__PURE__ */ __name(() => {
    localStorage.setItem(REFRESH_KEY, "1");
  }, "markNeedRefresh");
  var consumeRefreshMark = /* @__PURE__ */ __name(() => {
    if (localStorage.getItem(REFRESH_KEY) === "1") {
      localStorage.removeItem(REFRESH_KEY);
      return true;
    }
    return false;
  }, "consumeRefreshMark");

  // src/evaluation-auto/page-form.ts
  function autoSelect() {
    let selectedCount = 0;
    let strongRecommendName = "";
    let bestClassName = "";
    const allRadios = document.querySelectorAll(
      'input[type="radio"]'
    );
    for (const radio of allRadios) {
      const label = radio.closest("label");
      if (!label) continue;
      const labelText = label.textContent?.trim();
      if (labelText === "\u5F3A\u70C8\u63A8\u8350") {
        radio.click();
        selectedCount++;
        strongRecommendName = radio.name;
        console.log("[eval-auto] \u5DF2\u9009\u62E9: \u5F3A\u70C8\u63A8\u8350 (name=" + radio.name + ")");
      } else if (labelText === "\u6700\u6EE1\u610F\u8BFE\u5802") {
        radio.click();
        selectedCount++;
        bestClassName = radio.name;
        console.log("[eval-auto] \u5DF2\u9009\u62E9: \u6700\u6EE1\u610F\u8BFE\u5802 (name=" + radio.name + ")");
      }
    }
    const goodOptions = document.querySelectorAll(
      'input[type="radio"][value="1_1.0"][score="1.0"]'
    );
    for (const option of goodOptions) {
      if (option.name !== strongRecommendName && option.name !== bestClassName) {
        option.click();
        selectedCount++;
        console.log("[eval-auto] \u5DF2\u9009\u62E9: \u5F88\u597D (name=" + option.name + ")");
      }
    }
    return selectedCount;
  }
  __name(autoSelect, "autoSelect");
  function autoSubmit() {
    const submitBtn = document.querySelector("a.save");
    if (!submitBtn) {
      console.log("[eval-auto] \u672A\u627E\u5230\u63D0\u4EA4\u6309\u94AE");
      return;
    }
    submitBtn.click();
    console.log("[eval-auto] \u5DF2\u70B9\u51FB\u63D0\u4EA4");
    setTimeout(() => {
      const confirmSelectors = [
        "a.layui-layer-btn0",
        "a.popBnt_blue",
        ".layui-layer-btn a:first-child"
      ];
      for (const selector of confirmSelectors) {
        const confirmBtn = document.querySelector(selector);
        if (confirmBtn) {
          markNeedRefresh();
          confirmBtn.click();
          console.log("[eval-auto] \u5DF2\u70B9\u51FB\u786E\u8BA4: " + selector);
          return;
        }
      }
      console.log("[eval-auto] \u672A\u627E\u5230\u786E\u8BA4\u6309\u94AE\uFF0C\u53EF\u80FD\u5DF2\u81EA\u52A8\u63D0\u4EA4");
    }, 1e3);
  }
  __name(autoSubmit, "autoSubmit");
  function runAutoFill() {
    const count = autoSelect();
    if (count === 0) {
      console.log("[eval-auto] \u672A\u627E\u5230\u53EF\u9009\u62E9\u7684\u9009\u9879");
      return 0;
    }
    setTimeout(() => {
      autoSubmit();
    }, 300);
    return count;
  }
  __name(runAutoFill, "runAutoFill");

  // src/evaluation-auto/page-teacher-list.ts
  function findEvalButtons() {
    const links = document.querySelectorAll("a.d_button_text");
    const result = [];
    for (const link of links) {
      if (link.textContent?.trim() === "\u8BC4\u4EF7") {
        result.push(link);
      }
    }
    return result;
  }
  __name(findEvalButtons, "findEvalButtons");
  function findNextPageBtn() {
    const btn = document.querySelector("button.btn-next:not([disabled])");
    return btn;
  }
  __name(findNextPageBtn, "findNextPageBtn");
  function hasUnrated() {
    return findEvalButtons().length > 0;
  }
  __name(hasUnrated, "hasUnrated");
  function clickFirstEval() {
    const buttons = findEvalButtons();
    if (buttons.length > 0) {
      console.log("[eval-auto] \u70B9\u51FB\u201C\u8BC4\u4EF7\u201D\u6309\u94AE\uFF0C\u8FDB\u5165\u8868\u5355\u9875");
      buttons[0].click();
      return true;
    }
    return false;
  }
  __name(clickFirstEval, "clickFirstEval");
  function goNextPage() {
    const btn = findNextPageBtn();
    if (btn) {
      console.log("[eval-auto] \u7FFB\u5230\u4E0B\u4E00\u9875");
      btn.click();
      return true;
    }
    return false;
  }
  __name(goNextPage, "goNextPage");
  function startAutoAll() {
    enableAutoMode();
    autoStep();
  }
  __name(startAutoAll, "startAutoAll");
  function autoStep() {
    if (!isAutoMode()) return;
    if (hasUnrated()) {
      setTimeout(() => {
        clickFirstEval();
      }, 500);
      return;
    }
    if (goNextPage()) {
      setTimeout(() => {
        autoStep();
      }, 1500);
      return;
    }
    disableAutoMode();
    alert("\u6240\u6709\u6559\u5E08\u5747\u5DF2\u8BC4\u4EF7\u5B8C\u6BD5\uFF01");
  }
  __name(autoStep, "autoStep");
  function continueAutoAll() {
    if (!isAutoMode()) return false;
    setTimeout(() => {
      autoStep();
    }, 800);
    return true;
  }
  __name(continueAutoAll, "continueAutoAll");

  // src/evaluation-auto/ui.ts
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.textContent = message;
    const colorMap = { success: "#10b981", warning: "#f59e0b", info: "#3b82f6" };
    toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 99999;
    padding: 12px 20px;
    background: ${colorMap[type]};
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    animation: evalSlideIn 0.3s ease;
  `;
    if (!document.getElementById("eval-toast-style")) {
      const style = document.createElement("style");
      style.id = "eval-toast-style";
      style.textContent = `
      @keyframes evalSlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes evalSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
      document.head.appendChild(style);
    }
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = "evalSlideOut 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3e3);
  }
  __name(showToast, "showToast");
  function createButton(text, onClick, variant = "primary") {
    const isPrimary = variant === "primary";
    const button = document.createElement("button");
    button.textContent = text;
    button.style.cssText = `
    position: fixed;
    right: 20px;
    z-index: 99999;
    padding: 12px 24px;
    background: ${isPrimary ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
  `;
    button.onmouseenter = () => {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
    };
    button.onmouseleave = () => {
      button.style.transform = "translateY(0)";
      button.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
    };
    button.onclick = onClick;
    return button;
  }
  __name(createButton, "createButton");

  // src/evaluation-auto/index.ts
  function detectPageType() {
    const url = window.location.href;
    if (url.includes("questionnaireInfo")) return "form";
    if (url.includes("whatIEvaluatedDetails")) return "teacher-list";
    if (url.includes("whatIEvaluated") || url.includes("evaluateList")) return "survey-list";
    return "unknown";
  }
  __name(detectPageType, "detectPageType");
  function addStopButton() {
    if (!isAutoMode()) return;
    const btnStop = createButton("\u505C\u6B62\u81EA\u52A8\u8BC4\u4EF7", () => {
      disableAutoMode();
      showToast("\u5DF2\u505C\u6B62\u81EA\u52A8\u8BC4\u4EF7", "info");
      btnStop.remove();
    }, "secondary");
    btnStop.style.top = "140px";
    btnStop.style.background = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
    document.body.appendChild(btnStop);
  }
  __name(addStopButton, "addStopButton");
  function addFormPageButtons() {
    const btnCurrent = createButton("\u4E00\u952E\u586B\u5145\u5F53\u524D", () => {
      const count = runAutoFill();
      if (count === 0) {
        showToast("\u672A\u627E\u5230\u53EF\u9009\u62E9\u7684\u9009\u9879", "warning");
      } else {
        showToast(`\u5DF2\u9009\u62E9 ${count} \u4E2A\u9009\u9879\uFF0C\u6B63\u5728\u63D0\u4EA4...`, "success");
      }
    }, "primary");
    btnCurrent.style.top = "20px";
    document.body.appendChild(btnCurrent);
    const btnAll = createButton("\u4E00\u952E\u586B\u5145\u5168\u90E8", () => {
      enableAutoMode();
      const count = runAutoFill();
      if (count === 0) {
        showToast("\u672A\u627E\u5230\u53EF\u9009\u62E9\u7684\u9009\u9879", "warning");
      } else {
        showToast(`\u5DF2\u9009\u62E9 ${count} \u4E2A\u9009\u9879\uFF0C\u81EA\u52A8\u6A21\u5F0F\u5DF2\u5F00\u542F`, "success");
      }
    }, "secondary");
    btnAll.style.top = "80px";
    document.body.appendChild(btnAll);
    addStopButton();
  }
  __name(addFormPageButtons, "addFormPageButtons");
  function addTeacherListPageButtons() {
    const btnCurrent = createButton("\u4E00\u952E\u586B\u5145\u5F53\u524D", () => {
      if (!clickFirstEval()) {
        showToast("\u5F53\u524D\u9875\u6CA1\u6709\u672A\u8BC4\u4EF7\u7684\u6559\u5E08", "warning");
      }
    }, "primary");
    btnCurrent.style.top = "20px";
    document.body.appendChild(btnCurrent);
    const btnAll = createButton("\u4E00\u952E\u586B\u5145\u5168\u90E8", () => {
      enableAutoMode();
      startAutoAll();
    }, "secondary");
    btnAll.style.top = "80px";
    document.body.appendChild(btnAll);
    addStopButton();
  }
  __name(addTeacherListPageButtons, "addTeacherListPageButtons");
  function main() {
    const pageType = detectPageType();
    switch (pageType) {
      case "form":
        addFormPageButtons();
        if (isAutoMode()) {
          setTimeout(() => runAutoFill(), 800);
        }
        break;
      case "teacher-list": {
        if (consumeRefreshMark()) {
          location.reload();
          return;
        }
        addTeacherListPageButtons();
        if (isAutoMode()) {
          setTimeout(() => continueAutoAll(), 1e3);
        }
        break;
      }
      case "survey-list":
        break;
      default:
        break;
    }
    console.log("[eval-auto] \u5DF2\u52A0\u8F7D\uFF0C\u9875\u9762\u7C7B\u578B:", pageType);
  }
  __name(main, "main");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      const pageType = detectPageType();
      if (pageType === "teacher-list") {
        if (consumeRefreshMark()) {
          location.reload();
          return;
        }
        if (isAutoMode()) {
          setTimeout(() => continueAutoAll(), 1e3);
        }
      }
    }
  });
})();
