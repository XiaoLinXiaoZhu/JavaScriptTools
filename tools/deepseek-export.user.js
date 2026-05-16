// ==UserScript==
// @name                DeepSeek Chat Export
// @namespace           https://github.com/XiaoLinXiaoZhu/JavaScriptTools
// @version             0.1.0
// @description         导出 DeepSeek 聊天记录为 Markdown，自动滚动收集完整对话（含深度思考）
// @author              XLXZ
// @license             MIT
// @match               https://chat.deepseek.com/*
// @grant               none
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/deepseek-export.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/deepseek-export.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // node_modules/esm-env/true.js
  var true_default = true;

  // node_modules/esm-env/dev-fallback.js
  var node_env = globalThis.process?.env?.NODE_ENV;
  var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");

  // node_modules/number-flow/dist/ssr-Cre0Q1Ju.mjs
  var h = String.raw;
  var m = String.raw;
  var v = true_default && (() => {
    try {
      document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return false;
    }
    return true;
  })();
  var k = true_default && typeof CSS < "u" && CSS.supports && CSS.supports("line-height", "mod(1,1)");
  var S = true_default && typeof matchMedia < "u" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
  var d = "--_number-flow-d-opacity";
  var g = "--_number-flow-d-width";
  var c = "--_number-flow-dx";
  var u = "--_number-flow-d";
  var _ = (() => {
    try {
      return CSS.registerProperty({
        name: d,
        syntax: "<number>",
        inherits: false,
        initialValue: "0"
      }), CSS.registerProperty({
        name: c,
        syntax: "<length>",
        inherits: true,
        initialValue: "0px"
      }), CSS.registerProperty({
        name: g,
        syntax: "<number>",
        inherits: false,
        initialValue: "0"
      }), CSS.registerProperty({
        name: u,
        syntax: "<number>",
        inherits: true,
        initialValue: "0"
      }), true;
    } catch {
      return false;
    }
  })();
  var s = "round(nearest, calc(var(--number-flow-mask-height, 0.25em) / 2), 1px)";
  var e = `calc(${s} * 2)`;
  var p = "var(--number-flow-mask-width, 0.5em)";
  var n = `calc(${p} / var(--scale-x))`;
  var r = "#000 0, transparent 71%";
  var x = m`:host{display:inline-block;direction:ltr;white-space:nowrap;isolation:isolate;line-height:1}.number,.number__inner{display:inline-block;transform-origin:left top}:host([data-will-change]) :is(.number,.number__inner,.section,.digit,.digit__num,.symbol){will-change:transform}.number{--scale-x:calc(1 + var(${g}) / var(--width));transform:translateX(var(${c})) scaleX(var(--scale-x));margin:0 calc(-1 * ${p});position:relative;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 ${n},#000 calc(100% - ${n}),transparent ),linear-gradient(to bottom,transparent 0,#000 ${e},#000 calc(100% - ${e}),transparent 100% ),radial-gradient(at bottom right,${r}),radial-gradient(at bottom left,${r}),radial-gradient(at top left,${r}),radial-gradient(at top right,${r});-webkit-mask-size:100% calc(100% - ${e} * 2),calc(100% - ${n} * 2) 100%,${n} ${e},${n} ${e},${n} ${e},${n} ${e};-webkit-mask-position:center,center,top left,top right,bottom right,bottom left;-webkit-mask-repeat:no-repeat}.number__inner{padding:${s} ${p};transform:scaleX(calc(1 / var(--scale-x))) translateX(calc(-1 * var(${c})))}:host > :not(.number){z-index:5}.section,.symbol{display:inline-block;position:relative;isolation:isolate}.section::after{content:'\200b';display:inline-block}.section--justify-left{transform-origin:center left}.section--justify-right{transform-origin:center right}.section > [inert],.symbol > [inert]{margin:0 !important;position:absolute !important;z-index:-1}.digit{display:inline-block;position:relative;--c:var(--current) + var(${u})}.digit__num,.number .section::after{padding:${s} 0}.digit__num{display:inline-block;--offset-raw:mod(var(--length) + var(--n) - mod(var(--c),var(--length)),var(--length));--offset:calc( var(--offset-raw) - var(--length) * round(down,var(--offset-raw) / (var(--length) / 2),1) );--y:clamp(-100%,var(--offset) * 100%,100%);transform:translateY(var(--y))}.digit__num[inert]{position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(var(--y))}.digit:not(.is-spinning) .digit__num[inert]{display:none}.symbol__value{display:inline-block;mix-blend-mode:plus-lighter;white-space:pre}.section--justify-left .symbol > [inert]{left:0}.section--justify-right .symbol > [inert]{right:0}.animate-presence{opacity:calc(1 + var(${d}))}`;
  var M = true_default ? HTMLElement : class {
  };
  var b = m`:host{display:inline-block;direction:ltr;white-space:nowrap;line-height:1}span{display:inline-block}:host([data-will-change]) span{will-change:transform}.number,.digit{padding:${s} 0}.symbol{white-space:pre}`;
  var $ = /* @__PURE__ */ __name((t = "") => m`:where(number-flow${t}){line-height:1}number-flow${t} > span{font-kerning:none;display:inline-block;padding:${e} 0}`, "$");

  // node_modules/number-flow/dist/lite.mjs
  var p2 = /* @__PURE__ */ __name((n2, t, e2) => {
    const i = document.createElement(n2), [s2, o] = Array.isArray(t) ? [void 0, t] : [t, e2];
    return s2 && Object.assign(i, s2), o == null || o.forEach((a) => i.appendChild(a)), i;
  }, "p");
  var V2 = /* @__PURE__ */ __name((n2, t) => {
    var e2;
    return t === "left" ? n2.offsetLeft : (((e2 = n2.offsetParent instanceof HTMLElement ? n2.offsetParent : null) == null ? void 0 : e2.offsetWidth) ?? 0) - n2.offsetWidth - n2.offsetLeft;
  }, "V");
  var W = /* @__PURE__ */ __name((n2) => n2.offsetWidth > 0 && n2.offsetHeight > 0, "W");
  var X = /* @__PURE__ */ __name((n2, t) => {
    true_default && !customElements.get(n2) && customElements.define(n2, t);
  }, "X");
  function k2(n2, t, { reverse: e2 = false } = {}) {
    const i = n2.length;
    for (let s2 = e2 ? i - 1 : 0; e2 ? s2 >= 0 : s2 < i; e2 ? s2-- : s2++)
      t(n2[s2], s2);
  }
  __name(k2, "k");
  function z(n2, t, e2, i) {
    const s2 = t.formatToParts(n2);
    e2 && s2.unshift({ type: "prefix", value: e2 }), i && s2.push({ type: "suffix", value: i });
    const o = [], a = [], r3 = [], d2 = [], c2 = {}, f2 = /* @__PURE__ */ __name((l2) => `${l2}:${c2[l2] = (c2[l2] ?? -1) + 1}`, "f");
    let u2 = "", m2 = false, g2 = false;
    for (const l2 of s2) {
      u2 += l2.value;
      const h3 = l2.type === "minusSign" || l2.type === "plusSign" ? "sign" : l2.type;
      h3 === "integer" ? (m2 = true, a.push(...l2.value.split("").map((_2) => ({ type: h3, value: parseInt(_2) })))) : h3 === "group" ? a.push({ type: h3, value: l2.value }) : h3 === "decimal" ? (g2 = true, r3.push({ type: h3, value: l2.value, key: f2(h3) })) : h3 === "fraction" ? r3.push(...l2.value.split("").map((_2) => ({
        type: h3,
        value: parseInt(_2),
        key: f2(h3),
        pos: -1 - c2[h3]
      }))) : (m2 || g2 ? d2 : o).push({
        type: h3,
        value: l2.value,
        key: f2(h3)
      });
    }
    const v3 = [];
    for (let l2 = a.length - 1; l2 >= 0; l2--) {
      const h3 = a[l2];
      v3.unshift(h3.type === "integer" ? {
        ...h3,
        key: f2(h3.type),
        pos: c2[h3.type]
      } : {
        ...h3,
        key: f2(h3.type)
      });
    }
    return {
      pre: o,
      integer: v3,
      fraction: r3,
      post: d2,
      valueAsString: u2,
      value: typeof n2 == "string" ? parseFloat(n2) : n2
    };
  }
  __name(z, "z");
  var B = k && v && _;
  var _D = class _D extends M {
    constructor() {
      super(), this.created = false, this.batched = false;
      const { animated: t, ...e2 } = this.constructor.defaultProps;
      this._animated = this.computedAnimated = t, Object.assign(this, e2);
    }
    get animated() {
      return this._animated;
    }
    set animated(t) {
      var e2;
      this.animated !== t && (this._animated = t, (e2 = this.shadowRoot) == null || e2.getAnimations().forEach((i) => i.finish()));
    }
    /**
     * @internal
     */
    set data(t) {
      var r3, d2;
      if (t == null)
        return;
      const { pre: e2, integer: i, fraction: s2, post: o, value: a } = t;
      if (this.created) {
        const c2 = this._data;
        this._data = t, this.computedTrend = typeof this.trend == "function" ? this.trend(c2.value, a) : this.trend, this.computedAnimated = B && this._animated && (!this.respectMotionPreference || !((r3 = S) != null && r3.matches)) && // https://github.com/barvian/number-flow/issues/9
        W(this) && // https://github.com/barvian/number-flow/issues/165
        this.ownerDocument.visibilityState === "visible", (d2 = this.plugins) == null || d2.forEach((f2) => {
          var u2;
          return (u2 = f2.onUpdate) == null ? void 0 : u2.call(f2, t, c2, this);
        }), this.batched || this.willUpdate(), this._pre.update(e2), this._num.update({ integer: i, fraction: s2 }), this._post.update(o), this.batched || this.didUpdate();
      } else {
        this._data = t, this.attachShadow({ mode: "open" });
        try {
          this._internals ?? (this._internals = this.attachInternals()), this._internals.role = "img";
        } catch {
        }
        const c2 = document.createElement("style");
        this.nonce && (c2.nonce = this.nonce), c2.textContent = x, this.shadowRoot.appendChild(c2), this._pre = new A(this, e2, {
          justify: "right",
          part: "left"
        }), this.shadowRoot.appendChild(this._pre.el), this._num = new F(this, i, s2), this.shadowRoot.appendChild(this._num.el), this._post = new A(this, o, {
          justify: "left",
          part: "right"
        }), this.shadowRoot.appendChild(this._post.el), this.created = true;
      }
      try {
        this._internals.ariaLabel = t.valueAsString;
      } catch {
      }
    }
    /**
     * @internal
     */
    willUpdate() {
      this._pre.willUpdate(), this._num.willUpdate(), this._post.willUpdate();
    }
    /**
     * @internal
     */
    didUpdate() {
      if (!this.computedAnimated)
        return;
      this._abortAnimationsFinish ? this._abortAnimationsFinish.abort() : this.dispatchEvent(new Event("animationsstart")), this._pre.didUpdate(), this._num.didUpdate(), this._post.didUpdate();
      const t = new AbortController();
      Promise.all(this.shadowRoot.getAnimations().map((e2) => e2.finished)).then(() => {
        t.signal.aborted || (this.dispatchEvent(new Event("animationsfinish")), this._abortAnimationsFinish = void 0);
      }), this._abortAnimationsFinish = t;
    }
  };
  __name(_D, "D");
  var D = _D;
  D.defaultProps = {
    transformTiming: {
      duration: 900,
      // Make sure to keep this minified:
      easing: "linear(0,.005,.019,.039,.066,.096,.129,.165,.202,.24,.278,.316,.354,.39,.426,.461,.494,.526,.557,.586,.614,.64,.665,.689,.711,.731,.751,.769,.786,.802,.817,.831,.844,.856,.867,.877,.887,.896,.904,.912,.919,.925,.931,.937,.942,.947,.951,.955,.959,.962,.965,.968,.971,.973,.976,.978,.98,.981,.983,.984,.986,.987,.988,.989,.99,.991,.992,.992,.993,.994,.994,.995,.995,.996,.996,.9963,.9967,.9969,.9972,.9975,.9977,.9979,.9981,.9982,.9984,.9985,.9987,.9988,.9989,1)"
    },
    spinTiming: void 0,
    opacityTiming: { duration: 450, easing: "ease-out" },
    animated: true,
    trend: /* @__PURE__ */ __name((n2, t) => Math.sign(t - n2), "trend"),
    respectMotionPreference: true,
    plugins: void 0,
    digits: void 0
  };
  var _F = class _F {
    constructor(t, e2, i, { className: s2, ...o } = {}) {
      this.flow = t, this._integer = new b2(t, e2, {
        justify: "right",
        part: "integer"
      }), this._fraction = new b2(t, i, {
        justify: "left",
        part: "fraction"
      }), this._inner = p2("span", {
        className: "number__inner"
      }, [this._integer.el, this._fraction.el]), this.el = p2("span", {
        ...o,
        part: "number",
        className: `number ${s2 ?? ""}`
      }, [this._inner]);
    }
    willUpdate() {
      this._prevWidth = this.el.offsetWidth, this._prevLeft = this.el.getBoundingClientRect().left, this._integer.willUpdate(), this._fraction.willUpdate();
    }
    update({ integer: t, fraction: e2 }) {
      this._integer.update(t), this._fraction.update(e2);
    }
    didUpdate() {
      const t = this.el.getBoundingClientRect();
      this._integer.didUpdate(), this._fraction.didUpdate();
      const e2 = this._prevLeft - t.left, i = this.el.offsetWidth, s2 = this._prevWidth - i;
      this.el.style.setProperty("--width", String(i)), this.el.animate({
        [c]: [`${e2}px`, "0px"],
        [g]: [s2, 0]
      }, {
        ...this.flow.transformTiming,
        composite: "accumulate"
      });
    }
  };
  __name(_F, "F");
  var F = _F;
  var _E = class _E {
    constructor(t, e2, { justify: i, className: s2, ...o }, a) {
      this.flow = t, this.children = /* @__PURE__ */ new Map(), this.onCharRemove = (d2) => () => {
        this.children.delete(d2);
      }, this.justify = i;
      const r3 = e2.map((d2) => this.addChar(d2).el);
      this.el = p2("span", {
        ...o,
        className: `section section--justify-${i} ${s2 ?? ""}`
      }, a ? a(r3) : r3);
    }
    addChar(t, { startDigitsAtZero: e2 = false, ...i } = {}) {
      const s2 = t.type === "integer" || t.type === "fraction" ? new x2(this, t.type, e2 ? 0 : t.value, t.pos, {
        ...i,
        onRemove: this.onCharRemove(t.key)
      }) : new I(this, t.type, t.value, {
        ...i,
        onRemove: this.onCharRemove(t.key)
      });
      return this.children.set(t.key, s2), s2;
    }
    unpop(t) {
      t.el.removeAttribute("inert"), t.el.style.top = "", t.el.style[this.justify] = "";
    }
    pop(t) {
      t.forEach((e2) => {
        e2.el.style.top = `${e2.el.offsetTop}px`, e2.el.style[this.justify] = `${V2(e2.el, this.justify)}px`;
      }), t.forEach((e2) => {
        e2.el.setAttribute("inert", ""), e2.present = false;
      });
    }
    addNewAndUpdateExisting(t) {
      const e2 = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s2 = this.justify === "left", o = s2 ? "prepend" : "append";
      if (k2(t, (a) => {
        let r3;
        this.children.has(a.key) ? (r3 = this.children.get(a.key), i.set(a, r3), this.unpop(r3), r3.present = true) : (r3 = this.addChar(a, { startDigitsAtZero: true, animateIn: true }), e2.set(a, r3)), this.el[o](r3.el);
      }, { reverse: s2 }), this.flow.computedAnimated) {
        const a = this.el.getBoundingClientRect();
        e2.forEach((r3) => {
          r3.willUpdate(a);
        });
      }
      e2.forEach((a, r3) => {
        a.update(r3.value);
      }), i.forEach((a, r3) => {
        a.update(r3.value);
      });
    }
    willUpdate() {
      const t = this.el.getBoundingClientRect();
      this._prevOffset = t[this.justify], this.children.forEach((e2) => e2.willUpdate(t));
    }
    didUpdate() {
      const t = this.el.getBoundingClientRect();
      this.children.forEach((s2) => s2.didUpdate(t));
      const e2 = t[this.justify], i = this._prevOffset - e2;
      i && this.children.size && this.el.animate({
        transform: [`translateX(${i}px)`, "none"]
      }, {
        ...this.flow.transformTiming,
        composite: "accumulate"
      });
    }
  };
  __name(_E, "E");
  var E = _E;
  var _b = class _b extends E {
    update(t) {
      const e2 = /* @__PURE__ */ new Map();
      this.children.forEach((i, s2) => {
        t.find((o) => o.key === s2) || e2.set(s2, i), this.unpop(i);
      }), this.addNewAndUpdateExisting(t), e2.forEach((i) => {
        i instanceof x2 && i.update(0);
      }), this.pop(e2);
    }
  };
  __name(_b, "b");
  var b2 = _b;
  var _A = class _A extends E {
    update(t) {
      const e2 = /* @__PURE__ */ new Map();
      this.children.forEach((i, s2) => {
        t.find((o) => o.key === s2) || e2.set(s2, i);
      }), this.pop(e2), this.addNewAndUpdateExisting(t);
    }
  };
  __name(_A, "A");
  var A = _A;
  var _y = class _y {
    constructor(t, e2, { onRemove: i, animateIn: s2 = false } = {}) {
      this.flow = t, this.el = e2, this._present = true, this._remove = () => {
        var o;
        this.el.remove(), (o = this._onRemove) == null || o.call(this);
      }, this.el.classList.add("animate-presence"), this.flow.computedAnimated && s2 && this.el.animate({
        [d]: [-0.9999, 0]
      }, {
        ...this.flow.opacityTiming,
        composite: "accumulate"
      }), this._onRemove = i;
    }
    get present() {
      return this._present;
    }
    set present(t) {
      if (this._present !== t) {
        if (this._present = t, t ? this.el.removeAttribute("inert") : this.el.setAttribute("inert", ""), !this.flow.computedAnimated) {
          t || this._remove();
          return;
        }
        this.el.style.setProperty("--_number-flow-d-opacity", t ? "0" : "-.999"), this.el.animate({
          [d]: t ? [-0.9999, 0] : [0.999, 0]
        }, {
          ...this.flow.opacityTiming,
          composite: "accumulate"
        }), t ? this.flow.removeEventListener("animationsfinish", this._remove) : this.flow.addEventListener("animationsfinish", this._remove, {
          once: true
        });
      }
    }
  };
  __name(_y, "y");
  var y = _y;
  var _R = class _R extends y {
    constructor(t, e2, i, s2) {
      super(t.flow, i, s2), this.section = t, this.value = e2, this.el = i;
    }
  };
  __name(_R, "R");
  var R = _R;
  var _x = class _x extends R {
    constructor(t, e2, i, s2, o) {
      var c2, f2;
      const a = (((f2 = (c2 = t.flow.digits) == null ? void 0 : c2[s2]) == null ? void 0 : f2.max) ?? 9) + 1, r3 = Array.from({ length: a }).map((u2, m2) => {
        const g2 = p2("span", { className: "digit__num" }, [
          document.createTextNode(String(m2))
        ]);
        return m2 !== i && g2.setAttribute("inert", ""), g2.style.setProperty("--n", String(m2)), g2;
      }), d2 = p2("span", {
        part: `digit ${e2}-digit`,
        className: "digit"
      }, r3);
      d2.style.setProperty("--current", String(i)), d2.style.setProperty("--length", String(a)), super(t, i, d2, o), this.pos = s2, this._onAnimationsFinish = () => {
        this.el.classList.remove("is-spinning");
      }, this._numbers = r3, this.length = a;
    }
    willUpdate(t) {
      const e2 = this.el.getBoundingClientRect();
      this._prevValue = this.value;
      const i = e2[this.section.justify] - t[this.section.justify], s2 = e2.width / 2;
      this._prevCenter = this.section.justify === "left" ? i + s2 : i - s2;
    }
    update(t) {
      this.el.style.setProperty("--current", String(t)), this._numbers.forEach((e2, i) => i === t ? e2.removeAttribute("inert") : e2.setAttribute("inert", "")), this.value = t;
    }
    didUpdate(t) {
      const e2 = this.el.getBoundingClientRect(), i = e2[this.section.justify] - t[this.section.justify], s2 = e2.width / 2, o = this.section.justify === "left" ? i + s2 : i - s2, a = this._prevCenter - o;
      a && this.el.animate({
        transform: [`translateX(${a}px)`, "none"]
      }, {
        ...this.flow.transformTiming,
        composite: "accumulate"
      });
      const r3 = this.getDelta();
      r3 && (this.el.classList.add("is-spinning"), this.el.animate({
        [u]: [-r3, 0]
      }, {
        ...this.flow.spinTiming ?? this.flow.transformTiming,
        composite: "accumulate"
      }), this.flow.addEventListener("animationsfinish", this._onAnimationsFinish, { once: true }));
    }
    getDelta() {
      var i;
      if (this.flow.plugins)
        for (const s2 of this.flow.plugins) {
          const o = (i = s2.getDelta) == null ? void 0 : i.call(s2, this.value, this._prevValue, this);
          if (o != null)
            return o;
        }
      const t = this.value - this._prevValue, e2 = this.flow.computedTrend || Math.sign(t);
      return e2 < 0 && this.value > this._prevValue ? this.value - this.length - this._prevValue : e2 > 0 && this.value < this._prevValue ? this.length - this._prevValue + this.value : t;
    }
  };
  __name(_x, "x");
  var x2 = _x;
  var _I = class _I extends R {
    constructor(t, e2, i, s2) {
      const o = p2("span", {
        className: "symbol__value",
        textContent: i
      });
      super(t, i, p2("span", {
        part: `symbol ${e2}`,
        className: "symbol"
      }, [o]), s2), this.type = e2, this._children = /* @__PURE__ */ new Map(), this._onChildRemove = (a) => () => {
        this._children.delete(a);
      }, this._children.set(i, new y(this.flow, o, {
        onRemove: this._onChildRemove(i)
      }));
    }
    willUpdate(t) {
      if (this.type === "decimal")
        return;
      const e2 = this.el.getBoundingClientRect();
      this._prevOffset = e2[this.section.justify] - t[this.section.justify];
    }
    update(t) {
      if (this.value !== t) {
        const e2 = this._children.get(this.value);
        e2 && (e2.present = false);
        const i = this._children.get(t);
        if (i)
          i.present = true;
        else {
          const s2 = p2("span", {
            className: "symbol__value",
            textContent: t
          });
          this.el.appendChild(s2), this._children.set(t, new y(this.flow, s2, {
            animateIn: true,
            onRemove: this._onChildRemove(t)
          }));
        }
      }
      this.value = t;
    }
    didUpdate(t) {
      if (this.type === "decimal")
        return;
      const i = this.el.getBoundingClientRect()[this.section.justify] - t[this.section.justify], s2 = this._prevOffset - i;
      s2 && this.el.animate({
        transform: [`translateX(${s2}px)`, "none"]
      }, { ...this.flow.transformTiming, composite: "accumulate" });
    }
  };
  __name(_I, "I");
  var I = _I;

  // node_modules/number-flow/dist/csp.mjs
  var r2 = /* @__PURE__ */ __name((s2) => [b, $(s2), x], "r");

  // node_modules/number-flow/dist/index.mjs
  var v2 = r2();
  var f = "number-flow-connect";
  var h2 = "number-flow-update";
  var _b2 = class _b2 extends D {
    constructor() {
      super(...arguments), this.connected = false;
    }
    connectedCallback() {
      this.connected = true, this.dispatchEvent(new Event(f, { bubbles: true }));
    }
    disconnectedCallback() {
      this.connected = false;
    }
    get value() {
      return this._value;
    }
    update(t) {
      (!this._formatter || this._prevFormat !== this.format || this._prevLocales !== this.locales) && (this._formatter = new Intl.NumberFormat(this.locales, this.format), this._prevFormat = this.format, this._prevLocales = this.locales), t != null && (this._value = t), this.dispatchEvent(new Event(h2, { bubbles: true })), this.data = z(this._value, this._formatter, this.numberPrefix, this.numberSuffix);
    }
  };
  __name(_b2, "b");
  var b3 = _b2;
  X("number-flow", b3);

  // packages/components/dist/toast.js
  // @__NO_SIDE_EFFECTS__
  function An(t) {
    const e2 = /* @__PURE__ */ Object.create(null);
    for (const n2 of t.split(",")) e2[n2] = 1;
    return (n2) => n2 in e2;
  }
  __name(An, "An");
  var U = {};
  var ne = [];
  var On = /* @__PURE__ */ __name(() => {
  }, "On");
  var Ps = /* @__PURE__ */ __name(() => false, "Ps");
  var Ke = /* @__PURE__ */ __name((t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
  (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), "Ke");
  var ze = /* @__PURE__ */ __name((t) => t.startsWith("onUpdate:"), "ze");
  var lt = Object.assign;
  var Ir = /* @__PURE__ */ __name((t, e2) => {
    const n2 = t.indexOf(e2);
    n2 > -1 && t.splice(n2, 1);
  }, "Ir");
  var Rr = Object.prototype.hasOwnProperty;
  var D2 = /* @__PURE__ */ __name((t, e2) => Rr.call(t, e2), "D");
  var P = Array.isArray;
  var ge = /* @__PURE__ */ __name((t) => Oe(t) === "[object Map]", "ge");
  var Nr = /* @__PURE__ */ __name((t) => Oe(t) === "[object Set]", "Nr");
  var Xn = /* @__PURE__ */ __name((t) => Oe(t) === "[object Date]", "Xn");
  var K = /* @__PURE__ */ __name((t) => typeof t == "function", "K");
  var W2 = /* @__PURE__ */ __name((t) => typeof t == "string", "W");
  var Tt = /* @__PURE__ */ __name((t) => typeof t == "symbol", "Tt");
  var V3 = /* @__PURE__ */ __name((t) => t !== null && typeof t == "object", "V");
  var Fs = /* @__PURE__ */ __name((t) => (V3(t) || K(t)) && K(t.then) && K(t.catch), "Fs");
  var Is = Object.prototype.toString;
  var Oe = /* @__PURE__ */ __name((t) => Is.call(t), "Oe");
  var Lr = /* @__PURE__ */ __name((t) => Oe(t).slice(8, -1), "Lr");
  var Dr = /* @__PURE__ */ __name((t) => Oe(t) === "[object Object]", "Dr");
  var Mn = /* @__PURE__ */ __name((t) => W2(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, "Mn");
  var me = /* @__PURE__ */ An(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  var Ue = /* @__PURE__ */ __name((t) => {
    const e2 = /* @__PURE__ */ Object.create(null);
    return ((n2) => e2[n2] || (e2[n2] = t(n2)));
  }, "Ue");
  var $r = /-\w/g;
  var dt = Ue(
    (t) => t.replace($r, (e2) => e2.slice(1).toUpperCase())
  );
  var Hr = /\B([A-Z])/g;
  var Zt = Ue(
    (t) => t.replace(Hr, "-$1").toLowerCase()
  );
  var Rs = Ue((t) => t.charAt(0).toUpperCase() + t.slice(1));
  var tn = Ue(
    (t) => t ? `on${Rs(t)}` : ""
  );
  var Ut = /* @__PURE__ */ __name((t, e2) => !Object.is(t, e2), "Ut");
  var en = /* @__PURE__ */ __name((t, ...e2) => {
    for (let n2 = 0; n2 < t.length; n2++)
      t[n2](...e2);
  }, "en");
  var Ns = /* @__PURE__ */ __name((t, e2, n2, s2 = false) => {
    Object.defineProperty(t, e2, {
      configurable: true,
      enumerable: false,
      writable: s2,
      value: n2
    });
  }, "Ns");
  var jr = /* @__PURE__ */ __name((t) => {
    const e2 = parseFloat(t);
    return isNaN(e2) ? t : e2;
  }, "jr");
  var Vr = /* @__PURE__ */ __name((t) => {
    const e2 = W2(t) ? Number(t) : NaN;
    return isNaN(e2) ? t : e2;
  }, "Vr");
  var Zn;
  var We = /* @__PURE__ */ __name(() => Zn || (Zn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), "We");
  function Pn(t) {
    if (P(t)) {
      const e2 = {};
      for (let n2 = 0; n2 < t.length; n2++) {
        const s2 = t[n2], r3 = W2(s2) ? Ur(s2) : Pn(s2);
        if (r3)
          for (const i in r3)
            e2[i] = r3[i];
      }
      return e2;
    } else if (W2(t) || V3(t))
      return t;
  }
  __name(Pn, "Pn");
  var Br = /;(?![^(]*\))/g;
  var Kr = /:([^]+)/;
  var zr = /\/\*[^]*?\*\//g;
  function Ur(t) {
    const e2 = {};
    return t.replace(zr, "").split(Br).forEach((n2) => {
      if (n2) {
        const s2 = n2.split(Kr);
        s2.length > 1 && (e2[s2[0].trim()] = s2[1].trim());
      }
    }), e2;
  }
  __name(Ur, "Ur");
  function Se(t) {
    let e2 = "";
    if (W2(t))
      e2 = t;
    else if (P(t))
      for (let n2 = 0; n2 < t.length; n2++) {
        const s2 = Se(t[n2]);
        s2 && (e2 += s2 + " ");
      }
    else if (V3(t))
      for (const n2 in t)
        t[n2] && (e2 += n2 + " ");
    return e2.trim();
  }
  __name(Se, "Se");
  var Wr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var kr = /* @__PURE__ */ An(Wr);
  function Ls(t) {
    return !!t || t === "";
  }
  __name(Ls, "Ls");
  function qr(t, e2) {
    if (t.length !== e2.length) return false;
    let n2 = true;
    for (let s2 = 0; n2 && s2 < t.length; s2++)
      n2 = Fn(t[s2], e2[s2]);
    return n2;
  }
  __name(qr, "qr");
  function Fn(t, e2) {
    if (t === e2) return true;
    let n2 = Xn(t), s2 = Xn(e2);
    if (n2 || s2)
      return n2 && s2 ? t.getTime() === e2.getTime() : false;
    if (n2 = Tt(t), s2 = Tt(e2), n2 || s2)
      return t === e2;
    if (n2 = P(t), s2 = P(e2), n2 || s2)
      return n2 && s2 ? qr(t, e2) : false;
    if (n2 = V3(t), s2 = V3(e2), n2 || s2) {
      if (!n2 || !s2)
        return false;
      const r3 = Object.keys(t).length, i = Object.keys(e2).length;
      if (r3 !== i)
        return false;
      for (const o in t) {
        const l2 = t.hasOwnProperty(o), f2 = e2.hasOwnProperty(o);
        if (l2 && !f2 || !l2 && f2 || !Fn(t[o], e2[o]))
          return false;
      }
    }
    return String(t) === String(e2);
  }
  __name(Fn, "Fn");
  var Ds = /* @__PURE__ */ __name((t) => !!(t && t.__v_isRef === true), "Ds");
  var $s = /* @__PURE__ */ __name((t) => W2(t) ? t : t == null ? "" : P(t) || V3(t) && (t.toString === Is || !K(t.toString)) ? Ds(t) ? $s(t.value) : JSON.stringify(t, Hs, 2) : String(t), "$s");
  var Hs = /* @__PURE__ */ __name((t, e2) => Ds(e2) ? Hs(t, e2.value) : ge(e2) ? {
    [`Map(${e2.size})`]: [...e2.entries()].reduce(
      (n2, [s2, r3], i) => (n2[nn(s2, i) + " =>"] = r3, n2),
      {}
    )
  } : Nr(e2) ? {
    [`Set(${e2.size})`]: [...e2.values()].map((n2) => nn(n2))
  } : Tt(e2) ? nn(e2) : V3(e2) && !P(e2) && !Dr(e2) ? String(e2) : e2, "Hs");
  var nn = /* @__PURE__ */ __name((t, e2 = "") => {
    var n2;
    return (
      // Symbol.description in es2019+ so we need to cast here to pass
      // the lib: es2016 check
      Tt(t) ? `Symbol(${(n2 = t.description) != null ? n2 : e2})` : t
    );
  }, "nn");
  var Q;
  var _Yr = class _Yr {
    // TODO isolatedDeclarations "__v_skip"
    constructor(e2 = false) {
      this.detached = e2, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this._warnOnRun = true, this.__v_skip = true, !e2 && Q && (Q.active ? (this.parent = Q, this.index = (Q.scopes || (Q.scopes = [])).push(
        this
      ) - 1) : (this._active = false, this._warnOnRun = false));
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let e2, n2;
        if (this.scopes)
          for (e2 = 0, n2 = this.scopes.length; e2 < n2; e2++)
            this.scopes[e2].pause();
        for (e2 = 0, n2 = this.effects.length; e2 < n2; e2++)
          this.effects[e2].pause();
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = false;
        let e2, n2;
        if (this.scopes)
          for (e2 = 0, n2 = this.scopes.length; e2 < n2; e2++)
            this.scopes[e2].resume();
        for (e2 = 0, n2 = this.effects.length; e2 < n2; e2++)
          this.effects[e2].resume();
      }
    }
    run(e2) {
      if (this._active) {
        const n2 = Q;
        try {
          return Q = this, e2();
        } finally {
          Q = n2;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      ++this._on === 1 && (this.prevScope = Q, Q = this);
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      if (this._on > 0 && --this._on === 0) {
        if (Q === this)
          Q = this.prevScope;
        else {
          let e2 = Q;
          for (; e2; ) {
            if (e2.prevScope === this) {
              e2.prevScope = this.prevScope;
              break;
            }
            e2 = e2.prevScope;
          }
        }
        this.prevScope = void 0;
      }
    }
    stop(e2) {
      if (this._active) {
        this._active = false;
        let n2, s2;
        for (n2 = 0, s2 = this.effects.length; n2 < s2; n2++)
          this.effects[n2].stop();
        for (this.effects.length = 0, n2 = 0, s2 = this.cleanups.length; n2 < s2; n2++)
          this.cleanups[n2]();
        if (this.cleanups.length = 0, this.scopes) {
          for (n2 = 0, s2 = this.scopes.length; n2 < s2; n2++)
            this.scopes[n2].stop(true);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !e2) {
          const r3 = this.parent.scopes.pop();
          r3 && r3 !== this && (this.parent.scopes[this.index] = r3, r3.index = this.index);
        }
        this.parent = void 0;
      }
    }
  };
  __name(_Yr, "Yr");
  var Yr = _Yr;
  var j;
  var sn = /* @__PURE__ */ new WeakSet();
  var _Gr = class _Gr {
    constructor(e2) {
      this.fn = e2, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Q && (Q.active ? Q.effects.push(this) : this.flags &= -2);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, sn.has(this) && (sn.delete(this), this.trigger()));
    }
    /**
     * @internal
     */
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Jr(this);
    }
    run() {
      if (!(this.flags & 1))
        return this.fn();
      this.flags |= 2, Qn(this), Vs(this);
      const e2 = j, n2 = ht;
      j = this, ht = true;
      try {
        return this.fn();
      } finally {
        Bs(this), j = e2, ht = n2, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let e2 = this.deps; e2; e2 = e2.nextDep)
          Nn(e2);
        this.deps = this.depsTail = void 0, Qn(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? sn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    /**
     * @internal
     */
    runIfDirty() {
      gn(this) && this.run();
    }
    get dirty() {
      return gn(this);
    }
  };
  __name(_Gr, "Gr");
  var Gr = _Gr;
  var js = 0;
  var _e;
  var xe;
  function Jr(t, e2 = false) {
    if (t.flags |= 8, e2) {
      t.next = xe, xe = t;
      return;
    }
    t.next = _e, _e = t;
  }
  __name(Jr, "Jr");
  function In() {
    js++;
  }
  __name(In, "In");
  function Rn() {
    if (--js > 0)
      return;
    if (xe) {
      let e2 = xe;
      for (xe = void 0; e2; ) {
        const n2 = e2.next;
        e2.next = void 0, e2.flags &= -9, e2 = n2;
      }
    }
    let t;
    for (; _e; ) {
      let e2 = _e;
      for (_e = void 0; e2; ) {
        const n2 = e2.next;
        if (e2.next = void 0, e2.flags &= -9, e2.flags & 1)
          try {
            e2.trigger();
          } catch (s2) {
            t || (t = s2);
          }
        e2 = n2;
      }
    }
    if (t) throw t;
  }
  __name(Rn, "Rn");
  function Vs(t) {
    for (let e2 = t.deps; e2; e2 = e2.nextDep)
      e2.version = -1, e2.prevActiveLink = e2.dep.activeLink, e2.dep.activeLink = e2;
  }
  __name(Vs, "Vs");
  function Bs(t) {
    let e2, n2 = t.depsTail, s2 = n2;
    for (; s2; ) {
      const r3 = s2.prevDep;
      s2.version === -1 ? (s2 === n2 && (n2 = r3), Nn(s2), Zr(s2)) : e2 = s2, s2.dep.activeLink = s2.prevActiveLink, s2.prevActiveLink = void 0, s2 = r3;
    }
    t.deps = e2, t.depsTail = n2;
  }
  __name(Bs, "Bs");
  function gn(t) {
    for (let e2 = t.deps; e2; e2 = e2.nextDep)
      if (e2.dep.version !== e2.version || e2.dep.computed && (Xr(e2.dep.computed) || e2.dep.version !== e2.version))
        return true;
    return !!t._dirty;
  }
  __name(gn, "gn");
  function Xr(t) {
    if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Le) || (t.globalVersion = Le, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !gn(t))))
      return;
    t.flags |= 2;
    const e2 = t.dep, n2 = j, s2 = ht;
    j = t, ht = true;
    try {
      Vs(t);
      const r3 = t.fn(t._value);
      (e2.version === 0 || Ut(r3, t._value)) && (t.flags |= 128, t._value = r3, e2.version++);
    } catch (r3) {
      throw e2.version++, r3;
    } finally {
      j = n2, ht = s2, Bs(t), t.flags &= -3;
    }
  }
  __name(Xr, "Xr");
  function Nn(t, e2 = false) {
    const { dep: n2, prevSub: s2, nextSub: r3 } = t;
    if (s2 && (s2.nextSub = r3, t.prevSub = void 0), r3 && (r3.prevSub = s2, t.nextSub = void 0), n2.subs === t && (n2.subs = s2, !s2 && n2.computed)) {
      n2.computed.flags &= -5;
      for (let i = n2.computed.deps; i; i = i.nextDep)
        Nn(i, true);
    }
    !e2 && !--n2.sc && n2.map && n2.map.delete(n2.key);
  }
  __name(Nn, "Nn");
  function Zr(t) {
    const { prevDep: e2, nextDep: n2 } = t;
    e2 && (e2.nextDep = n2, t.prevDep = void 0), n2 && (n2.prevDep = e2, t.nextDep = void 0);
  }
  __name(Zr, "Zr");
  var ht = true;
  var Ks = [];
  function qt() {
    Ks.push(ht), ht = false;
  }
  __name(qt, "qt");
  function Yt() {
    const t = Ks.pop();
    ht = t === void 0 ? true : t;
  }
  __name(Yt, "Yt");
  function Qn(t) {
    const { cleanup: e2 } = t;
    if (t.cleanup = void 0, e2) {
      const n2 = j;
      j = void 0;
      try {
        e2();
      } finally {
        j = n2;
      }
    }
  }
  __name(Qn, "Qn");
  var Le = 0;
  var _Qr = class _Qr {
    constructor(e2, n2) {
      this.sub = e2, this.dep = n2, this.version = n2.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  };
  __name(_Qr, "Qr");
  var Qr = _Qr;
  var _ti = class _ti {
    // TODO isolatedDeclarations "__v_skip"
    constructor(e2) {
      this.computed = e2, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
    }
    track(e2) {
      if (!j || !ht || j === this.computed)
        return;
      let n2 = this.activeLink;
      if (n2 === void 0 || n2.sub !== j)
        n2 = this.activeLink = new Qr(j, this), j.deps ? (n2.prevDep = j.depsTail, j.depsTail.nextDep = n2, j.depsTail = n2) : j.deps = j.depsTail = n2, zs(n2);
      else if (n2.version === -1 && (n2.version = this.version, n2.nextDep)) {
        const s2 = n2.nextDep;
        s2.prevDep = n2.prevDep, n2.prevDep && (n2.prevDep.nextDep = s2), n2.prevDep = j.depsTail, n2.nextDep = void 0, j.depsTail.nextDep = n2, j.depsTail = n2, j.deps === n2 && (j.deps = s2);
      }
      return n2;
    }
    trigger(e2) {
      this.version++, Le++, this.notify(e2);
    }
    notify(e2) {
      In();
      try {
        for (let n2 = this.subs; n2; n2 = n2.prevSub)
          n2.sub.notify() && n2.sub.dep.notify();
      } finally {
        Rn();
      }
    }
  };
  __name(_ti, "ti");
  var ti = _ti;
  function zs(t) {
    if (t.dep.sc++, t.sub.flags & 4) {
      const e2 = t.dep.computed;
      if (e2 && !t.dep.subs) {
        e2.flags |= 20;
        for (let s2 = e2.deps; s2; s2 = s2.nextDep)
          zs(s2);
      }
      const n2 = t.dep.subs;
      n2 !== t && (t.prevSub = n2, n2 && (n2.nextSub = t)), t.dep.subs = t;
    }
  }
  __name(zs, "zs");
  var mn = /* @__PURE__ */ new WeakMap();
  var kt = /* @__PURE__ */ Symbol(
    ""
  );
  var _n = /* @__PURE__ */ Symbol(
    ""
  );
  var Te = /* @__PURE__ */ Symbol(
    ""
  );
  function tt(t, e2, n2) {
    if (ht && j) {
      let s2 = mn.get(t);
      s2 || mn.set(t, s2 = /* @__PURE__ */ new Map());
      let r3 = s2.get(n2);
      r3 || (s2.set(n2, r3 = new ti()), r3.map = s2, r3.key = n2), r3.track();
    }
  }
  __name(tt, "tt");
  function Ot(t, e2, n2, s2, r3, i) {
    const o = mn.get(t);
    if (!o) {
      Le++;
      return;
    }
    const l2 = /* @__PURE__ */ __name((f2) => {
      f2 && f2.trigger();
    }, "l");
    if (In(), e2 === "clear")
      o.forEach(l2);
    else {
      const f2 = P(t), d2 = f2 && Mn(n2);
      if (f2 && n2 === "length") {
        const u2 = Number(s2);
        o.forEach((p3, S2) => {
          (S2 === "length" || S2 === Te || !Tt(S2) && S2 >= u2) && l2(p3);
        });
      } else
        switch ((n2 !== void 0 || o.has(void 0)) && l2(o.get(n2)), d2 && l2(o.get(Te)), e2) {
          case "add":
            f2 ? d2 && l2(o.get("length")) : (l2(o.get(kt)), ge(t) && l2(o.get(_n)));
            break;
          case "delete":
            f2 || (l2(o.get(kt)), ge(t) && l2(o.get(_n)));
            break;
          case "set":
            ge(t) && l2(o.get(kt));
            break;
        }
    }
    Rn();
  }
  __name(Ot, "Ot");
  function Qt(t) {
    const e2 = /* @__PURE__ */ R2(t);
    return e2 === t ? e2 : (tt(e2, "iterate", Te), /* @__PURE__ */ Vt(t) ? e2 : e2.map(Pt));
  }
  __name(Qt, "Qt");
  function ke(t) {
    return tt(t = /* @__PURE__ */ R2(t), "iterate", Te), t;
  }
  __name(ke, "ke");
  function vt(t, e2) {
    return /* @__PURE__ */ jt(t) ? re(/* @__PURE__ */ qe(t) ? Pt(e2) : e2) : Pt(e2);
  }
  __name(vt, "vt");
  var ei = {
    __proto__: null,
    [Symbol.iterator]() {
      return rn(this, Symbol.iterator, (t) => vt(this, t));
    },
    concat(...t) {
      return Qt(this).concat(
        ...t.map((e2) => P(e2) ? Qt(e2) : e2)
      );
    },
    entries() {
      return rn(this, "entries", (t) => (t[1] = vt(this, t[1]), t));
    },
    every(t, e2) {
      return wt(this, "every", t, e2, void 0, arguments);
    },
    filter(t, e2) {
      return wt(
        this,
        "filter",
        t,
        e2,
        (n2) => n2.map((s2) => vt(this, s2)),
        arguments
      );
    },
    find(t, e2) {
      return wt(
        this,
        "find",
        t,
        e2,
        (n2) => vt(this, n2),
        arguments
      );
    },
    findIndex(t, e2) {
      return wt(this, "findIndex", t, e2, void 0, arguments);
    },
    findLast(t, e2) {
      return wt(
        this,
        "findLast",
        t,
        e2,
        (n2) => vt(this, n2),
        arguments
      );
    },
    findLastIndex(t, e2) {
      return wt(this, "findLastIndex", t, e2, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(t, e2) {
      return wt(this, "forEach", t, e2, void 0, arguments);
    },
    includes(...t) {
      return on(this, "includes", t);
    },
    indexOf(...t) {
      return on(this, "indexOf", t);
    },
    join(t) {
      return Qt(this).join(t);
    },
    // keys() iterator only reads `length`, no optimization required
    lastIndexOf(...t) {
      return on(this, "lastIndexOf", t);
    },
    map(t, e2) {
      return wt(this, "map", t, e2, void 0, arguments);
    },
    pop() {
      return ae(this, "pop");
    },
    push(...t) {
      return ae(this, "push", t);
    },
    reduce(t, ...e2) {
      return ts(this, "reduce", t, e2);
    },
    reduceRight(t, ...e2) {
      return ts(this, "reduceRight", t, e2);
    },
    shift() {
      return ae(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(t, e2) {
      return wt(this, "some", t, e2, void 0, arguments);
    },
    splice(...t) {
      return ae(this, "splice", t);
    },
    toReversed() {
      return Qt(this).toReversed();
    },
    toSorted(t) {
      return Qt(this).toSorted(t);
    },
    toSpliced(...t) {
      return Qt(this).toSpliced(...t);
    },
    unshift(...t) {
      return ae(this, "unshift", t);
    },
    values() {
      return rn(this, "values", (t) => vt(this, t));
    }
  };
  function rn(t, e2, n2) {
    const s2 = ke(t), r3 = s2[e2]();
    return s2 !== t && !/* @__PURE__ */ Vt(t) && (r3._next = r3.next, r3.next = () => {
      const i = r3._next();
      return i.done || (i.value = n2(i.value)), i;
    }), r3;
  }
  __name(rn, "rn");
  var ni = Array.prototype;
  function wt(t, e2, n2, s2, r3, i) {
    const o = ke(t), l2 = o !== t && !/* @__PURE__ */ Vt(t), f2 = o[e2];
    if (f2 !== ni[e2]) {
      const p3 = f2.apply(t, i);
      return l2 ? Pt(p3) : p3;
    }
    let d2 = n2;
    o !== t && (l2 ? d2 = /* @__PURE__ */ __name(function(p3, S2) {
      return n2.call(this, vt(t, p3), S2, t);
    }, "d") : n2.length > 2 && (d2 = /* @__PURE__ */ __name(function(p3, S2) {
      return n2.call(this, p3, S2, t);
    }, "d")));
    const u2 = f2.call(o, d2, s2);
    return l2 && r3 ? r3(u2) : u2;
  }
  __name(wt, "wt");
  function ts(t, e2, n2, s2) {
    const r3 = ke(t), i = r3 !== t && !/* @__PURE__ */ Vt(t);
    let o = n2, l2 = false;
    r3 !== t && (i ? (l2 = s2.length === 0, o = /* @__PURE__ */ __name(function(d2, u2, p3) {
      return l2 && (l2 = false, d2 = vt(t, d2)), n2.call(this, d2, vt(t, u2), p3, t);
    }, "o")) : n2.length > 3 && (o = /* @__PURE__ */ __name(function(d2, u2, p3) {
      return n2.call(this, d2, u2, p3, t);
    }, "o")));
    const f2 = r3[e2](o, ...s2);
    return l2 ? vt(t, f2) : f2;
  }
  __name(ts, "ts");
  function on(t, e2, n2) {
    const s2 = /* @__PURE__ */ R2(t);
    tt(s2, "iterate", Te);
    const r3 = s2[e2](...n2);
    return (r3 === -1 || r3 === false) && /* @__PURE__ */ Hn(n2[0]) ? (n2[0] = /* @__PURE__ */ R2(n2[0]), s2[e2](...n2)) : r3;
  }
  __name(on, "on");
  function ae(t, e2, n2 = []) {
    qt(), In();
    const s2 = (/* @__PURE__ */ R2(t))[e2].apply(t, n2);
    return Rn(), Yt(), s2;
  }
  __name(ae, "ae");
  var si = /* @__PURE__ */ An("__proto__,__v_isRef,__isVue");
  var Us = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Tt)
  );
  function ri(t) {
    Tt(t) || (t = String(t));
    const e2 = /* @__PURE__ */ R2(this);
    return tt(e2, "has", t), e2.hasOwnProperty(t);
  }
  __name(ri, "ri");
  var _Ws = class _Ws {
    constructor(e2 = false, n2 = false) {
      this._isReadonly = e2, this._isShallow = n2;
    }
    get(e2, n2, s2) {
      if (n2 === "__v_skip") return e2.__v_skip;
      const r3 = this._isReadonly, i = this._isShallow;
      if (n2 === "__v_isReactive")
        return !r3;
      if (n2 === "__v_isReadonly")
        return r3;
      if (n2 === "__v_isShallow")
        return i;
      if (n2 === "__v_raw")
        return s2 === (r3 ? i ? pi : Gs : i ? Ys : qs).get(e2) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(e2) === Object.getPrototypeOf(s2) ? e2 : void 0;
      const o = P(e2);
      if (!r3) {
        let f2;
        if (o && (f2 = ei[n2]))
          return f2;
        if (n2 === "hasOwnProperty")
          return ri;
      }
      const l2 = Reflect.get(
        e2,
        n2,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        /* @__PURE__ */ pt(e2) ? e2 : s2
      );
      if ((Tt(n2) ? Us.has(n2) : si(n2)) || (r3 || tt(e2, "get", n2), i))
        return l2;
      if (/* @__PURE__ */ pt(l2)) {
        const f2 = o && Mn(n2) ? l2 : l2.value;
        return r3 && V3(f2) ? /* @__PURE__ */ bn(f2) : f2;
      }
      return V3(l2) ? r3 ? /* @__PURE__ */ bn(l2) : /* @__PURE__ */ Dn(l2) : l2;
    }
  };
  __name(_Ws, "Ws");
  var Ws = _Ws;
  var _ks = class _ks extends Ws {
    constructor(e2 = false) {
      super(false, e2);
    }
    set(e2, n2, s2, r3) {
      let i = e2[n2];
      const o = P(e2) && Mn(n2);
      if (!this._isShallow) {
        const d2 = /* @__PURE__ */ jt(i);
        if (!/* @__PURE__ */ Vt(s2) && !/* @__PURE__ */ jt(s2) && (i = /* @__PURE__ */ R2(i), s2 = /* @__PURE__ */ R2(s2)), !o && /* @__PURE__ */ pt(i) && !/* @__PURE__ */ pt(s2))
          return d2 || (i.value = s2), true;
      }
      const l2 = o ? Number(n2) < e2.length : D2(e2, n2), f2 = Reflect.set(
        e2,
        n2,
        s2,
        /* @__PURE__ */ pt(e2) ? e2 : r3
      );
      return e2 === /* @__PURE__ */ R2(r3) && (l2 ? Ut(s2, i) && Ot(e2, "set", n2, s2) : Ot(e2, "add", n2, s2)), f2;
    }
    deleteProperty(e2, n2) {
      const s2 = D2(e2, n2);
      e2[n2];
      const r3 = Reflect.deleteProperty(e2, n2);
      return r3 && s2 && Ot(e2, "delete", n2, void 0), r3;
    }
    has(e2, n2) {
      const s2 = Reflect.has(e2, n2);
      return (!Tt(n2) || !Us.has(n2)) && tt(e2, "has", n2), s2;
    }
    ownKeys(e2) {
      return tt(
        e2,
        "iterate",
        P(e2) ? "length" : kt
      ), Reflect.ownKeys(e2);
    }
  };
  __name(_ks, "ks");
  var ks = _ks;
  var _ii = class _ii extends Ws {
    constructor(e2 = false) {
      super(true, e2);
    }
    set(e2, n2) {
      return true;
    }
    deleteProperty(e2, n2) {
      return true;
    }
  };
  __name(_ii, "ii");
  var ii = _ii;
  var oi = /* @__PURE__ */ new ks();
  var li = /* @__PURE__ */ new ii();
  var ci = /* @__PURE__ */ new ks(true);
  var xn = /* @__PURE__ */ __name((t) => t, "xn");
  var Ie = /* @__PURE__ */ __name((t) => Reflect.getPrototypeOf(t), "Ie");
  function fi(t, e2, n2) {
    return function(...s2) {
      const r3 = this.__v_raw, i = /* @__PURE__ */ R2(r3), o = ge(i), l2 = t === "entries" || t === Symbol.iterator && o, f2 = t === "keys" && o, d2 = r3[t](...s2), u2 = n2 ? xn : e2 ? re : Pt;
      return !e2 && tt(
        i,
        "iterate",
        f2 ? _n : kt
      ), lt(
        // inheriting all iterator properties
        Object.create(d2),
        {
          // iterator protocol
          next() {
            const { value: p3, done: S2 } = d2.next();
            return S2 ? { value: p3, done: S2 } : {
              value: l2 ? [u2(p3[0]), u2(p3[1])] : u2(p3),
              done: S2
            };
          }
        }
      );
    };
  }
  __name(fi, "fi");
  function Re(t) {
    return function(...e2) {
      return t === "delete" ? false : t === "clear" ? void 0 : this;
    };
  }
  __name(Re, "Re");
  function ai(t, e2) {
    const n2 = {
      get(r3) {
        const i = this.__v_raw, o = /* @__PURE__ */ R2(i), l2 = /* @__PURE__ */ R2(r3);
        t || (Ut(r3, l2) && tt(o, "get", r3), tt(o, "get", l2));
        const { has: f2 } = Ie(o), d2 = e2 ? xn : t ? re : Pt;
        if (f2.call(o, r3))
          return d2(i.get(r3));
        if (f2.call(o, l2))
          return d2(i.get(l2));
        i !== o && i.get(r3);
      },
      get size() {
        const r3 = this.__v_raw;
        return !t && tt(/* @__PURE__ */ R2(r3), "iterate", kt), r3.size;
      },
      has(r3) {
        const i = this.__v_raw, o = /* @__PURE__ */ R2(i), l2 = /* @__PURE__ */ R2(r3);
        return t || (Ut(r3, l2) && tt(o, "has", r3), tt(o, "has", l2)), r3 === l2 ? i.has(r3) : i.has(r3) || i.has(l2);
      },
      forEach(r3, i) {
        const o = this, l2 = o.__v_raw, f2 = /* @__PURE__ */ R2(l2), d2 = e2 ? xn : t ? re : Pt;
        return !t && tt(f2, "iterate", kt), l2.forEach((u2, p3) => r3.call(i, d2(u2), d2(p3), o));
      }
    };
    return lt(
      n2,
      t ? {
        add: Re("add"),
        set: Re("set"),
        delete: Re("delete"),
        clear: Re("clear")
      } : {
        add(r3) {
          const i = /* @__PURE__ */ R2(this), o = Ie(i), l2 = /* @__PURE__ */ R2(r3), f2 = !e2 && !/* @__PURE__ */ Vt(r3) && !/* @__PURE__ */ jt(r3) ? l2 : r3;
          return o.has.call(i, f2) || Ut(r3, f2) && o.has.call(i, r3) || Ut(l2, f2) && o.has.call(i, l2) || (i.add(f2), Ot(i, "add", f2, f2)), this;
        },
        set(r3, i) {
          !e2 && !/* @__PURE__ */ Vt(i) && !/* @__PURE__ */ jt(i) && (i = /* @__PURE__ */ R2(i));
          const o = /* @__PURE__ */ R2(this), { has: l2, get: f2 } = Ie(o);
          let d2 = l2.call(o, r3);
          d2 || (r3 = /* @__PURE__ */ R2(r3), d2 = l2.call(o, r3));
          const u2 = f2.call(o, r3);
          return o.set(r3, i), d2 ? Ut(i, u2) && Ot(o, "set", r3, i) : Ot(o, "add", r3, i), this;
        },
        delete(r3) {
          const i = /* @__PURE__ */ R2(this), { has: o, get: l2 } = Ie(i);
          let f2 = o.call(i, r3);
          f2 || (r3 = /* @__PURE__ */ R2(r3), f2 = o.call(i, r3)), l2 && l2.call(i, r3);
          const d2 = i.delete(r3);
          return f2 && Ot(i, "delete", r3, void 0), d2;
        },
        clear() {
          const r3 = /* @__PURE__ */ R2(this), i = r3.size !== 0, o = r3.clear();
          return i && Ot(
            r3,
            "clear",
            void 0,
            void 0
          ), o;
        }
      }
    ), [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ].forEach((r3) => {
      n2[r3] = fi(r3, t, e2);
    }), n2;
  }
  __name(ai, "ai");
  function Ln(t, e2) {
    const n2 = ai(t, e2);
    return (s2, r3, i) => r3 === "__v_isReactive" ? !t : r3 === "__v_isReadonly" ? t : r3 === "__v_raw" ? s2 : Reflect.get(
      D2(n2, r3) && r3 in s2 ? n2 : s2,
      r3,
      i
    );
  }
  __name(Ln, "Ln");
  var ui = {
    get: /* @__PURE__ */ Ln(false, false)
  };
  var di = {
    get: /* @__PURE__ */ Ln(false, true)
  };
  var hi = {
    get: /* @__PURE__ */ Ln(true, false)
  };
  var qs = /* @__PURE__ */ new WeakMap();
  var Ys = /* @__PURE__ */ new WeakMap();
  var Gs = /* @__PURE__ */ new WeakMap();
  var pi = /* @__PURE__ */ new WeakMap();
  function gi(t) {
    switch (t) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  __name(gi, "gi");
  function mi(t) {
    return t.__v_skip || !Object.isExtensible(t) ? 0 : gi(Lr(t));
  }
  __name(mi, "mi");
  // @__NO_SIDE_EFFECTS__
  function Dn(t) {
    return /* @__PURE__ */ jt(t) ? t : $n(
      t,
      false,
      oi,
      ui,
      qs
    );
  }
  __name(Dn, "Dn");
  // @__NO_SIDE_EFFECTS__
  function _i(t) {
    return $n(
      t,
      false,
      ci,
      di,
      Ys
    );
  }
  __name(_i, "_i");
  // @__NO_SIDE_EFFECTS__
  function bn(t) {
    return $n(
      t,
      true,
      li,
      hi,
      Gs
    );
  }
  __name(bn, "bn");
  function $n(t, e2, n2, s2, r3) {
    if (!V3(t) || t.__v_raw && !(e2 && t.__v_isReactive))
      return t;
    const i = mi(t);
    if (i === 0)
      return t;
    const o = r3.get(t);
    if (o)
      return o;
    const l2 = new Proxy(
      t,
      i === 2 ? s2 : n2
    );
    return r3.set(t, l2), l2;
  }
  __name($n, "$n");
  // @__NO_SIDE_EFFECTS__
  function qe(t) {
    return /* @__PURE__ */ jt(t) ? /* @__PURE__ */ qe(t.__v_raw) : !!(t && t.__v_isReactive);
  }
  __name(qe, "qe");
  // @__NO_SIDE_EFFECTS__
  function jt(t) {
    return !!(t && t.__v_isReadonly);
  }
  __name(jt, "jt");
  // @__NO_SIDE_EFFECTS__
  function Vt(t) {
    return !!(t && t.__v_isShallow);
  }
  __name(Vt, "Vt");
  // @__NO_SIDE_EFFECTS__
  function Hn(t) {
    return t ? !!t.__v_raw : false;
  }
  __name(Hn, "Hn");
  // @__NO_SIDE_EFFECTS__
  function R2(t) {
    const e2 = t && t.__v_raw;
    return e2 ? /* @__PURE__ */ R2(e2) : t;
  }
  __name(R2, "R");
  function xi(t) {
    return !D2(t, "__v_skip") && Object.isExtensible(t) && Ns(t, "__v_skip", true), t;
  }
  __name(xi, "xi");
  var Pt = /* @__PURE__ */ __name((t) => V3(t) ? /* @__PURE__ */ Dn(t) : t, "Pt");
  var re = /* @__PURE__ */ __name((t) => V3(t) ? /* @__PURE__ */ bn(t) : t, "re");
  // @__NO_SIDE_EFFECTS__
  function pt(t) {
    return t ? t.__v_isRef === true : false;
  }
  __name(pt, "pt");
  function yn(t) {
    return /* @__PURE__ */ pt(t) ? t.value : t;
  }
  __name(yn, "yn");
  var bi = {
    get: /* @__PURE__ */ __name((t, e2, n2) => e2 === "__v_raw" ? t : yn(Reflect.get(t, e2, n2)), "get"),
    set: /* @__PURE__ */ __name((t, e2, n2, s2) => {
      const r3 = t[e2];
      return /* @__PURE__ */ pt(r3) && !/* @__PURE__ */ pt(n2) ? (r3.value = n2, true) : Reflect.set(t, e2, n2, s2);
    }, "set")
  };
  function Js(t) {
    return /* @__PURE__ */ qe(t) ? t : new Proxy(t, bi);
  }
  __name(Js, "Js");
  function Me(t, e2, n2, s2) {
    try {
      return s2 ? t(...s2) : t();
    } catch (r3) {
      Ye(r3, e2, n2);
    }
  }
  __name(Me, "Me");
  function Ft(t, e2, n2, s2) {
    if (K(t)) {
      const r3 = Me(t, e2, n2, s2);
      return r3 && Fs(r3) && r3.catch((i) => {
        Ye(i, e2, n2);
      }), r3;
    }
    if (P(t)) {
      const r3 = [];
      for (let i = 0; i < t.length; i++)
        r3.push(Ft(t[i], e2, n2, s2));
      return r3;
    }
  }
  __name(Ft, "Ft");
  function Ye(t, e2, n2, s2 = true) {
    const r3 = e2 ? e2.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = e2 && e2.appContext.config || U;
    if (e2) {
      let l2 = e2.parent;
      const f2 = e2.proxy, d2 = `https://vuejs.org/error-reference/#runtime-${n2}`;
      for (; l2; ) {
        const u2 = l2.ec;
        if (u2) {
          for (let p3 = 0; p3 < u2.length; p3++)
            if (u2[p3](t, f2, d2) === false)
              return;
        }
        l2 = l2.parent;
      }
      if (i) {
        qt(), Me(i, null, 10, [
          t,
          f2,
          d2
        ]), Yt();
        return;
      }
    }
    yi(t, n2, r3, s2, o);
  }
  __name(Ye, "Ye");
  function yi(t, e2, n2, s2 = true, r3 = false) {
    if (r3)
      throw t;
    console.error(t);
  }
  __name(yi, "yi");
  var nt = [];
  var yt = -1;
  var se = [];
  var Ht = null;
  var te = 0;
  var Xs = /* @__PURE__ */ Promise.resolve();
  var De = null;
  function vi(t) {
    const e2 = De || Xs;
    return t ? e2.then(this ? t.bind(this) : t) : e2;
  }
  __name(vi, "vi");
  function Ci(t) {
    let e2 = yt + 1, n2 = nt.length;
    for (; e2 < n2; ) {
      const s2 = e2 + n2 >>> 1, r3 = nt[s2], i = we(r3);
      i < t || i === t && r3.flags & 2 ? e2 = s2 + 1 : n2 = s2;
    }
    return e2;
  }
  __name(Ci, "Ci");
  function Zs(t) {
    if (!(t.flags & 1)) {
      const e2 = we(t), n2 = nt[nt.length - 1];
      !n2 || // fast path when the job id is larger than the tail
      !(t.flags & 2) && e2 >= we(n2) ? nt.push(t) : nt.splice(Ci(e2), 0, t), t.flags |= 1, Qs();
    }
  }
  __name(Zs, "Zs");
  function Qs() {
    De || (De = Xs.then(er));
  }
  __name(Qs, "Qs");
  function Si(t) {
    P(t) ? se.push(...t) : Ht && t.id === -1 ? Ht.splice(te + 1, 0, t) : t.flags & 1 || (se.push(t), t.flags |= 1), Qs();
  }
  __name(Si, "Si");
  function es(t, e2, n2 = yt + 1) {
    for (; n2 < nt.length; n2++) {
      const s2 = nt[n2];
      if (s2 && s2.flags & 2) {
        if (t && s2.id !== t.uid)
          continue;
        nt.splice(n2, 1), n2--, s2.flags & 4 && (s2.flags &= -2), s2(), s2.flags & 4 || (s2.flags &= -2);
      }
    }
  }
  __name(es, "es");
  function tr(t) {
    if (se.length) {
      const e2 = [...new Set(se)].sort(
        (n2, s2) => we(n2) - we(s2)
      );
      if (se.length = 0, Ht) {
        Ht.push(...e2);
        return;
      }
      for (Ht = e2, te = 0; te < Ht.length; te++) {
        const n2 = Ht[te];
        n2.flags & 4 && (n2.flags &= -2), n2.flags & 8 || n2(), n2.flags &= -2;
      }
      Ht = null, te = 0;
    }
  }
  __name(tr, "tr");
  var we = /* @__PURE__ */ __name((t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id, "we");
  function er(t) {
    try {
      for (yt = 0; yt < nt.length; yt++) {
        const e2 = nt[yt];
        e2 && !(e2.flags & 8) && (e2.flags & 4 && (e2.flags &= -2), Me(
          e2,
          e2.i,
          e2.i ? 15 : 14
        ), e2.flags & 4 || (e2.flags &= -2));
      }
    } finally {
      for (; yt < nt.length; yt++) {
        const e2 = nt[yt];
        e2 && (e2.flags &= -2);
      }
      yt = -1, nt.length = 0, tr(), De = null, (nt.length || se.length) && er();
    }
  }
  __name(er, "er");
  var St = null;
  var nr = null;
  function $e(t) {
    const e2 = St;
    return St = t, nr = t && t.type.__scopeId || null, e2;
  }
  __name($e, "$e");
  function sr(t, e2 = St, n2) {
    if (!e2 || t._n)
      return t;
    const s2 = /* @__PURE__ */ __name((...r3) => {
      s2._d && cs(-1);
      const i = $e(e2);
      let o;
      try {
        o = t(...r3);
      } finally {
        $e(i), s2._d && cs(1);
      }
      return o;
    }, "s");
    return s2._n = true, s2._c = true, s2._d = true, s2;
  }
  __name(sr, "sr");
  function Bt(t, e2, n2, s2) {
    const r3 = t.dirs, i = e2 && e2.dirs;
    for (let o = 0; o < r3.length; o++) {
      const l2 = r3[o];
      i && (l2.oldValue = i[o].value);
      let f2 = l2.dir[s2];
      f2 && (qt(), Ft(f2, n2, 8, [
        t.el,
        l2,
        t,
        e2
      ]), Yt());
    }
  }
  __name(Bt, "Bt");
  var Ti = /* @__PURE__ */ Symbol("_vte");
  var wi = /* @__PURE__ */ __name((t) => t.__isTeleport, "wi");
  var Dt = /* @__PURE__ */ Symbol("_leaveCb");
  var ue = /* @__PURE__ */ Symbol("_enterCb");
  function Ei() {
    const t = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    return Ri(() => {
      t.isMounted = true;
    }), Li(() => {
      t.isUnmounting = true;
    }), t;
  }
  __name(Ei, "Ei");
  var at = [Function, Array];
  var Ai = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: at,
    onEnter: at,
    onAfterEnter: at,
    onEnterCancelled: at,
    // leave
    onBeforeLeave: at,
    onLeave: at,
    onAfterLeave: at,
    onLeaveCancelled: at,
    // appear
    onBeforeAppear: at,
    onAppear: at,
    onAfterAppear: at,
    onAppearCancelled: at
  };
  function Oi(t, e2) {
    const { leavingVNodes: n2 } = t;
    let s2 = n2.get(e2.type);
    return s2 || (s2 = /* @__PURE__ */ Object.create(null), n2.set(e2.type, s2)), s2;
  }
  __name(Oi, "Oi");
  function vn(t, e2, n2, s2, r3) {
    const {
      appear: i,
      mode: o,
      persisted: l2 = false,
      onBeforeEnter: f2,
      onEnter: d2,
      onAfterEnter: u2,
      onEnterCancelled: p3,
      onBeforeLeave: S2,
      onLeave: F3,
      onAfterLeave: H2,
      onLeaveCancelled: O,
      onBeforeAppear: J2,
      onAppear: k4,
      onAfterAppear: N,
      onAppearCancelled: q
    } = e2, X2 = String(t.key), st2 = Oi(n2, t), ct2 = /* @__PURE__ */ __name((M2, B2) => {
      M2 && Ft(
        M2,
        s2,
        9,
        B2
      );
    }, "ct"), It2 = /* @__PURE__ */ __name((M2, B2) => {
      const Y2 = B2[1];
      ct2(M2, B2), P(M2) ? M2.every((T) => T.length <= 1) && Y2() : M2.length <= 1 && Y2();
    }, "It"), ft2 = {
      mode: o,
      persisted: l2,
      beforeEnter(M2) {
        let B2 = f2;
        if (!n2.isMounted)
          if (i)
            B2 = J2 || f2;
          else
            return;
        M2[Dt] && M2[Dt](
          true
          /* cancelled */
        );
        const Y2 = st2[X2];
        Y2 && ee(t, Y2) && Y2.el[Dt] && Y2.el[Dt](), ct2(B2, [M2]);
      },
      enter(M2) {
        if (st2[X2] === t) return;
        let B2 = d2, Y2 = u2, T = p3;
        if (!n2.isMounted)
          if (i)
            B2 = k4 || d2, Y2 = N || u2, T = q || p3;
          else
            return;
        let z2 = false;
        M2[ue] = (Rt2) => {
          z2 || (z2 = true, Rt2 ? ct2(T, [M2]) : ct2(Y2, [M2]), ft2.delayedLeave && ft2.delayedLeave(), M2[ue] = void 0);
        };
        const et2 = M2[ue].bind(null, false);
        B2 ? It2(B2, [M2, et2]) : et2();
      },
      leave(M2, B2) {
        const Y2 = String(t.key);
        if (M2[ue] && M2[ue](
          true
          /* cancelled */
        ), n2.isUnmounting)
          return B2();
        ct2(S2, [M2]);
        let T = false;
        M2[Dt] = (et2) => {
          T || (T = true, B2(), et2 ? ct2(O, [M2]) : ct2(H2, [M2]), M2[Dt] = void 0, st2[Y2] === t && delete st2[Y2]);
        };
        const z2 = M2[Dt].bind(null, false);
        st2[Y2] = t, F3 ? It2(F3, [M2, z2]) : z2();
      },
      clone(M2) {
        return vn(
          M2,
          e2,
          n2,
          s2
        );
      }
    };
    return ft2;
  }
  __name(vn, "vn");
  function Ee(t, e2) {
    t.shapeFlag & 6 && t.component ? (t.transition = e2, Ee(t.component.subTree, e2)) : t.shapeFlag & 128 ? (t.ssContent.transition = e2.clone(t.ssContent), t.ssFallback.transition = e2.clone(t.ssFallback)) : t.transition = e2;
  }
  __name(Ee, "Ee");
  function rr(t, e2 = false, n2) {
    let s2 = [], r3 = 0;
    for (let i = 0; i < t.length; i++) {
      let o = t[i];
      const l2 = n2 == null ? o.key : String(n2) + String(o.key != null ? o.key : i);
      o.type === ut ? (o.patchFlag & 128 && r3++, s2 = s2.concat(
        rr(o.children, e2, l2)
      )) : (e2 || o.type !== Gt) && s2.push(l2 != null ? Jt(o, { key: l2 }) : o);
    }
    if (r3 > 1)
      for (let i = 0; i < s2.length; i++)
        s2[i].patchFlag = -2;
    return s2;
  }
  __name(rr, "rr");
  // @__NO_SIDE_EFFECTS__
  function Mi(t, e2) {
    return K(t) ? (
      // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      lt({ name: t.name }, e2, { setup: t })
    ) : t;
  }
  __name(Mi, "Mi");
  function Pi(t) {
    t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
  }
  __name(Pi, "Pi");
  function ns(t, e2) {
    let n2;
    return !!((n2 = Object.getOwnPropertyDescriptor(t, e2)) && !n2.configurable);
  }
  __name(ns, "ns");
  var He = /* @__PURE__ */ new WeakMap();
  function be(t, e2, n2, s2, r3 = false) {
    if (P(t)) {
      t.forEach(
        (O, J2) => be(
          O,
          e2 && (P(e2) ? e2[J2] : e2),
          n2,
          s2,
          r3
        )
      );
      return;
    }
    if (ye(s2) && !r3) {
      s2.shapeFlag & 512 && s2.type.__asyncResolved && s2.component.subTree.component && be(t, e2, n2, s2.component.subTree);
      return;
    }
    const i = s2.shapeFlag & 4 ? Un(s2.component) : s2.el, o = r3 ? null : i, { i: l2, r: f2 } = t, d2 = e2 && e2.r, u2 = l2.refs === U ? l2.refs = {} : l2.refs, p3 = l2.setupState, S2 = /* @__PURE__ */ R2(p3), F3 = p3 === U ? Ps : (O) => ns(u2, O) ? false : D2(S2, O), H2 = /* @__PURE__ */ __name((O, J2) => !(J2 && ns(u2, J2)), "H");
    if (d2 != null && d2 !== f2) {
      if (ss(e2), W2(d2))
        u2[d2] = null, F3(d2) && (p3[d2] = null);
      else if (/* @__PURE__ */ pt(d2)) {
        const O = e2;
        H2(d2, O.k) && (d2.value = null), O.k && (u2[O.k] = null);
      }
    }
    if (K(f2))
      Me(f2, l2, 12, [o, u2]);
    else {
      const O = W2(f2), J2 = /* @__PURE__ */ pt(f2);
      if (O || J2) {
        const k4 = /* @__PURE__ */ __name(() => {
          if (t.f) {
            const N = O ? F3(f2) ? p3[f2] : u2[f2] : H2() || !t.k ? f2.value : u2[t.k];
            if (r3)
              P(N) && Ir(N, i);
            else if (P(N))
              N.includes(i) || N.push(i);
            else if (O)
              u2[f2] = [i], F3(f2) && (p3[f2] = u2[f2]);
            else {
              const q = [i];
              H2(f2, t.k) && (f2.value = q), t.k && (u2[t.k] = q);
            }
          } else O ? (u2[f2] = o, F3(f2) && (p3[f2] = o)) : J2 && (H2(f2, t.k) && (f2.value = o), t.k && (u2[t.k] = o));
        }, "k");
        if (o) {
          const N = /* @__PURE__ */ __name(() => {
            k4(), He.delete(t);
          }, "N");
          N.id = -1, He.set(t, N), it(N, n2);
        } else
          ss(t), k4();
      }
    }
  }
  __name(be, "be");
  function ss(t) {
    const e2 = He.get(t);
    e2 && (e2.flags |= 8, He.delete(t));
  }
  __name(ss, "ss");
  We().requestIdleCallback;
  We().cancelIdleCallback;
  var ye = /* @__PURE__ */ __name((t) => !!t.type.__asyncLoader, "ye");
  var Fi = /* @__PURE__ */ __name((t) => t.type.__isKeepAlive, "Fi");
  function Ii(t, e2, n2 = Xt, s2 = false) {
    if (n2) {
      const r3 = n2[t] || (n2[t] = []), i = e2.__weh || (e2.__weh = (...o) => {
        qt();
        const l2 = zn(n2), f2 = Ft(e2, n2, t, o);
        return l2(), Yt(), f2;
      });
      return s2 ? r3.unshift(i) : r3.push(i), i;
    }
  }
  __name(Ii, "Ii");
  var jn = /* @__PURE__ */ __name((t) => (e2, n2 = Xt) => {
    (!vr || t === "sp") && Ii(t, (...s2) => e2(...s2), n2);
  }, "jn");
  var Ri = jn("m");
  var Ni = jn("u");
  var Li = jn(
    "bum"
  );
  var Di = /* @__PURE__ */ Symbol.for("v-ndc");
  function $i(t, e2, n2, s2) {
    let r3;
    const i = n2, o = P(t);
    if (o || W2(t)) {
      const l2 = o && /* @__PURE__ */ qe(t);
      let f2 = false, d2 = false;
      l2 && (f2 = !/* @__PURE__ */ Vt(t), d2 = /* @__PURE__ */ jt(t), t = ke(t)), r3 = new Array(t.length);
      for (let u2 = 0, p3 = t.length; u2 < p3; u2++)
        r3[u2] = e2(
          f2 ? d2 ? re(Pt(t[u2])) : Pt(t[u2]) : t[u2],
          u2,
          void 0,
          i
        );
    } else if (typeof t == "number") {
      r3 = new Array(t);
      for (let l2 = 0; l2 < t; l2++)
        r3[l2] = e2(l2 + 1, l2, void 0, i);
    } else if (V3(t))
      if (t[Symbol.iterator])
        r3 = Array.from(
          t,
          (l2, f2) => e2(l2, f2, void 0, i)
        );
      else {
        const l2 = Object.keys(t);
        r3 = new Array(l2.length);
        for (let f2 = 0, d2 = l2.length; f2 < d2; f2++) {
          const u2 = l2[f2];
          r3[f2] = e2(t[u2], u2, f2, i);
        }
      }
    else
      r3 = [];
    return r3;
  }
  __name($i, "$i");
  var Cn = /* @__PURE__ */ __name((t) => t ? yr(t) ? Un(t) : Cn(t.parent) : null, "Cn");
  var ve = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ lt(/* @__PURE__ */ Object.create(null), {
      $: /* @__PURE__ */ __name((t) => t, "$"),
      $el: /* @__PURE__ */ __name((t) => t.vnode.el, "$el"),
      $data: /* @__PURE__ */ __name((t) => t.data, "$data"),
      $props: /* @__PURE__ */ __name((t) => t.props, "$props"),
      $attrs: /* @__PURE__ */ __name((t) => t.attrs, "$attrs"),
      $slots: /* @__PURE__ */ __name((t) => t.slots, "$slots"),
      $refs: /* @__PURE__ */ __name((t) => t.refs, "$refs"),
      $parent: /* @__PURE__ */ __name((t) => Cn(t.parent), "$parent"),
      $root: /* @__PURE__ */ __name((t) => Cn(t.root), "$root"),
      $host: /* @__PURE__ */ __name((t) => t.ce, "$host"),
      $emit: /* @__PURE__ */ __name((t) => t.emit, "$emit"),
      $options: /* @__PURE__ */ __name((t) => t.type, "$options"),
      $forceUpdate: /* @__PURE__ */ __name((t) => t.f || (t.f = () => {
        Zs(t.update);
      }), "$forceUpdate"),
      $nextTick: /* @__PURE__ */ __name((t) => t.n || (t.n = vi.bind(t.proxy)), "$nextTick"),
      $watch: /* @__PURE__ */ __name((t) => On, "$watch")
    })
  );
  var ln = /* @__PURE__ */ __name((t, e2) => t !== U && !t.__isScriptSetup && D2(t, e2), "ln");
  var Hi = {
    get({ _: t }, e2) {
      if (e2 === "__v_skip")
        return true;
      const { ctx: n2, setupState: s2, data: r3, props: i, accessCache: o, type: l2, appContext: f2 } = t;
      if (e2[0] !== "$") {
        const S2 = o[e2];
        if (S2 !== void 0)
          switch (S2) {
            case 1:
              return s2[e2];
            case 2:
              return r3[e2];
            case 4:
              return n2[e2];
            case 3:
              return i[e2];
          }
        else {
          if (ln(s2, e2))
            return o[e2] = 1, s2[e2];
          if (D2(i, e2))
            return o[e2] = 3, i[e2];
          if (n2 !== U && D2(n2, e2))
            return o[e2] = 4, n2[e2];
          o[e2] = 0;
        }
      }
      const d2 = ve[e2];
      let u2, p3;
      if (d2)
        return e2 === "$attrs" && tt(t.attrs, "get", ""), d2(t);
      if (
        // css module (injected by vue-loader)
        (u2 = l2.__cssModules) && (u2 = u2[e2])
      )
        return u2;
      if (n2 !== U && D2(n2, e2))
        return o[e2] = 4, n2[e2];
      if (
        // global properties
        p3 = f2.config.globalProperties, D2(p3, e2)
      )
        return p3[e2];
    },
    set({ _: t }, e2, n2) {
      const { data: s2, setupState: r3, ctx: i } = t;
      return ln(r3, e2) ? (r3[e2] = n2, true) : D2(t.props, e2) || e2[0] === "$" && e2.slice(1) in t ? false : (i[e2] = n2, true);
    },
    has({
      _: { data: t, setupState: e2, accessCache: n2, ctx: s2, appContext: r3, props: i, type: o }
    }, l2) {
      let f2;
      return !!(n2[l2] || ln(e2, l2) || D2(i, l2) || D2(s2, l2) || D2(ve, l2) || D2(r3.config.globalProperties, l2) || (f2 = o.__cssModules) && f2[l2]);
    },
    defineProperty(t, e2, n2) {
      return n2.get != null ? t._.accessCache[e2] = 0 : D2(n2, "value") && this.set(t, e2, n2.value, null), Reflect.defineProperty(t, e2, n2);
    }
  };
  function ir() {
    return {
      app: null,
      config: {
        isNativeTag: Ps,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  __name(ir, "ir");
  var ji = 0;
  function Vi(t, e2) {
    return function(s2, r3 = null) {
      K(s2) || (s2 = lt({}, s2)), r3 != null && !V3(r3) && (r3 = null);
      const i = ir(), o = /* @__PURE__ */ new WeakSet(), l2 = [];
      let f2 = false;
      const d2 = i.app = {
        _uid: ji++,
        _component: s2,
        _props: r3,
        _container: null,
        _context: i,
        _instance: null,
        version: vo,
        get config() {
          return i.config;
        },
        set config(u2) {
        },
        use(u2, ...p3) {
          return o.has(u2) || (u2 && K(u2.install) ? (o.add(u2), u2.install(d2, ...p3)) : K(u2) && (o.add(u2), u2(d2, ...p3))), d2;
        },
        mixin(u2) {
          return d2;
        },
        component(u2, p3) {
          return p3 ? (i.components[u2] = p3, d2) : i.components[u2];
        },
        directive(u2, p3) {
          return p3 ? (i.directives[u2] = p3, d2) : i.directives[u2];
        },
        mount(u2, p3, S2) {
          if (!f2) {
            const F3 = d2._ceVNode || Mt(s2, r3);
            return F3.appContext = i, S2 === true ? S2 = "svg" : S2 === false && (S2 = void 0), t(F3, u2, S2), f2 = true, d2._container = u2, u2.__vue_app__ = d2, Un(F3.component);
          }
        },
        onUnmount(u2) {
          l2.push(u2);
        },
        unmount() {
          f2 && (Ft(
            l2,
            d2._instance,
            16
          ), t(null, d2._container), delete d2._container.__vue_app__);
        },
        provide(u2, p3) {
          return i.provides[u2] = p3, d2;
        },
        runWithContext(u2) {
          try {
            return u2();
          } finally {
          }
        }
      };
      return d2;
    };
  }
  __name(Vi, "Vi");
  var Bi = /* @__PURE__ */ __name((t, e2) => e2 === "modelValue" || e2 === "model-value" ? t.modelModifiers : t[`${e2}Modifiers`] || t[`${dt(e2)}Modifiers`] || t[`${Zt(e2)}Modifiers`], "Bi");
  function Ki(t, e2, ...n2) {
    if (t.isUnmounted) return;
    const s2 = t.vnode.props || U;
    let r3 = n2;
    const i = e2.startsWith("update:"), o = i && Bi(s2, e2.slice(7));
    o && (o.trim && (r3 = n2.map((u2) => W2(u2) ? u2.trim() : u2)), o.number && (r3 = n2.map(jr)));
    let l2, f2 = s2[l2 = tn(e2)] || // also try camelCase event handler (#2249)
    s2[l2 = tn(dt(e2))];
    !f2 && i && (f2 = s2[l2 = tn(Zt(e2))]), f2 && Ft(
      f2,
      t,
      6,
      r3
    );
    const d2 = s2[l2 + "Once"];
    if (d2) {
      if (!t.emitted)
        t.emitted = {};
      else if (t.emitted[l2])
        return;
      t.emitted[l2] = true, Ft(
        d2,
        t,
        6,
        r3
      );
    }
  }
  __name(Ki, "Ki");
  function zi(t, e2, n2 = false) {
    const s2 = e2.emitsCache, r3 = s2.get(t);
    if (r3 !== void 0)
      return r3;
    const i = t.emits;
    let o = {};
    return i ? (P(i) ? i.forEach((l2) => o[l2] = null) : lt(o, i), V3(t) && s2.set(t, o), o) : (V3(t) && s2.set(t, null), null);
  }
  __name(zi, "zi");
  function Ge(t, e2) {
    return !t || !Ke(e2) ? false : (e2 = e2.slice(2).replace(/Once$/, ""), D2(t, e2[0].toLowerCase() + e2.slice(1)) || D2(t, Zt(e2)) || D2(t, e2));
  }
  __name(Ge, "Ge");
  function rs(t) {
    const {
      type: e2,
      vnode: n2,
      proxy: s2,
      withProxy: r3,
      propsOptions: [i],
      slots: o,
      attrs: l2,
      emit: f2,
      render: d2,
      renderCache: u2,
      props: p3,
      data: S2,
      setupState: F3,
      ctx: H2,
      inheritAttrs: O
    } = t, J2 = $e(t);
    let k4, N;
    try {
      if (n2.shapeFlag & 4) {
        const X2 = r3 || s2, st2 = X2;
        k4 = Ct(
          d2.call(
            st2,
            X2,
            u2,
            p3,
            F3,
            S2,
            H2
          )
        ), N = l2;
      } else {
        const X2 = e2;
        k4 = Ct(
          X2.length > 1 ? X2(
            p3,
            { attrs: l2, slots: o, emit: f2 }
          ) : X2(
            p3,
            null
          )
        ), N = e2.props ? l2 : Ui(l2);
      }
    } catch (X2) {
      Ce.length = 0, Ye(X2, t, 1), k4 = Mt(Gt);
    }
    let q = k4;
    if (N && O !== false) {
      const X2 = Object.keys(N), { shapeFlag: st2 } = q;
      X2.length && st2 & 7 && (i && X2.some(ze) && (N = Wi(
        N,
        i
      )), q = Jt(q, N, false, true));
    }
    return n2.dirs && (q = Jt(q, null, false, true), q.dirs = q.dirs ? q.dirs.concat(n2.dirs) : n2.dirs), n2.transition && Ee(q, n2.transition), k4 = q, $e(J2), k4;
  }
  __name(rs, "rs");
  var Ui = /* @__PURE__ */ __name((t) => {
    let e2;
    for (const n2 in t)
      (n2 === "class" || n2 === "style" || Ke(n2)) && ((e2 || (e2 = {}))[n2] = t[n2]);
    return e2;
  }, "Ui");
  var Wi = /* @__PURE__ */ __name((t, e2) => {
    const n2 = {};
    for (const s2 in t)
      (!ze(s2) || !(s2.slice(9) in e2)) && (n2[s2] = t[s2]);
    return n2;
  }, "Wi");
  function ki(t, e2, n2) {
    const { props: s2, children: r3, component: i } = t, { props: o, children: l2, patchFlag: f2 } = e2, d2 = i.emitsOptions;
    if (e2.dirs || e2.transition)
      return true;
    if (n2 && f2 >= 0) {
      if (f2 & 1024)
        return true;
      if (f2 & 16)
        return s2 ? is(s2, o, d2) : !!o;
      if (f2 & 8) {
        const u2 = e2.dynamicProps;
        for (let p3 = 0; p3 < u2.length; p3++) {
          const S2 = u2[p3];
          if (or(o, s2, S2) && !Ge(d2, S2))
            return true;
        }
      }
    } else
      return (r3 || l2) && (!l2 || !l2.$stable) ? true : s2 === o ? false : s2 ? o ? is(s2, o, d2) : true : !!o;
    return false;
  }
  __name(ki, "ki");
  function is(t, e2, n2) {
    const s2 = Object.keys(e2);
    if (s2.length !== Object.keys(t).length)
      return true;
    for (let r3 = 0; r3 < s2.length; r3++) {
      const i = s2[r3];
      if (or(e2, t, i) && !Ge(n2, i))
        return true;
    }
    return false;
  }
  __name(is, "is");
  function or(t, e2, n2) {
    const s2 = t[n2], r3 = e2[n2];
    return n2 === "style" && V3(s2) && V3(r3) ? !Fn(s2, r3) : s2 !== r3;
  }
  __name(or, "or");
  function qi({ vnode: t, parent: e2, suspense: n2 }, s2) {
    for (; e2; ) {
      const r3 = e2.subTree;
      if (r3.suspense && r3.suspense.activeBranch === t && (r3.suspense.vnode.el = r3.el = s2, t = r3), r3 === t)
        (t = e2.vnode).el = s2, e2 = e2.parent;
      else
        break;
    }
    n2 && n2.activeBranch === t && (n2.vnode.el = s2);
  }
  __name(qi, "qi");
  var lr = {};
  var cr = /* @__PURE__ */ __name(() => Object.create(lr), "cr");
  var fr = /* @__PURE__ */ __name((t) => Object.getPrototypeOf(t) === lr, "fr");
  function Yi(t, e2, n2, s2 = false) {
    const r3 = {}, i = cr();
    t.propsDefaults = /* @__PURE__ */ Object.create(null), ar(t, e2, r3, i);
    for (const o in t.propsOptions[0])
      o in r3 || (r3[o] = void 0);
    n2 ? t.props = s2 ? r3 : /* @__PURE__ */ _i(r3) : t.type.props ? t.props = r3 : t.props = i, t.attrs = i;
  }
  __name(Yi, "Yi");
  function Gi(t, e2, n2, s2) {
    const {
      props: r3,
      attrs: i,
      vnode: { patchFlag: o }
    } = t, l2 = /* @__PURE__ */ R2(r3), [f2] = t.propsOptions;
    let d2 = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (s2 || o > 0) && !(o & 16)
    ) {
      if (o & 8) {
        const u2 = t.vnode.dynamicProps;
        for (let p3 = 0; p3 < u2.length; p3++) {
          let S2 = u2[p3];
          if (Ge(t.emitsOptions, S2))
            continue;
          const F3 = e2[S2];
          if (f2)
            if (D2(i, S2))
              F3 !== i[S2] && (i[S2] = F3, d2 = true);
            else {
              const H2 = dt(S2);
              r3[H2] = Sn(
                f2,
                l2,
                H2,
                F3,
                t,
                false
              );
            }
          else
            F3 !== i[S2] && (i[S2] = F3, d2 = true);
        }
      }
    } else {
      ar(t, e2, r3, i) && (d2 = true);
      let u2;
      for (const p3 in l2)
        (!e2 || // for camelCase
        !D2(e2, p3) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((u2 = Zt(p3)) === p3 || !D2(e2, u2))) && (f2 ? n2 && // for camelCase
        (n2[p3] !== void 0 || // for kebab-case
        n2[u2] !== void 0) && (r3[p3] = Sn(
          f2,
          l2,
          p3,
          void 0,
          t,
          true
        )) : delete r3[p3]);
      if (i !== l2)
        for (const p3 in i)
          (!e2 || !D2(e2, p3)) && (delete i[p3], d2 = true);
    }
    d2 && Ot(t.attrs, "set", "");
  }
  __name(Gi, "Gi");
  function ar(t, e2, n2, s2) {
    const [r3, i] = t.propsOptions;
    let o = false, l2;
    if (e2)
      for (let f2 in e2) {
        if (me(f2))
          continue;
        const d2 = e2[f2];
        let u2;
        r3 && D2(r3, u2 = dt(f2)) ? !i || !i.includes(u2) ? n2[u2] = d2 : (l2 || (l2 = {}))[u2] = d2 : Ge(t.emitsOptions, f2) || (!(f2 in s2) || d2 !== s2[f2]) && (s2[f2] = d2, o = true);
      }
    if (i) {
      const f2 = /* @__PURE__ */ R2(n2), d2 = l2 || U;
      for (let u2 = 0; u2 < i.length; u2++) {
        const p3 = i[u2];
        n2[p3] = Sn(
          r3,
          f2,
          p3,
          d2[p3],
          t,
          !D2(d2, p3)
        );
      }
    }
    return o;
  }
  __name(ar, "ar");
  function Sn(t, e2, n2, s2, r3, i) {
    const o = t[n2];
    if (o != null) {
      const l2 = D2(o, "default");
      if (l2 && s2 === void 0) {
        const f2 = o.default;
        if (o.type !== Function && !o.skipFactory && K(f2)) {
          const { propsDefaults: d2 } = r3;
          if (n2 in d2)
            s2 = d2[n2];
          else {
            const u2 = zn(r3);
            s2 = d2[n2] = f2.call(
              null,
              e2
            ), u2();
          }
        } else
          s2 = f2;
        r3.ce && r3.ce._setProp(n2, s2);
      }
      o[
        0
        /* shouldCast */
      ] && (i && !l2 ? s2 = false : o[
        1
        /* shouldCastTrue */
      ] && (s2 === "" || s2 === Zt(n2)) && (s2 = true));
    }
    return s2;
  }
  __name(Sn, "Sn");
  function Ji(t, e2, n2 = false) {
    const s2 = e2.propsCache, r3 = s2.get(t);
    if (r3)
      return r3;
    const i = t.props, o = {}, l2 = [];
    if (!i)
      return V3(t) && s2.set(t, ne), ne;
    if (P(i))
      for (let d2 = 0; d2 < i.length; d2++) {
        const u2 = dt(i[d2]);
        os(u2) && (o[u2] = U);
      }
    else if (i)
      for (const d2 in i) {
        const u2 = dt(d2);
        if (os(u2)) {
          const p3 = i[d2], S2 = o[u2] = P(p3) || K(p3) ? { type: p3 } : lt({}, p3), F3 = S2.type;
          let H2 = false, O = true;
          if (P(F3))
            for (let J2 = 0; J2 < F3.length; ++J2) {
              const k4 = F3[J2], N = K(k4) && k4.name;
              if (N === "Boolean") {
                H2 = true;
                break;
              } else N === "String" && (O = false);
            }
          else
            H2 = K(F3) && F3.name === "Boolean";
          S2[
            0
            /* shouldCast */
          ] = H2, S2[
            1
            /* shouldCastTrue */
          ] = O, (H2 || D2(S2, "default")) && l2.push(u2);
        }
      }
    const f2 = [o, l2];
    return V3(t) && s2.set(t, f2), f2;
  }
  __name(Ji, "Ji");
  function os(t) {
    return t[0] !== "$" && !me(t);
  }
  __name(os, "os");
  var Vn = /* @__PURE__ */ __name((t) => t === "_" || t === "_ctx" || t === "$stable", "Vn");
  var Bn = /* @__PURE__ */ __name((t) => P(t) ? t.map(Ct) : [Ct(t)], "Bn");
  var Xi = /* @__PURE__ */ __name((t, e2, n2) => {
    if (e2._n)
      return e2;
    const s2 = sr((...r3) => Bn(e2(...r3)), n2);
    return s2._c = false, s2;
  }, "Xi");
  var ur = /* @__PURE__ */ __name((t, e2, n2) => {
    const s2 = t._ctx;
    for (const r3 in t) {
      if (Vn(r3)) continue;
      const i = t[r3];
      if (K(i))
        e2[r3] = Xi(r3, i, s2);
      else if (i != null) {
        const o = Bn(i);
        e2[r3] = () => o;
      }
    }
  }, "ur");
  var dr = /* @__PURE__ */ __name((t, e2) => {
    const n2 = Bn(e2);
    t.slots.default = () => n2;
  }, "dr");
  var hr = /* @__PURE__ */ __name((t, e2, n2) => {
    for (const s2 in e2)
      (n2 || !Vn(s2)) && (t[s2] = e2[s2]);
  }, "hr");
  var Zi = /* @__PURE__ */ __name((t, e2, n2) => {
    const s2 = t.slots = cr();
    if (t.vnode.shapeFlag & 32) {
      const r3 = e2._;
      r3 ? (hr(s2, e2, n2), n2 && Ns(s2, "_", r3, true)) : ur(e2, s2);
    } else e2 && dr(t, e2);
  }, "Zi");
  var Qi = /* @__PURE__ */ __name((t, e2, n2) => {
    const { vnode: s2, slots: r3 } = t;
    let i = true, o = U;
    if (s2.shapeFlag & 32) {
      const l2 = e2._;
      l2 ? n2 && l2 === 1 ? i = false : hr(r3, e2, n2) : (i = !e2.$stable, ur(e2, r3)), o = e2;
    } else e2 && (dr(t, e2), o = { default: 1 });
    if (i)
      for (const l2 in r3)
        !Vn(l2) && o[l2] == null && delete r3[l2];
  }, "Qi");
  var it = ro;
  function to(t) {
    return eo(t);
  }
  __name(to, "to");
  function eo(t, e2) {
    const n2 = We();
    n2.__VUE__ = true;
    const {
      insert: s2,
      remove: r3,
      patchProp: i,
      createElement: o,
      createText: l2,
      createComment: f2,
      setText: d2,
      setElementText: u2,
      parentNode: p3,
      nextSibling: S2,
      setScopeId: F3 = On,
      insertStaticContent: H2
    } = t, O = /* @__PURE__ */ __name((c2, a, h3, x3 = null, g2 = null, m2 = null, v3 = void 0, y2 = null, b4 = !!a.dynamicChildren) => {
      if (c2 === a)
        return;
      c2 && !ee(c2, a) && (x3 = Fe2(c2), Nt2(c2, g2, m2, true), c2 = null), a.patchFlag === -2 && (b4 = false, a.dynamicChildren = null);
      const { type: _2, ref: E2, shapeFlag: C } = a;
      switch (_2) {
        case Je:
          J2(c2, a, h3, x3);
          break;
        case Gt:
          k4(c2, a, h3, x3);
          break;
        case fn:
          c2 == null && N(a, h3, x3, v3);
          break;
        case ut:
          T(
            c2,
            a,
            h3,
            x3,
            g2,
            m2,
            v3,
            y2,
            b4
          );
          break;
        default:
          C & 1 ? st2(
            c2,
            a,
            h3,
            x3,
            g2,
            m2,
            v3,
            y2,
            b4
          ) : C & 6 ? z2(
            c2,
            a,
            h3,
            x3,
            g2,
            m2,
            v3,
            y2,
            b4
          ) : (C & 64 || C & 128) && _2.process(
            c2,
            a,
            h3,
            x3,
            g2,
            m2,
            v3,
            y2,
            b4,
            ce2
          );
      }
      E2 != null && g2 ? be(E2, c2 && c2.ref, m2, a || c2, !a) : E2 == null && c2 && c2.ref != null && be(c2.ref, null, m2, c2, true);
    }, "O"), J2 = /* @__PURE__ */ __name((c2, a, h3, x3) => {
      if (c2 == null)
        s2(
          a.el = l2(a.children),
          h3,
          x3
        );
      else {
        const g2 = a.el = c2.el;
        a.children !== c2.children && d2(g2, a.children);
      }
    }, "J"), k4 = /* @__PURE__ */ __name((c2, a, h3, x3) => {
      c2 == null ? s2(
        a.el = f2(a.children || ""),
        h3,
        x3
      ) : a.el = c2.el;
    }, "k"), N = /* @__PURE__ */ __name((c2, a, h3, x3) => {
      [c2.el, c2.anchor] = H2(
        c2.children,
        a,
        h3,
        x3,
        c2.el,
        c2.anchor
      );
    }, "N"), q = /* @__PURE__ */ __name(({ el: c2, anchor: a }, h3, x3) => {
      let g2;
      for (; c2 && c2 !== a; )
        g2 = S2(c2), s2(c2, h3, x3), c2 = g2;
      s2(a, h3, x3);
    }, "q"), X2 = /* @__PURE__ */ __name(({ el: c2, anchor: a }) => {
      let h3;
      for (; c2 && c2 !== a; )
        h3 = S2(c2), r3(c2), c2 = h3;
      r3(a);
    }, "X"), st2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3, y2, b4) => {
      if (a.type === "svg" ? v3 = "svg" : a.type === "math" && (v3 = "mathml"), c2 == null)
        ct2(
          a,
          h3,
          x3,
          g2,
          m2,
          v3,
          y2,
          b4
        );
      else {
        const _2 = c2.el && c2.el._isVueCE ? c2.el : null;
        try {
          _2 && _2._beginPatch(), M2(
            c2,
            a,
            g2,
            m2,
            v3,
            y2,
            b4
          );
        } finally {
          _2 && _2._endPatch();
        }
      }
    }, "st"), ct2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3, y2) => {
      let b4, _2;
      const { props: E2, shapeFlag: C, transition: w, dirs: A2 } = c2;
      if (b4 = c2.el = o(
        c2.type,
        m2,
        E2 && E2.is,
        E2
      ), C & 8 ? u2(b4, c2.children) : C & 16 && ft2(
        c2.children,
        b4,
        null,
        x3,
        g2,
        cn(c2, m2),
        v3,
        y2
      ), A2 && Bt(c2, null, x3, "created"), It2(b4, c2, c2.scopeId, v3, x3), E2) {
        for (const L in E2)
          L !== "value" && !me(L) && i(b4, L, null, E2[L], m2, x3);
        "value" in E2 && i(b4, "value", null, E2.value, m2), (_2 = E2.onVnodeBeforeMount) && xt(_2, x3, c2);
      }
      A2 && Bt(c2, null, x3, "beforeMount");
      const I2 = no(g2, w);
      I2 && w.beforeEnter(b4), s2(b4, a, h3), ((_2 = E2 && E2.onVnodeMounted) || I2 || A2) && it(() => {
        try {
          _2 && xt(_2, x3, c2), I2 && w.enter(b4), A2 && Bt(c2, null, x3, "mounted");
        } finally {
        }
      }, g2);
    }, "ct"), It2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2) => {
      if (h3 && F3(c2, h3), x3)
        for (let m2 = 0; m2 < x3.length; m2++)
          F3(c2, x3[m2]);
      if (g2) {
        let m2 = g2.subTree;
        if (a === m2 || _r(m2.type) && (m2.ssContent === a || m2.ssFallback === a)) {
          const v3 = g2.vnode;
          It2(
            c2,
            v3,
            v3.scopeId,
            v3.slotScopeIds,
            g2.parent
          );
        }
      }
    }, "It"), ft2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3, y2, b4 = 0) => {
      for (let _2 = b4; _2 < c2.length; _2++) {
        const E2 = c2[_2] = y2 ? At(c2[_2]) : Ct(c2[_2]);
        O(
          null,
          E2,
          a,
          h3,
          x3,
          g2,
          m2,
          v3,
          y2
        );
      }
    }, "ft"), M2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3) => {
      const y2 = a.el = c2.el;
      let { patchFlag: b4, dynamicChildren: _2, dirs: E2 } = a;
      b4 |= c2.patchFlag & 16;
      const C = c2.props || U, w = a.props || U;
      let A2;
      if (h3 && Kt(h3, false), (A2 = w.onVnodeBeforeUpdate) && xt(A2, h3, a, c2), E2 && Bt(a, c2, h3, "beforeUpdate"), h3 && Kt(h3, true), (C.innerHTML && w.innerHTML == null || C.textContent && w.textContent == null) && u2(y2, ""), _2 ? B2(
        c2.dynamicChildren,
        _2,
        y2,
        h3,
        x3,
        cn(a, g2),
        m2
      ) : v3 || Ze2(
        c2,
        a,
        y2,
        null,
        h3,
        x3,
        cn(a, g2),
        m2,
        false
      ), b4 > 0) {
        if (b4 & 16)
          Y2(y2, C, w, h3, g2);
        else if (b4 & 2 && C.class !== w.class && i(y2, "class", null, w.class, g2), b4 & 4 && i(y2, "style", C.style, w.style, g2), b4 & 8) {
          const I2 = a.dynamicProps;
          for (let L = 0; L < I2.length; L++) {
            const $2 = I2[L], G = C[$2], Z2 = w[$2];
            (Z2 !== G || $2 === "value") && i(y2, $2, G, Z2, g2, h3);
          }
        }
        b4 & 1 && c2.children !== a.children && u2(y2, a.children);
      } else !v3 && _2 == null && Y2(y2, C, w, h3, g2);
      ((A2 = w.onVnodeUpdated) || E2) && it(() => {
        A2 && xt(A2, h3, a, c2), E2 && Bt(a, c2, h3, "updated");
      }, x3);
    }, "M"), B2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3) => {
      for (let y2 = 0; y2 < a.length; y2++) {
        const b4 = c2[y2], _2 = a[y2], E2 = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          b4.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (b4.type === ut || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !ee(b4, _2) || // - In the case of a component, it could contain anything.
          b4.shapeFlag & 198) ? p3(b4.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            h3
          )
        );
        O(
          b4,
          _2,
          E2,
          null,
          x3,
          g2,
          m2,
          v3,
          true
        );
      }
    }, "B"), Y2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2) => {
      if (a !== h3) {
        if (a !== U)
          for (const m2 in a)
            !me(m2) && !(m2 in h3) && i(
              c2,
              m2,
              a[m2],
              null,
              g2,
              x3
            );
        for (const m2 in h3) {
          if (me(m2)) continue;
          const v3 = h3[m2], y2 = a[m2];
          v3 !== y2 && m2 !== "value" && i(c2, m2, y2, v3, g2, x3);
        }
        "value" in h3 && i(c2, "value", a.value, h3.value, g2);
      }
    }, "Y"), T = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3, y2, b4) => {
      const _2 = a.el = c2 ? c2.el : l2(""), E2 = a.anchor = c2 ? c2.anchor : l2("");
      let { patchFlag: C, dynamicChildren: w, slotScopeIds: A2 } = a;
      A2 && (y2 = y2 ? y2.concat(A2) : A2), c2 == null ? (s2(_2, h3, x3), s2(E2, h3, x3), ft2(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        a.children || [],
        h3,
        E2,
        g2,
        m2,
        v3,
        y2,
        b4
      )) : C > 0 && C & 64 && w && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      c2.dynamicChildren && c2.dynamicChildren.length === w.length ? (B2(
        c2.dynamicChildren,
        w,
        h3,
        g2,
        m2,
        v3,
        y2
      ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (a.key != null || g2 && a === g2.subTree) && pr(
        c2,
        a,
        true
        /* shallow */
      )) : Ze2(
        c2,
        a,
        h3,
        E2,
        g2,
        m2,
        v3,
        y2,
        b4
      );
    }, "T"), z2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3, y2, b4) => {
      a.slotScopeIds = y2, c2 == null ? a.shapeFlag & 512 ? g2.ctx.activate(
        a,
        h3,
        x3,
        v3,
        b4
      ) : et2(
        a,
        h3,
        x3,
        g2,
        m2,
        v3,
        b4
      ) : Rt2(c2, a, b4);
    }, "z"), et2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3) => {
      const y2 = c2.component = po(
        c2,
        x3,
        g2
      );
      if (Fi(c2) && (y2.ctx.renderer = ce2), mo(y2, false, v3), y2.asyncDep) {
        if (g2 && g2.registerDep(y2, oe, v3), !c2.el) {
          const b4 = y2.subTree = Mt(Gt);
          k4(null, b4, a, h3), c2.placeholder = b4.el;
        }
      } else
        oe(
          y2,
          c2,
          a,
          h3,
          g2,
          m2,
          v3
        );
    }, "et"), Rt2 = /* @__PURE__ */ __name((c2, a, h3) => {
      const x3 = a.component = c2.component;
      if (ki(c2, a, h3))
        if (x3.asyncDep && !x3.asyncResolved) {
          Xe2(x3, a, h3);
          return;
        } else
          x3.next = a, x3.update();
      else
        a.el = c2.el, x3.vnode = a;
    }, "Rt"), oe = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3) => {
      const y2 = /* @__PURE__ */ __name(() => {
        if (c2.isMounted) {
          let { next: C, bu: w, u: A2, parent: I2, vnode: L } = c2;
          {
            const mt2 = gr(c2);
            if (mt2) {
              C && (C.el = L.el, Xe2(c2, C, v3)), mt2.asyncDep.then(() => {
                it(() => {
                  c2.isUnmounted || _2();
                }, g2);
              });
              return;
            }
          }
          let $2 = C, G;
          Kt(c2, false), C ? (C.el = L.el, Xe2(c2, C, v3)) : C = L, w && en(w), (G = C.props && C.props.onVnodeBeforeUpdate) && xt(G, I2, C, L), Kt(c2, true);
          const Z2 = rs(c2), gt = c2.subTree;
          c2.subTree = Z2, O(
            gt,
            Z2,
            // parent may have changed if it's in a teleport
            p3(gt.el),
            // anchor may have changed if it's in a fragment
            Fe2(gt),
            c2,
            g2,
            m2
          ), C.el = Z2.el, $2 === null && qi(c2, Z2.el), A2 && it(A2, g2), (G = C.props && C.props.onVnodeUpdated) && it(
            () => xt(G, I2, C, L),
            g2
          );
        } else {
          let C;
          const { el: w, props: A2 } = a, { bm: I2, m: L, parent: $2, root: G, type: Z2 } = c2, gt = ye(a);
          Kt(c2, false), I2 && en(I2), !gt && (C = A2 && A2.onVnodeBeforeMount) && xt(C, $2, a), Kt(c2, true);
          {
            G.ce && G.ce._hasShadowRoot() && G.ce._injectChildStyle(
              Z2,
              c2.parent ? c2.parent.type : void 0
            );
            const mt2 = c2.subTree = rs(c2);
            O(
              null,
              mt2,
              h3,
              x3,
              c2,
              g2,
              m2
            ), a.el = mt2.el;
          }
          if (L && it(L, g2), !gt && (C = A2 && A2.onVnodeMounted)) {
            const mt2 = a;
            it(
              () => xt(C, $2, mt2),
              g2
            );
          }
          (a.shapeFlag & 256 || $2 && ye($2.vnode) && $2.vnode.shapeFlag & 256) && c2.a && it(c2.a, g2), c2.isMounted = true, a = h3 = x3 = null;
        }
      }, "y");
      c2.scope.on();
      const b4 = c2.effect = new Gr(y2);
      c2.scope.off();
      const _2 = c2.update = b4.run.bind(b4), E2 = c2.job = b4.runIfDirty.bind(b4);
      E2.i = c2, E2.id = c2.uid, b4.scheduler = () => Zs(E2), Kt(c2, true), _2();
    }, "oe"), Xe2 = /* @__PURE__ */ __name((c2, a, h3) => {
      a.component = c2;
      const x3 = c2.vnode.props;
      c2.vnode = a, c2.next = null, Gi(c2, a.props, x3, h3), Qi(c2, a.children, h3), qt(), es(c2), Yt();
    }, "Xe"), Ze2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3, y2, b4 = false) => {
      const _2 = c2 && c2.children, E2 = c2 ? c2.shapeFlag : 0, C = a.children, { patchFlag: w, shapeFlag: A2 } = a;
      if (w > 0) {
        if (w & 128) {
          Wn2(
            _2,
            C,
            h3,
            x3,
            g2,
            m2,
            v3,
            y2,
            b4
          );
          return;
        } else if (w & 256) {
          Mr2(
            _2,
            C,
            h3,
            x3,
            g2,
            m2,
            v3,
            y2,
            b4
          );
          return;
        }
      }
      A2 & 8 ? (E2 & 16 && le(_2, g2, m2), C !== _2 && u2(h3, C)) : E2 & 16 ? A2 & 16 ? Wn2(
        _2,
        C,
        h3,
        x3,
        g2,
        m2,
        v3,
        y2,
        b4
      ) : le(_2, g2, m2, true) : (E2 & 8 && u2(h3, ""), A2 & 16 && ft2(
        C,
        h3,
        x3,
        g2,
        m2,
        v3,
        y2,
        b4
      ));
    }, "Ze"), Mr2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3, y2, b4) => {
      c2 = c2 || ne, a = a || ne;
      const _2 = c2.length, E2 = a.length, C = Math.min(_2, E2);
      let w;
      for (w = 0; w < C; w++) {
        const A2 = a[w] = b4 ? At(a[w]) : Ct(a[w]);
        O(
          c2[w],
          A2,
          h3,
          null,
          g2,
          m2,
          v3,
          y2,
          b4
        );
      }
      _2 > E2 ? le(
        c2,
        g2,
        m2,
        true,
        false,
        C
      ) : ft2(
        a,
        h3,
        x3,
        g2,
        m2,
        v3,
        y2,
        b4,
        C
      );
    }, "Mr"), Wn2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2, m2, v3, y2, b4) => {
      let _2 = 0;
      const E2 = a.length;
      let C = c2.length - 1, w = E2 - 1;
      for (; _2 <= C && _2 <= w; ) {
        const A2 = c2[_2], I2 = a[_2] = b4 ? At(a[_2]) : Ct(a[_2]);
        if (ee(A2, I2))
          O(
            A2,
            I2,
            h3,
            null,
            g2,
            m2,
            v3,
            y2,
            b4
          );
        else
          break;
        _2++;
      }
      for (; _2 <= C && _2 <= w; ) {
        const A2 = c2[C], I2 = a[w] = b4 ? At(a[w]) : Ct(a[w]);
        if (ee(A2, I2))
          O(
            A2,
            I2,
            h3,
            null,
            g2,
            m2,
            v3,
            y2,
            b4
          );
        else
          break;
        C--, w--;
      }
      if (_2 > C) {
        if (_2 <= w) {
          const A2 = w + 1, I2 = A2 < E2 ? a[A2].el : x3;
          for (; _2 <= w; )
            O(
              null,
              a[_2] = b4 ? At(a[_2]) : Ct(a[_2]),
              h3,
              I2,
              g2,
              m2,
              v3,
              y2,
              b4
            ), _2++;
        }
      } else if (_2 > w)
        for (; _2 <= C; )
          Nt2(c2[_2], g2, m2, true), _2++;
      else {
        const A2 = _2, I2 = _2, L = /* @__PURE__ */ new Map();
        for (_2 = I2; _2 <= w; _2++) {
          const rt2 = a[_2] = b4 ? At(a[_2]) : Ct(a[_2]);
          rt2.key != null && L.set(rt2.key, _2);
        }
        let $2, G = 0;
        const Z2 = w - I2 + 1;
        let gt = false, mt2 = 0;
        const fe2 = new Array(Z2);
        for (_2 = 0; _2 < Z2; _2++) fe2[_2] = 0;
        for (_2 = A2; _2 <= C; _2++) {
          const rt2 = c2[_2];
          if (G >= Z2) {
            Nt2(rt2, g2, m2, true);
            continue;
          }
          let _t2;
          if (rt2.key != null)
            _t2 = L.get(rt2.key);
          else
            for ($2 = I2; $2 <= w; $2++)
              if (fe2[$2 - I2] === 0 && ee(rt2, a[$2])) {
                _t2 = $2;
                break;
              }
          _t2 === void 0 ? Nt2(rt2, g2, m2, true) : (fe2[_t2 - I2] = _2 + 1, _t2 >= mt2 ? mt2 = _t2 : gt = true, O(
            rt2,
            a[_t2],
            h3,
            null,
            g2,
            m2,
            v3,
            y2,
            b4
          ), G++);
        }
        const Yn2 = gt ? so(fe2) : ne;
        for ($2 = Yn2.length - 1, _2 = Z2 - 1; _2 >= 0; _2--) {
          const rt2 = I2 + _2, _t2 = a[rt2], Gn2 = a[rt2 + 1], Jn2 = rt2 + 1 < E2 ? (
            // #13559, #14173 fallback to el placeholder for unresolved async component
            Gn2.el || mr(Gn2)
          ) : x3;
          fe2[_2] === 0 ? O(
            null,
            _t2,
            h3,
            Jn2,
            g2,
            m2,
            v3,
            y2,
            b4
          ) : gt && ($2 < 0 || _2 !== Yn2[$2] ? Pe2(_t2, h3, Jn2, 2) : $2--);
        }
      }
    }, "Wn"), Pe2 = /* @__PURE__ */ __name((c2, a, h3, x3, g2 = null) => {
      const { el: m2, type: v3, transition: y2, children: b4, shapeFlag: _2 } = c2;
      if (_2 & 6) {
        Pe2(c2.component.subTree, a, h3, x3);
        return;
      }
      if (_2 & 128) {
        c2.suspense.move(a, h3, x3);
        return;
      }
      if (_2 & 64) {
        v3.move(c2, a, h3, ce2);
        return;
      }
      if (v3 === ut) {
        s2(m2, a, h3);
        for (let C = 0; C < b4.length; C++)
          Pe2(b4[C], a, h3, x3);
        s2(c2.anchor, a, h3);
        return;
      }
      if (v3 === fn) {
        q(c2, a, h3);
        return;
      }
      if (x3 !== 2 && _2 & 1 && y2)
        if (x3 === 0)
          y2.beforeEnter(m2), s2(m2, a, h3), it(() => y2.enter(m2), g2);
        else {
          const { leave: C, delayLeave: w, afterLeave: A2 } = y2, I2 = /* @__PURE__ */ __name(() => {
            c2.ctx.isUnmounted ? r3(m2) : s2(m2, a, h3);
          }, "I"), L = /* @__PURE__ */ __name(() => {
            m2._isLeaving && m2[Dt](
              true
              /* cancelled */
            ), C(m2, () => {
              I2(), A2 && A2();
            });
          }, "L");
          w ? w(m2, I2, L) : L();
        }
      else
        s2(m2, a, h3);
    }, "Pe"), Nt2 = /* @__PURE__ */ __name((c2, a, h3, x3 = false, g2 = false) => {
      const {
        type: m2,
        props: v3,
        ref: y2,
        children: b4,
        dynamicChildren: _2,
        shapeFlag: E2,
        patchFlag: C,
        dirs: w,
        cacheIndex: A2,
        memo: I2
      } = c2;
      if (C === -2 && (g2 = false), y2 != null && (qt(), be(y2, null, h3, c2, true), Yt()), A2 != null && (a.renderCache[A2] = void 0), E2 & 256) {
        a.ctx.deactivate(c2);
        return;
      }
      const L = E2 & 1 && w, $2 = !ye(c2);
      let G;
      if ($2 && (G = v3 && v3.onVnodeBeforeUnmount) && xt(G, a, c2), E2 & 6)
        Fr2(c2.component, h3, x3);
      else {
        if (E2 & 128) {
          c2.suspense.unmount(h3, x3);
          return;
        }
        L && Bt(c2, null, a, "beforeUnmount"), E2 & 64 ? c2.type.remove(
          c2,
          a,
          h3,
          ce2,
          x3
        ) : _2 && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !_2.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (m2 !== ut || C > 0 && C & 64) ? le(
          _2,
          a,
          h3,
          false,
          true
        ) : (m2 === ut && C & 384 || !g2 && E2 & 16) && le(b4, a, h3), x3 && kn2(c2);
      }
      const Z2 = I2 != null && A2 == null;
      ($2 && (G = v3 && v3.onVnodeUnmounted) || L || Z2) && it(() => {
        G && xt(G, a, c2), L && Bt(c2, null, a, "unmounted"), Z2 && (c2.el = null);
      }, h3);
    }, "Nt"), kn2 = /* @__PURE__ */ __name((c2) => {
      const { type: a, el: h3, anchor: x3, transition: g2 } = c2;
      if (a === ut) {
        Pr2(h3, x3);
        return;
      }
      if (a === fn) {
        X2(c2);
        return;
      }
      const m2 = /* @__PURE__ */ __name(() => {
        r3(h3), g2 && !g2.persisted && g2.afterLeave && g2.afterLeave();
      }, "m");
      if (c2.shapeFlag & 1 && g2 && !g2.persisted) {
        const { leave: v3, delayLeave: y2 } = g2, b4 = /* @__PURE__ */ __name(() => v3(h3, m2), "b");
        y2 ? y2(c2.el, m2, b4) : b4();
      } else
        m2();
    }, "kn"), Pr2 = /* @__PURE__ */ __name((c2, a) => {
      let h3;
      for (; c2 !== a; )
        h3 = S2(c2), r3(c2), c2 = h3;
      r3(a);
    }, "Pr"), Fr2 = /* @__PURE__ */ __name((c2, a, h3) => {
      const { bum: x3, scope: g2, job: m2, subTree: v3, um: y2, m: b4, a: _2 } = c2;
      ls(b4), ls(_2), x3 && en(x3), g2.stop(), m2 && (m2.flags |= 8, Nt2(v3, c2, a, h3)), y2 && it(y2, a), it(() => {
        c2.isUnmounted = true;
      }, a);
    }, "Fr"), le = /* @__PURE__ */ __name((c2, a, h3, x3 = false, g2 = false, m2 = 0) => {
      for (let v3 = m2; v3 < c2.length; v3++)
        Nt2(c2[v3], a, h3, x3, g2);
    }, "le"), Fe2 = /* @__PURE__ */ __name((c2) => {
      if (c2.shapeFlag & 6)
        return Fe2(c2.component.subTree);
      if (c2.shapeFlag & 128)
        return c2.suspense.next();
      const a = S2(c2.anchor || c2.el), h3 = a && a[Ti];
      return h3 ? S2(h3) : a;
    }, "Fe");
    let Qe2 = false;
    const qn2 = /* @__PURE__ */ __name((c2, a, h3) => {
      let x3;
      c2 == null ? a._vnode && (Nt2(a._vnode, null, null, true), x3 = a._vnode.component) : O(
        a._vnode || null,
        c2,
        a,
        null,
        null,
        null,
        h3
      ), a._vnode = c2, Qe2 || (Qe2 = true, es(x3), tr(), Qe2 = false);
    }, "qn"), ce2 = {
      p: O,
      um: Nt2,
      m: Pe2,
      r: kn2,
      mt: et2,
      mc: ft2,
      pc: Ze2,
      pbc: B2,
      n: Fe2,
      o: t
    };
    return {
      render: qn2,
      hydrate: void 0,
      createApp: Vi(qn2)
    };
  }
  __name(eo, "eo");
  function cn({ type: t, props: e2 }, n2) {
    return n2 === "svg" && t === "foreignObject" || n2 === "mathml" && t === "annotation-xml" && e2 && e2.encoding && e2.encoding.includes("html") ? void 0 : n2;
  }
  __name(cn, "cn");
  function Kt({ effect: t, job: e2 }, n2) {
    n2 ? (t.flags |= 32, e2.flags |= 4) : (t.flags &= -33, e2.flags &= -5);
  }
  __name(Kt, "Kt");
  function no(t, e2) {
    return (!t || t && !t.pendingBranch) && e2 && !e2.persisted;
  }
  __name(no, "no");
  function pr(t, e2, n2 = false) {
    const s2 = t.children, r3 = e2.children;
    if (P(s2) && P(r3))
      for (let i = 0; i < s2.length; i++) {
        const o = s2[i];
        let l2 = r3[i];
        l2.shapeFlag & 1 && !l2.dynamicChildren && ((l2.patchFlag <= 0 || l2.patchFlag === 32) && (l2 = r3[i] = At(r3[i]), l2.el = o.el), !n2 && l2.patchFlag !== -2 && pr(o, l2)), l2.type === Je && (l2.patchFlag === -1 && (l2 = r3[i] = At(l2)), l2.el = o.el), l2.type === Gt && !l2.el && (l2.el = o.el);
      }
  }
  __name(pr, "pr");
  function so(t) {
    const e2 = t.slice(), n2 = [0];
    let s2, r3, i, o, l2;
    const f2 = t.length;
    for (s2 = 0; s2 < f2; s2++) {
      const d2 = t[s2];
      if (d2 !== 0) {
        if (r3 = n2[n2.length - 1], t[r3] < d2) {
          e2[s2] = r3, n2.push(s2);
          continue;
        }
        for (i = 0, o = n2.length - 1; i < o; )
          l2 = i + o >> 1, t[n2[l2]] < d2 ? i = l2 + 1 : o = l2;
        d2 < t[n2[i]] && (i > 0 && (e2[s2] = n2[i - 1]), n2[i] = s2);
      }
    }
    for (i = n2.length, o = n2[i - 1]; i-- > 0; )
      n2[i] = o, o = e2[o];
    return n2;
  }
  __name(so, "so");
  function gr(t) {
    const e2 = t.subTree.component;
    if (e2)
      return e2.asyncDep && !e2.asyncResolved ? e2 : gr(e2);
  }
  __name(gr, "gr");
  function ls(t) {
    if (t)
      for (let e2 = 0; e2 < t.length; e2++)
        t[e2].flags |= 8;
  }
  __name(ls, "ls");
  function mr(t) {
    if (t.placeholder)
      return t.placeholder;
    const e2 = t.component;
    return e2 ? mr(e2.subTree) : null;
  }
  __name(mr, "mr");
  var _r = /* @__PURE__ */ __name((t) => t.__isSuspense, "_r");
  function ro(t, e2) {
    e2 && e2.pendingBranch ? P(t) ? e2.effects.push(...t) : e2.effects.push(t) : Si(t);
  }
  __name(ro, "ro");
  var ut = /* @__PURE__ */ Symbol.for("v-fgt");
  var Je = /* @__PURE__ */ Symbol.for("v-txt");
  var Gt = /* @__PURE__ */ Symbol.for("v-cmt");
  var fn = /* @__PURE__ */ Symbol.for("v-stc");
  var Ce = [];
  var ot = null;
  function an(t = false) {
    Ce.push(ot = t ? null : []);
  }
  __name(an, "an");
  function io() {
    Ce.pop(), ot = Ce[Ce.length - 1] || null;
  }
  __name(io, "io");
  var Ae = 1;
  function cs(t, e2 = false) {
    Ae += t, t < 0 && ot && e2 && (ot.hasOnce = true);
  }
  __name(cs, "cs");
  function oo(t) {
    return t.dynamicChildren = Ae > 0 ? ot || ne : null, io(), Ae > 0 && ot && ot.push(t), t;
  }
  __name(oo, "oo");
  function un(t, e2, n2, s2, r3, i) {
    return oo(
      je(
        t,
        e2,
        n2,
        s2,
        r3,
        i,
        true
      )
    );
  }
  __name(un, "un");
  function xr(t) {
    return t ? t.__v_isVNode === true : false;
  }
  __name(xr, "xr");
  function ee(t, e2) {
    return t.type === e2.type && t.key === e2.key;
  }
  __name(ee, "ee");
  var br = /* @__PURE__ */ __name(({ key: t }) => t ?? null, "br");
  var Ne = /* @__PURE__ */ __name(({
    ref: t,
    ref_key: e2,
    ref_for: n2
  }) => (typeof t == "number" && (t = "" + t), t != null ? W2(t) || /* @__PURE__ */ pt(t) || K(t) ? { i: St, r: t, k: e2, f: !!n2 } : t : null), "Ne");
  function je(t, e2 = null, n2 = null, s2 = 0, r3 = null, i = t === ut ? 0 : 1, o = false, l2 = false) {
    const f2 = {
      __v_isVNode: true,
      __v_skip: true,
      type: t,
      props: e2,
      key: e2 && br(e2),
      ref: e2 && Ne(e2),
      scopeId: nr,
      slotScopeIds: null,
      children: n2,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: i,
      patchFlag: s2,
      dynamicProps: r3,
      dynamicChildren: null,
      appContext: null,
      ctx: St
    };
    return l2 ? (Kn(f2, n2), i & 128 && t.normalize(f2)) : n2 && (f2.shapeFlag |= W2(n2) ? 8 : 16), Ae > 0 && // avoid a block node from tracking itself
    !o && // has current parent block
    ot && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (f2.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    f2.patchFlag !== 32 && ot.push(f2), f2;
  }
  __name(je, "je");
  var Mt = lo;
  function lo(t, e2 = null, n2 = null, s2 = 0, r3 = null, i = false) {
    if ((!t || t === Di) && (t = Gt), xr(t)) {
      const l2 = Jt(
        t,
        e2,
        true
        /* mergeRef: true */
      );
      return n2 && Kn(l2, n2), Ae > 0 && !i && ot && (l2.shapeFlag & 6 ? ot[ot.indexOf(t)] = l2 : ot.push(l2)), l2.patchFlag = -2, l2;
    }
    if (yo(t) && (t = t.__vccOpts), e2) {
      e2 = co(e2);
      let { class: l2, style: f2 } = e2;
      l2 && !W2(l2) && (e2.class = Se(l2)), V3(f2) && (/* @__PURE__ */ Hn(f2) && !P(f2) && (f2 = lt({}, f2)), e2.style = Pn(f2));
    }
    const o = W2(t) ? 1 : _r(t) ? 128 : wi(t) ? 64 : V3(t) ? 4 : K(t) ? 2 : 0;
    return je(
      t,
      e2,
      n2,
      s2,
      r3,
      o,
      i,
      true
    );
  }
  __name(lo, "lo");
  function co(t) {
    return t ? /* @__PURE__ */ Hn(t) || fr(t) ? lt({}, t) : t : null;
  }
  __name(co, "co");
  function Jt(t, e2, n2 = false, s2 = false) {
    const { props: r3, ref: i, patchFlag: o, children: l2, transition: f2 } = t, d2 = e2 ? ao(r3 || {}, e2) : r3, u2 = {
      __v_isVNode: true,
      __v_skip: true,
      type: t.type,
      props: d2,
      key: d2 && br(d2),
      ref: e2 && e2.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        n2 && i ? P(i) ? i.concat(Ne(e2)) : [i, Ne(e2)] : Ne(e2)
      ) : i,
      scopeId: t.scopeId,
      slotScopeIds: t.slotScopeIds,
      children: l2,
      target: t.target,
      targetStart: t.targetStart,
      targetAnchor: t.targetAnchor,
      staticCount: t.staticCount,
      shapeFlag: t.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: e2 && t.type !== ut ? o === -1 ? 16 : o | 16 : o,
      dynamicProps: t.dynamicProps,
      dynamicChildren: t.dynamicChildren,
      appContext: t.appContext,
      dirs: t.dirs,
      transition: f2,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: t.component,
      suspense: t.suspense,
      ssContent: t.ssContent && Jt(t.ssContent),
      ssFallback: t.ssFallback && Jt(t.ssFallback),
      placeholder: t.placeholder,
      el: t.el,
      anchor: t.anchor,
      ctx: t.ctx,
      ce: t.ce
    };
    return f2 && s2 && Ee(
      u2,
      f2.clone(u2)
    ), u2;
  }
  __name(Jt, "Jt");
  function fo(t = " ", e2 = 0) {
    return Mt(Je, null, t, e2);
  }
  __name(fo, "fo");
  function Ct(t) {
    return t == null || typeof t == "boolean" ? Mt(Gt) : P(t) ? Mt(
      ut,
      null,
      // #3666, avoid reference pollution when reusing vnode
      t.slice()
    ) : xr(t) ? At(t) : Mt(Je, null, String(t));
  }
  __name(Ct, "Ct");
  function At(t) {
    return t.el === null && t.patchFlag !== -1 || t.memo ? t : Jt(t);
  }
  __name(At, "At");
  function Kn(t, e2) {
    let n2 = 0;
    const { shapeFlag: s2 } = t;
    if (e2 == null)
      e2 = null;
    else if (P(e2))
      n2 = 16;
    else if (typeof e2 == "object")
      if (s2 & 65) {
        const r3 = e2.default;
        r3 && (r3._c && (r3._d = false), Kn(t, r3()), r3._c && (r3._d = true));
        return;
      } else {
        n2 = 32;
        const r3 = e2._;
        !r3 && !fr(e2) ? e2._ctx = St : r3 === 3 && St && (St.slots._ === 1 ? e2._ = 1 : (e2._ = 2, t.patchFlag |= 1024));
      }
    else K(e2) ? (e2 = { default: e2, _ctx: St }, n2 = 32) : (e2 = String(e2), s2 & 64 ? (n2 = 16, e2 = [fo(e2)]) : n2 = 8);
    t.children = e2, t.shapeFlag |= n2;
  }
  __name(Kn, "Kn");
  function ao(...t) {
    const e2 = {};
    for (let n2 = 0; n2 < t.length; n2++) {
      const s2 = t[n2];
      for (const r3 in s2)
        if (r3 === "class")
          e2.class !== s2.class && (e2.class = Se([e2.class, s2.class]));
        else if (r3 === "style")
          e2.style = Pn([e2.style, s2.style]);
        else if (Ke(r3)) {
          const i = e2[r3], o = s2[r3];
          o && i !== o && !(P(i) && i.includes(o)) ? e2[r3] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
          // the model listener.
          !ze(r3) && (e2[r3] = o);
        } else r3 !== "" && (e2[r3] = s2[r3]);
    }
    return e2;
  }
  __name(ao, "ao");
  function xt(t, e2, n2, s2 = null) {
    Ft(t, e2, 7, [
      n2,
      s2
    ]);
  }
  __name(xt, "xt");
  var uo = ir();
  var ho = 0;
  function po(t, e2, n2) {
    const s2 = t.type, r3 = (e2 ? e2.appContext : t.appContext) || uo, i = {
      uid: ho++,
      vnode: t,
      type: s2,
      parent: e2,
      appContext: r3,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      job: null,
      scope: new Yr(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e2 ? e2.provides : Object.create(r3.provides),
      ids: e2 ? e2.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: Ji(s2, r3),
      emitsOptions: zi(s2, r3),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: U,
      // inheritAttrs
      inheritAttrs: s2.inheritAttrs,
      // state
      ctx: U,
      data: U,
      props: U,
      attrs: U,
      slots: U,
      refs: U,
      setupState: U,
      setupContext: null,
      // suspense related
      suspense: n2,
      suspenseId: n2 ? n2.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    return i.ctx = { _: i }, i.root = e2 ? e2.root : i, i.emit = Ki.bind(null, i), t.ce && t.ce(i), i;
  }
  __name(po, "po");
  var Xt = null;
  var go = /* @__PURE__ */ __name(() => Xt || St, "go");
  var Ve;
  var Tn;
  {
    const t = We(), e2 = /* @__PURE__ */ __name((n2, s2) => {
      let r3;
      return (r3 = t[n2]) || (r3 = t[n2] = []), r3.push(s2), (i) => {
        r3.length > 1 ? r3.forEach((o) => o(i)) : r3[0](i);
      };
    }, "e");
    Ve = e2(
      "__VUE_INSTANCE_SETTERS__",
      (n2) => Xt = n2
    ), Tn = e2(
      "__VUE_SSR_SETTERS__",
      (n2) => vr = n2
    );
  }
  var zn = /* @__PURE__ */ __name((t) => {
    const e2 = Xt;
    return Ve(t), t.scope.on(), () => {
      t.scope.off(), Ve(e2);
    };
  }, "zn");
  var fs = /* @__PURE__ */ __name(() => {
    Xt && Xt.scope.off(), Ve(null);
  }, "fs");
  function yr(t) {
    return t.vnode.shapeFlag & 4;
  }
  __name(yr, "yr");
  var vr = false;
  function mo(t, e2 = false, n2 = false) {
    e2 && Tn(e2);
    const { props: s2, children: r3 } = t.vnode, i = yr(t);
    Yi(t, s2, i, e2), Zi(t, r3, n2 || e2);
    const o = i ? _o(t, e2) : void 0;
    return e2 && Tn(false), o;
  }
  __name(mo, "mo");
  function _o(t, e2) {
    const n2 = t.type;
    t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Hi);
    const { setup: s2 } = n2;
    if (s2) {
      qt();
      const r3 = t.setupContext = s2.length > 1 ? bo(t) : null, i = zn(t), o = Me(
        s2,
        t,
        0,
        [
          t.props,
          r3
        ]
      ), l2 = Fs(o);
      if (Yt(), i(), (l2 || t.sp) && !ye(t) && Pi(t), l2) {
        if (o.then(fs, fs), e2)
          return o.then((f2) => {
            as(t, f2);
          }).catch((f2) => {
            Ye(f2, t, 0);
          });
        t.asyncDep = o;
      } else
        as(t, o);
    } else
      Cr(t);
  }
  __name(_o, "_o");
  function as(t, e2, n2) {
    K(e2) ? t.type.__ssrInlineRender ? t.ssrRender = e2 : t.render = e2 : V3(e2) && (t.setupState = Js(e2)), Cr(t);
  }
  __name(as, "as");
  function Cr(t, e2, n2) {
    const s2 = t.type;
    t.render || (t.render = s2.render || On);
  }
  __name(Cr, "Cr");
  var xo = {
    get(t, e2) {
      return tt(t, "get", ""), t[e2];
    }
  };
  function bo(t) {
    const e2 = /* @__PURE__ */ __name((n2) => {
      t.exposed = n2 || {};
    }, "e");
    return {
      attrs: new Proxy(t.attrs, xo),
      slots: t.slots,
      emit: t.emit,
      expose: e2
    };
  }
  __name(bo, "bo");
  function Un(t) {
    return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Js(xi(t.exposed)), {
      get(e2, n2) {
        if (n2 in e2)
          return e2[n2];
        if (n2 in ve)
          return ve[n2](t);
      },
      has(e2, n2) {
        return n2 in e2 || n2 in ve;
      }
    })) : t.proxy;
  }
  __name(Un, "Un");
  function yo(t) {
    return K(t) && "__vccOpts" in t;
  }
  __name(yo, "yo");
  var vo = "3.5.34";
  var wn;
  var us = typeof window < "u" && window.trustedTypes;
  if (us)
    try {
      wn = /* @__PURE__ */ us.createPolicy("vue", {
        createHTML: /* @__PURE__ */ __name((t) => t, "createHTML")
      });
    } catch {
    }
  var Sr = wn ? (t) => wn.createHTML(t) : (t) => t;
  var Co = "http://www.w3.org/2000/svg";
  var So = "http://www.w3.org/1998/Math/MathML";
  var Et = typeof document < "u" ? document : null;
  var ds = Et && /* @__PURE__ */ Et.createElement("template");
  var To = {
    insert: /* @__PURE__ */ __name((t, e2, n2) => {
      e2.insertBefore(t, n2 || null);
    }, "insert"),
    remove: /* @__PURE__ */ __name((t) => {
      const e2 = t.parentNode;
      e2 && e2.removeChild(t);
    }, "remove"),
    createElement: /* @__PURE__ */ __name((t, e2, n2, s2) => {
      const r3 = e2 === "svg" ? Et.createElementNS(Co, t) : e2 === "mathml" ? Et.createElementNS(So, t) : n2 ? Et.createElement(t, { is: n2 }) : Et.createElement(t);
      return t === "select" && s2 && s2.multiple != null && r3.setAttribute("multiple", s2.multiple), r3;
    }, "createElement"),
    createText: /* @__PURE__ */ __name((t) => Et.createTextNode(t), "createText"),
    createComment: /* @__PURE__ */ __name((t) => Et.createComment(t), "createComment"),
    setText: /* @__PURE__ */ __name((t, e2) => {
      t.nodeValue = e2;
    }, "setText"),
    setElementText: /* @__PURE__ */ __name((t, e2) => {
      t.textContent = e2;
    }, "setElementText"),
    parentNode: /* @__PURE__ */ __name((t) => t.parentNode, "parentNode"),
    nextSibling: /* @__PURE__ */ __name((t) => t.nextSibling, "nextSibling"),
    querySelector: /* @__PURE__ */ __name((t) => Et.querySelector(t), "querySelector"),
    setScopeId(t, e2) {
      t.setAttribute(e2, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(t, e2, n2, s2, r3, i) {
      const o = n2 ? n2.previousSibling : e2.lastChild;
      if (r3 && (r3 === i || r3.nextSibling))
        for (; e2.insertBefore(r3.cloneNode(true), n2), !(r3 === i || !(r3 = r3.nextSibling)); )
          ;
      else {
        ds.innerHTML = Sr(
          s2 === "svg" ? `<svg>${t}</svg>` : s2 === "mathml" ? `<math>${t}</math>` : t
        );
        const l2 = ds.content;
        if (s2 === "svg" || s2 === "mathml") {
          const f2 = l2.firstChild;
          for (; f2.firstChild; )
            l2.appendChild(f2.firstChild);
          l2.removeChild(f2);
        }
        e2.insertBefore(l2, n2);
      }
      return [
        // first
        o ? o.nextSibling : e2.firstChild,
        // last
        n2 ? n2.previousSibling : e2.lastChild
      ];
    }
  };
  var Lt = "transition";
  var de = "animation";
  var ie = /* @__PURE__ */ Symbol("_vtc");
  var Tr = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  var wo = /* @__PURE__ */ lt(
    {},
    Ai,
    Tr
  );
  var zt = /* @__PURE__ */ __name((t, e2 = []) => {
    P(t) ? t.forEach((n2) => n2(...e2)) : t && t(...e2);
  }, "zt");
  var hs = /* @__PURE__ */ __name((t) => t ? P(t) ? t.some((e2) => e2.length > 1) : t.length > 1 : false, "hs");
  function Eo(t) {
    const e2 = {};
    for (const T in t)
      T in Tr || (e2[T] = t[T]);
    if (t.css === false)
      return e2;
    const {
      name: n2 = "v",
      type: s2,
      duration: r3,
      enterFromClass: i = `${n2}-enter-from`,
      enterActiveClass: o = `${n2}-enter-active`,
      enterToClass: l2 = `${n2}-enter-to`,
      appearFromClass: f2 = i,
      appearActiveClass: d2 = o,
      appearToClass: u2 = l2,
      leaveFromClass: p3 = `${n2}-leave-from`,
      leaveActiveClass: S2 = `${n2}-leave-active`,
      leaveToClass: F3 = `${n2}-leave-to`
    } = t, H2 = Ao(r3), O = H2 && H2[0], J2 = H2 && H2[1], {
      onBeforeEnter: k4,
      onEnter: N,
      onEnterCancelled: q,
      onLeave: X2,
      onLeaveCancelled: st2,
      onBeforeAppear: ct2 = k4,
      onAppear: It2 = N,
      onAppearCancelled: ft2 = q
    } = e2, M2 = /* @__PURE__ */ __name((T, z2, et2, Rt2) => {
      T._enterCancelled = Rt2, $t(T, z2 ? u2 : l2), $t(T, z2 ? d2 : o), et2 && et2();
    }, "M"), B2 = /* @__PURE__ */ __name((T, z2) => {
      T._isLeaving = false, $t(T, p3), $t(T, F3), $t(T, S2), z2 && z2();
    }, "B"), Y2 = /* @__PURE__ */ __name((T) => (z2, et2) => {
      const Rt2 = T ? It2 : N, oe = /* @__PURE__ */ __name(() => M2(z2, T, et2), "oe");
      zt(Rt2, [z2, oe]), ps(() => {
        $t(z2, T ? f2 : i), bt(z2, T ? u2 : l2), hs(Rt2) || gs(z2, s2, O, oe);
      });
    }, "Y");
    return lt(e2, {
      onBeforeEnter(T) {
        zt(k4, [T]), bt(T, i), bt(T, o);
      },
      onBeforeAppear(T) {
        zt(ct2, [T]), bt(T, f2), bt(T, d2);
      },
      onEnter: Y2(false),
      onAppear: Y2(true),
      onLeave(T, z2) {
        T._isLeaving = true;
        const et2 = /* @__PURE__ */ __name(() => B2(T, z2), "et");
        bt(T, p3), T._enterCancelled ? (bt(T, S2), En(T)) : (En(T), bt(T, S2)), ps(() => {
          T._isLeaving && ($t(T, p3), bt(T, F3), hs(X2) || gs(T, s2, J2, et2));
        }), zt(X2, [T, et2]);
      },
      onEnterCancelled(T) {
        M2(T, false, void 0, true), zt(q, [T]);
      },
      onAppearCancelled(T) {
        M2(T, true, void 0, true), zt(ft2, [T]);
      },
      onLeaveCancelled(T) {
        B2(T), zt(st2, [T]);
      }
    });
  }
  __name(Eo, "Eo");
  function Ao(t) {
    if (t == null)
      return null;
    if (V3(t))
      return [dn(t.enter), dn(t.leave)];
    {
      const e2 = dn(t);
      return [e2, e2];
    }
  }
  __name(Ao, "Ao");
  function dn(t) {
    return Vr(t);
  }
  __name(dn, "dn");
  function bt(t, e2) {
    e2.split(/\s+/).forEach((n2) => n2 && t.classList.add(n2)), (t[ie] || (t[ie] = /* @__PURE__ */ new Set())).add(e2);
  }
  __name(bt, "bt");
  function $t(t, e2) {
    e2.split(/\s+/).forEach((s2) => s2 && t.classList.remove(s2));
    const n2 = t[ie];
    n2 && (n2.delete(e2), n2.size || (t[ie] = void 0));
  }
  __name($t, "$t");
  function ps(t) {
    requestAnimationFrame(() => {
      requestAnimationFrame(t);
    });
  }
  __name(ps, "ps");
  var Oo = 0;
  function gs(t, e2, n2, s2) {
    const r3 = t._endId = ++Oo, i = /* @__PURE__ */ __name(() => {
      r3 === t._endId && s2();
    }, "i");
    if (n2 != null)
      return setTimeout(i, n2);
    const { type: o, timeout: l2, propCount: f2 } = wr(t, e2);
    if (!o)
      return s2();
    const d2 = o + "end";
    let u2 = 0;
    const p3 = /* @__PURE__ */ __name(() => {
      t.removeEventListener(d2, S2), i();
    }, "p"), S2 = /* @__PURE__ */ __name((F3) => {
      F3.target === t && ++u2 >= f2 && p3();
    }, "S");
    setTimeout(() => {
      u2 < f2 && p3();
    }, l2 + 1), t.addEventListener(d2, S2);
  }
  __name(gs, "gs");
  function wr(t, e2) {
    const n2 = window.getComputedStyle(t), s2 = /* @__PURE__ */ __name((H2) => (n2[H2] || "").split(", "), "s"), r3 = s2(`${Lt}Delay`), i = s2(`${Lt}Duration`), o = ms(r3, i), l2 = s2(`${de}Delay`), f2 = s2(`${de}Duration`), d2 = ms(l2, f2);
    let u2 = null, p3 = 0, S2 = 0;
    e2 === Lt ? o > 0 && (u2 = Lt, p3 = o, S2 = i.length) : e2 === de ? d2 > 0 && (u2 = de, p3 = d2, S2 = f2.length) : (p3 = Math.max(o, d2), u2 = p3 > 0 ? o > d2 ? Lt : de : null, S2 = u2 ? u2 === Lt ? i.length : f2.length : 0);
    const F3 = u2 === Lt && /\b(?:transform|all)(?:,|$)/.test(
      s2(`${Lt}Property`).toString()
    );
    return {
      type: u2,
      timeout: p3,
      propCount: S2,
      hasTransform: F3
    };
  }
  __name(wr, "wr");
  function ms(t, e2) {
    for (; t.length < e2.length; )
      t = t.concat(t);
    return Math.max(...e2.map((n2, s2) => _s(n2) + _s(t[s2])));
  }
  __name(ms, "ms");
  function _s(t) {
    return t === "auto" ? 0 : Number(t.slice(0, -1).replace(",", ".")) * 1e3;
  }
  __name(_s, "_s");
  function En(t) {
    return (t ? t.ownerDocument : document).body.offsetHeight;
  }
  __name(En, "En");
  function Mo(t, e2, n2) {
    const s2 = t[ie];
    s2 && (e2 = (e2 ? [e2, ...s2] : [...s2]).join(" ")), e2 == null ? t.removeAttribute("class") : n2 ? t.setAttribute("class", e2) : t.className = e2;
  }
  __name(Mo, "Mo");
  var xs = /* @__PURE__ */ Symbol("_vod");
  var Po = /* @__PURE__ */ Symbol("_vsh");
  var Fo = /* @__PURE__ */ Symbol("");
  var Io = /(?:^|;)\s*display\s*:/;
  function Ro(t, e2, n2) {
    const s2 = t.style, r3 = W2(n2);
    let i = false;
    if (n2 && !r3) {
      if (e2)
        if (W2(e2))
          for (const o of e2.split(";")) {
            const l2 = o.slice(0, o.indexOf(":")).trim();
            n2[l2] == null && pe(s2, l2, "");
          }
        else
          for (const o in e2)
            n2[o] == null && pe(s2, o, "");
      for (const o in n2) {
        o === "display" && (i = true);
        const l2 = n2[o];
        l2 != null ? Lo(
          t,
          o,
          !W2(e2) && e2 ? e2[o] : void 0,
          l2
        ) || pe(s2, o, l2) : pe(s2, o, "");
      }
    } else if (r3) {
      if (e2 !== n2) {
        const o = s2[Fo];
        o && (n2 += ";" + o), s2.cssText = n2, i = Io.test(n2);
      }
    } else e2 && t.removeAttribute("style");
    xs in t && (t[xs] = i ? s2.display : "", t[Po] && (s2.display = "none"));
  }
  __name(Ro, "Ro");
  var bs = /\s*!important$/;
  function pe(t, e2, n2) {
    if (P(n2))
      n2.forEach((s2) => pe(t, e2, s2));
    else if (n2 == null && (n2 = ""), e2.startsWith("--"))
      t.setProperty(e2, n2);
    else {
      const s2 = No(t, e2);
      bs.test(n2) ? t.setProperty(
        Zt(s2),
        n2.replace(bs, ""),
        "important"
      ) : t[s2] = n2;
    }
  }
  __name(pe, "pe");
  var ys = ["Webkit", "Moz", "ms"];
  var hn = {};
  function No(t, e2) {
    const n2 = hn[e2];
    if (n2)
      return n2;
    let s2 = dt(e2);
    if (s2 !== "filter" && s2 in t)
      return hn[e2] = s2;
    s2 = Rs(s2);
    for (let r3 = 0; r3 < ys.length; r3++) {
      const i = ys[r3] + s2;
      if (i in t)
        return hn[e2] = i;
    }
    return e2;
  }
  __name(No, "No");
  function Lo(t, e2, n2, s2) {
    return t.tagName === "TEXTAREA" && (e2 === "width" || e2 === "height") && W2(s2) && n2 === s2;
  }
  __name(Lo, "Lo");
  var vs = "http://www.w3.org/1999/xlink";
  function Cs(t, e2, n2, s2, r3, i = kr(e2)) {
    s2 && e2.startsWith("xlink:") ? n2 == null ? t.removeAttributeNS(vs, e2.slice(6, e2.length)) : t.setAttributeNS(vs, e2, n2) : n2 == null || i && !Ls(n2) ? t.removeAttribute(e2) : t.setAttribute(
      e2,
      i ? "" : Tt(n2) ? String(n2) : n2
    );
  }
  __name(Cs, "Cs");
  function Ss(t, e2, n2, s2, r3) {
    if (e2 === "innerHTML" || e2 === "textContent") {
      n2 != null && (t[e2] = e2 === "innerHTML" ? Sr(n2) : n2);
      return;
    }
    const i = t.tagName;
    if (e2 === "value" && i !== "PROGRESS" && // custom elements may use _value internally
    !i.includes("-")) {
      const l2 = i === "OPTION" ? t.getAttribute("value") || "" : t.value, f2 = n2 == null ? (
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        t.type === "checkbox" ? "on" : ""
      ) : String(n2);
      (l2 !== f2 || !("_value" in t)) && (t.value = f2), n2 == null && t.removeAttribute(e2), t._value = n2;
      return;
    }
    let o = false;
    if (n2 === "" || n2 == null) {
      const l2 = typeof t[e2];
      l2 === "boolean" ? n2 = Ls(n2) : n2 == null && l2 === "string" ? (n2 = "", o = true) : l2 === "number" && (n2 = 0, o = true);
    }
    try {
      t[e2] = n2;
    } catch {
    }
    o && t.removeAttribute(r3 || e2);
  }
  __name(Ss, "Ss");
  function Do(t, e2, n2, s2) {
    t.addEventListener(e2, n2, s2);
  }
  __name(Do, "Do");
  function $o(t, e2, n2, s2) {
    t.removeEventListener(e2, n2, s2);
  }
  __name($o, "$o");
  var Ts = /* @__PURE__ */ Symbol("_vei");
  function Ho(t, e2, n2, s2, r3 = null) {
    const i = t[Ts] || (t[Ts] = {}), o = i[e2];
    if (s2 && o)
      o.value = s2;
    else {
      const [l2, f2] = jo(e2);
      if (s2) {
        const d2 = i[e2] = Ko(
          s2,
          r3
        );
        Do(t, l2, d2, f2);
      } else o && ($o(t, l2, o, f2), i[e2] = void 0);
    }
  }
  __name(Ho, "Ho");
  var ws = /(?:Once|Passive|Capture)$/;
  function jo(t) {
    let e2;
    if (ws.test(t)) {
      e2 = {};
      let s2;
      for (; s2 = t.match(ws); )
        t = t.slice(0, t.length - s2[0].length), e2[s2[0].toLowerCase()] = true;
    }
    return [t[2] === ":" ? t.slice(3) : Zt(t.slice(2)), e2];
  }
  __name(jo, "jo");
  var pn = 0;
  var Vo = /* @__PURE__ */ Promise.resolve();
  var Bo = /* @__PURE__ */ __name(() => pn || (Vo.then(() => pn = 0), pn = Date.now()), "Bo");
  function Ko(t, e2) {
    const n2 = /* @__PURE__ */ __name((s2) => {
      if (!s2._vts)
        s2._vts = Date.now();
      else if (s2._vts <= n2.attached)
        return;
      Ft(
        zo(s2, n2.value),
        e2,
        5,
        [s2]
      );
    }, "n");
    return n2.value = t, n2.attached = Bo(), n2;
  }
  __name(Ko, "Ko");
  function zo(t, e2) {
    if (P(e2)) {
      const n2 = t.stopImmediatePropagation;
      return t.stopImmediatePropagation = () => {
        n2.call(t), t._stopped = true;
      }, e2.map(
        (s2) => (r3) => !r3._stopped && s2 && s2(r3)
      );
    } else
      return e2;
  }
  __name(zo, "zo");
  var Es = /* @__PURE__ */ __name((t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
  t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, "Es");
  var Uo = /* @__PURE__ */ __name((t, e2, n2, s2, r3, i) => {
    const o = r3 === "svg";
    e2 === "class" ? Mo(t, s2, o) : e2 === "style" ? Ro(t, n2, s2) : Ke(e2) ? ze(e2) || Ho(t, e2, n2, s2, i) : (e2[0] === "." ? (e2 = e2.slice(1), true) : e2[0] === "^" ? (e2 = e2.slice(1), false) : Wo(t, e2, s2, o)) ? (Ss(t, e2, s2), !t.tagName.includes("-") && (e2 === "value" || e2 === "checked" || e2 === "selected") && Cs(t, e2, s2, o, i, e2 !== "value")) : (
      /* #11081 force set props for possible async custom element */
      t._isVueCE && // #12408 check if it's declared prop or it's async custom element
      (ko(t, e2) || // @ts-expect-error _def is private
      t._def.__asyncLoader && (/[A-Z]/.test(e2) || !W2(s2))) ? Ss(t, dt(e2), s2, i, e2) : (e2 === "true-value" ? t._trueValue = s2 : e2 === "false-value" && (t._falseValue = s2), Cs(t, e2, s2, o))
    );
  }, "Uo");
  function Wo(t, e2, n2, s2) {
    if (s2)
      return !!(e2 === "innerHTML" || e2 === "textContent" || e2 in t && Es(e2) && K(n2));
    if (e2 === "spellcheck" || e2 === "draggable" || e2 === "translate" || e2 === "autocorrect" || e2 === "sandbox" && t.tagName === "IFRAME" || e2 === "form" || e2 === "list" && t.tagName === "INPUT" || e2 === "type" && t.tagName === "TEXTAREA")
      return false;
    if (e2 === "width" || e2 === "height") {
      const r3 = t.tagName;
      if (r3 === "IMG" || r3 === "VIDEO" || r3 === "CANVAS" || r3 === "SOURCE")
        return false;
    }
    return Es(e2) && W2(n2) ? false : e2 in t;
  }
  __name(Wo, "Wo");
  function ko(t, e2) {
    const n2 = (
      // @ts-expect-error _def is private
      t._def.props
    );
    if (!n2)
      return false;
    const s2 = dt(e2);
    return Array.isArray(n2) ? n2.some((r3) => dt(r3) === s2) : Object.keys(n2).some((r3) => dt(r3) === s2);
  }
  __name(ko, "ko");
  var Er = /* @__PURE__ */ new WeakMap();
  var Ar = /* @__PURE__ */ new WeakMap();
  var Be = /* @__PURE__ */ Symbol("_moveCb");
  var As = /* @__PURE__ */ Symbol("_enterCb");
  var qo = /* @__PURE__ */ __name((t) => (delete t.props.mode, t), "qo");
  var Yo = /* @__PURE__ */ qo({
    name: "TransitionGroup",
    props: /* @__PURE__ */ lt({}, wo, {
      tag: String,
      moveClass: String
    }),
    setup(t, { slots: e2 }) {
      const n2 = go(), s2 = Ei();
      let r3, i;
      return Ni(() => {
        if (!r3.length)
          return;
        const o = t.moveClass || `${t.name || "v"}-move`;
        if (!Qo(
          r3[0].el,
          n2.vnode.el,
          o
        )) {
          r3 = [];
          return;
        }
        r3.forEach(Jo), r3.forEach(Xo);
        const l2 = r3.filter(Zo);
        En(n2.vnode.el), l2.forEach((f2) => {
          const d2 = f2.el, u2 = d2.style;
          bt(d2, o), u2.transform = u2.webkitTransform = u2.transitionDuration = "";
          const p3 = d2[Be] = (S2) => {
            S2 && S2.target !== d2 || (!S2 || S2.propertyName.endsWith("transform")) && (d2.removeEventListener("transitionend", p3), d2[Be] = null, $t(d2, o));
          };
          d2.addEventListener("transitionend", p3);
        }), r3 = [];
      }), () => {
        const o = /* @__PURE__ */ R2(t), l2 = Eo(o);
        let f2 = o.tag || ut;
        if (r3 = [], i)
          for (let d2 = 0; d2 < i.length; d2++) {
            const u2 = i[d2];
            u2.el && u2.el instanceof Element && (r3.push(u2), Ee(
              u2,
              vn(
                u2,
                l2,
                s2,
                n2
              )
            ), Er.set(u2, Or(u2.el)));
          }
        i = e2.default ? rr(e2.default()) : [];
        for (let d2 = 0; d2 < i.length; d2++) {
          const u2 = i[d2];
          u2.key != null && Ee(
            u2,
            vn(u2, l2, s2, n2)
          );
        }
        return Mt(f2, null, i);
      };
    }
  });
  var Go = Yo;
  function Jo(t) {
    const e2 = t.el;
    e2[Be] && e2[Be](), e2[As] && e2[As]();
  }
  __name(Jo, "Jo");
  function Xo(t) {
    Ar.set(t, Or(t.el));
  }
  __name(Xo, "Xo");
  function Zo(t) {
    const e2 = Er.get(t), n2 = Ar.get(t), s2 = e2.left - n2.left, r3 = e2.top - n2.top;
    if (s2 || r3) {
      const i = t.el, o = i.style, l2 = i.getBoundingClientRect();
      let f2 = 1, d2 = 1;
      return i.offsetWidth && (f2 = l2.width / i.offsetWidth), i.offsetHeight && (d2 = l2.height / i.offsetHeight), (!Number.isFinite(f2) || f2 === 0) && (f2 = 1), (!Number.isFinite(d2) || d2 === 0) && (d2 = 1), Math.abs(f2 - 1) < 0.01 && (f2 = 1), Math.abs(d2 - 1) < 0.01 && (d2 = 1), o.transform = o.webkitTransform = `translate(${s2 / f2}px,${r3 / d2}px)`, o.transitionDuration = "0s", t;
    }
  }
  __name(Zo, "Zo");
  function Or(t) {
    const e2 = t.getBoundingClientRect();
    return {
      left: e2.left,
      top: e2.top
    };
  }
  __name(Or, "Or");
  function Qo(t, e2, n2) {
    const s2 = t.cloneNode(), r3 = t[ie];
    r3 && r3.forEach((l2) => {
      l2.split(/\s+/).forEach((f2) => f2 && s2.classList.remove(f2));
    }), n2.split(/\s+/).forEach((l2) => l2 && s2.classList.add(l2)), s2.style.display = "none";
    const i = e2.nodeType === 1 ? e2 : e2.parentNode;
    i.appendChild(s2);
    const { hasTransform: o } = wr(s2);
    return i.removeChild(s2), o;
  }
  __name(Qo, "Qo");
  var tl = /* @__PURE__ */ lt({ patchProp: Uo }, To);
  var Os;
  function el() {
    return Os || (Os = to(tl));
  }
  __name(el, "el");
  var nl = /* @__PURE__ */ __name(((...t) => {
    const e2 = el().createApp(...t), { mount: n2 } = e2;
    return e2.mount = (s2) => {
      const r3 = rl(s2);
      if (!r3) return;
      const i = e2._component;
      !K(i) && !i.render && !i.template && (i.template = r3.innerHTML), r3.nodeType === 1 && (r3.textContent = "");
      const o = n2(r3, false, sl(r3));
      return r3 instanceof Element && (r3.removeAttribute("v-cloak"), r3.setAttribute("data-v-app", "")), o;
    }, e2;
  }), "nl");
  function sl(t) {
    if (t instanceof SVGElement)
      return "svg";
    if (typeof MathMLElement == "function" && t instanceof MathMLElement)
      return "mathml";
  }
  __name(sl, "sl");
  function rl(t) {
    return W2(t) ? document.querySelector(t) : t;
  }
  __name(rl, "rl");
  var Wt = /* @__PURE__ */ Dn({
    items: [],
    position: "top-center"
  });
  var il = ["data-position"];
  var ol = /* @__PURE__ */ Mi({
    __name: "ToastContainer",
    setup(t) {
      return (e2, n2) => (an(), un("div", {
        class: "xlxz-toast-container",
        "data-position": yn(Wt).position
      }, [
        Mt(Go, { name: "xlxz-toast-anim" }, {
          default: sr(() => [
            (an(true), un(ut, null, $i(yn(Wt).items, (s2) => (an(), un("div", {
              key: s2.id,
              class: Se(["xlxz-toast", { "xlxz-toast-exit": s2.exiting }])
            }, [
              je("span", {
                class: Se(["xlxz-toast-icon", `xlxz-toast-icon--${s2.type}`])
              }, null, 2),
              je("span", null, $s(s2.message), 1)
            ], 2))), 128))
          ]),
          _: 1
        })
      ], 8, il));
    }
  });
  var ll = `/* @xlxz/styles \u2014 \u8BBE\u8BA1\u53D8\u91CF */
:host, .xlxz-root {
  --xs-radius: 4px;
  --sm-radius: 6px;
  --md-radius: 8px;
  --lg-radius: 12px;

  --xs-space: 4px;
  --sm-space: 8px;
  --md-space: 16px;
  --lg-space: 24px;

  --font-xs: 11px;
  --font-sm: 12px;
  --font-md: 14px;
  --font-lg: 16px;

  --color-primary: #fb7299;
  --color-primary-hover: #f57fb9;
  --color-primary-light: rgba(251, 114, 153, 0.1);
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-error: #f5222d;
  --color-info: #1890ff;

  --color-bg: #ffffff;
  --color-bg-elevated: #ffffff;
  --color-bg-muted: #f5f5f5;
  --color-border: #e7e7e7;
  --color-text: #222222;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-shadow: rgba(0, 0, 0, 0.08);
  --color-shadow-lg: rgba(0, 0, 0, 0.12);

  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
`;
  var cl = `/* Toast \u6D88\u606F\u6D6E\u7A97 */
.xlxz-toast-container {
  position: fixed;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

/* \u4F4D\u7F6E\u53D8\u4F53 */
.xlxz-toast-container[data-position="top-center"] {
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.xlxz-toast-container[data-position="top-left"] {
  top: 16px;
  left: 16px;
  align-items: flex-start;
}
.xlxz-toast-container[data-position="top-right"] {
  top: 16px;
  right: 16px;
  align-items: flex-end;
}
.xlxz-toast-container[data-position="bottom-center"] {
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  flex-direction: column-reverse;
}
.xlxz-toast-container[data-position="bottom-left"] {
  bottom: 16px;
  left: 16px;
  align-items: flex-start;
  flex-direction: column-reverse;
}
.xlxz-toast-container[data-position="bottom-right"] {
  bottom: 16px;
  right: 16px;
  align-items: flex-end;
  flex-direction: column-reverse;
}

.xlxz-toast {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--md-radius, 8px);
  background: var(--color-bg-elevated, #fff);
  border: 1px solid var(--color-border, #e7e7e7);
  box-shadow: 0 4px 16px var(--color-shadow-lg, rgba(0, 0, 0, 0.12));
  font-size: var(--font-md, 14px);
  color: var(--color-text, #222);
  pointer-events: auto;
  max-width: 360px;
  white-space: nowrap;
}

.xlxz-toast-icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.xlxz-toast-icon--success { background: var(--color-success, #52c41a); }
.xlxz-toast-icon--error { background: var(--color-error, #f5222d); }
.xlxz-toast-icon--warning { background: var(--color-warning, #faad14); }
.xlxz-toast-icon--info { background: var(--color-info, #1890ff); }

/* Toast \u8FC7\u6E21\u52A8\u753B (Vue TransitionGroup) */
.xlxz-toast-anim-enter-active {
  animation: xlxz-toast-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.xlxz-toast-anim-leave-active {
  position: absolute;
  animation: xlxz-toast-out 0.25s ease forwards;
}
.xlxz-toast-anim-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* \u8FDB\u5165\uFF1A\u4ECE\u4E0A\u65B9\u6ED1\u5165 + \u7F29\u653E */
@keyframes xlxz-toast-in {
  from { opacity: 0; transform: translateY(-12px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* \u9000\u51FA\uFF1A\u5411\u4E0A\u6DE1\u51FA + \u7F29\u5C0F */
@keyframes xlxz-toast-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(-8px) scale(0.9); }
}
`;
  var he = null;
  var fl = 0;
  var Ms = false;
  function al() {
    if (he) return;
    if (!Ms) {
      const e2 = document.createElement("style");
      e2.textContent = ll + `
` + cl, document.head.appendChild(e2), Ms = true;
    }
    he = document.createElement("div"), he.className = "xlxz-root", document.body.appendChild(he), nl(ol).mount(he);
  }
  __name(al, "al");
  function hl(t, e2 = {}) {
    al();
    const { duration: n2 = 3e3, type: s2 = "info" } = e2, r3 = fl++;
    Wt.items.push({ id: r3, message: t, type: s2, exiting: false }), setTimeout(() => {
      const i = Wt.items.find((o) => o.id === r3);
      i && (i.exiting = true), setTimeout(() => {
        const o = Wt.items.findIndex((l2) => l2.id === r3);
        o !== -1 && Wt.items.splice(o, 1);
      }, 300);
    }, n2);
  }
  __name(hl, "hl");

  // packages/components/dist/floating-panel.js
  // @__NO_SIDE_EFFECTS__
  function In2(e2) {
    const t = /* @__PURE__ */ Object.create(null);
    for (const n2 of e2.split(",")) t[n2] = 1;
    return (n2) => n2 in t;
  }
  __name(In2, "In");
  var Z = {};
  var ut2 = [];
  var Ln2 = /* @__PURE__ */ __name(() => {
  }, "Ln");
  var Ks2 = /* @__PURE__ */ __name(() => false, "Ks");
  var Gt2 = /* @__PURE__ */ __name((e2) => e2.charCodeAt(0) === 111 && e2.charCodeAt(1) === 110 && // uppercase letter
  (e2.charCodeAt(2) > 122 || e2.charCodeAt(2) < 97), "Gt");
  var Jt2 = /* @__PURE__ */ __name((e2) => e2.startsWith("onUpdate:"), "Jt");
  var we2 = Object.assign;
  var qr2 = /* @__PURE__ */ __name((e2, t) => {
    const n2 = e2.indexOf(t);
    n2 > -1 && e2.splice(n2, 1);
  }, "qr");
  var Gr2 = Object.prototype.hasOwnProperty;
  var K2 = /* @__PURE__ */ __name((e2, t) => Gr2.call(e2, t), "K");
  var F2 = Array.isArray;
  var bt2 = /* @__PURE__ */ __name((e2) => Dt2(e2) === "[object Map]", "bt");
  var Jr2 = /* @__PURE__ */ __name((e2) => Dt2(e2) === "[object Set]", "Jr");
  var rs2 = /* @__PURE__ */ __name((e2) => Dt2(e2) === "[object Date]", "rs");
  var k3 = /* @__PURE__ */ __name((e2) => typeof e2 == "function", "k");
  var ne2 = /* @__PURE__ */ __name((e2) => typeof e2 == "string", "ne");
  var $e2 = /* @__PURE__ */ __name((e2) => typeof e2 == "symbol", "$e");
  var Y = /* @__PURE__ */ __name((e2) => e2 !== null && typeof e2 == "object", "Y");
  var Ws2 = /* @__PURE__ */ __name((e2) => (Y(e2) || k3(e2)) && k3(e2.then) && k3(e2.catch), "Ws");
  var Us2 = Object.prototype.toString;
  var Dt2 = /* @__PURE__ */ __name((e2) => Us2.call(e2), "Dt");
  var Zr2 = /* @__PURE__ */ __name((e2) => Dt2(e2).slice(8, -1), "Zr");
  var Qr2 = /* @__PURE__ */ __name((e2) => Dt2(e2) === "[object Object]", "Qr");
  var On2 = /* @__PURE__ */ __name((e2) => ne2(e2) && e2 !== "NaN" && e2[0] !== "-" && "" + parseInt(e2, 10) === e2, "On");
  var yt2 = /* @__PURE__ */ In2(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  var Zt2 = /* @__PURE__ */ __name((e2) => {
    const t = /* @__PURE__ */ Object.create(null);
    return ((n2) => t[n2] || (t[n2] = e2(n2)));
  }, "Zt");
  var ei2 = /-\w/g;
  var Se2 = Zt2(
    (e2) => e2.replace(ei2, (t) => t.slice(1).toUpperCase())
  );
  var ti2 = /\B([A-Z])/g;
  var ct = Zt2(
    (e2) => e2.replace(ti2, "-$1").toLowerCase()
  );
  var ks2 = Zt2((e2) => e2.charAt(0).toUpperCase() + e2.slice(1));
  var rn2 = Zt2(
    (e2) => e2 ? `on${ks2(e2)}` : ""
  );
  var Ye2 = /* @__PURE__ */ __name((e2, t) => !Object.is(e2, t), "Ye");
  var on2 = /* @__PURE__ */ __name((e2, ...t) => {
    for (let n2 = 0; n2 < e2.length; n2++)
      e2[n2](...t);
  }, "on");
  var Ys2 = /* @__PURE__ */ __name((e2, t, n2, s2 = false) => {
    Object.defineProperty(e2, t, {
      configurable: true,
      enumerable: false,
      writable: s2,
      value: n2
    });
  }, "Ys");
  var ni2 = /* @__PURE__ */ __name((e2) => {
    const t = parseFloat(e2);
    return isNaN(t) ? e2 : t;
  }, "ni");
  var si2 = /* @__PURE__ */ __name((e2) => {
    const t = ne2(e2) ? Number(e2) : NaN;
    return isNaN(t) ? e2 : t;
  }, "si");
  var is2;
  var Qt2 = /* @__PURE__ */ __name(() => is2 || (is2 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), "Qt");
  function Rt(e2) {
    if (F2(e2)) {
      const t = {};
      for (let n2 = 0; n2 < e2.length; n2++) {
        const s2 = e2[n2], r3 = ne2(s2) ? li2(s2) : Rt(s2);
        if (r3)
          for (const i in r3)
            t[i] = r3[i];
      }
      return t;
    } else if (ne2(e2) || Y(e2))
      return e2;
  }
  __name(Rt, "Rt");
  var ri2 = /;(?![^(]*\))/g;
  var ii2 = /:([^]+)/;
  var oi2 = /\/\*[^]*?\*\//g;
  function li2(e2) {
    const t = {};
    return e2.replace(oi2, "").split(ri2).forEach((n2) => {
      if (n2) {
        const s2 = n2.split(ii2);
        s2.length > 1 && (t[s2[0].trim()] = s2[1].trim());
      }
    }), t;
  }
  __name(li2, "li");
  function st(e2) {
    let t = "";
    if (ne2(e2))
      t = e2;
    else if (F2(e2))
      for (let n2 = 0; n2 < e2.length; n2++) {
        const s2 = st(e2[n2]);
        s2 && (t += s2 + " ");
      }
    else if (Y(e2))
      for (const n2 in e2)
        e2[n2] && (t += n2 + " ");
    return t.trim();
  }
  __name(st, "st");
  var ci2 = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var fi2 = /* @__PURE__ */ In2(ci2);
  function Xs2(e2) {
    return !!e2 || e2 === "";
  }
  __name(Xs2, "Xs");
  function ai2(e2, t) {
    if (e2.length !== t.length) return false;
    let n2 = true;
    for (let s2 = 0; n2 && s2 < e2.length; s2++)
      n2 = Fn2(e2[s2], t[s2]);
    return n2;
  }
  __name(ai2, "ai");
  function Fn2(e2, t) {
    if (e2 === t) return true;
    let n2 = rs2(e2), s2 = rs2(t);
    if (n2 || s2)
      return n2 && s2 ? e2.getTime() === t.getTime() : false;
    if (n2 = $e2(e2), s2 = $e2(t), n2 || s2)
      return e2 === t;
    if (n2 = F2(e2), s2 = F2(t), n2 || s2)
      return n2 && s2 ? ai2(e2, t) : false;
    if (n2 = Y(e2), s2 = Y(t), n2 || s2) {
      if (!n2 || !s2)
        return false;
      const r3 = Object.keys(e2).length, i = Object.keys(t).length;
      if (r3 !== i)
        return false;
      for (const o in e2) {
        const l2 = e2.hasOwnProperty(o), f2 = t.hasOwnProperty(o);
        if (l2 && !f2 || !l2 && f2 || !Fn2(e2[o], t[o]))
          return false;
      }
    }
    return String(e2) === String(t);
  }
  __name(Fn2, "Fn");
  var qs2 = /* @__PURE__ */ __name((e2) => !!(e2 && e2.__v_isRef === true), "qs");
  var Gs2 = /* @__PURE__ */ __name((e2) => ne2(e2) ? e2 : e2 == null ? "" : F2(e2) || Y(e2) && (e2.toString === Us2 || !k3(e2.toString)) ? qs2(e2) ? Gs2(e2.value) : JSON.stringify(e2, Js2, 2) : String(e2), "Gs");
  var Js2 = /* @__PURE__ */ __name((e2, t) => qs2(t) ? Js2(e2, t.value) : bt2(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce(
      (n2, [s2, r3], i) => (n2[ln2(s2, i) + " =>"] = r3, n2),
      {}
    )
  } : Jr2(t) ? {
    [`Set(${t.size})`]: [...t.values()].map((n2) => ln2(n2))
  } : $e2(t) ? ln2(t) : Y(t) && !F2(t) && !Qr2(t) ? String(t) : t, "Js");
  var ln2 = /* @__PURE__ */ __name((e2, t = "") => {
    var n2;
    return (
      // Symbol.description in es2019+ so we need to cast here to pass
      // the lib: es2016 check
      $e2(e2) ? `Symbol(${(n2 = e2.description) != null ? n2 : t})` : e2
    );
  }, "ln");
  var ce;
  var _ui = class _ui {
    // TODO isolatedDeclarations "__v_skip"
    constructor(t = false) {
      this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this._warnOnRun = true, this.__v_skip = true, !t && ce && (ce.active ? (this.parent = ce, this.index = (ce.scopes || (ce.scopes = [])).push(
        this
      ) - 1) : (this._active = false, this._warnOnRun = false));
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let t, n2;
        if (this.scopes)
          for (t = 0, n2 = this.scopes.length; t < n2; t++)
            this.scopes[t].pause();
        for (t = 0, n2 = this.effects.length; t < n2; t++)
          this.effects[t].pause();
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = false;
        let t, n2;
        if (this.scopes)
          for (t = 0, n2 = this.scopes.length; t < n2; t++)
            this.scopes[t].resume();
        for (t = 0, n2 = this.effects.length; t < n2; t++)
          this.effects[t].resume();
      }
    }
    run(t) {
      if (this._active) {
        const n2 = ce;
        try {
          return ce = this, t();
        } finally {
          ce = n2;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      ++this._on === 1 && (this.prevScope = ce, ce = this);
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      if (this._on > 0 && --this._on === 0) {
        if (ce === this)
          ce = this.prevScope;
        else {
          let t = ce;
          for (; t; ) {
            if (t.prevScope === this) {
              t.prevScope = this.prevScope;
              break;
            }
            t = t.prevScope;
          }
        }
        this.prevScope = void 0;
      }
    }
    stop(t) {
      if (this._active) {
        this._active = false;
        let n2, s2;
        for (n2 = 0, s2 = this.effects.length; n2 < s2; n2++)
          this.effects[n2].stop();
        for (this.effects.length = 0, n2 = 0, s2 = this.cleanups.length; n2 < s2; n2++)
          this.cleanups[n2]();
        if (this.cleanups.length = 0, this.scopes) {
          for (n2 = 0, s2 = this.scopes.length; n2 < s2; n2++)
            this.scopes[n2].stop(true);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !t) {
          const r3 = this.parent.scopes.pop();
          r3 && r3 !== this && (this.parent.scopes[this.index] = r3, r3.index = this.index);
        }
        this.parent = void 0;
      }
    }
  };
  __name(_ui, "ui");
  var ui2 = _ui;
  var U2;
  var cn2 = /* @__PURE__ */ new WeakSet();
  var _di = class _di {
    constructor(t) {
      this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ce && (ce.active ? ce.effects.push(this) : this.flags &= -2);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, cn2.has(this) && (cn2.delete(this), this.trigger()));
    }
    /**
     * @internal
     */
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Qs2(this);
    }
    run() {
      if (!(this.flags & 1))
        return this.fn();
      this.flags |= 2, os2(this), er2(this);
      const t = U2, n2 = Te2;
      U2 = this, Te2 = true;
      try {
        return this.fn();
      } finally {
        tr2(this), U2 = t, Te2 = n2, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let t = this.deps; t; t = t.nextDep)
          Dn2(t);
        this.deps = this.depsTail = void 0, os2(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? cn2.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    /**
     * @internal
     */
    runIfDirty() {
      xn2(this) && this.run();
    }
    get dirty() {
      return xn2(this);
    }
  };
  __name(_di, "di");
  var di2 = _di;
  var Zs2 = 0;
  var wt2;
  var St2;
  function Qs2(e2, t = false) {
    if (e2.flags |= 8, t) {
      e2.next = St2, St2 = e2;
      return;
    }
    e2.next = wt2, wt2 = e2;
  }
  __name(Qs2, "Qs");
  function $n2() {
    Zs2++;
  }
  __name($n2, "$n");
  function Nn2() {
    if (--Zs2 > 0)
      return;
    if (St2) {
      let t = St2;
      for (St2 = void 0; t; ) {
        const n2 = t.next;
        t.next = void 0, t.flags &= -9, t = n2;
      }
    }
    let e2;
    for (; wt2; ) {
      let t = wt2;
      for (wt2 = void 0; t; ) {
        const n2 = t.next;
        if (t.next = void 0, t.flags &= -9, t.flags & 1)
          try {
            t.trigger();
          } catch (s2) {
            e2 || (e2 = s2);
          }
        t = n2;
      }
    }
    if (e2) throw e2;
  }
  __name(Nn2, "Nn");
  function er2(e2) {
    for (let t = e2.deps; t; t = t.nextDep)
      t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
  }
  __name(er2, "er");
  function tr2(e2) {
    let t, n2 = e2.depsTail, s2 = n2;
    for (; s2; ) {
      const r3 = s2.prevDep;
      s2.version === -1 ? (s2 === n2 && (n2 = r3), Dn2(s2), hi2(s2)) : t = s2, s2.dep.activeLink = s2.prevActiveLink, s2.prevActiveLink = void 0, s2 = r3;
    }
    e2.deps = t, e2.depsTail = n2;
  }
  __name(tr2, "tr");
  function xn2(e2) {
    for (let t = e2.deps; t; t = t.nextDep)
      if (t.dep.version !== t.version || t.dep.computed && (nr2(t.dep.computed) || t.dep.version !== t.version))
        return true;
    return !!e2._dirty;
  }
  __name(xn2, "xn");
  function nr2(e2) {
    if (e2.flags & 4 && !(e2.flags & 16) || (e2.flags &= -17, e2.globalVersion === Pt2) || (e2.globalVersion = Pt2, !e2.isSSR && e2.flags & 128 && (!e2.deps && !e2._dirty || !xn2(e2))))
      return;
    e2.flags |= 2;
    const t = e2.dep, n2 = U2, s2 = Te2;
    U2 = e2, Te2 = true;
    try {
      er2(e2);
      const r3 = e2.fn(e2._value);
      (t.version === 0 || Ye2(r3, e2._value)) && (e2.flags |= 128, e2._value = r3, t.version++);
    } catch (r3) {
      throw t.version++, r3;
    } finally {
      U2 = n2, Te2 = s2, tr2(e2), e2.flags &= -3;
    }
  }
  __name(nr2, "nr");
  function Dn2(e2, t = false) {
    const { dep: n2, prevSub: s2, nextSub: r3 } = e2;
    if (s2 && (s2.nextSub = r3, e2.prevSub = void 0), r3 && (r3.prevSub = s2, e2.nextSub = void 0), n2.subs === e2 && (n2.subs = s2, !s2 && n2.computed)) {
      n2.computed.flags &= -5;
      for (let i = n2.computed.deps; i; i = i.nextDep)
        Dn2(i, true);
    }
    !t && !--n2.sc && n2.map && n2.map.delete(n2.key);
  }
  __name(Dn2, "Dn");
  function hi2(e2) {
    const { prevDep: t, nextDep: n2 } = e2;
    t && (t.nextDep = n2, e2.prevDep = void 0), n2 && (n2.prevDep = t, e2.nextDep = void 0);
  }
  __name(hi2, "hi");
  var Te2 = true;
  var sr2 = [];
  function it2() {
    sr2.push(Te2), Te2 = false;
  }
  __name(it2, "it");
  function ot2() {
    const e2 = sr2.pop();
    Te2 = e2 === void 0 ? true : e2;
  }
  __name(ot2, "ot");
  function os2(e2) {
    const { cleanup: t } = e2;
    if (e2.cleanup = void 0, t) {
      const n2 = U2;
      U2 = void 0;
      try {
        t();
      } finally {
        U2 = n2;
      }
    }
  }
  __name(os2, "os");
  var Pt2 = 0;
  var _pi = class _pi {
    constructor(t, n2) {
      this.sub = t, this.dep = n2, this.version = n2.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  };
  __name(_pi, "pi");
  var pi2 = _pi;
  var _Hn = class _Hn {
    // TODO isolatedDeclarations "__v_skip"
    constructor(t) {
      this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
    }
    track(t) {
      if (!U2 || !Te2 || U2 === this.computed)
        return;
      let n2 = this.activeLink;
      if (n2 === void 0 || n2.sub !== U2)
        n2 = this.activeLink = new pi2(U2, this), U2.deps ? (n2.prevDep = U2.depsTail, U2.depsTail.nextDep = n2, U2.depsTail = n2) : U2.deps = U2.depsTail = n2, rr2(n2);
      else if (n2.version === -1 && (n2.version = this.version, n2.nextDep)) {
        const s2 = n2.nextDep;
        s2.prevDep = n2.prevDep, n2.prevDep && (n2.prevDep.nextDep = s2), n2.prevDep = U2.depsTail, n2.nextDep = void 0, U2.depsTail.nextDep = n2, U2.depsTail = n2, U2.deps === n2 && (U2.deps = s2);
      }
      return n2;
    }
    trigger(t) {
      this.version++, Pt2++, this.notify(t);
    }
    notify(t) {
      $n2();
      try {
        for (let n2 = this.subs; n2; n2 = n2.prevSub)
          n2.sub.notify() && n2.sub.dep.notify();
      } finally {
        Nn2();
      }
    }
  };
  __name(_Hn, "Hn");
  var Hn2 = _Hn;
  function rr2(e2) {
    if (e2.dep.sc++, e2.sub.flags & 4) {
      const t = e2.dep.computed;
      if (t && !e2.dep.subs) {
        t.flags |= 20;
        for (let s2 = t.deps; s2; s2 = s2.nextDep)
          rr2(s2);
      }
      const n2 = e2.dep.subs;
      n2 !== e2 && (e2.prevSub = n2, n2 && (n2.nextSub = e2)), e2.dep.subs = e2;
    }
  }
  __name(rr2, "rr");
  var bn2 = /* @__PURE__ */ new WeakMap();
  var rt = /* @__PURE__ */ Symbol(
    ""
  );
  var yn2 = /* @__PURE__ */ Symbol(
    ""
  );
  var It = /* @__PURE__ */ Symbol(
    ""
  );
  function fe(e2, t, n2) {
    if (Te2 && U2) {
      let s2 = bn2.get(e2);
      s2 || bn2.set(e2, s2 = /* @__PURE__ */ new Map());
      let r3 = s2.get(n2);
      r3 || (s2.set(n2, r3 = new Hn2()), r3.map = s2, r3.key = n2), r3.track();
    }
  }
  __name(fe, "fe");
  function Ve2(e2, t, n2, s2, r3, i) {
    const o = bn2.get(e2);
    if (!o) {
      Pt2++;
      return;
    }
    const l2 = /* @__PURE__ */ __name((f2) => {
      f2 && f2.trigger();
    }, "l");
    if ($n2(), t === "clear")
      o.forEach(l2);
    else {
      const f2 = F2(e2), d2 = f2 && On2(n2);
      if (f2 && n2 === "length") {
        const u2 = Number(s2);
        o.forEach((p3, b4) => {
          (b4 === "length" || b4 === It || !$e2(b4) && b4 >= u2) && l2(p3);
        });
      } else
        switch ((n2 !== void 0 || o.has(void 0)) && l2(o.get(n2)), d2 && l2(o.get(It)), t) {
          case "add":
            f2 ? d2 && l2(o.get("length")) : (l2(o.get(rt)), bt2(e2) && l2(o.get(yn2)));
            break;
          case "delete":
            f2 || (l2(o.get(rt)), bt2(e2) && l2(o.get(yn2)));
            break;
          case "set":
            bt2(e2) && l2(o.get(rt));
            break;
        }
    }
    Nn2();
  }
  __name(Ve2, "Ve");
  function ft(e2) {
    const t = /* @__PURE__ */ H(e2);
    return t === e2 ? t : (fe(t, "iterate", It), /* @__PURE__ */ qe2(e2) ? t : t.map(Ke2));
  }
  __name(ft, "ft");
  function zn2(e2) {
    return fe(e2 = /* @__PURE__ */ H(e2), "iterate", It), e2;
  }
  __name(zn2, "zn");
  function Ie2(e2, t) {
    return /* @__PURE__ */ Xe(e2) ? Lt2(/* @__PURE__ */ Kn2(e2) ? Ke2(t) : t) : Ke2(t);
  }
  __name(Ie2, "Ie");
  var gi2 = {
    __proto__: null,
    [Symbol.iterator]() {
      return fn2(this, Symbol.iterator, (e2) => Ie2(this, e2));
    },
    concat(...e2) {
      return ft(this).concat(
        ...e2.map((t) => F2(t) ? ft(t) : t)
      );
    },
    entries() {
      return fn2(this, "entries", (e2) => (e2[1] = Ie2(this, e2[1]), e2));
    },
    every(e2, t) {
      return Ne2(this, "every", e2, t, void 0, arguments);
    },
    filter(e2, t) {
      return Ne2(
        this,
        "filter",
        e2,
        t,
        (n2) => n2.map((s2) => Ie2(this, s2)),
        arguments
      );
    },
    find(e2, t) {
      return Ne2(
        this,
        "find",
        e2,
        t,
        (n2) => Ie2(this, n2),
        arguments
      );
    },
    findIndex(e2, t) {
      return Ne2(this, "findIndex", e2, t, void 0, arguments);
    },
    findLast(e2, t) {
      return Ne2(
        this,
        "findLast",
        e2,
        t,
        (n2) => Ie2(this, n2),
        arguments
      );
    },
    findLastIndex(e2, t) {
      return Ne2(this, "findLastIndex", e2, t, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(e2, t) {
      return Ne2(this, "forEach", e2, t, void 0, arguments);
    },
    includes(...e2) {
      return an2(this, "includes", e2);
    },
    indexOf(...e2) {
      return an2(this, "indexOf", e2);
    },
    join(e2) {
      return ft(this).join(e2);
    },
    // keys() iterator only reads `length`, no optimization required
    lastIndexOf(...e2) {
      return an2(this, "lastIndexOf", e2);
    },
    map(e2, t) {
      return Ne2(this, "map", e2, t, void 0, arguments);
    },
    pop() {
      return mt(this, "pop");
    },
    push(...e2) {
      return mt(this, "push", e2);
    },
    reduce(e2, ...t) {
      return ls2(this, "reduce", e2, t);
    },
    reduceRight(e2, ...t) {
      return ls2(this, "reduceRight", e2, t);
    },
    shift() {
      return mt(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(e2, t) {
      return Ne2(this, "some", e2, t, void 0, arguments);
    },
    splice(...e2) {
      return mt(this, "splice", e2);
    },
    toReversed() {
      return ft(this).toReversed();
    },
    toSorted(e2) {
      return ft(this).toSorted(e2);
    },
    toSpliced(...e2) {
      return ft(this).toSpliced(...e2);
    },
    unshift(...e2) {
      return mt(this, "unshift", e2);
    },
    values() {
      return fn2(this, "values", (e2) => Ie2(this, e2));
    }
  };
  function fn2(e2, t, n2) {
    const s2 = zn2(e2), r3 = s2[t]();
    return s2 !== e2 && !/* @__PURE__ */ qe2(e2) && (r3._next = r3.next, r3.next = () => {
      const i = r3._next();
      return i.done || (i.value = n2(i.value)), i;
    }), r3;
  }
  __name(fn2, "fn");
  var mi2 = Array.prototype;
  function Ne2(e2, t, n2, s2, r3, i) {
    const o = zn2(e2), l2 = o !== e2 && !/* @__PURE__ */ qe2(e2), f2 = o[t];
    if (f2 !== mi2[t]) {
      const p3 = f2.apply(e2, i);
      return l2 ? Ke2(p3) : p3;
    }
    let d2 = n2;
    o !== e2 && (l2 ? d2 = /* @__PURE__ */ __name(function(p3, b4) {
      return n2.call(this, Ie2(e2, p3), b4, e2);
    }, "d") : n2.length > 2 && (d2 = /* @__PURE__ */ __name(function(p3, b4) {
      return n2.call(this, p3, b4, e2);
    }, "d")));
    const u2 = f2.call(o, d2, s2);
    return l2 && r3 ? r3(u2) : u2;
  }
  __name(Ne2, "Ne");
  function ls2(e2, t, n2, s2) {
    const r3 = zn2(e2), i = r3 !== e2 && !/* @__PURE__ */ qe2(e2);
    let o = n2, l2 = false;
    r3 !== e2 && (i ? (l2 = s2.length === 0, o = /* @__PURE__ */ __name(function(d2, u2, p3) {
      return l2 && (l2 = false, d2 = Ie2(e2, d2)), n2.call(this, d2, Ie2(e2, u2), p3, e2);
    }, "o")) : n2.length > 3 && (o = /* @__PURE__ */ __name(function(d2, u2, p3) {
      return n2.call(this, d2, u2, p3, e2);
    }, "o")));
    const f2 = r3[t](o, ...s2);
    return l2 ? Ie2(e2, f2) : f2;
  }
  __name(ls2, "ls");
  function an2(e2, t, n2) {
    const s2 = /* @__PURE__ */ H(e2);
    fe(s2, "iterate", It);
    const r3 = s2[t](...n2);
    return (r3 === -1 || r3 === false) && /* @__PURE__ */ Wn(n2[0]) ? (n2[0] = /* @__PURE__ */ H(n2[0]), s2[t](...n2)) : r3;
  }
  __name(an2, "an");
  function mt(e2, t, n2 = []) {
    it2(), $n2();
    const s2 = (/* @__PURE__ */ H(e2))[t].apply(e2, n2);
    return Nn2(), ot2(), s2;
  }
  __name(mt, "mt");
  var _i2 = /* @__PURE__ */ In2("__proto__,__v_isRef,__isVue");
  var ir2 = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e2) => e2 !== "arguments" && e2 !== "caller").map((e2) => Symbol[e2]).filter($e2)
  );
  function vi2(e2) {
    $e2(e2) || (e2 = String(e2));
    const t = /* @__PURE__ */ H(this);
    return fe(t, "has", e2), t.hasOwnProperty(e2);
  }
  __name(vi2, "vi");
  var _or = class _or {
    constructor(t = false, n2 = false) {
      this._isReadonly = t, this._isShallow = n2;
    }
    get(t, n2, s2) {
      if (n2 === "__v_skip") return t.__v_skip;
      const r3 = this._isReadonly, i = this._isShallow;
      if (n2 === "__v_isReactive")
        return !r3;
      if (n2 === "__v_isReadonly")
        return r3;
      if (n2 === "__v_isShallow")
        return i;
      if (n2 === "__v_raw")
        return s2 === (r3 ? i ? Mi2 : ar2 : i ? fr2 : cr2).get(t) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s2) ? t : void 0;
      const o = F2(t);
      if (!r3) {
        let f2;
        if (o && (f2 = gi2[n2]))
          return f2;
        if (n2 === "hasOwnProperty")
          return vi2;
      }
      const l2 = Reflect.get(
        t,
        n2,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        /* @__PURE__ */ ye2(t) ? t : s2
      );
      if (($e2(n2) ? ir2.has(n2) : _i2(n2)) || (r3 || fe(t, "get", n2), i))
        return l2;
      if (/* @__PURE__ */ ye2(l2)) {
        const f2 = o && On2(n2) ? l2 : l2.value;
        return r3 && Y(f2) ? /* @__PURE__ */ Sn2(f2) : f2;
      }
      return Y(l2) ? r3 ? /* @__PURE__ */ Sn2(l2) : /* @__PURE__ */ jn2(l2) : l2;
    }
  };
  __name(_or, "or");
  var or2 = _or;
  var _lr = class _lr extends or2 {
    constructor(t = false) {
      super(false, t);
    }
    set(t, n2, s2, r3) {
      let i = t[n2];
      const o = F2(t) && On2(n2);
      if (!this._isShallow) {
        const d2 = /* @__PURE__ */ Xe(i);
        if (!/* @__PURE__ */ qe2(s2) && !/* @__PURE__ */ Xe(s2) && (i = /* @__PURE__ */ H(i), s2 = /* @__PURE__ */ H(s2)), !o && /* @__PURE__ */ ye2(i) && !/* @__PURE__ */ ye2(s2))
          return d2 || (i.value = s2), true;
      }
      const l2 = o ? Number(n2) < t.length : K2(t, n2), f2 = Reflect.set(
        t,
        n2,
        s2,
        /* @__PURE__ */ ye2(t) ? t : r3
      );
      return t === /* @__PURE__ */ H(r3) && (l2 ? Ye2(s2, i) && Ve2(t, "set", n2, s2) : Ve2(t, "add", n2, s2)), f2;
    }
    deleteProperty(t, n2) {
      const s2 = K2(t, n2);
      t[n2];
      const r3 = Reflect.deleteProperty(t, n2);
      return r3 && s2 && Ve2(t, "delete", n2, void 0), r3;
    }
    has(t, n2) {
      const s2 = Reflect.has(t, n2);
      return (!$e2(n2) || !ir2.has(n2)) && fe(t, "has", n2), s2;
    }
    ownKeys(t) {
      return fe(
        t,
        "iterate",
        F2(t) ? "length" : rt
      ), Reflect.ownKeys(t);
    }
  };
  __name(_lr, "lr");
  var lr2 = _lr;
  var _xi = class _xi extends or2 {
    constructor(t = false) {
      super(true, t);
    }
    set(t, n2) {
      return true;
    }
    deleteProperty(t, n2) {
      return true;
    }
  };
  __name(_xi, "xi");
  var xi2 = _xi;
  var bi2 = /* @__PURE__ */ new lr2();
  var yi2 = /* @__PURE__ */ new xi2();
  var wi2 = /* @__PURE__ */ new lr2(true);
  var wn2 = /* @__PURE__ */ __name((e2) => e2, "wn");
  var Bt2 = /* @__PURE__ */ __name((e2) => Reflect.getPrototypeOf(e2), "Bt");
  function Si2(e2, t, n2) {
    return function(...s2) {
      const r3 = this.__v_raw, i = /* @__PURE__ */ H(r3), o = bt2(i), l2 = e2 === "entries" || e2 === Symbol.iterator && o, f2 = e2 === "keys" && o, d2 = r3[e2](...s2), u2 = n2 ? wn2 : t ? Lt2 : Ke2;
      return !t && fe(
        i,
        "iterate",
        f2 ? yn2 : rt
      ), we2(
        // inheriting all iterator properties
        Object.create(d2),
        {
          // iterator protocol
          next() {
            const { value: p3, done: b4 } = d2.next();
            return b4 ? { value: p3, done: b4 } : {
              value: l2 ? [u2(p3[0]), u2(p3[1])] : u2(p3),
              done: b4
            };
          }
        }
      );
    };
  }
  __name(Si2, "Si");
  function jt2(e2) {
    return function(...t) {
      return e2 === "delete" ? false : e2 === "clear" ? void 0 : this;
    };
  }
  __name(jt2, "jt");
  function Ti2(e2, t) {
    const n2 = {
      get(r3) {
        const i = this.__v_raw, o = /* @__PURE__ */ H(i), l2 = /* @__PURE__ */ H(r3);
        e2 || (Ye2(r3, l2) && fe(o, "get", r3), fe(o, "get", l2));
        const { has: f2 } = Bt2(o), d2 = t ? wn2 : e2 ? Lt2 : Ke2;
        if (f2.call(o, r3))
          return d2(i.get(r3));
        if (f2.call(o, l2))
          return d2(i.get(l2));
        i !== o && i.get(r3);
      },
      get size() {
        const r3 = this.__v_raw;
        return !e2 && fe(/* @__PURE__ */ H(r3), "iterate", rt), r3.size;
      },
      has(r3) {
        const i = this.__v_raw, o = /* @__PURE__ */ H(i), l2 = /* @__PURE__ */ H(r3);
        return e2 || (Ye2(r3, l2) && fe(o, "has", r3), fe(o, "has", l2)), r3 === l2 ? i.has(r3) : i.has(r3) || i.has(l2);
      },
      forEach(r3, i) {
        const o = this, l2 = o.__v_raw, f2 = /* @__PURE__ */ H(l2), d2 = t ? wn2 : e2 ? Lt2 : Ke2;
        return !e2 && fe(f2, "iterate", rt), l2.forEach((u2, p3) => r3.call(i, d2(u2), d2(p3), o));
      }
    };
    return we2(
      n2,
      e2 ? {
        add: jt2("add"),
        set: jt2("set"),
        delete: jt2("delete"),
        clear: jt2("clear")
      } : {
        add(r3) {
          const i = /* @__PURE__ */ H(this), o = Bt2(i), l2 = /* @__PURE__ */ H(r3), f2 = !t && !/* @__PURE__ */ qe2(r3) && !/* @__PURE__ */ Xe(r3) ? l2 : r3;
          return o.has.call(i, f2) || Ye2(r3, f2) && o.has.call(i, r3) || Ye2(l2, f2) && o.has.call(i, l2) || (i.add(f2), Ve2(i, "add", f2, f2)), this;
        },
        set(r3, i) {
          !t && !/* @__PURE__ */ qe2(i) && !/* @__PURE__ */ Xe(i) && (i = /* @__PURE__ */ H(i));
          const o = /* @__PURE__ */ H(this), { has: l2, get: f2 } = Bt2(o);
          let d2 = l2.call(o, r3);
          d2 || (r3 = /* @__PURE__ */ H(r3), d2 = l2.call(o, r3));
          const u2 = f2.call(o, r3);
          return o.set(r3, i), d2 ? Ye2(i, u2) && Ve2(o, "set", r3, i) : Ve2(o, "add", r3, i), this;
        },
        delete(r3) {
          const i = /* @__PURE__ */ H(this), { has: o, get: l2 } = Bt2(i);
          let f2 = o.call(i, r3);
          f2 || (r3 = /* @__PURE__ */ H(r3), f2 = o.call(i, r3)), l2 && l2.call(i, r3);
          const d2 = i.delete(r3);
          return f2 && Ve2(i, "delete", r3, void 0), d2;
        },
        clear() {
          const r3 = /* @__PURE__ */ H(this), i = r3.size !== 0, o = r3.clear();
          return i && Ve2(
            r3,
            "clear",
            void 0,
            void 0
          ), o;
        }
      }
    ), [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ].forEach((r3) => {
      n2[r3] = Si2(r3, e2, t);
    }), n2;
  }
  __name(Ti2, "Ti");
  function Bn2(e2, t) {
    const n2 = Ti2(e2, t);
    return (s2, r3, i) => r3 === "__v_isReactive" ? !e2 : r3 === "__v_isReadonly" ? e2 : r3 === "__v_raw" ? s2 : Reflect.get(
      K2(n2, r3) && r3 in s2 ? n2 : s2,
      r3,
      i
    );
  }
  __name(Bn2, "Bn");
  var Ci2 = {
    get: /* @__PURE__ */ Bn2(false, false)
  };
  var Ei2 = {
    get: /* @__PURE__ */ Bn2(false, true)
  };
  var Ai2 = {
    get: /* @__PURE__ */ Bn2(true, false)
  };
  var cr2 = /* @__PURE__ */ new WeakMap();
  var fr2 = /* @__PURE__ */ new WeakMap();
  var ar2 = /* @__PURE__ */ new WeakMap();
  var Mi2 = /* @__PURE__ */ new WeakMap();
  function Ri2(e2) {
    switch (e2) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  __name(Ri2, "Ri");
  function Pi2(e2) {
    return e2.__v_skip || !Object.isExtensible(e2) ? 0 : Ri2(Zr2(e2));
  }
  __name(Pi2, "Pi");
  // @__NO_SIDE_EFFECTS__
  function jn2(e2) {
    return /* @__PURE__ */ Xe(e2) ? e2 : Vn2(
      e2,
      false,
      bi2,
      Ci2,
      cr2
    );
  }
  __name(jn2, "jn");
  // @__NO_SIDE_EFFECTS__
  function Ii2(e2) {
    return Vn2(
      e2,
      false,
      wi2,
      Ei2,
      fr2
    );
  }
  __name(Ii2, "Ii");
  // @__NO_SIDE_EFFECTS__
  function Sn2(e2) {
    return Vn2(
      e2,
      true,
      yi2,
      Ai2,
      ar2
    );
  }
  __name(Sn2, "Sn");
  function Vn2(e2, t, n2, s2, r3) {
    if (!Y(e2) || e2.__v_raw && !(t && e2.__v_isReactive))
      return e2;
    const i = Pi2(e2);
    if (i === 0)
      return e2;
    const o = r3.get(e2);
    if (o)
      return o;
    const l2 = new Proxy(
      e2,
      i === 2 ? s2 : n2
    );
    return r3.set(e2, l2), l2;
  }
  __name(Vn2, "Vn");
  // @__NO_SIDE_EFFECTS__
  function Kn2(e2) {
    return /* @__PURE__ */ Xe(e2) ? /* @__PURE__ */ Kn2(e2.__v_raw) : !!(e2 && e2.__v_isReactive);
  }
  __name(Kn2, "Kn");
  // @__NO_SIDE_EFFECTS__
  function Xe(e2) {
    return !!(e2 && e2.__v_isReadonly);
  }
  __name(Xe, "Xe");
  // @__NO_SIDE_EFFECTS__
  function qe2(e2) {
    return !!(e2 && e2.__v_isShallow);
  }
  __name(qe2, "qe");
  // @__NO_SIDE_EFFECTS__
  function Wn(e2) {
    return e2 ? !!e2.__v_raw : false;
  }
  __name(Wn, "Wn");
  // @__NO_SIDE_EFFECTS__
  function H(e2) {
    const t = e2 && e2.__v_raw;
    return t ? /* @__PURE__ */ H(t) : e2;
  }
  __name(H, "H");
  function Li2(e2) {
    return !K2(e2, "__v_skip") && Object.isExtensible(e2) && Ys2(e2, "__v_skip", true), e2;
  }
  __name(Li2, "Li");
  var Ke2 = /* @__PURE__ */ __name((e2) => Y(e2) ? /* @__PURE__ */ jn2(e2) : e2, "Ke");
  var Lt2 = /* @__PURE__ */ __name((e2) => Y(e2) ? /* @__PURE__ */ Sn2(e2) : e2, "Lt");
  // @__NO_SIDE_EFFECTS__
  function ye2(e2) {
    return e2 ? e2.__v_isRef === true : false;
  }
  __name(ye2, "ye");
  // @__NO_SIDE_EFFECTS__
  function De2(e2) {
    return Oi2(e2, false);
  }
  __name(De2, "De");
  function Oi2(e2, t) {
    return /* @__PURE__ */ ye2(e2) ? e2 : new Fi2(e2, t);
  }
  __name(Oi2, "Oi");
  var _Fi = class _Fi {
    constructor(t, n2) {
      this.dep = new Hn2(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n2 ? t : /* @__PURE__ */ H(t), this._value = n2 ? t : Ke2(t), this.__v_isShallow = n2;
    }
    get value() {
      return this.dep.track(), this._value;
    }
    set value(t) {
      const n2 = this._rawValue, s2 = this.__v_isShallow || /* @__PURE__ */ qe2(t) || /* @__PURE__ */ Xe(t);
      t = s2 ? t : /* @__PURE__ */ H(t), Ye2(t, n2) && (this._rawValue = t, this._value = s2 ? t : Ke2(t), this.dep.trigger());
    }
  };
  __name(_Fi, "Fi");
  var Fi2 = _Fi;
  function $i2(e2) {
    return /* @__PURE__ */ ye2(e2) ? e2.value : e2;
  }
  __name($i2, "$i");
  var Ni2 = {
    get: /* @__PURE__ */ __name((e2, t, n2) => t === "__v_raw" ? e2 : $i2(Reflect.get(e2, t, n2)), "get"),
    set: /* @__PURE__ */ __name((e2, t, n2, s2) => {
      const r3 = e2[t];
      return /* @__PURE__ */ ye2(r3) && !/* @__PURE__ */ ye2(n2) ? (r3.value = n2, true) : Reflect.set(e2, t, n2, s2);
    }, "set")
  };
  function ur2(e2) {
    return /* @__PURE__ */ Kn2(e2) ? e2 : new Proxy(e2, Ni2);
  }
  __name(ur2, "ur");
  var _Di = class _Di {
    constructor(t, n2, s2) {
      this.fn = t, this.setter = n2, this._value = void 0, this.dep = new Hn2(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Pt2 - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n2, this.isSSR = s2;
    }
    /**
     * @internal
     */
    notify() {
      if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
      U2 !== this)
        return Qs2(this, true), true;
    }
    get value() {
      const t = this.dep.track();
      return nr2(this), t && (t.version = this.dep.version), this._value;
    }
    set value(t) {
      this.setter && this.setter(t);
    }
  };
  __name(_Di, "Di");
  var Di2 = _Di;
  // @__NO_SIDE_EFFECTS__
  function Hi2(e2, t, n2 = false) {
    let s2, r3;
    return k3(e2) ? s2 = e2 : (s2 = e2.get, r3 = e2.set), new Di2(s2, r3, n2);
  }
  __name(Hi2, "Hi");
  function Ht2(e2, t, n2, s2) {
    try {
      return s2 ? e2(...s2) : e2();
    } catch (r3) {
      en2(r3, t, n2);
    }
  }
  __name(Ht2, "Ht");
  function We2(e2, t, n2, s2) {
    if (k3(e2)) {
      const r3 = Ht2(e2, t, n2, s2);
      return r3 && Ws2(r3) && r3.catch((i) => {
        en2(i, t, n2);
      }), r3;
    }
    if (F2(e2)) {
      const r3 = [];
      for (let i = 0; i < e2.length; i++)
        r3.push(We2(e2[i], t, n2, s2));
      return r3;
    }
  }
  __name(We2, "We");
  function en2(e2, t, n2, s2 = true) {
    const r3 = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Z;
    if (t) {
      let l2 = t.parent;
      const f2 = t.proxy, d2 = `https://vuejs.org/error-reference/#runtime-${n2}`;
      for (; l2; ) {
        const u2 = l2.ec;
        if (u2) {
          for (let p3 = 0; p3 < u2.length; p3++)
            if (u2[p3](e2, f2, d2) === false)
              return;
        }
        l2 = l2.parent;
      }
      if (i) {
        it2(), Ht2(i, null, 10, [
          e2,
          f2,
          d2
        ]), ot2();
        return;
      }
    }
    zi2(e2, n2, r3, s2, o);
  }
  __name(en2, "en");
  function zi2(e2, t, n2, s2 = true, r3 = false) {
    if (r3)
      throw e2;
    console.error(e2);
  }
  __name(zi2, "zi");
  var de2 = [];
  var Re2 = -1;
  var dt2 = [];
  var ke2 = null;
  var at2 = 0;
  var dr2 = /* @__PURE__ */ Promise.resolve();
  var Wt2 = null;
  function Bi2(e2) {
    const t = Wt2 || dr2;
    return e2 ? t.then(this ? e2.bind(this) : e2) : t;
  }
  __name(Bi2, "Bi");
  function ji2(e2) {
    let t = Re2 + 1, n2 = de2.length;
    for (; t < n2; ) {
      const s2 = t + n2 >>> 1, r3 = de2[s2], i = Ot2(r3);
      i < e2 || i === e2 && r3.flags & 2 ? t = s2 + 1 : n2 = s2;
    }
    return t;
  }
  __name(ji2, "ji");
  function hr2(e2) {
    if (!(e2.flags & 1)) {
      const t = Ot2(e2), n2 = de2[de2.length - 1];
      !n2 || // fast path when the job id is larger than the tail
      !(e2.flags & 2) && t >= Ot2(n2) ? de2.push(e2) : de2.splice(ji2(t), 0, e2), e2.flags |= 1, pr2();
    }
  }
  __name(hr2, "hr");
  function pr2() {
    Wt2 || (Wt2 = dr2.then(mr2));
  }
  __name(pr2, "pr");
  function Vi2(e2) {
    F2(e2) ? dt2.push(...e2) : ke2 && e2.id === -1 ? ke2.splice(at2 + 1, 0, e2) : e2.flags & 1 || (dt2.push(e2), e2.flags |= 1), pr2();
  }
  __name(Vi2, "Vi");
  function cs2(e2, t, n2 = Re2 + 1) {
    for (; n2 < de2.length; n2++) {
      const s2 = de2[n2];
      if (s2 && s2.flags & 2) {
        if (e2 && s2.id !== e2.uid)
          continue;
        de2.splice(n2, 1), n2--, s2.flags & 4 && (s2.flags &= -2), s2(), s2.flags & 4 || (s2.flags &= -2);
      }
    }
  }
  __name(cs2, "cs");
  function gr2(e2) {
    if (dt2.length) {
      const t = [...new Set(dt2)].sort(
        (n2, s2) => Ot2(n2) - Ot2(s2)
      );
      if (dt2.length = 0, ke2) {
        ke2.push(...t);
        return;
      }
      for (ke2 = t, at2 = 0; at2 < ke2.length; at2++) {
        const n2 = ke2[at2];
        n2.flags & 4 && (n2.flags &= -2), n2.flags & 8 || n2(), n2.flags &= -2;
      }
      ke2 = null, at2 = 0;
    }
  }
  __name(gr2, "gr");
  var Ot2 = /* @__PURE__ */ __name((e2) => e2.id == null ? e2.flags & 2 ? -1 : 1 / 0 : e2.id, "Ot");
  function mr2(e2) {
    try {
      for (Re2 = 0; Re2 < de2.length; Re2++) {
        const t = de2[Re2];
        t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ht2(
          t,
          t.i,
          t.i ? 15 : 14
        ), t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; Re2 < de2.length; Re2++) {
        const t = de2[Re2];
        t && (t.flags &= -2);
      }
      Re2 = -1, de2.length = 0, gr2(), Wt2 = null, (de2.length || dt2.length) && mr2();
    }
  }
  __name(mr2, "mr");
  var Fe = null;
  var _r2 = null;
  function Ut2(e2) {
    const t = Fe;
    return Fe = e2, _r2 = e2 && e2.type.__scopeId || null, t;
  }
  __name(Ut2, "Ut");
  function vr2(e2, t = Fe, n2) {
    if (!t || e2._n)
      return e2;
    const s2 = /* @__PURE__ */ __name((...r3) => {
      s2._d && Yt2(-1);
      const i = Ut2(t);
      let o;
      try {
        o = e2(...r3);
      } finally {
        Ut2(i), s2._d && Yt2(1);
      }
      return o;
    }, "s");
    return s2._n = true, s2._c = true, s2._d = true, s2;
  }
  __name(vr2, "vr");
  function Ze(e2, t, n2, s2) {
    const r3 = e2.dirs, i = t && t.dirs;
    for (let o = 0; o < r3.length; o++) {
      const l2 = r3[o];
      i && (l2.oldValue = i[o].value);
      let f2 = l2.dir[s2];
      f2 && (it2(), We2(f2, n2, 8, [
        e2.el,
        l2,
        e2,
        t
      ]), ot2());
    }
  }
  __name(Ze, "Ze");
  var Ki2 = /* @__PURE__ */ Symbol("_vte");
  var xr2 = /* @__PURE__ */ __name((e2) => e2.__isTeleport, "xr");
  var Pe = /* @__PURE__ */ Symbol("_leaveCb");
  var _t = /* @__PURE__ */ Symbol("_enterCb");
  function Wi2() {
    const e2 = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    return Er2(() => {
      e2.isMounted = true;
    }), qi2(() => {
      e2.isUnmounting = true;
    }), e2;
  }
  __name(Wi2, "Wi");
  var be2 = [Function, Array];
  var br2 = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: be2,
    onEnter: be2,
    onAfterEnter: be2,
    onEnterCancelled: be2,
    // leave
    onBeforeLeave: be2,
    onLeave: be2,
    onAfterLeave: be2,
    onLeaveCancelled: be2,
    // appear
    onBeforeAppear: be2,
    onAppear: be2,
    onAfterAppear: be2,
    onAppearCancelled: be2
  };
  var yr2 = /* @__PURE__ */ __name((e2) => {
    const t = e2.subTree;
    return t.component ? yr2(t.component) : t;
  }, "yr");
  var Ui2 = {
    name: "BaseTransition",
    props: br2,
    setup(e2, { slots: t }) {
      const n2 = Mo2(), s2 = Wi2();
      return () => {
        const r3 = t.default && Tr2(t.default(), true), i = r3 && r3.length ? wr2(r3) : (
          // Keep explicit default-slot conditionals on the same transition path
          // as regular v-if branches, which render a comment placeholder.
          n2.subTree ? Mn2() : void 0
        );
        if (!i)
          return;
        const o = /* @__PURE__ */ H(e2), { mode: l2 } = o;
        if (s2.isLeaving)
          return un2(i);
        const f2 = fs2(i);
        if (!f2)
          return un2(i);
        let d2 = Tn2(
          f2,
          o,
          s2,
          n2,
          // #11061, ensure enterHooks is fresh after clone
          (p3) => d2 = p3
        );
        f2.type !== he2 && Ft2(f2, d2);
        let u2 = n2.subTree && fs2(n2.subTree);
        if (u2 && u2.type !== he2 && !nt2(u2, f2) && yr2(n2).type !== he2) {
          let p3 = Tn2(
            u2,
            o,
            s2,
            n2
          );
          if (Ft2(u2, p3), l2 === "out-in" && f2.type !== he2)
            return s2.isLeaving = true, p3.afterLeave = () => {
              s2.isLeaving = false, n2.job.flags & 8 || n2.update(), delete p3.afterLeave, u2 = void 0;
            }, un2(i);
          l2 === "in-out" && f2.type !== he2 ? p3.delayLeave = (b4, R3, $2) => {
            const C = Sr2(
              s2,
              u2
            );
            C[String(u2.key)] = u2, b4[Pe] = () => {
              R3(), b4[Pe] = void 0, delete d2.delayedLeave, u2 = void 0;
            }, d2.delayedLeave = () => {
              $2(), delete d2.delayedLeave, u2 = void 0;
            };
          } : u2 = void 0;
        } else u2 && (u2 = void 0);
        return i;
      };
    }
  };
  function wr2(e2) {
    let t = e2[0];
    if (e2.length > 1) {
      for (const n2 of e2)
        if (n2.type !== he2) {
          t = n2;
          break;
        }
    }
    return t;
  }
  __name(wr2, "wr");
  var ki2 = Ui2;
  function Sr2(e2, t) {
    const { leavingVNodes: n2 } = e2;
    let s2 = n2.get(t.type);
    return s2 || (s2 = /* @__PURE__ */ Object.create(null), n2.set(t.type, s2)), s2;
  }
  __name(Sr2, "Sr");
  function Tn2(e2, t, n2, s2, r3) {
    const {
      appear: i,
      mode: o,
      persisted: l2 = false,
      onBeforeEnter: f2,
      onEnter: d2,
      onAfterEnter: u2,
      onEnterCancelled: p3,
      onBeforeLeave: b4,
      onLeave: R3,
      onAfterLeave: $2,
      onLeaveCancelled: C,
      onBeforeAppear: L,
      onAppear: O,
      onAfterAppear: I2,
      onAppearCancelled: N
    } = t, B2 = String(e2.key), Q2 = Sr2(n2, e2), se2 = /* @__PURE__ */ __name((P2, z2) => {
      P2 && We2(
        P2,
        s2,
        9,
        z2
      );
    }, "se"), ae2 = /* @__PURE__ */ __name((P2, z2) => {
      const j2 = z2[1];
      se2(P2, z2), F2(P2) ? P2.every((T) => T.length <= 1) && j2() : P2.length <= 1 && j2();
    }, "ae"), q = {
      mode: o,
      persisted: l2,
      beforeEnter(P2) {
        let z2 = f2;
        if (!n2.isMounted)
          if (i)
            z2 = L || f2;
          else
            return;
        P2[Pe] && P2[Pe](
          true
          /* cancelled */
        );
        const j2 = Q2[B2];
        j2 && nt2(e2, j2) && j2.el[Pe] && j2.el[Pe](), se2(z2, [P2]);
      },
      enter(P2) {
        if (Q2[B2] === e2) return;
        let z2 = d2, j2 = u2, T = p3;
        if (!n2.isMounted)
          if (i)
            z2 = O || d2, j2 = I2 || u2, T = N || p3;
          else
            return;
        let X2 = false;
        P2[_t] = (ve2) => {
          X2 || (X2 = true, ve2 ? se2(T, [P2]) : se2(j2, [P2]), q.delayedLeave && q.delayedLeave(), P2[_t] = void 0);
        };
        const re2 = P2[_t].bind(null, false);
        z2 ? ae2(z2, [P2, re2]) : re2();
      },
      leave(P2, z2) {
        const j2 = String(e2.key);
        if (P2[_t] && P2[_t](
          true
          /* cancelled */
        ), n2.isUnmounting)
          return z2();
        se2(b4, [P2]);
        let T = false;
        P2[Pe] = (re2) => {
          T || (T = true, z2(), re2 ? se2(C, [P2]) : se2($2, [P2]), P2[Pe] = void 0, Q2[j2] === e2 && delete Q2[j2]);
        };
        const X2 = P2[Pe].bind(null, false);
        Q2[j2] = e2, R3 ? ae2(R3, [P2, X2]) : X2();
      },
      clone(P2) {
        const z2 = Tn2(
          P2,
          t,
          n2,
          s2,
          r3
        );
        return r3 && r3(z2), z2;
      }
    };
    return q;
  }
  __name(Tn2, "Tn");
  function un2(e2) {
    if (Un2(e2))
      return e2 = Ge2(e2), e2.children = null, e2;
  }
  __name(un2, "un");
  function fs2(e2) {
    if (!Un2(e2))
      return xr2(e2.type) && e2.children ? wr2(e2.children) : e2;
    if (e2.component)
      return e2.component.subTree;
    const { shapeFlag: t, children: n2 } = e2;
    if (n2) {
      if (t & 16)
        return n2[0];
      if (t & 32 && k3(n2.default))
        return n2.default();
    }
  }
  __name(fs2, "fs");
  function Ft2(e2, t) {
    e2.shapeFlag & 6 && e2.component ? (e2.transition = t, Ft2(e2.component.subTree, t)) : e2.shapeFlag & 128 ? (e2.ssContent.transition = t.clone(e2.ssContent), e2.ssFallback.transition = t.clone(e2.ssFallback)) : e2.transition = t;
  }
  __name(Ft2, "Ft");
  function Tr2(e2, t = false, n2) {
    let s2 = [], r3 = 0;
    for (let i = 0; i < e2.length; i++) {
      let o = e2[i];
      const l2 = n2 == null ? o.key : String(n2) + String(o.key != null ? o.key : i);
      o.type === Le2 ? (o.patchFlag & 128 && r3++, s2 = s2.concat(
        Tr2(o.children, t, l2)
      )) : (t || o.type !== he2) && s2.push(l2 != null ? Ge2(o, { key: l2 }) : o);
    }
    if (r3 > 1)
      for (let i = 0; i < s2.length; i++)
        s2[i].patchFlag = -2;
    return s2;
  }
  __name(Tr2, "Tr");
  // @__NO_SIDE_EFFECTS__
  function Cr2(e2, t) {
    return k3(e2) ? (
      // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      we2({ name: e2.name }, t, { setup: e2 })
    ) : e2;
  }
  __name(Cr2, "Cr");
  function Yi2(e2) {
    e2.ids = [e2.ids[0] + e2.ids[2]++ + "-", 0, 0];
  }
  __name(Yi2, "Yi");
  function as2(e2, t) {
    let n2;
    return !!((n2 = Object.getOwnPropertyDescriptor(e2, t)) && !n2.configurable);
  }
  __name(as2, "as");
  var kt2 = /* @__PURE__ */ new WeakMap();
  function Tt2(e2, t, n2, s2, r3 = false) {
    if (F2(e2)) {
      e2.forEach(
        (C, L) => Tt2(
          C,
          t && (F2(t) ? t[L] : t),
          n2,
          s2,
          r3
        )
      );
      return;
    }
    if (Ct2(s2) && !r3) {
      s2.shapeFlag & 512 && s2.type.__asyncResolved && s2.component.subTree.component && Tt2(e2, t, n2, s2.component.subTree);
      return;
    }
    const i = s2.shapeFlag & 4 ? Zn2(s2.component) : s2.el, o = r3 ? null : i, { i: l2, r: f2 } = e2, d2 = t && t.r, u2 = l2.refs === Z ? l2.refs = {} : l2.refs, p3 = l2.setupState, b4 = /* @__PURE__ */ H(p3), R3 = p3 === Z ? Ks2 : (C) => as2(u2, C) ? false : K2(b4, C), $2 = /* @__PURE__ */ __name((C, L) => !(L && as2(u2, L)), "$");
    if (d2 != null && d2 !== f2) {
      if (us2(t), ne2(d2))
        u2[d2] = null, R3(d2) && (p3[d2] = null);
      else if (/* @__PURE__ */ ye2(d2)) {
        const C = t;
        $2(d2, C.k) && (d2.value = null), C.k && (u2[C.k] = null);
      }
    }
    if (k3(f2))
      Ht2(f2, l2, 12, [o, u2]);
    else {
      const C = ne2(f2), L = /* @__PURE__ */ ye2(f2);
      if (C || L) {
        const O = /* @__PURE__ */ __name(() => {
          if (e2.f) {
            const I2 = C ? R3(f2) ? p3[f2] : u2[f2] : $2() || !e2.k ? f2.value : u2[e2.k];
            if (r3)
              F2(I2) && qr2(I2, i);
            else if (F2(I2))
              I2.includes(i) || I2.push(i);
            else if (C)
              u2[f2] = [i], R3(f2) && (p3[f2] = u2[f2]);
            else {
              const N = [i];
              $2(f2, e2.k) && (f2.value = N), e2.k && (u2[e2.k] = N);
            }
          } else C ? (u2[f2] = o, R3(f2) && (p3[f2] = o)) : L && ($2(f2, e2.k) && (f2.value = o), e2.k && (u2[e2.k] = o));
        }, "O");
        if (o) {
          const I2 = /* @__PURE__ */ __name(() => {
            O(), kt2.delete(e2);
          }, "I");
          I2.id = -1, kt2.set(e2, I2), me2(I2, n2);
        } else
          us2(e2), O();
      }
    }
  }
  __name(Tt2, "Tt");
  function us2(e2) {
    const t = kt2.get(e2);
    t && (t.flags |= 8, kt2.delete(e2));
  }
  __name(us2, "us");
  Qt2().requestIdleCallback;
  Qt2().cancelIdleCallback;
  var Ct2 = /* @__PURE__ */ __name((e2) => !!e2.type.__asyncLoader, "Ct");
  var Un2 = /* @__PURE__ */ __name((e2) => e2.type.__isKeepAlive, "Un");
  function Xi2(e2, t, n2 = lt2, s2 = false) {
    if (n2) {
      const r3 = n2[e2] || (n2[e2] = []), i = t.__weh || (t.__weh = (...o) => {
        it2();
        const l2 = Gn(n2), f2 = We2(t, n2, e2, o);
        return l2(), ot2(), f2;
      });
      return s2 ? r3.unshift(i) : r3.push(i), i;
    }
  }
  __name(Xi2, "Xi");
  var kn = /* @__PURE__ */ __name((e2) => (t, n2 = lt2) => {
    (!Jn || e2 === "sp") && Xi2(e2, (...s2) => t(...s2), n2);
  }, "kn");
  var Er2 = kn("m");
  var qi2 = kn(
    "bum"
  );
  var Gi2 = kn("um");
  var Ji2 = /* @__PURE__ */ Symbol.for("v-ndc");
  var Cn2 = /* @__PURE__ */ __name((e2) => e2 ? Kr2(e2) ? Zn2(e2) : Cn2(e2.parent) : null, "Cn");
  var Et2 = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ we2(/* @__PURE__ */ Object.create(null), {
      $: /* @__PURE__ */ __name((e2) => e2, "$"),
      $el: /* @__PURE__ */ __name((e2) => e2.vnode.el, "$el"),
      $data: /* @__PURE__ */ __name((e2) => e2.data, "$data"),
      $props: /* @__PURE__ */ __name((e2) => e2.props, "$props"),
      $attrs: /* @__PURE__ */ __name((e2) => e2.attrs, "$attrs"),
      $slots: /* @__PURE__ */ __name((e2) => e2.slots, "$slots"),
      $refs: /* @__PURE__ */ __name((e2) => e2.refs, "$refs"),
      $parent: /* @__PURE__ */ __name((e2) => Cn2(e2.parent), "$parent"),
      $root: /* @__PURE__ */ __name((e2) => Cn2(e2.root), "$root"),
      $host: /* @__PURE__ */ __name((e2) => e2.ce, "$host"),
      $emit: /* @__PURE__ */ __name((e2) => e2.emit, "$emit"),
      $options: /* @__PURE__ */ __name((e2) => e2.type, "$options"),
      $forceUpdate: /* @__PURE__ */ __name((e2) => e2.f || (e2.f = () => {
        hr2(e2.update);
      }), "$forceUpdate"),
      $nextTick: /* @__PURE__ */ __name((e2) => e2.n || (e2.n = Bi2.bind(e2.proxy)), "$nextTick"),
      $watch: /* @__PURE__ */ __name((e2) => Ln2, "$watch")
    })
  );
  var dn2 = /* @__PURE__ */ __name((e2, t) => e2 !== Z && !e2.__isScriptSetup && K2(e2, t), "dn");
  var Zi2 = {
    get({ _: e2 }, t) {
      if (t === "__v_skip")
        return true;
      const { ctx: n2, setupState: s2, data: r3, props: i, accessCache: o, type: l2, appContext: f2 } = e2;
      if (t[0] !== "$") {
        const b4 = o[t];
        if (b4 !== void 0)
          switch (b4) {
            case 1:
              return s2[t];
            case 2:
              return r3[t];
            case 4:
              return n2[t];
            case 3:
              return i[t];
          }
        else {
          if (dn2(s2, t))
            return o[t] = 1, s2[t];
          if (K2(i, t))
            return o[t] = 3, i[t];
          if (n2 !== Z && K2(n2, t))
            return o[t] = 4, n2[t];
          o[t] = 0;
        }
      }
      const d2 = Et2[t];
      let u2, p3;
      if (d2)
        return t === "$attrs" && fe(e2.attrs, "get", ""), d2(e2);
      if (
        // css module (injected by vue-loader)
        (u2 = l2.__cssModules) && (u2 = u2[t])
      )
        return u2;
      if (n2 !== Z && K2(n2, t))
        return o[t] = 4, n2[t];
      if (
        // global properties
        p3 = f2.config.globalProperties, K2(p3, t)
      )
        return p3[t];
    },
    set({ _: e2 }, t, n2) {
      const { data: s2, setupState: r3, ctx: i } = e2;
      return dn2(r3, t) ? (r3[t] = n2, true) : K2(e2.props, t) || t[0] === "$" && t.slice(1) in e2 ? false : (i[t] = n2, true);
    },
    has({
      _: { data: e2, setupState: t, accessCache: n2, ctx: s2, appContext: r3, props: i, type: o }
    }, l2) {
      let f2;
      return !!(n2[l2] || dn2(t, l2) || K2(i, l2) || K2(s2, l2) || K2(Et2, l2) || K2(r3.config.globalProperties, l2) || (f2 = o.__cssModules) && f2[l2]);
    },
    defineProperty(e2, t, n2) {
      return n2.get != null ? e2._.accessCache[t] = 0 : K2(n2, "value") && this.set(e2, t, n2.value, null), Reflect.defineProperty(e2, t, n2);
    }
  };
  function Ar2() {
    return {
      app: null,
      config: {
        isNativeTag: Ks2,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  __name(Ar2, "Ar");
  var Qi2 = 0;
  function eo2(e2, t) {
    return function(s2, r3 = null) {
      k3(s2) || (s2 = we2({}, s2)), r3 != null && !Y(r3) && (r3 = null);
      const i = Ar2(), o = /* @__PURE__ */ new WeakSet(), l2 = [];
      let f2 = false;
      const d2 = i.app = {
        _uid: Qi2++,
        _component: s2,
        _props: r3,
        _container: null,
        _context: i,
        _instance: null,
        version: $o2,
        get config() {
          return i.config;
        },
        set config(u2) {
        },
        use(u2, ...p3) {
          return o.has(u2) || (u2 && k3(u2.install) ? (o.add(u2), u2.install(d2, ...p3)) : k3(u2) && (o.add(u2), u2(d2, ...p3))), d2;
        },
        mixin(u2) {
          return d2;
        },
        component(u2, p3) {
          return p3 ? (i.components[u2] = p3, d2) : i.components[u2];
        },
        directive(u2, p3) {
          return p3 ? (i.directives[u2] = p3, d2) : i.directives[u2];
        },
        mount(u2, p3, b4) {
          if (!f2) {
            const R3 = d2._ceVNode || pe2(s2, r3);
            return R3.appContext = i, b4 === true ? b4 = "svg" : b4 === false && (b4 = void 0), e2(R3, u2, b4), f2 = true, d2._container = u2, u2.__vue_app__ = d2, Zn2(R3.component);
          }
        },
        onUnmount(u2) {
          l2.push(u2);
        },
        unmount() {
          f2 && (We2(
            l2,
            d2._instance,
            16
          ), e2(null, d2._container), delete d2._container.__vue_app__);
        },
        provide(u2, p3) {
          return i.provides[u2] = p3, d2;
        },
        runWithContext(u2) {
          try {
            return u2();
          } finally {
          }
        }
      };
      return d2;
    };
  }
  __name(eo2, "eo");
  var to2 = /* @__PURE__ */ __name((e2, t) => t === "modelValue" || t === "model-value" ? e2.modelModifiers : e2[`${t}Modifiers`] || e2[`${Se2(t)}Modifiers`] || e2[`${ct(t)}Modifiers`], "to");
  function no2(e2, t, ...n2) {
    if (e2.isUnmounted) return;
    const s2 = e2.vnode.props || Z;
    let r3 = n2;
    const i = t.startsWith("update:"), o = i && to2(s2, t.slice(7));
    o && (o.trim && (r3 = n2.map((u2) => ne2(u2) ? u2.trim() : u2)), o.number && (r3 = n2.map(ni2)));
    let l2, f2 = s2[l2 = rn2(t)] || // also try camelCase event handler (#2249)
    s2[l2 = rn2(Se2(t))];
    !f2 && i && (f2 = s2[l2 = rn2(ct(t))]), f2 && We2(
      f2,
      e2,
      6,
      r3
    );
    const d2 = s2[l2 + "Once"];
    if (d2) {
      if (!e2.emitted)
        e2.emitted = {};
      else if (e2.emitted[l2])
        return;
      e2.emitted[l2] = true, We2(
        d2,
        e2,
        6,
        r3
      );
    }
  }
  __name(no2, "no");
  function so2(e2, t, n2 = false) {
    const s2 = t.emitsCache, r3 = s2.get(e2);
    if (r3 !== void 0)
      return r3;
    const i = e2.emits;
    let o = {};
    return i ? (F2(i) ? i.forEach((l2) => o[l2] = null) : we2(o, i), Y(e2) && s2.set(e2, o), o) : (Y(e2) && s2.set(e2, null), null);
  }
  __name(so2, "so");
  function tn2(e2, t) {
    return !e2 || !Gt2(t) ? false : (t = t.slice(2).replace(/Once$/, ""), K2(e2, t[0].toLowerCase() + t.slice(1)) || K2(e2, ct(t)) || K2(e2, t));
  }
  __name(tn2, "tn");
  function ds2(e2) {
    const {
      type: t,
      vnode: n2,
      proxy: s2,
      withProxy: r3,
      propsOptions: [i],
      slots: o,
      attrs: l2,
      emit: f2,
      render: d2,
      renderCache: u2,
      props: p3,
      data: b4,
      setupState: R3,
      ctx: $2,
      inheritAttrs: C
    } = e2, L = Ut2(e2);
    let O, I2;
    try {
      if (n2.shapeFlag & 4) {
        const B2 = r3 || s2, Q2 = B2;
        O = Oe2(
          d2.call(
            Q2,
            B2,
            u2,
            p3,
            R3,
            b4,
            $2
          )
        ), I2 = l2;
      } else {
        const B2 = t;
        O = Oe2(
          B2.length > 1 ? B2(
            p3,
            { attrs: l2, slots: o, emit: f2 }
          ) : B2(
            p3,
            null
          )
        ), I2 = t.props ? l2 : ro2(l2);
      }
    } catch (B2) {
      At2.length = 0, en2(B2, e2, 1), O = pe2(he2);
    }
    let N = O;
    if (I2 && C !== false) {
      const B2 = Object.keys(I2), { shapeFlag: Q2 } = N;
      B2.length && Q2 & 7 && (i && B2.some(Jt2) && (I2 = io2(
        I2,
        i
      )), N = Ge2(N, I2, false, true));
    }
    return n2.dirs && (N = Ge2(N, null, false, true), N.dirs = N.dirs ? N.dirs.concat(n2.dirs) : n2.dirs), n2.transition && Ft2(N, n2.transition), O = N, Ut2(L), O;
  }
  __name(ds2, "ds");
  var ro2 = /* @__PURE__ */ __name((e2) => {
    let t;
    for (const n2 in e2)
      (n2 === "class" || n2 === "style" || Gt2(n2)) && ((t || (t = {}))[n2] = e2[n2]);
    return t;
  }, "ro");
  var io2 = /* @__PURE__ */ __name((e2, t) => {
    const n2 = {};
    for (const s2 in e2)
      (!Jt2(s2) || !(s2.slice(9) in t)) && (n2[s2] = e2[s2]);
    return n2;
  }, "io");
  function oo2(e2, t, n2) {
    const { props: s2, children: r3, component: i } = e2, { props: o, children: l2, patchFlag: f2 } = t, d2 = i.emitsOptions;
    if (t.dirs || t.transition)
      return true;
    if (n2 && f2 >= 0) {
      if (f2 & 1024)
        return true;
      if (f2 & 16)
        return s2 ? hs2(s2, o, d2) : !!o;
      if (f2 & 8) {
        const u2 = t.dynamicProps;
        for (let p3 = 0; p3 < u2.length; p3++) {
          const b4 = u2[p3];
          if (Mr(o, s2, b4) && !tn2(d2, b4))
            return true;
        }
      }
    } else
      return (r3 || l2) && (!l2 || !l2.$stable) ? true : s2 === o ? false : s2 ? o ? hs2(s2, o, d2) : true : !!o;
    return false;
  }
  __name(oo2, "oo");
  function hs2(e2, t, n2) {
    const s2 = Object.keys(t);
    if (s2.length !== Object.keys(e2).length)
      return true;
    for (let r3 = 0; r3 < s2.length; r3++) {
      const i = s2[r3];
      if (Mr(t, e2, i) && !tn2(n2, i))
        return true;
    }
    return false;
  }
  __name(hs2, "hs");
  function Mr(e2, t, n2) {
    const s2 = e2[n2], r3 = t[n2];
    return n2 === "style" && Y(s2) && Y(r3) ? !Fn2(s2, r3) : s2 !== r3;
  }
  __name(Mr, "Mr");
  function lo2({ vnode: e2, parent: t, suspense: n2 }, s2) {
    for (; t; ) {
      const r3 = t.subTree;
      if (r3.suspense && r3.suspense.activeBranch === e2 && (r3.suspense.vnode.el = r3.el = s2, e2 = r3), r3 === e2)
        (e2 = t.vnode).el = s2, t = t.parent;
      else
        break;
    }
    n2 && n2.activeBranch === e2 && (n2.vnode.el = s2);
  }
  __name(lo2, "lo");
  var Rr2 = {};
  var Pr = /* @__PURE__ */ __name(() => Object.create(Rr2), "Pr");
  var Ir2 = /* @__PURE__ */ __name((e2) => Object.getPrototypeOf(e2) === Rr2, "Ir");
  function co2(e2, t, n2, s2 = false) {
    const r3 = {}, i = Pr();
    e2.propsDefaults = /* @__PURE__ */ Object.create(null), Lr2(e2, t, r3, i);
    for (const o in e2.propsOptions[0])
      o in r3 || (r3[o] = void 0);
    n2 ? e2.props = s2 ? r3 : /* @__PURE__ */ Ii2(r3) : e2.type.props ? e2.props = r3 : e2.props = i, e2.attrs = i;
  }
  __name(co2, "co");
  function fo2(e2, t, n2, s2) {
    const {
      props: r3,
      attrs: i,
      vnode: { patchFlag: o }
    } = e2, l2 = /* @__PURE__ */ H(r3), [f2] = e2.propsOptions;
    let d2 = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (s2 || o > 0) && !(o & 16)
    ) {
      if (o & 8) {
        const u2 = e2.vnode.dynamicProps;
        for (let p3 = 0; p3 < u2.length; p3++) {
          let b4 = u2[p3];
          if (tn2(e2.emitsOptions, b4))
            continue;
          const R3 = t[b4];
          if (f2)
            if (K2(i, b4))
              R3 !== i[b4] && (i[b4] = R3, d2 = true);
            else {
              const $2 = Se2(b4);
              r3[$2] = En2(
                f2,
                l2,
                $2,
                R3,
                e2,
                false
              );
            }
          else
            R3 !== i[b4] && (i[b4] = R3, d2 = true);
        }
      }
    } else {
      Lr2(e2, t, r3, i) && (d2 = true);
      let u2;
      for (const p3 in l2)
        (!t || // for camelCase
        !K2(t, p3) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((u2 = ct(p3)) === p3 || !K2(t, u2))) && (f2 ? n2 && // for camelCase
        (n2[p3] !== void 0 || // for kebab-case
        n2[u2] !== void 0) && (r3[p3] = En2(
          f2,
          l2,
          p3,
          void 0,
          e2,
          true
        )) : delete r3[p3]);
      if (i !== l2)
        for (const p3 in i)
          (!t || !K2(t, p3)) && (delete i[p3], d2 = true);
    }
    d2 && Ve2(e2.attrs, "set", "");
  }
  __name(fo2, "fo");
  function Lr2(e2, t, n2, s2) {
    const [r3, i] = e2.propsOptions;
    let o = false, l2;
    if (t)
      for (let f2 in t) {
        if (yt2(f2))
          continue;
        const d2 = t[f2];
        let u2;
        r3 && K2(r3, u2 = Se2(f2)) ? !i || !i.includes(u2) ? n2[u2] = d2 : (l2 || (l2 = {}))[u2] = d2 : tn2(e2.emitsOptions, f2) || (!(f2 in s2) || d2 !== s2[f2]) && (s2[f2] = d2, o = true);
      }
    if (i) {
      const f2 = /* @__PURE__ */ H(n2), d2 = l2 || Z;
      for (let u2 = 0; u2 < i.length; u2++) {
        const p3 = i[u2];
        n2[p3] = En2(
          r3,
          f2,
          p3,
          d2[p3],
          e2,
          !K2(d2, p3)
        );
      }
    }
    return o;
  }
  __name(Lr2, "Lr");
  function En2(e2, t, n2, s2, r3, i) {
    const o = e2[n2];
    if (o != null) {
      const l2 = K2(o, "default");
      if (l2 && s2 === void 0) {
        const f2 = o.default;
        if (o.type !== Function && !o.skipFactory && k3(f2)) {
          const { propsDefaults: d2 } = r3;
          if (n2 in d2)
            s2 = d2[n2];
          else {
            const u2 = Gn(r3);
            s2 = d2[n2] = f2.call(
              null,
              t
            ), u2();
          }
        } else
          s2 = f2;
        r3.ce && r3.ce._setProp(n2, s2);
      }
      o[
        0
        /* shouldCast */
      ] && (i && !l2 ? s2 = false : o[
        1
        /* shouldCastTrue */
      ] && (s2 === "" || s2 === ct(n2)) && (s2 = true));
    }
    return s2;
  }
  __name(En2, "En");
  function ao2(e2, t, n2 = false) {
    const s2 = t.propsCache, r3 = s2.get(e2);
    if (r3)
      return r3;
    const i = e2.props, o = {}, l2 = [];
    if (!i)
      return Y(e2) && s2.set(e2, ut2), ut2;
    if (F2(i))
      for (let d2 = 0; d2 < i.length; d2++) {
        const u2 = Se2(i[d2]);
        ps2(u2) && (o[u2] = Z);
      }
    else if (i)
      for (const d2 in i) {
        const u2 = Se2(d2);
        if (ps2(u2)) {
          const p3 = i[d2], b4 = o[u2] = F2(p3) || k3(p3) ? { type: p3 } : we2({}, p3), R3 = b4.type;
          let $2 = false, C = true;
          if (F2(R3))
            for (let L = 0; L < R3.length; ++L) {
              const O = R3[L], I2 = k3(O) && O.name;
              if (I2 === "Boolean") {
                $2 = true;
                break;
              } else I2 === "String" && (C = false);
            }
          else
            $2 = k3(R3) && R3.name === "Boolean";
          b4[
            0
            /* shouldCast */
          ] = $2, b4[
            1
            /* shouldCastTrue */
          ] = C, ($2 || K2(b4, "default")) && l2.push(u2);
        }
      }
    const f2 = [o, l2];
    return Y(e2) && s2.set(e2, f2), f2;
  }
  __name(ao2, "ao");
  function ps2(e2) {
    return e2[0] !== "$" && !yt2(e2);
  }
  __name(ps2, "ps");
  var Yn = /* @__PURE__ */ __name((e2) => e2 === "_" || e2 === "_ctx" || e2 === "$stable", "Yn");
  var Xn2 = /* @__PURE__ */ __name((e2) => F2(e2) ? e2.map(Oe2) : [Oe2(e2)], "Xn");
  var uo2 = /* @__PURE__ */ __name((e2, t, n2) => {
    if (t._n)
      return t;
    const s2 = vr2((...r3) => Xn2(t(...r3)), n2);
    return s2._c = false, s2;
  }, "uo");
  var Or2 = /* @__PURE__ */ __name((e2, t, n2) => {
    const s2 = e2._ctx;
    for (const r3 in e2) {
      if (Yn(r3)) continue;
      const i = e2[r3];
      if (k3(i))
        t[r3] = uo2(r3, i, s2);
      else if (i != null) {
        const o = Xn2(i);
        t[r3] = () => o;
      }
    }
  }, "Or");
  var Fr = /* @__PURE__ */ __name((e2, t) => {
    const n2 = Xn2(t);
    e2.slots.default = () => n2;
  }, "Fr");
  var $r2 = /* @__PURE__ */ __name((e2, t, n2) => {
    for (const s2 in t)
      (n2 || !Yn(s2)) && (e2[s2] = t[s2]);
  }, "$r");
  var ho2 = /* @__PURE__ */ __name((e2, t, n2) => {
    const s2 = e2.slots = Pr();
    if (e2.vnode.shapeFlag & 32) {
      const r3 = t._;
      r3 ? ($r2(s2, t, n2), n2 && Ys2(s2, "_", r3, true)) : Or2(t, s2);
    } else t && Fr(e2, t);
  }, "ho");
  var po2 = /* @__PURE__ */ __name((e2, t, n2) => {
    const { vnode: s2, slots: r3 } = e2;
    let i = true, o = Z;
    if (s2.shapeFlag & 32) {
      const l2 = t._;
      l2 ? n2 && l2 === 1 ? i = false : $r2(r3, t, n2) : (i = !t.$stable, Or2(t, r3)), o = t;
    } else t && (Fr(e2, t), o = { default: 1 });
    if (i)
      for (const l2 in r3)
        !Yn(l2) && o[l2] == null && delete r3[l2];
  }, "po");
  var me2 = xo2;
  function go2(e2) {
    return mo2(e2);
  }
  __name(go2, "go");
  function mo2(e2, t) {
    const n2 = Qt2();
    n2.__VUE__ = true;
    const {
      insert: s2,
      remove: r3,
      patchProp: i,
      createElement: o,
      createText: l2,
      createComment: f2,
      setText: d2,
      setElementText: u2,
      parentNode: p3,
      nextSibling: b4,
      setScopeId: R3 = Ln2,
      insertStaticContent: $2
    } = e2, C = /* @__PURE__ */ __name((c2, a, h3, v3 = null, g2 = null, m2 = null, w = void 0, y2 = null, x3 = !!a.dynamicChildren) => {
      if (c2 === a)
        return;
      c2 && !nt2(c2, a) && (v3 = zt2(c2), le(c2, g2, m2, true), c2 = null), a.patchFlag === -2 && (x3 = false, a.dynamicChildren = null);
      const { type: _2, ref: A2, shapeFlag: S2 } = a;
      switch (_2) {
        case nn2:
          L(c2, a, h3, v3);
          break;
        case he2:
          O(c2, a, h3, v3);
          break;
        case pn2:
          c2 == null && I2(a, h3, v3, w);
          break;
        case Le2:
          T(
            c2,
            a,
            h3,
            v3,
            g2,
            m2,
            w,
            y2,
            x3
          );
          break;
        default:
          S2 & 1 ? Q2(
            c2,
            a,
            h3,
            v3,
            g2,
            m2,
            w,
            y2,
            x3
          ) : S2 & 6 ? X2(
            c2,
            a,
            h3,
            v3,
            g2,
            m2,
            w,
            y2,
            x3
          ) : (S2 & 64 || S2 & 128) && _2.process(
            c2,
            a,
            h3,
            v3,
            g2,
            m2,
            w,
            y2,
            x3,
            pt2
          );
      }
      A2 != null && g2 ? Tt2(A2, c2 && c2.ref, m2, a || c2, !a) : A2 == null && c2 && c2.ref != null && Tt2(c2.ref, null, m2, c2, true);
    }, "C"), L = /* @__PURE__ */ __name((c2, a, h3, v3) => {
      if (c2 == null)
        s2(
          a.el = l2(a.children),
          h3,
          v3
        );
      else {
        const g2 = a.el = c2.el;
        a.children !== c2.children && d2(g2, a.children);
      }
    }, "L"), O = /* @__PURE__ */ __name((c2, a, h3, v3) => {
      c2 == null ? s2(
        a.el = f2(a.children || ""),
        h3,
        v3
      ) : a.el = c2.el;
    }, "O"), I2 = /* @__PURE__ */ __name((c2, a, h3, v3) => {
      [c2.el, c2.anchor] = $2(
        c2.children,
        a,
        h3,
        v3,
        c2.el,
        c2.anchor
      );
    }, "I"), N = /* @__PURE__ */ __name(({ el: c2, anchor: a }, h3, v3) => {
      let g2;
      for (; c2 && c2 !== a; )
        g2 = b4(c2), s2(c2, h3, v3), c2 = g2;
      s2(a, h3, v3);
    }, "N"), B2 = /* @__PURE__ */ __name(({ el: c2, anchor: a }) => {
      let h3;
      for (; c2 && c2 !== a; )
        h3 = b4(c2), r3(c2), c2 = h3;
      r3(a);
    }, "B"), Q2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w, y2, x3) => {
      if (a.type === "svg" ? w = "svg" : a.type === "math" && (w = "mathml"), c2 == null)
        se2(
          a,
          h3,
          v3,
          g2,
          m2,
          w,
          y2,
          x3
        );
      else {
        const _2 = c2.el && c2.el._isVueCE ? c2.el : null;
        try {
          _2 && _2._beginPatch(), P2(
            c2,
            a,
            g2,
            m2,
            w,
            y2,
            x3
          );
        } finally {
          _2 && _2._endPatch();
        }
      }
    }, "Q"), se2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w, y2) => {
      let x3, _2;
      const { props: A2, shapeFlag: S2, transition: E2, dirs: M2 } = c2;
      if (x3 = c2.el = o(
        c2.type,
        m2,
        A2 && A2.is,
        A2
      ), S2 & 8 ? u2(x3, c2.children) : S2 & 16 && q(
        c2.children,
        x3,
        null,
        v3,
        g2,
        hn2(c2, m2),
        w,
        y2
      ), M2 && Ze(c2, null, v3, "created"), ae2(x3, c2, c2.scopeId, w, v3), A2) {
        for (const V4 in A2)
          V4 !== "value" && !yt2(V4) && i(x3, V4, null, A2[V4], m2, v3);
        "value" in A2 && i(x3, "value", null, A2.value, m2), (_2 = A2.onVnodeBeforeMount) && Me2(_2, v3, c2);
      }
      M2 && Ze(c2, null, v3, "beforeMount");
      const D3 = _o2(g2, E2);
      D3 && E2.beforeEnter(x3), s2(x3, a, h3), ((_2 = A2 && A2.onVnodeMounted) || D3 || M2) && me2(() => {
        try {
          _2 && Me2(_2, v3, c2), D3 && E2.enter(x3), M2 && Ze(c2, null, v3, "mounted");
        } finally {
        }
      }, g2);
    }, "se"), ae2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2) => {
      if (h3 && R3(c2, h3), v3)
        for (let m2 = 0; m2 < v3.length; m2++)
          R3(c2, v3[m2]);
      if (g2) {
        let m2 = g2.subTree;
        if (a === m2 || zr2(m2.type) && (m2.ssContent === a || m2.ssFallback === a)) {
          const w = g2.vnode;
          ae2(
            c2,
            w,
            w.scopeId,
            w.slotScopeIds,
            g2.parent
          );
        }
      }
    }, "ae"), q = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w, y2, x3 = 0) => {
      for (let _2 = x3; _2 < c2.length; _2++) {
        const A2 = c2[_2] = y2 ? je2(c2[_2]) : Oe2(c2[_2]);
        C(
          null,
          A2,
          a,
          h3,
          v3,
          g2,
          m2,
          w,
          y2
        );
      }
    }, "q"), P2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w) => {
      const y2 = a.el = c2.el;
      let { patchFlag: x3, dynamicChildren: _2, dirs: A2 } = a;
      x3 |= c2.patchFlag & 16;
      const S2 = c2.props || Z, E2 = a.props || Z;
      let M2;
      if (h3 && Qe(h3, false), (M2 = E2.onVnodeBeforeUpdate) && Me2(M2, h3, a, c2), A2 && Ze(a, c2, h3, "beforeUpdate"), h3 && Qe(h3, true), (S2.innerHTML && E2.innerHTML == null || S2.textContent && E2.textContent == null) && u2(y2, ""), _2 ? z2(
        c2.dynamicChildren,
        _2,
        y2,
        h3,
        v3,
        hn2(a, g2),
        m2
      ) : w || ee2(
        c2,
        a,
        y2,
        null,
        h3,
        v3,
        hn2(a, g2),
        m2,
        false
      ), x3 > 0) {
        if (x3 & 16)
          j2(y2, S2, E2, h3, g2);
        else if (x3 & 2 && S2.class !== E2.class && i(y2, "class", null, E2.class, g2), x3 & 4 && i(y2, "style", S2.style, E2.style, g2), x3 & 8) {
          const D3 = a.dynamicProps;
          for (let V4 = 0; V4 < D3.length; V4++) {
            const W3 = D3[V4], te2 = S2[W3], oe = E2[W3];
            (oe !== te2 || W3 === "value") && i(y2, W3, te2, oe, g2, h3);
          }
        }
        x3 & 1 && c2.children !== a.children && u2(y2, a.children);
      } else !w && _2 == null && j2(y2, S2, E2, h3, g2);
      ((M2 = E2.onVnodeUpdated) || A2) && me2(() => {
        M2 && Me2(M2, h3, a, c2), A2 && Ze(a, c2, h3, "updated");
      }, v3);
    }, "P"), z2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w) => {
      for (let y2 = 0; y2 < a.length; y2++) {
        const x3 = c2[y2], _2 = a[y2], A2 = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          x3.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (x3.type === Le2 || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !nt2(x3, _2) || // - In the case of a component, it could contain anything.
          x3.shapeFlag & 198) ? p3(x3.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            h3
          )
        );
        C(
          x3,
          _2,
          A2,
          null,
          v3,
          g2,
          m2,
          w,
          true
        );
      }
    }, "z"), j2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2) => {
      if (a !== h3) {
        if (a !== Z)
          for (const m2 in a)
            !yt2(m2) && !(m2 in h3) && i(
              c2,
              m2,
              a[m2],
              null,
              g2,
              v3
            );
        for (const m2 in h3) {
          if (yt2(m2)) continue;
          const w = h3[m2], y2 = a[m2];
          w !== y2 && m2 !== "value" && i(c2, m2, y2, w, g2, v3);
        }
        "value" in h3 && i(c2, "value", a.value, h3.value, g2);
      }
    }, "j"), T = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w, y2, x3) => {
      const _2 = a.el = c2 ? c2.el : l2(""), A2 = a.anchor = c2 ? c2.anchor : l2("");
      let { patchFlag: S2, dynamicChildren: E2, slotScopeIds: M2 } = a;
      M2 && (y2 = y2 ? y2.concat(M2) : M2), c2 == null ? (s2(_2, h3, v3), s2(A2, h3, v3), q(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        a.children || [],
        h3,
        A2,
        g2,
        m2,
        w,
        y2,
        x3
      )) : S2 > 0 && S2 & 64 && E2 && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      c2.dynamicChildren && c2.dynamicChildren.length === E2.length ? (z2(
        c2.dynamicChildren,
        E2,
        h3,
        g2,
        m2,
        w,
        y2
      ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (a.key != null || g2 && a === g2.subTree) && Nr2(
        c2,
        a,
        true
        /* shallow */
      )) : ee2(
        c2,
        a,
        h3,
        A2,
        g2,
        m2,
        w,
        y2,
        x3
      );
    }, "T"), X2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w, y2, x3) => {
      a.slotScopeIds = y2, c2 == null ? a.shapeFlag & 512 ? g2.ctx.activate(
        a,
        h3,
        v3,
        w,
        x3
      ) : re2(
        a,
        h3,
        v3,
        g2,
        m2,
        w,
        x3
      ) : ve2(c2, a, x3);
    }, "X"), re2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w) => {
      const y2 = c2.component = Ao2(
        c2,
        v3,
        g2
      );
      if (Un2(c2) && (y2.ctx.renderer = pt2), Ro2(y2, false, w), y2.asyncDep) {
        if (g2 && g2.registerDep(y2, Je2, w), !c2.el) {
          const x3 = y2.subTree = pe2(he2);
          O(null, x3, a, h3), c2.placeholder = x3.el;
        }
      } else
        Je2(
          y2,
          c2,
          a,
          h3,
          g2,
          m2,
          w
        );
    }, "re"), ve2 = /* @__PURE__ */ __name((c2, a, h3) => {
      const v3 = a.component = c2.component;
      if (oo2(c2, a, h3))
        if (v3.asyncDep && !v3.asyncResolved) {
          G(v3, a, h3);
          return;
        } else
          v3.next = a, v3.update();
      else
        a.el = c2.el, v3.vnode = a;
    }, "ve"), Je2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w) => {
      const y2 = /* @__PURE__ */ __name(() => {
        if (c2.isMounted) {
          let { next: S2, bu: E2, u: M2, parent: D3, vnode: V4 } = c2;
          {
            const Ee2 = Dr2(c2);
            if (Ee2) {
              S2 && (S2.el = V4.el, G(c2, S2, w)), Ee2.asyncDep.then(() => {
                me2(() => {
                  c2.isUnmounted || _2();
                }, g2);
              });
              return;
            }
          }
          let W3 = S2, te2;
          Qe(c2, false), S2 ? (S2.el = V4.el, G(c2, S2, w)) : S2 = V4, E2 && on2(E2), (te2 = S2.props && S2.props.onVnodeBeforeUpdate) && Me2(te2, D3, S2, V4), Qe(c2, true);
          const oe = ds2(c2), Ce2 = c2.subTree;
          c2.subTree = oe, C(
            Ce2,
            oe,
            // parent may have changed if it's in a teleport
            p3(Ce2.el),
            // anchor may have changed if it's in a fragment
            zt2(Ce2),
            c2,
            g2,
            m2
          ), S2.el = oe.el, W3 === null && lo2(c2, oe.el), M2 && me2(M2, g2), (te2 = S2.props && S2.props.onVnodeUpdated) && me2(
            () => Me2(te2, D3, S2, V4),
            g2
          );
        } else {
          let S2;
          const { el: E2, props: M2 } = a, { bm: D3, m: V4, parent: W3, root: te2, type: oe } = c2, Ce2 = Ct2(a);
          Qe(c2, false), D3 && on2(D3), !Ce2 && (S2 = M2 && M2.onVnodeBeforeMount) && Me2(S2, W3, a), Qe(c2, true);
          {
            te2.ce && te2.ce._hasShadowRoot() && te2.ce._injectChildStyle(
              oe,
              c2.parent ? c2.parent.type : void 0
            );
            const Ee2 = c2.subTree = ds2(c2);
            C(
              null,
              Ee2,
              h3,
              v3,
              c2,
              g2,
              m2
            ), a.el = Ee2.el;
          }
          if (V4 && me2(V4, g2), !Ce2 && (S2 = M2 && M2.onVnodeMounted)) {
            const Ee2 = a;
            me2(
              () => Me2(S2, W3, Ee2),
              g2
            );
          }
          (a.shapeFlag & 256 || W3 && Ct2(W3.vnode) && W3.vnode.shapeFlag & 256) && c2.a && me2(c2.a, g2), c2.isMounted = true, a = h3 = v3 = null;
        }
      }, "y");
      c2.scope.on();
      const x3 = c2.effect = new di2(y2);
      c2.scope.off();
      const _2 = c2.update = x3.run.bind(x3), A2 = c2.job = x3.runIfDirty.bind(x3);
      A2.i = c2, A2.id = c2.uid, x3.scheduler = () => hr2(A2), Qe(c2, true), _2();
    }, "Je"), G = /* @__PURE__ */ __name((c2, a, h3) => {
      a.component = c2;
      const v3 = c2.vnode.props;
      c2.vnode = a, c2.next = null, fo2(c2, a.props, v3, h3), po2(c2, a.children, h3), it2(), cs2(c2), ot2();
    }, "G"), ee2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w, y2, x3 = false) => {
      const _2 = c2 && c2.children, A2 = c2 ? c2.shapeFlag : 0, S2 = a.children, { patchFlag: E2, shapeFlag: M2 } = a;
      if (E2 > 0) {
        if (E2 & 128) {
          ie2(
            _2,
            S2,
            h3,
            v3,
            g2,
            m2,
            w,
            y2,
            x3
          );
          return;
        } else if (E2 & 256) {
          ue2(
            _2,
            S2,
            h3,
            v3,
            g2,
            m2,
            w,
            y2,
            x3
          );
          return;
        }
      }
      M2 & 8 ? (A2 & 16 && ht2(_2, g2, m2), S2 !== _2 && u2(h3, S2)) : A2 & 16 ? M2 & 16 ? ie2(
        _2,
        S2,
        h3,
        v3,
        g2,
        m2,
        w,
        y2,
        x3
      ) : ht2(_2, g2, m2, true) : (A2 & 8 && u2(h3, ""), M2 & 16 && q(
        S2,
        h3,
        v3,
        g2,
        m2,
        w,
        y2,
        x3
      ));
    }, "ee"), ue2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w, y2, x3) => {
      c2 = c2 || ut2, a = a || ut2;
      const _2 = c2.length, A2 = a.length, S2 = Math.min(_2, A2);
      let E2;
      for (E2 = 0; E2 < S2; E2++) {
        const M2 = a[E2] = x3 ? je2(a[E2]) : Oe2(a[E2]);
        C(
          c2[E2],
          M2,
          h3,
          null,
          g2,
          m2,
          w,
          y2,
          x3
        );
      }
      _2 > A2 ? ht2(
        c2,
        g2,
        m2,
        true,
        false,
        S2
      ) : q(
        a,
        h3,
        v3,
        g2,
        m2,
        w,
        y2,
        x3,
        S2
      );
    }, "ue"), ie2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2, m2, w, y2, x3) => {
      let _2 = 0;
      const A2 = a.length;
      let S2 = c2.length - 1, E2 = A2 - 1;
      for (; _2 <= S2 && _2 <= E2; ) {
        const M2 = c2[_2], D3 = a[_2] = x3 ? je2(a[_2]) : Oe2(a[_2]);
        if (nt2(M2, D3))
          C(
            M2,
            D3,
            h3,
            null,
            g2,
            m2,
            w,
            y2,
            x3
          );
        else
          break;
        _2++;
      }
      for (; _2 <= S2 && _2 <= E2; ) {
        const M2 = c2[S2], D3 = a[E2] = x3 ? je2(a[E2]) : Oe2(a[E2]);
        if (nt2(M2, D3))
          C(
            M2,
            D3,
            h3,
            null,
            g2,
            m2,
            w,
            y2,
            x3
          );
        else
          break;
        S2--, E2--;
      }
      if (_2 > S2) {
        if (_2 <= E2) {
          const M2 = E2 + 1, D3 = M2 < A2 ? a[M2].el : v3;
          for (; _2 <= E2; )
            C(
              null,
              a[_2] = x3 ? je2(a[_2]) : Oe2(a[_2]),
              h3,
              D3,
              g2,
              m2,
              w,
              y2,
              x3
            ), _2++;
        }
      } else if (_2 > E2)
        for (; _2 <= S2; )
          le(c2[_2], g2, m2, true), _2++;
      else {
        const M2 = _2, D3 = _2, V4 = /* @__PURE__ */ new Map();
        for (_2 = D3; _2 <= E2; _2++) {
          const ge2 = a[_2] = x3 ? je2(a[_2]) : Oe2(a[_2]);
          ge2.key != null && V4.set(ge2.key, _2);
        }
        let W3, te2 = 0;
        const oe = E2 - D3 + 1;
        let Ce2 = false, Ee2 = 0;
        const gt = new Array(oe);
        for (_2 = 0; _2 < oe; _2++) gt[_2] = 0;
        for (_2 = M2; _2 <= S2; _2++) {
          const ge2 = c2[_2];
          if (te2 >= oe) {
            le(ge2, g2, m2, true);
            continue;
          }
          let Ae2;
          if (ge2.key != null)
            Ae2 = V4.get(ge2.key);
          else
            for (W3 = D3; W3 <= E2; W3++)
              if (gt[W3 - D3] === 0 && nt2(ge2, a[W3])) {
                Ae2 = W3;
                break;
              }
          Ae2 === void 0 ? le(ge2, g2, m2, true) : (gt[Ae2 - D3] = _2 + 1, Ae2 >= Ee2 ? Ee2 = Ae2 : Ce2 = true, C(
            ge2,
            a[Ae2],
            h3,
            null,
            g2,
            m2,
            w,
            y2,
            x3
          ), te2++);
        }
        const ts2 = Ce2 ? vo2(gt) : ut2;
        for (W3 = ts2.length - 1, _2 = oe - 1; _2 >= 0; _2--) {
          const ge2 = D3 + _2, Ae2 = a[ge2], ns2 = a[ge2 + 1], ss2 = ge2 + 1 < A2 ? (
            // #13559, #14173 fallback to el placeholder for unresolved async component
            ns2.el || Hr2(ns2)
          ) : v3;
          gt[_2] === 0 ? C(
            null,
            Ae2,
            h3,
            ss2,
            g2,
            m2,
            w,
            y2,
            x3
          ) : Ce2 && (W3 < 0 || _2 !== ts2[W3] ? xe2(Ae2, h3, ss2, 2) : W3--);
        }
      }
    }, "ie"), xe2 = /* @__PURE__ */ __name((c2, a, h3, v3, g2 = null) => {
      const { el: m2, type: w, transition: y2, children: x3, shapeFlag: _2 } = c2;
      if (_2 & 6) {
        xe2(c2.component.subTree, a, h3, v3);
        return;
      }
      if (_2 & 128) {
        c2.suspense.move(a, h3, v3);
        return;
      }
      if (_2 & 64) {
        w.move(c2, a, h3, pt2);
        return;
      }
      if (w === Le2) {
        s2(m2, a, h3);
        for (let S2 = 0; S2 < x3.length; S2++)
          xe2(x3[S2], a, h3, v3);
        s2(c2.anchor, a, h3);
        return;
      }
      if (w === pn2) {
        N(c2, a, h3);
        return;
      }
      if (v3 !== 2 && _2 & 1 && y2)
        if (v3 === 0)
          y2.beforeEnter(m2), s2(m2, a, h3), me2(() => y2.enter(m2), g2);
        else {
          const { leave: S2, delayLeave: E2, afterLeave: M2 } = y2, D3 = /* @__PURE__ */ __name(() => {
            c2.ctx.isUnmounted ? r3(m2) : s2(m2, a, h3);
          }, "D"), V4 = /* @__PURE__ */ __name(() => {
            m2._isLeaving && m2[Pe](
              true
              /* cancelled */
            ), S2(m2, () => {
              D3(), M2 && M2();
            });
          }, "V");
          E2 ? E2(m2, D3, V4) : V4();
        }
      else
        s2(m2, a, h3);
    }, "xe"), le = /* @__PURE__ */ __name((c2, a, h3, v3 = false, g2 = false) => {
      const {
        type: m2,
        props: w,
        ref: y2,
        children: x3,
        dynamicChildren: _2,
        shapeFlag: A2,
        patchFlag: S2,
        dirs: E2,
        cacheIndex: M2,
        memo: D3
      } = c2;
      if (S2 === -2 && (g2 = false), y2 != null && (it2(), Tt2(y2, null, h3, c2, true), ot2()), M2 != null && (a.renderCache[M2] = void 0), A2 & 256) {
        a.ctx.deactivate(c2);
        return;
      }
      const V4 = A2 & 1 && E2, W3 = !Ct2(c2);
      let te2;
      if (W3 && (te2 = w && w.onVnodeBeforeUnmount) && Me2(te2, a, c2), A2 & 6)
        Xr2(c2.component, h3, v3);
      else {
        if (A2 & 128) {
          c2.suspense.unmount(h3, v3);
          return;
        }
        V4 && Ze(c2, null, a, "beforeUnmount"), A2 & 64 ? c2.type.remove(
          c2,
          a,
          h3,
          pt2,
          v3
        ) : _2 && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !_2.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (m2 !== Le2 || S2 > 0 && S2 & 64) ? ht2(
          _2,
          a,
          h3,
          false,
          true
        ) : (m2 === Le2 && S2 & 384 || !g2 && A2 & 16) && ht2(x3, a, h3), v3 && Qn2(c2);
      }
      const oe = D3 != null && M2 == null;
      (W3 && (te2 = w && w.onVnodeUnmounted) || V4 || oe) && me2(() => {
        te2 && Me2(te2, a, c2), V4 && Ze(c2, null, a, "unmounted"), oe && (c2.el = null);
      }, h3);
    }, "le"), Qn2 = /* @__PURE__ */ __name((c2) => {
      const { type: a, el: h3, anchor: v3, transition: g2 } = c2;
      if (a === Le2) {
        Yr2(h3, v3);
        return;
      }
      if (a === pn2) {
        B2(c2);
        return;
      }
      const m2 = /* @__PURE__ */ __name(() => {
        r3(h3), g2 && !g2.persisted && g2.afterLeave && g2.afterLeave();
      }, "m");
      if (c2.shapeFlag & 1 && g2 && !g2.persisted) {
        const { leave: w, delayLeave: y2 } = g2, x3 = /* @__PURE__ */ __name(() => w(h3, m2), "x");
        y2 ? y2(c2.el, m2, x3) : x3();
      } else
        m2();
    }, "Qn"), Yr2 = /* @__PURE__ */ __name((c2, a) => {
      let h3;
      for (; c2 !== a; )
        h3 = b4(c2), r3(c2), c2 = h3;
      r3(a);
    }, "Yr"), Xr2 = /* @__PURE__ */ __name((c2, a, h3) => {
      const { bum: v3, scope: g2, job: m2, subTree: w, um: y2, m: x3, a: _2 } = c2;
      gs2(x3), gs2(_2), v3 && on2(v3), g2.stop(), m2 && (m2.flags |= 8, le(w, c2, a, h3)), y2 && me2(y2, a), me2(() => {
        c2.isUnmounted = true;
      }, a);
    }, "Xr"), ht2 = /* @__PURE__ */ __name((c2, a, h3, v3 = false, g2 = false, m2 = 0) => {
      for (let w = m2; w < c2.length; w++)
        le(c2[w], a, h3, v3, g2);
    }, "ht"), zt2 = /* @__PURE__ */ __name((c2) => {
      if (c2.shapeFlag & 6)
        return zt2(c2.component.subTree);
      if (c2.shapeFlag & 128)
        return c2.suspense.next();
      const a = b4(c2.anchor || c2.el), h3 = a && a[Ki2];
      return h3 ? b4(h3) : a;
    }, "zt");
    let sn2 = false;
    const es2 = /* @__PURE__ */ __name((c2, a, h3) => {
      let v3;
      c2 == null ? a._vnode && (le(a._vnode, null, null, true), v3 = a._vnode.component) : C(
        a._vnode || null,
        c2,
        a,
        null,
        null,
        null,
        h3
      ), a._vnode = c2, sn2 || (sn2 = true, cs2(v3), gr2(), sn2 = false);
    }, "es"), pt2 = {
      p: C,
      um: le,
      m: xe2,
      r: Qn2,
      mt: re2,
      mc: q,
      pc: ee2,
      pbc: z2,
      n: zt2,
      o: e2
    };
    return {
      render: es2,
      hydrate: void 0,
      createApp: eo2(es2)
    };
  }
  __name(mo2, "mo");
  function hn2({ type: e2, props: t }, n2) {
    return n2 === "svg" && e2 === "foreignObject" || n2 === "mathml" && e2 === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n2;
  }
  __name(hn2, "hn");
  function Qe({ effect: e2, job: t }, n2) {
    n2 ? (e2.flags |= 32, t.flags |= 4) : (e2.flags &= -33, t.flags &= -5);
  }
  __name(Qe, "Qe");
  function _o2(e2, t) {
    return (!e2 || e2 && !e2.pendingBranch) && t && !t.persisted;
  }
  __name(_o2, "_o");
  function Nr2(e2, t, n2 = false) {
    const s2 = e2.children, r3 = t.children;
    if (F2(s2) && F2(r3))
      for (let i = 0; i < s2.length; i++) {
        const o = s2[i];
        let l2 = r3[i];
        l2.shapeFlag & 1 && !l2.dynamicChildren && ((l2.patchFlag <= 0 || l2.patchFlag === 32) && (l2 = r3[i] = je2(r3[i]), l2.el = o.el), !n2 && l2.patchFlag !== -2 && Nr2(o, l2)), l2.type === nn2 && (l2.patchFlag === -1 && (l2 = r3[i] = je2(l2)), l2.el = o.el), l2.type === he2 && !l2.el && (l2.el = o.el);
      }
  }
  __name(Nr2, "Nr");
  function vo2(e2) {
    const t = e2.slice(), n2 = [0];
    let s2, r3, i, o, l2;
    const f2 = e2.length;
    for (s2 = 0; s2 < f2; s2++) {
      const d2 = e2[s2];
      if (d2 !== 0) {
        if (r3 = n2[n2.length - 1], e2[r3] < d2) {
          t[s2] = r3, n2.push(s2);
          continue;
        }
        for (i = 0, o = n2.length - 1; i < o; )
          l2 = i + o >> 1, e2[n2[l2]] < d2 ? i = l2 + 1 : o = l2;
        d2 < e2[n2[i]] && (i > 0 && (t[s2] = n2[i - 1]), n2[i] = s2);
      }
    }
    for (i = n2.length, o = n2[i - 1]; i-- > 0; )
      n2[i] = o, o = t[o];
    return n2;
  }
  __name(vo2, "vo");
  function Dr2(e2) {
    const t = e2.subTree.component;
    if (t)
      return t.asyncDep && !t.asyncResolved ? t : Dr2(t);
  }
  __name(Dr2, "Dr");
  function gs2(e2) {
    if (e2)
      for (let t = 0; t < e2.length; t++)
        e2[t].flags |= 8;
  }
  __name(gs2, "gs");
  function Hr2(e2) {
    if (e2.placeholder)
      return e2.placeholder;
    const t = e2.component;
    return t ? Hr2(t.subTree) : null;
  }
  __name(Hr2, "Hr");
  var zr2 = /* @__PURE__ */ __name((e2) => e2.__isSuspense, "zr");
  function xo2(e2, t) {
    t && t.pendingBranch ? F2(e2) ? t.effects.push(...e2) : t.effects.push(e2) : Vi2(e2);
  }
  __name(xo2, "xo");
  var Le2 = /* @__PURE__ */ Symbol.for("v-fgt");
  var nn2 = /* @__PURE__ */ Symbol.for("v-txt");
  var he2 = /* @__PURE__ */ Symbol.for("v-cmt");
  var pn2 = /* @__PURE__ */ Symbol.for("v-stc");
  var At2 = [];
  var _e2 = null;
  function Mt2(e2 = false) {
    At2.push(_e2 = e2 ? null : []);
  }
  __name(Mt2, "Mt");
  function bo2() {
    At2.pop(), _e2 = At2[At2.length - 1] || null;
  }
  __name(bo2, "bo");
  var $t2 = 1;
  function Yt2(e2, t = false) {
    $t2 += e2, e2 < 0 && _e2 && t && (_e2.hasOnce = true);
  }
  __name(Yt2, "Yt");
  function Br2(e2) {
    return e2.dynamicChildren = $t2 > 0 ? _e2 || ut2 : null, bo2(), $t2 > 0 && _e2 && _e2.push(e2), e2;
  }
  __name(Br2, "Br");
  function An2(e2, t, n2, s2, r3, i) {
    return Br2(
      Be2(
        e2,
        t,
        n2,
        s2,
        r3,
        i,
        true
      )
    );
  }
  __name(An2, "An");
  function jr2(e2, t, n2, s2, r3) {
    return Br2(
      pe2(
        e2,
        t,
        n2,
        s2,
        r3,
        true
      )
    );
  }
  __name(jr2, "jr");
  function Xt2(e2) {
    return e2 ? e2.__v_isVNode === true : false;
  }
  __name(Xt2, "Xt");
  function nt2(e2, t) {
    return e2.type === t.type && e2.key === t.key;
  }
  __name(nt2, "nt");
  var Vr2 = /* @__PURE__ */ __name(({ key: e2 }) => e2 ?? null, "Vr");
  var Kt2 = /* @__PURE__ */ __name(({
    ref: e2,
    ref_key: t,
    ref_for: n2
  }) => (typeof e2 == "number" && (e2 = "" + e2), e2 != null ? ne2(e2) || /* @__PURE__ */ ye2(e2) || k3(e2) ? { i: Fe, r: e2, k: t, f: !!n2 } : e2 : null), "Kt");
  function Be2(e2, t = null, n2 = null, s2 = 0, r3 = null, i = e2 === Le2 ? 0 : 1, o = false, l2 = false) {
    const f2 = {
      __v_isVNode: true,
      __v_skip: true,
      type: e2,
      props: t,
      key: t && Vr2(t),
      ref: t && Kt2(t),
      scopeId: _r2,
      slotScopeIds: null,
      children: n2,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: i,
      patchFlag: s2,
      dynamicProps: r3,
      dynamicChildren: null,
      appContext: null,
      ctx: Fe
    };
    return l2 ? (qn(f2, n2), i & 128 && e2.normalize(f2)) : n2 && (f2.shapeFlag |= ne2(n2) ? 8 : 16), $t2 > 0 && // avoid a block node from tracking itself
    !o && // has current parent block
    _e2 && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (f2.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    f2.patchFlag !== 32 && _e2.push(f2), f2;
  }
  __name(Be2, "Be");
  var pe2 = yo2;
  function yo2(e2, t = null, n2 = null, s2 = 0, r3 = null, i = false) {
    if ((!e2 || e2 === Ji2) && (e2 = he2), Xt2(e2)) {
      const l2 = Ge2(
        e2,
        t,
        true
        /* mergeRef: true */
      );
      return n2 && qn(l2, n2), $t2 > 0 && !i && _e2 && (l2.shapeFlag & 6 ? _e2[_e2.indexOf(e2)] = l2 : _e2.push(l2)), l2.patchFlag = -2, l2;
    }
    if (Oo2(e2) && (e2 = e2.__vccOpts), t) {
      t = wo2(t);
      let { class: l2, style: f2 } = t;
      l2 && !ne2(l2) && (t.class = st(l2)), Y(f2) && (/* @__PURE__ */ Wn(f2) && !F2(f2) && (f2 = we2({}, f2)), t.style = Rt(f2));
    }
    const o = ne2(e2) ? 1 : zr2(e2) ? 128 : xr2(e2) ? 64 : Y(e2) ? 4 : k3(e2) ? 2 : 0;
    return Be2(
      e2,
      t,
      n2,
      s2,
      r3,
      o,
      i,
      true
    );
  }
  __name(yo2, "yo");
  function wo2(e2) {
    return e2 ? /* @__PURE__ */ Wn(e2) || Ir2(e2) ? we2({}, e2) : e2 : null;
  }
  __name(wo2, "wo");
  function Ge2(e2, t, n2 = false, s2 = false) {
    const { props: r3, ref: i, patchFlag: o, children: l2, transition: f2 } = e2, d2 = t ? To2(r3 || {}, t) : r3, u2 = {
      __v_isVNode: true,
      __v_skip: true,
      type: e2.type,
      props: d2,
      key: d2 && Vr2(d2),
      ref: t && t.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        n2 && i ? F2(i) ? i.concat(Kt2(t)) : [i, Kt2(t)] : Kt2(t)
      ) : i,
      scopeId: e2.scopeId,
      slotScopeIds: e2.slotScopeIds,
      children: l2,
      target: e2.target,
      targetStart: e2.targetStart,
      targetAnchor: e2.targetAnchor,
      staticCount: e2.staticCount,
      shapeFlag: e2.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: t && e2.type !== Le2 ? o === -1 ? 16 : o | 16 : o,
      dynamicProps: e2.dynamicProps,
      dynamicChildren: e2.dynamicChildren,
      appContext: e2.appContext,
      dirs: e2.dirs,
      transition: f2,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: e2.component,
      suspense: e2.suspense,
      ssContent: e2.ssContent && Ge2(e2.ssContent),
      ssFallback: e2.ssFallback && Ge2(e2.ssFallback),
      placeholder: e2.placeholder,
      el: e2.el,
      anchor: e2.anchor,
      ctx: e2.ctx,
      ce: e2.ce
    };
    return f2 && s2 && Ft2(
      u2,
      f2.clone(u2)
    ), u2;
  }
  __name(Ge2, "Ge");
  function So2(e2 = " ", t = 0) {
    return pe2(nn2, null, e2, t);
  }
  __name(So2, "So");
  function Mn2(e2 = "", t = false) {
    return t ? (Mt2(), jr2(he2, null, e2)) : pe2(he2, null, e2);
  }
  __name(Mn2, "Mn");
  function Oe2(e2) {
    return e2 == null || typeof e2 == "boolean" ? pe2(he2) : F2(e2) ? pe2(
      Le2,
      null,
      // #3666, avoid reference pollution when reusing vnode
      e2.slice()
    ) : Xt2(e2) ? je2(e2) : pe2(nn2, null, String(e2));
  }
  __name(Oe2, "Oe");
  function je2(e2) {
    return e2.el === null && e2.patchFlag !== -1 || e2.memo ? e2 : Ge2(e2);
  }
  __name(je2, "je");
  function qn(e2, t) {
    let n2 = 0;
    const { shapeFlag: s2 } = e2;
    if (t == null)
      t = null;
    else if (F2(t))
      n2 = 16;
    else if (typeof t == "object")
      if (s2 & 65) {
        const r3 = t.default;
        r3 && (r3._c && (r3._d = false), qn(e2, r3()), r3._c && (r3._d = true));
        return;
      } else {
        n2 = 32;
        const r3 = t._;
        !r3 && !Ir2(t) ? t._ctx = Fe : r3 === 3 && Fe && (Fe.slots._ === 1 ? t._ = 1 : (t._ = 2, e2.patchFlag |= 1024));
      }
    else k3(t) ? (t = { default: t, _ctx: Fe }, n2 = 32) : (t = String(t), s2 & 64 ? (n2 = 16, t = [So2(t)]) : n2 = 8);
    e2.children = t, e2.shapeFlag |= n2;
  }
  __name(qn, "qn");
  function To2(...e2) {
    const t = {};
    for (let n2 = 0; n2 < e2.length; n2++) {
      const s2 = e2[n2];
      for (const r3 in s2)
        if (r3 === "class")
          t.class !== s2.class && (t.class = st([t.class, s2.class]));
        else if (r3 === "style")
          t.style = Rt([t.style, s2.style]);
        else if (Gt2(r3)) {
          const i = t[r3], o = s2[r3];
          o && i !== o && !(F2(i) && i.includes(o)) ? t[r3] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
          // the model listener.
          !Jt2(r3) && (t[r3] = o);
        } else r3 !== "" && (t[r3] = s2[r3]);
    }
    return t;
  }
  __name(To2, "To");
  function Me2(e2, t, n2, s2 = null) {
    We2(e2, t, 7, [
      n2,
      s2
    ]);
  }
  __name(Me2, "Me");
  var Co2 = Ar2();
  var Eo2 = 0;
  function Ao2(e2, t, n2) {
    const s2 = e2.type, r3 = (t ? t.appContext : e2.appContext) || Co2, i = {
      uid: Eo2++,
      vnode: e2,
      type: s2,
      parent: t,
      appContext: r3,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      job: null,
      scope: new ui2(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r3.provides),
      ids: t ? t.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: ao2(s2, r3),
      emitsOptions: so2(s2, r3),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: Z,
      // inheritAttrs
      inheritAttrs: s2.inheritAttrs,
      // state
      ctx: Z,
      data: Z,
      props: Z,
      attrs: Z,
      slots: Z,
      refs: Z,
      setupState: Z,
      setupContext: null,
      // suspense related
      suspense: n2,
      suspenseId: n2 ? n2.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = no2.bind(null, i), e2.ce && e2.ce(i), i;
  }
  __name(Ao2, "Ao");
  var lt2 = null;
  var Mo2 = /* @__PURE__ */ __name(() => lt2 || Fe, "Mo");
  var qt2;
  var Rn2;
  {
    const e2 = Qt2(), t = /* @__PURE__ */ __name((n2, s2) => {
      let r3;
      return (r3 = e2[n2]) || (r3 = e2[n2] = []), r3.push(s2), (i) => {
        r3.length > 1 ? r3.forEach((o) => o(i)) : r3[0](i);
      };
    }, "t");
    qt2 = t(
      "__VUE_INSTANCE_SETTERS__",
      (n2) => lt2 = n2
    ), Rn2 = t(
      "__VUE_SSR_SETTERS__",
      (n2) => Jn = n2
    );
  }
  var Gn = /* @__PURE__ */ __name((e2) => {
    const t = lt2;
    return qt2(e2), e2.scope.on(), () => {
      e2.scope.off(), qt2(t);
    };
  }, "Gn");
  var ms2 = /* @__PURE__ */ __name(() => {
    lt2 && lt2.scope.off(), qt2(null);
  }, "ms");
  function Kr2(e2) {
    return e2.vnode.shapeFlag & 4;
  }
  __name(Kr2, "Kr");
  var Jn = false;
  function Ro2(e2, t = false, n2 = false) {
    t && Rn2(t);
    const { props: s2, children: r3 } = e2.vnode, i = Kr2(e2);
    co2(e2, s2, i, t), ho2(e2, r3, n2 || t);
    const o = i ? Po2(e2, t) : void 0;
    return t && Rn2(false), o;
  }
  __name(Ro2, "Ro");
  function Po2(e2, t) {
    const n2 = e2.type;
    e2.accessCache = /* @__PURE__ */ Object.create(null), e2.proxy = new Proxy(e2.ctx, Zi2);
    const { setup: s2 } = n2;
    if (s2) {
      it2();
      const r3 = e2.setupContext = s2.length > 1 ? Lo2(e2) : null, i = Gn(e2), o = Ht2(
        s2,
        e2,
        0,
        [
          e2.props,
          r3
        ]
      ), l2 = Ws2(o);
      if (ot2(), i(), (l2 || e2.sp) && !Ct2(e2) && Yi2(e2), l2) {
        if (o.then(ms2, ms2), t)
          return o.then((f2) => {
            _s2(e2, f2);
          }).catch((f2) => {
            en2(f2, e2, 0);
          });
        e2.asyncDep = o;
      } else
        _s2(e2, o);
    } else
      Wr2(e2);
  }
  __name(Po2, "Po");
  function _s2(e2, t, n2) {
    k3(t) ? e2.type.__ssrInlineRender ? e2.ssrRender = t : e2.render = t : Y(t) && (e2.setupState = ur2(t)), Wr2(e2);
  }
  __name(_s2, "_s");
  function Wr2(e2, t, n2) {
    const s2 = e2.type;
    e2.render || (e2.render = s2.render || Ln2);
  }
  __name(Wr2, "Wr");
  var Io2 = {
    get(e2, t) {
      return fe(e2, "get", ""), e2[t];
    }
  };
  function Lo2(e2) {
    const t = /* @__PURE__ */ __name((n2) => {
      e2.exposed = n2 || {};
    }, "t");
    return {
      attrs: new Proxy(e2.attrs, Io2),
      slots: e2.slots,
      emit: e2.emit,
      expose: t
    };
  }
  __name(Lo2, "Lo");
  function Zn2(e2) {
    return e2.exposed ? e2.exposeProxy || (e2.exposeProxy = new Proxy(ur2(Li2(e2.exposed)), {
      get(t, n2) {
        if (n2 in t)
          return t[n2];
        if (n2 in Et2)
          return Et2[n2](e2);
      },
      has(t, n2) {
        return n2 in t || n2 in Et2;
      }
    })) : e2.proxy;
  }
  __name(Zn2, "Zn");
  function Oo2(e2) {
    return k3(e2) && "__vccOpts" in e2;
  }
  __name(Oo2, "Oo");
  var J = /* @__PURE__ */ __name((e2, t) => /* @__PURE__ */ Hi2(e2, t, Jn), "J");
  function Fo2(e2, t, n2) {
    try {
      Yt2(-1);
      const s2 = arguments.length;
      return s2 === 2 ? Y(t) && !F2(t) ? Xt2(t) ? pe2(e2, null, [t]) : pe2(e2, t) : pe2(e2, null, t) : (s2 > 3 ? n2 = Array.prototype.slice.call(arguments, 2) : s2 === 3 && Xt2(n2) && (n2 = [n2]), pe2(e2, t, n2));
    } finally {
      Yt2(1);
    }
  }
  __name(Fo2, "Fo");
  var $o2 = "3.5.34";
  var Pn2;
  var vs2 = typeof window < "u" && window.trustedTypes;
  if (vs2)
    try {
      Pn2 = /* @__PURE__ */ vs2.createPolicy("vue", {
        createHTML: /* @__PURE__ */ __name((e2) => e2, "createHTML")
      });
    } catch {
    }
  var Ur2 = Pn2 ? (e2) => Pn2.createHTML(e2) : (e2) => e2;
  var No2 = "http://www.w3.org/2000/svg";
  var Do2 = "http://www.w3.org/1998/Math/MathML";
  var ze2 = typeof document < "u" ? document : null;
  var xs2 = ze2 && /* @__PURE__ */ ze2.createElement("template");
  var Ho2 = {
    insert: /* @__PURE__ */ __name((e2, t, n2) => {
      t.insertBefore(e2, n2 || null);
    }, "insert"),
    remove: /* @__PURE__ */ __name((e2) => {
      const t = e2.parentNode;
      t && t.removeChild(e2);
    }, "remove"),
    createElement: /* @__PURE__ */ __name((e2, t, n2, s2) => {
      const r3 = t === "svg" ? ze2.createElementNS(No2, e2) : t === "mathml" ? ze2.createElementNS(Do2, e2) : n2 ? ze2.createElement(e2, { is: n2 }) : ze2.createElement(e2);
      return e2 === "select" && s2 && s2.multiple != null && r3.setAttribute("multiple", s2.multiple), r3;
    }, "createElement"),
    createText: /* @__PURE__ */ __name((e2) => ze2.createTextNode(e2), "createText"),
    createComment: /* @__PURE__ */ __name((e2) => ze2.createComment(e2), "createComment"),
    setText: /* @__PURE__ */ __name((e2, t) => {
      e2.nodeValue = t;
    }, "setText"),
    setElementText: /* @__PURE__ */ __name((e2, t) => {
      e2.textContent = t;
    }, "setElementText"),
    parentNode: /* @__PURE__ */ __name((e2) => e2.parentNode, "parentNode"),
    nextSibling: /* @__PURE__ */ __name((e2) => e2.nextSibling, "nextSibling"),
    querySelector: /* @__PURE__ */ __name((e2) => ze2.querySelector(e2), "querySelector"),
    setScopeId(e2, t) {
      e2.setAttribute(t, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(e2, t, n2, s2, r3, i) {
      const o = n2 ? n2.previousSibling : t.lastChild;
      if (r3 && (r3 === i || r3.nextSibling))
        for (; t.insertBefore(r3.cloneNode(true), n2), !(r3 === i || !(r3 = r3.nextSibling)); )
          ;
      else {
        xs2.innerHTML = Ur2(
          s2 === "svg" ? `<svg>${e2}</svg>` : s2 === "mathml" ? `<math>${e2}</math>` : e2
        );
        const l2 = xs2.content;
        if (s2 === "svg" || s2 === "mathml") {
          const f2 = l2.firstChild;
          for (; f2.firstChild; )
            l2.appendChild(f2.firstChild);
          l2.removeChild(f2);
        }
        t.insertBefore(l2, n2);
      }
      return [
        // first
        o ? o.nextSibling : t.firstChild,
        // last
        n2 ? n2.previousSibling : t.lastChild
      ];
    }
  };
  var Ue2 = "transition";
  var vt2 = "animation";
  var Nt = /* @__PURE__ */ Symbol("_vtc");
  var kr2 = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  var zo2 = /* @__PURE__ */ we2(
    {},
    br2,
    kr2
  );
  var Bo2 = /* @__PURE__ */ __name((e2) => (e2.displayName = "Transition", e2.props = zo2, e2), "Bo");
  var jo2 = /* @__PURE__ */ Bo2(
    (e2, { slots: t }) => Fo2(ki2, Vo2(e2), t)
  );
  var et = /* @__PURE__ */ __name((e2, t = []) => {
    F2(e2) ? e2.forEach((n2) => n2(...t)) : e2 && e2(...t);
  }, "et");
  var bs2 = /* @__PURE__ */ __name((e2) => e2 ? F2(e2) ? e2.some((t) => t.length > 1) : e2.length > 1 : false, "bs");
  function Vo2(e2) {
    const t = {};
    for (const T in e2)
      T in kr2 || (t[T] = e2[T]);
    if (e2.css === false)
      return t;
    const {
      name: n2 = "v",
      type: s2,
      duration: r3,
      enterFromClass: i = `${n2}-enter-from`,
      enterActiveClass: o = `${n2}-enter-active`,
      enterToClass: l2 = `${n2}-enter-to`,
      appearFromClass: f2 = i,
      appearActiveClass: d2 = o,
      appearToClass: u2 = l2,
      leaveFromClass: p3 = `${n2}-leave-from`,
      leaveActiveClass: b4 = `${n2}-leave-active`,
      leaveToClass: R3 = `${n2}-leave-to`
    } = e2, $2 = Ko2(r3), C = $2 && $2[0], L = $2 && $2[1], {
      onBeforeEnter: O,
      onEnter: I2,
      onEnterCancelled: N,
      onLeave: B2,
      onLeaveCancelled: Q2,
      onBeforeAppear: se2 = O,
      onAppear: ae2 = I2,
      onAppearCancelled: q = N
    } = t, P2 = /* @__PURE__ */ __name((T, X2, re2, ve2) => {
      T._enterCancelled = ve2, tt2(T, X2 ? u2 : l2), tt2(T, X2 ? d2 : o), re2 && re2();
    }, "P"), z2 = /* @__PURE__ */ __name((T, X2) => {
      T._isLeaving = false, tt2(T, p3), tt2(T, R3), tt2(T, b4), X2 && X2();
    }, "z"), j2 = /* @__PURE__ */ __name((T) => (X2, re2) => {
      const ve2 = T ? ae2 : I2, Je2 = /* @__PURE__ */ __name(() => P2(X2, T, re2), "Je");
      et(ve2, [X2, Je2]), ys2(() => {
        tt2(X2, T ? f2 : i), He2(X2, T ? u2 : l2), bs2(ve2) || ws2(X2, s2, C, Je2);
      });
    }, "j");
    return we2(t, {
      onBeforeEnter(T) {
        et(O, [T]), He2(T, i), He2(T, o);
      },
      onBeforeAppear(T) {
        et(se2, [T]), He2(T, f2), He2(T, d2);
      },
      onEnter: j2(false),
      onAppear: j2(true),
      onLeave(T, X2) {
        T._isLeaving = true;
        const re2 = /* @__PURE__ */ __name(() => z2(T, X2), "re");
        He2(T, p3), T._enterCancelled ? (He2(T, b4), Cs2(T)) : (Cs2(T), He2(T, b4)), ys2(() => {
          T._isLeaving && (tt2(T, p3), He2(T, R3), bs2(B2) || ws2(T, s2, L, re2));
        }), et(B2, [T, re2]);
      },
      onEnterCancelled(T) {
        P2(T, false, void 0, true), et(N, [T]);
      },
      onAppearCancelled(T) {
        P2(T, true, void 0, true), et(q, [T]);
      },
      onLeaveCancelled(T) {
        z2(T), et(Q2, [T]);
      }
    });
  }
  __name(Vo2, "Vo");
  function Ko2(e2) {
    if (e2 == null)
      return null;
    if (Y(e2))
      return [gn2(e2.enter), gn2(e2.leave)];
    {
      const t = gn2(e2);
      return [t, t];
    }
  }
  __name(Ko2, "Ko");
  function gn2(e2) {
    return si2(e2);
  }
  __name(gn2, "gn");
  function He2(e2, t) {
    t.split(/\s+/).forEach((n2) => n2 && e2.classList.add(n2)), (e2[Nt] || (e2[Nt] = /* @__PURE__ */ new Set())).add(t);
  }
  __name(He2, "He");
  function tt2(e2, t) {
    t.split(/\s+/).forEach((s2) => s2 && e2.classList.remove(s2));
    const n2 = e2[Nt];
    n2 && (n2.delete(t), n2.size || (e2[Nt] = void 0));
  }
  __name(tt2, "tt");
  function ys2(e2) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e2);
    });
  }
  __name(ys2, "ys");
  var Wo2 = 0;
  function ws2(e2, t, n2, s2) {
    const r3 = e2._endId = ++Wo2, i = /* @__PURE__ */ __name(() => {
      r3 === e2._endId && s2();
    }, "i");
    if (n2 != null)
      return setTimeout(i, n2);
    const { type: o, timeout: l2, propCount: f2 } = Uo2(e2, t);
    if (!o)
      return s2();
    const d2 = o + "end";
    let u2 = 0;
    const p3 = /* @__PURE__ */ __name(() => {
      e2.removeEventListener(d2, b4), i();
    }, "p"), b4 = /* @__PURE__ */ __name((R3) => {
      R3.target === e2 && ++u2 >= f2 && p3();
    }, "b");
    setTimeout(() => {
      u2 < f2 && p3();
    }, l2 + 1), e2.addEventListener(d2, b4);
  }
  __name(ws2, "ws");
  function Uo2(e2, t) {
    const n2 = window.getComputedStyle(e2), s2 = /* @__PURE__ */ __name(($2) => (n2[$2] || "").split(", "), "s"), r3 = s2(`${Ue2}Delay`), i = s2(`${Ue2}Duration`), o = Ss2(r3, i), l2 = s2(`${vt2}Delay`), f2 = s2(`${vt2}Duration`), d2 = Ss2(l2, f2);
    let u2 = null, p3 = 0, b4 = 0;
    t === Ue2 ? o > 0 && (u2 = Ue2, p3 = o, b4 = i.length) : t === vt2 ? d2 > 0 && (u2 = vt2, p3 = d2, b4 = f2.length) : (p3 = Math.max(o, d2), u2 = p3 > 0 ? o > d2 ? Ue2 : vt2 : null, b4 = u2 ? u2 === Ue2 ? i.length : f2.length : 0);
    const R3 = u2 === Ue2 && /\b(?:transform|all)(?:,|$)/.test(
      s2(`${Ue2}Property`).toString()
    );
    return {
      type: u2,
      timeout: p3,
      propCount: b4,
      hasTransform: R3
    };
  }
  __name(Uo2, "Uo");
  function Ss2(e2, t) {
    for (; e2.length < t.length; )
      e2 = e2.concat(e2);
    return Math.max(...t.map((n2, s2) => Ts2(n2) + Ts2(e2[s2])));
  }
  __name(Ss2, "Ss");
  function Ts2(e2) {
    return e2 === "auto" ? 0 : Number(e2.slice(0, -1).replace(",", ".")) * 1e3;
  }
  __name(Ts2, "Ts");
  function Cs2(e2) {
    return (e2 ? e2.ownerDocument : document).body.offsetHeight;
  }
  __name(Cs2, "Cs");
  function ko2(e2, t, n2) {
    const s2 = e2[Nt];
    s2 && (t = (t ? [t, ...s2] : [...s2]).join(" ")), t == null ? e2.removeAttribute("class") : n2 ? e2.setAttribute("class", t) : e2.className = t;
  }
  __name(ko2, "ko");
  var Es2 = /* @__PURE__ */ Symbol("_vod");
  var Yo2 = /* @__PURE__ */ Symbol("_vsh");
  var Xo2 = /* @__PURE__ */ Symbol("");
  var qo2 = /(?:^|;)\s*display\s*:/;
  function Go2(e2, t, n2) {
    const s2 = e2.style, r3 = ne2(n2);
    let i = false;
    if (n2 && !r3) {
      if (t)
        if (ne2(t))
          for (const o of t.split(";")) {
            const l2 = o.slice(0, o.indexOf(":")).trim();
            n2[l2] == null && xt2(s2, l2, "");
          }
        else
          for (const o in t)
            n2[o] == null && xt2(s2, o, "");
      for (const o in n2) {
        o === "display" && (i = true);
        const l2 = n2[o];
        l2 != null ? Zo2(
          e2,
          o,
          !ne2(t) && t ? t[o] : void 0,
          l2
        ) || xt2(s2, o, l2) : xt2(s2, o, "");
      }
    } else if (r3) {
      if (t !== n2) {
        const o = s2[Xo2];
        o && (n2 += ";" + o), s2.cssText = n2, i = qo2.test(n2);
      }
    } else t && e2.removeAttribute("style");
    Es2 in e2 && (e2[Es2] = i ? s2.display : "", e2[Yo2] && (s2.display = "none"));
  }
  __name(Go2, "Go");
  var As2 = /\s*!important$/;
  function xt2(e2, t, n2) {
    if (F2(n2))
      n2.forEach((s2) => xt2(e2, t, s2));
    else if (n2 == null && (n2 = ""), t.startsWith("--"))
      e2.setProperty(t, n2);
    else {
      const s2 = Jo2(e2, t);
      As2.test(n2) ? e2.setProperty(
        ct(s2),
        n2.replace(As2, ""),
        "important"
      ) : e2[s2] = n2;
    }
  }
  __name(xt2, "xt");
  var Ms2 = ["Webkit", "Moz", "ms"];
  var mn2 = {};
  function Jo2(e2, t) {
    const n2 = mn2[t];
    if (n2)
      return n2;
    let s2 = Se2(t);
    if (s2 !== "filter" && s2 in e2)
      return mn2[t] = s2;
    s2 = ks2(s2);
    for (let r3 = 0; r3 < Ms2.length; r3++) {
      const i = Ms2[r3] + s2;
      if (i in e2)
        return mn2[t] = i;
    }
    return t;
  }
  __name(Jo2, "Jo");
  function Zo2(e2, t, n2, s2) {
    return e2.tagName === "TEXTAREA" && (t === "width" || t === "height") && ne2(s2) && n2 === s2;
  }
  __name(Zo2, "Zo");
  var Rs2 = "http://www.w3.org/1999/xlink";
  function Ps2(e2, t, n2, s2, r3, i = fi2(t)) {
    s2 && t.startsWith("xlink:") ? n2 == null ? e2.removeAttributeNS(Rs2, t.slice(6, t.length)) : e2.setAttributeNS(Rs2, t, n2) : n2 == null || i && !Xs2(n2) ? e2.removeAttribute(t) : e2.setAttribute(
      t,
      i ? "" : $e2(n2) ? String(n2) : n2
    );
  }
  __name(Ps2, "Ps");
  function Is2(e2, t, n2, s2, r3) {
    if (t === "innerHTML" || t === "textContent") {
      n2 != null && (e2[t] = t === "innerHTML" ? Ur2(n2) : n2);
      return;
    }
    const i = e2.tagName;
    if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
    !i.includes("-")) {
      const l2 = i === "OPTION" ? e2.getAttribute("value") || "" : e2.value, f2 = n2 == null ? (
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        e2.type === "checkbox" ? "on" : ""
      ) : String(n2);
      (l2 !== f2 || !("_value" in e2)) && (e2.value = f2), n2 == null && e2.removeAttribute(t), e2._value = n2;
      return;
    }
    let o = false;
    if (n2 === "" || n2 == null) {
      const l2 = typeof e2[t];
      l2 === "boolean" ? n2 = Xs2(n2) : n2 == null && l2 === "string" ? (n2 = "", o = true) : l2 === "number" && (n2 = 0, o = true);
    }
    try {
      e2[t] = n2;
    } catch {
    }
    o && e2.removeAttribute(r3 || t);
  }
  __name(Is2, "Is");
  function Qo2(e2, t, n2, s2) {
    e2.addEventListener(t, n2, s2);
  }
  __name(Qo2, "Qo");
  function el2(e2, t, n2, s2) {
    e2.removeEventListener(t, n2, s2);
  }
  __name(el2, "el");
  var Ls2 = /* @__PURE__ */ Symbol("_vei");
  function tl2(e2, t, n2, s2, r3 = null) {
    const i = e2[Ls2] || (e2[Ls2] = {}), o = i[t];
    if (s2 && o)
      o.value = s2;
    else {
      const [l2, f2] = nl2(t);
      if (s2) {
        const d2 = i[t] = il2(
          s2,
          r3
        );
        Qo2(e2, l2, d2, f2);
      } else o && (el2(e2, l2, o, f2), i[t] = void 0);
    }
  }
  __name(tl2, "tl");
  var Os2 = /(?:Once|Passive|Capture)$/;
  function nl2(e2) {
    let t;
    if (Os2.test(e2)) {
      t = {};
      let s2;
      for (; s2 = e2.match(Os2); )
        e2 = e2.slice(0, e2.length - s2[0].length), t[s2[0].toLowerCase()] = true;
    }
    return [e2[2] === ":" ? e2.slice(3) : ct(e2.slice(2)), t];
  }
  __name(nl2, "nl");
  var _n2 = 0;
  var sl2 = /* @__PURE__ */ Promise.resolve();
  var rl2 = /* @__PURE__ */ __name(() => _n2 || (sl2.then(() => _n2 = 0), _n2 = Date.now()), "rl");
  function il2(e2, t) {
    const n2 = /* @__PURE__ */ __name((s2) => {
      if (!s2._vts)
        s2._vts = Date.now();
      else if (s2._vts <= n2.attached)
        return;
      We2(
        ol2(s2, n2.value),
        t,
        5,
        [s2]
      );
    }, "n");
    return n2.value = e2, n2.attached = rl2(), n2;
  }
  __name(il2, "il");
  function ol2(e2, t) {
    if (F2(t)) {
      const n2 = e2.stopImmediatePropagation;
      return e2.stopImmediatePropagation = () => {
        n2.call(e2), e2._stopped = true;
      }, t.map(
        (s2) => (r3) => !r3._stopped && s2 && s2(r3)
      );
    } else
      return t;
  }
  __name(ol2, "ol");
  var Fs2 = /* @__PURE__ */ __name((e2) => e2.charCodeAt(0) === 111 && e2.charCodeAt(1) === 110 && // lowercase letter
  e2.charCodeAt(2) > 96 && e2.charCodeAt(2) < 123, "Fs");
  var ll2 = /* @__PURE__ */ __name((e2, t, n2, s2, r3, i) => {
    const o = r3 === "svg";
    t === "class" ? ko2(e2, s2, o) : t === "style" ? Go2(e2, n2, s2) : Gt2(t) ? Jt2(t) || tl2(e2, t, n2, s2, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : cl2(e2, t, s2, o)) ? (Is2(e2, t, s2), !e2.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ps2(e2, t, s2, o, i, t !== "value")) : (
      /* #11081 force set props for possible async custom element */
      e2._isVueCE && // #12408 check if it's declared prop or it's async custom element
      (fl2(e2, t) || // @ts-expect-error _def is private
      e2._def.__asyncLoader && (/[A-Z]/.test(t) || !ne2(s2))) ? Is2(e2, Se2(t), s2, i, t) : (t === "true-value" ? e2._trueValue = s2 : t === "false-value" && (e2._falseValue = s2), Ps2(e2, t, s2, o))
    );
  }, "ll");
  function cl2(e2, t, n2, s2) {
    if (s2)
      return !!(t === "innerHTML" || t === "textContent" || t in e2 && Fs2(t) && k3(n2));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e2.tagName === "IFRAME" || t === "form" || t === "list" && e2.tagName === "INPUT" || t === "type" && e2.tagName === "TEXTAREA")
      return false;
    if (t === "width" || t === "height") {
      const r3 = e2.tagName;
      if (r3 === "IMG" || r3 === "VIDEO" || r3 === "CANVAS" || r3 === "SOURCE")
        return false;
    }
    return Fs2(t) && ne2(n2) ? false : t in e2;
  }
  __name(cl2, "cl");
  function fl2(e2, t) {
    const n2 = (
      // @ts-expect-error _def is private
      e2._def.props
    );
    if (!n2)
      return false;
    const s2 = Se2(t);
    return Array.isArray(n2) ? n2.some((r3) => Se2(r3) === s2) : Object.keys(n2).some((r3) => Se2(r3) === s2);
  }
  __name(fl2, "fl");
  var al2 = ["ctrl", "shift", "alt", "meta"];
  var ul = {
    stop: /* @__PURE__ */ __name((e2) => e2.stopPropagation(), "stop"),
    prevent: /* @__PURE__ */ __name((e2) => e2.preventDefault(), "prevent"),
    self: /* @__PURE__ */ __name((e2) => e2.target !== e2.currentTarget, "self"),
    ctrl: /* @__PURE__ */ __name((e2) => !e2.ctrlKey, "ctrl"),
    shift: /* @__PURE__ */ __name((e2) => !e2.shiftKey, "shift"),
    alt: /* @__PURE__ */ __name((e2) => !e2.altKey, "alt"),
    meta: /* @__PURE__ */ __name((e2) => !e2.metaKey, "meta"),
    left: /* @__PURE__ */ __name((e2) => "button" in e2 && e2.button !== 0, "left"),
    middle: /* @__PURE__ */ __name((e2) => "button" in e2 && e2.button !== 1, "middle"),
    right: /* @__PURE__ */ __name((e2) => "button" in e2 && e2.button !== 2, "right"),
    exact: /* @__PURE__ */ __name((e2, t) => al2.some((n2) => e2[`${n2}Key`] && !t.includes(n2)), "exact")
  };
  var $s2 = /* @__PURE__ */ __name((e2, t) => {
    if (!e2) return e2;
    const n2 = e2._withMods || (e2._withMods = {}), s2 = t.join(".");
    return n2[s2] || (n2[s2] = ((r3, ...i) => {
      for (let o = 0; o < t.length; o++) {
        const l2 = ul[t[o]];
        if (l2 && l2(r3, t)) return;
      }
      return e2(r3, ...i);
    }));
  }, "$s");
  var dl = /* @__PURE__ */ we2({ patchProp: ll2 }, Ho2);
  var Ns2;
  function hl2() {
    return Ns2 || (Ns2 = go2(dl));
  }
  __name(hl2, "hl");
  var Ds2 = /* @__PURE__ */ __name(((...e2) => {
    const t = hl2().createApp(...e2), { mount: n2 } = t;
    return t.mount = (s2) => {
      const r3 = gl(s2);
      if (!r3) return;
      const i = t._component;
      !k3(i) && !i.render && !i.template && (i.template = r3.innerHTML), r3.nodeType === 1 && (r3.textContent = "");
      const o = n2(r3, false, pl(r3));
      return r3 instanceof Element && (r3.removeAttribute("v-cloak"), r3.setAttribute("data-v-app", "")), o;
    }, t;
  }), "Ds");
  function pl(e2) {
    if (e2 instanceof SVGElement)
      return "svg";
    if (typeof MathMLElement == "function" && e2 instanceof MathMLElement)
      return "mathml";
  }
  __name(pl, "pl");
  function gl(e2) {
    return ne2(e2) ? document.querySelector(e2) : e2;
  }
  __name(gl, "gl");
  var ml = ["width", "height", "viewBox"];
  var _l = ["d", "stroke-width"];
  var vl = /* @__PURE__ */ Cr2({
    __name: "ResizeArc",
    props: {
      panelWidth: {},
      panelHeight: {},
      near: { type: Boolean },
      borderRadius: {},
      gap: {},
      strokeDefault: {},
      strokeNear: {},
      extend: {}
    },
    setup(e2) {
      const t = e2, n2 = J(() => t.borderRadius ?? 12), s2 = J(() => t.gap ?? 8), r3 = J(() => t.strokeDefault ?? 4), i = J(() => t.strokeNear ?? 8), o = J(() => t.extend ?? 12), l2 = J(() => t.near ? i.value : r3.value), f2 = J(() => n2.value + s2.value + l2.value / 2), d2 = J(() => t.panelWidth - n2.value), u2 = J(() => t.panelHeight - n2.value), p3 = J(() => t.panelHeight + s2.value + l2.value / 2), b4 = J(() => t.panelWidth + s2.value + l2.value / 2), R3 = J(() => d2.value - o.value - l2.value / 2), $2 = J(() => u2.value - o.value - l2.value / 2), C = J(() => {
        const I2 = b4.value + l2.value / 2, N = p3.value + l2.value / 2;
        return Math.max(I2 - R3.value, N - $2.value);
      }), L = /* @__PURE__ */ __name((I2, N) => ({
        x: I2 - R3.value,
        y: N - $2.value
      }), "L"), O = J(() => {
        const I2 = o.value, N = f2.value, B2 = d2.value, Q2 = u2.value, se2 = p3.value, ae2 = b4.value, q = L(B2 - I2, se2), P2 = L(B2, se2), z2 = L(ae2, Q2), j2 = L(ae2, Q2 - I2);
        return [
          `M ${q.x},${q.y}`,
          `L ${P2.x},${P2.y}`,
          `A ${N},${N} 0 0,0 ${z2.x},${z2.y}`,
          `L ${j2.x},${j2.y}`
        ].join(" ");
      });
      return (I2, N) => (Mt2(), An2("svg", {
        class: "xlxz-float-panel__resize-svg",
        width: C.value,
        height: C.value,
        viewBox: `0 0 ${C.value} ${C.value}`,
        style: { overflow: "visible" }
      }, [
        Be2("path", {
          class: st(["resize-arc", { "resize-arc--near": e2.near }]),
          d: O.value,
          "stroke-width": l2.value
        }, null, 10, _l)
      ], 8, ml));
    }
  });
  var xl = {
    key: 0,
    class: "xlxz-float-panel__title"
  };
  var bl = { class: "xlxz-float-panel__body" };
  var yl = ["innerHTML"];
  var vn2 = 80;
  var Hs2 = 12;
  var zs2 = 8;
  var Bs2 = 12;
  var Vt2 = 8;
  var js2 = /* @__PURE__ */ Cr2({
    __name: "FloatingPanel",
    props: {
      title: {},
      content: {},
      state: {},
      minWidth: {},
      minHeight: {},
      maxWidth: {},
      maxHeight: {},
      onClose: { type: Function }
    },
    setup(e2) {
      const t = e2, n2 = /* @__PURE__ */ De2(), s2 = /* @__PURE__ */ De2(), r3 = /* @__PURE__ */ De2(), i = /* @__PURE__ */ De2(), o = /* @__PURE__ */ De2(false), l2 = /* @__PURE__ */ De2(false), f2 = /* @__PURE__ */ De2(false), d2 = /* @__PURE__ */ De2(false), u2 = /* @__PURE__ */ De2(false);
      let p3 = 0, b4 = 0, R3 = 0, $2 = 0, C = 0, L = 0, O = 0, I2 = 0;
      const N = J(() => t.minWidth ?? 200), B2 = J(() => t.minHeight ?? 120), Q2 = J(() => t.maxWidth ?? window.innerWidth - 32), se2 = J(() => t.maxHeight ?? window.innerHeight - 32), ae2 = J(() => ({
        left: `${t.state.x}px`,
        top: `${t.state.y}px`,
        width: `${t.state.width}px`,
        height: `${t.state.height}px`
      })), q = J(() => {
        const G = zs2 + Vt2, ee2 = zs2 + Vt2, ue2 = Hs2 + Bs2 + Vt2 / 2, ie2 = Hs2 + Bs2 + Vt2 / 2, xe2 = ue2 + G, le = ie2 + ee2;
        return {
          position: "absolute",
          right: `-${G}px`,
          bottom: `-${ee2}px`,
          width: `${xe2}px`,
          height: `${le}px`,
          pointerEvents: "none",
          cursor: "nwse-resize"
        };
      });
      function P2(G) {
        if (o.value || l2.value) return;
        const ee2 = G.clientX, ue2 = G.clientY;
        if (s2.value) {
          const ie2 = s2.value.getBoundingClientRect(), xe2 = ie2.left + ie2.width / 2, le = ie2.top + ie2.height / 2;
          f2.value = Math.hypot(ee2 - xe2, ue2 - le) < vn2;
        }
        if (r3.value) {
          const ie2 = r3.value.getBoundingClientRect(), xe2 = ie2.top + ie2.height / 2, le = ee2 >= ie2.left - 30 && ee2 <= ie2.right + 30;
          d2.value = le && Math.abs(ue2 - xe2) < vn2;
        }
        if (n2.value) {
          const ie2 = n2.value.getBoundingClientRect(), xe2 = ie2.right, le = ie2.bottom;
          u2.value = Math.hypot(ee2 - xe2, ue2 - le) < vn2;
        }
      }
      __name(P2, "P");
      function z2(G) {
        o.value = true, p3 = G.clientX, b4 = G.clientY, R3 = t.state.x, $2 = t.state.y, document.addEventListener("mousemove", j2), document.addEventListener("mouseup", T);
      }
      __name(z2, "z");
      function j2(G) {
        let ee2 = R3 + (G.clientX - p3), ue2 = $2 + (G.clientY - b4);
        ee2 = Math.max(0, Math.min(ee2, window.innerWidth - t.state.width)), ue2 = Math.max(0, Math.min(ue2, window.innerHeight - t.state.height - 40)), t.state.x = ee2, t.state.y = ue2;
      }
      __name(j2, "j");
      function T() {
        o.value = false, document.removeEventListener("mousemove", j2), document.removeEventListener("mouseup", T);
      }
      __name(T, "T");
      function X2(G) {
        l2.value = true, C = G.clientX, L = G.clientY, O = t.state.width, I2 = t.state.height, document.addEventListener("mousemove", re2), document.addEventListener("mouseup", ve2);
      }
      __name(X2, "X");
      function re2(G) {
        let ee2 = O + (G.clientX - C), ue2 = I2 + (G.clientY - L);
        ee2 = Math.max(N.value, Math.min(ee2, Q2.value)), ue2 = Math.max(B2.value, Math.min(ue2, se2.value)), t.state.width = ee2, t.state.height = ue2;
      }
      __name(re2, "re");
      function ve2() {
        l2.value = false, document.removeEventListener("mousemove", re2), document.removeEventListener("mouseup", ve2);
      }
      __name(ve2, "ve");
      function Je2() {
        t.onClose();
      }
      __name(Je2, "Je");
      return Er2(() => {
        document.addEventListener("mousemove", P2);
      }), Gi2(() => {
        document.removeEventListener("mousemove", P2), document.removeEventListener("mousemove", j2), document.removeEventListener("mouseup", T), document.removeEventListener("mousemove", re2), document.removeEventListener("mouseup", ve2);
      }), (G, ee2) => (Mt2(), jr2(jo2, { name: "xlxz-float-panel-anim" }, {
        default: vr2(() => [
          e2.state.visible ? (Mt2(), An2("div", {
            key: 0,
            class: "xlxz-float-panel-wrapper",
            style: Rt(ae2.value),
            ref_key: "wrapperEl",
            ref: n2
          }, [
            Be2("div", {
              class: st(["xlxz-float-panel", { "xlxz-float-panel--dragging": o.value }])
            }, [
              e2.title ? (Mt2(), An2("h3", xl, Gs2(e2.title), 1)) : Mn2("", true),
              Be2("div", bl, [
                Be2("div", { innerHTML: e2.content }, null, 8, yl)
              ])
            ], 2),
            Be2("button", {
              class: st(["xlxz-float-panel__close", { "xlxz-float-panel__close--near": f2.value }]),
              onClick: Je2,
              ref_key: "closeEl",
              ref: s2
            }, null, 2),
            Be2("div", {
              class: st(["xlxz-float-panel__drag-bar", {
                "xlxz-float-panel__drag-bar--near": d2.value,
                "xlxz-float-panel__drag-bar--dragging": o.value
              }]),
              onMousedown: $s2(z2, ["prevent"]),
              ref_key: "dragBarEl",
              ref: r3
            }, null, 34),
            Be2("div", {
              class: "xlxz-float-panel__resize",
              style: Rt(q.value),
              onMousedown: $s2(X2, ["prevent"]),
              ref_key: "resizeEl",
              ref: i
            }, [
              pe2(vl, {
                "panel-width": e2.state.width,
                "panel-height": e2.state.height,
                near: u2.value
              }, null, 8, ["panel-width", "panel-height", "near"])
            ], 36)
          ], 4)) : Mn2("", true)
        ]),
        _: 1
      }));
    }
  });
  var wl = `/* @xlxz/styles \u2014 \u8BBE\u8BA1\u53D8\u91CF */
:host, .xlxz-root {
  --xs-radius: 4px;
  --sm-radius: 6px;
  --md-radius: 8px;
  --lg-radius: 12px;

  --xs-space: 4px;
  --sm-space: 8px;
  --md-space: 16px;
  --lg-space: 24px;

  --font-xs: 11px;
  --font-sm: 12px;
  --font-md: 14px;
  --font-lg: 16px;

  --color-primary: #fb7299;
  --color-primary-hover: #f57fb9;
  --color-primary-light: rgba(251, 114, 153, 0.1);
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-error: #f5222d;
  --color-info: #1890ff;

  --color-bg: #ffffff;
  --color-bg-elevated: #ffffff;
  --color-bg-muted: #f5f5f5;
  --color-border: #e7e7e7;
  --color-text: #222222;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-shadow: rgba(0, 0, 0, 0.08);
  --color-shadow-lg: rgba(0, 0, 0, 0.12);

  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
`;
  var Sl = `/* FloatingPanel \u53EF\u62D6\u62FD\u6D6E\u52A8\u9762\u677F \u2014 visionOS \u98CE\u683C */
.xlxz-float-panel-wrapper {
  position: fixed;
  z-index: 99990;
}

/* \u9762\u677F\u4E3B\u4F53 */
.xlxz-float-panel {
  width: 100%;
  height: 100%;
  background: var(--color-bg-elevated, #fff);
  border: 1px solid var(--color-border, #e7e7e7);
  border-radius: var(--lg-radius, 12px);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow var(--transition-fast, 0.15s ease);
}

.xlxz-float-panel--dragging {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(0, 0, 0, 0.1);
}

.xlxz-float-panel__title {
  padding: 12px 16px 0;
  font-size: var(--font-md, 14px);
  font-weight: 600;
  color: var(--color-text, #222);
  margin: 0;
  user-select: none;
  flex-shrink: 0;
}

.xlxz-float-panel__body {
  flex: 1;
  overflow: auto;
  padding: var(--md-space, 16px);
}

/* \u2550\u2550\u2550 \u73AF\u5F62\u63A7\u4EF6\u6BB5 \u2550\u2550\u2550
 * \u6982\u5FF5\uFF1A\u9762\u677F\u5916\u6709\u4E00\u5708\u4E0D\u53EF\u89C1\u7684\u73AF\uFF0C\u63A7\u4EF6\u662F\u8FD9\u4E2A\u73AF\u7684\u53EF\u89C1\u7247\u6BB5\u3002
 * \u6240\u6709\u6BB5\u8DDD\u9762\u677F\u5E95\u8FB9 8px\uFF0C\u7C97\u7EC6\u548C\u5706\u89D2\u7EDF\u4E00\u3002
 */

/* \u5173\u95ED\u6761 \u2014 \u5E95\u90E8\u5DE6\u4FA7\u77ED\u6A2A\u6761 */
.xlxz-float-panel__close {
  position: absolute;
  top: calc(100% + 8px);
  left: 8px;
  width: 24px;
  height: 4px;
  border-radius: 2px;
  border: none;
  background: rgba(120, 120, 128, 0.3);
  cursor: pointer;
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              height 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              background 0.15s ease,
              border-radius 0.2s ease;
}

.xlxz-float-panel__close:hover {
  background: rgba(255, 95, 87, 0.8);
}

.xlxz-float-panel__close--near {
  width: 32px;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 95, 87, 0.5);
}

/* \u62D6\u52A8\u6761 \u2014 \u5E95\u90E8\u5C45\u4E2D\u957F\u6A2A\u6761 */
.xlxz-float-panel__drag-bar {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: rgba(120, 120, 128, 0.3);
  cursor: grab;
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              height 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              background 0.15s ease,
              border-radius 0.2s ease;
}

.xlxz-float-panel__drag-bar:active {
  cursor: grabbing;
}

.xlxz-float-panel__drag-bar--near {
  width: 55%;
  height: 8px;
  border-radius: 4px;
  background: rgba(120, 120, 128, 0.4);
}

.xlxz-float-panel__drag-bar--dragging {
  width: 55%;
  height: 8px;
  border-radius: 4px;
  background: var(--color-primary, #fb7299);
}

/* \u8C03\u6574\u5927\u5C0F\u624B\u67C4 \u2014 SVG \u5706\u5F27 */
.xlxz-float-panel__resize {
  pointer-events: none;
}

.xlxz-float-panel__resize-svg {
  pointer-events: stroke;
}

.resize-arc {
  fill: none;
  stroke: rgba(120, 120, 128, 0.3);
  stroke-linecap: round;
  transition: stroke 0.3s ease, stroke-width 0.3s ease, d 0.3s ease;
}

.resize-arc--near {
  stroke: rgba(120, 120, 128, 0.65);
}

/* \u8FDB\u5165/\u79BB\u5F00\u52A8\u753B */
.xlxz-float-panel-anim-enter-active {
  animation: xlxz-float-panel-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.xlxz-float-panel-anim-leave-active {
  animation: xlxz-float-panel-out 0.2s ease forwards;
}

@keyframes xlxz-float-panel-in {
  from { opacity: 0; transform: scale(0.92) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes xlxz-float-panel-out {
  from { opacity: 1; transform: scale(1) translateY(0); }
  to { opacity: 0; transform: scale(0.92) translateY(8px); }
}
`;
  var Vs2 = false;
  function Cl(e2) {
    const {
      title: t,
      content: n2 = "",
      width: s2 = 360,
      height: r3 = 280,
      position: i,
      minWidth: o = 200,
      minHeight: l2 = 120,
      maxWidth: f2,
      maxHeight: d2,
      minimizable: u2 = false,
      onClose: p3,
      onMinimize: b4
    } = e2;
    if (!Vs2) {
      const q = document.createElement("style");
      q.textContent = wl + `
` + Sl, document.head.appendChild(q), Vs2 = true;
    }
    const R3 = (i == null ? void 0 : i.x) ?? Math.max(0, (window.innerWidth - s2) / 2), $2 = (i == null ? void 0 : i.y) ?? Math.max(0, (window.innerHeight - r3) / 3), C = /* @__PURE__ */ jn2({
      visible: false,
      x: R3,
      y: $2,
      width: s2,
      height: r3
    });
    let L = null, O = null;
    function I2() {
      L || (L = document.createElement("div"), L.className = "xlxz-root", document.body.appendChild(L), O = Ds2(js2, {
        title: t,
        content: n2,
        state: C,
        minWidth: o,
        minHeight: l2,
        maxWidth: f2,
        maxHeight: d2,
        minimizable: u2,
        onClose: /* @__PURE__ */ __name(() => {
          C.visible = false, p3 == null || p3();
        }, "onClose"),
        onMinimize: /* @__PURE__ */ __name(() => {
          b4 == null || b4();
        }, "onMinimize")
      }), O.mount(L));
    }
    __name(I2, "I");
    function N() {
      C.visible = true, L || I2();
    }
    __name(N, "N");
    function B2() {
      C.visible = false;
    }
    __name(B2, "B");
    function Q2() {
      C.visible ? B2() : N();
    }
    __name(Q2, "Q");
    function se2(q) {
      O && L && (O.unmount(), O = Ds2(js2, {
        title: t,
        content: q,
        state: C,
        minWidth: o,
        minHeight: l2,
        maxWidth: f2,
        maxHeight: d2,
        minimizable: u2,
        onClose: /* @__PURE__ */ __name(() => {
          C.visible = false, p3 == null || p3();
        }, "onClose"),
        onMinimize: /* @__PURE__ */ __name(() => {
          b4 == null || b4();
        }, "onMinimize")
      }), O.mount(L));
    }
    __name(se2, "se");
    function ae2() {
      O == null || O.unmount(), L == null || L.remove(), L = null, O = null;
    }
    __name(ae2, "ae");
    return I2(), { show: N, hide: B2, toggle: Q2, destroy: ae2, setContent: se2, state: C };
  }
  __name(Cl, "Cl");

  // src/deepseek-export/config.ts
  var SCROLL_CONFIG = {
    /** 每次滚动的等待时间 (ms) */
    scrollDelay: 600,
    /** 最大滚动次数（防止死循环） */
    maxScrolls: 200,
    /** 没有新消息时重试次数 */
    retryOnEmpty: 2
  };
  function buildMarkdown(messages, title) {
    const time = (/* @__PURE__ */ new Date()).toLocaleString("zh-CN");
    let md = `# ${title}

> \u5BFC\u51FA: ${time} | \u5171 ${messages.length} \u6761

---

`;
    for (const m2 of messages) {
      if (m2.type === "user") {
        md += `### \u{1F464} \u7528\u6237

${m2.text}

`;
      } else {
        md += `### \u{1F916} DeepSeek

`;
        if (m2.think) {
          md += `<details>
<summary>\u{1F4AD} \u6DF1\u5EA6\u601D\u8003</summary>

${m2.think}

</details>

`;
        }
        md += `${m2.text}

`;
      }
      md += `---

`;
    }
    return md;
  }
  __name(buildMarkdown, "buildMarkdown");

  // src/deepseek-export/index.ts
  var nfStyle = document.createElement("style");
  nfStyle.textContent = v2.join("\n");
  document.head.appendChild(nfStyle);
  function extractMessage(el3) {
    const hasMarkdown = el3.querySelector(".ds-markdown");
    if (hasMarkdown) {
      const thinkBlock = el3.querySelector(".ds-think-content");
      let think;
      if (thinkBlock) {
        const thinkMd = thinkBlock.querySelector(".ds-markdown");
        think = thinkMd?.textContent?.trim();
      }
      const respMd = el3.querySelector(".ds-markdown.ds-assistant-message-main-content") ?? el3.querySelector(".ds-markdown");
      const text = respMd?.textContent?.trim() ?? "";
      return { type: "ai", text, think };
    } else {
      const msgDiv = el3.querySelector(".ds-message");
      const textDiv = msgDiv?.querySelector("div");
      const text = textDiv?.textContent?.trim() ?? "";
      return text ? { type: "user", text } : null;
    }
  }
  __name(extractMessage, "extractMessage");
  function collectMessages() {
    const items = document.querySelectorAll("[data-virtual-list-item-key]");
    const map = /* @__PURE__ */ new Map();
    for (const el3 of items) {
      const key = el3.getAttribute("data-virtual-list-item-key");
      if (map.has(key)) continue;
      const msg = extractMessage(el3);
      if (msg) map.set(key, msg);
    }
    return map;
  }
  __name(collectMessages, "collectMessages");
  function findScrollContainer() {
    const vList = document.querySelector(".ds-virtual-list");
    if (!vList) return null;
    const vStyle = window.getComputedStyle(vList);
    if (vStyle.overflowY === "auto" || vStyle.overflowY === "scroll") {
      return vList;
    }
    let el3 = vList.parentElement;
    while (el3) {
      const style = window.getComputedStyle(el3);
      if (style.overflowY === "auto" || style.overflowY === "scroll") return el3;
      el3 = el3.parentElement;
    }
    return null;
  }
  __name(findScrollContainer, "findScrollContainer");
  function sleep(ms3) {
    return new Promise((r3) => setTimeout(r3, ms3));
  }
  __name(sleep, "sleep");
  function downloadFile(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  __name(downloadFile, "downloadFile");
  var panel = null;
  var scrollNF = null;
  var countNF = null;
  function buildPanelHTML() {
    return `
<div style="display:flex;flex-direction:column;gap:12px;align-items:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div class="dse-dashboard">
    <div class="dse-dashboard__item">
      <div class="dse-dashboard__label">\u6EDA\u52A8\u8FDB\u5EA6</div>
      <number-flow id="dse-nf-scroll" class="dse-dashboard__value">0</number-flow><span id="dse-scroll-max" class="dse-dashboard__unit">/ 0</span>
    </div>
    <div class="dse-dashboard__item">
      <div class="dse-dashboard__label">\u5DF2\u6536\u96C6</div>
      <number-flow id="dse-nf-count" class="dse-dashboard__value">0</number-flow><span class="dse-dashboard__unit">\u6761</span>
    </div>
  </div>
  <div style="display:flex;gap:8px;width:100%">
    <button id="dse-btn-md" class="dse-panel-btn dse-panel-btn--primary" style="flex:1">\u5BFC\u51FA Markdown</button>
    <button id="dse-btn-json" class="dse-panel-btn" style="flex:1">\u5BFC\u51FA JSON</button>
  </div>
</div>`;
  }
  __name(buildPanelHTML, "buildPanelHTML");
  var PANEL_CSS = `
.dse-panel-btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fff;
  color: #333;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.dse-panel-btn:hover { border-color: #4d6bfe; color: #4d6bfe; }
.dse-panel-btn--primary {
  background: #4d6bfe;
  border-color: #4d6bfe;
  color: #fff;
}
.dse-panel-btn--primary:hover { background: #3d5be5; color: #fff; }
.dse-panel-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.dse-dashboard {
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: center;
}
.dse-dashboard__item {
  text-align: center;
}
.dse-dashboard__label {
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
}
.dse-dashboard__value {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  font-variant-numeric: tabular-nums;
}
.dse-dashboard__value number-flow {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  font-variant-numeric: tabular-nums;
}
.dse-dashboard__unit {
  font-size: 11px;
  color: #999;
  margin-left: 2px;
}
`;
  function setupPanel() {
    const s2 = document.createElement("style");
    s2.textContent = PANEL_CSS;
    document.head.appendChild(s2);
    panel = Cl({
      title: "DeepSeek \u5BFC\u51FA",
      content: buildPanelHTML(),
      width: 340,
      height: 200,
      position: { x: window.innerWidth - 360, y: window.innerHeight - 320 }
    });
    panel.show();
    setTimeout(() => {
      scrollNF = document.querySelector("#dse-nf-scroll");
      countNF = document.querySelector("#dse-nf-count");
      bindPanelButtons();
    }, 100);
  }
  __name(setupPanel, "setupPanel");
  function updateDashboard(scrollCur, scrollMax, msgCount) {
    if (!panel) return;
    if (scrollNF) scrollNF.update(scrollCur);
    if (countNF) countNF.update(msgCount);
    const maxLabel = document.querySelector("#dse-scroll-max");
    if (maxLabel) maxLabel.textContent = `/ ${scrollMax}`;
    const btnMd = document.querySelector("#dse-btn-md");
    const btnJson = document.querySelector("#dse-btn-json");
    if (btnMd) btnMd.disabled = true;
    if (btnJson) btnJson.disabled = true;
  }
  __name(updateDashboard, "updateDashboard");
  function bindPanelButtons() {
    const btnMd = document.querySelector("#dse-btn-md");
    const btnJson = document.querySelector("#dse-btn-json");
    btnMd?.addEventListener("click", () => doExport("md"));
    btnJson?.addEventListener("click", () => doExport("json"));
  }
  __name(bindPanelButtons, "bindPanelButtons");
  async function doExport(format) {
    const btnMd = document.querySelector("#dse-btn-md");
    const btnJson = document.querySelector("#dse-btn-json");
    if (btnMd) btnMd.disabled = true;
    if (btnJson) btnJson.disabled = true;
    hl("\u6B63\u5728\u6EDA\u52A8\u6536\u96C6\u5168\u90E8\u5BF9\u8BDD\u6D88\u606F\u2026", { type: "info", duration: 2e3 });
    const messages = await scrollCollectAll();
    if (messages.length === 0) {
      hl("\u672A\u627E\u5230\u4EFB\u4F55\u6D88\u606F", { type: "error" });
      if (btnMd) btnMd.disabled = false;
      if (btnJson) btnJson.disabled = false;
      return;
    }
    const title = document.title.replace(/ - DeepSeek$/, "") || "DeepSeek Chat";
    if (format === "md") {
      const md = buildMarkdown(messages, title);
      downloadFile(md, `${title}.md`, "text/markdown;charset=utf-8");
    } else {
      const json = JSON.stringify(messages, null, 2);
      downloadFile(json, `${title}.json`, "application/json;charset=utf-8");
    }
    hl(`\u5DF2\u5BFC\u51FA ${messages.length} \u6761\u6D88\u606F`, { type: "success" });
    if (btnMd) btnMd.disabled = false;
    if (btnJson) btnJson.disabled = false;
  }
  __name(doExport, "doExport");
  async function scrollCollectAll() {
    const container = findScrollContainer();
    if (!container) {
      hl("\u672A\u627E\u5230\u6EDA\u52A8\u5BB9\u5668\uFF0C\u5C06\u4EC5\u5BFC\u51FA\u5F53\u524D\u53EF\u89C1\u6D88\u606F", { type: "warning" });
      return [...collectMessages().values()];
    }
    const all = /* @__PURE__ */ new Map();
    const maxScroll = container.scrollHeight - container.clientHeight;
    updateDashboard(0, maxScroll, 0);
    for (let i = 0; i < SCROLL_CONFIG.maxScrolls; i++) {
      container.scrollTop = 0;
      await sleep(SCROLL_CONFIG.scrollDelay);
      const current = collectMessages();
      let newKeys = 0;
      for (const [key, msg] of current) {
        if (!all.has(key)) {
          all.set(key, msg);
          newKeys++;
        }
      }
      updateDashboard(container.scrollTop, maxScroll, all.size);
      if (newKeys === 0) break;
    }
    let emptyStreak = 0;
    for (let i = 0; i < SCROLL_CONFIG.maxScrolls; i++) {
      const current = collectMessages();
      let newKeys = 0;
      for (const [key, msg] of current) {
        if (!all.has(key)) {
          all.set(key, msg);
          newKeys++;
        }
      }
      updateDashboard(container.scrollTop, maxScroll, all.size);
      if (newKeys > 0) {
        emptyStreak = 0;
      } else {
        emptyStreak++;
      }
      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      if (atBottom && emptyStreak >= SCROLL_CONFIG.retryOnEmpty) break;
      container.scrollTop += container.clientHeight * 0.5;
      await sleep(SCROLL_CONFIG.scrollDelay);
    }
    return [...all.values()];
  }
  __name(scrollCollectAll, "scrollCollectAll");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupPanel);
  } else {
    setupPanel();
  }
})();
/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
