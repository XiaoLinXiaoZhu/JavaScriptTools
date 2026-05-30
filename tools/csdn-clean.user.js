// ==UserScript==
// @name                CSDN 页面净化
// @name:zh-CN          CSDN 页面净化
// @name:en             CSDN Page Cleaner
// @namespace           https://github.com/XiaoLinXiaoZhu/JavaScriptTools
// @version             0.1.0
// @description         清理 CSDN 页面广告、移除复制后缀、展开被折叠的文章、优化评论区显示。
// @description:en      Remove CSDN ads, clean clipboard suffix, auto-expand articles, and optimize comment area.
// @author              XLXZ
// @license             MIT
// @icon                https://www.google.com/s2/favicons?domain=csdn.net
// @match               *://blog.csdn.net/*
// @match               *://download.csdn.net/*
// @match               *://wenku.csdn.net/*
// @grant               GM_setClipboard
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_addStyle
// @grant               GM_registerMenuCommand
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/csdn-clean.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/csdn-clean.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // packages/components/dist/toast.js
  // @__NO_SIDE_EFFECTS__
  function An(t) {
    const e = /* @__PURE__ */ Object.create(null);
    for (const n of t.split(",")) e[n] = 1;
    return (n) => n in e;
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
  var Ir = /* @__PURE__ */ __name((t, e) => {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  }, "Ir");
  var Rr = Object.prototype.hasOwnProperty;
  var D = /* @__PURE__ */ __name((t, e) => Rr.call(t, e), "D");
  var P = Array.isArray;
  var ge = /* @__PURE__ */ __name((t) => Oe(t) === "[object Map]", "ge");
  var Nr = /* @__PURE__ */ __name((t) => Oe(t) === "[object Set]", "Nr");
  var Xn = /* @__PURE__ */ __name((t) => Oe(t) === "[object Date]", "Xn");
  var K = /* @__PURE__ */ __name((t) => typeof t == "function", "K");
  var W = /* @__PURE__ */ __name((t) => typeof t == "string", "W");
  var Tt = /* @__PURE__ */ __name((t) => typeof t == "symbol", "Tt");
  var V = /* @__PURE__ */ __name((t) => t !== null && typeof t == "object", "V");
  var Fs = /* @__PURE__ */ __name((t) => (V(t) || K(t)) && K(t.then) && K(t.catch), "Fs");
  var Is = Object.prototype.toString;
  var Oe = /* @__PURE__ */ __name((t) => Is.call(t), "Oe");
  var Lr = /* @__PURE__ */ __name((t) => Oe(t).slice(8, -1), "Lr");
  var Dr = /* @__PURE__ */ __name((t) => Oe(t) === "[object Object]", "Dr");
  var Mn = /* @__PURE__ */ __name((t) => W(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, "Mn");
  var me = /* @__PURE__ */ An(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  var Ue = /* @__PURE__ */ __name((t) => {
    const e = /* @__PURE__ */ Object.create(null);
    return ((n) => e[n] || (e[n] = t(n)));
  }, "Ue");
  var $r = /-\w/g;
  var dt = Ue(
    (t) => t.replace($r, (e) => e.slice(1).toUpperCase())
  );
  var Hr = /\B([A-Z])/g;
  var Zt = Ue(
    (t) => t.replace(Hr, "-$1").toLowerCase()
  );
  var Rs = Ue((t) => t.charAt(0).toUpperCase() + t.slice(1));
  var tn = Ue(
    (t) => t ? `on${Rs(t)}` : ""
  );
  var Ut = /* @__PURE__ */ __name((t, e) => !Object.is(t, e), "Ut");
  var en = /* @__PURE__ */ __name((t, ...e) => {
    for (let n = 0; n < t.length; n++)
      t[n](...e);
  }, "en");
  var Ns = /* @__PURE__ */ __name((t, e, n, s = false) => {
    Object.defineProperty(t, e, {
      configurable: true,
      enumerable: false,
      writable: s,
      value: n
    });
  }, "Ns");
  var jr = /* @__PURE__ */ __name((t) => {
    const e = parseFloat(t);
    return isNaN(e) ? t : e;
  }, "jr");
  var Vr = /* @__PURE__ */ __name((t) => {
    const e = W(t) ? Number(t) : NaN;
    return isNaN(e) ? t : e;
  }, "Vr");
  var Zn;
  var We = /* @__PURE__ */ __name(() => Zn || (Zn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), "We");
  function Pn(t) {
    if (P(t)) {
      const e = {};
      for (let n = 0; n < t.length; n++) {
        const s = t[n], r = W(s) ? Ur(s) : Pn(s);
        if (r)
          for (const i in r)
            e[i] = r[i];
      }
      return e;
    } else if (W(t) || V(t))
      return t;
  }
  __name(Pn, "Pn");
  var Br = /;(?![^(]*\))/g;
  var Kr = /:([^]+)/;
  var zr = /\/\*[^]*?\*\//g;
  function Ur(t) {
    const e = {};
    return t.replace(zr, "").split(Br).forEach((n) => {
      if (n) {
        const s = n.split(Kr);
        s.length > 1 && (e[s[0].trim()] = s[1].trim());
      }
    }), e;
  }
  __name(Ur, "Ur");
  function Se(t) {
    let e = "";
    if (W(t))
      e = t;
    else if (P(t))
      for (let n = 0; n < t.length; n++) {
        const s = Se(t[n]);
        s && (e += s + " ");
      }
    else if (V(t))
      for (const n in t)
        t[n] && (e += n + " ");
    return e.trim();
  }
  __name(Se, "Se");
  var Wr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var kr = /* @__PURE__ */ An(Wr);
  function Ls(t) {
    return !!t || t === "";
  }
  __name(Ls, "Ls");
  function qr(t, e) {
    if (t.length !== e.length) return false;
    let n = true;
    for (let s = 0; n && s < t.length; s++)
      n = Fn(t[s], e[s]);
    return n;
  }
  __name(qr, "qr");
  function Fn(t, e) {
    if (t === e) return true;
    let n = Xn(t), s = Xn(e);
    if (n || s)
      return n && s ? t.getTime() === e.getTime() : false;
    if (n = Tt(t), s = Tt(e), n || s)
      return t === e;
    if (n = P(t), s = P(e), n || s)
      return n && s ? qr(t, e) : false;
    if (n = V(t), s = V(e), n || s) {
      if (!n || !s)
        return false;
      const r = Object.keys(t).length, i = Object.keys(e).length;
      if (r !== i)
        return false;
      for (const o in t) {
        const l = t.hasOwnProperty(o), f = e.hasOwnProperty(o);
        if (l && !f || !l && f || !Fn(t[o], e[o]))
          return false;
      }
    }
    return String(t) === String(e);
  }
  __name(Fn, "Fn");
  var Ds = /* @__PURE__ */ __name((t) => !!(t && t.__v_isRef === true), "Ds");
  var $s = /* @__PURE__ */ __name((t) => W(t) ? t : t == null ? "" : P(t) || V(t) && (t.toString === Is || !K(t.toString)) ? Ds(t) ? $s(t.value) : JSON.stringify(t, Hs, 2) : String(t), "$s");
  var Hs = /* @__PURE__ */ __name((t, e) => Ds(e) ? Hs(t, e.value) : ge(e) ? {
    [`Map(${e.size})`]: [...e.entries()].reduce(
      (n, [s, r], i) => (n[nn(s, i) + " =>"] = r, n),
      {}
    )
  } : Nr(e) ? {
    [`Set(${e.size})`]: [...e.values()].map((n) => nn(n))
  } : Tt(e) ? nn(e) : V(e) && !P(e) && !Dr(e) ? String(e) : e, "Hs");
  var nn = /* @__PURE__ */ __name((t, e = "") => {
    var n;
    return (
      // Symbol.description in es2019+ so we need to cast here to pass
      // the lib: es2016 check
      Tt(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
    );
  }, "nn");
  var Q;
  var _Yr = class _Yr {
    // TODO isolatedDeclarations "__v_skip"
    constructor(e = false) {
      this.detached = e, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this._warnOnRun = true, this.__v_skip = true, !e && Q && (Q.active ? (this.parent = Q, this.index = (Q.scopes || (Q.scopes = [])).push(
        this
      ) - 1) : (this._active = false, this._warnOnRun = false));
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let e, n;
        if (this.scopes)
          for (e = 0, n = this.scopes.length; e < n; e++)
            this.scopes[e].pause();
        for (e = 0, n = this.effects.length; e < n; e++)
          this.effects[e].pause();
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = false;
        let e, n;
        if (this.scopes)
          for (e = 0, n = this.scopes.length; e < n; e++)
            this.scopes[e].resume();
        for (e = 0, n = this.effects.length; e < n; e++)
          this.effects[e].resume();
      }
    }
    run(e) {
      if (this._active) {
        const n = Q;
        try {
          return Q = this, e();
        } finally {
          Q = n;
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
          let e = Q;
          for (; e; ) {
            if (e.prevScope === this) {
              e.prevScope = this.prevScope;
              break;
            }
            e = e.prevScope;
          }
        }
        this.prevScope = void 0;
      }
    }
    stop(e) {
      if (this._active) {
        this._active = false;
        let n, s;
        for (n = 0, s = this.effects.length; n < s; n++)
          this.effects[n].stop();
        for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
          this.cleanups[n]();
        if (this.cleanups.length = 0, this.scopes) {
          for (n = 0, s = this.scopes.length; n < s; n++)
            this.scopes[n].stop(true);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !e) {
          const r = this.parent.scopes.pop();
          r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
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
    constructor(e) {
      this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Q && (Q.active ? Q.effects.push(this) : this.flags &= -2);
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
      const e = j, n = ht;
      j = this, ht = true;
      try {
        return this.fn();
      } finally {
        Bs(this), j = e, ht = n, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let e = this.deps; e; e = e.nextDep)
          Nn(e);
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
  function Jr(t, e = false) {
    if (t.flags |= 8, e) {
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
      let e = xe;
      for (xe = void 0; e; ) {
        const n = e.next;
        e.next = void 0, e.flags &= -9, e = n;
      }
    }
    let t;
    for (; _e; ) {
      let e = _e;
      for (_e = void 0; e; ) {
        const n = e.next;
        if (e.next = void 0, e.flags &= -9, e.flags & 1)
          try {
            e.trigger();
          } catch (s) {
            t || (t = s);
          }
        e = n;
      }
    }
    if (t) throw t;
  }
  __name(Rn, "Rn");
  function Vs(t) {
    for (let e = t.deps; e; e = e.nextDep)
      e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
  }
  __name(Vs, "Vs");
  function Bs(t) {
    let e, n = t.depsTail, s = n;
    for (; s; ) {
      const r = s.prevDep;
      s.version === -1 ? (s === n && (n = r), Nn(s), Zr(s)) : e = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
    }
    t.deps = e, t.depsTail = n;
  }
  __name(Bs, "Bs");
  function gn(t) {
    for (let e = t.deps; e; e = e.nextDep)
      if (e.dep.version !== e.version || e.dep.computed && (Xr(e.dep.computed) || e.dep.version !== e.version))
        return true;
    return !!t._dirty;
  }
  __name(gn, "gn");
  function Xr(t) {
    if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Le) || (t.globalVersion = Le, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !gn(t))))
      return;
    t.flags |= 2;
    const e = t.dep, n = j, s = ht;
    j = t, ht = true;
    try {
      Vs(t);
      const r = t.fn(t._value);
      (e.version === 0 || Ut(r, t._value)) && (t.flags |= 128, t._value = r, e.version++);
    } catch (r) {
      throw e.version++, r;
    } finally {
      j = n, ht = s, Bs(t), t.flags &= -3;
    }
  }
  __name(Xr, "Xr");
  function Nn(t, e = false) {
    const { dep: n, prevSub: s, nextSub: r } = t;
    if (s && (s.nextSub = r, t.prevSub = void 0), r && (r.prevSub = s, t.nextSub = void 0), n.subs === t && (n.subs = s, !s && n.computed)) {
      n.computed.flags &= -5;
      for (let i = n.computed.deps; i; i = i.nextDep)
        Nn(i, true);
    }
    !e && !--n.sc && n.map && n.map.delete(n.key);
  }
  __name(Nn, "Nn");
  function Zr(t) {
    const { prevDep: e, nextDep: n } = t;
    e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
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
    const { cleanup: e } = t;
    if (t.cleanup = void 0, e) {
      const n = j;
      j = void 0;
      try {
        e();
      } finally {
        j = n;
      }
    }
  }
  __name(Qn, "Qn");
  var Le = 0;
  var _Qr = class _Qr {
    constructor(e, n) {
      this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  };
  __name(_Qr, "Qr");
  var Qr = _Qr;
  var _ti = class _ti {
    // TODO isolatedDeclarations "__v_skip"
    constructor(e) {
      this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
    }
    track(e) {
      if (!j || !ht || j === this.computed)
        return;
      let n = this.activeLink;
      if (n === void 0 || n.sub !== j)
        n = this.activeLink = new Qr(j, this), j.deps ? (n.prevDep = j.depsTail, j.depsTail.nextDep = n, j.depsTail = n) : j.deps = j.depsTail = n, zs(n);
      else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
        const s = n.nextDep;
        s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = j.depsTail, n.nextDep = void 0, j.depsTail.nextDep = n, j.depsTail = n, j.deps === n && (j.deps = s);
      }
      return n;
    }
    trigger(e) {
      this.version++, Le++, this.notify(e);
    }
    notify(e) {
      In();
      try {
        for (let n = this.subs; n; n = n.prevSub)
          n.sub.notify() && n.sub.dep.notify();
      } finally {
        Rn();
      }
    }
  };
  __name(_ti, "ti");
  var ti = _ti;
  function zs(t) {
    if (t.dep.sc++, t.sub.flags & 4) {
      const e = t.dep.computed;
      if (e && !t.dep.subs) {
        e.flags |= 20;
        for (let s = e.deps; s; s = s.nextDep)
          zs(s);
      }
      const n = t.dep.subs;
      n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
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
  function tt(t, e, n) {
    if (ht && j) {
      let s = mn.get(t);
      s || mn.set(t, s = /* @__PURE__ */ new Map());
      let r = s.get(n);
      r || (s.set(n, r = new ti()), r.map = s, r.key = n), r.track();
    }
  }
  __name(tt, "tt");
  function Ot(t, e, n, s, r, i) {
    const o = mn.get(t);
    if (!o) {
      Le++;
      return;
    }
    const l = /* @__PURE__ */ __name((f) => {
      f && f.trigger();
    }, "l");
    if (In(), e === "clear")
      o.forEach(l);
    else {
      const f = P(t), d = f && Mn(n);
      if (f && n === "length") {
        const u = Number(s);
        o.forEach((p, S2) => {
          (S2 === "length" || S2 === Te || !Tt(S2) && S2 >= u) && l(p);
        });
      } else
        switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(Te)), e) {
          case "add":
            f ? d && l(o.get("length")) : (l(o.get(kt)), ge(t) && l(o.get(_n)));
            break;
          case "delete":
            f || (l(o.get(kt)), ge(t) && l(o.get(_n)));
            break;
          case "set":
            ge(t) && l(o.get(kt));
            break;
        }
    }
    Rn();
  }
  __name(Ot, "Ot");
  function Qt(t) {
    const e = /* @__PURE__ */ R(t);
    return e === t ? e : (tt(e, "iterate", Te), /* @__PURE__ */ Vt(t) ? e : e.map(Pt));
  }
  __name(Qt, "Qt");
  function ke(t) {
    return tt(t = /* @__PURE__ */ R(t), "iterate", Te), t;
  }
  __name(ke, "ke");
  function vt(t, e) {
    return /* @__PURE__ */ jt(t) ? re(/* @__PURE__ */ qe(t) ? Pt(e) : e) : Pt(e);
  }
  __name(vt, "vt");
  var ei = {
    __proto__: null,
    [Symbol.iterator]() {
      return rn(this, Symbol.iterator, (t) => vt(this, t));
    },
    concat(...t) {
      return Qt(this).concat(
        ...t.map((e) => P(e) ? Qt(e) : e)
      );
    },
    entries() {
      return rn(this, "entries", (t) => (t[1] = vt(this, t[1]), t));
    },
    every(t, e) {
      return wt(this, "every", t, e, void 0, arguments);
    },
    filter(t, e) {
      return wt(
        this,
        "filter",
        t,
        e,
        (n) => n.map((s) => vt(this, s)),
        arguments
      );
    },
    find(t, e) {
      return wt(
        this,
        "find",
        t,
        e,
        (n) => vt(this, n),
        arguments
      );
    },
    findIndex(t, e) {
      return wt(this, "findIndex", t, e, void 0, arguments);
    },
    findLast(t, e) {
      return wt(
        this,
        "findLast",
        t,
        e,
        (n) => vt(this, n),
        arguments
      );
    },
    findLastIndex(t, e) {
      return wt(this, "findLastIndex", t, e, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(t, e) {
      return wt(this, "forEach", t, e, void 0, arguments);
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
    map(t, e) {
      return wt(this, "map", t, e, void 0, arguments);
    },
    pop() {
      return ae(this, "pop");
    },
    push(...t) {
      return ae(this, "push", t);
    },
    reduce(t, ...e) {
      return ts(this, "reduce", t, e);
    },
    reduceRight(t, ...e) {
      return ts(this, "reduceRight", t, e);
    },
    shift() {
      return ae(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(t, e) {
      return wt(this, "some", t, e, void 0, arguments);
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
  function rn(t, e, n) {
    const s = ke(t), r = s[e]();
    return s !== t && !/* @__PURE__ */ Vt(t) && (r._next = r.next, r.next = () => {
      const i = r._next();
      return i.done || (i.value = n(i.value)), i;
    }), r;
  }
  __name(rn, "rn");
  var ni = Array.prototype;
  function wt(t, e, n, s, r, i) {
    const o = ke(t), l = o !== t && !/* @__PURE__ */ Vt(t), f = o[e];
    if (f !== ni[e]) {
      const p = f.apply(t, i);
      return l ? Pt(p) : p;
    }
    let d = n;
    o !== t && (l ? d = /* @__PURE__ */ __name(function(p, S2) {
      return n.call(this, vt(t, p), S2, t);
    }, "d") : n.length > 2 && (d = /* @__PURE__ */ __name(function(p, S2) {
      return n.call(this, p, S2, t);
    }, "d")));
    const u = f.call(o, d, s);
    return l && r ? r(u) : u;
  }
  __name(wt, "wt");
  function ts(t, e, n, s) {
    const r = ke(t), i = r !== t && !/* @__PURE__ */ Vt(t);
    let o = n, l = false;
    r !== t && (i ? (l = s.length === 0, o = /* @__PURE__ */ __name(function(d, u, p) {
      return l && (l = false, d = vt(t, d)), n.call(this, d, vt(t, u), p, t);
    }, "o")) : n.length > 3 && (o = /* @__PURE__ */ __name(function(d, u, p) {
      return n.call(this, d, u, p, t);
    }, "o")));
    const f = r[e](o, ...s);
    return l ? vt(t, f) : f;
  }
  __name(ts, "ts");
  function on(t, e, n) {
    const s = /* @__PURE__ */ R(t);
    tt(s, "iterate", Te);
    const r = s[e](...n);
    return (r === -1 || r === false) && /* @__PURE__ */ Hn(n[0]) ? (n[0] = /* @__PURE__ */ R(n[0]), s[e](...n)) : r;
  }
  __name(on, "on");
  function ae(t, e, n = []) {
    qt(), In();
    const s = (/* @__PURE__ */ R(t))[e].apply(t, n);
    return Rn(), Yt(), s;
  }
  __name(ae, "ae");
  var si = /* @__PURE__ */ An("__proto__,__v_isRef,__isVue");
  var Us = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Tt)
  );
  function ri(t) {
    Tt(t) || (t = String(t));
    const e = /* @__PURE__ */ R(this);
    return tt(e, "has", t), e.hasOwnProperty(t);
  }
  __name(ri, "ri");
  var _Ws = class _Ws {
    constructor(e = false, n = false) {
      this._isReadonly = e, this._isShallow = n;
    }
    get(e, n, s) {
      if (n === "__v_skip") return e.__v_skip;
      const r = this._isReadonly, i = this._isShallow;
      if (n === "__v_isReactive")
        return !r;
      if (n === "__v_isReadonly")
        return r;
      if (n === "__v_isShallow")
        return i;
      if (n === "__v_raw")
        return s === (r ? i ? pi : Gs : i ? Ys : qs).get(e) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
      const o = P(e);
      if (!r) {
        let f;
        if (o && (f = ei[n]))
          return f;
        if (n === "hasOwnProperty")
          return ri;
      }
      const l = Reflect.get(
        e,
        n,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        /* @__PURE__ */ pt(e) ? e : s
      );
      if ((Tt(n) ? Us.has(n) : si(n)) || (r || tt(e, "get", n), i))
        return l;
      if (/* @__PURE__ */ pt(l)) {
        const f = o && Mn(n) ? l : l.value;
        return r && V(f) ? /* @__PURE__ */ bn(f) : f;
      }
      return V(l) ? r ? /* @__PURE__ */ bn(l) : /* @__PURE__ */ Dn(l) : l;
    }
  };
  __name(_Ws, "Ws");
  var Ws = _Ws;
  var _ks = class _ks extends Ws {
    constructor(e = false) {
      super(false, e);
    }
    set(e, n, s, r) {
      let i = e[n];
      const o = P(e) && Mn(n);
      if (!this._isShallow) {
        const d = /* @__PURE__ */ jt(i);
        if (!/* @__PURE__ */ Vt(s) && !/* @__PURE__ */ jt(s) && (i = /* @__PURE__ */ R(i), s = /* @__PURE__ */ R(s)), !o && /* @__PURE__ */ pt(i) && !/* @__PURE__ */ pt(s))
          return d || (i.value = s), true;
      }
      const l = o ? Number(n) < e.length : D(e, n), f = Reflect.set(
        e,
        n,
        s,
        /* @__PURE__ */ pt(e) ? e : r
      );
      return e === /* @__PURE__ */ R(r) && (l ? Ut(s, i) && Ot(e, "set", n, s) : Ot(e, "add", n, s)), f;
    }
    deleteProperty(e, n) {
      const s = D(e, n);
      e[n];
      const r = Reflect.deleteProperty(e, n);
      return r && s && Ot(e, "delete", n, void 0), r;
    }
    has(e, n) {
      const s = Reflect.has(e, n);
      return (!Tt(n) || !Us.has(n)) && tt(e, "has", n), s;
    }
    ownKeys(e) {
      return tt(
        e,
        "iterate",
        P(e) ? "length" : kt
      ), Reflect.ownKeys(e);
    }
  };
  __name(_ks, "ks");
  var ks = _ks;
  var _ii = class _ii extends Ws {
    constructor(e = false) {
      super(true, e);
    }
    set(e, n) {
      return true;
    }
    deleteProperty(e, n) {
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
  function fi(t, e, n) {
    return function(...s) {
      const r = this.__v_raw, i = /* @__PURE__ */ R(r), o = ge(i), l = t === "entries" || t === Symbol.iterator && o, f = t === "keys" && o, d = r[t](...s), u = n ? xn : e ? re : Pt;
      return !e && tt(
        i,
        "iterate",
        f ? _n : kt
      ), lt(
        // inheriting all iterator properties
        Object.create(d),
        {
          // iterator protocol
          next() {
            const { value: p, done: S2 } = d.next();
            return S2 ? { value: p, done: S2 } : {
              value: l ? [u(p[0]), u(p[1])] : u(p),
              done: S2
            };
          }
        }
      );
    };
  }
  __name(fi, "fi");
  function Re(t) {
    return function(...e) {
      return t === "delete" ? false : t === "clear" ? void 0 : this;
    };
  }
  __name(Re, "Re");
  function ai(t, e) {
    const n = {
      get(r) {
        const i = this.__v_raw, o = /* @__PURE__ */ R(i), l = /* @__PURE__ */ R(r);
        t || (Ut(r, l) && tt(o, "get", r), tt(o, "get", l));
        const { has: f } = Ie(o), d = e ? xn : t ? re : Pt;
        if (f.call(o, r))
          return d(i.get(r));
        if (f.call(o, l))
          return d(i.get(l));
        i !== o && i.get(r);
      },
      get size() {
        const r = this.__v_raw;
        return !t && tt(/* @__PURE__ */ R(r), "iterate", kt), r.size;
      },
      has(r) {
        const i = this.__v_raw, o = /* @__PURE__ */ R(i), l = /* @__PURE__ */ R(r);
        return t || (Ut(r, l) && tt(o, "has", r), tt(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
      },
      forEach(r, i) {
        const o = this, l = o.__v_raw, f = /* @__PURE__ */ R(l), d = e ? xn : t ? re : Pt;
        return !t && tt(f, "iterate", kt), l.forEach((u, p) => r.call(i, d(u), d(p), o));
      }
    };
    return lt(
      n,
      t ? {
        add: Re("add"),
        set: Re("set"),
        delete: Re("delete"),
        clear: Re("clear")
      } : {
        add(r) {
          const i = /* @__PURE__ */ R(this), o = Ie(i), l = /* @__PURE__ */ R(r), f = !e && !/* @__PURE__ */ Vt(r) && !/* @__PURE__ */ jt(r) ? l : r;
          return o.has.call(i, f) || Ut(r, f) && o.has.call(i, r) || Ut(l, f) && o.has.call(i, l) || (i.add(f), Ot(i, "add", f, f)), this;
        },
        set(r, i) {
          !e && !/* @__PURE__ */ Vt(i) && !/* @__PURE__ */ jt(i) && (i = /* @__PURE__ */ R(i));
          const o = /* @__PURE__ */ R(this), { has: l, get: f } = Ie(o);
          let d = l.call(o, r);
          d || (r = /* @__PURE__ */ R(r), d = l.call(o, r));
          const u = f.call(o, r);
          return o.set(r, i), d ? Ut(i, u) && Ot(o, "set", r, i) : Ot(o, "add", r, i), this;
        },
        delete(r) {
          const i = /* @__PURE__ */ R(this), { has: o, get: l } = Ie(i);
          let f = o.call(i, r);
          f || (r = /* @__PURE__ */ R(r), f = o.call(i, r)), l && l.call(i, r);
          const d = i.delete(r);
          return f && Ot(i, "delete", r, void 0), d;
        },
        clear() {
          const r = /* @__PURE__ */ R(this), i = r.size !== 0, o = r.clear();
          return i && Ot(
            r,
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
    ].forEach((r) => {
      n[r] = fi(r, t, e);
    }), n;
  }
  __name(ai, "ai");
  function Ln(t, e) {
    const n = ai(t, e);
    return (s, r, i) => r === "__v_isReactive" ? !t : r === "__v_isReadonly" ? t : r === "__v_raw" ? s : Reflect.get(
      D(n, r) && r in s ? n : s,
      r,
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
  function $n(t, e, n, s, r) {
    if (!V(t) || t.__v_raw && !(e && t.__v_isReactive))
      return t;
    const i = mi(t);
    if (i === 0)
      return t;
    const o = r.get(t);
    if (o)
      return o;
    const l = new Proxy(
      t,
      i === 2 ? s : n
    );
    return r.set(t, l), l;
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
  function R(t) {
    const e = t && t.__v_raw;
    return e ? /* @__PURE__ */ R(e) : t;
  }
  __name(R, "R");
  function xi(t) {
    return !D(t, "__v_skip") && Object.isExtensible(t) && Ns(t, "__v_skip", true), t;
  }
  __name(xi, "xi");
  var Pt = /* @__PURE__ */ __name((t) => V(t) ? /* @__PURE__ */ Dn(t) : t, "Pt");
  var re = /* @__PURE__ */ __name((t) => V(t) ? /* @__PURE__ */ bn(t) : t, "re");
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
    get: /* @__PURE__ */ __name((t, e, n) => e === "__v_raw" ? t : yn(Reflect.get(t, e, n)), "get"),
    set: /* @__PURE__ */ __name((t, e, n, s) => {
      const r = t[e];
      return /* @__PURE__ */ pt(r) && !/* @__PURE__ */ pt(n) ? (r.value = n, true) : Reflect.set(t, e, n, s);
    }, "set")
  };
  function Js(t) {
    return /* @__PURE__ */ qe(t) ? t : new Proxy(t, bi);
  }
  __name(Js, "Js");
  function Me(t, e, n, s) {
    try {
      return s ? t(...s) : t();
    } catch (r) {
      Ye(r, e, n);
    }
  }
  __name(Me, "Me");
  function Ft(t, e, n, s) {
    if (K(t)) {
      const r = Me(t, e, n, s);
      return r && Fs(r) && r.catch((i) => {
        Ye(i, e, n);
      }), r;
    }
    if (P(t)) {
      const r = [];
      for (let i = 0; i < t.length; i++)
        r.push(Ft(t[i], e, n, s));
      return r;
    }
  }
  __name(Ft, "Ft");
  function Ye(t, e, n, s = true) {
    const r = e ? e.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = e && e.appContext.config || U;
    if (e) {
      let l = e.parent;
      const f = e.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; l; ) {
        const u = l.ec;
        if (u) {
          for (let p = 0; p < u.length; p++)
            if (u[p](t, f, d) === false)
              return;
        }
        l = l.parent;
      }
      if (i) {
        qt(), Me(i, null, 10, [
          t,
          f,
          d
        ]), Yt();
        return;
      }
    }
    yi(t, n, r, s, o);
  }
  __name(Ye, "Ye");
  function yi(t, e, n, s = true, r = false) {
    if (r)
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
    const e = De || Xs;
    return t ? e.then(this ? t.bind(this) : t) : e;
  }
  __name(vi, "vi");
  function Ci(t) {
    let e = yt + 1, n = nt.length;
    for (; e < n; ) {
      const s = e + n >>> 1, r = nt[s], i = we(r);
      i < t || i === t && r.flags & 2 ? e = s + 1 : n = s;
    }
    return e;
  }
  __name(Ci, "Ci");
  function Zs(t) {
    if (!(t.flags & 1)) {
      const e = we(t), n = nt[nt.length - 1];
      !n || // fast path when the job id is larger than the tail
      !(t.flags & 2) && e >= we(n) ? nt.push(t) : nt.splice(Ci(e), 0, t), t.flags |= 1, Qs();
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
  function es(t, e, n = yt + 1) {
    for (; n < nt.length; n++) {
      const s = nt[n];
      if (s && s.flags & 2) {
        if (t && s.id !== t.uid)
          continue;
        nt.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
      }
    }
  }
  __name(es, "es");
  function tr(t) {
    if (se.length) {
      const e = [...new Set(se)].sort(
        (n, s) => we(n) - we(s)
      );
      if (se.length = 0, Ht) {
        Ht.push(...e);
        return;
      }
      for (Ht = e, te = 0; te < Ht.length; te++) {
        const n = Ht[te];
        n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
      }
      Ht = null, te = 0;
    }
  }
  __name(tr, "tr");
  var we = /* @__PURE__ */ __name((t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id, "we");
  function er(t) {
    try {
      for (yt = 0; yt < nt.length; yt++) {
        const e = nt[yt];
        e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Me(
          e,
          e.i,
          e.i ? 15 : 14
        ), e.flags & 4 || (e.flags &= -2));
      }
    } finally {
      for (; yt < nt.length; yt++) {
        const e = nt[yt];
        e && (e.flags &= -2);
      }
      yt = -1, nt.length = 0, tr(), De = null, (nt.length || se.length) && er();
    }
  }
  __name(er, "er");
  var St = null;
  var nr = null;
  function $e(t) {
    const e = St;
    return St = t, nr = t && t.type.__scopeId || null, e;
  }
  __name($e, "$e");
  function sr(t, e = St, n) {
    if (!e || t._n)
      return t;
    const s = /* @__PURE__ */ __name((...r) => {
      s._d && cs(-1);
      const i = $e(e);
      let o;
      try {
        o = t(...r);
      } finally {
        $e(i), s._d && cs(1);
      }
      return o;
    }, "s");
    return s._n = true, s._c = true, s._d = true, s;
  }
  __name(sr, "sr");
  function Bt(t, e, n, s) {
    const r = t.dirs, i = e && e.dirs;
    for (let o = 0; o < r.length; o++) {
      const l = r[o];
      i && (l.oldValue = i[o].value);
      let f = l.dir[s];
      f && (qt(), Ft(f, n, 8, [
        t.el,
        l,
        t,
        e
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
  function Oi(t, e) {
    const { leavingVNodes: n } = t;
    let s = n.get(e.type);
    return s || (s = /* @__PURE__ */ Object.create(null), n.set(e.type, s)), s;
  }
  __name(Oi, "Oi");
  function vn(t, e, n, s, r) {
    const {
      appear: i,
      mode: o,
      persisted: l = false,
      onBeforeEnter: f,
      onEnter: d,
      onAfterEnter: u,
      onEnterCancelled: p,
      onBeforeLeave: S2,
      onLeave: F3,
      onAfterLeave: H2,
      onLeaveCancelled: O2,
      onBeforeAppear: J2,
      onAppear: k2,
      onAfterAppear: N2,
      onAppearCancelled: q2
    } = e, X2 = String(t.key), st = Oi(n, t), ct2 = /* @__PURE__ */ __name((M2, B2) => {
      M2 && Ft(
        M2,
        s,
        9,
        B2
      );
    }, "ct"), It2 = /* @__PURE__ */ __name((M2, B2) => {
      const Y3 = B2[1];
      ct2(M2, B2), P(M2) ? M2.every((T2) => T2.length <= 1) && Y3() : M2.length <= 1 && Y3();
    }, "It"), ft = {
      mode: o,
      persisted: l,
      beforeEnter(M2) {
        let B2 = f;
        if (!n.isMounted)
          if (i)
            B2 = J2 || f;
          else
            return;
        M2[Dt] && M2[Dt](
          true
          /* cancelled */
        );
        const Y3 = st[X2];
        Y3 && ee(t, Y3) && Y3.el[Dt] && Y3.el[Dt](), ct2(B2, [M2]);
      },
      enter(M2) {
        if (st[X2] === t) return;
        let B2 = d, Y3 = u, T2 = p;
        if (!n.isMounted)
          if (i)
            B2 = k2 || d, Y3 = N2 || u, T2 = q2 || p;
          else
            return;
        let z = false;
        M2[ue] = (Rt) => {
          z || (z = true, Rt ? ct2(T2, [M2]) : ct2(Y3, [M2]), ft.delayedLeave && ft.delayedLeave(), M2[ue] = void 0);
        };
        const et3 = M2[ue].bind(null, false);
        B2 ? It2(B2, [M2, et3]) : et3();
      },
      leave(M2, B2) {
        const Y3 = String(t.key);
        if (M2[ue] && M2[ue](
          true
          /* cancelled */
        ), n.isUnmounting)
          return B2();
        ct2(S2, [M2]);
        let T2 = false;
        M2[Dt] = (et3) => {
          T2 || (T2 = true, B2(), et3 ? ct2(O2, [M2]) : ct2(H2, [M2]), M2[Dt] = void 0, st[Y3] === t && delete st[Y3]);
        };
        const z = M2[Dt].bind(null, false);
        st[Y3] = t, F3 ? It2(F3, [M2, z]) : z();
      },
      clone(M2) {
        return vn(
          M2,
          e,
          n,
          s
        );
      }
    };
    return ft;
  }
  __name(vn, "vn");
  function Ee(t, e) {
    t.shapeFlag & 6 && t.component ? (t.transition = e, Ee(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
  }
  __name(Ee, "Ee");
  function rr(t, e = false, n) {
    let s = [], r = 0;
    for (let i = 0; i < t.length; i++) {
      let o = t[i];
      const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
      o.type === ut ? (o.patchFlag & 128 && r++, s = s.concat(
        rr(o.children, e, l)
      )) : (e || o.type !== Gt) && s.push(l != null ? Jt(o, { key: l }) : o);
    }
    if (r > 1)
      for (let i = 0; i < s.length; i++)
        s[i].patchFlag = -2;
    return s;
  }
  __name(rr, "rr");
  // @__NO_SIDE_EFFECTS__
  function Mi(t, e) {
    return K(t) ? (
      // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      lt({ name: t.name }, e, { setup: t })
    ) : t;
  }
  __name(Mi, "Mi");
  function Pi(t) {
    t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
  }
  __name(Pi, "Pi");
  function ns(t, e) {
    let n;
    return !!((n = Object.getOwnPropertyDescriptor(t, e)) && !n.configurable);
  }
  __name(ns, "ns");
  var He = /* @__PURE__ */ new WeakMap();
  function be(t, e, n, s, r = false) {
    if (P(t)) {
      t.forEach(
        (O2, J2) => be(
          O2,
          e && (P(e) ? e[J2] : e),
          n,
          s,
          r
        )
      );
      return;
    }
    if (ye(s) && !r) {
      s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && be(t, e, n, s.component.subTree);
      return;
    }
    const i = s.shapeFlag & 4 ? Un(s.component) : s.el, o = r ? null : i, { i: l, r: f } = t, d = e && e.r, u = l.refs === U ? l.refs = {} : l.refs, p = l.setupState, S2 = /* @__PURE__ */ R(p), F3 = p === U ? Ps : (O2) => ns(u, O2) ? false : D(S2, O2), H2 = /* @__PURE__ */ __name((O2, J2) => !(J2 && ns(u, J2)), "H");
    if (d != null && d !== f) {
      if (ss(e), W(d))
        u[d] = null, F3(d) && (p[d] = null);
      else if (/* @__PURE__ */ pt(d)) {
        const O2 = e;
        H2(d, O2.k) && (d.value = null), O2.k && (u[O2.k] = null);
      }
    }
    if (K(f))
      Me(f, l, 12, [o, u]);
    else {
      const O2 = W(f), J2 = /* @__PURE__ */ pt(f);
      if (O2 || J2) {
        const k2 = /* @__PURE__ */ __name(() => {
          if (t.f) {
            const N2 = O2 ? F3(f) ? p[f] : u[f] : H2() || !t.k ? f.value : u[t.k];
            if (r)
              P(N2) && Ir(N2, i);
            else if (P(N2))
              N2.includes(i) || N2.push(i);
            else if (O2)
              u[f] = [i], F3(f) && (p[f] = u[f]);
            else {
              const q2 = [i];
              H2(f, t.k) && (f.value = q2), t.k && (u[t.k] = q2);
            }
          } else O2 ? (u[f] = o, F3(f) && (p[f] = o)) : J2 && (H2(f, t.k) && (f.value = o), t.k && (u[t.k] = o));
        }, "k");
        if (o) {
          const N2 = /* @__PURE__ */ __name(() => {
            k2(), He.delete(t);
          }, "N");
          N2.id = -1, He.set(t, N2), it(N2, n);
        } else
          ss(t), k2();
      }
    }
  }
  __name(be, "be");
  function ss(t) {
    const e = He.get(t);
    e && (e.flags |= 8, He.delete(t));
  }
  __name(ss, "ss");
  We().requestIdleCallback;
  We().cancelIdleCallback;
  var ye = /* @__PURE__ */ __name((t) => !!t.type.__asyncLoader, "ye");
  var Fi = /* @__PURE__ */ __name((t) => t.type.__isKeepAlive, "Fi");
  function Ii(t, e, n = Xt, s = false) {
    if (n) {
      const r = n[t] || (n[t] = []), i = e.__weh || (e.__weh = (...o) => {
        qt();
        const l = zn(n), f = Ft(e, n, t, o);
        return l(), Yt(), f;
      });
      return s ? r.unshift(i) : r.push(i), i;
    }
  }
  __name(Ii, "Ii");
  var jn = /* @__PURE__ */ __name((t) => (e, n = Xt) => {
    (!vr || t === "sp") && Ii(t, (...s) => e(...s), n);
  }, "jn");
  var Ri = jn("m");
  var Ni = jn("u");
  var Li = jn(
    "bum"
  );
  var Di = /* @__PURE__ */ Symbol.for("v-ndc");
  function $i(t, e, n, s) {
    let r;
    const i = n, o = P(t);
    if (o || W(t)) {
      const l = o && /* @__PURE__ */ qe(t);
      let f = false, d = false;
      l && (f = !/* @__PURE__ */ Vt(t), d = /* @__PURE__ */ jt(t), t = ke(t)), r = new Array(t.length);
      for (let u = 0, p = t.length; u < p; u++)
        r[u] = e(
          f ? d ? re(Pt(t[u])) : Pt(t[u]) : t[u],
          u,
          void 0,
          i
        );
    } else if (typeof t == "number") {
      r = new Array(t);
      for (let l = 0; l < t; l++)
        r[l] = e(l + 1, l, void 0, i);
    } else if (V(t))
      if (t[Symbol.iterator])
        r = Array.from(
          t,
          (l, f) => e(l, f, void 0, i)
        );
      else {
        const l = Object.keys(t);
        r = new Array(l.length);
        for (let f = 0, d = l.length; f < d; f++) {
          const u = l[f];
          r[f] = e(t[u], u, f, i);
        }
      }
    else
      r = [];
    return r;
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
  var ln = /* @__PURE__ */ __name((t, e) => t !== U && !t.__isScriptSetup && D(t, e), "ln");
  var Hi = {
    get({ _: t }, e) {
      if (e === "__v_skip")
        return true;
      const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: f } = t;
      if (e[0] !== "$") {
        const S2 = o[e];
        if (S2 !== void 0)
          switch (S2) {
            case 1:
              return s[e];
            case 2:
              return r[e];
            case 4:
              return n[e];
            case 3:
              return i[e];
          }
        else {
          if (ln(s, e))
            return o[e] = 1, s[e];
          if (D(i, e))
            return o[e] = 3, i[e];
          if (n !== U && D(n, e))
            return o[e] = 4, n[e];
          o[e] = 0;
        }
      }
      const d = ve[e];
      let u, p;
      if (d)
        return e === "$attrs" && tt(t.attrs, "get", ""), d(t);
      if (
        // css module (injected by vue-loader)
        (u = l.__cssModules) && (u = u[e])
      )
        return u;
      if (n !== U && D(n, e))
        return o[e] = 4, n[e];
      if (
        // global properties
        p = f.config.globalProperties, D(p, e)
      )
        return p[e];
    },
    set({ _: t }, e, n) {
      const { data: s, setupState: r, ctx: i } = t;
      return ln(r, e) ? (r[e] = n, true) : D(t.props, e) || e[0] === "$" && e.slice(1) in t ? false : (i[e] = n, true);
    },
    has({
      _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: r, props: i, type: o }
    }, l) {
      let f;
      return !!(n[l] || ln(e, l) || D(i, l) || D(s, l) || D(ve, l) || D(r.config.globalProperties, l) || (f = o.__cssModules) && f[l]);
    },
    defineProperty(t, e, n) {
      return n.get != null ? t._.accessCache[e] = 0 : D(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
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
  function Vi(t, e) {
    return function(s, r = null) {
      K(s) || (s = lt({}, s)), r != null && !V(r) && (r = null);
      const i = ir(), o = /* @__PURE__ */ new WeakSet(), l = [];
      let f = false;
      const d = i.app = {
        _uid: ji++,
        _component: s,
        _props: r,
        _container: null,
        _context: i,
        _instance: null,
        version: vo,
        get config() {
          return i.config;
        },
        set config(u) {
        },
        use(u, ...p) {
          return o.has(u) || (u && K(u.install) ? (o.add(u), u.install(d, ...p)) : K(u) && (o.add(u), u(d, ...p))), d;
        },
        mixin(u) {
          return d;
        },
        component(u, p) {
          return p ? (i.components[u] = p, d) : i.components[u];
        },
        directive(u, p) {
          return p ? (i.directives[u] = p, d) : i.directives[u];
        },
        mount(u, p, S2) {
          if (!f) {
            const F3 = d._ceVNode || Mt(s, r);
            return F3.appContext = i, S2 === true ? S2 = "svg" : S2 === false && (S2 = void 0), t(F3, u, S2), f = true, d._container = u, u.__vue_app__ = d, Un(F3.component);
          }
        },
        onUnmount(u) {
          l.push(u);
        },
        unmount() {
          f && (Ft(
            l,
            d._instance,
            16
          ), t(null, d._container), delete d._container.__vue_app__);
        },
        provide(u, p) {
          return i.provides[u] = p, d;
        },
        runWithContext(u) {
          try {
            return u();
          } finally {
          }
        }
      };
      return d;
    };
  }
  __name(Vi, "Vi");
  var Bi = /* @__PURE__ */ __name((t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${dt(e)}Modifiers`] || t[`${Zt(e)}Modifiers`], "Bi");
  function Ki(t, e, ...n) {
    if (t.isUnmounted) return;
    const s = t.vnode.props || U;
    let r = n;
    const i = e.startsWith("update:"), o = i && Bi(s, e.slice(7));
    o && (o.trim && (r = n.map((u) => W(u) ? u.trim() : u)), o.number && (r = n.map(jr)));
    let l, f = s[l = tn(e)] || // also try camelCase event handler (#2249)
    s[l = tn(dt(e))];
    !f && i && (f = s[l = tn(Zt(e))]), f && Ft(
      f,
      t,
      6,
      r
    );
    const d = s[l + "Once"];
    if (d) {
      if (!t.emitted)
        t.emitted = {};
      else if (t.emitted[l])
        return;
      t.emitted[l] = true, Ft(
        d,
        t,
        6,
        r
      );
    }
  }
  __name(Ki, "Ki");
  function zi(t, e, n = false) {
    const s = e.emitsCache, r = s.get(t);
    if (r !== void 0)
      return r;
    const i = t.emits;
    let o = {};
    return i ? (P(i) ? i.forEach((l) => o[l] = null) : lt(o, i), V(t) && s.set(t, o), o) : (V(t) && s.set(t, null), null);
  }
  __name(zi, "zi");
  function Ge(t, e) {
    return !t || !Ke(e) ? false : (e = e.slice(2).replace(/Once$/, ""), D(t, e[0].toLowerCase() + e.slice(1)) || D(t, Zt(e)) || D(t, e));
  }
  __name(Ge, "Ge");
  function rs(t) {
    const {
      type: e,
      vnode: n,
      proxy: s,
      withProxy: r,
      propsOptions: [i],
      slots: o,
      attrs: l,
      emit: f,
      render: d,
      renderCache: u,
      props: p,
      data: S2,
      setupState: F3,
      ctx: H2,
      inheritAttrs: O2
    } = t, J2 = $e(t);
    let k2, N2;
    try {
      if (n.shapeFlag & 4) {
        const X2 = r || s, st = X2;
        k2 = Ct(
          d.call(
            st,
            X2,
            u,
            p,
            F3,
            S2,
            H2
          )
        ), N2 = l;
      } else {
        const X2 = e;
        k2 = Ct(
          X2.length > 1 ? X2(
            p,
            { attrs: l, slots: o, emit: f }
          ) : X2(
            p,
            null
          )
        ), N2 = e.props ? l : Ui(l);
      }
    } catch (X2) {
      Ce.length = 0, Ye(X2, t, 1), k2 = Mt(Gt);
    }
    let q2 = k2;
    if (N2 && O2 !== false) {
      const X2 = Object.keys(N2), { shapeFlag: st } = q2;
      X2.length && st & 7 && (i && X2.some(ze) && (N2 = Wi(
        N2,
        i
      )), q2 = Jt(q2, N2, false, true));
    }
    return n.dirs && (q2 = Jt(q2, null, false, true), q2.dirs = q2.dirs ? q2.dirs.concat(n.dirs) : n.dirs), n.transition && Ee(q2, n.transition), k2 = q2, $e(J2), k2;
  }
  __name(rs, "rs");
  var Ui = /* @__PURE__ */ __name((t) => {
    let e;
    for (const n in t)
      (n === "class" || n === "style" || Ke(n)) && ((e || (e = {}))[n] = t[n]);
    return e;
  }, "Ui");
  var Wi = /* @__PURE__ */ __name((t, e) => {
    const n = {};
    for (const s in t)
      (!ze(s) || !(s.slice(9) in e)) && (n[s] = t[s]);
    return n;
  }, "Wi");
  function ki(t, e, n) {
    const { props: s, children: r, component: i } = t, { props: o, children: l, patchFlag: f } = e, d = i.emitsOptions;
    if (e.dirs || e.transition)
      return true;
    if (n && f >= 0) {
      if (f & 1024)
        return true;
      if (f & 16)
        return s ? is(s, o, d) : !!o;
      if (f & 8) {
        const u = e.dynamicProps;
        for (let p = 0; p < u.length; p++) {
          const S2 = u[p];
          if (or(o, s, S2) && !Ge(d, S2))
            return true;
        }
      }
    } else
      return (r || l) && (!l || !l.$stable) ? true : s === o ? false : s ? o ? is(s, o, d) : true : !!o;
    return false;
  }
  __name(ki, "ki");
  function is(t, e, n) {
    const s = Object.keys(e);
    if (s.length !== Object.keys(t).length)
      return true;
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      if (or(e, t, i) && !Ge(n, i))
        return true;
    }
    return false;
  }
  __name(is, "is");
  function or(t, e, n) {
    const s = t[n], r = e[n];
    return n === "style" && V(s) && V(r) ? !Fn(s, r) : s !== r;
  }
  __name(or, "or");
  function qi({ vnode: t, parent: e, suspense: n }, s) {
    for (; e; ) {
      const r = e.subTree;
      if (r.suspense && r.suspense.activeBranch === t && (r.suspense.vnode.el = r.el = s, t = r), r === t)
        (t = e.vnode).el = s, e = e.parent;
      else
        break;
    }
    n && n.activeBranch === t && (n.vnode.el = s);
  }
  __name(qi, "qi");
  var lr = {};
  var cr = /* @__PURE__ */ __name(() => Object.create(lr), "cr");
  var fr = /* @__PURE__ */ __name((t) => Object.getPrototypeOf(t) === lr, "fr");
  function Yi(t, e, n, s = false) {
    const r = {}, i = cr();
    t.propsDefaults = /* @__PURE__ */ Object.create(null), ar(t, e, r, i);
    for (const o in t.propsOptions[0])
      o in r || (r[o] = void 0);
    n ? t.props = s ? r : /* @__PURE__ */ _i(r) : t.type.props ? t.props = r : t.props = i, t.attrs = i;
  }
  __name(Yi, "Yi");
  function Gi(t, e, n, s) {
    const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o }
    } = t, l = /* @__PURE__ */ R(r), [f] = t.propsOptions;
    let d = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (s || o > 0) && !(o & 16)
    ) {
      if (o & 8) {
        const u = t.vnode.dynamicProps;
        for (let p = 0; p < u.length; p++) {
          let S2 = u[p];
          if (Ge(t.emitsOptions, S2))
            continue;
          const F3 = e[S2];
          if (f)
            if (D(i, S2))
              F3 !== i[S2] && (i[S2] = F3, d = true);
            else {
              const H2 = dt(S2);
              r[H2] = Sn(
                f,
                l,
                H2,
                F3,
                t,
                false
              );
            }
          else
            F3 !== i[S2] && (i[S2] = F3, d = true);
        }
      }
    } else {
      ar(t, e, r, i) && (d = true);
      let u;
      for (const p in l)
        (!e || // for camelCase
        !D(e, p) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((u = Zt(p)) === p || !D(e, u))) && (f ? n && // for camelCase
        (n[p] !== void 0 || // for kebab-case
        n[u] !== void 0) && (r[p] = Sn(
          f,
          l,
          p,
          void 0,
          t,
          true
        )) : delete r[p]);
      if (i !== l)
        for (const p in i)
          (!e || !D(e, p)) && (delete i[p], d = true);
    }
    d && Ot(t.attrs, "set", "");
  }
  __name(Gi, "Gi");
  function ar(t, e, n, s) {
    const [r, i] = t.propsOptions;
    let o = false, l;
    if (e)
      for (let f in e) {
        if (me(f))
          continue;
        const d = e[f];
        let u;
        r && D(r, u = dt(f)) ? !i || !i.includes(u) ? n[u] = d : (l || (l = {}))[u] = d : Ge(t.emitsOptions, f) || (!(f in s) || d !== s[f]) && (s[f] = d, o = true);
      }
    if (i) {
      const f = /* @__PURE__ */ R(n), d = l || U;
      for (let u = 0; u < i.length; u++) {
        const p = i[u];
        n[p] = Sn(
          r,
          f,
          p,
          d[p],
          t,
          !D(d, p)
        );
      }
    }
    return o;
  }
  __name(ar, "ar");
  function Sn(t, e, n, s, r, i) {
    const o = t[n];
    if (o != null) {
      const l = D(o, "default");
      if (l && s === void 0) {
        const f = o.default;
        if (o.type !== Function && !o.skipFactory && K(f)) {
          const { propsDefaults: d } = r;
          if (n in d)
            s = d[n];
          else {
            const u = zn(r);
            s = d[n] = f.call(
              null,
              e
            ), u();
          }
        } else
          s = f;
        r.ce && r.ce._setProp(n, s);
      }
      o[
        0
        /* shouldCast */
      ] && (i && !l ? s = false : o[
        1
        /* shouldCastTrue */
      ] && (s === "" || s === Zt(n)) && (s = true));
    }
    return s;
  }
  __name(Sn, "Sn");
  function Ji(t, e, n = false) {
    const s = e.propsCache, r = s.get(t);
    if (r)
      return r;
    const i = t.props, o = {}, l = [];
    if (!i)
      return V(t) && s.set(t, ne), ne;
    if (P(i))
      for (let d = 0; d < i.length; d++) {
        const u = dt(i[d]);
        os(u) && (o[u] = U);
      }
    else if (i)
      for (const d in i) {
        const u = dt(d);
        if (os(u)) {
          const p = i[d], S2 = o[u] = P(p) || K(p) ? { type: p } : lt({}, p), F3 = S2.type;
          let H2 = false, O2 = true;
          if (P(F3))
            for (let J2 = 0; J2 < F3.length; ++J2) {
              const k2 = F3[J2], N2 = K(k2) && k2.name;
              if (N2 === "Boolean") {
                H2 = true;
                break;
              } else N2 === "String" && (O2 = false);
            }
          else
            H2 = K(F3) && F3.name === "Boolean";
          S2[
            0
            /* shouldCast */
          ] = H2, S2[
            1
            /* shouldCastTrue */
          ] = O2, (H2 || D(S2, "default")) && l.push(u);
        }
      }
    const f = [o, l];
    return V(t) && s.set(t, f), f;
  }
  __name(Ji, "Ji");
  function os(t) {
    return t[0] !== "$" && !me(t);
  }
  __name(os, "os");
  var Vn = /* @__PURE__ */ __name((t) => t === "_" || t === "_ctx" || t === "$stable", "Vn");
  var Bn = /* @__PURE__ */ __name((t) => P(t) ? t.map(Ct) : [Ct(t)], "Bn");
  var Xi = /* @__PURE__ */ __name((t, e, n) => {
    if (e._n)
      return e;
    const s = sr((...r) => Bn(e(...r)), n);
    return s._c = false, s;
  }, "Xi");
  var ur = /* @__PURE__ */ __name((t, e, n) => {
    const s = t._ctx;
    for (const r in t) {
      if (Vn(r)) continue;
      const i = t[r];
      if (K(i))
        e[r] = Xi(r, i, s);
      else if (i != null) {
        const o = Bn(i);
        e[r] = () => o;
      }
    }
  }, "ur");
  var dr = /* @__PURE__ */ __name((t, e) => {
    const n = Bn(e);
    t.slots.default = () => n;
  }, "dr");
  var hr = /* @__PURE__ */ __name((t, e, n) => {
    for (const s in e)
      (n || !Vn(s)) && (t[s] = e[s]);
  }, "hr");
  var Zi = /* @__PURE__ */ __name((t, e, n) => {
    const s = t.slots = cr();
    if (t.vnode.shapeFlag & 32) {
      const r = e._;
      r ? (hr(s, e, n), n && Ns(s, "_", r, true)) : ur(e, s);
    } else e && dr(t, e);
  }, "Zi");
  var Qi = /* @__PURE__ */ __name((t, e, n) => {
    const { vnode: s, slots: r } = t;
    let i = true, o = U;
    if (s.shapeFlag & 32) {
      const l = e._;
      l ? n && l === 1 ? i = false : hr(r, e, n) : (i = !e.$stable, ur(e, r)), o = e;
    } else e && (dr(t, e), o = { default: 1 });
    if (i)
      for (const l in r)
        !Vn(l) && o[l] == null && delete r[l];
  }, "Qi");
  var it = ro;
  function to(t) {
    return eo(t);
  }
  __name(to, "to");
  function eo(t, e) {
    const n = We();
    n.__VUE__ = true;
    const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: l,
      createComment: f,
      setText: d,
      setElementText: u,
      parentNode: p,
      nextSibling: S2,
      setScopeId: F3 = On,
      insertStaticContent: H2
    } = t, O2 = /* @__PURE__ */ __name((c, a, h, x2 = null, g2 = null, m = null, v2 = void 0, y2 = null, b2 = !!a.dynamicChildren) => {
      if (c === a)
        return;
      c && !ee(c, a) && (x2 = Fe(c), Nt(c, g2, m, true), c = null), a.patchFlag === -2 && (b2 = false, a.dynamicChildren = null);
      const { type: _2, ref: E2, shapeFlag: C2 } = a;
      switch (_2) {
        case Je:
          J2(c, a, h, x2);
          break;
        case Gt:
          k2(c, a, h, x2);
          break;
        case fn:
          c == null && N2(a, h, x2, v2);
          break;
        case ut:
          T2(
            c,
            a,
            h,
            x2,
            g2,
            m,
            v2,
            y2,
            b2
          );
          break;
        default:
          C2 & 1 ? st(
            c,
            a,
            h,
            x2,
            g2,
            m,
            v2,
            y2,
            b2
          ) : C2 & 6 ? z(
            c,
            a,
            h,
            x2,
            g2,
            m,
            v2,
            y2,
            b2
          ) : (C2 & 64 || C2 & 128) && _2.process(
            c,
            a,
            h,
            x2,
            g2,
            m,
            v2,
            y2,
            b2,
            ce
          );
      }
      E2 != null && g2 ? be(E2, c && c.ref, m, a || c, !a) : E2 == null && c && c.ref != null && be(c.ref, null, m, c, true);
    }, "O"), J2 = /* @__PURE__ */ __name((c, a, h, x2) => {
      if (c == null)
        s(
          a.el = l(a.children),
          h,
          x2
        );
      else {
        const g2 = a.el = c.el;
        a.children !== c.children && d(g2, a.children);
      }
    }, "J"), k2 = /* @__PURE__ */ __name((c, a, h, x2) => {
      c == null ? s(
        a.el = f(a.children || ""),
        h,
        x2
      ) : a.el = c.el;
    }, "k"), N2 = /* @__PURE__ */ __name((c, a, h, x2) => {
      [c.el, c.anchor] = H2(
        c.children,
        a,
        h,
        x2,
        c.el,
        c.anchor
      );
    }, "N"), q2 = /* @__PURE__ */ __name(({ el: c, anchor: a }, h, x2) => {
      let g2;
      for (; c && c !== a; )
        g2 = S2(c), s(c, h, x2), c = g2;
      s(a, h, x2);
    }, "q"), X2 = /* @__PURE__ */ __name(({ el: c, anchor: a }) => {
      let h;
      for (; c && c !== a; )
        h = S2(c), r(c), c = h;
      r(a);
    }, "X"), st = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2, y2, b2) => {
      if (a.type === "svg" ? v2 = "svg" : a.type === "math" && (v2 = "mathml"), c == null)
        ct2(
          a,
          h,
          x2,
          g2,
          m,
          v2,
          y2,
          b2
        );
      else {
        const _2 = c.el && c.el._isVueCE ? c.el : null;
        try {
          _2 && _2._beginPatch(), M2(
            c,
            a,
            g2,
            m,
            v2,
            y2,
            b2
          );
        } finally {
          _2 && _2._endPatch();
        }
      }
    }, "st"), ct2 = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2, y2) => {
      let b2, _2;
      const { props: E2, shapeFlag: C2, transition: w2, dirs: A2 } = c;
      if (b2 = c.el = o(
        c.type,
        m,
        E2 && E2.is,
        E2
      ), C2 & 8 ? u(b2, c.children) : C2 & 16 && ft(
        c.children,
        b2,
        null,
        x2,
        g2,
        cn(c, m),
        v2,
        y2
      ), A2 && Bt(c, null, x2, "created"), It2(b2, c, c.scopeId, v2, x2), E2) {
        for (const L2 in E2)
          L2 !== "value" && !me(L2) && i(b2, L2, null, E2[L2], m, x2);
        "value" in E2 && i(b2, "value", null, E2.value, m), (_2 = E2.onVnodeBeforeMount) && xt(_2, x2, c);
      }
      A2 && Bt(c, null, x2, "beforeMount");
      const I2 = no(g2, w2);
      I2 && w2.beforeEnter(b2), s(b2, a, h), ((_2 = E2 && E2.onVnodeMounted) || I2 || A2) && it(() => {
        try {
          _2 && xt(_2, x2, c), I2 && w2.enter(b2), A2 && Bt(c, null, x2, "mounted");
        } finally {
        }
      }, g2);
    }, "ct"), It2 = /* @__PURE__ */ __name((c, a, h, x2, g2) => {
      if (h && F3(c, h), x2)
        for (let m = 0; m < x2.length; m++)
          F3(c, x2[m]);
      if (g2) {
        let m = g2.subTree;
        if (a === m || _r(m.type) && (m.ssContent === a || m.ssFallback === a)) {
          const v2 = g2.vnode;
          It2(
            c,
            v2,
            v2.scopeId,
            v2.slotScopeIds,
            g2.parent
          );
        }
      }
    }, "It"), ft = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2, y2, b2 = 0) => {
      for (let _2 = b2; _2 < c.length; _2++) {
        const E2 = c[_2] = y2 ? At(c[_2]) : Ct(c[_2]);
        O2(
          null,
          E2,
          a,
          h,
          x2,
          g2,
          m,
          v2,
          y2
        );
      }
    }, "ft"), M2 = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2) => {
      const y2 = a.el = c.el;
      let { patchFlag: b2, dynamicChildren: _2, dirs: E2 } = a;
      b2 |= c.patchFlag & 16;
      const C2 = c.props || U, w2 = a.props || U;
      let A2;
      if (h && Kt(h, false), (A2 = w2.onVnodeBeforeUpdate) && xt(A2, h, a, c), E2 && Bt(a, c, h, "beforeUpdate"), h && Kt(h, true), (C2.innerHTML && w2.innerHTML == null || C2.textContent && w2.textContent == null) && u(y2, ""), _2 ? B2(
        c.dynamicChildren,
        _2,
        y2,
        h,
        x2,
        cn(a, g2),
        m
      ) : v2 || Ze2(
        c,
        a,
        y2,
        null,
        h,
        x2,
        cn(a, g2),
        m,
        false
      ), b2 > 0) {
        if (b2 & 16)
          Y3(y2, C2, w2, h, g2);
        else if (b2 & 2 && C2.class !== w2.class && i(y2, "class", null, w2.class, g2), b2 & 4 && i(y2, "style", C2.style, w2.style, g2), b2 & 8) {
          const I2 = a.dynamicProps;
          for (let L2 = 0; L2 < I2.length; L2++) {
            const $2 = I2[L2], G2 = C2[$2], Z3 = w2[$2];
            (Z3 !== G2 || $2 === "value") && i(y2, $2, G2, Z3, g2, h);
          }
        }
        b2 & 1 && c.children !== a.children && u(y2, a.children);
      } else !v2 && _2 == null && Y3(y2, C2, w2, h, g2);
      ((A2 = w2.onVnodeUpdated) || E2) && it(() => {
        A2 && xt(A2, h, a, c), E2 && Bt(a, c, h, "updated");
      }, x2);
    }, "M"), B2 = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2) => {
      for (let y2 = 0; y2 < a.length; y2++) {
        const b2 = c[y2], _2 = a[y2], E2 = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          b2.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (b2.type === ut || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !ee(b2, _2) || // - In the case of a component, it could contain anything.
          b2.shapeFlag & 198) ? p(b2.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            h
          )
        );
        O2(
          b2,
          _2,
          E2,
          null,
          x2,
          g2,
          m,
          v2,
          true
        );
      }
    }, "B"), Y3 = /* @__PURE__ */ __name((c, a, h, x2, g2) => {
      if (a !== h) {
        if (a !== U)
          for (const m in a)
            !me(m) && !(m in h) && i(
              c,
              m,
              a[m],
              null,
              g2,
              x2
            );
        for (const m in h) {
          if (me(m)) continue;
          const v2 = h[m], y2 = a[m];
          v2 !== y2 && m !== "value" && i(c, m, y2, v2, g2, x2);
        }
        "value" in h && i(c, "value", a.value, h.value, g2);
      }
    }, "Y"), T2 = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2, y2, b2) => {
      const _2 = a.el = c ? c.el : l(""), E2 = a.anchor = c ? c.anchor : l("");
      let { patchFlag: C2, dynamicChildren: w2, slotScopeIds: A2 } = a;
      A2 && (y2 = y2 ? y2.concat(A2) : A2), c == null ? (s(_2, h, x2), s(E2, h, x2), ft(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        a.children || [],
        h,
        E2,
        g2,
        m,
        v2,
        y2,
        b2
      )) : C2 > 0 && C2 & 64 && w2 && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      c.dynamicChildren && c.dynamicChildren.length === w2.length ? (B2(
        c.dynamicChildren,
        w2,
        h,
        g2,
        m,
        v2,
        y2
      ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (a.key != null || g2 && a === g2.subTree) && pr(
        c,
        a,
        true
        /* shallow */
      )) : Ze2(
        c,
        a,
        h,
        E2,
        g2,
        m,
        v2,
        y2,
        b2
      );
    }, "T"), z = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2, y2, b2) => {
      a.slotScopeIds = y2, c == null ? a.shapeFlag & 512 ? g2.ctx.activate(
        a,
        h,
        x2,
        v2,
        b2
      ) : et3(
        a,
        h,
        x2,
        g2,
        m,
        v2,
        b2
      ) : Rt(c, a, b2);
    }, "z"), et3 = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2) => {
      const y2 = c.component = po(
        c,
        x2,
        g2
      );
      if (Fi(c) && (y2.ctx.renderer = ce), mo(y2, false, v2), y2.asyncDep) {
        if (g2 && g2.registerDep(y2, oe, v2), !c.el) {
          const b2 = y2.subTree = Mt(Gt);
          k2(null, b2, a, h), c.placeholder = b2.el;
        }
      } else
        oe(
          y2,
          c,
          a,
          h,
          g2,
          m,
          v2
        );
    }, "et"), Rt = /* @__PURE__ */ __name((c, a, h) => {
      const x2 = a.component = c.component;
      if (ki(c, a, h))
        if (x2.asyncDep && !x2.asyncResolved) {
          Xe2(x2, a, h);
          return;
        } else
          x2.next = a, x2.update();
      else
        a.el = c.el, x2.vnode = a;
    }, "Rt"), oe = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2) => {
      const y2 = /* @__PURE__ */ __name(() => {
        if (c.isMounted) {
          let { next: C2, bu: w2, u: A2, parent: I2, vnode: L2 } = c;
          {
            const mt = gr(c);
            if (mt) {
              C2 && (C2.el = L2.el, Xe2(c, C2, v2)), mt.asyncDep.then(() => {
                it(() => {
                  c.isUnmounted || _2();
                }, g2);
              });
              return;
            }
          }
          let $2 = C2, G2;
          Kt(c, false), C2 ? (C2.el = L2.el, Xe2(c, C2, v2)) : C2 = L2, w2 && en(w2), (G2 = C2.props && C2.props.onVnodeBeforeUpdate) && xt(G2, I2, C2, L2), Kt(c, true);
          const Z3 = rs(c), gt = c.subTree;
          c.subTree = Z3, O2(
            gt,
            Z3,
            // parent may have changed if it's in a teleport
            p(gt.el),
            // anchor may have changed if it's in a fragment
            Fe(gt),
            c,
            g2,
            m
          ), C2.el = Z3.el, $2 === null && qi(c, Z3.el), A2 && it(A2, g2), (G2 = C2.props && C2.props.onVnodeUpdated) && it(
            () => xt(G2, I2, C2, L2),
            g2
          );
        } else {
          let C2;
          const { el: w2, props: A2 } = a, { bm: I2, m: L2, parent: $2, root: G2, type: Z3 } = c, gt = ye(a);
          Kt(c, false), I2 && en(I2), !gt && (C2 = A2 && A2.onVnodeBeforeMount) && xt(C2, $2, a), Kt(c, true);
          {
            G2.ce && G2.ce._hasShadowRoot() && G2.ce._injectChildStyle(
              Z3,
              c.parent ? c.parent.type : void 0
            );
            const mt = c.subTree = rs(c);
            O2(
              null,
              mt,
              h,
              x2,
              c,
              g2,
              m
            ), a.el = mt.el;
          }
          if (L2 && it(L2, g2), !gt && (C2 = A2 && A2.onVnodeMounted)) {
            const mt = a;
            it(
              () => xt(C2, $2, mt),
              g2
            );
          }
          (a.shapeFlag & 256 || $2 && ye($2.vnode) && $2.vnode.shapeFlag & 256) && c.a && it(c.a, g2), c.isMounted = true, a = h = x2 = null;
        }
      }, "y");
      c.scope.on();
      const b2 = c.effect = new Gr(y2);
      c.scope.off();
      const _2 = c.update = b2.run.bind(b2), E2 = c.job = b2.runIfDirty.bind(b2);
      E2.i = c, E2.id = c.uid, b2.scheduler = () => Zs(E2), Kt(c, true), _2();
    }, "oe"), Xe2 = /* @__PURE__ */ __name((c, a, h) => {
      a.component = c;
      const x2 = c.vnode.props;
      c.vnode = a, c.next = null, Gi(c, a.props, x2, h), Qi(c, a.children, h), qt(), es(c), Yt();
    }, "Xe"), Ze2 = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2, y2, b2 = false) => {
      const _2 = c && c.children, E2 = c ? c.shapeFlag : 0, C2 = a.children, { patchFlag: w2, shapeFlag: A2 } = a;
      if (w2 > 0) {
        if (w2 & 128) {
          Wn(
            _2,
            C2,
            h,
            x2,
            g2,
            m,
            v2,
            y2,
            b2
          );
          return;
        } else if (w2 & 256) {
          Mr(
            _2,
            C2,
            h,
            x2,
            g2,
            m,
            v2,
            y2,
            b2
          );
          return;
        }
      }
      A2 & 8 ? (E2 & 16 && le(_2, g2, m), C2 !== _2 && u(h, C2)) : E2 & 16 ? A2 & 16 ? Wn(
        _2,
        C2,
        h,
        x2,
        g2,
        m,
        v2,
        y2,
        b2
      ) : le(_2, g2, m, true) : (E2 & 8 && u(h, ""), A2 & 16 && ft(
        C2,
        h,
        x2,
        g2,
        m,
        v2,
        y2,
        b2
      ));
    }, "Ze"), Mr = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2, y2, b2) => {
      c = c || ne, a = a || ne;
      const _2 = c.length, E2 = a.length, C2 = Math.min(_2, E2);
      let w2;
      for (w2 = 0; w2 < C2; w2++) {
        const A2 = a[w2] = b2 ? At(a[w2]) : Ct(a[w2]);
        O2(
          c[w2],
          A2,
          h,
          null,
          g2,
          m,
          v2,
          y2,
          b2
        );
      }
      _2 > E2 ? le(
        c,
        g2,
        m,
        true,
        false,
        C2
      ) : ft(
        a,
        h,
        x2,
        g2,
        m,
        v2,
        y2,
        b2,
        C2
      );
    }, "Mr"), Wn = /* @__PURE__ */ __name((c, a, h, x2, g2, m, v2, y2, b2) => {
      let _2 = 0;
      const E2 = a.length;
      let C2 = c.length - 1, w2 = E2 - 1;
      for (; _2 <= C2 && _2 <= w2; ) {
        const A2 = c[_2], I2 = a[_2] = b2 ? At(a[_2]) : Ct(a[_2]);
        if (ee(A2, I2))
          O2(
            A2,
            I2,
            h,
            null,
            g2,
            m,
            v2,
            y2,
            b2
          );
        else
          break;
        _2++;
      }
      for (; _2 <= C2 && _2 <= w2; ) {
        const A2 = c[C2], I2 = a[w2] = b2 ? At(a[w2]) : Ct(a[w2]);
        if (ee(A2, I2))
          O2(
            A2,
            I2,
            h,
            null,
            g2,
            m,
            v2,
            y2,
            b2
          );
        else
          break;
        C2--, w2--;
      }
      if (_2 > C2) {
        if (_2 <= w2) {
          const A2 = w2 + 1, I2 = A2 < E2 ? a[A2].el : x2;
          for (; _2 <= w2; )
            O2(
              null,
              a[_2] = b2 ? At(a[_2]) : Ct(a[_2]),
              h,
              I2,
              g2,
              m,
              v2,
              y2,
              b2
            ), _2++;
        }
      } else if (_2 > w2)
        for (; _2 <= C2; )
          Nt(c[_2], g2, m, true), _2++;
      else {
        const A2 = _2, I2 = _2, L2 = /* @__PURE__ */ new Map();
        for (_2 = I2; _2 <= w2; _2++) {
          const rt = a[_2] = b2 ? At(a[_2]) : Ct(a[_2]);
          rt.key != null && L2.set(rt.key, _2);
        }
        let $2, G2 = 0;
        const Z3 = w2 - I2 + 1;
        let gt = false, mt = 0;
        const fe = new Array(Z3);
        for (_2 = 0; _2 < Z3; _2++) fe[_2] = 0;
        for (_2 = A2; _2 <= C2; _2++) {
          const rt = c[_2];
          if (G2 >= Z3) {
            Nt(rt, g2, m, true);
            continue;
          }
          let _t;
          if (rt.key != null)
            _t = L2.get(rt.key);
          else
            for ($2 = I2; $2 <= w2; $2++)
              if (fe[$2 - I2] === 0 && ee(rt, a[$2])) {
                _t = $2;
                break;
              }
          _t === void 0 ? Nt(rt, g2, m, true) : (fe[_t - I2] = _2 + 1, _t >= mt ? mt = _t : gt = true, O2(
            rt,
            a[_t],
            h,
            null,
            g2,
            m,
            v2,
            y2,
            b2
          ), G2++);
        }
        const Yn2 = gt ? so(fe) : ne;
        for ($2 = Yn2.length - 1, _2 = Z3 - 1; _2 >= 0; _2--) {
          const rt = I2 + _2, _t = a[rt], Gn3 = a[rt + 1], Jn2 = rt + 1 < E2 ? (
            // #13559, #14173 fallback to el placeholder for unresolved async component
            Gn3.el || mr(Gn3)
          ) : x2;
          fe[_2] === 0 ? O2(
            null,
            _t,
            h,
            Jn2,
            g2,
            m,
            v2,
            y2,
            b2
          ) : gt && ($2 < 0 || _2 !== Yn2[$2] ? Pe(_t, h, Jn2, 2) : $2--);
        }
      }
    }, "Wn"), Pe = /* @__PURE__ */ __name((c, a, h, x2, g2 = null) => {
      const { el: m, type: v2, transition: y2, children: b2, shapeFlag: _2 } = c;
      if (_2 & 6) {
        Pe(c.component.subTree, a, h, x2);
        return;
      }
      if (_2 & 128) {
        c.suspense.move(a, h, x2);
        return;
      }
      if (_2 & 64) {
        v2.move(c, a, h, ce);
        return;
      }
      if (v2 === ut) {
        s(m, a, h);
        for (let C2 = 0; C2 < b2.length; C2++)
          Pe(b2[C2], a, h, x2);
        s(c.anchor, a, h);
        return;
      }
      if (v2 === fn) {
        q2(c, a, h);
        return;
      }
      if (x2 !== 2 && _2 & 1 && y2)
        if (x2 === 0)
          y2.beforeEnter(m), s(m, a, h), it(() => y2.enter(m), g2);
        else {
          const { leave: C2, delayLeave: w2, afterLeave: A2 } = y2, I2 = /* @__PURE__ */ __name(() => {
            c.ctx.isUnmounted ? r(m) : s(m, a, h);
          }, "I"), L2 = /* @__PURE__ */ __name(() => {
            m._isLeaving && m[Dt](
              true
              /* cancelled */
            ), C2(m, () => {
              I2(), A2 && A2();
            });
          }, "L");
          w2 ? w2(m, I2, L2) : L2();
        }
      else
        s(m, a, h);
    }, "Pe"), Nt = /* @__PURE__ */ __name((c, a, h, x2 = false, g2 = false) => {
      const {
        type: m,
        props: v2,
        ref: y2,
        children: b2,
        dynamicChildren: _2,
        shapeFlag: E2,
        patchFlag: C2,
        dirs: w2,
        cacheIndex: A2,
        memo: I2
      } = c;
      if (C2 === -2 && (g2 = false), y2 != null && (qt(), be(y2, null, h, c, true), Yt()), A2 != null && (a.renderCache[A2] = void 0), E2 & 256) {
        a.ctx.deactivate(c);
        return;
      }
      const L2 = E2 & 1 && w2, $2 = !ye(c);
      let G2;
      if ($2 && (G2 = v2 && v2.onVnodeBeforeUnmount) && xt(G2, a, c), E2 & 6)
        Fr(c.component, h, x2);
      else {
        if (E2 & 128) {
          c.suspense.unmount(h, x2);
          return;
        }
        L2 && Bt(c, null, a, "beforeUnmount"), E2 & 64 ? c.type.remove(
          c,
          a,
          h,
          ce,
          x2
        ) : _2 && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !_2.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (m !== ut || C2 > 0 && C2 & 64) ? le(
          _2,
          a,
          h,
          false,
          true
        ) : (m === ut && C2 & 384 || !g2 && E2 & 16) && le(b2, a, h), x2 && kn2(c);
      }
      const Z3 = I2 != null && A2 == null;
      ($2 && (G2 = v2 && v2.onVnodeUnmounted) || L2 || Z3) && it(() => {
        G2 && xt(G2, a, c), L2 && Bt(c, null, a, "unmounted"), Z3 && (c.el = null);
      }, h);
    }, "Nt"), kn2 = /* @__PURE__ */ __name((c) => {
      const { type: a, el: h, anchor: x2, transition: g2 } = c;
      if (a === ut) {
        Pr(h, x2);
        return;
      }
      if (a === fn) {
        X2(c);
        return;
      }
      const m = /* @__PURE__ */ __name(() => {
        r(h), g2 && !g2.persisted && g2.afterLeave && g2.afterLeave();
      }, "m");
      if (c.shapeFlag & 1 && g2 && !g2.persisted) {
        const { leave: v2, delayLeave: y2 } = g2, b2 = /* @__PURE__ */ __name(() => v2(h, m), "b");
        y2 ? y2(c.el, m, b2) : b2();
      } else
        m();
    }, "kn"), Pr = /* @__PURE__ */ __name((c, a) => {
      let h;
      for (; c !== a; )
        h = S2(c), r(c), c = h;
      r(a);
    }, "Pr"), Fr = /* @__PURE__ */ __name((c, a, h) => {
      const { bum: x2, scope: g2, job: m, subTree: v2, um: y2, m: b2, a: _2 } = c;
      ls(b2), ls(_2), x2 && en(x2), g2.stop(), m && (m.flags |= 8, Nt(v2, c, a, h)), y2 && it(y2, a), it(() => {
        c.isUnmounted = true;
      }, a);
    }, "Fr"), le = /* @__PURE__ */ __name((c, a, h, x2 = false, g2 = false, m = 0) => {
      for (let v2 = m; v2 < c.length; v2++)
        Nt(c[v2], a, h, x2, g2);
    }, "le"), Fe = /* @__PURE__ */ __name((c) => {
      if (c.shapeFlag & 6)
        return Fe(c.component.subTree);
      if (c.shapeFlag & 128)
        return c.suspense.next();
      const a = S2(c.anchor || c.el), h = a && a[Ti];
      return h ? S2(h) : a;
    }, "Fe");
    let Qe2 = false;
    const qn = /* @__PURE__ */ __name((c, a, h) => {
      let x2;
      c == null ? a._vnode && (Nt(a._vnode, null, null, true), x2 = a._vnode.component) : O2(
        a._vnode || null,
        c,
        a,
        null,
        null,
        null,
        h
      ), a._vnode = c, Qe2 || (Qe2 = true, es(x2), tr(), Qe2 = false);
    }, "qn"), ce = {
      p: O2,
      um: Nt,
      m: Pe,
      r: kn2,
      mt: et3,
      mc: ft,
      pc: Ze2,
      pbc: B2,
      n: Fe,
      o: t
    };
    return {
      render: qn,
      hydrate: void 0,
      createApp: Vi(qn)
    };
  }
  __name(eo, "eo");
  function cn({ type: t, props: e }, n) {
    return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
  }
  __name(cn, "cn");
  function Kt({ effect: t, job: e }, n) {
    n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
  }
  __name(Kt, "Kt");
  function no(t, e) {
    return (!t || t && !t.pendingBranch) && e && !e.persisted;
  }
  __name(no, "no");
  function pr(t, e, n = false) {
    const s = t.children, r = e.children;
    if (P(s) && P(r))
      for (let i = 0; i < s.length; i++) {
        const o = s[i];
        let l = r[i];
        l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = At(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && pr(o, l)), l.type === Je && (l.patchFlag === -1 && (l = r[i] = At(l)), l.el = o.el), l.type === Gt && !l.el && (l.el = o.el);
      }
  }
  __name(pr, "pr");
  function so(t) {
    const e = t.slice(), n = [0];
    let s, r, i, o, l;
    const f = t.length;
    for (s = 0; s < f; s++) {
      const d = t[s];
      if (d !== 0) {
        if (r = n[n.length - 1], t[r] < d) {
          e[s] = r, n.push(s);
          continue;
        }
        for (i = 0, o = n.length - 1; i < o; )
          l = i + o >> 1, t[n[l]] < d ? i = l + 1 : o = l;
        d < t[n[i]] && (i > 0 && (e[s] = n[i - 1]), n[i] = s);
      }
    }
    for (i = n.length, o = n[i - 1]; i-- > 0; )
      n[i] = o, o = e[o];
    return n;
  }
  __name(so, "so");
  function gr(t) {
    const e = t.subTree.component;
    if (e)
      return e.asyncDep && !e.asyncResolved ? e : gr(e);
  }
  __name(gr, "gr");
  function ls(t) {
    if (t)
      for (let e = 0; e < t.length; e++)
        t[e].flags |= 8;
  }
  __name(ls, "ls");
  function mr(t) {
    if (t.placeholder)
      return t.placeholder;
    const e = t.component;
    return e ? mr(e.subTree) : null;
  }
  __name(mr, "mr");
  var _r = /* @__PURE__ */ __name((t) => t.__isSuspense, "_r");
  function ro(t, e) {
    e && e.pendingBranch ? P(t) ? e.effects.push(...t) : e.effects.push(t) : Si(t);
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
  function cs(t, e = false) {
    Ae += t, t < 0 && ot && e && (ot.hasOnce = true);
  }
  __name(cs, "cs");
  function oo(t) {
    return t.dynamicChildren = Ae > 0 ? ot || ne : null, io(), Ae > 0 && ot && ot.push(t), t;
  }
  __name(oo, "oo");
  function un(t, e, n, s, r, i) {
    return oo(
      je(
        t,
        e,
        n,
        s,
        r,
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
  function ee(t, e) {
    return t.type === e.type && t.key === e.key;
  }
  __name(ee, "ee");
  var br = /* @__PURE__ */ __name(({ key: t }) => t ?? null, "br");
  var Ne = /* @__PURE__ */ __name(({
    ref: t,
    ref_key: e,
    ref_for: n
  }) => (typeof t == "number" && (t = "" + t), t != null ? W(t) || /* @__PURE__ */ pt(t) || K(t) ? { i: St, r: t, k: e, f: !!n } : t : null), "Ne");
  function je(t, e = null, n = null, s = 0, r = null, i = t === ut ? 0 : 1, o = false, l = false) {
    const f = {
      __v_isVNode: true,
      __v_skip: true,
      type: t,
      props: e,
      key: e && br(e),
      ref: e && Ne(e),
      scopeId: nr,
      slotScopeIds: null,
      children: n,
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
      patchFlag: s,
      dynamicProps: r,
      dynamicChildren: null,
      appContext: null,
      ctx: St
    };
    return l ? (Kn(f, n), i & 128 && t.normalize(f)) : n && (f.shapeFlag |= W(n) ? 8 : 16), Ae > 0 && // avoid a block node from tracking itself
    !o && // has current parent block
    ot && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (f.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    f.patchFlag !== 32 && ot.push(f), f;
  }
  __name(je, "je");
  var Mt = lo;
  function lo(t, e = null, n = null, s = 0, r = null, i = false) {
    if ((!t || t === Di) && (t = Gt), xr(t)) {
      const l = Jt(
        t,
        e,
        true
        /* mergeRef: true */
      );
      return n && Kn(l, n), Ae > 0 && !i && ot && (l.shapeFlag & 6 ? ot[ot.indexOf(t)] = l : ot.push(l)), l.patchFlag = -2, l;
    }
    if (yo(t) && (t = t.__vccOpts), e) {
      e = co(e);
      let { class: l, style: f } = e;
      l && !W(l) && (e.class = Se(l)), V(f) && (/* @__PURE__ */ Hn(f) && !P(f) && (f = lt({}, f)), e.style = Pn(f));
    }
    const o = W(t) ? 1 : _r(t) ? 128 : wi(t) ? 64 : V(t) ? 4 : K(t) ? 2 : 0;
    return je(
      t,
      e,
      n,
      s,
      r,
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
  function Jt(t, e, n = false, s = false) {
    const { props: r, ref: i, patchFlag: o, children: l, transition: f } = t, d = e ? ao(r || {}, e) : r, u = {
      __v_isVNode: true,
      __v_skip: true,
      type: t.type,
      props: d,
      key: d && br(d),
      ref: e && e.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        n && i ? P(i) ? i.concat(Ne(e)) : [i, Ne(e)] : Ne(e)
      ) : i,
      scopeId: t.scopeId,
      slotScopeIds: t.slotScopeIds,
      children: l,
      target: t.target,
      targetStart: t.targetStart,
      targetAnchor: t.targetAnchor,
      staticCount: t.staticCount,
      shapeFlag: t.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: e && t.type !== ut ? o === -1 ? 16 : o | 16 : o,
      dynamicProps: t.dynamicProps,
      dynamicChildren: t.dynamicChildren,
      appContext: t.appContext,
      dirs: t.dirs,
      transition: f,
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
    return f && s && Ee(
      u,
      f.clone(u)
    ), u;
  }
  __name(Jt, "Jt");
  function fo(t = " ", e = 0) {
    return Mt(Je, null, t, e);
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
  function Kn(t, e) {
    let n = 0;
    const { shapeFlag: s } = t;
    if (e == null)
      e = null;
    else if (P(e))
      n = 16;
    else if (typeof e == "object")
      if (s & 65) {
        const r = e.default;
        r && (r._c && (r._d = false), Kn(t, r()), r._c && (r._d = true));
        return;
      } else {
        n = 32;
        const r = e._;
        !r && !fr(e) ? e._ctx = St : r === 3 && St && (St.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
      }
    else K(e) ? (e = { default: e, _ctx: St }, n = 32) : (e = String(e), s & 64 ? (n = 16, e = [fo(e)]) : n = 8);
    t.children = e, t.shapeFlag |= n;
  }
  __name(Kn, "Kn");
  function ao(...t) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n];
      for (const r in s)
        if (r === "class")
          e.class !== s.class && (e.class = Se([e.class, s.class]));
        else if (r === "style")
          e.style = Pn([e.style, s.style]);
        else if (Ke(r)) {
          const i = e[r], o = s[r];
          o && i !== o && !(P(i) && i.includes(o)) ? e[r] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
          // the model listener.
          !ze(r) && (e[r] = o);
        } else r !== "" && (e[r] = s[r]);
    }
    return e;
  }
  __name(ao, "ao");
  function xt(t, e, n, s = null) {
    Ft(t, e, 7, [
      n,
      s
    ]);
  }
  __name(xt, "xt");
  var uo = ir();
  var ho = 0;
  function po(t, e, n) {
    const s = t.type, r = (e ? e.appContext : t.appContext) || uo, i = {
      uid: ho++,
      vnode: t,
      type: s,
      parent: e,
      appContext: r,
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
      provides: e ? e.provides : Object.create(r.provides),
      ids: e ? e.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: Ji(s, r),
      emitsOptions: zi(s, r),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: U,
      // inheritAttrs
      inheritAttrs: s.inheritAttrs,
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
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
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
    return i.ctx = { _: i }, i.root = e ? e.root : i, i.emit = Ki.bind(null, i), t.ce && t.ce(i), i;
  }
  __name(po, "po");
  var Xt = null;
  var go = /* @__PURE__ */ __name(() => Xt || St, "go");
  var Ve;
  var Tn;
  {
    const t = We(), e = /* @__PURE__ */ __name((n, s) => {
      let r;
      return (r = t[n]) || (r = t[n] = []), r.push(s), (i) => {
        r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
      };
    }, "e");
    Ve = e(
      "__VUE_INSTANCE_SETTERS__",
      (n) => Xt = n
    ), Tn = e(
      "__VUE_SSR_SETTERS__",
      (n) => vr = n
    );
  }
  var zn = /* @__PURE__ */ __name((t) => {
    const e = Xt;
    return Ve(t), t.scope.on(), () => {
      t.scope.off(), Ve(e);
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
  function mo(t, e = false, n = false) {
    e && Tn(e);
    const { props: s, children: r } = t.vnode, i = yr(t);
    Yi(t, s, i, e), Zi(t, r, n || e);
    const o = i ? _o(t, e) : void 0;
    return e && Tn(false), o;
  }
  __name(mo, "mo");
  function _o(t, e) {
    const n = t.type;
    t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Hi);
    const { setup: s } = n;
    if (s) {
      qt();
      const r = t.setupContext = s.length > 1 ? bo(t) : null, i = zn(t), o = Me(
        s,
        t,
        0,
        [
          t.props,
          r
        ]
      ), l = Fs(o);
      if (Yt(), i(), (l || t.sp) && !ye(t) && Pi(t), l) {
        if (o.then(fs, fs), e)
          return o.then((f) => {
            as(t, f);
          }).catch((f) => {
            Ye(f, t, 0);
          });
        t.asyncDep = o;
      } else
        as(t, o);
    } else
      Cr(t);
  }
  __name(_o, "_o");
  function as(t, e, n) {
    K(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : V(e) && (t.setupState = Js(e)), Cr(t);
  }
  __name(as, "as");
  function Cr(t, e, n) {
    const s = t.type;
    t.render || (t.render = s.render || On);
  }
  __name(Cr, "Cr");
  var xo = {
    get(t, e) {
      return tt(t, "get", ""), t[e];
    }
  };
  function bo(t) {
    const e = /* @__PURE__ */ __name((n) => {
      t.exposed = n || {};
    }, "e");
    return {
      attrs: new Proxy(t.attrs, xo),
      slots: t.slots,
      emit: t.emit,
      expose: e
    };
  }
  __name(bo, "bo");
  function Un(t) {
    return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Js(xi(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in ve)
          return ve[n](t);
      },
      has(e, n) {
        return n in e || n in ve;
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
    insert: /* @__PURE__ */ __name((t, e, n) => {
      e.insertBefore(t, n || null);
    }, "insert"),
    remove: /* @__PURE__ */ __name((t) => {
      const e = t.parentNode;
      e && e.removeChild(t);
    }, "remove"),
    createElement: /* @__PURE__ */ __name((t, e, n, s) => {
      const r = e === "svg" ? Et.createElementNS(Co, t) : e === "mathml" ? Et.createElementNS(So, t) : n ? Et.createElement(t, { is: n }) : Et.createElement(t);
      return t === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
    }, "createElement"),
    createText: /* @__PURE__ */ __name((t) => Et.createTextNode(t), "createText"),
    createComment: /* @__PURE__ */ __name((t) => Et.createComment(t), "createComment"),
    setText: /* @__PURE__ */ __name((t, e) => {
      t.nodeValue = e;
    }, "setText"),
    setElementText: /* @__PURE__ */ __name((t, e) => {
      t.textContent = e;
    }, "setElementText"),
    parentNode: /* @__PURE__ */ __name((t) => t.parentNode, "parentNode"),
    nextSibling: /* @__PURE__ */ __name((t) => t.nextSibling, "nextSibling"),
    querySelector: /* @__PURE__ */ __name((t) => Et.querySelector(t), "querySelector"),
    setScopeId(t, e) {
      t.setAttribute(e, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(t, e, n, s, r, i) {
      const o = n ? n.previousSibling : e.lastChild;
      if (r && (r === i || r.nextSibling))
        for (; e.insertBefore(r.cloneNode(true), n), !(r === i || !(r = r.nextSibling)); )
          ;
      else {
        ds.innerHTML = Sr(
          s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t
        );
        const l = ds.content;
        if (s === "svg" || s === "mathml") {
          const f = l.firstChild;
          for (; f.firstChild; )
            l.appendChild(f.firstChild);
          l.removeChild(f);
        }
        e.insertBefore(l, n);
      }
      return [
        // first
        o ? o.nextSibling : e.firstChild,
        // last
        n ? n.previousSibling : e.lastChild
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
  var zt = /* @__PURE__ */ __name((t, e = []) => {
    P(t) ? t.forEach((n) => n(...e)) : t && t(...e);
  }, "zt");
  var hs = /* @__PURE__ */ __name((t) => t ? P(t) ? t.some((e) => e.length > 1) : t.length > 1 : false, "hs");
  function Eo(t) {
    const e = {};
    for (const T2 in t)
      T2 in Tr || (e[T2] = t[T2]);
    if (t.css === false)
      return e;
    const {
      name: n = "v",
      type: s,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: f = i,
      appearActiveClass: d = o,
      appearToClass: u = l,
      leaveFromClass: p = `${n}-leave-from`,
      leaveActiveClass: S2 = `${n}-leave-active`,
      leaveToClass: F3 = `${n}-leave-to`
    } = t, H2 = Ao(r), O2 = H2 && H2[0], J2 = H2 && H2[1], {
      onBeforeEnter: k2,
      onEnter: N2,
      onEnterCancelled: q2,
      onLeave: X2,
      onLeaveCancelled: st,
      onBeforeAppear: ct2 = k2,
      onAppear: It2 = N2,
      onAppearCancelled: ft = q2
    } = e, M2 = /* @__PURE__ */ __name((T2, z, et3, Rt) => {
      T2._enterCancelled = Rt, $t(T2, z ? u : l), $t(T2, z ? d : o), et3 && et3();
    }, "M"), B2 = /* @__PURE__ */ __name((T2, z) => {
      T2._isLeaving = false, $t(T2, p), $t(T2, F3), $t(T2, S2), z && z();
    }, "B"), Y3 = /* @__PURE__ */ __name((T2) => (z, et3) => {
      const Rt = T2 ? It2 : N2, oe = /* @__PURE__ */ __name(() => M2(z, T2, et3), "oe");
      zt(Rt, [z, oe]), ps(() => {
        $t(z, T2 ? f : i), bt(z, T2 ? u : l), hs(Rt) || gs(z, s, O2, oe);
      });
    }, "Y");
    return lt(e, {
      onBeforeEnter(T2) {
        zt(k2, [T2]), bt(T2, i), bt(T2, o);
      },
      onBeforeAppear(T2) {
        zt(ct2, [T2]), bt(T2, f), bt(T2, d);
      },
      onEnter: Y3(false),
      onAppear: Y3(true),
      onLeave(T2, z) {
        T2._isLeaving = true;
        const et3 = /* @__PURE__ */ __name(() => B2(T2, z), "et");
        bt(T2, p), T2._enterCancelled ? (bt(T2, S2), En(T2)) : (En(T2), bt(T2, S2)), ps(() => {
          T2._isLeaving && ($t(T2, p), bt(T2, F3), hs(X2) || gs(T2, s, J2, et3));
        }), zt(X2, [T2, et3]);
      },
      onEnterCancelled(T2) {
        M2(T2, false, void 0, true), zt(q2, [T2]);
      },
      onAppearCancelled(T2) {
        M2(T2, true, void 0, true), zt(ft, [T2]);
      },
      onLeaveCancelled(T2) {
        B2(T2), zt(st, [T2]);
      }
    });
  }
  __name(Eo, "Eo");
  function Ao(t) {
    if (t == null)
      return null;
    if (V(t))
      return [dn(t.enter), dn(t.leave)];
    {
      const e = dn(t);
      return [e, e];
    }
  }
  __name(Ao, "Ao");
  function dn(t) {
    return Vr(t);
  }
  __name(dn, "dn");
  function bt(t, e) {
    e.split(/\s+/).forEach((n) => n && t.classList.add(n)), (t[ie] || (t[ie] = /* @__PURE__ */ new Set())).add(e);
  }
  __name(bt, "bt");
  function $t(t, e) {
    e.split(/\s+/).forEach((s) => s && t.classList.remove(s));
    const n = t[ie];
    n && (n.delete(e), n.size || (t[ie] = void 0));
  }
  __name($t, "$t");
  function ps(t) {
    requestAnimationFrame(() => {
      requestAnimationFrame(t);
    });
  }
  __name(ps, "ps");
  var Oo = 0;
  function gs(t, e, n, s) {
    const r = t._endId = ++Oo, i = /* @__PURE__ */ __name(() => {
      r === t._endId && s();
    }, "i");
    if (n != null)
      return setTimeout(i, n);
    const { type: o, timeout: l, propCount: f } = wr(t, e);
    if (!o)
      return s();
    const d = o + "end";
    let u = 0;
    const p = /* @__PURE__ */ __name(() => {
      t.removeEventListener(d, S2), i();
    }, "p"), S2 = /* @__PURE__ */ __name((F3) => {
      F3.target === t && ++u >= f && p();
    }, "S");
    setTimeout(() => {
      u < f && p();
    }, l + 1), t.addEventListener(d, S2);
  }
  __name(gs, "gs");
  function wr(t, e) {
    const n = window.getComputedStyle(t), s = /* @__PURE__ */ __name((H2) => (n[H2] || "").split(", "), "s"), r = s(`${Lt}Delay`), i = s(`${Lt}Duration`), o = ms(r, i), l = s(`${de}Delay`), f = s(`${de}Duration`), d = ms(l, f);
    let u = null, p = 0, S2 = 0;
    e === Lt ? o > 0 && (u = Lt, p = o, S2 = i.length) : e === de ? d > 0 && (u = de, p = d, S2 = f.length) : (p = Math.max(o, d), u = p > 0 ? o > d ? Lt : de : null, S2 = u ? u === Lt ? i.length : f.length : 0);
    const F3 = u === Lt && /\b(?:transform|all)(?:,|$)/.test(
      s(`${Lt}Property`).toString()
    );
    return {
      type: u,
      timeout: p,
      propCount: S2,
      hasTransform: F3
    };
  }
  __name(wr, "wr");
  function ms(t, e) {
    for (; t.length < e.length; )
      t = t.concat(t);
    return Math.max(...e.map((n, s) => _s(n) + _s(t[s])));
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
  function Mo(t, e, n) {
    const s = t[ie];
    s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
  }
  __name(Mo, "Mo");
  var xs = /* @__PURE__ */ Symbol("_vod");
  var Po = /* @__PURE__ */ Symbol("_vsh");
  var Fo = /* @__PURE__ */ Symbol("");
  var Io = /(?:^|;)\s*display\s*:/;
  function Ro(t, e, n) {
    const s = t.style, r = W(n);
    let i = false;
    if (n && !r) {
      if (e)
        if (W(e))
          for (const o of e.split(";")) {
            const l = o.slice(0, o.indexOf(":")).trim();
            n[l] == null && pe(s, l, "");
          }
        else
          for (const o in e)
            n[o] == null && pe(s, o, "");
      for (const o in n) {
        o === "display" && (i = true);
        const l = n[o];
        l != null ? Lo(
          t,
          o,
          !W(e) && e ? e[o] : void 0,
          l
        ) || pe(s, o, l) : pe(s, o, "");
      }
    } else if (r) {
      if (e !== n) {
        const o = s[Fo];
        o && (n += ";" + o), s.cssText = n, i = Io.test(n);
      }
    } else e && t.removeAttribute("style");
    xs in t && (t[xs] = i ? s.display : "", t[Po] && (s.display = "none"));
  }
  __name(Ro, "Ro");
  var bs = /\s*!important$/;
  function pe(t, e, n) {
    if (P(n))
      n.forEach((s) => pe(t, e, s));
    else if (n == null && (n = ""), e.startsWith("--"))
      t.setProperty(e, n);
    else {
      const s = No(t, e);
      bs.test(n) ? t.setProperty(
        Zt(s),
        n.replace(bs, ""),
        "important"
      ) : t[s] = n;
    }
  }
  __name(pe, "pe");
  var ys = ["Webkit", "Moz", "ms"];
  var hn = {};
  function No(t, e) {
    const n = hn[e];
    if (n)
      return n;
    let s = dt(e);
    if (s !== "filter" && s in t)
      return hn[e] = s;
    s = Rs(s);
    for (let r = 0; r < ys.length; r++) {
      const i = ys[r] + s;
      if (i in t)
        return hn[e] = i;
    }
    return e;
  }
  __name(No, "No");
  function Lo(t, e, n, s) {
    return t.tagName === "TEXTAREA" && (e === "width" || e === "height") && W(s) && n === s;
  }
  __name(Lo, "Lo");
  var vs = "http://www.w3.org/1999/xlink";
  function Cs(t, e, n, s, r, i = kr(e)) {
    s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(vs, e.slice(6, e.length)) : t.setAttributeNS(vs, e, n) : n == null || i && !Ls(n) ? t.removeAttribute(e) : t.setAttribute(
      e,
      i ? "" : Tt(n) ? String(n) : n
    );
  }
  __name(Cs, "Cs");
  function Ss(t, e, n, s, r) {
    if (e === "innerHTML" || e === "textContent") {
      n != null && (t[e] = e === "innerHTML" ? Sr(n) : n);
      return;
    }
    const i = t.tagName;
    if (e === "value" && i !== "PROGRESS" && // custom elements may use _value internally
    !i.includes("-")) {
      const l = i === "OPTION" ? t.getAttribute("value") || "" : t.value, f = n == null ? (
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        t.type === "checkbox" ? "on" : ""
      ) : String(n);
      (l !== f || !("_value" in t)) && (t.value = f), n == null && t.removeAttribute(e), t._value = n;
      return;
    }
    let o = false;
    if (n === "" || n == null) {
      const l = typeof t[e];
      l === "boolean" ? n = Ls(n) : n == null && l === "string" ? (n = "", o = true) : l === "number" && (n = 0, o = true);
    }
    try {
      t[e] = n;
    } catch {
    }
    o && t.removeAttribute(r || e);
  }
  __name(Ss, "Ss");
  function Do(t, e, n, s) {
    t.addEventListener(e, n, s);
  }
  __name(Do, "Do");
  function $o(t, e, n, s) {
    t.removeEventListener(e, n, s);
  }
  __name($o, "$o");
  var Ts = /* @__PURE__ */ Symbol("_vei");
  function Ho(t, e, n, s, r = null) {
    const i = t[Ts] || (t[Ts] = {}), o = i[e];
    if (s && o)
      o.value = s;
    else {
      const [l, f] = jo(e);
      if (s) {
        const d = i[e] = Ko(
          s,
          r
        );
        Do(t, l, d, f);
      } else o && ($o(t, l, o, f), i[e] = void 0);
    }
  }
  __name(Ho, "Ho");
  var ws = /(?:Once|Passive|Capture)$/;
  function jo(t) {
    let e;
    if (ws.test(t)) {
      e = {};
      let s;
      for (; s = t.match(ws); )
        t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = true;
    }
    return [t[2] === ":" ? t.slice(3) : Zt(t.slice(2)), e];
  }
  __name(jo, "jo");
  var pn = 0;
  var Vo = /* @__PURE__ */ Promise.resolve();
  var Bo = /* @__PURE__ */ __name(() => pn || (Vo.then(() => pn = 0), pn = Date.now()), "Bo");
  function Ko(t, e) {
    const n = /* @__PURE__ */ __name((s) => {
      if (!s._vts)
        s._vts = Date.now();
      else if (s._vts <= n.attached)
        return;
      Ft(
        zo(s, n.value),
        e,
        5,
        [s]
      );
    }, "n");
    return n.value = t, n.attached = Bo(), n;
  }
  __name(Ko, "Ko");
  function zo(t, e) {
    if (P(e)) {
      const n = t.stopImmediatePropagation;
      return t.stopImmediatePropagation = () => {
        n.call(t), t._stopped = true;
      }, e.map(
        (s) => (r) => !r._stopped && s && s(r)
      );
    } else
      return e;
  }
  __name(zo, "zo");
  var Es = /* @__PURE__ */ __name((t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
  t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, "Es");
  var Uo = /* @__PURE__ */ __name((t, e, n, s, r, i) => {
    const o = r === "svg";
    e === "class" ? Mo(t, s, o) : e === "style" ? Ro(t, n, s) : Ke(e) ? ze(e) || Ho(t, e, n, s, i) : (e[0] === "." ? (e = e.slice(1), true) : e[0] === "^" ? (e = e.slice(1), false) : Wo(t, e, s, o)) ? (Ss(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && Cs(t, e, s, o, i, e !== "value")) : (
      /* #11081 force set props for possible async custom element */
      t._isVueCE && // #12408 check if it's declared prop or it's async custom element
      (ko(t, e) || // @ts-expect-error _def is private
      t._def.__asyncLoader && (/[A-Z]/.test(e) || !W(s))) ? Ss(t, dt(e), s, i, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), Cs(t, e, s, o))
    );
  }, "Uo");
  function Wo(t, e, n, s) {
    if (s)
      return !!(e === "innerHTML" || e === "textContent" || e in t && Es(e) && K(n));
    if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t.tagName === "IFRAME" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
      return false;
    if (e === "width" || e === "height") {
      const r = t.tagName;
      if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
        return false;
    }
    return Es(e) && W(n) ? false : e in t;
  }
  __name(Wo, "Wo");
  function ko(t, e) {
    const n = (
      // @ts-expect-error _def is private
      t._def.props
    );
    if (!n)
      return false;
    const s = dt(e);
    return Array.isArray(n) ? n.some((r) => dt(r) === s) : Object.keys(n).some((r) => dt(r) === s);
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
    setup(t, { slots: e }) {
      const n = go(), s = Ei();
      let r, i;
      return Ni(() => {
        if (!r.length)
          return;
        const o = t.moveClass || `${t.name || "v"}-move`;
        if (!Qo(
          r[0].el,
          n.vnode.el,
          o
        )) {
          r = [];
          return;
        }
        r.forEach(Jo), r.forEach(Xo);
        const l = r.filter(Zo);
        En(n.vnode.el), l.forEach((f) => {
          const d = f.el, u = d.style;
          bt(d, o), u.transform = u.webkitTransform = u.transitionDuration = "";
          const p = d[Be] = (S2) => {
            S2 && S2.target !== d || (!S2 || S2.propertyName.endsWith("transform")) && (d.removeEventListener("transitionend", p), d[Be] = null, $t(d, o));
          };
          d.addEventListener("transitionend", p);
        }), r = [];
      }), () => {
        const o = /* @__PURE__ */ R(t), l = Eo(o);
        let f = o.tag || ut;
        if (r = [], i)
          for (let d = 0; d < i.length; d++) {
            const u = i[d];
            u.el && u.el instanceof Element && (r.push(u), Ee(
              u,
              vn(
                u,
                l,
                s,
                n
              )
            ), Er.set(u, Or(u.el)));
          }
        i = e.default ? rr(e.default()) : [];
        for (let d = 0; d < i.length; d++) {
          const u = i[d];
          u.key != null && Ee(
            u,
            vn(u, l, s, n)
          );
        }
        return Mt(f, null, i);
      };
    }
  });
  var Go = Yo;
  function Jo(t) {
    const e = t.el;
    e[Be] && e[Be](), e[As] && e[As]();
  }
  __name(Jo, "Jo");
  function Xo(t) {
    Ar.set(t, Or(t.el));
  }
  __name(Xo, "Xo");
  function Zo(t) {
    const e = Er.get(t), n = Ar.get(t), s = e.left - n.left, r = e.top - n.top;
    if (s || r) {
      const i = t.el, o = i.style, l = i.getBoundingClientRect();
      let f = 1, d = 1;
      return i.offsetWidth && (f = l.width / i.offsetWidth), i.offsetHeight && (d = l.height / i.offsetHeight), (!Number.isFinite(f) || f === 0) && (f = 1), (!Number.isFinite(d) || d === 0) && (d = 1), Math.abs(f - 1) < 0.01 && (f = 1), Math.abs(d - 1) < 0.01 && (d = 1), o.transform = o.webkitTransform = `translate(${s / f}px,${r / d}px)`, o.transitionDuration = "0s", t;
    }
  }
  __name(Zo, "Zo");
  function Or(t) {
    const e = t.getBoundingClientRect();
    return {
      left: e.left,
      top: e.top
    };
  }
  __name(Or, "Or");
  function Qo(t, e, n) {
    const s = t.cloneNode(), r = t[ie];
    r && r.forEach((l) => {
      l.split(/\s+/).forEach((f) => f && s.classList.remove(f));
    }), n.split(/\s+/).forEach((l) => l && s.classList.add(l)), s.style.display = "none";
    const i = e.nodeType === 1 ? e : e.parentNode;
    i.appendChild(s);
    const { hasTransform: o } = wr(s);
    return i.removeChild(s), o;
  }
  __name(Qo, "Qo");
  var tl = /* @__PURE__ */ lt({ patchProp: Uo }, To);
  var Os;
  function el() {
    return Os || (Os = to(tl));
  }
  __name(el, "el");
  var nl = /* @__PURE__ */ __name(((...t) => {
    const e = el().createApp(...t), { mount: n } = e;
    return e.mount = (s) => {
      const r = rl(s);
      if (!r) return;
      const i = e._component;
      !K(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
      const o = n(r, false, sl(r));
      return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
    }, e;
  }), "nl");
  function sl(t) {
    if (t instanceof SVGElement)
      return "svg";
    if (typeof MathMLElement == "function" && t instanceof MathMLElement)
      return "mathml";
  }
  __name(sl, "sl");
  function rl(t) {
    return W(t) ? document.querySelector(t) : t;
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
      return (e, n) => (an(), un("div", {
        class: "xlxz-toast-container",
        "data-position": yn(Wt).position
      }, [
        Mt(Go, { name: "xlxz-toast-anim" }, {
          default: sr(() => [
            (an(true), un(ut, null, $i(yn(Wt).items, (s) => (an(), un("div", {
              key: s.id,
              class: Se(["xlxz-toast", { "xlxz-toast-exit": s.exiting }])
            }, [
              je("span", {
                class: Se(["xlxz-toast-icon", `xlxz-toast-icon--${s.type}`])
              }, null, 2),
              je("span", null, $s(s.message), 1)
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
      const e = document.createElement("style");
      e.textContent = ll + `
` + cl, document.head.appendChild(e), Ms = true;
    }
    he = document.createElement("div"), he.className = "xlxz-root", document.body.appendChild(he), nl(ol).mount(he);
  }
  __name(al, "al");
  function hl(t, e = {}) {
    al();
    const { duration: n = 3e3, type: s = "info" } = e, r = fl++;
    Wt.items.push({ id: r, message: t, type: s, exiting: false }), setTimeout(() => {
      const i = Wt.items.find((o) => o.id === r);
      i && (i.exiting = true), setTimeout(() => {
        const o = Wt.items.findIndex((l) => l.id === r);
        o !== -1 && Wt.items.splice(o, 1);
      }, 300);
    }, n);
  }
  __name(hl, "hl");

  // packages/components/dist/config-panel.js
  var U2 = {};
  var Vs2 = /* @__PURE__ */ __name(() => false, "Vs");
  var P2 = Array.isArray;
  var j2 = /* @__PURE__ */ __name((e) => typeof e == "function", "j");
  var Ee2 = /* @__PURE__ */ __name((e) => typeof e == "symbol", "Ee");
  var V2 = /* @__PURE__ */ __name((e) => e !== null && typeof e == "object", "V");
  var Bs2 = /* @__PURE__ */ __name((e) => (V2(e) || j2(e)) && j2(e.then) && j2(e.catch), "Bs");
  var Yt2 = /* @__PURE__ */ __name((e) => {
    const t = /* @__PURE__ */ Object.create(null);
    return ((n) => t[n] || (t[n] = e(n)));
  }, "Yt");
  var Xr2 = /-\w/g;
  var xe2 = Yt2(
    (e) => e.replace(Xr2, (t) => t.slice(1).toUpperCase())
  );
  var Zr2 = /\B([A-Z])/g;
  var et = Yt2(
    (e) => e.replace(Zr2, "-$1").toLowerCase()
  );
  var ks2 = Yt2((e) => e.charAt(0).toUpperCase() + e.slice(1));
  var ln2 = Yt2(
    (e) => e ? `on${ks2(e)}` : ""
  );
  var ss2;
  var Gt2 = /* @__PURE__ */ __name(() => ss2 || (ss2 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), "Gt");
  var be2 = true;
  var tr2 = [];
  function Xe() {
    tr2.push(be2), be2 = false;
  }
  __name(Xe, "Xe");
  function Ze() {
    const e = tr2.pop();
    be2 = e === void 0 ? true : e;
  }
  __name(Ze, "Ze");
  var po2 = Array.prototype;
  var rr2 = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ee2)
  );
  function It(e, t, n, s) {
    try {
      return s ? e(...s) : e();
    } catch (r) {
      Qt2(r, t, n);
    }
  }
  __name(It, "It");
  function Ne2(e, t, n, s) {
    if (j2(e)) {
      const r = It(e, t, n, s);
      return r && Bs2(r) && r.catch((o) => {
        Qt2(o, t, n);
      }), r;
    }
    if (P2(e)) {
      const r = [];
      for (let o = 0; o < e.length; o++)
        r.push(Ne2(e[o], t, n, s));
      return r;
    }
  }
  __name(Ne2, "Ne");
  function Qt2(e, t, n, s = true) {
    const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || U2;
    if (t) {
      let l = t.parent;
      const f = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; l; ) {
        const u = l.ec;
        if (u) {
          for (let h = 0; h < u.length; h++)
            if (u[h](e, f, d) === false)
              return;
        }
        l = l.parent;
      }
      if (o) {
        Xe(), It(o, null, 10, [
          e,
          f,
          d
        ]), Ze();
        return;
      }
    }
    No2(e, n, r, s, i);
  }
  __name(Qt2, "Qt");
  function No2(e, t, n, s = true, r = false) {
    if (r)
      throw e;
    console.error(e);
  }
  __name(No2, "No");
  Gt2().requestIdleCallback;
  Gt2().cancelIdleCallback;
  function Ko2(e, t, n = Qe, s = false) {
    if (n) {
      const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
        Xe();
        const l = Yn(n), f = Ne2(t, n, e, i);
        return l(), Ze(), f;
      });
      return s ? r.unshift(o) : r.push(o), o;
    }
  }
  __name(Ko2, "Ko");
  var wr2 = /* @__PURE__ */ __name((e) => (t, n = Qe) => {
    (!Gn || e === "sp") && Ko2(e, (...s) => t(...s), n);
  }, "wr");
  var ko2 = wr2("m");
  var Wo2 = wr2(
    "bum"
  );
  function Tr2() {
    return {
      app: null,
      config: {
        isNativeTag: Vs2,
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
  __name(Tr2, "Tr");
  var yi2 = Tr2();
  var Qe = null;
  var kt2;
  var Pn2;
  {
    const e = Gt2(), t = /* @__PURE__ */ __name((n, s) => {
      let r;
      return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
        r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
      };
    }, "t");
    kt2 = t(
      "__VUE_INSTANCE_SETTERS__",
      (n) => Qe = n
    ), Pn2 = t(
      "__VUE_SSR_SETTERS__",
      (n) => Gn = n
    );
  }
  var Yn = /* @__PURE__ */ __name((e) => {
    const t = Qe;
    return kt2(e), e.scope.on(), () => {
      e.scope.off(), kt2(t);
    };
  }, "Yn");
  var Gn = false;
  var On2;
  var xs2 = typeof window < "u" && window.trustedTypes;
  if (xs2)
    try {
      On2 = /* @__PURE__ */ xs2.createPolicy("vue", {
        createHTML: /* @__PURE__ */ __name((e) => e, "createHTML")
      });
    } catch {
    }

  // packages/components/dist/floating-panel.js
  var Z = {};
  var Ks2 = /* @__PURE__ */ __name(() => false, "Ks");
  var F = Array.isArray;
  var k = /* @__PURE__ */ __name((e) => typeof e == "function", "k");
  var $e2 = /* @__PURE__ */ __name((e) => typeof e == "symbol", "$e");
  var Y = /* @__PURE__ */ __name((e) => e !== null && typeof e == "object", "Y");
  var Ws2 = /* @__PURE__ */ __name((e) => (Y(e) || k(e)) && k(e.then) && k(e.catch), "Ws");
  var Zt2 = /* @__PURE__ */ __name((e) => {
    const t = /* @__PURE__ */ Object.create(null);
    return ((n) => t[n] || (t[n] = e(n)));
  }, "Zt");
  var ei2 = /-\w/g;
  var Se2 = Zt2(
    (e) => e.replace(ei2, (t) => t.slice(1).toUpperCase())
  );
  var ti2 = /\B([A-Z])/g;
  var ct = Zt2(
    (e) => e.replace(ti2, "-$1").toLowerCase()
  );
  var ks3 = Zt2((e) => e.charAt(0).toUpperCase() + e.slice(1));
  var rn2 = Zt2(
    (e) => e ? `on${ks3(e)}` : ""
  );
  var is2;
  var Qt3 = /* @__PURE__ */ __name(() => is2 || (is2 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), "Qt");
  var Te2 = true;
  var sr2 = [];
  function it2() {
    sr2.push(Te2), Te2 = false;
  }
  __name(it2, "it");
  function ot2() {
    const e = sr2.pop();
    Te2 = e === void 0 ? true : e;
  }
  __name(ot2, "ot");
  var mi2 = Array.prototype;
  var ir2 = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter($e2)
  );
  function Ht2(e, t, n, s) {
    try {
      return s ? e(...s) : e();
    } catch (r) {
      en2(r, t, n);
    }
  }
  __name(Ht2, "Ht");
  function We2(e, t, n, s) {
    if (k(e)) {
      const r = Ht2(e, t, n, s);
      return r && Ws2(r) && r.catch((i) => {
        en2(i, t, n);
      }), r;
    }
    if (F(e)) {
      const r = [];
      for (let i = 0; i < e.length; i++)
        r.push(We2(e[i], t, n, s));
      return r;
    }
  }
  __name(We2, "We");
  function en2(e, t, n, s = true) {
    const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Z;
    if (t) {
      let l = t.parent;
      const f = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; l; ) {
        const u = l.ec;
        if (u) {
          for (let p = 0; p < u.length; p++)
            if (u[p](e, f, d) === false)
              return;
        }
        l = l.parent;
      }
      if (i) {
        it2(), Ht2(i, null, 10, [
          e,
          f,
          d
        ]), ot2();
        return;
      }
    }
    zi2(e, n, r, s, o);
  }
  __name(en2, "en");
  function zi2(e, t, n, s = true, r = false) {
    if (r)
      throw e;
    console.error(e);
  }
  __name(zi2, "zi");
  Qt3().requestIdleCallback;
  Qt3().cancelIdleCallback;
  function Xi2(e, t, n = lt2, s = false) {
    if (n) {
      const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
        it2();
        const l = Gn2(n), f = We2(t, n, e, o);
        return l(), ot2(), f;
      });
      return s ? r.unshift(i) : r.push(i), i;
    }
  }
  __name(Xi2, "Xi");
  var kn = /* @__PURE__ */ __name((e) => (t, n = lt2) => {
    (!Jn || e === "sp") && Xi2(e, (...s) => t(...s), n);
  }, "kn");
  var Er2 = kn("m");
  var qi2 = kn(
    "bum"
  );
  var Gi2 = kn("um");
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
  var Co2 = Ar2();
  var lt2 = null;
  var qt2;
  var Rn2;
  {
    const e = Qt3(), t = /* @__PURE__ */ __name((n, s) => {
      let r;
      return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
        r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
      };
    }, "t");
    qt2 = t(
      "__VUE_INSTANCE_SETTERS__",
      (n) => lt2 = n
    ), Rn2 = t(
      "__VUE_SSR_SETTERS__",
      (n) => Jn = n
    );
  }
  var Gn2 = /* @__PURE__ */ __name((e) => {
    const t = lt2;
    return qt2(e), e.scope.on(), () => {
      e.scope.off(), qt2(t);
    };
  }, "Gn");
  var Jn = false;
  var Pn3;
  var vs2 = typeof window < "u" && window.trustedTypes;
  if (vs2)
    try {
      Pn3 = /* @__PURE__ */ vs2.createPolicy("vue", {
        createHTML: /* @__PURE__ */ __name((e) => e, "createHTML")
      });
    } catch {
    }

  // packages/components/dist/animated-slider.js
  var E = String.raw;
  var V3 = (() => {
    try {
      document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return false;
    }
    return true;
  })();
  var F2 = typeof CSS < "u" && CSS.supports && CSS.supports("line-height", "mod(1,1)");
  var B = typeof matchMedia < "u" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
  var y = "--_number-flow-d-opacity";
  var S = "--_number-flow-d-width";
  var x = "--_number-flow-dx";
  var A = "--_number-flow-d";
  var I = (() => {
    try {
      return CSS.registerProperty({
        name: y,
        syntax: "<number>",
        inherits: false,
        initialValue: "0"
      }), CSS.registerProperty({
        name: x,
        syntax: "<length>",
        inherits: true,
        initialValue: "0px"
      }), CSS.registerProperty({
        name: S,
        syntax: "<number>",
        inherits: false,
        initialValue: "0"
      }), CSS.registerProperty({
        name: A,
        syntax: "<number>",
        inherits: true,
        initialValue: "0"
      }), true;
    } catch {
      return false;
    }
  })();
  var w = "round(nearest, calc(var(--number-flow-mask-height, 0.25em) / 2), 1px)";
  var g = `calc(${w} * 2)`;
  var $ = "var(--number-flow-mask-width, 0.5em)";
  var b = `calc(${$} / var(--scale-x))`;
  var _ = "#000 0, transparent 71%";
  var N = E`:host{display:inline-block;direction:ltr;white-space:nowrap;isolation:isolate;line-height:1}.number,.number__inner{display:inline-block;transform-origin:left top}:host([data-will-change]) :is(.number,.number__inner,.section,.digit,.digit__num,.symbol){will-change:transform}.number{--scale-x:calc(1 + var(${S}) / var(--width));transform:translateX(var(${x})) scaleX(var(--scale-x));margin:0 calc(-1 * ${$});position:relative;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 ${b},#000 calc(100% - ${b}),transparent ),linear-gradient(to bottom,transparent 0,#000 ${g},#000 calc(100% - ${g}),transparent 100% ),radial-gradient(at bottom right,${_}),radial-gradient(at bottom left,${_}),radial-gradient(at top left,${_}),radial-gradient(at top right,${_});-webkit-mask-size:100% calc(100% - ${g} * 2),calc(100% - ${b} * 2) 100%,${b} ${g},${b} ${g},${b} ${g},${b} ${g};-webkit-mask-position:center,center,top left,top right,bottom right,bottom left;-webkit-mask-repeat:no-repeat}.number__inner{padding:${w} ${$};transform:scaleX(calc(1 / var(--scale-x))) translateX(calc(-1 * var(${x})))}:host > :not(.number){z-index:5}.section,.symbol{display:inline-block;position:relative;isolation:isolate}.section::after{content:'\200b';display:inline-block}.section--justify-left{transform-origin:center left}.section--justify-right{transform-origin:center right}.section > [inert],.symbol > [inert]{margin:0 !important;position:absolute !important;z-index:-1}.digit{display:inline-block;position:relative;--c:var(--current) + var(${A})}.digit__num,.number .section::after{padding:${w} 0}.digit__num{display:inline-block;--offset-raw:mod(var(--length) + var(--n) - mod(var(--c),var(--length)),var(--length));--offset:calc( var(--offset-raw) - var(--length) * round(down,var(--offset-raw) / (var(--length) / 2),1) );--y:clamp(-100%,var(--offset) * 100%,100%);transform:translateY(var(--y))}.digit__num[inert]{position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(var(--y))}.digit:not(.is-spinning) .digit__num[inert]{display:none}.symbol__value{display:inline-block;mix-blend-mode:plus-lighter;white-space:pre}.section--justify-left .symbol > [inert]{left:0}.section--justify-right .symbol > [inert]{right:0}.animate-presence{opacity:calc(1 + var(${y}))}`;
  var X = HTMLElement;
  var W2 = E`:host{display:inline-block;direction:ltr;white-space:nowrap;line-height:1}span{display:inline-block}:host([data-will-change]) span{will-change:transform}.number,.digit{padding:${w} 0}.symbol{white-space:pre}`;
  var D2 = /* @__PURE__ */ __name((s = "") => E`:where(number-flow${s}){line-height:1}number-flow${s} > span{font-kerning:none;display:inline-block;padding:${g} 0}`, "D");
  var v = /* @__PURE__ */ __name((s, t, e) => {
    const i = document.createElement(s), [n, a] = Array.isArray(t) ? [void 0, t] : [t, e];
    return n && Object.assign(i, n), a == null || a.forEach((r) => i.appendChild(r)), i;
  }, "v");
  var O = /* @__PURE__ */ __name((s, t) => {
    var e;
    return t === "left" ? s.offsetLeft : (((e = s.offsetParent instanceof HTMLElement ? s.offsetParent : null) == null ? void 0 : e.offsetWidth) ?? 0) - s.offsetWidth - s.offsetLeft;
  }, "O");
  var H = /* @__PURE__ */ __name((s) => s.offsetWidth > 0 && s.offsetHeight > 0, "H");
  var Y2 = /* @__PURE__ */ __name((s, t) => {
    !customElements.get(s) && customElements.define(s, t);
  }, "Y");
  function Z2(s, t, { reverse: e = false } = {}) {
    const i = s.length;
    for (let n = e ? i - 1 : 0; e ? n >= 0 : n < i; e ? n-- : n++)
      t(s[n], n);
  }
  __name(Z2, "Z");
  function q(s, t, e, i) {
    const n = t.formatToParts(s);
    e && n.unshift({ type: "prefix", value: e }), i && n.push({ type: "suffix", value: i });
    const a = [], r = [], o = [], d = [], h = {}, l = /* @__PURE__ */ __name((u) => `${u}:${h[u] = (h[u] ?? -1) + 1}`, "l");
    let m = "", f = false, p = false;
    for (const u of n) {
      m += u.value;
      const c = u.type === "minusSign" || u.type === "plusSign" ? "sign" : u.type;
      c === "integer" ? (f = true, r.push(...u.value.split("").map((k2) => ({ type: c, value: parseInt(k2) })))) : c === "group" ? r.push({ type: c, value: u.value }) : c === "decimal" ? (p = true, o.push({ type: c, value: u.value, key: l(c) })) : c === "fraction" ? o.push(...u.value.split("").map((k2) => ({
        type: c,
        value: parseInt(k2),
        key: l(c),
        pos: -1 - h[c]
      }))) : (f || p ? d : a).push({
        type: c,
        value: u.value,
        key: l(c)
      });
    }
    const z = [];
    for (let u = r.length - 1; u >= 0; u--) {
      const c = r[u];
      z.unshift(c.type === "integer" ? {
        ...c,
        key: l(c.type),
        pos: h[c.type]
      } : {
        ...c,
        key: l(c.type)
      });
    }
    return {
      pre: a,
      integer: z,
      fraction: o,
      post: d,
      valueAsString: m,
      value: typeof s == "string" ? parseFloat(s) : s
    };
  }
  __name(q, "q");
  var G = F2 && V3 && I;
  var _P = class _P extends X {
    constructor() {
      super(), this.created = false, this.batched = false;
      const { animated: t, ...e } = this.constructor.defaultProps;
      this._animated = this.computedAnimated = t, Object.assign(this, e);
    }
    get animated() {
      return this._animated;
    }
    set animated(t) {
      var e;
      this.animated !== t && (this._animated = t, (e = this.shadowRoot) == null || e.getAnimations().forEach((i) => i.finish()));
    }
    /**
     * @internal
     */
    set data(t) {
      var e, i;
      if (t == null)
        return;
      const { pre: n, integer: a, fraction: r, post: o, value: d } = t;
      if (this.created) {
        const h = this._data;
        this._data = t, this.computedTrend = typeof this.trend == "function" ? this.trend(h.value, d) : this.trend, this.computedAnimated = G && this._animated && (!this.respectMotionPreference || !((e = B) != null && e.matches)) && // https://github.com/barvian/number-flow/issues/9
        H(this) && // https://github.com/barvian/number-flow/issues/165
        this.ownerDocument.visibilityState === "visible", (i = this.plugins) == null || i.forEach((l) => {
          var m;
          return (m = l.onUpdate) == null ? void 0 : m.call(l, t, h, this);
        }), this.batched || this.willUpdate(), this._pre.update(n), this._num.update({ integer: a, fraction: r }), this._post.update(o), this.batched || this.didUpdate();
      } else {
        this._data = t, this.attachShadow({ mode: "open" });
        try {
          this._internals ?? (this._internals = this.attachInternals()), this._internals.role = "img";
        } catch {
        }
        const h = document.createElement("style");
        this.nonce && (h.nonce = this.nonce), h.textContent = N, this.shadowRoot.appendChild(h), this._pre = new R2(this, n, {
          justify: "right",
          part: "left"
        }), this.shadowRoot.appendChild(this._pre.el), this._num = new J(this, a, r), this.shadowRoot.appendChild(this._num.el), this._post = new R2(this, o, {
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
      Promise.all(this.shadowRoot.getAnimations().map((e) => e.finished)).then(() => {
        t.signal.aborted || (this.dispatchEvent(new Event("animationsfinish")), this._abortAnimationsFinish = void 0);
      }), this._abortAnimationsFinish = t;
    }
  };
  __name(_P, "P");
  var P3 = _P;
  P3.defaultProps = {
    transformTiming: {
      duration: 900,
      // Make sure to keep this minified:
      easing: "linear(0,.005,.019,.039,.066,.096,.129,.165,.202,.24,.278,.316,.354,.39,.426,.461,.494,.526,.557,.586,.614,.64,.665,.689,.711,.731,.751,.769,.786,.802,.817,.831,.844,.856,.867,.877,.887,.896,.904,.912,.919,.925,.931,.937,.942,.947,.951,.955,.959,.962,.965,.968,.971,.973,.976,.978,.98,.981,.983,.984,.986,.987,.988,.989,.99,.991,.992,.992,.993,.994,.994,.995,.995,.996,.996,.9963,.9967,.9969,.9972,.9975,.9977,.9979,.9981,.9982,.9984,.9985,.9987,.9988,.9989,1)"
    },
    spinTiming: void 0,
    opacityTiming: { duration: 450, easing: "ease-out" },
    animated: true,
    trend: /* @__PURE__ */ __name((s, t) => Math.sign(t - s), "trend"),
    respectMotionPreference: true,
    plugins: void 0,
    digits: void 0
  };
  var _J = class _J {
    constructor(t, e, i, { className: n, ...a } = {}) {
      this.flow = t, this._integer = new j3(t, e, {
        justify: "right",
        part: "integer"
      }), this._fraction = new j3(t, i, {
        justify: "left",
        part: "fraction"
      }), this._inner = v("span", {
        className: "number__inner"
      }, [this._integer.el, this._fraction.el]), this.el = v("span", {
        ...a,
        part: "number",
        className: `number ${n ?? ""}`
      }, [this._inner]);
    }
    willUpdate() {
      this._prevWidth = this.el.offsetWidth, this._prevLeft = this.el.getBoundingClientRect().left, this._integer.willUpdate(), this._fraction.willUpdate();
    }
    update({ integer: t, fraction: e }) {
      this._integer.update(t), this._fraction.update(e);
    }
    didUpdate() {
      const t = this.el.getBoundingClientRect();
      this._integer.didUpdate(), this._fraction.didUpdate();
      const e = this._prevLeft - t.left, i = this.el.offsetWidth, n = this._prevWidth - i;
      this.el.style.setProperty("--width", String(i)), this.el.animate({
        [x]: [`${e}px`, "0px"],
        [S]: [n, 0]
      }, {
        ...this.flow.transformTiming,
        composite: "accumulate"
      });
    }
  };
  __name(_J, "J");
  var J = _J;
  var _T = class _T {
    constructor(t, e, { justify: i, className: n, ...a }, r) {
      this.flow = t, this.children = /* @__PURE__ */ new Map(), this.onCharRemove = (d) => () => {
        this.children.delete(d);
      }, this.justify = i;
      const o = e.map((d) => this.addChar(d).el);
      this.el = v("span", {
        ...a,
        className: `section section--justify-${i} ${n ?? ""}`
      }, r ? r(o) : o);
    }
    addChar(t, { startDigitsAtZero: e = false, ...i } = {}) {
      const n = t.type === "integer" || t.type === "fraction" ? new M(this, t.type, e ? 0 : t.value, t.pos, {
        ...i,
        onRemove: this.onCharRemove(t.key)
      }) : new K2(this, t.type, t.value, {
        ...i,
        onRemove: this.onCharRemove(t.key)
      });
      return this.children.set(t.key, n), n;
    }
    unpop(t) {
      t.el.removeAttribute("inert"), t.el.style.top = "", t.el.style[this.justify] = "";
    }
    pop(t) {
      t.forEach((e) => {
        e.el.style.top = `${e.el.offsetTop}px`, e.el.style[this.justify] = `${O(e.el, this.justify)}px`;
      }), t.forEach((e) => {
        e.el.setAttribute("inert", ""), e.present = false;
      });
    }
    addNewAndUpdateExisting(t) {
      const e = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), n = this.justify === "left", a = n ? "prepend" : "append";
      if (Z2(t, (r) => {
        let o;
        this.children.has(r.key) ? (o = this.children.get(r.key), i.set(r, o), this.unpop(o), o.present = true) : (o = this.addChar(r, { startDigitsAtZero: true, animateIn: true }), e.set(r, o)), this.el[a](o.el);
      }, { reverse: n }), this.flow.computedAnimated) {
        const r = this.el.getBoundingClientRect();
        e.forEach((o) => {
          o.willUpdate(r);
        });
      }
      e.forEach((r, o) => {
        r.update(o.value);
      }), i.forEach((r, o) => {
        r.update(o.value);
      });
    }
    willUpdate() {
      const t = this.el.getBoundingClientRect();
      this._prevOffset = t[this.justify], this.children.forEach((e) => e.willUpdate(t));
    }
    didUpdate() {
      const t = this.el.getBoundingClientRect();
      this.children.forEach((n) => n.didUpdate(t));
      const e = t[this.justify], i = this._prevOffset - e;
      i && this.children.size && this.el.animate({
        transform: [`translateX(${i}px)`, "none"]
      }, {
        ...this.flow.transformTiming,
        composite: "accumulate"
      });
    }
  };
  __name(_T, "T");
  var T = _T;
  var _a;
  var j3 = (_a = class extends T {
    update(t) {
      const e = /* @__PURE__ */ new Map();
      this.children.forEach((i, n) => {
        t.find((a) => a.key === n) || e.set(n, i), this.unpop(i);
      }), this.addNewAndUpdateExisting(t), e.forEach((i) => {
        i instanceof M && i.update(0);
      }), this.pop(e);
    }
  }, __name(_a, "j"), _a);
  var _R = class _R extends T {
    update(t) {
      const e = /* @__PURE__ */ new Map();
      this.children.forEach((i, n) => {
        t.find((a) => a.key === n) || e.set(n, i);
      }), this.pop(e), this.addNewAndUpdateExisting(t);
    }
  };
  __name(_R, "R");
  var R2 = _R;
  var _C = class _C {
    constructor(t, e, { onRemove: i, animateIn: n = false } = {}) {
      this.flow = t, this.el = e, this._present = true, this._remove = () => {
        var a;
        this.el.remove(), (a = this._onRemove) == null || a.call(this);
      }, this.el.classList.add("animate-presence"), this.flow.computedAnimated && n && this.el.animate({
        [y]: [-0.9999, 0]
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
          [y]: t ? [-0.9999, 0] : [0.999, 0]
        }, {
          ...this.flow.opacityTiming,
          composite: "accumulate"
        }), t ? this.flow.removeEventListener("animationsfinish", this._remove) : this.flow.addEventListener("animationsfinish", this._remove, {
          once: true
        });
      }
    }
  };
  __name(_C, "C");
  var C = _C;
  var _L = class _L extends C {
    constructor(t, e, i, n) {
      super(t.flow, i, n), this.section = t, this.value = e, this.el = i;
    }
  };
  __name(_L, "L");
  var L = _L;
  var _M = class _M extends L {
    constructor(t, e, i, n, a) {
      var r, o;
      const d = (((o = (r = t.flow.digits) == null ? void 0 : r[n]) == null ? void 0 : o.max) ?? 9) + 1, h = Array.from({ length: d }).map((m, f) => {
        const p = v("span", { className: "digit__num" }, [
          document.createTextNode(String(f))
        ]);
        return f !== i && p.setAttribute("inert", ""), p.style.setProperty("--n", String(f)), p;
      }), l = v("span", {
        part: `digit ${e}-digit`,
        className: "digit"
      }, h);
      l.style.setProperty("--current", String(i)), l.style.setProperty("--length", String(d)), super(t, i, l, a), this.pos = n, this._onAnimationsFinish = () => {
        this.el.classList.remove("is-spinning");
      }, this._numbers = h, this.length = d;
    }
    willUpdate(t) {
      const e = this.el.getBoundingClientRect();
      this._prevValue = this.value;
      const i = e[this.section.justify] - t[this.section.justify], n = e.width / 2;
      this._prevCenter = this.section.justify === "left" ? i + n : i - n;
    }
    update(t) {
      this.el.style.setProperty("--current", String(t)), this._numbers.forEach((e, i) => i === t ? e.removeAttribute("inert") : e.setAttribute("inert", "")), this.value = t;
    }
    didUpdate(t) {
      const e = this.el.getBoundingClientRect(), i = e[this.section.justify] - t[this.section.justify], n = e.width / 2, a = this.section.justify === "left" ? i + n : i - n, r = this._prevCenter - a;
      r && this.el.animate({
        transform: [`translateX(${r}px)`, "none"]
      }, {
        ...this.flow.transformTiming,
        composite: "accumulate"
      });
      const o = this.getDelta();
      o && (this.el.classList.add("is-spinning"), this.el.animate({
        [A]: [-o, 0]
      }, {
        ...this.flow.spinTiming ?? this.flow.transformTiming,
        composite: "accumulate"
      }), this.flow.addEventListener("animationsfinish", this._onAnimationsFinish, { once: true }));
    }
    getDelta() {
      var t;
      if (this.flow.plugins)
        for (const n of this.flow.plugins) {
          const a = (t = n.getDelta) == null ? void 0 : t.call(n, this.value, this._prevValue, this);
          if (a != null)
            return a;
        }
      const e = this.value - this._prevValue, i = this.flow.computedTrend || Math.sign(e);
      return i < 0 && this.value > this._prevValue ? this.value - this.length - this._prevValue : i > 0 && this.value < this._prevValue ? this.length - this._prevValue + this.value : e;
    }
  };
  __name(_M, "M");
  var M = _M;
  var _K = class _K extends L {
    constructor(t, e, i, n) {
      const a = v("span", {
        className: "symbol__value",
        textContent: i
      });
      super(t, i, v("span", {
        part: `symbol ${e}`,
        className: "symbol"
      }, [a]), n), this.type = e, this._children = /* @__PURE__ */ new Map(), this._onChildRemove = (r) => () => {
        this._children.delete(r);
      }, this._children.set(i, new C(this.flow, a, {
        onRemove: this._onChildRemove(i)
      }));
    }
    willUpdate(t) {
      if (this.type === "decimal")
        return;
      const e = this.el.getBoundingClientRect();
      this._prevOffset = e[this.section.justify] - t[this.section.justify];
    }
    update(t) {
      if (this.value !== t) {
        const e = this._children.get(this.value);
        e && (e.present = false);
        const i = this._children.get(t);
        if (i)
          i.present = true;
        else {
          const n = v("span", {
            className: "symbol__value",
            textContent: t
          });
          this.el.appendChild(n), this._children.set(t, new C(this.flow, n, {
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
      const e = this.el.getBoundingClientRect()[this.section.justify] - t[this.section.justify], i = this._prevOffset - e;
      i && this.el.animate({
        transform: [`translateX(${i}px)`, "none"]
      }, { ...this.flow.transformTiming, composite: "accumulate" });
    }
  };
  __name(_K, "K");
  var K2 = _K;
  var Q2 = /* @__PURE__ */ __name((s) => [W2, D2(s), N], "Q");
  var tt2 = Q2();
  var et2 = "number-flow-connect";
  var it3 = "number-flow-update";
  var _nt = class _nt extends P3 {
    constructor() {
      super(...arguments), this.connected = false;
    }
    connectedCallback() {
      this.connected = true, this.dispatchEvent(new Event(et2, { bubbles: true }));
    }
    disconnectedCallback() {
      this.connected = false;
    }
    get value() {
      return this._value;
    }
    update(t) {
      (!this._formatter || this._prevFormat !== this.format || this._prevLocales !== this.locales) && (this._formatter = new Intl.NumberFormat(this.locales, this.format), this._prevFormat = this.format, this._prevLocales = this.locales), t != null && (this._value = t), this.dispatchEvent(new Event(it3, { bubbles: true })), this.data = q(this._value, this._formatter, this.numberPrefix, this.numberSuffix);
    }
  };
  __name(_nt, "nt");
  var nt2 = _nt;
  Y2("number-flow", nt2);

  // src/csdn-clean/index.ts
  var DEFAULTS = {
    adClean: true,
    clipboardClean: true,
    commentClean: true,
    articleClean: true
  };
  function getCfg(key) {
    const v2 = GM_getValue("csdn_" + key, void 0);
    return v2 === void 0 ? DEFAULTS[key] ?? true : v2;
  }
  __name(getCfg, "getCfg");
  function setCfg(key, value) {
    GM_setValue("csdn_" + key, value);
  }
  __name(setCfg, "setCfg");
  var AD_SELECTORS = [
    "#footerRightAds",
    ".side-question-box",
    "div[id^='dmp_ad']",
    "div[class^='ad_']",
    "div[id^='floor-ad_']",
    ".adsbygoogle",
    "#recommendAdBox",
    "#asideNewNps",
    ".box-shadow",
    ".toolbar-advert"
  ];
  function removeAds() {
    for (const selector of AD_SELECTORS) {
      document.querySelectorAll(selector).forEach((el2) => el2.remove());
    }
  }
  __name(removeAds, "removeAds");
  function cleanClipboard() {
    try {
      const w2 = window;
      if (w2.csdn?.copyright) {
        w2.csdn.copyright.textData = "";
      }
    } catch {
    }
    waitFor(".hljs-button", (copyBtn) => {
      copyBtn.classList.remove("signin");
      copyBtn.setAttribute("data-title", "\u590D\u5236");
      copyBtn.setAttribute(
        "onclick",
        "hljs.copyCode(event);setTimeout(function(){$('.hljs-button').attr('data-title', '\u590D\u5236');},3500);"
      );
    });
    waitFor("code", (codeEl) => {
      codeEl.setAttribute("onclick", "mdcp.copyCode(event)");
      codeEl.addEventListener("copy", (e) => {
        const selection = window.getSelection()?.toString() ?? "";
        if (selection) {
          e.preventDefault();
          navigator.clipboard.writeText(selection).then(
            () => hl("\u590D\u5236\u6210\u529F", { type: "success", duration: 2e3 }),
            () => hl("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5", { type: "error", duration: 2e3 })
          );
        }
      });
    });
    try {
      window.jQuery?.("#content_views").unbind("copy");
    } catch {
    }
  }
  __name(cleanClipboard, "cleanClipboard");
  function cleanComment() {
    const commentList = document.querySelector(".comment-list-box");
    if (commentList) {
      commentList.style.overflow = "";
      commentList.style.maxHeight = "";
    }
    document.getElementById("commentPage")?.classList.remove("d-none");
    document.getElementById("btnMoreComment")?.remove();
  }
  __name(cleanComment, "cleanComment");
  function expandArticle() {
    const articleContent = document.getElementById("article_content");
    if (articleContent) {
      articleContent.removeAttribute("style");
    }
    document.querySelector(".hide-article-box")?.remove();
  }
  __name(expandArticle, "expandArticle");
  function waitFor(selector, callback, maxRetries = 10) {
    let retries = 0;
    const check = /* @__PURE__ */ __name(() => {
      const el2 = document.querySelector(selector);
      if (el2) {
        callback(el2);
      } else if (retries < maxRetries) {
        retries++;
        setTimeout(check, 500);
      }
    }, "check");
    setTimeout(check, 800);
  }
  __name(waitFor, "waitFor");
  GM_registerMenuCommand("\u2699\uFE0F CSDN \u51C0\u5316 \u2014 \u8BBE\u7F6E", () => {
    const keys = Object.keys(DEFAULTS);
    for (const key of keys) {
      const current = getCfg(key);
      const labels = {
        adClean: "\u5E7F\u544A\u6E05\u7406",
        clipboardClean: "\u526A\u5207\u677F\u51C0\u5316",
        commentClean: "\u8BC4\u8BBA\u533A\u4F18\u5316",
        articleClean: "\u6587\u7AE0\u5C55\u5F00"
      };
      const label = labels[key] ?? key;
      const input = prompt(`\u300C${label}\u300D\u5F53\u524D\u4E3A\u3010${current ? "\u5F00\u542F" : "\u5173\u95ED"}\u3011\u3002
\u8F93\u5165 0 \u5173\u95ED\uFF0C1 \u5F00\u542F\uFF0C\u7559\u7A7A\u4FDD\u6301\u4E0D\u53D8\uFF1A`, current ? "1" : "0");
      if (input === "0") setCfg(key, false);
      else if (input === "1") setCfg(key, true);
    }
    alert("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5237\u65B0\u540E\u751F\u6548\u3002");
  });
  if (getCfg("adClean")) {
    setInterval(removeAds, 3e3);
  }
  if (getCfg("clipboardClean")) {
    cleanClipboard();
  }
  if (getCfg("commentClean")) {
    setTimeout(cleanComment, 3e3);
  }
  if (getCfg("articleClean")) {
    setTimeout(expandArticle, 1e3);
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
