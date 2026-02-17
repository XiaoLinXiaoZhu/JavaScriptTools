export {};

let shutdown = 0;
let emptyTimes = 0;

// 主程序
window.onload = function () {
  shutdown = 0;
  emptyTimes = 0;
};

function getEndingNumber(str: string): number | null {
  const match = str.match(/\d{1,3}$/);
  return match ? parseInt(match[0], 10) : null;
}

function tryNextUrl(): void {
  const currentUrl = window.location.href;
  console.log('=====Now Url is : ' + currentUrl);
  let newUrl = currentUrl.slice(0, -4);
  const match = getEndingNumber(newUrl);
  console.log('=====Now Match Url is : ' + newUrl);
  console.log('=====Now Match is : ' + match);
  if (match) {
    let numberPart = match;

    if (numberPart > 9) {
      newUrl = newUrl.slice(0, -2);
    } else {
      newUrl = newUrl.slice(0, -1);
    }

    numberPart++;

    newUrl = newUrl + numberPart + '.rar';
    console.log('=====Next Url is :' + newUrl);
    window.location.href = newUrl;
  }
}

function tryPartUrl(): void {
  const currentUrl = window.location.href;
  let newUrl = currentUrl.slice(0, -3);
  newUrl += 'part1' + '.exe';
  window.open(newUrl, '_top');
}

// 设置延时3秒后执行
setTimeout(function () {
  function checkButton(): void {
    const currentUrl = window.location.href;
    const lastThreeChars = currentUrl.slice(-3);
    console.log('analying url,end with :' + lastThreeChars);

    if (
      lastThreeChars !== 'zip' &&
      lastThreeChars !== 'exe' &&
      lastThreeChars !== 'rar'
    ) {
      console.log(
        lastThreeChars + 'This is a normal page,stop running'
      );
      clearInterval(intervalId);
    }

    console.log('getting');
    let test = document.querySelector(
      '#root > div.hope-c-PJLV.hope-c-PJLV-iicyfOA-css > div > div > div > div:nth-child(3) > div > a'
    ) as HTMLAnchorElement | null;
    if (!test) {
      test = document.querySelector(
        '#root > div.hope-c-PJLV.hope-c-PJLV-iicyfOA-css > div > div > div > div:nth-child(3) > div > a'
      ) as HTMLAnchorElement | null;
    }

    if (!test && lastThreeChars === 'zip') {
      if (emptyTimes > 3) {
        tryPartUrl();
      } else {
        emptyTimes++;
      }
    }

    if (test && lastThreeChars === 'zip') {
      console.log(test);
      const js = test.href;
      window.location.href = js;
      console.log(js);
      alert('已开始下载');
      shutdown = 1;
      clearInterval(intervalId);
    }

    if (lastThreeChars === 'exe' || lastThreeChars === 'rar') {
      console.log('===== part mod now!');
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
        window.open(js, '_blank');
        console.log('尝试打开下一页面');
        tryNextUrl();
      }
    }
  }

  const intervalId = setInterval(checkButton, 2000);
}, 5000);

setTimeout(function () {
  function checkBoolValue(): void {
    const currentUrl = window.location.href;
    const lastThreeChars = currentUrl.slice(-3);

    if (
      lastThreeChars !== 'zip' &&
      lastThreeChars !== 'exe' &&
      lastThreeChars !== 'rar'
    ) {
      console.log(
        lastThreeChars + 'This is a normal page,stop detect ShutDown'
      );
      clearInterval(intervalId);
    }
    if (shutdown === 1) {
      alert('关闭页面……');
      window.open('about:blank', '_top')?.close();
      clearInterval(intervalId);
    } else {
      console.log('shutdown == 0');
    }
  }

  const intervalId = setInterval(checkBoolValue, 2000);
}, 20000);
