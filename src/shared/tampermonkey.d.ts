/** Tampermonkey API 类型声明 */

declare function GM_getValue<T>(key: string, defaultValue: T): T;
declare function GM_setValue(key: string, value: unknown): void;
declare function GM_addStyle(css: string): HTMLStyleElement;
declare function GM_registerMenuCommand(
  caption: string,
  commandFunc: () => void,
  accessKey?: string
): number;

interface GM_XHR_Response {
  responseText: string;
  status: number;
  statusText: string;
  readyState: number;
  responseHeaders: string;
  finalUrl: string;
}

interface GM_XHR_Options {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  data?: string;
  onload?: (response: GM_XHR_Response) => void;
  onerror?: (response: GM_XHR_Response) => void;
  ontimeout?: () => void;
}

declare function GM_xmlhttpRequest(options: GM_XHR_Options): void;
