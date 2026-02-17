export {};

//-配置项
// 是否需要移除广告跳转链接？
const ifRemoveAdsJump = true;
// 广告期间是否静音？
const ifMuteDuringAd = true;
// 广告持续时间？
const adDuringTime = 30;

//-函数调用
function removeAdsJump(): boolean {
  const vastBlocker = document.querySelector('.vast-blocker');
  if (vastBlocker) {
    vastBlocker.remove();
    console.log('移除广告跳转');
    return true;
  } else {
    console.log('没有广告跳转');
    return false;
  }
}

function skipAds(): boolean {
  const skipButton = document.querySelector('#adSkipButton');
  if (skipButton && skipButton.classList.contains('enable')) {
    (skipButton as HTMLElement).click();
    console.log('跳过广告');
    return true;
  } else {
    return false;
  }
}

function checkAds(): boolean {
  const skipButton = document.querySelector('#adSkipButton');
  if (!skipButton) {
    console.log('没有广告');
    return false;
  }
  return true;
}

function muteAds(): boolean {
  const muteButton = document.querySelector(
    '.vjs-mute-control.vjs-control.vjs-button'
  );
  if (muteButton) {
    if (!muteButton.classList.contains('vjs-vol-0')) {
      (muteButton as HTMLElement).click();
    } else {
      console.log('已经静音了');
      return true;
    }
    console.log('广告静音');
    return true;
  } else {
    console.log('没有静音按钮');
    return false;
  }
}

function unmuteAds(): boolean {
  const muteButton = document.querySelector(
    '.vjs-mute-control.vjs-control.vjs-button'
  );
  if (muteButton) {
    if (muteButton.classList.contains('vjs-vol-0')) {
      (muteButton as HTMLElement).click();
    } else {
      console.log('已经取消静音了');
      return true;
    }
    console.log('取消静音');
    return true;
  } else {
    console.log('没有静音按钮');
    return false;
  }
}

function agreeAge(): boolean {
  const adultButton = document.querySelector('#adult') as HTMLElement | null;
  if (adultButton) {
    adultButton.click();
    console.log('同意年龄确认');
    return true;
  } else {
    console.log('没有年龄确认按钮');
    return false;
  }
}

interface TryResult {
  onSuccess: (func: () => void) => void;
  onFail: (func: () => void) => void;
}

let timers: ReturnType<typeof setTimeout>[] = [];

function tryUntillSuccess(
  func: () => boolean,
  timeout: number,
  functionName = '未知函数',
  interval = 20
): TryResult {
  let successFunc: (() => void) | undefined;
  let failFunc: (() => void) | undefined;

  const timer = setInterval(() => {
    if (func()) {
      clearInterval(timer);
      clearTimeout(timeOut);
      console.log('成功执行' + functionName);
      if (successFunc) successFunc();
    }
  }, interval);
  timers.push(timer);

  const timeOut = setTimeout(() => {
    clearInterval(timer);
    console.log(functionName + '执行超时，停止尝试');
    if (failFunc) failFunc();
  }, timeout);
  timers.push(timeOut);

  return {
    onSuccess: (func: () => void) => {
      successFunc = func;
    },
    onFail: (func: () => void) => {
      failFunc = func;
    },
  };
}

function clearAllTimers(): void {
  timers.forEach((timer) => {
    clearInterval(timer);
    clearTimeout(timer);
  });
  timers = [];
  console.log('所有计时器已清除');
}

//- 程序核心入口
const handleChange = (): void => {
  console.log('类属性变化了,应该是剧集发生变化，重新加载脚本……');
  clearAllTimers();

  tryUntillSuccess(startObserve, 2000, '监控剧集变化');

  tryUntillSuccess(agreeAge, 2000, '同意年龄确认');

  if (ifRemoveAdsJump) {
    tryUntillSuccess(removeAdsJump, 2000, '移除广告跳转');
  }
  if (ifMuteDuringAd) {
    tryUntillSuccess(checkAds, 2000, '检查是否有广告并且静音').onSuccess(
      () => {
        tryUntillSuccess(muteAds, 2000, '广告静音');
      }
    );
  }

  // 防止被错误判定，1s后再做一个补充判定
  const reCheckAds = setTimeout(() => {
    if (!checkAds()) {
      tryUntillSuccess(unmuteAds, 1000, '取消静音');
    }
  }, 1000);
  timers.push(reCheckAds);

  // XXs后尝试跳过广告
  const skipAdsTimer = setTimeout(() => {
    console.log(adDuringTime + '秒到了，尝试跳过广告');
    tryUntillSuccess(skipAds, 5000, '跳过广告', 100).onSuccess(() => {
      tryUntillSuccess(unmuteAds, 2000, '跳过广告后取消静音');
    });
  }, adDuringTime * 1000);
  timers.push(skipAdsTimer);
};

// 创建一个观察者实例并传入回调函数
const mutationObserver = new MutationObserver(handleChange);

// 指定要监控的配置选项
const config: MutationObserverInit = {
  attributes: true,
  attributeFilter: ['class'],
};

function startObserve(): boolean {
  mutationObserver.disconnect();
  const targetNode = document.querySelector('.playing');
  if (targetNode) {
    mutationObserver.observe(targetNode, config);
    console.log('找到剧集元素');
    return true;
  } else {
    console.log('未找到剧集元素');
    return false;
  }
}

// 如果失败就直接运行主程序
tryUntillSuccess(startObserve, 2000, '监控剧集变化').onFail(handleChange);
