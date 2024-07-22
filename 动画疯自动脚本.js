// ==UserScript==
// @name         动画疯自动同意年龄确认，移除广告跳转，广告静音，自动点击跳过广告
// @namespace    http://tampermonkey.net/
// @version      1.0
// @license MIT
// @description  能够动画疯自动同意年龄确认，移除广告跳转，广告静音，自动点击跳过广告……安装即可，自动执行
// @author       XLXZ
// @match        https://ani.gamer.com.tw/animeVideo.php?sn=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamer.com.tw
// @grant        none
// ==/UserScript==
 
(function () {
    'use strict';
 
    let timers = [];
 
    // 定义回调函数，当观察到变化时执行
    const callback = function (mutationsList, observer) {
        console.log(`类属性变化了,应该是剧集发生变化，重新加载脚本……`);
 
        // 清除所有计时器
        timers.forEach(timer => {
            clearInterval(timer);
            clearTimeout(timer); // 对于setTimeout和setInterval都有效
        });
        timers = [];
        console.log('所有计时器已暂停');
 
        // 同意限制
        const agreeAge = setInterval(() => {
            const adultButton = document.querySelector('#adult');
            if (adultButton) {
                adultButton.click();
                clearInterval(agreeAge);
                console.log('同意年龄确认');
                clearTimeout(agreeAgeTimeOut);
            }
        }, 20);
        timers.push(agreeAge);
 
        // 确认是否真的有同意年龄确认，没有则清除计时器，避免无限循环
        const agreeAgeTimeOut = setTimeout(() => {
            console.log('没有年龄确认');
            clearInterval(agreeAgeTimeOut);
        }, 2000);
        timers.push(agreeAgeTimeOut);
 
        // 移除广告跳转
        const removeAds = setInterval(() => {
            const vastBlocker = document.querySelector('.vast-blocker');
            if (vastBlocker) {
                vastBlocker.remove();
                clearInterval(removeAds);
                console.log('移除广告跳转');
                clearTimeout(removeAdsTimeOut);
 
                // 广告静音
                const muteAds = setInterval(() => {
                    const muteButton = document.querySelector('.vjs-mute-control.vjs-control.vjs-button');
                    const skipButton = document.querySelector('#adSkipButton');
                    if (muteButton && skipButton) {
                        if (!muteButton.classList.contains('vjs-vol-0')) {
                            muteButton.click();
                        }
                        clearInterval(muteAds);
                        console.log('广告静音');
                    }
                }, 100);
                timers.push(muteAds);
 
                //在1s后确认是否真的有广告
                const checkAds = setTimeout(() => {
                    const skipButton = document.querySelector('#adSkipButton');
                    if (!skipButton) {
                        console.log('没有广告');
                        clearInterval(checkAds);
                        //恢复音量
                        const unmuteAds = setInterval(() => {
                            const muteButton = document.querySelector('.vjs-mute-control.vjs-control.vjs-button');
                            if (muteButton) {
                                if (muteButton.classList.contains('vjs-vol-0')) {
                                    muteButton.click();
                                }
                                clearInterval(unmuteAds);
                                console.log('恢复音量');
                            }
                        }, 20);
                        timers.push(unmuteAds);
                    }
                }, 1000);
                timers.push(checkAds);
            }
        }, 100);
        timers.push(removeAds);
 
        //2s后确认是否真的有广告，没有广告则清除计时器，避免无限循环
        const removeAdsTimeOut = setTimeout(() => {
            console.log('没有广告');
            clearInterval(removeAdsTimeOut);
        }, 2000);
        timers.push(removeAdsTimeOut);
 
        // 30秒后跳过广告
        const skipAds = setTimeout(() => {
            console.log('30秒到了');
            const action = setInterval(() => {
                const skipButton = document.querySelector('#adSkipButton');
                if (skipButton && skipButton.classList.contains('enable')) {
                    skipButton.click();
                    console.log('跳过广告');
                    // 成功跳过广告后取消静音
                    const unmuteAds = setInterval(() => {
                        const muteButton = document.querySelector('.vjs-mute-control.vjs-control.vjs-button');
                        if (muteButton) {
                            if (muteButton.classList.contains('vjs-vol-0')) {
                                muteButton.click();
                            }
                            clearInterval(unmuteAds);
                            console.log('取消静音');
                        }
                    }, 20);
                    clearInterval(action);
                }
            }, 100);
            timers.push(action);
        }, 30000);
        timers.push(skipAds);
    };
 
 
 
 
    // 创建一个观察者实例并传入回调函数
    const observer = new MutationObserver(callback);
 
    // 指定要监控的配置选项（这里是属性变化）
    const config = { attributes: true, attributeFilter: ['class'] };
 
    // 选择目标节点，假设你已经有了剧集元素的引用
    const targetNode = document.querySelector('.playing');
    console.log(targetNode ? '找到剧集元素' : '未找到剧集元素');
 
    // 开始监控目标节点
    if (targetNode) {
        observer.observe(targetNode, config);
    } else {
        console.log('未找到剧集元素');
    }
 
    // 注意：根据需要，你可能还需要在适当的时候停止观察
    // observer.disconnect();
})();