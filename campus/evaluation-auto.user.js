// ==UserScript==
// @name                评价表自动选择工具
// @namespace           http://tampermonkey.net/
// @version             1.0
// @description         自动选择"很好"、"强烈推荐"、"最满意课堂"
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

  // src/evaluation-auto/index.ts
  function addButton() {
    const button = document.createElement("button");
    button.textContent = "\u4E00\u952E\u9009\u62E9";
    button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99999;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    button.onclick = autoSelect;
    document.body.appendChild(button);
  }
  __name(addButton, "addButton");
  function autoSelect() {
    let selectedCount = 0;
    let strongRecommendName = "";
    let bestClassName = "";
    const allRadios = document.querySelectorAll(
      'input[type="radio"]'
    );
    allRadios.forEach((radio) => {
      const label = radio.closest("label");
      if (!label) return;
      const labelText = label.textContent?.trim();
      if (labelText === "\u5F3A\u70C8\u63A8\u8350") {
        radio.click();
        selectedCount++;
        strongRecommendName = radio.name;
        console.log("\u5DF2\u9009\u62E9: \u5F3A\u70C8\u63A8\u8350 (name=" + radio.name + ")");
      } else if (labelText === "\u6700\u6EE1\u610F\u8BFE\u5802") {
        radio.click();
        selectedCount++;
        bestClassName = radio.name;
        console.log("\u5DF2\u9009\u62E9: \u6700\u6EE1\u610F\u8BFE\u5802 (name=" + radio.name + ")");
      }
    });
    const goodOptions = document.querySelectorAll(
      'input[type="radio"][value="1_1.0"][score="1.0"]'
    );
    goodOptions.forEach((option) => {
      if (option.name !== strongRecommendName && option.name !== bestClassName) {
        option.click();
        selectedCount++;
        console.log("\u5DF2\u9009\u62E9: \u5F88\u597D (name=" + option.name + ")");
      }
    });
    if (selectedCount > 0) {
      showToast(`\u6210\u529F\u9009\u62E9\u4E86 ${selectedCount} \u4E2A\u9009\u9879\uFF01`);
      if (selectedCount === 11) {
        setTimeout(() => {
          autoSubmit();
        }, 500);
      }
    } else {
      showToast("\u672A\u627E\u5230\u53EF\u9009\u62E9\u7684\u9009\u9879", "warning");
    }
  }
  __name(autoSelect, "autoSelect");
  function autoSubmit() {
    const submitBtn = document.querySelector("a.save");
    if (submitBtn) {
      submitBtn.click();
      showToast("\u6B63\u5728\u63D0\u4EA4...", "success");
      setTimeout(() => {
        const confirmSelectors = [
          "a.layui-layer-btn0",
          "a.popBnt_blue",
          ".layui-layer-btn a:first-child"
        ];
        for (const selector of confirmSelectors) {
          const confirmBtn = document.querySelector(
            selector
          );
          if (confirmBtn) {
            confirmBtn.click();
            console.log("\u5DF2\u70B9\u51FB\u786E\u8BA4\u6309\u94AE: " + selector);
            showToast("\u5DF2\u786E\u8BA4\u63D0\u4EA4\uFF01", "success");
            return;
          }
        }
        console.log("\u672A\u627E\u5230\u786E\u8BA4\u6309\u94AE");
        showToast("\u63D0\u4EA4\u6210\u529F\uFF0C\u8BF7\u624B\u52A8\u786E\u8BA4", "warning");
      }, 1e3);
    } else {
      console.log("\u672A\u627E\u5230\u63D0\u4EA4\u6309\u94AE");
    }
  }
  __name(autoSubmit, "autoSubmit");
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 99999;
    padding: 12px 20px;
    background: ${type === "success" ? "#10b981" : "#f59e0b"};
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease;
  `;
    if (!document.getElementById("toast-animation")) {
      const style = document.createElement("style");
      style.id = "toast-animation";
      style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
      document.head.appendChild(style);
    }
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3e3);
  }
  __name(showToast, "showToast");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addButton);
  } else {
    addButton();
  }
  console.log("\u8BC4\u4EF7\u8868\u81EA\u52A8\u9009\u62E9\u5DE5\u5177\u5DF2\u52A0\u8F7D");
})();
