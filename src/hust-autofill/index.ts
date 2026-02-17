export {};

/* eslint-disable @typescript-eslint/no-explicit-any */
// 此脚本依赖页面已有的 jQuery 和 layui，通过 @require 或页面自带引入

declare const $: any;
declare const layer: any;
declare const layui: any;

// 调用一个前端库，好看点
$('head').append(
  '<link href="https://lib.baomitu.com/layui/2.6.8/css/layui.css" rel="stylesheet" type="text/css" />'
);
$.getScript(
  'https://lib.baomitu.com/layui/2.6.8/layui.js',
  function () {
    layui.use('element', function () {
      layui.element;
    });
    layer.closeAll();
    init();
    window.onhashchange = function () {
      layer.closeAll();
      init();
    };
  }
);

// 初始化函数
function init(): void {
  init_answer();
  show();
}

// 初始化答案
const answer: Record<number, string> = {};

function init_answer(): void {
  //--------------------answer-------------------------
  // 可以在这里添加你的答案
  // 答案格式为：answer[这里是每一套习题对应的id编号] = "A,B,C,AB,BC,ABC,ACE";

  answer[1528] =
    'B,D,D,C,A,A,B,B,C,C,B,C,A,B,A,A,D,B,D,B,C,C,A,A,A,B,A,B,B,B,ABCDE,ABCD,ACD,BD,ABCD,ABCE,ABCE,AD,ABC,AC,ABC,ABCD,ACD,ABD,AD,BC,ABD,ABCD,ABCD,ABC,ABC,AB,ABCD,ABCD,ABCD,ABCD,ABC,ABC,ABC,ABCD';
  answer[1529] =
    'C,B,C,A,B,D,A,D,C,A,B,C,D,B,C,ABCDE,ABCD,BCDE,ABDE,ACD,ABCDE,ABDE,ACD,ABCDE,ABCDE,ABCDE,ABCE,ABE,ABDE,ACD';
  answer[1530] =
    'A,C,D,A,B,A,D,C,B,A,A,C,A,D,C,ABC,ABCD,ABC,ABCD,ABC,ABC,ABCD,ABC,ABCD,ABD,ABC,ABD,ABC,ABC,BCD';
  answer[1531] =
    'C,D,B,D,B,A,A,A,B,D,A,D,D,B,A,B,C,C,A,B,C,D,B,A,C,B,A,C,D,A,C,ABCE,ABCD,ABCD,ACD,ABCD,ABD,BCD,ABCDE,ABCD,ABCD,AB,ABCD,ABCDE,ABC,ABCD,ABCD,ABCD,ABCD,ABCD,BC,AB,ABCE,BCD,BC,ABC,ABC,BCD,ABCD,ABC';
  answer[1536] =
    'C,C,D,C,B,A,A,A,A,A,B,A,C,A,A,B,C,D,D,A,B,B,A,A,B,A,B,C,B,B,ABCD,ABC,ABC,ABCDEF,ABC,ABC,ABCD,ABCDE,ABCDE,ABCDEF,ABCDE,ABCDE,ABCD,ABCD,BCD,ACD,ABCD,ABCD,ABC,ABCDE,ABC,ABCDEF,ABCDEF,ABCD,ABCD,ABCD,ABCD,ABCD,ABCDE,ABCD';
  answer[1690] =
    'C,C,B,A,B,C,B,B,D,C,B,A,A,B,C,D,C,B,A,B,ABC,ABCD,ABC,ABCDE,ABC,ABCDE,ABCD,ABCDE,BCD,ABCD,ABCD,ABCD,ABD,ABCD,ABCDE,ABCD,ABC,ABCD,AB,ABCDE,ABCD,AB,ABCDE,ABC,ABCDEF,ABCD,ABC,ABCDEF,ABC,ABC';
}

// 定义全局变量
const conf = {
  title: 'HUST军理助手',
  datalist: {} as Record<string, unknown>,
  time: 1,
};

// 展示GUI
function show(): void {
  layer.open({
    type: 1,
    area: ['200px', '150px'],
    offset: 'rb',
    id: 'msgt',
    closeBtn: 0,
    title: conf.title,
    shade: 0,
    maxmin: true,
    anim: 2,
    content:
      '<div id="msg"><blockquote class="layui-elem-quote layui-quote-nm"><button type="button" class="layui-btn layui-btn-normal start">点我自动填充答案<button></blockquote></div>',
  });
  $('.start').click(function () {
    start();
  });
}

// 主程序
function start(): void {
  const item_page_id = document.getElementById(
    'exercises_id'
  ) as HTMLInputElement | null;
  const item_problem_count = parseInt(
    String($('.answer_num').length)
  );
  const item_problem_id = document.getElementsByClassName('answer_num');
  const item_problem_type =
    document.getElementsByClassName('type_title');

  if (!item_page_id) return;

  const problem_answer = answer[Number(item_page_id.value)].split(',');

  if (
    item_problem_count === 0 ||
    !item_page_id ||
    item_problem_id.length === 0 ||
    item_problem_type.length === 0
  ) {
    alert('页面错误');
    return;
  }

  if (answer[Number(item_page_id.value)] == null) {
    alert('未收录该作业答案');
    return;
  }

  if (problem_answer.length !== item_problem_count) {
    alert('答案与题数不符，请检查');
  }

  const collection = document.querySelectorAll(
    '[name*="stem"]'
  ) as NodeListOf<HTMLInputElement>;
  const divsArray = Array.prototype.slice.call(
    collection,
    0
  ) as HTMLInputElement[];

  let i = 0;
  let j = 0;

  // 将题目按照题目的实际编号进行排序
  for (i = 0; i < divsArray.length - 1; i++) {
    for (j = i + 1; j < divsArray.length; j++) {
      if (
        divsArray[i].getAttribute('data-id')! >
        divsArray[j].getAttribute('data-id')!
      ) {
        const k = divsArray[j];
        divsArray[j] = divsArray[i];
        divsArray[i] = k;
      }
    }
  }

  // 便于在控制台观察排序情况
  for (i = 0; i < divsArray.length; i++) {
    console.log(
      'before_id %d --> after_id %d',
      collection[i].getAttribute('data-id'),
      divsArray[i].getAttribute('data-id')
    );
  }

  i = 0;
  j = 0;

  for (; j < problem_answer.length; j++) {
    // 单项选择单独选择
    if (problem_answer[j].length === 1) {
      for (; i < divsArray.length; i++) {
        if (
          divsArray[i].type === 'radio' &&
          divsArray[i].value === problem_answer[j]
        ) {
          divsArray[i].click();

          console.log(
            'Answer %d %s match no.%d_%d %s',
            j,
            problem_answer[j],
            (i + 1 - ((i + 1) % 4)) / 4,
            (i + 1) % 4,
            divsArray[i].value
          );

          do {
            i++;
          } while (divsArray[i].value !== 'A');
          break;
        }
      }
      continue;
    }

    // 多项选择
    const a = problem_answer[j].split('');

    let m = 0;
    for (; m < a.length; m++) {
      for (; i < divsArray.length; i++) {
        if (
          divsArray[i].type === 'checkbox' &&
          divsArray[i].value === a[m]
        ) {
          divsArray[i].click();
          console.log(
            'Answer %d_%d %s match no.%d %s , it is a multiple selection',
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

// 避免 unused 警告
void conf;
