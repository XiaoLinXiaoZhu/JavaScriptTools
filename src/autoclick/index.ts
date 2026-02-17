export {};

function openURL(url: string): void {
  const aLabel = document.createElement('a');
  aLabel.setAttribute('href', url);
  aLabel.setAttribute('target', '_blank');
  aLabel.setAttribute('id', 'reportpoint');
  const reportPoint = document.getElementById('reportpoint');
  if (reportPoint) {
    document.body.removeChild(reportPoint);
  }
  document.body.appendChild(aLabel);
  aLabel.click();
  console.log('打开链接:', url);
}

class AutoDownload {
  url: string | RegExp;
  getElement: () => HTMLElement | null;
  downloaded = false;

  constructor(url: string | RegExp, getElement: () => HTMLElement | null) {
    this.url = url;
    this.getElement = getElement;
  }

  download(): void {
    if (this.downloaded) return;
    const element = this.getElement();
    if (!element) {
      console.log('element not found');
      return;
    }
    console.log('element:', element);
    element.click();
    this.downloaded = true;
  }

  tryDownload(): void {
    if (!location.href.match(this.url)) return;
    console.log('url matched:', this.url);
    const intervalId = setInterval(() => {
      if (this.downloaded) {
        clearInterval(intervalId);
        return;
      }
      this.download();
    }, 1000);
  }

  async tryDownloadAsync(
    waitTime = 1000,
    timeOut = 1e4
  ): Promise<void> {
    if (!location.href.match(this.url)) return;
    console.log('url matched:', this.url);
    let elapsedTime = 0;
    while (elapsedTime < timeOut || timeOut === -1) {
      elapsedTime += waitTime;
      if (this.downloaded) {
        console.log('已经下载过了，为什么还在？');
        break;
      }
      this.download();
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  async tryDownloadAsyncByFetch(
    waitTime = 1000,
    timeOut = 1e4
  ): Promise<void> {
    if (!location.href.match(this.url)) return;
    console.log('url matched:', this.url);
    let elapsedTime = 0;
    while (elapsedTime < timeOut || timeOut === -1) {
      elapsedTime += waitTime;
      if (this.downloaded) {
        console.log('已经下载过了，为什么还在？');
        break;
      }
      const element = this.getElement();
      if (!element) {
        console.log('element not found');
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }
      console.log('element:', element);
      let url: string | null = null;
      if ('href' in element && typeof (element as HTMLAnchorElement).href === 'string') {
        url = (element as HTMLAnchorElement).href;
      } else {
        url = element.getAttribute('href');
      }
      if (!url) {
        console.log('element has no href');
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }
      console.log('Fetching URL:', url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error('Fetch failed with status:', response.status);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
        const blob = await response.blob();
        let filename = url.split('/').pop() || 'download';
        filename = filename.split('?')[0];
        filename = decodeURIComponent(filename);
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
        console.log('Download triggered for:', url);
        this.downloaded = true;
      } catch (error) {
        console.error('Download failed:', error);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }
    }
  }
}

// 注册各站点的自动下载规则
new AutoDownload(
  /https:\/\/www.sunwenjie.top\/article\//,
  () =>
    document.querySelector(
      'a[href^="https://mega.nz/file/"]'
    ) as HTMLElement | null
).tryDownloadAsync();

new AutoDownload(
  /https:\/\/mega.nz\/file\//,
  () =>
    document.querySelector(
      'button.mega-button.positive.js-default-download.js-standard-download'
    ) as HTMLElement | null
).tryDownloadAsync();

new AutoDownload(
  /www\.nexusmods\.com\/.*?\/mods\/[0-9]+?\?tab=files\&file_id=/,
  () => {
    const shadowHost = document.querySelector('mod-file-download');
    if (!shadowHost) {
      console.log('shadowHost not found');
      return null;
    }
    const shadowRoot = shadowHost.shadowRoot;
    if (!shadowRoot) {
      console.log('shadowRoot not found');
      return null;
    }
    const button = shadowRoot.querySelector('button') as HTMLElement | null;
    if (!button) {
      console.log('button not found');
      return null;
    }
    return button;
  }
).tryDownloadAsync(1000, 30000);

new AutoDownload(
  /https:\/\/www\.asmrgay\.com\/.*?\/.+\.(mp3|flac|wav|ogg|m4a)/,
  () => {
    const container = document.querySelector('a.hope-button');
    if (!container) return null;
    const okElements = Array.from(container.querySelectorAll('a')).filter(
      (el) =>
        (el as HTMLAnchorElement).href.match(
          /https:\/\/asmr\.\d+\.xyz.*?\.(mp3|flac|wav|ogg|m4a)/
        )
    );
    return okElements.length > 0 ? (okElements[0] as HTMLElement) : null;
  }
).tryDownloadAsync(1000, -1);

