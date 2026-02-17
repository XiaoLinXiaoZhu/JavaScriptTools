// ==UserScript==
// @name                HUST华中科技大学军理线上作业自动填充助手
// @namespace           https://github.com/XiaoLinXiaoZhu/HUST-
// @version             0.1
// @description         HUST military science online homework autofill assistant
// @author              XLXZ
// @license             MIT
// @match               http://bookcenter.hustp.com/exercises/detail/*.html
// @grant               none
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/campus/hust-autofill.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/campus/hust-autofill.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/hust-autofill/index.ts
  $("head").append(
    '<link href="https://lib.baomitu.com/layui/2.6.8/css/layui.css" rel="stylesheet" type="text/css" />'
  );
  $.getScript(
    "https://lib.baomitu.com/layui/2.6.8/layui.js",
    function() {
      layui.use("element", function() {
        layui.element;
      });
      layer.closeAll();
      init();
      window.onhashchange = function() {
        layer.closeAll();
        init();
      };
    }
  );
  function init() {
    init_answer();
    show();
  }
  __name(init, "init");
  var answer = {};
  function init_answer() {
    answer[1528] = "B,D,D,C,A,A,B,B,C,C,B,C,A,B,A,A,D,B,D,B,C,C,A,A,A,B,A,B,B,B,ABCDE,ABCD,ACD,BD,ABCD,ABCE,ABCE,AD,ABC,AC,ABC,ABCD,ACD,ABD,AD,BC,ABD,ABCD,ABCD,ABC,ABC,AB,ABCD,ABCD,ABCD,ABCD,ABC,ABC,ABC,ABCD";
    answer[1529] = "C,B,C,A,B,D,A,D,C,A,B,C,D,B,C,ABCDE,ABCD,BCDE,ABDE,ACD,ABCDE,ABDE,ACD,ABCDE,ABCDE,ABCDE,ABCE,ABE,ABDE,ACD";
    answer[1530] = "A,C,D,A,B,A,D,C,B,A,A,C,A,D,C,ABC,ABCD,ABC,ABCD,ABC,ABC,ABCD,ABC,ABCD,ABD,ABC,ABD,ABC,ABC,BCD";
    answer[1531] = "C,D,B,D,B,A,A,A,B,D,A,D,D,B,A,B,C,C,A,B,C,D,B,A,C,B,A,C,D,A,C,ABCE,ABCD,ABCD,ACD,ABCD,ABD,BCD,ABCDE,ABCD,ABCD,AB,ABCD,ABCDE,ABC,ABCD,ABCD,ABCD,ABCD,ABCD,BC,AB,ABCE,BCD,BC,ABC,ABC,BCD,ABCD,ABC";
    answer[1536] = "C,C,D,C,B,A,A,A,A,A,B,A,C,A,A,B,C,D,D,A,B,B,A,A,B,A,B,C,B,B,ABCD,ABC,ABC,ABCDEF,ABC,ABC,ABCD,ABCDE,ABCDE,ABCDEF,ABCDE,ABCDE,ABCD,ABCD,BCD,ACD,ABCD,ABCD,ABC,ABCDE,ABC,ABCDEF,ABCDEF,ABCD,ABCD,ABCD,ABCD,ABCD,ABCDE,ABCD";
    answer[1690] = "C,C,B,A,B,C,B,B,D,C,B,A,A,B,C,D,C,B,A,B,ABC,ABCD,ABC,ABCDE,ABC,ABCDE,ABCD,ABCDE,BCD,ABCD,ABCD,ABCD,ABD,ABCD,ABCDE,ABCD,ABC,ABCD,AB,ABCDE,ABCD,AB,ABCDE,ABC,ABCDEF,ABCD,ABC,ABCDEF,ABC,ABC";
  }
  __name(init_answer, "init_answer");
  var conf = {
    title: "HUST\u519B\u7406\u52A9\u624B",
    datalist: {},
    time: 1
  };
  function show() {
    layer.open({
      type: 1,
      area: ["200px", "150px"],
      offset: "rb",
      id: "msgt",
      closeBtn: 0,
      title: conf.title,
      shade: 0,
      maxmin: true,
      anim: 2,
      content: '<div id="msg"><blockquote class="layui-elem-quote layui-quote-nm"><button type="button" class="layui-btn layui-btn-normal start">\u70B9\u6211\u81EA\u52A8\u586B\u5145\u7B54\u6848<button></blockquote></div>'
    });
    $(".start").click(function() {
      start();
    });
  }
  __name(show, "show");
  function start() {
    const item_page_id = document.getElementById(
      "exercises_id"
    );
    const item_problem_count = parseInt(
      String($(".answer_num").length)
    );
    const item_problem_id = document.getElementsByClassName("answer_num");
    const item_problem_type = document.getElementsByClassName("type_title");
    if (!item_page_id) return;
    const problem_answer = answer[Number(item_page_id.value)].split(",");
    if (item_problem_count === 0 || !item_page_id || item_problem_id.length === 0 || item_problem_type.length === 0) {
      alert("\u9875\u9762\u9519\u8BEF");
      return;
    }
    if (answer[Number(item_page_id.value)] == null) {
      alert("\u672A\u6536\u5F55\u8BE5\u4F5C\u4E1A\u7B54\u6848");
      return;
    }
    if (problem_answer.length !== item_problem_count) {
      alert("\u7B54\u6848\u4E0E\u9898\u6570\u4E0D\u7B26\uFF0C\u8BF7\u68C0\u67E5");
    }
    const collection = document.querySelectorAll(
      '[name*="stem"]'
    );
    const divsArray = Array.prototype.slice.call(
      collection,
      0
    );
    let i = 0;
    let j = 0;
    for (i = 0; i < divsArray.length - 1; i++) {
      for (j = i + 1; j < divsArray.length; j++) {
        if (divsArray[i].getAttribute("data-id") > divsArray[j].getAttribute("data-id")) {
          const k = divsArray[j];
          divsArray[j] = divsArray[i];
          divsArray[i] = k;
        }
      }
    }
    for (i = 0; i < divsArray.length; i++) {
      console.log(
        "before_id %d --> after_id %d",
        collection[i].getAttribute("data-id"),
        divsArray[i].getAttribute("data-id")
      );
    }
    i = 0;
    j = 0;
    for (; j < problem_answer.length; j++) {
      if (problem_answer[j].length === 1) {
        for (; i < divsArray.length; i++) {
          if (divsArray[i].type === "radio" && divsArray[i].value === problem_answer[j]) {
            divsArray[i].click();
            console.log(
              "Answer %d %s match no.%d_%d %s",
              j,
              problem_answer[j],
              (i + 1 - (i + 1) % 4) / 4,
              (i + 1) % 4,
              divsArray[i].value
            );
            do {
              i++;
            } while (divsArray[i].value !== "A");
            break;
          }
        }
        continue;
      }
      const a = problem_answer[j].split("");
      let m = 0;
      for (; m < a.length; m++) {
        for (; i < divsArray.length; i++) {
          if (divsArray[i].type === "checkbox" && divsArray[i].value === a[m]) {
            divsArray[i].click();
            console.log(
              "Answer %d_%d %s match no.%d %s , it is a multiple selection",
              j,
              m,
              a[m],
              i,
              divsArray[i].value
            );
            i++;
            break;
          }
        }
      }
    }
  }
  __name(start, "start");
})();
