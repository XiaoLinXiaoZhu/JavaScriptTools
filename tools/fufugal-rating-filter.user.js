// ==UserScript==
// @name                Fufugal 评分过滤
// @namespace           https://github.com/XiaoLinXiaoZhu/JavaScriptTools
// @version             0.3.0
// @description         为 fufugal.com（我的Galgame资源发布站）按评分阈值过滤卡片，可在浮动面板中开关与调节阈值
// @author              XLXZ
// @license             MIT
// @match               https://fufugal.com/*
// @grant               none
// @run-at              document-idle
// @downloadURL         https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/fufugal-rating-filter.user.js
// @updateURL           https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/fufugal-rating-filter.user.js
// ==/UserScript==

"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // packages/components/dist/floating-panel.js
  // @__NO_SIDE_EFFECTS__
  function In(e) {
    const t = /* @__PURE__ */ Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return (n) => n in t;
  }
  __name(In, "In");
  var Z = {};
  var ut = [];
  var Ln = /* @__PURE__ */ __name(() => {
  }, "Ln");
  var Ks = /* @__PURE__ */ __name(() => false, "Ks");
  var Gt = /* @__PURE__ */ __name((e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
  (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), "Gt");
  var Jt = /* @__PURE__ */ __name((e) => e.startsWith("onUpdate:"), "Jt");
  var we = Object.assign;
  var qr = /* @__PURE__ */ __name((e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  }, "qr");
  var Gr = Object.prototype.hasOwnProperty;
  var K = /* @__PURE__ */ __name((e, t) => Gr.call(e, t), "K");
  var F = Array.isArray;
  var bt = /* @__PURE__ */ __name((e) => Dt(e) === "[object Map]", "bt");
  var Jr = /* @__PURE__ */ __name((e) => Dt(e) === "[object Set]", "Jr");
  var rs = /* @__PURE__ */ __name((e) => Dt(e) === "[object Date]", "rs");
  var k = /* @__PURE__ */ __name((e) => typeof e == "function", "k");
  var ne = /* @__PURE__ */ __name((e) => typeof e == "string", "ne");
  var $e = /* @__PURE__ */ __name((e) => typeof e == "symbol", "$e");
  var Y = /* @__PURE__ */ __name((e) => e !== null && typeof e == "object", "Y");
  var Ws = /* @__PURE__ */ __name((e) => (Y(e) || k(e)) && k(e.then) && k(e.catch), "Ws");
  var Us = Object.prototype.toString;
  var Dt = /* @__PURE__ */ __name((e) => Us.call(e), "Dt");
  var Zr = /* @__PURE__ */ __name((e) => Dt(e).slice(8, -1), "Zr");
  var Qr = /* @__PURE__ */ __name((e) => Dt(e) === "[object Object]", "Qr");
  var On = /* @__PURE__ */ __name((e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, "On");
  var yt = /* @__PURE__ */ In(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  var Zt = /* @__PURE__ */ __name((e) => {
    const t = /* @__PURE__ */ Object.create(null);
    return ((n) => t[n] || (t[n] = e(n)));
  }, "Zt");
  var ei = /-\w/g;
  var Se = Zt(
    (e) => e.replace(ei, (t) => t.slice(1).toUpperCase())
  );
  var ti = /\B([A-Z])/g;
  var ct = Zt(
    (e) => e.replace(ti, "-$1").toLowerCase()
  );
  var ks = Zt((e) => e.charAt(0).toUpperCase() + e.slice(1));
  var rn = Zt(
    (e) => e ? `on${ks(e)}` : ""
  );
  var Ye = /* @__PURE__ */ __name((e, t) => !Object.is(e, t), "Ye");
  var on = /* @__PURE__ */ __name((e, ...t) => {
    for (let n = 0; n < e.length; n++)
      e[n](...t);
  }, "on");
  var Ys = /* @__PURE__ */ __name((e, t, n, s = false) => {
    Object.defineProperty(e, t, {
      configurable: true,
      enumerable: false,
      writable: s,
      value: n
    });
  }, "Ys");
  var ni = /* @__PURE__ */ __name((e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  }, "ni");
  var si = /* @__PURE__ */ __name((e) => {
    const t = ne(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  }, "si");
  var is;
  var Qt = /* @__PURE__ */ __name(() => is || (is = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), "Qt");
  function Rt(e) {
    if (F(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const s = e[n], r = ne(s) ? li(s) : Rt(s);
        if (r)
          for (const i in r)
            t[i] = r[i];
      }
      return t;
    } else if (ne(e) || Y(e))
      return e;
  }
  __name(Rt, "Rt");
  var ri = /;(?![^(]*\))/g;
  var ii = /:([^]+)/;
  var oi = /\/\*[^]*?\*\//g;
  function li(e) {
    const t = {};
    return e.replace(oi, "").split(ri).forEach((n) => {
      if (n) {
        const s = n.split(ii);
        s.length > 1 && (t[s[0].trim()] = s[1].trim());
      }
    }), t;
  }
  __name(li, "li");
  function st(e) {
    let t = "";
    if (ne(e))
      t = e;
    else if (F(e))
      for (let n = 0; n < e.length; n++) {
        const s = st(e[n]);
        s && (t += s + " ");
      }
    else if (Y(e))
      for (const n in e)
        e[n] && (t += n + " ");
    return t.trim();
  }
  __name(st, "st");
  var ci = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var fi = /* @__PURE__ */ In(ci);
  function Xs(e) {
    return !!e || e === "";
  }
  __name(Xs, "Xs");
  function ai(e, t) {
    if (e.length !== t.length) return false;
    let n = true;
    for (let s = 0; n && s < e.length; s++)
      n = Fn(e[s], t[s]);
    return n;
  }
  __name(ai, "ai");
  function Fn(e, t) {
    if (e === t) return true;
    let n = rs(e), s = rs(t);
    if (n || s)
      return n && s ? e.getTime() === t.getTime() : false;
    if (n = $e(e), s = $e(t), n || s)
      return e === t;
    if (n = F(e), s = F(t), n || s)
      return n && s ? ai(e, t) : false;
    if (n = Y(e), s = Y(t), n || s) {
      if (!n || !s)
        return false;
      const r = Object.keys(e).length, i = Object.keys(t).length;
      if (r !== i)
        return false;
      for (const o in e) {
        const l = e.hasOwnProperty(o), f = t.hasOwnProperty(o);
        if (l && !f || !l && f || !Fn(e[o], t[o]))
          return false;
      }
    }
    return String(e) === String(t);
  }
  __name(Fn, "Fn");
  var qs = /* @__PURE__ */ __name((e) => !!(e && e.__v_isRef === true), "qs");
  var Gs = /* @__PURE__ */ __name((e) => ne(e) ? e : e == null ? "" : F(e) || Y(e) && (e.toString === Us || !k(e.toString)) ? qs(e) ? Gs(e.value) : JSON.stringify(e, Js, 2) : String(e), "Gs");
  var Js = /* @__PURE__ */ __name((e, t) => qs(t) ? Js(e, t.value) : bt(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce(
      (n, [s, r], i) => (n[ln(s, i) + " =>"] = r, n),
      {}
    )
  } : Jr(t) ? {
    [`Set(${t.size})`]: [...t.values()].map((n) => ln(n))
  } : $e(t) ? ln(t) : Y(t) && !F(t) && !Qr(t) ? String(t) : t, "Js");
  var ln = /* @__PURE__ */ __name((e, t = "") => {
    var n;
    return (
      // Symbol.description in es2019+ so we need to cast here to pass
      // the lib: es2016 check
      $e(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
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
        let t, n;
        if (this.scopes)
          for (t = 0, n = this.scopes.length; t < n; t++)
            this.scopes[t].pause();
        for (t = 0, n = this.effects.length; t < n; t++)
          this.effects[t].pause();
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = false;
        let t, n;
        if (this.scopes)
          for (t = 0, n = this.scopes.length; t < n; t++)
            this.scopes[t].resume();
        for (t = 0, n = this.effects.length; t < n; t++)
          this.effects[t].resume();
      }
    }
    run(t) {
      if (this._active) {
        const n = ce;
        try {
          return ce = this, t();
        } finally {
          ce = n;
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
        if (!this.detached && this.parent && !t) {
          const r = this.parent.scopes.pop();
          r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
        }
        this.parent = void 0;
      }
    }
  };
  __name(_ui, "ui");
  var ui = _ui;
  var U;
  var cn = /* @__PURE__ */ new WeakSet();
  var _di = class _di {
    constructor(t) {
      this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ce && (ce.active ? ce.effects.push(this) : this.flags &= -2);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, cn.has(this) && (cn.delete(this), this.trigger()));
    }
    /**
     * @internal
     */
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Qs(this);
    }
    run() {
      if (!(this.flags & 1))
        return this.fn();
      this.flags |= 2, os(this), er(this);
      const t = U, n = Te;
      U = this, Te = true;
      try {
        return this.fn();
      } finally {
        tr(this), U = t, Te = n, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let t = this.deps; t; t = t.nextDep)
          Dn(t);
        this.deps = this.depsTail = void 0, os(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? cn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    /**
     * @internal
     */
    runIfDirty() {
      xn(this) && this.run();
    }
    get dirty() {
      return xn(this);
    }
  };
  __name(_di, "di");
  var di = _di;
  var Zs = 0;
  var wt;
  var St;
  function Qs(e, t = false) {
    if (e.flags |= 8, t) {
      e.next = St, St = e;
      return;
    }
    e.next = wt, wt = e;
  }
  __name(Qs, "Qs");
  function $n() {
    Zs++;
  }
  __name($n, "$n");
  function Nn() {
    if (--Zs > 0)
      return;
    if (St) {
      let t = St;
      for (St = void 0; t; ) {
        const n = t.next;
        t.next = void 0, t.flags &= -9, t = n;
      }
    }
    let e;
    for (; wt; ) {
      let t = wt;
      for (wt = void 0; t; ) {
        const n = t.next;
        if (t.next = void 0, t.flags &= -9, t.flags & 1)
          try {
            t.trigger();
          } catch (s) {
            e || (e = s);
          }
        t = n;
      }
    }
    if (e) throw e;
  }
  __name(Nn, "Nn");
  function er(e) {
    for (let t = e.deps; t; t = t.nextDep)
      t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
  }
  __name(er, "er");
  function tr(e) {
    let t, n = e.depsTail, s = n;
    for (; s; ) {
      const r = s.prevDep;
      s.version === -1 ? (s === n && (n = r), Dn(s), hi(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
    }
    e.deps = t, e.depsTail = n;
  }
  __name(tr, "tr");
  function xn(e) {
    for (let t = e.deps; t; t = t.nextDep)
      if (t.dep.version !== t.version || t.dep.computed && (nr(t.dep.computed) || t.dep.version !== t.version))
        return true;
    return !!e._dirty;
  }
  __name(xn, "xn");
  function nr(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Pt) || (e.globalVersion = Pt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !xn(e))))
      return;
    e.flags |= 2;
    const t = e.dep, n = U, s = Te;
    U = e, Te = true;
    try {
      er(e);
      const r = e.fn(e._value);
      (t.version === 0 || Ye(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
    } catch (r) {
      throw t.version++, r;
    } finally {
      U = n, Te = s, tr(e), e.flags &= -3;
    }
  }
  __name(nr, "nr");
  function Dn(e, t = false) {
    const { dep: n, prevSub: s, nextSub: r } = e;
    if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
      n.computed.flags &= -5;
      for (let i = n.computed.deps; i; i = i.nextDep)
        Dn(i, true);
    }
    !t && !--n.sc && n.map && n.map.delete(n.key);
  }
  __name(Dn, "Dn");
  function hi(e) {
    const { prevDep: t, nextDep: n } = e;
    t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
  }
  __name(hi, "hi");
  var Te = true;
  var sr = [];
  function it() {
    sr.push(Te), Te = false;
  }
  __name(it, "it");
  function ot() {
    const e = sr.pop();
    Te = e === void 0 ? true : e;
  }
  __name(ot, "ot");
  function os(e) {
    const { cleanup: t } = e;
    if (e.cleanup = void 0, t) {
      const n = U;
      U = void 0;
      try {
        t();
      } finally {
        U = n;
      }
    }
  }
  __name(os, "os");
  var Pt = 0;
  var _pi = class _pi {
    constructor(t, n) {
      this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  };
  __name(_pi, "pi");
  var pi = _pi;
  var _Hn = class _Hn {
    // TODO isolatedDeclarations "__v_skip"
    constructor(t) {
      this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
    }
    track(t) {
      if (!U || !Te || U === this.computed)
        return;
      let n = this.activeLink;
      if (n === void 0 || n.sub !== U)
        n = this.activeLink = new pi(U, this), U.deps ? (n.prevDep = U.depsTail, U.depsTail.nextDep = n, U.depsTail = n) : U.deps = U.depsTail = n, rr(n);
      else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
        const s = n.nextDep;
        s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = U.depsTail, n.nextDep = void 0, U.depsTail.nextDep = n, U.depsTail = n, U.deps === n && (U.deps = s);
      }
      return n;
    }
    trigger(t) {
      this.version++, Pt++, this.notify(t);
    }
    notify(t) {
      $n();
      try {
        for (let n = this.subs; n; n = n.prevSub)
          n.sub.notify() && n.sub.dep.notify();
      } finally {
        Nn();
      }
    }
  };
  __name(_Hn, "Hn");
  var Hn = _Hn;
  function rr(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let s = t.deps; s; s = s.nextDep)
          rr(s);
      }
      const n = e.dep.subs;
      n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
    }
  }
  __name(rr, "rr");
  var bn = /* @__PURE__ */ new WeakMap();
  var rt = /* @__PURE__ */ Symbol(
    ""
  );
  var yn = /* @__PURE__ */ Symbol(
    ""
  );
  var It = /* @__PURE__ */ Symbol(
    ""
  );
  function fe(e, t, n) {
    if (Te && U) {
      let s = bn.get(e);
      s || bn.set(e, s = /* @__PURE__ */ new Map());
      let r = s.get(n);
      r || (s.set(n, r = new Hn()), r.map = s, r.key = n), r.track();
    }
  }
  __name(fe, "fe");
  function Ve(e, t, n, s, r, i) {
    const o = bn.get(e);
    if (!o) {
      Pt++;
      return;
    }
    const l = /* @__PURE__ */ __name((f) => {
      f && f.trigger();
    }, "l");
    if ($n(), t === "clear")
      o.forEach(l);
    else {
      const f = F(e), d = f && On(n);
      if (f && n === "length") {
        const u = Number(s);
        o.forEach((p, b2) => {
          (b2 === "length" || b2 === It || !$e(b2) && b2 >= u) && l(p);
        });
      } else
        switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(It)), t) {
          case "add":
            f ? d && l(o.get("length")) : (l(o.get(rt)), bt(e) && l(o.get(yn)));
            break;
          case "delete":
            f || (l(o.get(rt)), bt(e) && l(o.get(yn)));
            break;
          case "set":
            bt(e) && l(o.get(rt));
            break;
        }
    }
    Nn();
  }
  __name(Ve, "Ve");
  function ft(e) {
    const t = /* @__PURE__ */ H(e);
    return t === e ? t : (fe(t, "iterate", It), /* @__PURE__ */ qe(e) ? t : t.map(Ke));
  }
  __name(ft, "ft");
  function zn(e) {
    return fe(e = /* @__PURE__ */ H(e), "iterate", It), e;
  }
  __name(zn, "zn");
  function Ie(e, t) {
    return /* @__PURE__ */ Xe(e) ? Lt(/* @__PURE__ */ Kn(e) ? Ke(t) : t) : Ke(t);
  }
  __name(Ie, "Ie");
  var gi = {
    __proto__: null,
    [Symbol.iterator]() {
      return fn(this, Symbol.iterator, (e) => Ie(this, e));
    },
    concat(...e) {
      return ft(this).concat(
        ...e.map((t) => F(t) ? ft(t) : t)
      );
    },
    entries() {
      return fn(this, "entries", (e) => (e[1] = Ie(this, e[1]), e));
    },
    every(e, t) {
      return Ne(this, "every", e, t, void 0, arguments);
    },
    filter(e, t) {
      return Ne(
        this,
        "filter",
        e,
        t,
        (n) => n.map((s) => Ie(this, s)),
        arguments
      );
    },
    find(e, t) {
      return Ne(
        this,
        "find",
        e,
        t,
        (n) => Ie(this, n),
        arguments
      );
    },
    findIndex(e, t) {
      return Ne(this, "findIndex", e, t, void 0, arguments);
    },
    findLast(e, t) {
      return Ne(
        this,
        "findLast",
        e,
        t,
        (n) => Ie(this, n),
        arguments
      );
    },
    findLastIndex(e, t) {
      return Ne(this, "findLastIndex", e, t, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(e, t) {
      return Ne(this, "forEach", e, t, void 0, arguments);
    },
    includes(...e) {
      return an(this, "includes", e);
    },
    indexOf(...e) {
      return an(this, "indexOf", e);
    },
    join(e) {
      return ft(this).join(e);
    },
    // keys() iterator only reads `length`, no optimization required
    lastIndexOf(...e) {
      return an(this, "lastIndexOf", e);
    },
    map(e, t) {
      return Ne(this, "map", e, t, void 0, arguments);
    },
    pop() {
      return mt(this, "pop");
    },
    push(...e) {
      return mt(this, "push", e);
    },
    reduce(e, ...t) {
      return ls(this, "reduce", e, t);
    },
    reduceRight(e, ...t) {
      return ls(this, "reduceRight", e, t);
    },
    shift() {
      return mt(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(e, t) {
      return Ne(this, "some", e, t, void 0, arguments);
    },
    splice(...e) {
      return mt(this, "splice", e);
    },
    toReversed() {
      return ft(this).toReversed();
    },
    toSorted(e) {
      return ft(this).toSorted(e);
    },
    toSpliced(...e) {
      return ft(this).toSpliced(...e);
    },
    unshift(...e) {
      return mt(this, "unshift", e);
    },
    values() {
      return fn(this, "values", (e) => Ie(this, e));
    }
  };
  function fn(e, t, n) {
    const s = zn(e), r = s[t]();
    return s !== e && !/* @__PURE__ */ qe(e) && (r._next = r.next, r.next = () => {
      const i = r._next();
      return i.done || (i.value = n(i.value)), i;
    }), r;
  }
  __name(fn, "fn");
  var mi = Array.prototype;
  function Ne(e, t, n, s, r, i) {
    const o = zn(e), l = o !== e && !/* @__PURE__ */ qe(e), f = o[t];
    if (f !== mi[t]) {
      const p = f.apply(e, i);
      return l ? Ke(p) : p;
    }
    let d = n;
    o !== e && (l ? d = /* @__PURE__ */ __name(function(p, b2) {
      return n.call(this, Ie(e, p), b2, e);
    }, "d") : n.length > 2 && (d = /* @__PURE__ */ __name(function(p, b2) {
      return n.call(this, p, b2, e);
    }, "d")));
    const u = f.call(o, d, s);
    return l && r ? r(u) : u;
  }
  __name(Ne, "Ne");
  function ls(e, t, n, s) {
    const r = zn(e), i = r !== e && !/* @__PURE__ */ qe(e);
    let o = n, l = false;
    r !== e && (i ? (l = s.length === 0, o = /* @__PURE__ */ __name(function(d, u, p) {
      return l && (l = false, d = Ie(e, d)), n.call(this, d, Ie(e, u), p, e);
    }, "o")) : n.length > 3 && (o = /* @__PURE__ */ __name(function(d, u, p) {
      return n.call(this, d, u, p, e);
    }, "o")));
    const f = r[t](o, ...s);
    return l ? Ie(e, f) : f;
  }
  __name(ls, "ls");
  function an(e, t, n) {
    const s = /* @__PURE__ */ H(e);
    fe(s, "iterate", It);
    const r = s[t](...n);
    return (r === -1 || r === false) && /* @__PURE__ */ Wn(n[0]) ? (n[0] = /* @__PURE__ */ H(n[0]), s[t](...n)) : r;
  }
  __name(an, "an");
  function mt(e, t, n = []) {
    it(), $n();
    const s = (/* @__PURE__ */ H(e))[t].apply(e, n);
    return Nn(), ot(), s;
  }
  __name(mt, "mt");
  var _i = /* @__PURE__ */ In("__proto__,__v_isRef,__isVue");
  var ir = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter($e)
  );
  function vi(e) {
    $e(e) || (e = String(e));
    const t = /* @__PURE__ */ H(this);
    return fe(t, "has", e), t.hasOwnProperty(e);
  }
  __name(vi, "vi");
  var _or = class _or {
    constructor(t = false, n = false) {
      this._isReadonly = t, this._isShallow = n;
    }
    get(t, n, s) {
      if (n === "__v_skip") return t.__v_skip;
      const r = this._isReadonly, i = this._isShallow;
      if (n === "__v_isReactive")
        return !r;
      if (n === "__v_isReadonly")
        return r;
      if (n === "__v_isShallow")
        return i;
      if (n === "__v_raw")
        return s === (r ? i ? Mi : ar : i ? fr : cr).get(t) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
      const o = F(t);
      if (!r) {
        let f;
        if (o && (f = gi[n]))
          return f;
        if (n === "hasOwnProperty")
          return vi;
      }
      const l = Reflect.get(
        t,
        n,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        /* @__PURE__ */ ye(t) ? t : s
      );
      if (($e(n) ? ir.has(n) : _i(n)) || (r || fe(t, "get", n), i))
        return l;
      if (/* @__PURE__ */ ye(l)) {
        const f = o && On(n) ? l : l.value;
        return r && Y(f) ? /* @__PURE__ */ Sn(f) : f;
      }
      return Y(l) ? r ? /* @__PURE__ */ Sn(l) : /* @__PURE__ */ jn(l) : l;
    }
  };
  __name(_or, "or");
  var or = _or;
  var _lr = class _lr extends or {
    constructor(t = false) {
      super(false, t);
    }
    set(t, n, s, r) {
      let i = t[n];
      const o = F(t) && On(n);
      if (!this._isShallow) {
        const d = /* @__PURE__ */ Xe(i);
        if (!/* @__PURE__ */ qe(s) && !/* @__PURE__ */ Xe(s) && (i = /* @__PURE__ */ H(i), s = /* @__PURE__ */ H(s)), !o && /* @__PURE__ */ ye(i) && !/* @__PURE__ */ ye(s))
          return d || (i.value = s), true;
      }
      const l = o ? Number(n) < t.length : K(t, n), f = Reflect.set(
        t,
        n,
        s,
        /* @__PURE__ */ ye(t) ? t : r
      );
      return t === /* @__PURE__ */ H(r) && (l ? Ye(s, i) && Ve(t, "set", n, s) : Ve(t, "add", n, s)), f;
    }
    deleteProperty(t, n) {
      const s = K(t, n);
      t[n];
      const r = Reflect.deleteProperty(t, n);
      return r && s && Ve(t, "delete", n, void 0), r;
    }
    has(t, n) {
      const s = Reflect.has(t, n);
      return (!$e(n) || !ir.has(n)) && fe(t, "has", n), s;
    }
    ownKeys(t) {
      return fe(
        t,
        "iterate",
        F(t) ? "length" : rt
      ), Reflect.ownKeys(t);
    }
  };
  __name(_lr, "lr");
  var lr = _lr;
  var _xi = class _xi extends or {
    constructor(t = false) {
      super(true, t);
    }
    set(t, n) {
      return true;
    }
    deleteProperty(t, n) {
      return true;
    }
  };
  __name(_xi, "xi");
  var xi = _xi;
  var bi = /* @__PURE__ */ new lr();
  var yi = /* @__PURE__ */ new xi();
  var wi = /* @__PURE__ */ new lr(true);
  var wn = /* @__PURE__ */ __name((e) => e, "wn");
  var Bt = /* @__PURE__ */ __name((e) => Reflect.getPrototypeOf(e), "Bt");
  function Si(e, t, n) {
    return function(...s) {
      const r = this.__v_raw, i = /* @__PURE__ */ H(r), o = bt(i), l = e === "entries" || e === Symbol.iterator && o, f = e === "keys" && o, d = r[e](...s), u = n ? wn : t ? Lt : Ke;
      return !t && fe(
        i,
        "iterate",
        f ? yn : rt
      ), we(
        // inheriting all iterator properties
        Object.create(d),
        {
          // iterator protocol
          next() {
            const { value: p, done: b2 } = d.next();
            return b2 ? { value: p, done: b2 } : {
              value: l ? [u(p[0]), u(p[1])] : u(p),
              done: b2
            };
          }
        }
      );
    };
  }
  __name(Si, "Si");
  function jt(e) {
    return function(...t) {
      return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
  }
  __name(jt, "jt");
  function Ti(e, t) {
    const n = {
      get(r) {
        const i = this.__v_raw, o = /* @__PURE__ */ H(i), l = /* @__PURE__ */ H(r);
        e || (Ye(r, l) && fe(o, "get", r), fe(o, "get", l));
        const { has: f } = Bt(o), d = t ? wn : e ? Lt : Ke;
        if (f.call(o, r))
          return d(i.get(r));
        if (f.call(o, l))
          return d(i.get(l));
        i !== o && i.get(r);
      },
      get size() {
        const r = this.__v_raw;
        return !e && fe(/* @__PURE__ */ H(r), "iterate", rt), r.size;
      },
      has(r) {
        const i = this.__v_raw, o = /* @__PURE__ */ H(i), l = /* @__PURE__ */ H(r);
        return e || (Ye(r, l) && fe(o, "has", r), fe(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
      },
      forEach(r, i) {
        const o = this, l = o.__v_raw, f = /* @__PURE__ */ H(l), d = t ? wn : e ? Lt : Ke;
        return !e && fe(f, "iterate", rt), l.forEach((u, p) => r.call(i, d(u), d(p), o));
      }
    };
    return we(
      n,
      e ? {
        add: jt("add"),
        set: jt("set"),
        delete: jt("delete"),
        clear: jt("clear")
      } : {
        add(r) {
          const i = /* @__PURE__ */ H(this), o = Bt(i), l = /* @__PURE__ */ H(r), f = !t && !/* @__PURE__ */ qe(r) && !/* @__PURE__ */ Xe(r) ? l : r;
          return o.has.call(i, f) || Ye(r, f) && o.has.call(i, r) || Ye(l, f) && o.has.call(i, l) || (i.add(f), Ve(i, "add", f, f)), this;
        },
        set(r, i) {
          !t && !/* @__PURE__ */ qe(i) && !/* @__PURE__ */ Xe(i) && (i = /* @__PURE__ */ H(i));
          const o = /* @__PURE__ */ H(this), { has: l, get: f } = Bt(o);
          let d = l.call(o, r);
          d || (r = /* @__PURE__ */ H(r), d = l.call(o, r));
          const u = f.call(o, r);
          return o.set(r, i), d ? Ye(i, u) && Ve(o, "set", r, i) : Ve(o, "add", r, i), this;
        },
        delete(r) {
          const i = /* @__PURE__ */ H(this), { has: o, get: l } = Bt(i);
          let f = o.call(i, r);
          f || (r = /* @__PURE__ */ H(r), f = o.call(i, r)), l && l.call(i, r);
          const d = i.delete(r);
          return f && Ve(i, "delete", r, void 0), d;
        },
        clear() {
          const r = /* @__PURE__ */ H(this), i = r.size !== 0, o = r.clear();
          return i && Ve(
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
      n[r] = Si(r, e, t);
    }), n;
  }
  __name(Ti, "Ti");
  function Bn(e, t) {
    const n = Ti(e, t);
    return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
      K(n, r) && r in s ? n : s,
      r,
      i
    );
  }
  __name(Bn, "Bn");
  var Ci = {
    get: /* @__PURE__ */ Bn(false, false)
  };
  var Ei = {
    get: /* @__PURE__ */ Bn(false, true)
  };
  var Ai = {
    get: /* @__PURE__ */ Bn(true, false)
  };
  var cr = /* @__PURE__ */ new WeakMap();
  var fr = /* @__PURE__ */ new WeakMap();
  var ar = /* @__PURE__ */ new WeakMap();
  var Mi = /* @__PURE__ */ new WeakMap();
  function Ri(e) {
    switch (e) {
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
  __name(Ri, "Ri");
  function Pi(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Ri(Zr(e));
  }
  __name(Pi, "Pi");
  // @__NO_SIDE_EFFECTS__
  function jn(e) {
    return /* @__PURE__ */ Xe(e) ? e : Vn(
      e,
      false,
      bi,
      Ci,
      cr
    );
  }
  __name(jn, "jn");
  // @__NO_SIDE_EFFECTS__
  function Ii(e) {
    return Vn(
      e,
      false,
      wi,
      Ei,
      fr
    );
  }
  __name(Ii, "Ii");
  // @__NO_SIDE_EFFECTS__
  function Sn(e) {
    return Vn(
      e,
      true,
      yi,
      Ai,
      ar
    );
  }
  __name(Sn, "Sn");
  function Vn(e, t, n, s, r) {
    if (!Y(e) || e.__v_raw && !(t && e.__v_isReactive))
      return e;
    const i = Pi(e);
    if (i === 0)
      return e;
    const o = r.get(e);
    if (o)
      return o;
    const l = new Proxy(
      e,
      i === 2 ? s : n
    );
    return r.set(e, l), l;
  }
  __name(Vn, "Vn");
  // @__NO_SIDE_EFFECTS__
  function Kn(e) {
    return /* @__PURE__ */ Xe(e) ? /* @__PURE__ */ Kn(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  __name(Kn, "Kn");
  // @__NO_SIDE_EFFECTS__
  function Xe(e) {
    return !!(e && e.__v_isReadonly);
  }
  __name(Xe, "Xe");
  // @__NO_SIDE_EFFECTS__
  function qe(e) {
    return !!(e && e.__v_isShallow);
  }
  __name(qe, "qe");
  // @__NO_SIDE_EFFECTS__
  function Wn(e) {
    return e ? !!e.__v_raw : false;
  }
  __name(Wn, "Wn");
  // @__NO_SIDE_EFFECTS__
  function H(e) {
    const t = e && e.__v_raw;
    return t ? /* @__PURE__ */ H(t) : e;
  }
  __name(H, "H");
  function Li(e) {
    return !K(e, "__v_skip") && Object.isExtensible(e) && Ys(e, "__v_skip", true), e;
  }
  __name(Li, "Li");
  var Ke = /* @__PURE__ */ __name((e) => Y(e) ? /* @__PURE__ */ jn(e) : e, "Ke");
  var Lt = /* @__PURE__ */ __name((e) => Y(e) ? /* @__PURE__ */ Sn(e) : e, "Lt");
  // @__NO_SIDE_EFFECTS__
  function ye(e) {
    return e ? e.__v_isRef === true : false;
  }
  __name(ye, "ye");
  // @__NO_SIDE_EFFECTS__
  function De(e) {
    return Oi(e, false);
  }
  __name(De, "De");
  function Oi(e, t) {
    return /* @__PURE__ */ ye(e) ? e : new Fi(e, t);
  }
  __name(Oi, "Oi");
  var _Fi = class _Fi {
    constructor(t, n) {
      this.dep = new Hn(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t : /* @__PURE__ */ H(t), this._value = n ? t : Ke(t), this.__v_isShallow = n;
    }
    get value() {
      return this.dep.track(), this._value;
    }
    set value(t) {
      const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ qe(t) || /* @__PURE__ */ Xe(t);
      t = s ? t : /* @__PURE__ */ H(t), Ye(t, n) && (this._rawValue = t, this._value = s ? t : Ke(t), this.dep.trigger());
    }
  };
  __name(_Fi, "Fi");
  var Fi = _Fi;
  function $i(e) {
    return /* @__PURE__ */ ye(e) ? e.value : e;
  }
  __name($i, "$i");
  var Ni = {
    get: /* @__PURE__ */ __name((e, t, n) => t === "__v_raw" ? e : $i(Reflect.get(e, t, n)), "get"),
    set: /* @__PURE__ */ __name((e, t, n, s) => {
      const r = e[t];
      return /* @__PURE__ */ ye(r) && !/* @__PURE__ */ ye(n) ? (r.value = n, true) : Reflect.set(e, t, n, s);
    }, "set")
  };
  function ur(e) {
    return /* @__PURE__ */ Kn(e) ? e : new Proxy(e, Ni);
  }
  __name(ur, "ur");
  var _Di = class _Di {
    constructor(t, n, s) {
      this.fn = t, this.setter = n, this._value = void 0, this.dep = new Hn(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Pt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
    }
    /**
     * @internal
     */
    notify() {
      if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
      U !== this)
        return Qs(this, true), true;
    }
    get value() {
      const t = this.dep.track();
      return nr(this), t && (t.version = this.dep.version), this._value;
    }
    set value(t) {
      this.setter && this.setter(t);
    }
  };
  __name(_Di, "Di");
  var Di = _Di;
  // @__NO_SIDE_EFFECTS__
  function Hi(e, t, n = false) {
    let s, r;
    return k(e) ? s = e : (s = e.get, r = e.set), new Di(s, r, n);
  }
  __name(Hi, "Hi");
  function Ht(e, t, n, s) {
    try {
      return s ? e(...s) : e();
    } catch (r) {
      en(r, t, n);
    }
  }
  __name(Ht, "Ht");
  function We(e, t, n, s) {
    if (k(e)) {
      const r = Ht(e, t, n, s);
      return r && Ws(r) && r.catch((i) => {
        en(i, t, n);
      }), r;
    }
    if (F(e)) {
      const r = [];
      for (let i = 0; i < e.length; i++)
        r.push(We(e[i], t, n, s));
      return r;
    }
  }
  __name(We, "We");
  function en(e, t, n, s = true) {
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
        it(), Ht(i, null, 10, [
          e,
          f,
          d
        ]), ot();
        return;
      }
    }
    zi(e, n, r, s, o);
  }
  __name(en, "en");
  function zi(e, t, n, s = true, r = false) {
    if (r)
      throw e;
    console.error(e);
  }
  __name(zi, "zi");
  var de = [];
  var Re = -1;
  var dt = [];
  var ke = null;
  var at = 0;
  var dr = /* @__PURE__ */ Promise.resolve();
  var Wt = null;
  function Bi(e) {
    const t = Wt || dr;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  __name(Bi, "Bi");
  function ji(e) {
    let t = Re + 1, n = de.length;
    for (; t < n; ) {
      const s = t + n >>> 1, r = de[s], i = Ot(r);
      i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
    }
    return t;
  }
  __name(ji, "ji");
  function hr(e) {
    if (!(e.flags & 1)) {
      const t = Ot(e), n = de[de.length - 1];
      !n || // fast path when the job id is larger than the tail
      !(e.flags & 2) && t >= Ot(n) ? de.push(e) : de.splice(ji(t), 0, e), e.flags |= 1, pr();
    }
  }
  __name(hr, "hr");
  function pr() {
    Wt || (Wt = dr.then(mr));
  }
  __name(pr, "pr");
  function Vi(e) {
    F(e) ? dt.push(...e) : ke && e.id === -1 ? ke.splice(at + 1, 0, e) : e.flags & 1 || (dt.push(e), e.flags |= 1), pr();
  }
  __name(Vi, "Vi");
  function cs(e, t, n = Re + 1) {
    for (; n < de.length; n++) {
      const s = de[n];
      if (s && s.flags & 2) {
        if (e && s.id !== e.uid)
          continue;
        de.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
      }
    }
  }
  __name(cs, "cs");
  function gr(e) {
    if (dt.length) {
      const t = [...new Set(dt)].sort(
        (n, s) => Ot(n) - Ot(s)
      );
      if (dt.length = 0, ke) {
        ke.push(...t);
        return;
      }
      for (ke = t, at = 0; at < ke.length; at++) {
        const n = ke[at];
        n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
      }
      ke = null, at = 0;
    }
  }
  __name(gr, "gr");
  var Ot = /* @__PURE__ */ __name((e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id, "Ot");
  function mr(e) {
    try {
      for (Re = 0; Re < de.length; Re++) {
        const t = de[Re];
        t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ht(
          t,
          t.i,
          t.i ? 15 : 14
        ), t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; Re < de.length; Re++) {
        const t = de[Re];
        t && (t.flags &= -2);
      }
      Re = -1, de.length = 0, gr(), Wt = null, (de.length || dt.length) && mr();
    }
  }
  __name(mr, "mr");
  var Fe = null;
  var _r = null;
  function Ut(e) {
    const t = Fe;
    return Fe = e, _r = e && e.type.__scopeId || null, t;
  }
  __name(Ut, "Ut");
  function vr(e, t = Fe, n) {
    if (!t || e._n)
      return e;
    const s = /* @__PURE__ */ __name((...r) => {
      s._d && Yt(-1);
      const i = Ut(t);
      let o;
      try {
        o = e(...r);
      } finally {
        Ut(i), s._d && Yt(1);
      }
      return o;
    }, "s");
    return s._n = true, s._c = true, s._d = true, s;
  }
  __name(vr, "vr");
  function Ze(e, t, n, s) {
    const r = e.dirs, i = t && t.dirs;
    for (let o = 0; o < r.length; o++) {
      const l = r[o];
      i && (l.oldValue = i[o].value);
      let f = l.dir[s];
      f && (it(), We(f, n, 8, [
        e.el,
        l,
        e,
        t
      ]), ot());
    }
  }
  __name(Ze, "Ze");
  var Ki = /* @__PURE__ */ Symbol("_vte");
  var xr = /* @__PURE__ */ __name((e) => e.__isTeleport, "xr");
  var Pe = /* @__PURE__ */ Symbol("_leaveCb");
  var _t = /* @__PURE__ */ Symbol("_enterCb");
  function Wi() {
    const e = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    return Er(() => {
      e.isMounted = true;
    }), qi(() => {
      e.isUnmounting = true;
    }), e;
  }
  __name(Wi, "Wi");
  var be = [Function, Array];
  var br = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: be,
    onEnter: be,
    onAfterEnter: be,
    onEnterCancelled: be,
    // leave
    onBeforeLeave: be,
    onLeave: be,
    onAfterLeave: be,
    onLeaveCancelled: be,
    // appear
    onBeforeAppear: be,
    onAppear: be,
    onAfterAppear: be,
    onAppearCancelled: be
  };
  var yr = /* @__PURE__ */ __name((e) => {
    const t = e.subTree;
    return t.component ? yr(t.component) : t;
  }, "yr");
  var Ui = {
    name: "BaseTransition",
    props: br,
    setup(e, { slots: t }) {
      const n = Mo(), s = Wi();
      return () => {
        const r = t.default && Tr(t.default(), true), i = r && r.length ? wr(r) : (
          // Keep explicit default-slot conditionals on the same transition path
          // as regular v-if branches, which render a comment placeholder.
          n.subTree ? Mn() : void 0
        );
        if (!i)
          return;
        const o = /* @__PURE__ */ H(e), { mode: l } = o;
        if (s.isLeaving)
          return un(i);
        const f = fs(i);
        if (!f)
          return un(i);
        let d = Tn(
          f,
          o,
          s,
          n,
          // #11061, ensure enterHooks is fresh after clone
          (p) => d = p
        );
        f.type !== he && Ft(f, d);
        let u = n.subTree && fs(n.subTree);
        if (u && u.type !== he && !nt(u, f) && yr(n).type !== he) {
          let p = Tn(
            u,
            o,
            s,
            n
          );
          if (Ft(u, p), l === "out-in" && f.type !== he)
            return s.isLeaving = true, p.afterLeave = () => {
              s.isLeaving = false, n.job.flags & 8 || n.update(), delete p.afterLeave, u = void 0;
            }, un(i);
          l === "in-out" && f.type !== he ? p.delayLeave = (b2, R2, $2) => {
            const C2 = Sr(
              s,
              u
            );
            C2[String(u.key)] = u, b2[Pe] = () => {
              R2(), b2[Pe] = void 0, delete d.delayedLeave, u = void 0;
            }, d.delayedLeave = () => {
              $2(), delete d.delayedLeave, u = void 0;
            };
          } : u = void 0;
        } else u && (u = void 0);
        return i;
      };
    }
  };
  function wr(e) {
    let t = e[0];
    if (e.length > 1) {
      for (const n of e)
        if (n.type !== he) {
          t = n;
          break;
        }
    }
    return t;
  }
  __name(wr, "wr");
  var ki = Ui;
  function Sr(e, t) {
    const { leavingVNodes: n } = e;
    let s = n.get(t.type);
    return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
  }
  __name(Sr, "Sr");
  function Tn(e, t, n, s, r) {
    const {
      appear: i,
      mode: o,
      persisted: l = false,
      onBeforeEnter: f,
      onEnter: d,
      onAfterEnter: u,
      onEnterCancelled: p,
      onBeforeLeave: b2,
      onLeave: R2,
      onAfterLeave: $2,
      onLeaveCancelled: C2,
      onBeforeAppear: L2,
      onAppear: O2,
      onAfterAppear: I2,
      onAppearCancelled: N2
    } = t, B2 = String(e.key), Q2 = Sr(n, e), se = /* @__PURE__ */ __name((P2, z) => {
      P2 && We(
        P2,
        s,
        9,
        z
      );
    }, "se"), ae = /* @__PURE__ */ __name((P2, z) => {
      const j2 = z[1];
      se(P2, z), F(P2) ? P2.every((T2) => T2.length <= 1) && j2() : P2.length <= 1 && j2();
    }, "ae"), q2 = {
      mode: o,
      persisted: l,
      beforeEnter(P2) {
        let z = f;
        if (!n.isMounted)
          if (i)
            z = L2 || f;
          else
            return;
        P2[Pe] && P2[Pe](
          true
          /* cancelled */
        );
        const j2 = Q2[B2];
        j2 && nt(e, j2) && j2.el[Pe] && j2.el[Pe](), se(z, [P2]);
      },
      enter(P2) {
        if (Q2[B2] === e) return;
        let z = d, j2 = u, T2 = p;
        if (!n.isMounted)
          if (i)
            z = O2 || d, j2 = I2 || u, T2 = N2 || p;
          else
            return;
        let X2 = false;
        P2[_t] = (ve) => {
          X2 || (X2 = true, ve ? se(T2, [P2]) : se(j2, [P2]), q2.delayedLeave && q2.delayedLeave(), P2[_t] = void 0);
        };
        const re = P2[_t].bind(null, false);
        z ? ae(z, [P2, re]) : re();
      },
      leave(P2, z) {
        const j2 = String(e.key);
        if (P2[_t] && P2[_t](
          true
          /* cancelled */
        ), n.isUnmounting)
          return z();
        se(b2, [P2]);
        let T2 = false;
        P2[Pe] = (re) => {
          T2 || (T2 = true, z(), re ? se(C2, [P2]) : se($2, [P2]), P2[Pe] = void 0, Q2[j2] === e && delete Q2[j2]);
        };
        const X2 = P2[Pe].bind(null, false);
        Q2[j2] = e, R2 ? ae(R2, [P2, X2]) : X2();
      },
      clone(P2) {
        const z = Tn(
          P2,
          t,
          n,
          s,
          r
        );
        return r && r(z), z;
      }
    };
    return q2;
  }
  __name(Tn, "Tn");
  function un(e) {
    if (Un(e))
      return e = Ge(e), e.children = null, e;
  }
  __name(un, "un");
  function fs(e) {
    if (!Un(e))
      return xr(e.type) && e.children ? wr(e.children) : e;
    if (e.component)
      return e.component.subTree;
    const { shapeFlag: t, children: n } = e;
    if (n) {
      if (t & 16)
        return n[0];
      if (t & 32 && k(n.default))
        return n.default();
    }
  }
  __name(fs, "fs");
  function Ft(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, Ft(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
  }
  __name(Ft, "Ft");
  function Tr(e, t = false, n) {
    let s = [], r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
      o.type === Le ? (o.patchFlag & 128 && r++, s = s.concat(
        Tr(o.children, t, l)
      )) : (t || o.type !== he) && s.push(l != null ? Ge(o, { key: l }) : o);
    }
    if (r > 1)
      for (let i = 0; i < s.length; i++)
        s[i].patchFlag = -2;
    return s;
  }
  __name(Tr, "Tr");
  // @__NO_SIDE_EFFECTS__
  function Cr(e, t) {
    return k(e) ? (
      // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      we({ name: e.name }, t, { setup: e })
    ) : e;
  }
  __name(Cr, "Cr");
  function Yi(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
  }
  __name(Yi, "Yi");
  function as(e, t) {
    let n;
    return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
  }
  __name(as, "as");
  var kt = /* @__PURE__ */ new WeakMap();
  function Tt(e, t, n, s, r = false) {
    if (F(e)) {
      e.forEach(
        (C2, L2) => Tt(
          C2,
          t && (F(t) ? t[L2] : t),
          n,
          s,
          r
        )
      );
      return;
    }
    if (Ct(s) && !r) {
      s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Tt(e, t, n, s.component.subTree);
      return;
    }
    const i = s.shapeFlag & 4 ? Zn(s.component) : s.el, o = r ? null : i, { i: l, r: f } = e, d = t && t.r, u = l.refs === Z ? l.refs = {} : l.refs, p = l.setupState, b2 = /* @__PURE__ */ H(p), R2 = p === Z ? Ks : (C2) => as(u, C2) ? false : K(b2, C2), $2 = /* @__PURE__ */ __name((C2, L2) => !(L2 && as(u, L2)), "$");
    if (d != null && d !== f) {
      if (us(t), ne(d))
        u[d] = null, R2(d) && (p[d] = null);
      else if (/* @__PURE__ */ ye(d)) {
        const C2 = t;
        $2(d, C2.k) && (d.value = null), C2.k && (u[C2.k] = null);
      }
    }
    if (k(f))
      Ht(f, l, 12, [o, u]);
    else {
      const C2 = ne(f), L2 = /* @__PURE__ */ ye(f);
      if (C2 || L2) {
        const O2 = /* @__PURE__ */ __name(() => {
          if (e.f) {
            const I2 = C2 ? R2(f) ? p[f] : u[f] : $2() || !e.k ? f.value : u[e.k];
            if (r)
              F(I2) && qr(I2, i);
            else if (F(I2))
              I2.includes(i) || I2.push(i);
            else if (C2)
              u[f] = [i], R2(f) && (p[f] = u[f]);
            else {
              const N2 = [i];
              $2(f, e.k) && (f.value = N2), e.k && (u[e.k] = N2);
            }
          } else C2 ? (u[f] = o, R2(f) && (p[f] = o)) : L2 && ($2(f, e.k) && (f.value = o), e.k && (u[e.k] = o));
        }, "O");
        if (o) {
          const I2 = /* @__PURE__ */ __name(() => {
            O2(), kt.delete(e);
          }, "I");
          I2.id = -1, kt.set(e, I2), me(I2, n);
        } else
          us(e), O2();
      }
    }
  }
  __name(Tt, "Tt");
  function us(e) {
    const t = kt.get(e);
    t && (t.flags |= 8, kt.delete(e));
  }
  __name(us, "us");
  Qt().requestIdleCallback;
  Qt().cancelIdleCallback;
  var Ct = /* @__PURE__ */ __name((e) => !!e.type.__asyncLoader, "Ct");
  var Un = /* @__PURE__ */ __name((e) => e.type.__isKeepAlive, "Un");
  function Xi(e, t, n = lt, s = false) {
    if (n) {
      const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
        it();
        const l = Gn(n), f = We(t, n, e, o);
        return l(), ot(), f;
      });
      return s ? r.unshift(i) : r.push(i), i;
    }
  }
  __name(Xi, "Xi");
  var kn = /* @__PURE__ */ __name((e) => (t, n = lt) => {
    (!Jn || e === "sp") && Xi(e, (...s) => t(...s), n);
  }, "kn");
  var Er = kn("m");
  var qi = kn(
    "bum"
  );
  var Gi = kn("um");
  var Ji = /* @__PURE__ */ Symbol.for("v-ndc");
  var Cn = /* @__PURE__ */ __name((e) => e ? Kr(e) ? Zn(e) : Cn(e.parent) : null, "Cn");
  var Et = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ we(/* @__PURE__ */ Object.create(null), {
      $: /* @__PURE__ */ __name((e) => e, "$"),
      $el: /* @__PURE__ */ __name((e) => e.vnode.el, "$el"),
      $data: /* @__PURE__ */ __name((e) => e.data, "$data"),
      $props: /* @__PURE__ */ __name((e) => e.props, "$props"),
      $attrs: /* @__PURE__ */ __name((e) => e.attrs, "$attrs"),
      $slots: /* @__PURE__ */ __name((e) => e.slots, "$slots"),
      $refs: /* @__PURE__ */ __name((e) => e.refs, "$refs"),
      $parent: /* @__PURE__ */ __name((e) => Cn(e.parent), "$parent"),
      $root: /* @__PURE__ */ __name((e) => Cn(e.root), "$root"),
      $host: /* @__PURE__ */ __name((e) => e.ce, "$host"),
      $emit: /* @__PURE__ */ __name((e) => e.emit, "$emit"),
      $options: /* @__PURE__ */ __name((e) => e.type, "$options"),
      $forceUpdate: /* @__PURE__ */ __name((e) => e.f || (e.f = () => {
        hr(e.update);
      }), "$forceUpdate"),
      $nextTick: /* @__PURE__ */ __name((e) => e.n || (e.n = Bi.bind(e.proxy)), "$nextTick"),
      $watch: /* @__PURE__ */ __name((e) => Ln, "$watch")
    })
  );
  var dn = /* @__PURE__ */ __name((e, t) => e !== Z && !e.__isScriptSetup && K(e, t), "dn");
  var Zi = {
    get({ _: e }, t) {
      if (t === "__v_skip")
        return true;
      const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: f } = e;
      if (t[0] !== "$") {
        const b2 = o[t];
        if (b2 !== void 0)
          switch (b2) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (dn(s, t))
            return o[t] = 1, s[t];
          if (K(i, t))
            return o[t] = 3, i[t];
          if (n !== Z && K(n, t))
            return o[t] = 4, n[t];
          o[t] = 0;
        }
      }
      const d = Et[t];
      let u, p;
      if (d)
        return t === "$attrs" && fe(e.attrs, "get", ""), d(e);
      if (
        // css module (injected by vue-loader)
        (u = l.__cssModules) && (u = u[t])
      )
        return u;
      if (n !== Z && K(n, t))
        return o[t] = 4, n[t];
      if (
        // global properties
        p = f.config.globalProperties, K(p, t)
      )
        return p[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e;
      return dn(r, t) ? (r[t] = n, true) : K(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (i[t] = n, true);
    },
    has({
      _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o }
    }, l) {
      let f;
      return !!(n[l] || dn(t, l) || K(i, l) || K(s, l) || K(Et, l) || K(r.config.globalProperties, l) || (f = o.__cssModules) && f[l]);
    },
    defineProperty(e, t, n) {
      return n.get != null ? e._.accessCache[t] = 0 : K(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
    }
  };
  function Ar() {
    return {
      app: null,
      config: {
        isNativeTag: Ks,
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
  __name(Ar, "Ar");
  var Qi = 0;
  function eo(e, t) {
    return function(s, r = null) {
      k(s) || (s = we({}, s)), r != null && !Y(r) && (r = null);
      const i = Ar(), o = /* @__PURE__ */ new WeakSet(), l = [];
      let f = false;
      const d = i.app = {
        _uid: Qi++,
        _component: s,
        _props: r,
        _container: null,
        _context: i,
        _instance: null,
        version: $o,
        get config() {
          return i.config;
        },
        set config(u) {
        },
        use(u, ...p) {
          return o.has(u) || (u && k(u.install) ? (o.add(u), u.install(d, ...p)) : k(u) && (o.add(u), u(d, ...p))), d;
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
        mount(u, p, b2) {
          if (!f) {
            const R2 = d._ceVNode || pe(s, r);
            return R2.appContext = i, b2 === true ? b2 = "svg" : b2 === false && (b2 = void 0), e(R2, u, b2), f = true, d._container = u, u.__vue_app__ = d, Zn(R2.component);
          }
        },
        onUnmount(u) {
          l.push(u);
        },
        unmount() {
          f && (We(
            l,
            d._instance,
            16
          ), e(null, d._container), delete d._container.__vue_app__);
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
  __name(eo, "eo");
  var to = /* @__PURE__ */ __name((e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Se(t)}Modifiers`] || e[`${ct(t)}Modifiers`], "to");
  function no(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || Z;
    let r = n;
    const i = t.startsWith("update:"), o = i && to(s, t.slice(7));
    o && (o.trim && (r = n.map((u) => ne(u) ? u.trim() : u)), o.number && (r = n.map(ni)));
    let l, f = s[l = rn(t)] || // also try camelCase event handler (#2249)
    s[l = rn(Se(t))];
    !f && i && (f = s[l = rn(ct(t))]), f && We(
      f,
      e,
      6,
      r
    );
    const d = s[l + "Once"];
    if (d) {
      if (!e.emitted)
        e.emitted = {};
      else if (e.emitted[l])
        return;
      e.emitted[l] = true, We(
        d,
        e,
        6,
        r
      );
    }
  }
  __name(no, "no");
  function so(e, t, n = false) {
    const s = t.emitsCache, r = s.get(e);
    if (r !== void 0)
      return r;
    const i = e.emits;
    let o = {};
    return i ? (F(i) ? i.forEach((l) => o[l] = null) : we(o, i), Y(e) && s.set(e, o), o) : (Y(e) && s.set(e, null), null);
  }
  __name(so, "so");
  function tn(e, t) {
    return !e || !Gt(t) ? false : (t = t.slice(2).replace(/Once$/, ""), K(e, t[0].toLowerCase() + t.slice(1)) || K(e, ct(t)) || K(e, t));
  }
  __name(tn, "tn");
  function ds(e) {
    const {
      type: t,
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
      data: b2,
      setupState: R2,
      ctx: $2,
      inheritAttrs: C2
    } = e, L2 = Ut(e);
    let O2, I2;
    try {
      if (n.shapeFlag & 4) {
        const B2 = r || s, Q2 = B2;
        O2 = Oe(
          d.call(
            Q2,
            B2,
            u,
            p,
            R2,
            b2,
            $2
          )
        ), I2 = l;
      } else {
        const B2 = t;
        O2 = Oe(
          B2.length > 1 ? B2(
            p,
            { attrs: l, slots: o, emit: f }
          ) : B2(
            p,
            null
          )
        ), I2 = t.props ? l : ro(l);
      }
    } catch (B2) {
      At.length = 0, en(B2, e, 1), O2 = pe(he);
    }
    let N2 = O2;
    if (I2 && C2 !== false) {
      const B2 = Object.keys(I2), { shapeFlag: Q2 } = N2;
      B2.length && Q2 & 7 && (i && B2.some(Jt) && (I2 = io(
        I2,
        i
      )), N2 = Ge(N2, I2, false, true));
    }
    return n.dirs && (N2 = Ge(N2, null, false, true), N2.dirs = N2.dirs ? N2.dirs.concat(n.dirs) : n.dirs), n.transition && Ft(N2, n.transition), O2 = N2, Ut(L2), O2;
  }
  __name(ds, "ds");
  var ro = /* @__PURE__ */ __name((e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Gt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  }, "ro");
  var io = /* @__PURE__ */ __name((e, t) => {
    const n = {};
    for (const s in e)
      (!Jt(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  }, "io");
  function oo(e, t, n) {
    const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: f } = t, d = i.emitsOptions;
    if (t.dirs || t.transition)
      return true;
    if (n && f >= 0) {
      if (f & 1024)
        return true;
      if (f & 16)
        return s ? hs(s, o, d) : !!o;
      if (f & 8) {
        const u = t.dynamicProps;
        for (let p = 0; p < u.length; p++) {
          const b2 = u[p];
          if (Mr(o, s, b2) && !tn(d, b2))
            return true;
        }
      }
    } else
      return (r || l) && (!l || !l.$stable) ? true : s === o ? false : s ? o ? hs(s, o, d) : true : !!o;
    return false;
  }
  __name(oo, "oo");
  function hs(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length)
      return true;
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      if (Mr(t, e, i) && !tn(n, i))
        return true;
    }
    return false;
  }
  __name(hs, "hs");
  function Mr(e, t, n) {
    const s = e[n], r = t[n];
    return n === "style" && Y(s) && Y(r) ? !Fn(s, r) : s !== r;
  }
  __name(Mr, "Mr");
  function lo({ vnode: e, parent: t, suspense: n }, s) {
    for (; t; ) {
      const r = t.subTree;
      if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = s, e = r), r === e)
        (e = t.vnode).el = s, t = t.parent;
      else
        break;
    }
    n && n.activeBranch === e && (n.vnode.el = s);
  }
  __name(lo, "lo");
  var Rr = {};
  var Pr = /* @__PURE__ */ __name(() => Object.create(Rr), "Pr");
  var Ir = /* @__PURE__ */ __name((e) => Object.getPrototypeOf(e) === Rr, "Ir");
  function co(e, t, n, s = false) {
    const r = {}, i = Pr();
    e.propsDefaults = /* @__PURE__ */ Object.create(null), Lr(e, t, r, i);
    for (const o in e.propsOptions[0])
      o in r || (r[o] = void 0);
    n ? e.props = s ? r : /* @__PURE__ */ Ii(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
  }
  __name(co, "co");
  function fo(e, t, n, s) {
    const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o }
    } = e, l = /* @__PURE__ */ H(r), [f] = e.propsOptions;
    let d = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (s || o > 0) && !(o & 16)
    ) {
      if (o & 8) {
        const u = e.vnode.dynamicProps;
        for (let p = 0; p < u.length; p++) {
          let b2 = u[p];
          if (tn(e.emitsOptions, b2))
            continue;
          const R2 = t[b2];
          if (f)
            if (K(i, b2))
              R2 !== i[b2] && (i[b2] = R2, d = true);
            else {
              const $2 = Se(b2);
              r[$2] = En(
                f,
                l,
                $2,
                R2,
                e,
                false
              );
            }
          else
            R2 !== i[b2] && (i[b2] = R2, d = true);
        }
      }
    } else {
      Lr(e, t, r, i) && (d = true);
      let u;
      for (const p in l)
        (!t || // for camelCase
        !K(t, p) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((u = ct(p)) === p || !K(t, u))) && (f ? n && // for camelCase
        (n[p] !== void 0 || // for kebab-case
        n[u] !== void 0) && (r[p] = En(
          f,
          l,
          p,
          void 0,
          e,
          true
        )) : delete r[p]);
      if (i !== l)
        for (const p in i)
          (!t || !K(t, p)) && (delete i[p], d = true);
    }
    d && Ve(e.attrs, "set", "");
  }
  __name(fo, "fo");
  function Lr(e, t, n, s) {
    const [r, i] = e.propsOptions;
    let o = false, l;
    if (t)
      for (let f in t) {
        if (yt(f))
          continue;
        const d = t[f];
        let u;
        r && K(r, u = Se(f)) ? !i || !i.includes(u) ? n[u] = d : (l || (l = {}))[u] = d : tn(e.emitsOptions, f) || (!(f in s) || d !== s[f]) && (s[f] = d, o = true);
      }
    if (i) {
      const f = /* @__PURE__ */ H(n), d = l || Z;
      for (let u = 0; u < i.length; u++) {
        const p = i[u];
        n[p] = En(
          r,
          f,
          p,
          d[p],
          e,
          !K(d, p)
        );
      }
    }
    return o;
  }
  __name(Lr, "Lr");
  function En(e, t, n, s, r, i) {
    const o = e[n];
    if (o != null) {
      const l = K(o, "default");
      if (l && s === void 0) {
        const f = o.default;
        if (o.type !== Function && !o.skipFactory && k(f)) {
          const { propsDefaults: d } = r;
          if (n in d)
            s = d[n];
          else {
            const u = Gn(r);
            s = d[n] = f.call(
              null,
              t
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
      ] && (s === "" || s === ct(n)) && (s = true));
    }
    return s;
  }
  __name(En, "En");
  function ao(e, t, n = false) {
    const s = t.propsCache, r = s.get(e);
    if (r)
      return r;
    const i = e.props, o = {}, l = [];
    if (!i)
      return Y(e) && s.set(e, ut), ut;
    if (F(i))
      for (let d = 0; d < i.length; d++) {
        const u = Se(i[d]);
        ps(u) && (o[u] = Z);
      }
    else if (i)
      for (const d in i) {
        const u = Se(d);
        if (ps(u)) {
          const p = i[d], b2 = o[u] = F(p) || k(p) ? { type: p } : we({}, p), R2 = b2.type;
          let $2 = false, C2 = true;
          if (F(R2))
            for (let L2 = 0; L2 < R2.length; ++L2) {
              const O2 = R2[L2], I2 = k(O2) && O2.name;
              if (I2 === "Boolean") {
                $2 = true;
                break;
              } else I2 === "String" && (C2 = false);
            }
          else
            $2 = k(R2) && R2.name === "Boolean";
          b2[
            0
            /* shouldCast */
          ] = $2, b2[
            1
            /* shouldCastTrue */
          ] = C2, ($2 || K(b2, "default")) && l.push(u);
        }
      }
    const f = [o, l];
    return Y(e) && s.set(e, f), f;
  }
  __name(ao, "ao");
  function ps(e) {
    return e[0] !== "$" && !yt(e);
  }
  __name(ps, "ps");
  var Yn = /* @__PURE__ */ __name((e) => e === "_" || e === "_ctx" || e === "$stable", "Yn");
  var Xn = /* @__PURE__ */ __name((e) => F(e) ? e.map(Oe) : [Oe(e)], "Xn");
  var uo = /* @__PURE__ */ __name((e, t, n) => {
    if (t._n)
      return t;
    const s = vr((...r) => Xn(t(...r)), n);
    return s._c = false, s;
  }, "uo");
  var Or = /* @__PURE__ */ __name((e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (Yn(r)) continue;
      const i = e[r];
      if (k(i))
        t[r] = uo(r, i, s);
      else if (i != null) {
        const o = Xn(i);
        t[r] = () => o;
      }
    }
  }, "Or");
  var Fr = /* @__PURE__ */ __name((e, t) => {
    const n = Xn(t);
    e.slots.default = () => n;
  }, "Fr");
  var $r = /* @__PURE__ */ __name((e, t, n) => {
    for (const s in t)
      (n || !Yn(s)) && (e[s] = t[s]);
  }, "$r");
  var ho = /* @__PURE__ */ __name((e, t, n) => {
    const s = e.slots = Pr();
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? ($r(s, t, n), n && Ys(s, "_", r, true)) : Or(t, s);
    } else t && Fr(e, t);
  }, "ho");
  var po = /* @__PURE__ */ __name((e, t, n) => {
    const { vnode: s, slots: r } = e;
    let i = true, o = Z;
    if (s.shapeFlag & 32) {
      const l = t._;
      l ? n && l === 1 ? i = false : $r(r, t, n) : (i = !t.$stable, Or(t, r)), o = t;
    } else t && (Fr(e, t), o = { default: 1 });
    if (i)
      for (const l in r)
        !Yn(l) && o[l] == null && delete r[l];
  }, "po");
  var me = xo;
  function go(e) {
    return mo(e);
  }
  __name(go, "go");
  function mo(e, t) {
    const n = Qt();
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
      nextSibling: b2,
      setScopeId: R2 = Ln,
      insertStaticContent: $2
    } = e, C2 = /* @__PURE__ */ __name((c, a, h, v2 = null, g2 = null, m = null, w2 = void 0, y2 = null, x2 = !!a.dynamicChildren) => {
      if (c === a)
        return;
      c && !nt(c, a) && (v2 = zt(c), le(c, g2, m, true), c = null), a.patchFlag === -2 && (x2 = false, a.dynamicChildren = null);
      const { type: _2, ref: A2, shapeFlag: S2 } = a;
      switch (_2) {
        case nn:
          L2(c, a, h, v2);
          break;
        case he:
          O2(c, a, h, v2);
          break;
        case pn:
          c == null && I2(a, h, v2, w2);
          break;
        case Le:
          T2(
            c,
            a,
            h,
            v2,
            g2,
            m,
            w2,
            y2,
            x2
          );
          break;
        default:
          S2 & 1 ? Q2(
            c,
            a,
            h,
            v2,
            g2,
            m,
            w2,
            y2,
            x2
          ) : S2 & 6 ? X2(
            c,
            a,
            h,
            v2,
            g2,
            m,
            w2,
            y2,
            x2
          ) : (S2 & 64 || S2 & 128) && _2.process(
            c,
            a,
            h,
            v2,
            g2,
            m,
            w2,
            y2,
            x2,
            pt
          );
      }
      A2 != null && g2 ? Tt(A2, c && c.ref, m, a || c, !a) : A2 == null && c && c.ref != null && Tt(c.ref, null, m, c, true);
    }, "C"), L2 = /* @__PURE__ */ __name((c, a, h, v2) => {
      if (c == null)
        s(
          a.el = l(a.children),
          h,
          v2
        );
      else {
        const g2 = a.el = c.el;
        a.children !== c.children && d(g2, a.children);
      }
    }, "L"), O2 = /* @__PURE__ */ __name((c, a, h, v2) => {
      c == null ? s(
        a.el = f(a.children || ""),
        h,
        v2
      ) : a.el = c.el;
    }, "O"), I2 = /* @__PURE__ */ __name((c, a, h, v2) => {
      [c.el, c.anchor] = $2(
        c.children,
        a,
        h,
        v2,
        c.el,
        c.anchor
      );
    }, "I"), N2 = /* @__PURE__ */ __name(({ el: c, anchor: a }, h, v2) => {
      let g2;
      for (; c && c !== a; )
        g2 = b2(c), s(c, h, v2), c = g2;
      s(a, h, v2);
    }, "N"), B2 = /* @__PURE__ */ __name(({ el: c, anchor: a }) => {
      let h;
      for (; c && c !== a; )
        h = b2(c), r(c), c = h;
      r(a);
    }, "B"), Q2 = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2, y2, x2) => {
      if (a.type === "svg" ? w2 = "svg" : a.type === "math" && (w2 = "mathml"), c == null)
        se(
          a,
          h,
          v2,
          g2,
          m,
          w2,
          y2,
          x2
        );
      else {
        const _2 = c.el && c.el._isVueCE ? c.el : null;
        try {
          _2 && _2._beginPatch(), P2(
            c,
            a,
            g2,
            m,
            w2,
            y2,
            x2
          );
        } finally {
          _2 && _2._endPatch();
        }
      }
    }, "Q"), se = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2, y2) => {
      let x2, _2;
      const { props: A2, shapeFlag: S2, transition: E2, dirs: M2 } = c;
      if (x2 = c.el = o(
        c.type,
        m,
        A2 && A2.is,
        A2
      ), S2 & 8 ? u(x2, c.children) : S2 & 16 && q2(
        c.children,
        x2,
        null,
        v2,
        g2,
        hn(c, m),
        w2,
        y2
      ), M2 && Ze(c, null, v2, "created"), ae(x2, c, c.scopeId, w2, v2), A2) {
        for (const V2 in A2)
          V2 !== "value" && !yt(V2) && i(x2, V2, null, A2[V2], m, v2);
        "value" in A2 && i(x2, "value", null, A2.value, m), (_2 = A2.onVnodeBeforeMount) && Me(_2, v2, c);
      }
      M2 && Ze(c, null, v2, "beforeMount");
      const D2 = _o(g2, E2);
      D2 && E2.beforeEnter(x2), s(x2, a, h), ((_2 = A2 && A2.onVnodeMounted) || D2 || M2) && me(() => {
        try {
          _2 && Me(_2, v2, c), D2 && E2.enter(x2), M2 && Ze(c, null, v2, "mounted");
        } finally {
        }
      }, g2);
    }, "se"), ae = /* @__PURE__ */ __name((c, a, h, v2, g2) => {
      if (h && R2(c, h), v2)
        for (let m = 0; m < v2.length; m++)
          R2(c, v2[m]);
      if (g2) {
        let m = g2.subTree;
        if (a === m || zr(m.type) && (m.ssContent === a || m.ssFallback === a)) {
          const w2 = g2.vnode;
          ae(
            c,
            w2,
            w2.scopeId,
            w2.slotScopeIds,
            g2.parent
          );
        }
      }
    }, "ae"), q2 = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2, y2, x2 = 0) => {
      for (let _2 = x2; _2 < c.length; _2++) {
        const A2 = c[_2] = y2 ? je(c[_2]) : Oe(c[_2]);
        C2(
          null,
          A2,
          a,
          h,
          v2,
          g2,
          m,
          w2,
          y2
        );
      }
    }, "q"), P2 = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2) => {
      const y2 = a.el = c.el;
      let { patchFlag: x2, dynamicChildren: _2, dirs: A2 } = a;
      x2 |= c.patchFlag & 16;
      const S2 = c.props || Z, E2 = a.props || Z;
      let M2;
      if (h && Qe(h, false), (M2 = E2.onVnodeBeforeUpdate) && Me(M2, h, a, c), A2 && Ze(a, c, h, "beforeUpdate"), h && Qe(h, true), (S2.innerHTML && E2.innerHTML == null || S2.textContent && E2.textContent == null) && u(y2, ""), _2 ? z(
        c.dynamicChildren,
        _2,
        y2,
        h,
        v2,
        hn(a, g2),
        m
      ) : w2 || ee(
        c,
        a,
        y2,
        null,
        h,
        v2,
        hn(a, g2),
        m,
        false
      ), x2 > 0) {
        if (x2 & 16)
          j2(y2, S2, E2, h, g2);
        else if (x2 & 2 && S2.class !== E2.class && i(y2, "class", null, E2.class, g2), x2 & 4 && i(y2, "style", S2.style, E2.style, g2), x2 & 8) {
          const D2 = a.dynamicProps;
          for (let V2 = 0; V2 < D2.length; V2++) {
            const W2 = D2[V2], te = S2[W2], oe = E2[W2];
            (oe !== te || W2 === "value") && i(y2, W2, te, oe, g2, h);
          }
        }
        x2 & 1 && c.children !== a.children && u(y2, a.children);
      } else !w2 && _2 == null && j2(y2, S2, E2, h, g2);
      ((M2 = E2.onVnodeUpdated) || A2) && me(() => {
        M2 && Me(M2, h, a, c), A2 && Ze(a, c, h, "updated");
      }, v2);
    }, "P"), z = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2) => {
      for (let y2 = 0; y2 < a.length; y2++) {
        const x2 = c[y2], _2 = a[y2], A2 = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          x2.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (x2.type === Le || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !nt(x2, _2) || // - In the case of a component, it could contain anything.
          x2.shapeFlag & 198) ? p(x2.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            h
          )
        );
        C2(
          x2,
          _2,
          A2,
          null,
          v2,
          g2,
          m,
          w2,
          true
        );
      }
    }, "z"), j2 = /* @__PURE__ */ __name((c, a, h, v2, g2) => {
      if (a !== h) {
        if (a !== Z)
          for (const m in a)
            !yt(m) && !(m in h) && i(
              c,
              m,
              a[m],
              null,
              g2,
              v2
            );
        for (const m in h) {
          if (yt(m)) continue;
          const w2 = h[m], y2 = a[m];
          w2 !== y2 && m !== "value" && i(c, m, y2, w2, g2, v2);
        }
        "value" in h && i(c, "value", a.value, h.value, g2);
      }
    }, "j"), T2 = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2, y2, x2) => {
      const _2 = a.el = c ? c.el : l(""), A2 = a.anchor = c ? c.anchor : l("");
      let { patchFlag: S2, dynamicChildren: E2, slotScopeIds: M2 } = a;
      M2 && (y2 = y2 ? y2.concat(M2) : M2), c == null ? (s(_2, h, v2), s(A2, h, v2), q2(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        a.children || [],
        h,
        A2,
        g2,
        m,
        w2,
        y2,
        x2
      )) : S2 > 0 && S2 & 64 && E2 && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      c.dynamicChildren && c.dynamicChildren.length === E2.length ? (z(
        c.dynamicChildren,
        E2,
        h,
        g2,
        m,
        w2,
        y2
      ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (a.key != null || g2 && a === g2.subTree) && Nr(
        c,
        a,
        true
        /* shallow */
      )) : ee(
        c,
        a,
        h,
        A2,
        g2,
        m,
        w2,
        y2,
        x2
      );
    }, "T"), X2 = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2, y2, x2) => {
      a.slotScopeIds = y2, c == null ? a.shapeFlag & 512 ? g2.ctx.activate(
        a,
        h,
        v2,
        w2,
        x2
      ) : re(
        a,
        h,
        v2,
        g2,
        m,
        w2,
        x2
      ) : ve(c, a, x2);
    }, "X"), re = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2) => {
      const y2 = c.component = Ao(
        c,
        v2,
        g2
      );
      if (Un(c) && (y2.ctx.renderer = pt), Ro(y2, false, w2), y2.asyncDep) {
        if (g2 && g2.registerDep(y2, Je, w2), !c.el) {
          const x2 = y2.subTree = pe(he);
          O2(null, x2, a, h), c.placeholder = x2.el;
        }
      } else
        Je(
          y2,
          c,
          a,
          h,
          g2,
          m,
          w2
        );
    }, "re"), ve = /* @__PURE__ */ __name((c, a, h) => {
      const v2 = a.component = c.component;
      if (oo(c, a, h))
        if (v2.asyncDep && !v2.asyncResolved) {
          G2(v2, a, h);
          return;
        } else
          v2.next = a, v2.update();
      else
        a.el = c.el, v2.vnode = a;
    }, "ve"), Je = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2) => {
      const y2 = /* @__PURE__ */ __name(() => {
        if (c.isMounted) {
          let { next: S2, bu: E2, u: M2, parent: D2, vnode: V2 } = c;
          {
            const Ee = Dr(c);
            if (Ee) {
              S2 && (S2.el = V2.el, G2(c, S2, w2)), Ee.asyncDep.then(() => {
                me(() => {
                  c.isUnmounted || _2();
                }, g2);
              });
              return;
            }
          }
          let W2 = S2, te;
          Qe(c, false), S2 ? (S2.el = V2.el, G2(c, S2, w2)) : S2 = V2, E2 && on(E2), (te = S2.props && S2.props.onVnodeBeforeUpdate) && Me(te, D2, S2, V2), Qe(c, true);
          const oe = ds(c), Ce = c.subTree;
          c.subTree = oe, C2(
            Ce,
            oe,
            // parent may have changed if it's in a teleport
            p(Ce.el),
            // anchor may have changed if it's in a fragment
            zt(Ce),
            c,
            g2,
            m
          ), S2.el = oe.el, W2 === null && lo(c, oe.el), M2 && me(M2, g2), (te = S2.props && S2.props.onVnodeUpdated) && me(
            () => Me(te, D2, S2, V2),
            g2
          );
        } else {
          let S2;
          const { el: E2, props: M2 } = a, { bm: D2, m: V2, parent: W2, root: te, type: oe } = c, Ce = Ct(a);
          Qe(c, false), D2 && on(D2), !Ce && (S2 = M2 && M2.onVnodeBeforeMount) && Me(S2, W2, a), Qe(c, true);
          {
            te.ce && te.ce._hasShadowRoot() && te.ce._injectChildStyle(
              oe,
              c.parent ? c.parent.type : void 0
            );
            const Ee = c.subTree = ds(c);
            C2(
              null,
              Ee,
              h,
              v2,
              c,
              g2,
              m
            ), a.el = Ee.el;
          }
          if (V2 && me(V2, g2), !Ce && (S2 = M2 && M2.onVnodeMounted)) {
            const Ee = a;
            me(
              () => Me(S2, W2, Ee),
              g2
            );
          }
          (a.shapeFlag & 256 || W2 && Ct(W2.vnode) && W2.vnode.shapeFlag & 256) && c.a && me(c.a, g2), c.isMounted = true, a = h = v2 = null;
        }
      }, "y");
      c.scope.on();
      const x2 = c.effect = new di(y2);
      c.scope.off();
      const _2 = c.update = x2.run.bind(x2), A2 = c.job = x2.runIfDirty.bind(x2);
      A2.i = c, A2.id = c.uid, x2.scheduler = () => hr(A2), Qe(c, true), _2();
    }, "Je"), G2 = /* @__PURE__ */ __name((c, a, h) => {
      a.component = c;
      const v2 = c.vnode.props;
      c.vnode = a, c.next = null, fo(c, a.props, v2, h), po(c, a.children, h), it(), cs(c), ot();
    }, "G"), ee = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2, y2, x2 = false) => {
      const _2 = c && c.children, A2 = c ? c.shapeFlag : 0, S2 = a.children, { patchFlag: E2, shapeFlag: M2 } = a;
      if (E2 > 0) {
        if (E2 & 128) {
          ie(
            _2,
            S2,
            h,
            v2,
            g2,
            m,
            w2,
            y2,
            x2
          );
          return;
        } else if (E2 & 256) {
          ue(
            _2,
            S2,
            h,
            v2,
            g2,
            m,
            w2,
            y2,
            x2
          );
          return;
        }
      }
      M2 & 8 ? (A2 & 16 && ht(_2, g2, m), S2 !== _2 && u(h, S2)) : A2 & 16 ? M2 & 16 ? ie(
        _2,
        S2,
        h,
        v2,
        g2,
        m,
        w2,
        y2,
        x2
      ) : ht(_2, g2, m, true) : (A2 & 8 && u(h, ""), M2 & 16 && q2(
        S2,
        h,
        v2,
        g2,
        m,
        w2,
        y2,
        x2
      ));
    }, "ee"), ue = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2, y2, x2) => {
      c = c || ut, a = a || ut;
      const _2 = c.length, A2 = a.length, S2 = Math.min(_2, A2);
      let E2;
      for (E2 = 0; E2 < S2; E2++) {
        const M2 = a[E2] = x2 ? je(a[E2]) : Oe(a[E2]);
        C2(
          c[E2],
          M2,
          h,
          null,
          g2,
          m,
          w2,
          y2,
          x2
        );
      }
      _2 > A2 ? ht(
        c,
        g2,
        m,
        true,
        false,
        S2
      ) : q2(
        a,
        h,
        v2,
        g2,
        m,
        w2,
        y2,
        x2,
        S2
      );
    }, "ue"), ie = /* @__PURE__ */ __name((c, a, h, v2, g2, m, w2, y2, x2) => {
      let _2 = 0;
      const A2 = a.length;
      let S2 = c.length - 1, E2 = A2 - 1;
      for (; _2 <= S2 && _2 <= E2; ) {
        const M2 = c[_2], D2 = a[_2] = x2 ? je(a[_2]) : Oe(a[_2]);
        if (nt(M2, D2))
          C2(
            M2,
            D2,
            h,
            null,
            g2,
            m,
            w2,
            y2,
            x2
          );
        else
          break;
        _2++;
      }
      for (; _2 <= S2 && _2 <= E2; ) {
        const M2 = c[S2], D2 = a[E2] = x2 ? je(a[E2]) : Oe(a[E2]);
        if (nt(M2, D2))
          C2(
            M2,
            D2,
            h,
            null,
            g2,
            m,
            w2,
            y2,
            x2
          );
        else
          break;
        S2--, E2--;
      }
      if (_2 > S2) {
        if (_2 <= E2) {
          const M2 = E2 + 1, D2 = M2 < A2 ? a[M2].el : v2;
          for (; _2 <= E2; )
            C2(
              null,
              a[_2] = x2 ? je(a[_2]) : Oe(a[_2]),
              h,
              D2,
              g2,
              m,
              w2,
              y2,
              x2
            ), _2++;
        }
      } else if (_2 > E2)
        for (; _2 <= S2; )
          le(c[_2], g2, m, true), _2++;
      else {
        const M2 = _2, D2 = _2, V2 = /* @__PURE__ */ new Map();
        for (_2 = D2; _2 <= E2; _2++) {
          const ge = a[_2] = x2 ? je(a[_2]) : Oe(a[_2]);
          ge.key != null && V2.set(ge.key, _2);
        }
        let W2, te = 0;
        const oe = E2 - D2 + 1;
        let Ce = false, Ee = 0;
        const gt = new Array(oe);
        for (_2 = 0; _2 < oe; _2++) gt[_2] = 0;
        for (_2 = M2; _2 <= S2; _2++) {
          const ge = c[_2];
          if (te >= oe) {
            le(ge, g2, m, true);
            continue;
          }
          let Ae;
          if (ge.key != null)
            Ae = V2.get(ge.key);
          else
            for (W2 = D2; W2 <= E2; W2++)
              if (gt[W2 - D2] === 0 && nt(ge, a[W2])) {
                Ae = W2;
                break;
              }
          Ae === void 0 ? le(ge, g2, m, true) : (gt[Ae - D2] = _2 + 1, Ae >= Ee ? Ee = Ae : Ce = true, C2(
            ge,
            a[Ae],
            h,
            null,
            g2,
            m,
            w2,
            y2,
            x2
          ), te++);
        }
        const ts = Ce ? vo(gt) : ut;
        for (W2 = ts.length - 1, _2 = oe - 1; _2 >= 0; _2--) {
          const ge = D2 + _2, Ae = a[ge], ns = a[ge + 1], ss = ge + 1 < A2 ? (
            // #13559, #14173 fallback to el placeholder for unresolved async component
            ns.el || Hr(ns)
          ) : v2;
          gt[_2] === 0 ? C2(
            null,
            Ae,
            h,
            ss,
            g2,
            m,
            w2,
            y2,
            x2
          ) : Ce && (W2 < 0 || _2 !== ts[W2] ? xe(Ae, h, ss, 2) : W2--);
        }
      }
    }, "ie"), xe = /* @__PURE__ */ __name((c, a, h, v2, g2 = null) => {
      const { el: m, type: w2, transition: y2, children: x2, shapeFlag: _2 } = c;
      if (_2 & 6) {
        xe(c.component.subTree, a, h, v2);
        return;
      }
      if (_2 & 128) {
        c.suspense.move(a, h, v2);
        return;
      }
      if (_2 & 64) {
        w2.move(c, a, h, pt);
        return;
      }
      if (w2 === Le) {
        s(m, a, h);
        for (let S2 = 0; S2 < x2.length; S2++)
          xe(x2[S2], a, h, v2);
        s(c.anchor, a, h);
        return;
      }
      if (w2 === pn) {
        N2(c, a, h);
        return;
      }
      if (v2 !== 2 && _2 & 1 && y2)
        if (v2 === 0)
          y2.beforeEnter(m), s(m, a, h), me(() => y2.enter(m), g2);
        else {
          const { leave: S2, delayLeave: E2, afterLeave: M2 } = y2, D2 = /* @__PURE__ */ __name(() => {
            c.ctx.isUnmounted ? r(m) : s(m, a, h);
          }, "D"), V2 = /* @__PURE__ */ __name(() => {
            m._isLeaving && m[Pe](
              true
              /* cancelled */
            ), S2(m, () => {
              D2(), M2 && M2();
            });
          }, "V");
          E2 ? E2(m, D2, V2) : V2();
        }
      else
        s(m, a, h);
    }, "xe"), le = /* @__PURE__ */ __name((c, a, h, v2 = false, g2 = false) => {
      const {
        type: m,
        props: w2,
        ref: y2,
        children: x2,
        dynamicChildren: _2,
        shapeFlag: A2,
        patchFlag: S2,
        dirs: E2,
        cacheIndex: M2,
        memo: D2
      } = c;
      if (S2 === -2 && (g2 = false), y2 != null && (it(), Tt(y2, null, h, c, true), ot()), M2 != null && (a.renderCache[M2] = void 0), A2 & 256) {
        a.ctx.deactivate(c);
        return;
      }
      const V2 = A2 & 1 && E2, W2 = !Ct(c);
      let te;
      if (W2 && (te = w2 && w2.onVnodeBeforeUnmount) && Me(te, a, c), A2 & 6)
        Xr(c.component, h, v2);
      else {
        if (A2 & 128) {
          c.suspense.unmount(h, v2);
          return;
        }
        V2 && Ze(c, null, a, "beforeUnmount"), A2 & 64 ? c.type.remove(
          c,
          a,
          h,
          pt,
          v2
        ) : _2 && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !_2.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (m !== Le || S2 > 0 && S2 & 64) ? ht(
          _2,
          a,
          h,
          false,
          true
        ) : (m === Le && S2 & 384 || !g2 && A2 & 16) && ht(x2, a, h), v2 && Qn(c);
      }
      const oe = D2 != null && M2 == null;
      (W2 && (te = w2 && w2.onVnodeUnmounted) || V2 || oe) && me(() => {
        te && Me(te, a, c), V2 && Ze(c, null, a, "unmounted"), oe && (c.el = null);
      }, h);
    }, "le"), Qn = /* @__PURE__ */ __name((c) => {
      const { type: a, el: h, anchor: v2, transition: g2 } = c;
      if (a === Le) {
        Yr(h, v2);
        return;
      }
      if (a === pn) {
        B2(c);
        return;
      }
      const m = /* @__PURE__ */ __name(() => {
        r(h), g2 && !g2.persisted && g2.afterLeave && g2.afterLeave();
      }, "m");
      if (c.shapeFlag & 1 && g2 && !g2.persisted) {
        const { leave: w2, delayLeave: y2 } = g2, x2 = /* @__PURE__ */ __name(() => w2(h, m), "x");
        y2 ? y2(c.el, m, x2) : x2();
      } else
        m();
    }, "Qn"), Yr = /* @__PURE__ */ __name((c, a) => {
      let h;
      for (; c !== a; )
        h = b2(c), r(c), c = h;
      r(a);
    }, "Yr"), Xr = /* @__PURE__ */ __name((c, a, h) => {
      const { bum: v2, scope: g2, job: m, subTree: w2, um: y2, m: x2, a: _2 } = c;
      gs(x2), gs(_2), v2 && on(v2), g2.stop(), m && (m.flags |= 8, le(w2, c, a, h)), y2 && me(y2, a), me(() => {
        c.isUnmounted = true;
      }, a);
    }, "Xr"), ht = /* @__PURE__ */ __name((c, a, h, v2 = false, g2 = false, m = 0) => {
      for (let w2 = m; w2 < c.length; w2++)
        le(c[w2], a, h, v2, g2);
    }, "ht"), zt = /* @__PURE__ */ __name((c) => {
      if (c.shapeFlag & 6)
        return zt(c.component.subTree);
      if (c.shapeFlag & 128)
        return c.suspense.next();
      const a = b2(c.anchor || c.el), h = a && a[Ki];
      return h ? b2(h) : a;
    }, "zt");
    let sn = false;
    const es = /* @__PURE__ */ __name((c, a, h) => {
      let v2;
      c == null ? a._vnode && (le(a._vnode, null, null, true), v2 = a._vnode.component) : C2(
        a._vnode || null,
        c,
        a,
        null,
        null,
        null,
        h
      ), a._vnode = c, sn || (sn = true, cs(v2), gr(), sn = false);
    }, "es"), pt = {
      p: C2,
      um: le,
      m: xe,
      r: Qn,
      mt: re,
      mc: q2,
      pc: ee,
      pbc: z,
      n: zt,
      o: e
    };
    return {
      render: es,
      hydrate: void 0,
      createApp: eo(es)
    };
  }
  __name(mo, "mo");
  function hn({ type: e, props: t }, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
  }
  __name(hn, "hn");
  function Qe({ effect: e, job: t }, n) {
    n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
  }
  __name(Qe, "Qe");
  function _o(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted;
  }
  __name(_o, "_o");
  function Nr(e, t, n = false) {
    const s = e.children, r = t.children;
    if (F(s) && F(r))
      for (let i = 0; i < s.length; i++) {
        const o = s[i];
        let l = r[i];
        l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = je(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && Nr(o, l)), l.type === nn && (l.patchFlag === -1 && (l = r[i] = je(l)), l.el = o.el), l.type === he && !l.el && (l.el = o.el);
      }
  }
  __name(Nr, "Nr");
  function vo(e) {
    const t = e.slice(), n = [0];
    let s, r, i, o, l;
    const f = e.length;
    for (s = 0; s < f; s++) {
      const d = e[s];
      if (d !== 0) {
        if (r = n[n.length - 1], e[r] < d) {
          t[s] = r, n.push(s);
          continue;
        }
        for (i = 0, o = n.length - 1; i < o; )
          l = i + o >> 1, e[n[l]] < d ? i = l + 1 : o = l;
        d < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
      }
    }
    for (i = n.length, o = n[i - 1]; i-- > 0; )
      n[i] = o, o = t[o];
    return n;
  }
  __name(vo, "vo");
  function Dr(e) {
    const t = e.subTree.component;
    if (t)
      return t.asyncDep && !t.asyncResolved ? t : Dr(t);
  }
  __name(Dr, "Dr");
  function gs(e) {
    if (e)
      for (let t = 0; t < e.length; t++)
        e[t].flags |= 8;
  }
  __name(gs, "gs");
  function Hr(e) {
    if (e.placeholder)
      return e.placeholder;
    const t = e.component;
    return t ? Hr(t.subTree) : null;
  }
  __name(Hr, "Hr");
  var zr = /* @__PURE__ */ __name((e) => e.__isSuspense, "zr");
  function xo(e, t) {
    t && t.pendingBranch ? F(e) ? t.effects.push(...e) : t.effects.push(e) : Vi(e);
  }
  __name(xo, "xo");
  var Le = /* @__PURE__ */ Symbol.for("v-fgt");
  var nn = /* @__PURE__ */ Symbol.for("v-txt");
  var he = /* @__PURE__ */ Symbol.for("v-cmt");
  var pn = /* @__PURE__ */ Symbol.for("v-stc");
  var At = [];
  var _e = null;
  function Mt(e = false) {
    At.push(_e = e ? null : []);
  }
  __name(Mt, "Mt");
  function bo() {
    At.pop(), _e = At[At.length - 1] || null;
  }
  __name(bo, "bo");
  var $t = 1;
  function Yt(e, t = false) {
    $t += e, e < 0 && _e && t && (_e.hasOnce = true);
  }
  __name(Yt, "Yt");
  function Br(e) {
    return e.dynamicChildren = $t > 0 ? _e || ut : null, bo(), $t > 0 && _e && _e.push(e), e;
  }
  __name(Br, "Br");
  function An(e, t, n, s, r, i) {
    return Br(
      Be(
        e,
        t,
        n,
        s,
        r,
        i,
        true
      )
    );
  }
  __name(An, "An");
  function jr(e, t, n, s, r) {
    return Br(
      pe(
        e,
        t,
        n,
        s,
        r,
        true
      )
    );
  }
  __name(jr, "jr");
  function Xt(e) {
    return e ? e.__v_isVNode === true : false;
  }
  __name(Xt, "Xt");
  function nt(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  __name(nt, "nt");
  var Vr = /* @__PURE__ */ __name(({ key: e }) => e ?? null, "Vr");
  var Kt = /* @__PURE__ */ __name(({
    ref: e,
    ref_key: t,
    ref_for: n
  }) => (typeof e == "number" && (e = "" + e), e != null ? ne(e) || /* @__PURE__ */ ye(e) || k(e) ? { i: Fe, r: e, k: t, f: !!n } : e : null), "Kt");
  function Be(e, t = null, n = null, s = 0, r = null, i = e === Le ? 0 : 1, o = false, l = false) {
    const f = {
      __v_isVNode: true,
      __v_skip: true,
      type: e,
      props: t,
      key: t && Vr(t),
      ref: t && Kt(t),
      scopeId: _r,
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
      ctx: Fe
    };
    return l ? (qn(f, n), i & 128 && e.normalize(f)) : n && (f.shapeFlag |= ne(n) ? 8 : 16), $t > 0 && // avoid a block node from tracking itself
    !o && // has current parent block
    _e && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (f.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    f.patchFlag !== 32 && _e.push(f), f;
  }
  __name(Be, "Be");
  var pe = yo;
  function yo(e, t = null, n = null, s = 0, r = null, i = false) {
    if ((!e || e === Ji) && (e = he), Xt(e)) {
      const l = Ge(
        e,
        t,
        true
        /* mergeRef: true */
      );
      return n && qn(l, n), $t > 0 && !i && _e && (l.shapeFlag & 6 ? _e[_e.indexOf(e)] = l : _e.push(l)), l.patchFlag = -2, l;
    }
    if (Oo(e) && (e = e.__vccOpts), t) {
      t = wo(t);
      let { class: l, style: f } = t;
      l && !ne(l) && (t.class = st(l)), Y(f) && (/* @__PURE__ */ Wn(f) && !F(f) && (f = we({}, f)), t.style = Rt(f));
    }
    const o = ne(e) ? 1 : zr(e) ? 128 : xr(e) ? 64 : Y(e) ? 4 : k(e) ? 2 : 0;
    return Be(
      e,
      t,
      n,
      s,
      r,
      o,
      i,
      true
    );
  }
  __name(yo, "yo");
  function wo(e) {
    return e ? /* @__PURE__ */ Wn(e) || Ir(e) ? we({}, e) : e : null;
  }
  __name(wo, "wo");
  function Ge(e, t, n = false, s = false) {
    const { props: r, ref: i, patchFlag: o, children: l, transition: f } = e, d = t ? To(r || {}, t) : r, u = {
      __v_isVNode: true,
      __v_skip: true,
      type: e.type,
      props: d,
      key: d && Vr(d),
      ref: t && t.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        n && i ? F(i) ? i.concat(Kt(t)) : [i, Kt(t)] : Kt(t)
      ) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: t && e.type !== Le ? o === -1 ? 16 : o | 16 : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: f,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Ge(e.ssContent),
      ssFallback: e.ssFallback && Ge(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    };
    return f && s && Ft(
      u,
      f.clone(u)
    ), u;
  }
  __name(Ge, "Ge");
  function So(e = " ", t = 0) {
    return pe(nn, null, e, t);
  }
  __name(So, "So");
  function Mn(e = "", t = false) {
    return t ? (Mt(), jr(he, null, e)) : pe(he, null, e);
  }
  __name(Mn, "Mn");
  function Oe(e) {
    return e == null || typeof e == "boolean" ? pe(he) : F(e) ? pe(
      Le,
      null,
      // #3666, avoid reference pollution when reusing vnode
      e.slice()
    ) : Xt(e) ? je(e) : pe(nn, null, String(e));
  }
  __name(Oe, "Oe");
  function je(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ge(e);
  }
  __name(je, "je");
  function qn(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t == null)
      t = null;
    else if (F(t))
      n = 16;
    else if (typeof t == "object")
      if (s & 65) {
        const r = t.default;
        r && (r._c && (r._d = false), qn(e, r()), r._c && (r._d = true));
        return;
      } else {
        n = 32;
        const r = t._;
        !r && !Ir(t) ? t._ctx = Fe : r === 3 && Fe && (Fe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
      }
    else k(t) ? (t = { default: t, _ctx: Fe }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [So(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n;
  }
  __name(qn, "qn");
  function To(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      for (const r in s)
        if (r === "class")
          t.class !== s.class && (t.class = st([t.class, s.class]));
        else if (r === "style")
          t.style = Rt([t.style, s.style]);
        else if (Gt(r)) {
          const i = t[r], o = s[r];
          o && i !== o && !(F(i) && i.includes(o)) ? t[r] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
          // the model listener.
          !Jt(r) && (t[r] = o);
        } else r !== "" && (t[r] = s[r]);
    }
    return t;
  }
  __name(To, "To");
  function Me(e, t, n, s = null) {
    We(e, t, 7, [
      n,
      s
    ]);
  }
  __name(Me, "Me");
  var Co = Ar();
  var Eo = 0;
  function Ao(e, t, n) {
    const s = e.type, r = (t ? t.appContext : e.appContext) || Co, i = {
      uid: Eo++,
      vnode: e,
      type: s,
      parent: t,
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
      scope: new ui(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: ao(s, r),
      emitsOptions: so(s, r),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: Z,
      // inheritAttrs
      inheritAttrs: s.inheritAttrs,
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
    return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = no.bind(null, i), e.ce && e.ce(i), i;
  }
  __name(Ao, "Ao");
  var lt = null;
  var Mo = /* @__PURE__ */ __name(() => lt || Fe, "Mo");
  var qt;
  var Rn;
  {
    const e = Qt(), t = /* @__PURE__ */ __name((n, s) => {
      let r;
      return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
        r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
      };
    }, "t");
    qt = t(
      "__VUE_INSTANCE_SETTERS__",
      (n) => lt = n
    ), Rn = t(
      "__VUE_SSR_SETTERS__",
      (n) => Jn = n
    );
  }
  var Gn = /* @__PURE__ */ __name((e) => {
    const t = lt;
    return qt(e), e.scope.on(), () => {
      e.scope.off(), qt(t);
    };
  }, "Gn");
  var ms = /* @__PURE__ */ __name(() => {
    lt && lt.scope.off(), qt(null);
  }, "ms");
  function Kr(e) {
    return e.vnode.shapeFlag & 4;
  }
  __name(Kr, "Kr");
  var Jn = false;
  function Ro(e, t = false, n = false) {
    t && Rn(t);
    const { props: s, children: r } = e.vnode, i = Kr(e);
    co(e, s, i, t), ho(e, r, n || t);
    const o = i ? Po(e, t) : void 0;
    return t && Rn(false), o;
  }
  __name(Ro, "Ro");
  function Po(e, t) {
    const n = e.type;
    e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Zi);
    const { setup: s } = n;
    if (s) {
      it();
      const r = e.setupContext = s.length > 1 ? Lo(e) : null, i = Gn(e), o = Ht(
        s,
        e,
        0,
        [
          e.props,
          r
        ]
      ), l = Ws(o);
      if (ot(), i(), (l || e.sp) && !Ct(e) && Yi(e), l) {
        if (o.then(ms, ms), t)
          return o.then((f) => {
            _s(e, f);
          }).catch((f) => {
            en(f, e, 0);
          });
        e.asyncDep = o;
      } else
        _s(e, o);
    } else
      Wr(e);
  }
  __name(Po, "Po");
  function _s(e, t, n) {
    k(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Y(t) && (e.setupState = ur(t)), Wr(e);
  }
  __name(_s, "_s");
  function Wr(e, t, n) {
    const s = e.type;
    e.render || (e.render = s.render || Ln);
  }
  __name(Wr, "Wr");
  var Io = {
    get(e, t) {
      return fe(e, "get", ""), e[t];
    }
  };
  function Lo(e) {
    const t = /* @__PURE__ */ __name((n) => {
      e.exposed = n || {};
    }, "t");
    return {
      attrs: new Proxy(e.attrs, Io),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
  }
  __name(Lo, "Lo");
  function Zn(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ur(Li(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Et)
          return Et[n](e);
      },
      has(t, n) {
        return n in t || n in Et;
      }
    })) : e.proxy;
  }
  __name(Zn, "Zn");
  function Oo(e) {
    return k(e) && "__vccOpts" in e;
  }
  __name(Oo, "Oo");
  var J = /* @__PURE__ */ __name((e, t) => /* @__PURE__ */ Hi(e, t, Jn), "J");
  function Fo(e, t, n) {
    try {
      Yt(-1);
      const s = arguments.length;
      return s === 2 ? Y(t) && !F(t) ? Xt(t) ? pe(e, null, [t]) : pe(e, t) : pe(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Xt(n) && (n = [n]), pe(e, t, n));
    } finally {
      Yt(1);
    }
  }
  __name(Fo, "Fo");
  var $o = "3.5.34";
  var Pn;
  var vs = typeof window < "u" && window.trustedTypes;
  if (vs)
    try {
      Pn = /* @__PURE__ */ vs.createPolicy("vue", {
        createHTML: /* @__PURE__ */ __name((e) => e, "createHTML")
      });
    } catch {
    }
  var Ur = Pn ? (e) => Pn.createHTML(e) : (e) => e;
  var No = "http://www.w3.org/2000/svg";
  var Do = "http://www.w3.org/1998/Math/MathML";
  var ze = typeof document < "u" ? document : null;
  var xs = ze && /* @__PURE__ */ ze.createElement("template");
  var Ho = {
    insert: /* @__PURE__ */ __name((e, t, n) => {
      t.insertBefore(e, n || null);
    }, "insert"),
    remove: /* @__PURE__ */ __name((e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    }, "remove"),
    createElement: /* @__PURE__ */ __name((e, t, n, s) => {
      const r = t === "svg" ? ze.createElementNS(No, e) : t === "mathml" ? ze.createElementNS(Do, e) : n ? ze.createElement(e, { is: n }) : ze.createElement(e);
      return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
    }, "createElement"),
    createText: /* @__PURE__ */ __name((e) => ze.createTextNode(e), "createText"),
    createComment: /* @__PURE__ */ __name((e) => ze.createComment(e), "createComment"),
    setText: /* @__PURE__ */ __name((e, t) => {
      e.nodeValue = t;
    }, "setText"),
    setElementText: /* @__PURE__ */ __name((e, t) => {
      e.textContent = t;
    }, "setElementText"),
    parentNode: /* @__PURE__ */ __name((e) => e.parentNode, "parentNode"),
    nextSibling: /* @__PURE__ */ __name((e) => e.nextSibling, "nextSibling"),
    querySelector: /* @__PURE__ */ __name((e) => ze.querySelector(e), "querySelector"),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild;
      if (r && (r === i || r.nextSibling))
        for (; t.insertBefore(r.cloneNode(true), n), !(r === i || !(r = r.nextSibling)); )
          ;
      else {
        xs.innerHTML = Ur(
          s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
        );
        const l = xs.content;
        if (s === "svg" || s === "mathml") {
          const f = l.firstChild;
          for (; f.firstChild; )
            l.appendChild(f.firstChild);
          l.removeChild(f);
        }
        t.insertBefore(l, n);
      }
      return [
        // first
        o ? o.nextSibling : t.firstChild,
        // last
        n ? n.previousSibling : t.lastChild
      ];
    }
  };
  var Ue = "transition";
  var vt = "animation";
  var Nt = /* @__PURE__ */ Symbol("_vtc");
  var kr = {
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
  var zo = /* @__PURE__ */ we(
    {},
    br,
    kr
  );
  var Bo = /* @__PURE__ */ __name((e) => (e.displayName = "Transition", e.props = zo, e), "Bo");
  var jo = /* @__PURE__ */ Bo(
    (e, { slots: t }) => Fo(ki, Vo(e), t)
  );
  var et = /* @__PURE__ */ __name((e, t = []) => {
    F(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  }, "et");
  var bs = /* @__PURE__ */ __name((e) => e ? F(e) ? e.some((t) => t.length > 1) : e.length > 1 : false, "bs");
  function Vo(e) {
    const t = {};
    for (const T2 in e)
      T2 in kr || (t[T2] = e[T2]);
    if (e.css === false)
      return t;
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
      leaveActiveClass: b2 = `${n}-leave-active`,
      leaveToClass: R2 = `${n}-leave-to`
    } = e, $2 = Ko(r), C2 = $2 && $2[0], L2 = $2 && $2[1], {
      onBeforeEnter: O2,
      onEnter: I2,
      onEnterCancelled: N2,
      onLeave: B2,
      onLeaveCancelled: Q2,
      onBeforeAppear: se = O2,
      onAppear: ae = I2,
      onAppearCancelled: q2 = N2
    } = t, P2 = /* @__PURE__ */ __name((T2, X2, re, ve) => {
      T2._enterCancelled = ve, tt(T2, X2 ? u : l), tt(T2, X2 ? d : o), re && re();
    }, "P"), z = /* @__PURE__ */ __name((T2, X2) => {
      T2._isLeaving = false, tt(T2, p), tt(T2, R2), tt(T2, b2), X2 && X2();
    }, "z"), j2 = /* @__PURE__ */ __name((T2) => (X2, re) => {
      const ve = T2 ? ae : I2, Je = /* @__PURE__ */ __name(() => P2(X2, T2, re), "Je");
      et(ve, [X2, Je]), ys(() => {
        tt(X2, T2 ? f : i), He(X2, T2 ? u : l), bs(ve) || ws(X2, s, C2, Je);
      });
    }, "j");
    return we(t, {
      onBeforeEnter(T2) {
        et(O2, [T2]), He(T2, i), He(T2, o);
      },
      onBeforeAppear(T2) {
        et(se, [T2]), He(T2, f), He(T2, d);
      },
      onEnter: j2(false),
      onAppear: j2(true),
      onLeave(T2, X2) {
        T2._isLeaving = true;
        const re = /* @__PURE__ */ __name(() => z(T2, X2), "re");
        He(T2, p), T2._enterCancelled ? (He(T2, b2), Cs(T2)) : (Cs(T2), He(T2, b2)), ys(() => {
          T2._isLeaving && (tt(T2, p), He(T2, R2), bs(B2) || ws(T2, s, L2, re));
        }), et(B2, [T2, re]);
      },
      onEnterCancelled(T2) {
        P2(T2, false, void 0, true), et(N2, [T2]);
      },
      onAppearCancelled(T2) {
        P2(T2, true, void 0, true), et(q2, [T2]);
      },
      onLeaveCancelled(T2) {
        z(T2), et(Q2, [T2]);
      }
    });
  }
  __name(Vo, "Vo");
  function Ko(e) {
    if (e == null)
      return null;
    if (Y(e))
      return [gn(e.enter), gn(e.leave)];
    {
      const t = gn(e);
      return [t, t];
    }
  }
  __name(Ko, "Ko");
  function gn(e) {
    return si(e);
  }
  __name(gn, "gn");
  function He(e, t) {
    t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Nt] || (e[Nt] = /* @__PURE__ */ new Set())).add(t);
  }
  __name(He, "He");
  function tt(e, t) {
    t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
    const n = e[Nt];
    n && (n.delete(t), n.size || (e[Nt] = void 0));
  }
  __name(tt, "tt");
  function ys(e) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    });
  }
  __name(ys, "ys");
  var Wo = 0;
  function ws(e, t, n, s) {
    const r = e._endId = ++Wo, i = /* @__PURE__ */ __name(() => {
      r === e._endId && s();
    }, "i");
    if (n != null)
      return setTimeout(i, n);
    const { type: o, timeout: l, propCount: f } = Uo(e, t);
    if (!o)
      return s();
    const d = o + "end";
    let u = 0;
    const p = /* @__PURE__ */ __name(() => {
      e.removeEventListener(d, b2), i();
    }, "p"), b2 = /* @__PURE__ */ __name((R2) => {
      R2.target === e && ++u >= f && p();
    }, "b");
    setTimeout(() => {
      u < f && p();
    }, l + 1), e.addEventListener(d, b2);
  }
  __name(ws, "ws");
  function Uo(e, t) {
    const n = window.getComputedStyle(e), s = /* @__PURE__ */ __name(($2) => (n[$2] || "").split(", "), "s"), r = s(`${Ue}Delay`), i = s(`${Ue}Duration`), o = Ss(r, i), l = s(`${vt}Delay`), f = s(`${vt}Duration`), d = Ss(l, f);
    let u = null, p = 0, b2 = 0;
    t === Ue ? o > 0 && (u = Ue, p = o, b2 = i.length) : t === vt ? d > 0 && (u = vt, p = d, b2 = f.length) : (p = Math.max(o, d), u = p > 0 ? o > d ? Ue : vt : null, b2 = u ? u === Ue ? i.length : f.length : 0);
    const R2 = u === Ue && /\b(?:transform|all)(?:,|$)/.test(
      s(`${Ue}Property`).toString()
    );
    return {
      type: u,
      timeout: p,
      propCount: b2,
      hasTransform: R2
    };
  }
  __name(Uo, "Uo");
  function Ss(e, t) {
    for (; e.length < t.length; )
      e = e.concat(e);
    return Math.max(...t.map((n, s) => Ts(n) + Ts(e[s])));
  }
  __name(Ss, "Ss");
  function Ts(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
  }
  __name(Ts, "Ts");
  function Cs(e) {
    return (e ? e.ownerDocument : document).body.offsetHeight;
  }
  __name(Cs, "Cs");
  function ko(e, t, n) {
    const s = e[Nt];
    s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
  }
  __name(ko, "ko");
  var Es = /* @__PURE__ */ Symbol("_vod");
  var Yo = /* @__PURE__ */ Symbol("_vsh");
  var Xo = /* @__PURE__ */ Symbol("");
  var qo = /(?:^|;)\s*display\s*:/;
  function Go(e, t, n) {
    const s = e.style, r = ne(n);
    let i = false;
    if (n && !r) {
      if (t)
        if (ne(t))
          for (const o of t.split(";")) {
            const l = o.slice(0, o.indexOf(":")).trim();
            n[l] == null && xt(s, l, "");
          }
        else
          for (const o in t)
            n[o] == null && xt(s, o, "");
      for (const o in n) {
        o === "display" && (i = true);
        const l = n[o];
        l != null ? Zo(
          e,
          o,
          !ne(t) && t ? t[o] : void 0,
          l
        ) || xt(s, o, l) : xt(s, o, "");
      }
    } else if (r) {
      if (t !== n) {
        const o = s[Xo];
        o && (n += ";" + o), s.cssText = n, i = qo.test(n);
      }
    } else t && e.removeAttribute("style");
    Es in e && (e[Es] = i ? s.display : "", e[Yo] && (s.display = "none"));
  }
  __name(Go, "Go");
  var As = /\s*!important$/;
  function xt(e, t, n) {
    if (F(n))
      n.forEach((s) => xt(e, t, s));
    else if (n == null && (n = ""), t.startsWith("--"))
      e.setProperty(t, n);
    else {
      const s = Jo(e, t);
      As.test(n) ? e.setProperty(
        ct(s),
        n.replace(As, ""),
        "important"
      ) : e[s] = n;
    }
  }
  __name(xt, "xt");
  var Ms = ["Webkit", "Moz", "ms"];
  var mn = {};
  function Jo(e, t) {
    const n = mn[t];
    if (n)
      return n;
    let s = Se(t);
    if (s !== "filter" && s in e)
      return mn[t] = s;
    s = ks(s);
    for (let r = 0; r < Ms.length; r++) {
      const i = Ms[r] + s;
      if (i in e)
        return mn[t] = i;
    }
    return t;
  }
  __name(Jo, "Jo");
  function Zo(e, t, n, s) {
    return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ne(s) && n === s;
  }
  __name(Zo, "Zo");
  var Rs = "http://www.w3.org/1999/xlink";
  function Ps(e, t, n, s, r, i = fi(t)) {
    s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Rs, t.slice(6, t.length)) : e.setAttributeNS(Rs, t, n) : n == null || i && !Xs(n) ? e.removeAttribute(t) : e.setAttribute(
      t,
      i ? "" : $e(n) ? String(n) : n
    );
  }
  __name(Ps, "Ps");
  function Is(e, t, n, s, r) {
    if (t === "innerHTML" || t === "textContent") {
      n != null && (e[t] = t === "innerHTML" ? Ur(n) : n);
      return;
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
    !i.includes("-")) {
      const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, f = n == null ? (
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        e.type === "checkbox" ? "on" : ""
      ) : String(n);
      (l !== f || !("_value" in e)) && (e.value = f), n == null && e.removeAttribute(t), e._value = n;
      return;
    }
    let o = false;
    if (n === "" || n == null) {
      const l = typeof e[t];
      l === "boolean" ? n = Xs(n) : n == null && l === "string" ? (n = "", o = true) : l === "number" && (n = 0, o = true);
    }
    try {
      e[t] = n;
    } catch {
    }
    o && e.removeAttribute(r || t);
  }
  __name(Is, "Is");
  function Qo(e, t, n, s) {
    e.addEventListener(t, n, s);
  }
  __name(Qo, "Qo");
  function el(e, t, n, s) {
    e.removeEventListener(t, n, s);
  }
  __name(el, "el");
  var Ls = /* @__PURE__ */ Symbol("_vei");
  function tl(e, t, n, s, r = null) {
    const i = e[Ls] || (e[Ls] = {}), o = i[t];
    if (s && o)
      o.value = s;
    else {
      const [l, f] = nl(t);
      if (s) {
        const d = i[t] = il(
          s,
          r
        );
        Qo(e, l, d, f);
      } else o && (el(e, l, o, f), i[t] = void 0);
    }
  }
  __name(tl, "tl");
  var Os = /(?:Once|Passive|Capture)$/;
  function nl(e) {
    let t;
    if (Os.test(e)) {
      t = {};
      let s;
      for (; s = e.match(Os); )
        e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = true;
    }
    return [e[2] === ":" ? e.slice(3) : ct(e.slice(2)), t];
  }
  __name(nl, "nl");
  var _n = 0;
  var sl = /* @__PURE__ */ Promise.resolve();
  var rl = /* @__PURE__ */ __name(() => _n || (sl.then(() => _n = 0), _n = Date.now()), "rl");
  function il(e, t) {
    const n = /* @__PURE__ */ __name((s) => {
      if (!s._vts)
        s._vts = Date.now();
      else if (s._vts <= n.attached)
        return;
      We(
        ol(s, n.value),
        t,
        5,
        [s]
      );
    }, "n");
    return n.value = e, n.attached = rl(), n;
  }
  __name(il, "il");
  function ol(e, t) {
    if (F(t)) {
      const n = e.stopImmediatePropagation;
      return e.stopImmediatePropagation = () => {
        n.call(e), e._stopped = true;
      }, t.map(
        (s) => (r) => !r._stopped && s && s(r)
      );
    } else
      return t;
  }
  __name(ol, "ol");
  var Fs = /* @__PURE__ */ __name((e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
  e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, "Fs");
  var ll = /* @__PURE__ */ __name((e, t, n, s, r, i) => {
    const o = r === "svg";
    t === "class" ? ko(e, s, o) : t === "style" ? Go(e, n, s) : Gt(t) ? Jt(t) || tl(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : cl(e, t, s, o)) ? (Is(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ps(e, t, s, o, i, t !== "value")) : (
      /* #11081 force set props for possible async custom element */
      e._isVueCE && // #12408 check if it's declared prop or it's async custom element
      (fl(e, t) || // @ts-expect-error _def is private
      e._def.__asyncLoader && (/[A-Z]/.test(t) || !ne(s))) ? Is(e, Se(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ps(e, t, s, o))
    );
  }, "ll");
  function cl(e, t, n, s) {
    if (s)
      return !!(t === "innerHTML" || t === "textContent" || t in e && Fs(t) && k(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
      return false;
    if (t === "width" || t === "height") {
      const r = e.tagName;
      if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
        return false;
    }
    return Fs(t) && ne(n) ? false : t in e;
  }
  __name(cl, "cl");
  function fl(e, t) {
    const n = (
      // @ts-expect-error _def is private
      e._def.props
    );
    if (!n)
      return false;
    const s = Se(t);
    return Array.isArray(n) ? n.some((r) => Se(r) === s) : Object.keys(n).some((r) => Se(r) === s);
  }
  __name(fl, "fl");
  var al = ["ctrl", "shift", "alt", "meta"];
  var ul = {
    stop: /* @__PURE__ */ __name((e) => e.stopPropagation(), "stop"),
    prevent: /* @__PURE__ */ __name((e) => e.preventDefault(), "prevent"),
    self: /* @__PURE__ */ __name((e) => e.target !== e.currentTarget, "self"),
    ctrl: /* @__PURE__ */ __name((e) => !e.ctrlKey, "ctrl"),
    shift: /* @__PURE__ */ __name((e) => !e.shiftKey, "shift"),
    alt: /* @__PURE__ */ __name((e) => !e.altKey, "alt"),
    meta: /* @__PURE__ */ __name((e) => !e.metaKey, "meta"),
    left: /* @__PURE__ */ __name((e) => "button" in e && e.button !== 0, "left"),
    middle: /* @__PURE__ */ __name((e) => "button" in e && e.button !== 1, "middle"),
    right: /* @__PURE__ */ __name((e) => "button" in e && e.button !== 2, "right"),
    exact: /* @__PURE__ */ __name((e, t) => al.some((n) => e[`${n}Key`] && !t.includes(n)), "exact")
  };
  var $s = /* @__PURE__ */ __name((e, t) => {
    if (!e) return e;
    const n = e._withMods || (e._withMods = {}), s = t.join(".");
    return n[s] || (n[s] = ((r, ...i) => {
      for (let o = 0; o < t.length; o++) {
        const l = ul[t[o]];
        if (l && l(r, t)) return;
      }
      return e(r, ...i);
    }));
  }, "$s");
  var dl = /* @__PURE__ */ we({ patchProp: ll }, Ho);
  var Ns;
  function hl() {
    return Ns || (Ns = go(dl));
  }
  __name(hl, "hl");
  var Ds = /* @__PURE__ */ __name(((...e) => {
    const t = hl().createApp(...e), { mount: n } = t;
    return t.mount = (s) => {
      const r = gl(s);
      if (!r) return;
      const i = t._component;
      !k(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
      const o = n(r, false, pl(r));
      return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
    }, t;
  }), "Ds");
  function pl(e) {
    if (e instanceof SVGElement)
      return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement)
      return "mathml";
  }
  __name(pl, "pl");
  function gl(e) {
    return ne(e) ? document.querySelector(e) : e;
  }
  __name(gl, "gl");
  var ml = ["width", "height", "viewBox"];
  var _l = ["d", "stroke-width"];
  var vl = /* @__PURE__ */ Cr({
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
    setup(e) {
      const t = e, n = J(() => t.borderRadius ?? 12), s = J(() => t.gap ?? 8), r = J(() => t.strokeDefault ?? 4), i = J(() => t.strokeNear ?? 8), o = J(() => t.extend ?? 12), l = J(() => t.near ? i.value : r.value), f = J(() => n.value + s.value + l.value / 2), d = J(() => t.panelWidth - n.value), u = J(() => t.panelHeight - n.value), p = J(() => t.panelHeight + s.value + l.value / 2), b2 = J(() => t.panelWidth + s.value + l.value / 2), R2 = J(() => d.value - o.value - l.value / 2), $2 = J(() => u.value - o.value - l.value / 2), C2 = J(() => {
        const I2 = b2.value + l.value / 2, N2 = p.value + l.value / 2;
        return Math.max(I2 - R2.value, N2 - $2.value);
      }), L2 = /* @__PURE__ */ __name((I2, N2) => ({
        x: I2 - R2.value,
        y: N2 - $2.value
      }), "L"), O2 = J(() => {
        const I2 = o.value, N2 = f.value, B2 = d.value, Q2 = u.value, se = p.value, ae = b2.value, q2 = L2(B2 - I2, se), P2 = L2(B2, se), z = L2(ae, Q2), j2 = L2(ae, Q2 - I2);
        return [
          `M ${q2.x},${q2.y}`,
          `L ${P2.x},${P2.y}`,
          `A ${N2},${N2} 0 0,0 ${z.x},${z.y}`,
          `L ${j2.x},${j2.y}`
        ].join(" ");
      });
      return (I2, N2) => (Mt(), An("svg", {
        class: "xlxz-float-panel__resize-svg",
        width: C2.value,
        height: C2.value,
        viewBox: `0 0 ${C2.value} ${C2.value}`,
        style: { overflow: "visible" }
      }, [
        Be("path", {
          class: st(["resize-arc", { "resize-arc--near": e.near }]),
          d: O2.value,
          "stroke-width": l.value
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
  var vn = 80;
  var Hs = 12;
  var zs = 8;
  var Bs = 12;
  var Vt = 8;
  var js = /* @__PURE__ */ Cr({
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
    setup(e) {
      const t = e, n = /* @__PURE__ */ De(), s = /* @__PURE__ */ De(), r = /* @__PURE__ */ De(), i = /* @__PURE__ */ De(), o = /* @__PURE__ */ De(false), l = /* @__PURE__ */ De(false), f = /* @__PURE__ */ De(false), d = /* @__PURE__ */ De(false), u = /* @__PURE__ */ De(false);
      let p = 0, b2 = 0, R2 = 0, $2 = 0, C2 = 0, L2 = 0, O2 = 0, I2 = 0;
      const N2 = J(() => t.minWidth ?? 200), B2 = J(() => t.minHeight ?? 120), Q2 = J(() => t.maxWidth ?? window.innerWidth - 32), se = J(() => t.maxHeight ?? window.innerHeight - 32), ae = J(() => ({
        left: `${t.state.x}px`,
        top: `${t.state.y}px`,
        width: `${t.state.width}px`,
        height: `${t.state.height}px`
      })), q2 = J(() => {
        const G2 = zs + Vt, ee = zs + Vt, ue = Hs + Bs + Vt / 2, ie = Hs + Bs + Vt / 2, xe = ue + G2, le = ie + ee;
        return {
          position: "absolute",
          right: `-${G2}px`,
          bottom: `-${ee}px`,
          width: `${xe}px`,
          height: `${le}px`,
          pointerEvents: "none",
          cursor: "nwse-resize"
        };
      });
      function P2(G2) {
        if (o.value || l.value) return;
        const ee = G2.clientX, ue = G2.clientY;
        if (s.value) {
          const ie = s.value.getBoundingClientRect(), xe = ie.left + ie.width / 2, le = ie.top + ie.height / 2;
          f.value = Math.hypot(ee - xe, ue - le) < vn;
        }
        if (r.value) {
          const ie = r.value.getBoundingClientRect(), xe = ie.top + ie.height / 2, le = ee >= ie.left - 30 && ee <= ie.right + 30;
          d.value = le && Math.abs(ue - xe) < vn;
        }
        if (n.value) {
          const ie = n.value.getBoundingClientRect(), xe = ie.right, le = ie.bottom;
          u.value = Math.hypot(ee - xe, ue - le) < vn;
        }
      }
      __name(P2, "P");
      function z(G2) {
        o.value = true, p = G2.clientX, b2 = G2.clientY, R2 = t.state.x, $2 = t.state.y, document.addEventListener("mousemove", j2), document.addEventListener("mouseup", T2);
      }
      __name(z, "z");
      function j2(G2) {
        let ee = R2 + (G2.clientX - p), ue = $2 + (G2.clientY - b2);
        ee = Math.max(0, Math.min(ee, window.innerWidth - t.state.width)), ue = Math.max(0, Math.min(ue, window.innerHeight - t.state.height - 40)), t.state.x = ee, t.state.y = ue;
      }
      __name(j2, "j");
      function T2() {
        o.value = false, document.removeEventListener("mousemove", j2), document.removeEventListener("mouseup", T2);
      }
      __name(T2, "T");
      function X2(G2) {
        l.value = true, C2 = G2.clientX, L2 = G2.clientY, O2 = t.state.width, I2 = t.state.height, document.addEventListener("mousemove", re), document.addEventListener("mouseup", ve);
      }
      __name(X2, "X");
      function re(G2) {
        let ee = O2 + (G2.clientX - C2), ue = I2 + (G2.clientY - L2);
        ee = Math.max(N2.value, Math.min(ee, Q2.value)), ue = Math.max(B2.value, Math.min(ue, se.value)), t.state.width = ee, t.state.height = ue;
      }
      __name(re, "re");
      function ve() {
        l.value = false, document.removeEventListener("mousemove", re), document.removeEventListener("mouseup", ve);
      }
      __name(ve, "ve");
      function Je() {
        t.onClose();
      }
      __name(Je, "Je");
      return Er(() => {
        document.addEventListener("mousemove", P2);
      }), Gi(() => {
        document.removeEventListener("mousemove", P2), document.removeEventListener("mousemove", j2), document.removeEventListener("mouseup", T2), document.removeEventListener("mousemove", re), document.removeEventListener("mouseup", ve);
      }), (G2, ee) => (Mt(), jr(jo, { name: "xlxz-float-panel-anim" }, {
        default: vr(() => [
          e.state.visible ? (Mt(), An("div", {
            key: 0,
            class: "xlxz-float-panel-wrapper",
            style: Rt(ae.value),
            ref_key: "wrapperEl",
            ref: n
          }, [
            Be("div", {
              class: st(["xlxz-float-panel", { "xlxz-float-panel--dragging": o.value }])
            }, [
              e.title ? (Mt(), An("h3", xl, Gs(e.title), 1)) : Mn("", true),
              Be("div", bl, [
                Be("div", { innerHTML: e.content }, null, 8, yl)
              ])
            ], 2),
            Be("button", {
              class: st(["xlxz-float-panel__close", { "xlxz-float-panel__close--near": f.value }]),
              onClick: Je,
              ref_key: "closeEl",
              ref: s
            }, null, 2),
            Be("div", {
              class: st(["xlxz-float-panel__drag-bar", {
                "xlxz-float-panel__drag-bar--near": d.value,
                "xlxz-float-panel__drag-bar--dragging": o.value
              }]),
              onMousedown: $s(z, ["prevent"]),
              ref_key: "dragBarEl",
              ref: r
            }, null, 34),
            Be("div", {
              class: "xlxz-float-panel__resize",
              style: Rt(q2.value),
              onMousedown: $s(X2, ["prevent"]),
              ref_key: "resizeEl",
              ref: i
            }, [
              pe(vl, {
                "panel-width": e.state.width,
                "panel-height": e.state.height,
                near: u.value
              }, null, 8, ["panel-width", "panel-height", "near"])
            ], 36)
          ], 4)) : Mn("", true)
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
  var Vs = false;
  function Cl(e) {
    const {
      title: t,
      content: n = "",
      width: s = 360,
      height: r = 280,
      position: i,
      minWidth: o = 200,
      minHeight: l = 120,
      maxWidth: f,
      maxHeight: d,
      minimizable: u = false,
      onClose: p,
      onMinimize: b2
    } = e;
    if (!Vs) {
      const q2 = document.createElement("style");
      q2.textContent = wl + `
` + Sl, document.head.appendChild(q2), Vs = true;
    }
    const R2 = (i == null ? void 0 : i.x) ?? Math.max(0, (window.innerWidth - s) / 2), $2 = (i == null ? void 0 : i.y) ?? Math.max(0, (window.innerHeight - r) / 3), C2 = /* @__PURE__ */ jn({
      visible: false,
      x: R2,
      y: $2,
      width: s,
      height: r
    });
    let L2 = null, O2 = null;
    function I2() {
      L2 || (L2 = document.createElement("div"), L2.className = "xlxz-root", document.body.appendChild(L2), O2 = Ds(js, {
        title: t,
        content: n,
        state: C2,
        minWidth: o,
        minHeight: l,
        maxWidth: f,
        maxHeight: d,
        minimizable: u,
        onClose: /* @__PURE__ */ __name(() => {
          C2.visible = false, p == null || p();
        }, "onClose"),
        onMinimize: /* @__PURE__ */ __name(() => {
          b2 == null || b2();
        }, "onMinimize")
      }), O2.mount(L2));
    }
    __name(I2, "I");
    function N2() {
      C2.visible = true, L2 || I2();
    }
    __name(N2, "N");
    function B2() {
      C2.visible = false;
    }
    __name(B2, "B");
    function Q2() {
      C2.visible ? B2() : N2();
    }
    __name(Q2, "Q");
    function se(q2) {
      O2 && L2 && (O2.unmount(), O2 = Ds(js, {
        title: t,
        content: q2,
        state: C2,
        minWidth: o,
        minHeight: l,
        maxWidth: f,
        maxHeight: d,
        minimizable: u,
        onClose: /* @__PURE__ */ __name(() => {
          C2.visible = false, p == null || p();
        }, "onClose"),
        onMinimize: /* @__PURE__ */ __name(() => {
          b2 == null || b2();
        }, "onMinimize")
      }), O2.mount(L2));
    }
    __name(se, "se");
    function ae() {
      O2 == null || O2.unmount(), L2 == null || L2.remove(), L2 = null, O2 = null;
    }
    __name(ae, "ae");
    return I2(), { show: N2, hide: B2, toggle: Q2, destroy: ae, setContent: se, state: C2 };
  }
  __name(Cl, "Cl");

  // packages/components/dist/animated-slider.js
  var E = String.raw;
  var V = (() => {
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
  var W = E`:host{display:inline-block;direction:ltr;white-space:nowrap;line-height:1}span{display:inline-block}:host([data-will-change]) span{will-change:transform}.number,.digit{padding:${w} 0}.symbol{white-space:pre}`;
  var D = /* @__PURE__ */ __name((s = "") => E`:where(number-flow${s}){line-height:1}number-flow${s} > span{font-kerning:none;display:inline-block;padding:${g} 0}`, "D");
  var v = /* @__PURE__ */ __name((s, t, e) => {
    const i = document.createElement(s), [n, a] = Array.isArray(t) ? [void 0, t] : [t, e];
    return n && Object.assign(i, n), a == null || a.forEach((r) => i.appendChild(r)), i;
  }, "v");
  var O = /* @__PURE__ */ __name((s, t) => {
    var e;
    return t === "left" ? s.offsetLeft : (((e = s.offsetParent instanceof HTMLElement ? s.offsetParent : null) == null ? void 0 : e.offsetWidth) ?? 0) - s.offsetWidth - s.offsetLeft;
  }, "O");
  var H2 = /* @__PURE__ */ __name((s) => s.offsetWidth > 0 && s.offsetHeight > 0, "H");
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
  var G = F2 && V && I;
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
        H2(this) && // https://github.com/barvian/number-flow/issues/165
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
        this.nonce && (h.nonce = this.nonce), h.textContent = N, this.shadowRoot.appendChild(h), this._pre = new R(this, n, {
          justify: "right",
          part: "left"
        }), this.shadowRoot.appendChild(this._pre.el), this._num = new J2(this, a, r), this.shadowRoot.appendChild(this._num.el), this._post = new R(this, o, {
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
  var P = _P;
  P.defaultProps = {
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
      this.flow = t, this._integer = new j(t, e, {
        justify: "right",
        part: "integer"
      }), this._fraction = new j(t, i, {
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
  var J2 = _J;
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
  var j = (_a = class extends T {
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
  var R = _R;
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
  var Q = /* @__PURE__ */ __name((s) => [W, D(s), N], "Q");
  var tt2 = Q();
  var et2 = "number-flow-connect";
  var it2 = "number-flow-update";
  var _nt = class _nt extends P {
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
      (!this._formatter || this._prevFormat !== this.format || this._prevLocales !== this.locales) && (this._formatter = new Intl.NumberFormat(this.locales, this.format), this._prevFormat = this.format, this._prevLocales = this.locales), t != null && (this._value = t), this.dispatchEvent(new Event(it2, { bubbles: true })), this.data = q(this._value, this._formatter, this.numberPrefix, this.numberSuffix);
    }
  };
  __name(_nt, "nt");
  var nt2 = _nt;
  Y2("number-flow", nt2);
  var st2 = `/* @xlxz/styles \u2014 \u8BBE\u8BA1\u53D8\u91CF */
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
  var at2 = `/* AnimatedSlider \u5E26\u52A8\u753B\u6570\u5B57\u7684\u6ED1\u52A8\u6761 */
.xlxz-animated-slider {
  display: flex;
  align-items: center;
  gap: var(--sm-space, 8px);
  width: 100%;
}

.xlxz-animated-slider__track {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  height: 4px;
  background: var(--color-border, #e7e7e7);
  border-radius: 2px;
  outline: none;
  transition: background var(--transition-fast, 0.15s ease);
}
.xlxz-animated-slider__track:hover {
  background: #d0d0d0;
}

.xlxz-animated-slider__track::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-primary, #fb7299);
  cursor: pointer;
  box-shadow: 0 1px 4px var(--color-shadow, rgba(0, 0, 0, 0.08));
  transition: transform var(--transition-fast, 0.15s ease),
              box-shadow var(--transition-fast, 0.15s ease);
}
.xlxz-animated-slider__track::-webkit-slider-thumb:hover {
  transform: scale(1.3);
  box-shadow: 0 2px 8px rgba(251, 114, 153, 0.3);
}
.xlxz-animated-slider__track::-webkit-slider-thumb:active {
  transform: scale(1.1);
}

.xlxz-animated-slider__track::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background: var(--color-primary, #fb7299);
  cursor: pointer;
}

.xlxz-animated-slider__value {
  display: inline-flex;
  align-items: center;
  min-width: 40px;
  justify-content: flex-end;
  font-size: var(--font-sm, 12px);
  color: var(--color-text-secondary, #666);
  font-variant-numeric: tabular-nums;
}

.xlxz-animated-slider__value number-flow {
  display: inline-block;
  font-size: inherit;
  color: inherit;
}

.xlxz-animated-slider__suffix {
  font-size: var(--font-sm, 12px);
  color: var(--color-text-muted, #999);
  margin-left: 2px;
}

/* Label \u5E03\u5C40\u53D8\u4F53 */
.xlxz-animated-slider--labeled {
  flex-wrap: wrap;
}

.xlxz-animated-slider__label {
  font-size: var(--font-sm, 12px);
  font-weight: 500;
  color: var(--color-text-secondary, #666);
  width: 100%;
  margin-bottom: var(--xs-space, 4px);
}
`;
  var U2 = false;
  function rt2() {
    if (U2) return;
    const s = document.createElement("style");
    s.textContent = st2 + `
` + at2 + `
` + tt2.join(`
`), document.head.appendChild(s), U2 = true;
  }
  __name(rt2, "rt");
  function lt2(s = {}) {
    const {
      min: t = 0,
      max: e = 100,
      step: i = 1,
      value: n = t,
      label: a,
      suffix: r,
      onChange: o
    } = s;
    rt2();
    let d = n;
    const h = document.createElement("div");
    if (h.className = `xlxz-root xlxz-animated-slider${a ? " xlxz-animated-slider--labeled" : ""}`, a) {
      const p = document.createElement("span");
      p.className = "xlxz-animated-slider__label", p.textContent = a, h.appendChild(p);
    }
    const l = document.createElement("input");
    l.type = "range", l.className = "xlxz-animated-slider__track", l.min = String(t), l.max = String(e), l.step = String(i), l.value = String(n), h.appendChild(l);
    const m = document.createElement("span");
    m.className = "xlxz-animated-slider__value", h.appendChild(m);
    const f = document.createElement("number-flow");
    if (m.appendChild(f), r) {
      const p = document.createElement("span");
      p.className = "xlxz-animated-slider__suffix", p.textContent = r, m.appendChild(p);
    }
    return requestAnimationFrame(() => {
      f.update(d);
    }), l.addEventListener("input", () => {
      d = Number(l.value), f.update(d), o == null || o(d);
    }), {
      getValue: /* @__PURE__ */ __name(() => d, "getValue"),
      setValue: /* @__PURE__ */ __name((p) => {
        d = p, l.value = String(p), f.update(p);
      }, "setValue"),
      getElement: /* @__PURE__ */ __name(() => h, "getElement"),
      destroy: /* @__PURE__ */ __name(() => {
        h.remove();
      }, "destroy")
    };
  }
  __name(lt2, "lt");

  // src/fufugal-rating-filter/config.ts
  var STORAGE_KEY = "fufugal-rating-filter";
  var DEFAULT_CONFIG = {
    enabled: false,
    threshold: 7
  };
  function loadConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_CONFIG };
      const parsed = JSON.parse(raw);
      return {
        enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : DEFAULT_CONFIG.enabled,
        threshold: typeof parsed.threshold === "number" && Number.isFinite(parsed.threshold) ? clampThreshold(parsed.threshold) : DEFAULT_CONFIG.threshold
      };
    } catch {
      return { ...DEFAULT_CONFIG };
    }
  }
  __name(loadConfig, "loadConfig");
  function saveConfig(config2) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config2));
    } catch {
    }
  }
  __name(saveConfig, "saveConfig");
  function clampThreshold(value) {
    const clamped = Math.min(10, Math.max(0, value));
    return Math.round(clamped * 10) / 10;
  }
  __name(clampThreshold, "clampThreshold");

  // src/fufugal-rating-filter/index.ts
  var STAR_PATH_PREFIX = "M283.84 867.84";
  var CARD_SELECTOR = "div.upDate";
  function findRatingAnchor(card) {
    const paths = card.querySelectorAll("svg path[d]");
    for (const path of paths) {
      const d = path.getAttribute("d") ?? "";
      if (!d.startsWith(STAR_PATH_PREFIX)) continue;
      const span = path.closest("span");
      const anchor = span?.querySelector("a");
      if (anchor) return anchor;
    }
    return null;
  }
  __name(findRatingAnchor, "findRatingAnchor");
  function parseRating(text) {
    const t = text.trim();
    if (!t || t.includes("\u6682\u65E0")) return 0;
    const m = t.match(/-?\d+(?:\.\d+)?/);
    if (!m) return 0;
    const n = Number(m[0]);
    return Number.isFinite(n) ? n : 0;
  }
  __name(parseRating, "parseRating");
  function readRating(card) {
    const anchor = findRatingAnchor(card);
    return parseRating(anchor?.textContent ?? "");
  }
  __name(readRating, "readRating");
  var config = loadConfig();
  function shouldHide(rating) {
    if (!config.enabled) return false;
    return rating < config.threshold;
  }
  __name(shouldHide, "shouldHide");
  function applyToCard(card) {
    const rating = readRating(card);
    card.style.display = shouldHide(rating) ? "none" : "";
  }
  __name(applyToCard, "applyToCard");
  function applyAll() {
    const cards = document.querySelectorAll(CARD_SELECTOR);
    for (const card of cards) applyToCard(card);
  }
  __name(applyAll, "applyAll");
  var scheduled = false;
  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyAll();
    });
  }
  __name(scheduleApply, "scheduleApply");
  var panelRoot = null;
  function isOwnMutation(target) {
    if (!panelRoot || !(target instanceof Node)) return false;
    return panelRoot.contains(target);
  }
  __name(isOwnMutation, "isOwnMutation");
  function observeMutations() {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes.length === 0) continue;
        if (isOwnMutation(m.target)) continue;
        scheduleApply();
        return;
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  __name(observeMutations, "observeMutations");
  var PREV_SELECTOR = "button.btn-prev";
  var NEXT_SELECTOR = "button.btn-next";
  function isTypingTarget(el2) {
    if (!(el2 instanceof HTMLElement)) return false;
    const tag = el2.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el2.isContentEditable;
  }
  __name(isTypingTarget, "isTypingTarget");
  function clickPager(selector) {
    const btn = document.querySelector(selector);
    if (!btn || btn.disabled) return;
    btn.click();
    window.scrollTo({ top: 0 });
  }
  __name(clickPager, "clickPager");
  function onKeydown(e) {
    if (e.key !== "[" && e.key !== "]") return;
    if (isTypingTarget(e.target)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    e.preventDefault();
    clickPager(e.key === "[" ? PREV_SELECTOR : NEXT_SELECTOR);
  }
  __name(onKeydown, "onKeydown");
  function setupHotkeys() {
    window.addEventListener("keydown", onKeydown, true);
  }
  __name(setupHotkeys, "setupHotkeys");
  var PANEL_CSS = `
.frf-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 13px;
  color: #333;
}
.frf-label { color: #444; user-select: none; }
.frf-switch {
  position: relative;
  width: 44px;
  height: 24px;
  flex: none;
  cursor: pointer;
}
.frf-switch input { display: none; }
.frf-switch__track {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: #ccc;
  transition: background 0.2s;
}
.frf-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}
.frf-switch input:checked + .frf-switch__track { background: #4d6bfe; }
.frf-switch input:checked + .frf-switch__track + .frf-switch__thumb {
  transform: translateX(20px);
}
.frf-slider-host { margin-top: 14px; }
.frf-slider-host.frf-disabled { opacity: 0.5; pointer-events: none; }
.frf-hint {
  margin-top: 14px;
  font-size: 12px;
  color: #999;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
`;
  function buildPanelHTML() {
    return `
<div style="display:flex;flex-direction:column;">
  <div class="frf-row">
    <span class="frf-label">\u542F\u7528\u8BC4\u5206\u8FC7\u6EE4</span>
    <label class="frf-switch">
      <input id="frf-toggle" type="checkbox" ${config.enabled ? "checked" : ""}>
      <span class="frf-switch__track"></span>
      <span class="frf-switch__thumb"></span>
    </label>
  </div>
  <div id="frf-slider-host" class="frf-slider-host ${config.enabled ? "" : "frf-disabled"}"></div>
  <div class="frf-hint">\u4F4E\u4E8E\u9608\u503C\u7684\u5361\u7247\u5C06\u88AB\u9690\u85CF\uFF1B\u300C\u6682\u65E0\u8BC4\u5206\u300D\u6309 0 \u5206\u5904\u7406\uFF0C\u5F00\u542F\u65F6\u4E00\u5E76\u9690\u85CF\u3002<br>\u5FEB\u6377\u952E\uFF1A[ \u4E0A\u4E00\u9875\uFF0C] \u4E0B\u4E00\u9875\u3002</div>
</div>`;
  }
  __name(buildPanelHTML, "buildPanelHTML");
  function setupPanel() {
    const style = document.createElement("style");
    style.textContent = PANEL_CSS;
    document.head.appendChild(style);
    Cl({
      title: "Fufugal \u8BC4\u5206\u8FC7\u6EE4",
      content: buildPanelHTML(),
      width: 320,
      height: 220,
      position: { x: window.innerWidth - 340, y: 80 }
    }).show();
    setTimeout(() => {
      bindControls();
    }, 100);
  }
  __name(setupPanel, "setupPanel");
  function bindControls() {
    const toggle = document.querySelector("#frf-toggle");
    const sliderHost = document.querySelector("#frf-slider-host");
    if (!toggle || !sliderHost) return;
    panelRoot = sliderHost.closest(".xlxz-root") ?? sliderHost;
    const slider = lt2({
      min: 0,
      max: 10,
      step: 0.1,
      value: config.threshold,
      label: "\u9608\u503C",
      onChange: /* @__PURE__ */ __name((value) => {
        config = { ...config, threshold: clampThreshold(value) };
        saveConfig(config);
        applyAll();
      }, "onChange")
    });
    sliderHost.appendChild(slider.getElement());
    toggle.addEventListener("change", () => {
      config = { ...config, enabled: toggle.checked };
      saveConfig(config);
      sliderHost.classList.toggle("frf-disabled", !config.enabled);
      applyAll();
    });
  }
  __name(bindControls, "bindControls");
  function init() {
    setupPanel();
    applyAll();
    observeMutations();
    setupHotkeys();
  }
  __name(init, "init");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
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
