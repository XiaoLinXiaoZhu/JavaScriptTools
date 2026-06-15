export {};

function waitForEl(selector: string, timeout = 5000): Promise<Element> {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for "${selector}"`));
    }, timeout);
  });
}

function getTags(tagList: Element, listClass: string): string[] {
  const ul = tagList.querySelector(`ul.${listClass}`);
  if (!ul) return [];
  const items = ul.querySelectorAll<HTMLElement>('li[data-tag-name]');
  return Array.from(items).map(li => {
    const name = li.getAttribute('data-tag-name') ?? '';
    return name.replace(/_/g, ' ').toLowerCase();
  });
}

function getRating(): string {
  const el = document.getElementById('post-info-rating');
  if (!el) return '';
  const match = el.textContent?.match(/Rating:\s*(.+)/i);
  return match ? match[1].trim().toLowerCase() : '';
}

function trailing(line: string): string {
  return line ? line + ',' : '';
}

function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      resolve();
    } catch (e) {
      reject(e);
    }
    document.body.removeChild(textarea);
  });
}

async function main() {
  try {
    await waitForEl('#tag-list');
  } catch {
    return; // Not a post page with tags
  }

  const tagList = document.getElementById('tag-list')!;

  // Inject button
  const container = document.createElement('div');
  container.style.marginBottom = '10px';
  container.innerHTML = `
    <button id="danbooru-tag-copy-btn" style="
      padding:6px 14px;background:#1a73e8;color:#fff;border:none;
      border-radius:4px;cursor:pointer;font-size:13px;font-family:sans-serif;
    ">📋 Copy Tags</button>
    <span id="danbooru-tag-copy-msg" style="
      margin-left:10px;font-size:12px;color:#4caf50;display:none;
    ">Copied!</span>`;

  tagList.insertBefore(container, tagList.firstChild);

  const btn = document.getElementById('danbooru-tag-copy-btn')!;
  const msg = document.getElementById('danbooru-tag-copy-msg')!;

  btn.addEventListener('click', async () => {
    const metaTags        = getTags(tagList, 'meta-tag-list');
    const artistTags      = getTags(tagList, 'artist-tag-list');
    const copyrightTags   = getTags(tagList, 'copyright-tag-list');
    const characterTags   = getTags(tagList, 'character-tag-list');
    const generalTags     = getTags(tagList, 'general-tag-list');
    const rating          = getRating();

    const lines = [
      trailing(metaTags.join(', ')),                          // meta
      trailing(rating),                                        // rating
      trailing([...characterTags, ...copyrightTags].join(', ')), // character + copyright
      trailing(artistTags.map(t => '@' + t).join(', ')),       // @artist
      trailing(generalTags.join(', ')),                         // general
    ];

    const text = lines.join('\n');

    try {
      await copyToClipboard(text);
      msg.style.display = 'inline';
      setTimeout(() => { msg.style.display = 'none'; }, 1500);
    } catch {
      alert('Copy failed');
    }
  });

  console.log('[Danbooru Tag Copy] Ready');
}

main();
