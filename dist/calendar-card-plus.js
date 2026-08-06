var Ue = Object.defineProperty;
var Re = (n, e, t) => e in n ? Ue(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var y = (n, e, t) => Re(n, typeof e != "symbol" ? e + "" : e, t);
async function He(n, e, t, i) {
  const a = encodeURI(`?start=${e.toISOString()}&end=${t.toISOString()}`), o = i.map(async (d) => {
    try {
      const s = await n.callApi("GET", `calendars/${d}${a}`);
      if (!Array.isArray(s))
        throw new Error("Response is not an array");
      return s.map((_) => {
        var m, g, w, T, b, x;
        const c = ((m = _.start) == null ? void 0 : m.dateTime) || ((g = _.start) == null ? void 0 : g.date) || _.start, h = ((w = _.end) == null ? void 0 : w.dateTime) || ((T = _.end) == null ? void 0 : T.date) || _.end;
        return {
          ..._,
          start: { dateTime: c.includes("T") ? c : void 0, date: c.includes("T") ? void 0 : c },
          end: { dateTime: h.includes("T") ? h : void 0, date: h.includes("T") ? void 0 : h },
          summary: _.summary || _.title || "Unknown Event",
          entity_id: d,
          calendar_name: ((x = (b = n.states[d]) == null ? void 0 : b.attributes) == null ? void 0 : x.friendly_name) || d
        };
      });
    } catch {
      const l = n.states[d];
      return l && l.attributes.start_time && l.attributes.end_time ? [{
        start: { dateTime: l.attributes.start_time.replace(" ", "T") },
        end: { dateTime: l.attributes.end_time.replace(" ", "T") },
        summary: l.attributes.message || l.attributes.friendly_name,
        location: l.attributes.location,
        description: l.attributes.description,
        entity_id: d,
        calendar_name: l.attributes.friendly_name || d
      }] : [];
    }
  });
  return (await Promise.all(o)).flat();
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, _e = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ce = Symbol(), pe = /* @__PURE__ */ new WeakMap();
let De = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ce) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (_e && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = pe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && pe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ve = (n) => new De(typeof n == "string" ? n : n + "", void 0, ce), Te = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, a, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + n[o + 1], n[0]);
  return new De(t, n, ce);
}, Ke = (n, e) => {
  if (_e) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), a = J.litNonce;
    a !== void 0 && i.setAttribute("nonce", a), i.textContent = t.cssText, n.appendChild(i);
  }
}, ge = _e ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ve(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ie, defineProperty: Ze, getOwnPropertyDescriptor: Fe, getOwnPropertyNames: Ge, getOwnPropertySymbols: We, getPrototypeOf: qe } = Object, z = globalThis, ve = z.trustedTypes, Ye = ve ? ve.emptyScript : "", te = z.reactiveElementPolyfillSupport, I = (n, e) => n, Q = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Ye : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, he = (n, e) => !Ie(n, e), ye = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: he };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), z.litPropertyMetadata ?? (z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let B = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ye) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), a = this.getPropertyDescriptor(e, i, t);
      a !== void 0 && Ze(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: a, set: o } = Fe(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: a, set(r) {
      const d = a == null ? void 0 : a.call(this);
      o == null || o.call(this, r), this.requestUpdate(e, d, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ye;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const e = qe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const t = this.properties, i = [...Ge(t), ...We(t)];
      for (const a of i) this.createProperty(a, t[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, a] of t) this.elementProperties.set(i, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const a = this._$Eu(t, i);
      a !== void 0 && this._$Eh.set(a, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const a of i) t.unshift(ge(a));
    } else e !== void 0 && t.push(ge(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ke(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var o;
    const i = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, i);
    if (a !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Q).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(a) : this.setAttribute(a, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, r;
    const i = this.constructor, a = i._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const d = i.getPropertyOptions(a), s = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : Q;
      this._$Em = a;
      const l = s.fromAttribute(t, d.type);
      this[a] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(a)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, a = !1, o) {
    var r;
    if (e !== void 0) {
      const d = this.constructor;
      if (a === !1 && (o = this[e]), i ?? (i = d.getPropertyOptions(e)), !((i.hasChanged ?? he)(o, t) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(d._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: a, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), o !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), a === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [o, r] of a) {
        const { wrapped: d } = r, s = this[o];
        d !== !0 || this._$AL.has(o) || s === void 0 || this.C(o, void 0, r, s);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((a) => {
        var o;
        return (o = a.hostUpdate) == null ? void 0 : o.call(a);
      }), this.update(t)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var a;
      return (a = i.hostUpdated) == null ? void 0 : a.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
B.elementStyles = [], B.shadowRootOptions = { mode: "open" }, B[I("elementProperties")] = /* @__PURE__ */ new Map(), B[I("finalized")] = /* @__PURE__ */ new Map(), te == null || te({ ReactiveElement: B }), (z.reactiveElementVersions ?? (z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, fe = (n) => n, X = Z.trustedTypes, we = X ? X.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ce = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Me = "?" + A, Je = `<${Me}>`, L = document, F = () => L.createComment(""), G = (n) => n === null || typeof n != "object" && typeof n != "function", ue = Array.isArray, Qe = (n) => ue(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", ie = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, be = /-->/g, xe = />/g, C = RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $e = /'/g, ke = /"/g, Pe = /^(?:script|style|textarea|title)$/i, Xe = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), u = Xe(1), R = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Ee = /* @__PURE__ */ new WeakMap(), M = L.createTreeWalker(L, 129);
function Le(n, e) {
  if (!ue(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return we !== void 0 ? we.createHTML(e) : e;
}
const et = (n, e) => {
  const t = n.length - 1, i = [];
  let a, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = K;
  for (let d = 0; d < t; d++) {
    const s = n[d];
    let l, _, c = -1, h = 0;
    for (; h < s.length && (r.lastIndex = h, _ = r.exec(s), _ !== null); ) h = r.lastIndex, r === K ? _[1] === "!--" ? r = be : _[1] !== void 0 ? r = xe : _[2] !== void 0 ? (Pe.test(_[2]) && (a = RegExp("</" + _[2], "g")), r = C) : _[3] !== void 0 && (r = C) : r === C ? _[0] === ">" ? (r = a ?? K, c = -1) : _[1] === void 0 ? c = -2 : (c = r.lastIndex - _[2].length, l = _[1], r = _[3] === void 0 ? C : _[3] === '"' ? ke : $e) : r === ke || r === $e ? r = C : r === be || r === xe ? r = K : (r = C, a = void 0);
    const m = r === C && n[d + 1].startsWith("/>") ? " " : "";
    o += r === K ? s + Je : c >= 0 ? (i.push(l), s.slice(0, c) + Ce + s.slice(c) + A + m) : s + A + (c === -2 ? d : m);
  }
  return [Le(n, o + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class W {
  constructor({ strings: e, _$litType$: t }, i) {
    let a;
    this.parts = [];
    let o = 0, r = 0;
    const d = e.length - 1, s = this.parts, [l, _] = et(e, t);
    if (this.el = W.createElement(l, i), M.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (a = M.nextNode()) !== null && s.length < d; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const c of a.getAttributeNames()) if (c.endsWith(Ce)) {
          const h = _[r++], m = a.getAttribute(c).split(A), g = /([.?@])?(.*)/.exec(h);
          s.push({ type: 1, index: o, name: g[2], strings: m, ctor: g[1] === "." ? it : g[1] === "?" ? at : g[1] === "@" ? nt : ee }), a.removeAttribute(c);
        } else c.startsWith(A) && (s.push({ type: 6, index: o }), a.removeAttribute(c));
        if (Pe.test(a.tagName)) {
          const c = a.textContent.split(A), h = c.length - 1;
          if (h > 0) {
            a.textContent = X ? X.emptyScript : "";
            for (let m = 0; m < h; m++) a.append(c[m], F()), M.nextNode(), s.push({ type: 2, index: ++o });
            a.append(c[h], F());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Me) s.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = a.data.indexOf(A, c + 1)) !== -1; ) s.push({ type: 7, index: o }), c += A.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = L.createElement("template");
    return i.innerHTML = e, i;
  }
}
function H(n, e, t = n, i) {
  var r, d;
  if (e === R) return e;
  let a = i !== void 0 ? (r = t._$Co) == null ? void 0 : r[i] : t._$Cl;
  const o = G(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== o && ((d = a == null ? void 0 : a._$AO) == null || d.call(a, !1), o === void 0 ? a = void 0 : (a = new o(n), a._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = a : t._$Cl = a), a !== void 0 && (e = H(n, a._$AS(n, e.values), a, i)), e;
}
class tt {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, a = ((e == null ? void 0 : e.creationScope) ?? L).importNode(t, !0);
    M.currentNode = a;
    let o = M.nextNode(), r = 0, d = 0, s = i[0];
    for (; s !== void 0; ) {
      if (r === s.index) {
        let l;
        s.type === 2 ? l = new q(o, o.nextSibling, this, e) : s.type === 1 ? l = new s.ctor(o, s.name, s.strings, this, e) : s.type === 6 && (l = new ot(o, this, e)), this._$AV.push(l), s = i[++d];
      }
      r !== (s == null ? void 0 : s.index) && (o = M.nextNode(), r++);
    }
    return M.currentNode = L, a;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class q {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, a) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = H(this, e, t), G(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Qe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && G(this._$AH) ? this._$AA.nextSibling.data = e : this.T(L.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, a = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = W.createElement(Le(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === a) this._$AH.p(t);
    else {
      const r = new tt(a, this), d = r.u(this.options);
      r.p(t), this.T(d), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Ee.get(e.strings);
    return t === void 0 && Ee.set(e.strings, t = new W(e)), t;
  }
  k(e) {
    ue(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, a = 0;
    for (const o of e) a === t.length ? t.push(i = new q(this.O(F()), this.O(F()), this, this.options)) : i = t[a], i._$AI(o), a++;
    a < t.length && (this._$AR(i && i._$AB.nextSibling, a), t.length = a);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const a = fe(e).nextSibling;
      fe(e).remove(), e = a;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class ee {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, a, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = a, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, t = this, i, a) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = H(this, e, t, 0), r = !G(e) || e !== this._$AH && e !== R, r && (this._$AH = e);
    else {
      const d = e;
      let s, l;
      for (e = o[0], s = 0; s < o.length - 1; s++) l = H(this, d[i + s], t, s), l === R && (l = this._$AH[s]), r || (r = !G(l) || l !== this._$AH[s]), l === f ? e = f : e !== f && (e += (l ?? "") + o[s + 1]), this._$AH[s] = l;
    }
    r && !a && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class it extends ee {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class at extends ee {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class nt extends ee {
  constructor(e, t, i, a, o) {
    super(e, t, i, a, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = H(this, e, t, 0) ?? f) === R) return;
    const i = this._$AH, a = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== f && (i === f || a);
    a && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ot {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    H(this, e);
  }
}
const ae = Z.litHtmlPolyfillSupport;
ae == null || ae(W, q), (Z.litHtmlVersions ?? (Z.litHtmlVersions = [])).push("3.3.2");
const st = (n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let a = i._$litPart$;
  if (a === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = a = new q(e.insertBefore(F(), o), o, void 0, t ?? {});
  }
  return a._$AI(n), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class U extends B {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = st(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return R;
  }
}
var Se;
U._$litElement$ = !0, U.finalized = !0, (Se = P.litElementHydrateSupport) == null || Se.call(P, { LitElement: U });
const ne = P.litElementPolyfillSupport;
ne == null || ne({ LitElement: U });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = (n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = { attribute: !0, type: String, converter: Q, reflect: !1, hasChanged: he }, dt = (n = rt, e, t) => {
  const { kind: i, metadata: a } = t;
  let o = globalThis.litPropertyMetadata.get(a);
  if (o === void 0 && globalThis.litPropertyMetadata.set(a, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(t.name, n), i === "accessor") {
    const { name: r } = t;
    return { set(d) {
      const s = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(r, s, n, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(r, void 0, n, d), d;
    } };
  }
  if (i === "setter") {
    const { name: r } = t;
    return function(d) {
      const s = this[r];
      e.call(this, d), this.requestUpdate(r, s, n, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function S(n) {
  return (e, t) => typeof t == "object" ? dt(n, e, t) : ((i, a, o) => {
    const r = a.hasOwnProperty(o);
    return a.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(a, o) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Y(n) {
  return S({ ...n, state: !0, attribute: !1 });
}
let Ae = 0;
function oe(n, e, ...t) {
  return n && n.color ? n.color : "var(--primary-color, #03a9f4)";
}
function se(n, e, ...t) {
  var r, d;
  let i = /* @__PURE__ */ new Date();
  n && ((r = n.start) != null && r.date || (d = n.start) != null && d.dateTime) && (i = new Date(n.start.date || n.start.dateTime));
  const a = i.toLocaleDateString("de", { month: "short" }).toUpperCase().replace(".", ""), o = i.getDate();
  return u`
        <div style="display: inline-flex; flex-direction: column; width: 36px; height: 38px; border-radius: 6px; background-color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; text-align: center; border: 1px solid rgba(0,0,0,0.1); flex-shrink: 0; line-height: 1;">
            <div style="background-color: #f44336; color: white; font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 0;">${a}</div>
            <div style="font-size: 16px; font-weight: bold; color: #333; padding-top: 2px; background-color: #fff;">${o}</div>
        </div>
    `;
}
function re(n, e, ...t) {
  return "var(--card-background-color, #1c1c1e)";
}
function de(n, e, t, i) {
  if (i) return "Ganztägig";
  const a = new Date(e), o = new Date(t);
  return `${a.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${o.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}
function lt(n, e) {
  const t = Math.floor(e / 60), i = Math.floor(e % 60);
  return t > 0 && i > 0 ? `${t}h ${i}m` : t > 0 ? `${t}h` : `${i}m`;
}
function Ne(n) {
  const e = {};
  return (n || []).forEach((t) => {
    const i = t.start.date || t.start.dateTime;
    if (!i) return;
    const a = new Date(i), o = a.toDateString();
    e[o] || (e[o] = { date: a, events: [] }), e[o].events.push(t);
  }), Object.values(e);
}
function _t(n) {
  return Ne(n);
}
function ct(n, e, t, i, a) {
  if (!e)
    return u`<div style="padding: 16px; text-align: center;">Lade Termine...</div>`;
  const o = gt(e);
  return u`
        <div class="calendar-container">
            ${ht(n, t, i, a)}
            
            <div class="calendar-days-list">
                ${Object.keys(o).sort().map((r) => {
    const [d, s, l] = r.split("-").map(Number), _ = new Date(d, s - 1, l), c = o[r];
    return ut(n, _, c, t);
  })}
            </div>
        </div>
    `;
}
function ht(n, e, t, i) {
  const a = t.toLocaleDateString(n.language || "de", { day: "2-digit", month: "2-digit" }), o = i.toLocaleDateString(n.language || "de", { day: "2-digit", month: "2-digit" });
  return u`
        <div class="calendar-header">
            <button class="nav-btn" @click=${(r) => ze(r, -7)}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>

            <div class="calendar-header-title">
                ${e.title || "Kalender"}
                <div class="calendar-header-week">${a} - ${o}</div>
            </div>

            <button class="nav-btn" @click=${(r) => ze(r, 7)}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
        </div>
    `;
}
function ze(n, e) {
  Ae += e;
  const t = /* @__PURE__ */ new Date();
  t.setDate(t.getDate() + Ae), t.setHours(0, 0, 0, 0);
  const i = new Date(t);
  i.setDate(i.getDate() + 7), i.setHours(23, 59, 59, 999), n.currentTarget.dispatchEvent(
    new CustomEvent("calendar-card-range-changed", {
      bubbles: !0,
      composed: !0,
      detail: { start: t, end: i }
    })
  );
}
function ut(n, e, t, i) {
  const a = e.toLocaleDateString(n.language || "de", { weekday: "short" }), o = e.toLocaleDateString(n.language || "de", { day: "2-digit", month: "2-digit" }), r = `${a}., ${o}.`, d = e.toLocaleDateString(n.language || "de", { month: "short" }).toUpperCase().replace(".", ""), s = e.getDate(), l = (/* @__PURE__ */ new Date()).toDateString() === e.toDateString(), _ = t.filter((c) => !c.is_empty);
  return u`
        <div class="day-bubble ${l ? "today" : ""}">
            <div class="day-header">
                <div class="header-left">
                    <div class="calendar-date-icon">
                        <div class="month">${d}</div>
                        <div class="day">${s}</div>
                    </div>
                    <span class="day-title">${r}</span>
                </div>
                <button class="add-event-btn" @click=${(c) => pt(c, e, i)}>
                    <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
                </button>
            </div>
            
            <div class="event-list">
                ${_.length === 0 ? u`<div class="no-events">Keine Termine</div>` : _.map((c) => u`
                        <div class="event-item" @click=${(h) => mt(h, c)}>
                            <span class="event-time">${vt(c)}</span>
                            <span class="event-title">${c.summary}</span>
                        </div>
                    `)}
            </div>
        </div>
    `;
}
function mt(n, e) {
  n.stopPropagation(), n.currentTarget.dispatchEvent(
    new CustomEvent("calendar-card-show-detail", {
      bubbles: !0,
      composed: !0,
      detail: {
        entities: [e],
        title: e.summary
      }
    })
  );
}
function pt(n, e, t) {
  n.stopPropagation();
  const i = new Date(e);
  i.setHours(8, 0, 0, 0);
  let a = t == null ? void 0 : t.entity;
  !a && (t != null && t.entities) && Array.isArray(t.entities) && t.entities.length > 0 && (a = typeof t.entities[0] == "string" ? t.entities[0] : t.entities[0].entity), n.currentTarget.dispatchEvent(
    new CustomEvent("calendar-card-add-event", {
      bubbles: !0,
      composed: !0,
      detail: {
        calendarId: a,
        selectedDate: i
      }
    })
  );
}
function gt(n) {
  const e = {}, t = (i) => {
    const a = i.getFullYear(), o = String(i.getMonth() + 1).padStart(2, "0"), r = String(i.getDate()).padStart(2, "0");
    return `${a}-${o}-${r}`;
  };
  return n.forEach((i) => {
    let a = "";
    i.start.date ? a = i.start.date : i.start.dateTime && (a = t(new Date(i.start.dateTime))), a && (e[a] || (e[a] = []), e[a].push(i));
  }), e;
}
function vt(n) {
  return n.start.date ? "Ganztägig" : n.start.dateTime ? new Date(n.start.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
}
async function yt(n, e, t, i) {
  if (!(!e.calendar_id || !e.name || !e.start_date || !e.end_date))
    try {
      const a = {
        entity_id: e.calendar_id,
        summary: e.name
      };
      if (e.all_day) {
        let o = e.end_date;
        if (e.start_date === o) {
          const r = o.split("-"), d = new Date(Number(r[0]), Number(r[1]) - 1, Number(r[2]));
          d.setDate(d.getDate() + 1);
          const s = (l) => l.toString().padStart(2, "0");
          o = `${d.getFullYear()}-${s(d.getMonth() + 1)}-${s(d.getDate())}`;
        }
        a.start_date = e.start_date, a.end_date = o;
      } else {
        const o = e.start_time || "09:00", r = e.end_time || "10:00";
        a.start_date_time = `${e.start_date} ${o}:00`, a.end_date_time = `${e.end_date} ${r}:00`, e.location && (a.location = e.location), e.description && (a.description = e.description);
      }
      if (e.recurrence && e.recurrence !== "none") {
        const o = {
          DAILY: "FREQ=DAILY",
          WEEKLY: "FREQ=WEEKLY",
          MONTHLY: "FREQ=MONTHLY",
          YEARLY: "FREQ=YEARLY"
        };
        o[e.recurrence] && (a.rrule = o[e.recurrence]);
      }
      await n.callService("calendar", "create_event", a), t();
    } catch (a) {
      i(a);
    }
}
function ft(n, e, t, i, a, o) {
  const r = Object.keys(n.states).filter((s) => s.startsWith("calendar.")).filter((s) => {
    var l;
    return !((l = e.exclude_entities) != null && l.includes(s));
  }), d = t.all_day || !1;
  return u`
        <div class="add-event-form">
            <div class="field">
                <label class="field-label">${n.localize("ui.components.calendar.event.summary") || "Title"}</label>
                <input
                    type="text"
                    class="field-input"
                    .value=${t.name || ""}
                    @input=${(s) => i({ name: s.target.value })}
                />
            </div>

            <div class="field">
                <label class="field-label">${n.localize("ui.components.calendar.event.location") || "Location"}</label>
                <input
                    type="text"
                    class="field-input"
                    .value=${t.location || ""}
                    @input=${(s) => i({ location: s.target.value })}
                />
            </div>

            <div class="field">
                <label class="field-label">${n.localize("ui.components.calendar.event.description") || "Description"}</label>
                <input
                    type="text"
                    class="field-input"
                    .value=${t.description || ""}
                    @input=${(s) => i({ description: s.target.value })}
                />
            </div>

            <div class="field">
                <label class="field-label">${n.localize("ui.components.calendar.my_calendars") || "Calendar"}</label>
                <select
                    class="field-input"
                    .value=${t.calendar_id || ""}
                    @change=${(s) => i({ calendar_id: s.target.value })}
                >
                    ${r.length === 0 ? u`<option value="">-- ${n.localize("ui.common.none") || "no calendars"} --</option>` : r.map((s) => {
    var l, _;
    return u`
                            <option value=${s} ?selected=${s === t.calendar_id}>
                                ${((_ = (l = n.states[s]) == null ? void 0 : l.attributes) == null ? void 0 : _.friendly_name) || s}
                            </option>
                        `;
  })}
                </select>
            </div>

            <div class="row-flex">
                <ha-formfield .label=${n.localize("ui.components.calendar.event.all_day") || "All Day"}>
                    <ha-switch
                        .checked=${d}
                        @change=${(s) => i({ all_day: s.target.checked })}
                    ></ha-switch>
                </ha-formfield>
            </div>

            <div class="field">
                <label class="field-label">${n.localize("ui.components.calendar.event.start") || "Start"}</label>
                <div class="date-row">
                    <input
                        type="date"
                        class="field-input"
                        .value=${t.start_date || ""}
                        @change=${(s) => i({ start_date: s.target.value })}
                    />
                    ${d ? "" : u`
                        <input
                            type="time"
                            class="field-input"
                            .value=${t.start_time || "09:00"}
                            @change=${(s) => i({ start_time: s.target.value })}
                        />
                    `}
                </div>
            </div>

            <div class="field">
                <label class="field-label">${n.localize("ui.components.calendar.event.end") || "End"}</label>
                <div class="date-row">
                    <input
                        type="date"
                        class="field-input"
                        .value=${t.end_date || ""}
                        @change=${(s) => i({ end_date: s.target.value })}
                    />
                    ${d ? "" : u`
                        <input
                            type="time"
                            class="field-input"
                            .value=${t.end_time || "10:00"}
                            @change=${(s) => i({ end_time: s.target.value })}
                        />
                    `}
                </div>
            </div>

            <div class="field">
                <label class="field-label">${n.localize("ui.components.calendar.event.repeat.label") || "Repeat"}</label>
                <select
                    class="field-input"
                    .value=${t.recurrence || "none"}
                    @change=${(s) => i({ recurrence: s.target.value })}
                >
                    <option value="none">${n.localize("ui.components.calendar.event.repeat.freq.none") || "None"}</option>
                    <option value="DAILY">${n.localize("ui.components.calendar.event.repeat.freq.daily") || "Daily"}</option>
                    <option value="WEEKLY">${n.localize("ui.components.calendar.event.repeat.freq.weekly") || "Weekly"}</option>
                    <option value="MONTHLY">${n.localize("ui.components.calendar.event.repeat.freq.monthly") || "Monthly"}</option>
                    <option value="YEARLY">${n.localize("ui.components.calendar.event.repeat.freq.yearly") || "Yearly"}</option>
                </select>
            </div>

            <div class="dialog-actions">
                <ha-button @click=${a}>
                    ${n.localize("ui.common.cancel") || "Cancel"}
                </ha-button>
                <ha-button
                    unelevated
                    @click=${o}
                    ?disabled=${!t.name || !t.calendar_id}
                >
                    ${n.localize("ui.common.save") || "Save"}
                </ha-button>
            </div>
        </div>
    `;
}
const O = {
  en: {
    starts_in_min: "Starts in {x} minute",
    starts_in_mins: "Starts in {x} minutes",
    starts_in_hour: "Starts in {x} hour",
    starts_in_hours: "Starts in {x} hours",
    starts_in_day: "Starts in {x} day",
    starts_in_days: "Starts in {x} days",
    starts_in_week: "Starts in {x} week",
    starts_in_weeks: "Starts in {x} weeks",
    loading: "Loading events...",
    no_events: "No active events",
    more_events: "+{x} more",
    editor_show_upcoming: "Show upcoming events",
    editor_unfold_events: "Unfold Events",
    editor_configuration: "Configuration",
    editor_text_visibility: "Text Visibility",
    editor_show_divider: "Show Divider",
    editor_show_weekday: "Show Weekday",
    editor_show_weekday_long: "Use long weekday (e.g. Monday)",
    editor_show_month: "Show Month",
    editor_show_month_long: "Use long month (e.g. December)",
    editor_icon_show_weekday: "Swap Month and Weekday",
    editor_show_add_event: "Show 'Add Event' Button",
    add_event_title: "Add Event",
    add_event_name: "Title",
    add_event_start: "Start",
    add_event_end: "End",
    add_event_all_day: "All Day",
    add_event_location: "Location",
    add_event_description: "Description",
    add_event_calendar: "Calendar",
    add_event_save: "Save",
    add_event_cancel: "Cancel",
    popup_upcoming_events: "Upcoming events",
    editor_show_more: "Show More",
    editor_show_less: "Show Less",
    editor_background_color: "Background Color",
    editor_show_location: "Show Location",
    editor_show_duration: "Show Duration",
    editor_show_time: "Show Time",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "day",
    duration_days: "days",
    editor_max_lines: "Max. displayed events",
    group_by_date: "Group by Day",
    group_by_date_and_calendar: "Group by Day and Calendar",
    empty: "Empty",
    editor_show_empty_days: "Show Empty Days"
  },
  de: {
    starts_in_min: "Beginnt in {x} Minute",
    starts_in_mins: "Beginnt in {x} Minuten",
    starts_in_hour: "Beginnt in {x} Stunde",
    starts_in_hours: "Beginnt in {x} Stunden",
    starts_in_day: "Beginnt in {x} Tag",
    starts_in_days: "Beginnt in {x} Tagen",
    starts_in_week: "Beginnt in {x} Woche",
    starts_in_weeks: "Beginnt in {x} Wochen",
    loading: "Lade Termine...",
    no_events: "Keine aktiven Termine",
    more_events: "+{x} weitere",
    editor_show_upcoming: "Zeige bevorstehende Ereignisse",
    editor_unfold_events: "Ereignisse ausklappen",
    editor_configuration: "Konfiguration",
    editor_text_visibility: "Text & Sichtbarkeit",
    editor_show_divider: "Zeige Trenner",
    editor_show_weekday: "Zeige Wochentag",
    editor_show_weekday_long: "Ausgeschrieben (z.B. Montag)",
    editor_show_month: "Zeige Monat",
    editor_show_month_long: "Ausgeschrieben (z.B. Dezember)",
    editor_icon_show_weekday: "Monat und Wochentag tauschen",
    editor_show_add_event: "Zeige 'Neuer Termin' Button",
    add_event_title: "Neuer Termin",
    add_event_name: "Titel",
    add_event_start: "Start",
    add_event_end: "Ende",
    add_event_all_day: "Ganztägig",
    add_event_location: "Ort",
    add_event_description: "Beschreibung",
    add_event_calendar: "Kalender",
    add_event_save: "Speichern",
    add_event_cancel: "Abbrechen",
    popup_upcoming_events: "Bevorstehende Ereignisse",
    editor_show_more: "Mehr anzeigen",
    editor_show_less: "Weniger anzeigen",
    editor_background_color: "Hintergrundfarbe",
    editor_show_location: "Zeige Ort",
    editor_show_duration: "Zeige Dauer",
    editor_show_time: "Zeige Zeit",
    duration_min: "Minuten",
    duration_hour: "h",
    duration_day: "Tag",
    duration_days: "Tage",
    editor_max_lines: "Max. angezeigte Termine",
    group_by_date: "Nach Tag gruppieren",
    group_by_date_and_calendar: "Nach Tag und Kalender gruppieren",
    empty: "Leer",
    editor_show_empty_days: "Zeige leere Tage"
  },
  fr: {
    starts_in_min: "Commence dans {x} minute",
    starts_in_mins: "Commence dans {x} minutes",
    starts_in_hour: "Commence dans {x} heure",
    starts_in_hours: "Commence dans {x} heures",
    starts_in_day: "Commence dans {x} jour",
    starts_in_days: "Commence dans {x} jours",
    starts_in_week: "Commence dans {x} semaine",
    starts_in_weeks: "Commence dans {x} semaines",
    loading: "Chargement...",
    no_events: "Pas d'événement",
    more_events: "+{x} autres",
    editor_show_upcoming: "Afficher les événements futurs",
    editor_unfold_events: "Déplier les événements",
    editor_configuration: "Configuration",
    editor_text_visibility: "Visibilité du texte",
    editor_show_divider: "Afficher le séparateur",
    editor_show_weekday: "Afficher le jour de la semaine",
    editor_show_weekday_long: "Format long (ex. Lundi)",
    editor_show_month: "Afficher le mois",
    editor_show_month_long: "Format long (ex. Décembre)",
    editor_icon_show_weekday: "Permuter Mois et Jour de semaine",
    editor_show_add_event: "Afficher bouton 'Nouvel événement'",
    add_event_title: "Nouvel événement",
    add_event_name: "Titre",
    add_event_start: "De",
    add_event_end: "A",
    add_event_all_day: "Toute la journée",
    add_event_location: "Lieu",
    add_event_description: "Description",
    add_event_calendar: "Calendrier",
    add_event_save: "Enregistrer",
    add_event_cancel: "Annuler",
    popup_upcoming_events: "Événements à venir",
    editor_show_more: "Afficher plus",
    editor_show_less: "Afficher moins",
    editor_background_color: "Couleur de fond",
    editor_show_location: "Afficher le lieu",
    editor_show_duration: "Afficher la durée",
    editor_show_time: "Montrer les heures",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "jour",
    duration_days: "jours",
    editor_max_lines: "Nombre max. d'événements",
    group_by_date: "Grouper par jour",
    group_by_date_and_calendar: "Grouper par jour et calendrier",
    empty: "Aucun événement",
    editor_show_empty_days: "Montrer les jours vides"
  },
  it: {
    starts_in_min: "Inizia tra {x} minuto",
    starts_in_mins: "Inizia tra {x} minuti",
    starts_in_hour: "Inizia tra {x} ora",
    starts_in_hours: "Inizia tra {x} ore",
    starts_in_day: "Inizia tra {x} giorno",
    starts_in_days: "Inizia tra {x} giorni",
    starts_in_week: "Inizia tra {x} settimana",
    starts_in_weeks: "Inizia tra {x} settimane",
    loading: "Caricamento...",
    no_events: "Nessun evento",
    more_events: "+{x} altri",
    editor_show_upcoming: "Mostra prossimi eventi",
    editor_unfold_events: "Espandi gli eventi",
    editor_configuration: "Configurazione",
    editor_text_visibility: "Visibilità testo",
    editor_show_divider: "Mostra divisore",
    editor_show_weekday: "Mostra giorno della settimana",
    editor_show_weekday_long: "Usa nome completo (es. Lunedì)",
    editor_show_month: "Mostra mese",
    editor_show_month_long: "Usa nome completo (es. Dicembre)",
    editor_icon_show_weekday: "Scambia Mese e Giorno della settimana",
    editor_show_add_event: "Mostra pulsante Aggiungi",
    add_event_title: "Aggiungi Evento",
    add_event_name: "Titolo",
    add_event_start: "Inizio",
    add_event_end: "Fine",
    add_event_all_day: "Tutto il giorno",
    add_event_location: "Luogo",
    add_event_description: "Descrizione",
    add_event_calendar: "Calendario",
    add_event_save: "Salva",
    add_event_cancel: "Annulla",
    popup_upcoming_events: "Prossimi eventi",
    editor_show_more: "Mostra di più",
    editor_show_less: "Mostra meno",
    editor_background_color: "Colore di sfondo",
    editor_show_location: "Mostra luogo",
    editor_show_duration: "Mostra durata",
    editor_show_time: "Mostra tempo",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "giorno",
    duration_days: "giorni",
    editor_max_lines: "Numero massimo di eventi",
    group_by_date: "Raggruppa per giorno",
    group_by_date_and_calendar: "Raggruppa per giorno e calendario",
    empty: "Vuoto",
    editor_show_empty_days: "Mostra giorni vuoti"
  },
  es: {
    starts_in_min: "Empieza en {x} minuto",
    starts_in_mins: "Empieza en {x} minutos",
    starts_in_hour: "Empieza en {x} hora",
    starts_in_hours: "Empieza en {x} horas",
    starts_in_day: "Empieza en {x} día",
    starts_in_days: "Empieza en {x} días",
    starts_in_week: "Empieza en {x} semana",
    starts_in_weeks: "Empieza en {x} semanas",
    loading: "Cargando...",
    no_events: "No hay eventos",
    more_events: "+{x} más",
    editor_show_upcoming: "Mostrar próximos eventos",
    editor_unfold_events: "Desplegar eventos",
    editor_configuration: "Configuración",
    editor_text_visibility: "Visibilidad de texto",
    editor_show_divider: "Mostrar divisor",
    editor_show_weekday: "Mostrar día de la semana",
    editor_show_weekday_long: "Formato largo (ej. Lunes)",
    editor_show_month: "Mostrar mes",
    editor_show_month_long: "Formato largo (ej. Diciembre)",
    editor_icon_show_weekday: "Intercambiar Mes y Día de la semana",
    editor_show_add_event: "Mostrar botón Añadir Evento",
    add_event_title: "Añadir Evento",
    add_event_name: "Título",
    add_event_start: "Inicio",
    add_event_end: "Fin",
    add_event_all_day: "Todo el día",
    add_event_location: "Ubicación",
    add_event_description: "Descripción",
    add_event_calendar: "Calendario",
    add_event_save: "Guardar",
    add_event_cancel: "Cancelar",
    popup_upcoming_events: "Próximos eventos",
    editor_show_more: "Mostrar más",
    editor_show_less: "Mostrar menos",
    editor_background_color: "Color de fondo",
    editor_show_location: "Mostrar ubicación",
    editor_show_duration: "Mostrar duración",
    editor_show_time: "Mostrar tiempo",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "día",
    duration_days: "días",
    editor_max_lines: "Número máximo de eventos",
    group_by_date: "Agrupar por día",
    group_by_date_and_calendar: "Agrupar por día y calendario",
    empty: "Vacío",
    editor_show_empty_days: "Mostrar días vacíos"
  },
  nl: {
    starts_in_min: "Begint over {x} minuut",
    starts_in_mins: "Begint over {x} minuten",
    starts_in_hour: "Begint over {x} uur",
    starts_in_hours: "Begint over {x} uur",
    starts_in_day: "Begint over {x} dag",
    starts_in_days: "Begint over {x} dagen",
    starts_in_week: "Begint over {x} week",
    starts_in_weeks: "Begint over {x} weken",
    loading: "Laden...",
    no_events: "Geen evenementen",
    more_events: "+{x} meer",
    editor_show_upcoming: "Toon aankomende evenementen",
    editor_unfold_events: "Evenementen uitvouwen",
    editor_configuration: "Configuratie",
    editor_text_visibility: "Zichtbaarheid tekst",
    editor_show_divider: "Toon verdeler",
    editor_show_weekday: "Toon weekdag",
    editor_show_weekday_long: "Gebruik lange notatie (bijv. Maandag)",
    editor_show_month: "Toon maand",
    editor_show_month_long: "Lange notatie (bijv. December)",
    editor_icon_show_weekday: "Maand en weekdag omwisselen",
    editor_show_add_event: "Toon Toevoegen knop",
    add_event_title: "Evenement toevoegen",
    add_event_name: "Titel",
    add_event_start: "Start",
    add_event_end: "Eind",
    add_event_all_day: "Hele dag",
    add_event_location: "Locatie",
    add_event_description: "Beschrijving",
    add_event_calendar: "Kalender",
    add_event_save: "Opslaan",
    add_event_cancel: "Annuleren",
    popup_upcoming_events: "Aankomende evenementen",
    editor_show_more: "Toon meer",
    editor_show_less: "Toon minder",
    editor_background_color: "Achtergrondkleur",
    editor_show_location: "Toon locatie",
    editor_show_duration: "Toon duur",
    editor_show_time: "Toon tijd",
    duration_min: "min",
    duration_hour: "u",
    duration_day: "dag",
    duration_days: "dagen",
    editor_max_lines: "Max. weergegeven evenementen",
    group_by_date: "Groepeer per dag",
    group_by_date_and_calendar: "Groepeer per dag en kalender",
    empty: "Leeg",
    editor_show_empty_days: "Toon lege dagen"
  },
  pt: {
    starts_in_min: "Começa em {x} minuto",
    starts_in_mins: "Começa em {x} minutos",
    starts_in_hour: "Começa em {x} hora",
    starts_in_hours: "Começa em {x} horas",
    starts_in_day: "Começa em {x} dia",
    starts_in_days: "Começa em {x} dias",
    starts_in_week: "Começa em {x} semana",
    starts_in_weeks: "Começa em {x} semanas",
    loading: "A carregar...",
    no_events: "Sem eventos",
    more_events: "+{x} mais",
    editor_show_upcoming: "Mostrar próximos eventos",
    editor_unfold_events: "Desdobrar eventos",
    editor_configuration: "Configuração",
    editor_text_visibility: "Visibilidade do texto",
    editor_show_divider: "Mostrar divisor",
    editor_show_weekday: "Mostrar dia da semana",
    editor_show_weekday_long: "Formato longo (ex. Segunda-feira)",
    editor_show_month: "Mostrar mês",
    editor_show_month_long: "Formato longo (ex. Dezembro)",
    editor_icon_show_weekday: "Trocar Mês e Dia da semana",
    editor_show_add_event: "Mostrar botão Adicionar",
    add_event_title: "Adicionar evento",
    add_event_name: "Título",
    add_event_start: "Início",
    add_event_end: "Fim",
    add_event_all_day: "Dia inteiro",
    add_event_location: "Local",
    add_event_description: "Descrição",
    add_event_calendar: "Calendário",
    add_event_save: "Salvar",
    add_event_cancel: "Cancelar",
    popup_upcoming_events: "Próximos eventos",
    editor_show_more: "Mostrar mais",
    editor_show_less: "Mostrar menos",
    editor_background_color: "Cor de fundo",
    editor_show_location: "Mostrar local",
    editor_show_duration: "Mostrar duração",
    editor_show_time: "Mostrar hora",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "dia",
    duration_days: "dias",
    editor_max_lines: "Máximo de eventos exibidos",
    group_by_date: "Agrupar por dia",
    group_by_date_and_calendar: "Agrupar por dia e calendário",
    empty: "Vazio",
    editor_show_empty_days: "Mostrar dias vazios"
  },
  ru: {
    starts_in_min: "Начнется через {x} минуту",
    starts_in_mins: "Начнется через {x} мин.",
    starts_in_hour: "Начнется через {x} час",
    starts_in_hours: "Начнется через {x} ч.",
    starts_in_day: "Начнется через {x} день",
    starts_in_days: "Начнется через {x} дн.",
    starts_in_week: "Начнется через {x} неделю",
    starts_in_weeks: "Начнется через {x} нед.",
    loading: "Загрузка...",
    no_events: "Нет событий",
    more_events: "ещё +{x}",
    editor_show_upcoming: "Показать предстоящие события",
    editor_unfold_events: "Развернуть события",
    editor_configuration: "Конфигурация",
    editor_text_visibility: "Видимость текста",
    editor_show_divider: "Показать разделитель",
    editor_show_weekday: "Показать день недели",
    editor_show_weekday_long: "Использовать полное название (напр. Понедельник)",
    editor_show_month: "Показать месяц",
    editor_show_month_long: "Использовать полное название (напр. Декабрь)",
    editor_icon_show_weekday: "Поменять местами Месяц и День недели",
    editor_show_add_event: "Показать кнопку Добавить",
    add_event_title: "Добавить событие",
    add_event_name: "Название",
    add_event_start: "Начало",
    add_event_end: "Конец",
    add_event_all_day: "Весь день",
    add_event_location: "Место",
    add_event_description: "Описание",
    add_event_calendar: "Календарь",
    add_event_save: "Сохранить",
    add_event_cancel: "Отмена",
    popup_upcoming_events: "Предстоящие события",
    editor_show_more: "Показать больше",
    editor_show_less: "Показать меньше",
    editor_background_color: "Цвет фона",
    editor_show_location: "Показать место",
    editor_show_duration: "Показать продолжительность",
    editor_show_time: "Показать время",
    duration_min: "мин",
    duration_hour: "ч",
    duration_day: "день",
    duration_days: "дней",
    editor_max_lines: "Максимум отобр. событий",
    group_by_date: "Группировать по дням",
    group_by_date_and_calendar: "Группировать по дням и календарю",
    empty: "Пусто",
    editor_show_empty_days: "Показать пустые дни"
  },
  pl: {
    starts_in_min: "Rozpoczyna się za {x} minutę",
    starts_in_mins: "Rozpoczyna się za {x} min.",
    starts_in_hour: "Rozpoczyna się za {x} godzinę",
    starts_in_hours: "Rozpoczyna się za {x} godz.",
    starts_in_day: "Rozpoczyna się za {x} dzień",
    starts_in_days: "Rozpoczyna się za {x} dni",
    starts_in_week: "Rozpoczyna się za {x} tydzień",
    starts_in_weeks: "Rozpoczyna się za {x} tyg.",
    loading: "Ładowanie...",
    no_events: "Brak wydarzeń",
    more_events: "+{x} więcej",
    editor_show_upcoming: "Pokaż nadchodzące wydarzenia",
    editor_unfold_events: "Rozwiń wydarzenia",
    editor_configuration: "Konfiguracja",
    editor_text_visibility: "Widoczność tekstu",
    editor_show_divider: "Pokaż dzielnik",
    editor_show_weekday: "Pokaż dzień tygodnia",
    editor_show_weekday_long: "Użyj pełnej nazwy (np. Poniedziałek)",
    editor_show_month: "Pokaż miesiąc",
    editor_show_month_long: "Użyj pełnej nazwy (np. Grudzień)",
    editor_icon_show_weekday: "Zamień Miesiąc i Dzień tygodnia",
    editor_show_add_event: "Pokaż przycisk Dodaj",
    add_event_title: "Dodaj wydarzenie",
    add_event_name: "Tytuł",
    add_event_start: "Początek",
    add_event_end: "Koniec",
    add_event_all_day: "Cały dzień",
    add_event_location: "Lokalizacja",
    add_event_description: "Opis",
    add_event_calendar: "Kalendarz",
    add_event_save: "Zapisz",
    add_event_cancel: "Anuluj",
    popup_upcoming_events: "Nadchodzące wydarzenia",
    editor_show_more: "Pokaż więcej",
    editor_show_less: "Pokaż mniej",
    editor_background_color: "Kolor tła",
    editor_show_location: "Pokaż lokalizację",
    editor_show_duration: "Pokaż czas trwania",
    editor_show_time: "Pokaż czas",
    duration_min: "min",
    duration_hour: "godz",
    duration_day: "dzień",
    duration_days: "dni",
    editor_max_lines: "Maks. wyświetlane wydarzenia",
    group_by_date: "Grupuj według dnia",
    group_by_date_and_calendar: "Grupuj według dnia i kalendarza",
    empty: "Pusty",
    editor_show_empty_days: "Pokaż puste dni"
  },
  sv: {
    starts_in_min: "Börjar om {x} minut",
    starts_in_mins: "Börjar om {x} minuter",
    starts_in_hour: "Börjar om {x} timme",
    starts_in_hours: "Börjar om {x} timmar",
    starts_in_day: "Börjar om {x} dag",
    starts_in_days: "Börjar om {x} dagar",
    starts_in_week: "Börjar om {x} vecka",
    starts_in_weeks: "Börjar om {x} veckor",
    loading: "Laddar...",
    no_events: "Inga händelser",
    more_events: "+{x} till",
    editor_show_upcoming: "Visa kommande händelser",
    editor_unfold_events: "Fäll ut evenemang",
    editor_configuration: "Konfiguration",
    editor_text_visibility: "Textsynlighet",
    editor_show_divider: "Visa avdelare",
    editor_show_weekday: "Visa veckodag",
    editor_show_weekday_long: "Använd långt format (t.ex. Måndag)",
    editor_show_month: "Visa månad",
    editor_show_month_long: "Använd långt format (t.ex. December)",
    editor_icon_show_weekday: "Byt plats mellan Månad och Veckodag",
    editor_show_add_event: "Visa Lägg till-knapp",
    add_event_title: "Lägg till händelse",
    add_event_name: "Titel",
    add_event_start: "Start",
    add_event_end: "Slut",
    add_event_all_day: "Heldag",
    add_event_location: "Plats",
    add_event_description: "Beskrivning",
    add_event_calendar: "Kalender",
    add_event_save: "Spara",
    add_event_cancel: "Avbryt",
    popup_upcoming_events: "Kommande händelser",
    editor_show_more: "Visa mer",
    editor_show_less: "Visa mindre",
    editor_background_color: "Bakgrundsfärg",
    editor_show_location: "Visa plats",
    editor_show_duration: "Visa varaktighet",
    editor_show_time: "Visa tid",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "dag",
    duration_days: "dagar",
    editor_max_lines: "Max. visade händelser",
    group_by_date: "Gruppera per dag",
    group_by_date_and_calendar: "Gruppera per dag och kalender",
    empty: "Tom",
    editor_show_empty_days: "Visa tomma dagar"
  },
  da: {
    starts_in_min: "Starter om {x} minut",
    starts_in_mins: "Starter om {x} minutter",
    starts_in_hour: "Starter om {x} time",
    starts_in_hours: "Starter om {x} timer",
    starts_in_day: "Starter om {x} dag",
    starts_in_days: "Starter om {x} dage",
    starts_in_week: "Starter om {x} uge",
    starts_in_weeks: "Starter om {x} uger",
    loading: "Indlæser...",
    no_events: "Ingen begivenheder",
    more_events: "+{x} mere",
    editor_show_upcoming: "Vis kommende begivenheder",
    editor_unfold_events: "Udfold begivenheder",
    editor_configuration: "Konfiguration",
    editor_text_visibility: "Tekst og synlighed",
    editor_show_divider: "Vis skillelinje",
    editor_show_weekday: "Vis ugedag",
    editor_show_weekday_long: "Brug langt format (f.eks. Mandag)",
    editor_show_month: "Vis måned",
    editor_show_month_long: "Brug langt format (f.eks. December)",
    editor_icon_show_weekday: "Skift Måned og Ugedag",
    editor_show_add_event: "Vis Tilføj-knap",
    add_event_title: "Tilføj begivenhed",
    add_event_name: "Titel",
    add_event_start: "Start",
    add_event_end: "Slut",
    add_event_all_day: "Hele dagen",
    add_event_location: "Sted",
    add_event_description: "Beskrivelse",
    add_event_calendar: "Kalender",
    add_event_save: "Gem",
    add_event_cancel: "Annuller",
    popup_upcoming_events: "Kommende begivenheder",
    editor_show_more: "Vis mere",
    editor_show_less: "Vis mindre",
    editor_background_color: "Baggrundsfarve",
    editor_show_location: "Vis sted",
    editor_show_duration: "Vis varighed",
    editor_show_time: "Vis tid",
    duration_min: "min",
    duration_hour: "t",
    duration_day: "dag",
    duration_days: "dage",
    editor_max_lines: "Maks. viste begivenheder",
    group_by_date: "Gruppér efter dag",
    group_by_date_and_calendar: "Gruppér efter dag og kalender",
    empty: "Tom",
    editor_show_empty_days: "Vis tomme dage"
  },
  no: {
    starts_in_min: "Starter om {x} minutt",
    starts_in_mins: "Starter om {x} minutter",
    starts_in_hour: "Starter om {x} time",
    starts_in_hours: "Starter om {x} timer",
    starts_in_day: "Starter om {x} dag",
    starts_in_days: "Starter om {x} dager",
    starts_in_week: "Starter om {x} uke",
    starts_in_weeks: "Starter om {x} uker",
    loading: "Laster...",
    no_events: "Ingen hendelser",
    more_events: "+{x} til",
    editor_show_upcoming: "Vis kommende hendelser",
    editor_unfold_events: "Brett ut hendelser",
    editor_configuration: "Konfigurasjon",
    editor_text_visibility: "Tekstsynlighet",
    editor_show_divider: "Vis skillelinje",
    editor_show_weekday: "Vis ukedag",
    editor_show_weekday_long: "Bruk langt format (f.eks. Mandag)",
    editor_show_month: "Vis måned",
    editor_show_month_long: "Bruk langt format (f.eks. Desember)",
    editor_icon_show_weekday: "Bytt Måned og Ukedag",
    editor_show_add_event: "Vis Legg til-knapp",
    add_event_title: "Legg til hendelse",
    add_event_name: "Tittel",
    add_event_start: "Start",
    add_event_end: "Slutt",
    add_event_all_day: "Hele dagen",
    add_event_location: "Sted",
    add_event_description: "Beskrivelse",
    add_event_calendar: "Kalender",
    add_event_save: "Lagre",
    add_event_cancel: "Avbryt",
    popup_upcoming_events: "Kommende hendelser",
    editor_show_more: "Vis mer",
    editor_show_less: "Vis mindre",
    editor_background_color: "Bakgrunnsfarge",
    editor_show_location: "Vis sted",
    editor_show_duration: "Vis varighet",
    editor_show_time: "Vis tid",
    duration_min: "min",
    duration_hour: "t",
    duration_day: "dag",
    duration_days: "dager",
    editor_max_lines: "Maks. viste hendelser",
    group_by_date: "Grupper etter dag",
    group_by_date_and_calendar: "Grupper etter dag og kalender",
    empty: "Tom",
    editor_show_empty_days: "Vis tomme dager"
  },
  fi: {
    starts_in_min: "Alkaa {x} minuutin kuluttua",
    starts_in_mins: "Alkaa {x} minuutin kuluttua",
    starts_in_hour: "Alkaa {x} tunnin kuluttua",
    starts_in_hours: "Alkaa {x} tunnin kuluttua",
    starts_in_day: "Alkaa {x} päivän kuluttua",
    starts_in_days: "Alkaa {x} päivän kuluttua",
    starts_in_week: "Alkaa {x} viikon kuluttua",
    starts_in_weeks: "Alkaa {x} viikon kuluttua",
    loading: "Ladataan...",
    no_events: "Ei tapahtumia",
    more_events: "+{x} lisää",
    editor_show_upcoming: "Näytä tulevat tapahtumat",
    editor_unfold_events: "Avaa tapahtumat",
    editor_configuration: "Määritys",
    editor_text_visibility: "Tekstin näkyvyys",
    editor_show_divider: "Näytä jakaja",
    editor_show_weekday: "Näytä viikonpäivä",
    editor_show_weekday_long: "Käytä pitkää nimeä (esim. Maanantai)",
    editor_show_month: "Näytä kuukausi",
    editor_show_month_long: "Käytä pitkää nimeä (esim. Joulukuu)",
    editor_icon_show_weekday: "Vaihda Kuukausi ja Viikonpäivä",
    editor_show_add_event: "Näytä Lisää-painike",
    add_event_title: "Lisää tapahtuma",
    add_event_name: "Nimi",
    add_event_start: "Alku",
    add_event_end: "Loppu",
    add_event_all_day: "Koko päivä",
    add_event_location: "Sijainti",
    add_event_description: "Kuvaus",
    add_event_calendar: "Kalenteri",
    add_event_save: "Tallenna",
    add_event_cancel: "Peruuta",
    popup_upcoming_events: "Tulevat tapahtumat",
    editor_show_more: "Näytä enemmän",
    editor_show_less: "Näytä vähemmän",
    editor_background_color: "Taustaväri",
    editor_show_location: "Näytä sijainti",
    editor_show_duration: "Näytä kesto",
    editor_show_time: "Näytä aika",
    duration_min: "min",
    duration_hour: "t",
    duration_day: "päivä",
    duration_days: "päivää",
    editor_max_lines: "Näytettävien tapahtumien enimmäismäärä",
    group_by_date: "Ryhmittele päivän mukaan",
    group_by_date_and_calendar: "Ryhmittele päivän ja kalenterin mukaan",
    empty: "Tyhjä",
    editor_show_empty_days: "Näytä tyhjät päivät"
  },
  cs: {
    starts_in_min: "Začíná za {x} minutu",
    starts_in_mins: "Začíná za {x} minut",
    starts_in_hour: "Začíná za {x} hodinu",
    starts_in_hours: "Začíná za {x} hodin",
    starts_in_day: "Začíná za {x} den",
    starts_in_days: "Začíná za {x} dní",
    starts_in_week: "Začíná za {x} týden",
    starts_in_weeks: "Začíná za {x} týdnů",
    loading: "Načítání...",
    no_events: "Žádné události",
    more_events: "+{x} další",
    editor_show_upcoming: "Zobrazit nadcházející události",
    editor_unfold_events: "Rozvinout události",
    editor_configuration: "Konfigurace",
    editor_text_visibility: "Viditelnost textu",
    editor_show_divider: "Zobrazit dělič",
    editor_show_weekday: "Zobrazit den v týdnu",
    editor_show_weekday_long: "Použít celý název (např. Pondělí)",
    editor_show_month: "Zobrazit měsíc",
    editor_show_month_long: "Použít celý název (např. Prosinec)",
    editor_icon_show_weekday: "Vyměnit Měsíc a Den v týdnu",
    editor_show_add_event: "Zobrazit tlačítko Přidat",
    add_event_title: "Přidat událost",
    add_event_name: "Název",
    add_event_start: "Začátek",
    add_event_end: "Konec",
    add_event_all_day: "Celý den",
    add_event_location: "Místo",
    add_event_description: "Popis",
    add_event_calendar: "Kalendář",
    add_event_save: "Uložit",
    add_event_cancel: "Zrušit",
    popup_upcoming_events: "Nadcházející události",
    editor_show_more: "Zobrazit více",
    editor_show_less: "Zobrazit méně",
    editor_background_color: "Barva pozadí",
    editor_show_location: "Zobrazit místo",
    editor_show_duration: "Zobrazit dobu trvání",
    editor_show_time: "Zobrazit čas",
    duration_min: "min",
    duration_hour: "h",
    duration_day: "den",
    duration_days: "dní",
    editor_max_lines: "Max. zobrazované události",
    group_by_date: "Seskupit podle dne",
    group_by_date_and_calendar: "Seskupit podle dne a kalendáře",
    empty: "Prázdné",
    editor_show_empty_days: "Zobrazit prázdné dny"
  },
  hu: {
    starts_in_min: "Kezdés {x} perc múlva",
    starts_in_mins: "Kezdés {x} perc múlva",
    starts_in_hour: "Kezdés {x} óra múlva",
    starts_in_hours: "Kezdés {x} óra múlva",
    starts_in_day: "Kezdés {x} nap múlva",
    starts_in_days: "Kezdés {x} nap múlva",
    starts_in_week: "Kezdés {x} hét múlva",
    starts_in_weeks: "Kezdés {x} hét múlva",
    loading: "Betöltés...",
    no_events: "Nincs esemény",
    more_events: "+{x} további",
    editor_show_upcoming: "Közelgő események megjelenítése",
    editor_unfold_events: "Események kibontása",
    editor_configuration: "Konfiguráció",
    editor_text_visibility: "Szöveg láthatósága",
    editor_show_divider: "Osztó megjelenítése",
    editor_show_weekday: "Hét napjának mutatása",
    editor_show_weekday_long: "Hosszú formátum (pl. Hétfő)",
    editor_show_month: "Hó megjelenítése",
    editor_show_month_long: "Hosszú formátum (pl. December)",
    editor_icon_show_weekday: "Hó és Hét napja felcserélése",
    editor_show_add_event: "Hozzáadás gomb mutatása",
    add_event_title: "Esemény Hozzáadása",
    add_event_name: "Cím",
    add_event_start: "Kezdés",
    add_event_end: "Befejezés",
    add_event_all_day: "Egész napos",
    add_event_location: "Helyszín",
    add_event_description: "Leírás",
    add_event_calendar: "Naptár",
    add_event_save: "Mentés",
    add_event_cancel: "Mégse",
    popup_upcoming_events: "Közelgő események",
    editor_show_more: "Több mutatása",
    editor_show_less: "Kevesebb mutatása",
    editor_background_color: "Háttérszín",
    editor_show_location: "Helyszín mutatása",
    editor_show_duration: "Időtartam mutatása",
    editor_show_time: "Idő mutatása",
    duration_min: "perc",
    duration_hour: "ó",
    duration_day: "nap",
    duration_days: "nap",
    editor_max_lines: "Max. megjelenített események",
    group_by_date: "Csoportosítás nap szerint",
    group_by_date_and_calendar: "Csoportosítás nap és naptár szerint",
    empty: "Üres",
    editor_show_empty_days: "Üres napok mutatása"
  }
};
function le(n, e, t, i) {
  var r;
  const a = ((r = n.locale) == null ? void 0 : r.language) || n.language || "en";
  let o;
  if (O[a] && O[a][e])
    o = O[a][e];
  else if (O.en && O.en[e])
    o = O.en[e];
  else
    return e;
  return o;
}
var Oe = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, bt = (n, e, t) => e in n ? Oe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, D = (n, e, t, i) => {
  for (var a = i > 1 ? void 0 : i ? wt(e, t) : e, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (a = (i ? r(e, t, a) : r(a)) || a);
  return i && a && Oe(e, t, a), a;
}, xt = (n, e, t) => bt(n, e + "", t);
let k = class extends U {
  constructor() {
    super(...arguments);
    y(this, "hass");
    y(this, "config");
    y(this, "open", !1);
    y(this, "mode", "detail");
    y(this, "detailTitle", "");
    y(this, "detailEvents", []);
    y(this, "_addEventState", { open: !1 });
    y(this, "_opener", null);
    y(this, "_onEventSaved", null);
    y(this, "_onPopState", (e) => {
      var t;
      this.open && !((t = window.history.state) != null && t.calendarCardPlusPopup) && this._close();
    });
    y(this, "_close", () => {
      if (!this.open) return;
      this.open = !1, this.requestUpdate();
      const e = { dialog: this };
      this.dispatchEvent(
        new CustomEvent("closed", { bubbles: !0, composed: !0, detail: e })
      ), this.dispatchEvent(
        new CustomEvent("dialog-closed", {
          bubbles: !0,
          composed: !0,
          detail: e
        })
      ), this.dispatchEvent(
        new CustomEvent("popup-closed", {
          bubbles: !0,
          composed: !0,
          detail: e
        })
      );
    });
    y(this, "_onDialogClosed", (e) => {
      var t;
      if (e && e.type !== "click") {
        const i = e.target;
        if (i && i.tagName !== "HA-ADAPTIVE-DIALOG" && i.tagName !== "HA-DIALOG")
          return;
      }
      this._close(), (t = window.history.state) != null && t.calendarCardPlusPopup && window.history.back();
    });
    y(this, "_closeDialog", () => {
      var e;
      this.open && (this._close(), (e = window.history.state) != null && e.calendarCardPlusPopup && window.history.back());
    });
  }
  async showDialog(e) {
    this.hass = e.hass, this.config = e.config, this._opener = e.opener, this.mode = e.mode, e.title && (this.detailTitle = e.title), e.events && (this.detailEvents = e.events), e.addEventState && (this._addEventState = e.addEventState), e.onEventSaved && (this._onEventSaved = e.onEventSaved), this.open = !0, window.history.pushState({ calendarCardPlusPopup: !0 }, ""), this.requestUpdate(), await this.updateComplete;
    const t = this.renderRoot.querySelector("ha-adaptive-dialog");
    if (t && t.shadowRoot) {
      const i = t.shadowRoot.querySelector("ha-bottom-sheet");
      i && (i.style.removeProperty("--dialog-transform"), i.style.removeProperty("--dialog-transition"));
    }
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("popstate", this._onPopState);
  }
  _updateAddEventState(e) {
    this._addEventState = { ...this._addEventState, ...e }, this.requestUpdate();
  }
  async _handleSave() {
    await yt(
      this.hass,
      this._addEventState,
      () => {
        this.dispatchEvent(
          new CustomEvent("event-saved", { bubbles: !0, composed: !0 })
        ), this._onEventSaved && this._onEventSaved(), this._closeDialog();
      },
      (e) => {
        this.hass.callService("persistent_notification", "create", {
          title: "Calendar Card Plus",
          message: "Error saving event: " + e.message
        });
      }
    );
  }
  render() {
    var i;
    const e = this.mode === "add-event", t = e ? ((i = this.hass) == null ? void 0 : i.localize("ui.components.calendar.event.add")) || "Add Event" : this.detailTitle;
    return u`
      <ha-adaptive-dialog
        .hass=${this.hass}
        .open=${this.open}
        .headerTitle=${t}
        @closed=${this._onDialogClosed}
        @ha-dialog-closed=${this._onDialogClosed}
        flexcontent
      >
        <div class="dialog-content scrollable ha-scrollbar">
          ${e ? ft(
      this.hass,
      this.config,
      this._addEventState,
      this._updateAddEventState.bind(this),
      this._closeDialog.bind(this),
      this._handleSave.bind(this)
    ) : this._renderDetailContent()}
        </div>
      </ha-adaptive-dialog>
    `;
  }
  _renderDetailContent() {
    return this.config.group_by_date_and_calendar ? _t(this.detailEvents).map((t) => {
      const i = t.date, a = oe(t.events[0].entity_id, this.config), o = se(
        this.hass,
        i,
        a,
        this.config.dark_mode ?? !1
      ), d = `background-color: ${re(
        t.events[0].entity_id,
        this.config
      )}; border: none;`;
      return u`
          <div
            class="calendar-item grouped detail"
            style="align-items: center; ${d}"
          >
            <div class="calendar-icon dynamic">${o}</div>
            <div class="calendar-content">
              ${t.events.map((s) => {
        var N;
        const l = s.is_empty ? le(this.hass, "empty") : s.summary, _ = new Date(
          s.start.dateTime || s.start.date
        ), c = new Date(s.end.dateTime || s.end.date), h = !s.start.dateTime, m = de(
          this.hass,
          _,
          c,
          h
        ), g = ((N = this.hass.locale) == null ? void 0 : N.language) || this.hass.language || navigator.language, w = (p) => p.toLocaleTimeString(g, {
          hour: "2-digit",
          minute: "2-digit"
        }), T = `${w(_)} - ${w(c)}`, b = this.config.show_date ?? !1, x = this.config.show_time ?? !1, E = this.hass.localize(
          "component.calendar.entity_component._.state_attributes.all_day.name"
        ) || "All day";
        let v = "";
        if (s.is_empty)
          v = "";
        else if (b || x)
          if (h) {
            const p = b ? _.toLocaleDateString(g, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            }) : "";
            b && x ? v = `${p}, ${E}` : v = p || E;
          } else {
            const p = [];
            b && p.push(
              _.toLocaleDateString(g, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })
            ), x && p.push(T), v = p.join(", ");
          }
        else
          v = h ? E : w(_);
        if (!s.is_empty && this.config.show_duration && (v.endsWith(m) || (v += ` • ${m}`)), !s.is_empty && this.config.show_weekday) {
          const p = _.toLocaleDateString(g, {
            weekday: this.config.show_weekday_long ? "long" : "short"
          });
          v.includes(p) || (v += ` • ${p}`);
        }
        return u`
                  <div
                    class="event-entry"
                    @click=${() => s.is_empty ? null : this._handleMoreInfo(s.entity_id)}
                    style="margin-bottom: 4px; ${s.is_empty ? "opacity: 0.7; cursor: default;" : ""}"
                  >
                    <div class="event-title">${l}</div>
                    <div
                      class="event-time"
                      style="display: flex; align-items: center; gap: 4px;"
                    >
                      ${!s.is_empty && (b || x) ? u`<ha-icon
                            icon="mdi:clock-time-four-outline"
                            style="--mdc-icon-size: 14px;"
                          ></ha-icon>` : ""}
                      ${v}
                    </div>
                    ${!s.is_empty && this.config.show_location && s.location ? u`
                          <div class="event-location">
                            <ha-icon
                              icon="mdi:map-marker"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${s.location}
                          </div>
                        ` : ""}
                    ${this.config.show_calendar_name && s.calendar_name ? u`
                          <div class="event-calendar">
                            <ha-icon
                              icon="mdi:calendar-blank-multiple"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${s.calendar_name}
                          </div>
                        ` : ""}
                  </div>
                `;
      })}
            </div>
          </div>
          ${this.config.show_divider ? u`<div class="calendar-divider"></div>` : ""}
        `;
    }) : this.config.group_by_date ? Ne(this.detailEvents).map((t) => {
      const i = t.date, a = oe(t.events[0].entity_id, this.config), o = se(
        this.hass,
        i,
        a,
        this.config.dark_mode ?? !1
      ), d = `background-color: ${re(
        t.events[0].entity_id,
        this.config
      )}; border: none;`;
      return u`
          <div
            class="calendar-item grouped detail"
            style="align-items: center; ${d}"
          >
            <div class="calendar-icon dynamic">${o}</div>
            <div class="calendar-content">
              ${t.events.map((s) => {
        var N;
        const l = s.is_empty ? le(this.hass, "empty") : s.summary, _ = new Date(
          s.start.dateTime || s.start.date
        ), c = new Date(s.end.dateTime || s.end.date), h = !s.start.dateTime, m = de(
          this.hass,
          _,
          c,
          h
        ), g = ((N = this.hass.locale) == null ? void 0 : N.language) || this.hass.language || navigator.language, w = (p) => p.toLocaleTimeString(g, {
          hour: "2-digit",
          minute: "2-digit"
        }), T = `${w(_)} - ${w(c)}`, b = this.config.show_date ?? !1, x = this.config.show_time ?? !1, E = this.hass.localize(
          "component.calendar.entity_component._.state_attributes.all_day.name"
        ) || "All day";
        let v = "";
        if (s.is_empty)
          v = "";
        else if (b || x)
          if (h) {
            const p = b ? _.toLocaleDateString(g, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            }) : "";
            b && x ? v = `${p}, ${E}` : v = p || E;
          } else {
            const p = [];
            b && p.push(
              _.toLocaleDateString(g, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })
            ), x && p.push(T), v = p.join(", ");
          }
        else
          v = h ? E : w(_);
        if (!s.is_empty && this.config.show_duration && (v.endsWith(m) || (v += ` • ${m}`)), !s.is_empty && this.config.show_weekday) {
          const p = _.toLocaleDateString(g, {
            weekday: this.config.show_weekday_long ? "long" : "short"
          });
          v.includes(p) || (v += ` • ${p}`);
        }
        return u`
                  <div
                    class="event-entry"
                    @click=${() => s.is_empty ? null : this._handleMoreInfo(s.entity_id)}
                    style="margin-bottom: 4px; ${s.is_empty ? "opacity: 0.7; cursor: default;" : ""}"
                  >
                    <div class="event-title">${l}</div>
                    <div
                      class="event-time"
                      style="display: flex; align-items: center; gap: 4px;"
                    >
                      ${!s.is_empty && (b || x) ? u`<ha-icon
                            icon="mdi:clock-time-four-outline"
                            style="--mdc-icon-size: 14px;"
                          ></ha-icon>` : ""}
                      ${v}
                    </div>
                    ${!s.is_empty && this.config.show_location && s.location ? u`
                          <div class="event-location">
                            <ha-icon
                              icon="mdi:map-marker"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${s.location}
                          </div>
                        ` : ""}
                    ${this.config.show_calendar_name && s.calendar_name ? u`
                          <div class="event-calendar">
                            <ha-icon
                              icon="mdi:calendar-blank-multiple"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${s.calendar_name}
                          </div>
                        ` : ""}
                  </div>
                `;
      })}
            </div>
          </div>
          ${this.config.show_divider ? u`<div class="calendar-divider"></div>` : ""}
        `;
    }) : this.detailEvents.map((e, t) => {
      var me;
      const i = e.is_empty ? le(this.hass, "empty") : e.summary;
      let a = "", o, r;
      try {
        o = new Date(e.start.dateTime || e.start.date), r = new Date(e.end.dateTime || e.end.date);
      } catch {
        return u`<div class="error">Date Error</div>`;
      }
      const d = /* @__PURE__ */ new Date(), s = !e.start.dateTime, l = ((me = this.hass.locale) == null ? void 0 : me.language) || this.hass.language || navigator.language, _ = ($) => $.toLocaleTimeString(l, { hour: "2-digit", minute: "2-digit" }), c = de(this.hass, o, r, s), h = `${_(o)} - ${_(r)}`, m = this.config.show_date ?? !1, g = this.config.show_time ?? !1, w = this.hass.localize(
        "component.calendar.entity_component._.state_attributes.all_day.name"
      ) || "All day";
      if (e.is_empty)
        a = "";
      else if (m || g)
        if (s) {
          const $ = m ? o.toLocaleDateString(l, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          }) : "";
          m && g ? a = `${$}, ${w}` : a = $ || w;
        } else {
          const $ = [];
          m && $.push(
            o.toLocaleDateString(l, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })
          ), g && $.push(h), a = $.join(", ");
        }
      else if (o > d) {
        const $ = o.getTime() - d.getTime(), Be = Math.ceil($ / 6e4);
        a = lt(this.hass, Be);
      } else
        a = s ? w : _(o);
      if (!e.is_empty && this.config.show_duration && (a ? a.endsWith(c) || (a += ` • ${c}`) : a = c), !e.is_empty && this.config.show_weekday) {
        const $ = o.toLocaleDateString(l, {
          weekday: this.config.show_weekday_long ? "long" : "short"
        });
        a += ` • ${$}`;
      }
      const b = !e.is_empty && o <= d && r >= d ? d : o, x = e.is_empty ? "var(--disabled-text-color, #bdbdbb)" : oe(e.entity_id, this.config), E = se(
        this.hass,
        b,
        x,
        this.config.dark_mode ?? !1
      ), v = this.config.show_divider && t > 0, p = `background-color: ${re(e.entity_id, this.config)}; border: none;`;
      return u`
        ${v ? u`<div class="calendar-divider"></div>` : ""}
        <div
          class="calendar-item detail"
          style="${p} ${e.is_empty ? "cursor: default; opacity: 0.7;" : ""}"
          @click=${() => e.is_empty ? null : this._handleMoreInfo(e.entity_id)}
        >
          <div class="calendar-icon dynamic">${E}</div>
          <div class="calendar-content">
            <div class="event-title">${i}</div>
            <div class="event-time">
              ${!e.is_empty && (m || g) ? u`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ""}
              ${a}
            </div>
            ${!e.is_empty && this.config.show_location && e.location ? u`
                  <div class="event-location">
                    <ha-icon icon="mdi:map-marker"></ha-icon>
                    ${e.location}
                  </div>
                ` : ""}
            ${this.config.show_calendar_name && e.calendar_name ? u`
                  <div class="event-calendar">
                    <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
                    ${e.calendar_name}
                  </div>
                ` : ""}
          </div>
        </div>
      `;
    });
  }
  _handleMoreInfo(e) {
    const t = new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    });
    this._opener ? this._opener.dispatchEvent(t) : window.dispatchEvent(t);
  }
};
xt(k, "styles", Te`
    :host {
      display: block;
    }

    ha-adaptive-dialog {
      --dialog-content-padding: 0px 12px 12px;
      --ha-dialog-max-width: 96vw !important;
      --ha-bottom-sheet-height: calc(
        100dvh - max(var(--safe-area-inset-top), 48px)
      ) !important;
      --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height) !important;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dialog-title {
      font-size: 1.1em;
      font-weight: 500;
      flex: 1;
    }

    .dialog-content {
      padding: 0 8px 8px 8px;
      min-width: 320px;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px 16px 16px;
    }

    .calendar-item {
      display: flex;
      align-items: center;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .calendar-item.detail {
      background-color: var(
        --ha-card-background,
        var(--card-background-color, white)
      );
      border: var(--ha-card-border-width, 1px) solid
        var(--ha-card-border-color, var(--divider-color, #e0e0e0));
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 12px;
      margin-bottom: 8px;
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .calendar-item.detail:hover {
      background-color: var(--secondary-background-color);
    }

    .calendar-icon {
      width: 40px;
      height: 40px;
      margin-right: 12px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
    }

    .calendar-content {
      flex: 1;
      min-width: 0;
    }

    .event-title {
      font-weight: 500;
      font-size: 1.1em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .event-time {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    .event-time ha-icon {
      --mdc-icon-size: 14px;
      color: var(--secondary-text-color);
    }
    .event-location,
    .event-calendar {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
      margin-top: 1px;
    }
    .event-location ha-icon,
    .event-calendar ha-icon {
      --mdc-icon-size: 14px;
      color: var(--secondary-text-color);
    }

    .calendar-divider {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      margin: 4px 12px;
    }

    .add-event-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .add-event-form .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .add-event-form .field-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }

    .add-event-form .field-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
    }

    .add-event-form .field-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .add-event-form select.field-input {
      cursor: pointer;
      appearance: auto;
    }

    .row-flex {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .date-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .date-row .field-input {
      flex: 1;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }

    .calendar-item.grouped .calendar-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .calendar-item.grouped .event-entry {
      display: flex;
      flex-direction: column;
    }
    .calendar-item.grouped .calendar-icon {
      align-self: center;
    }
  `);
D([
  S({ attribute: !1 })
], k.prototype, "hass", 2);
D([
  S({ attribute: !1 })
], k.prototype, "config", 2);
D([
  S({ type: Boolean })
], k.prototype, "open", 2);
D([
  S({ type: String })
], k.prototype, "mode", 2);
D([
  S({ type: String })
], k.prototype, "detailTitle", 2);
D([
  S({ type: Array })
], k.prototype, "detailEvents", 2);
D([
  Y()
], k.prototype, "_addEventState", 2);
k = D([
  je("calendar-card-plus-popup")
], k);
const $t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusPopup() {
    return k;
  }
}, Symbol.toStringTag, { value: "Module" }));
var kt = Object.defineProperty, Et = Object.getOwnPropertyDescriptor, V = (n, e, t, i) => {
  for (var a = i > 1 ? void 0 : i ? Et(e, t) : e, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (a = (i ? r(e, t, a) : r(a)) || a);
  return i && a && kt(e, t, a), a;
};
const At = [
  "#2196F3",
  // Montag (Blau)
  "#8BC34A",
  // Dienstag (Grün)
  "#E91E63",
  // Mittwoch (Pink)
  "#FF9800",
  // Donnerstag (Orange)
  "#00BCD4",
  // Freitag (Türkis)
  "#9C27B0",
  // Samstag (Violett)
  "#F44336"
  // Sonntag (Rot)
];
function Tt(n) {
  const e = n.getDay(), t = e === 0 ? 6 : e - 1;
  return At[t];
}
let j = class extends U {
  constructor() {
    super(...arguments);
    y(this, "hass");
    y(this, "config");
    y(this, "_events");
    y(this, "_customStart");
    y(this, "_customEnd");
    y(this, "_handleRangeChanged", (e) => {
      this._customStart = e.detail.start, this._customEnd = e.detail.end, this._fetchEvents();
    });
    y(this, "_handleShowDetail", async (e) => {
      this._showPopup("calendar-card-plus-popup", {
        hass: this.hass,
        config: this.config,
        opener: this,
        mode: "detail",
        title: e.detail.title,
        events: e.detail.entities
      });
    });
    y(this, "_handleAddEvent", (e) => {
      let t = e.detail.calendarId;
      if (!t) {
        const i = Object.keys(this.hass.states).filter((a) => a.startsWith("calendar."));
        t = i.length > 0 ? i[0] : "";
      }
      this.dispatchEvent(
        new CustomEvent("show-dialog", {
          bubbles: !0,
          composed: !0,
          detail: {
            dialogTag: "ha-dialog-calendar-event-editor",
            dialogParams: {
              calendarId: t,
              selectedDate: e.detail.selectedDate
            }
          }
        })
      );
    });
    y(this, "_onEventSaved", () => {
      this._events = void 0, this.requestUpdate(), this._fetchEvents();
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("calendar-card-show-detail", this._handleShowDetail), this.addEventListener("calendar-card-range-changed", this._handleRangeChanged), this.addEventListener("calendar-card-add-event", this._handleAddEvent);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("calendar-card-show-detail", this._handleShowDetail), this.removeEventListener("calendar-card-range-changed", this._handleRangeChanged), this.removeEventListener("calendar-card-add-event", this._handleAddEvent);
  }
  willUpdate(e) {
    super.willUpdate(e), this.hass && this.config && (this._events === void 0 || e.has("config")) && this._fetchEvents();
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = e;
  }
  async _fetchEvents() {
    if (!this.hass || !this.config) return;
    let e = this._customStart;
    e || (e = /* @__PURE__ */ new Date(), e.setHours(0, 0, 0, 0));
    let t = this._customEnd;
    t || (t = new Date(e), t.setDate(t.getDate() + 7), t.setHours(23, 59, 59, 999));
    const i = Object.keys(this.hass.states).filter((l) => l.startsWith("calendar.")).filter((l) => {
      var _;
      return !((_ = this.config.exclude_entities) != null && _.includes(l));
    });
    if (i.length === 0) {
      this._events = [];
      return;
    }
    const a = await He(this.hass, e, t, i), o = (l) => {
      const _ = l.getFullYear(), c = String(l.getMonth() + 1).padStart(2, "0"), h = String(l.getDate()).padStart(2, "0");
      return `${_}-${c}-${h}`;
    }, r = o(e), d = o(t), s = a.filter((l) => {
      let _ = "";
      return l.start.date ? _ = l.start.date : l.start.dateTime && (_ = o(new Date(l.start.dateTime))), _ >= r && _ <= d;
    });
    this.config.show_empty_days ? this._events = this._injectEmptyDays(s, e, t) : this._events = s, this.requestUpdate();
  }
  _injectEmptyDays(e, t, i) {
    const a = [...e], o = /* @__PURE__ */ new Set(), r = (l) => {
      const _ = l.getFullYear(), c = String(l.getMonth() + 1).padStart(2, "0"), h = String(l.getDate()).padStart(2, "0");
      return `${_}-${c}-${h}`;
    };
    e.forEach((l) => {
      l.start.date ? o.add(l.start.date) : l.start.dateTime && o.add(r(new Date(l.start.dateTime)));
    });
    const d = new Date(t);
    d.setHours(0, 0, 0, 0);
    const s = new Date(i);
    for (s.setHours(0, 0, 0, 0); d <= s; ) {
      const l = r(d);
      o.has(l) || a.push({
        start: { date: l },
        end: { date: l },
        summary: "Keine Termine",
        is_empty: !0,
        entity_id: "empty",
        calendar_name: ""
      }), d.setDate(d.getDate() + 1);
    }
    return a.sort((l, _) => {
      const c = (h) => {
        if (h.start.dateTime) return new Date(h.start.dateTime).getTime();
        const [m, g, w] = h.start.date.split("-").map(Number);
        return new Date(m, g - 1, w, 0, 0, 0).getTime();
      };
      return c(l) - c(_);
    });
  }
  _showPopup(e, t) {
    this.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => Promise.resolve().then(() => $t),
          dialogParams: {
            ...t,
            onEventSaved: this._onEventSaved
          }
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    if (!this.config || !this.hass)
      return u``;
    const e = this._customStart || /* @__PURE__ */ new Date(), t = this._customEnd || new Date(e.getTime() + 7 * 864e5), i = ct(this.hass, this._events, this.config, e, t);
    return u`
            <ha-card>
                ${i}
            </ha-card>
        `;
  }
  static get styles() {
    return Te`
            :host {
                display: block;
            }
            ha-card {
                height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                padding: 16px;
            }
            
            /* --- Header --- */
            .calendar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }
            .calendar-header-title {
                text-align: center;
                font-size: 1.1em;
                font-weight: 500;
                color: var(--primary-text-color);
            }
            .calendar-header-week {
                font-size: 0.85em;
                color: var(--secondary-text-color);
                margin-top: 2px;
            }
            .nav-btn {
                background: none;
                border: none;
                color: var(--primary-text-color);
                cursor: pointer;
                padding: 4px;
                display: flex;
            }
            .nav-btn ha-icon {
                --mdc-icon-size: 24px;
            }

            /* --- Tage (Bubbles) --- */
            .calendar-days-list {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .day-bubble {
                border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
                border-radius: var(--ha-card-border-radius, 12px);
                background-color: var(--card-background-color, #1c1c1e);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            .day-bubble.today {
                border-color: var(--primary-color, #03a9f4);
            }
            .day-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.05));
                background: rgba(0,0,0,0.05);
            }
            .header-left {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            /* --- Rotes Kalender Icon --- */
            .calendar-date-icon {
                display: flex;
                flex-direction: column;
                width: 38px;
                height: 40px;
                border-radius: 6px;
                background-color: #fff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
                text-align: center;
                border: 1px solid rgba(0,0,0,0.1);
                flex-shrink: 0;
            }
            .calendar-date-icon .month {
                background-color: #f44336;
                color: white;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                padding: 2px 0;
                line-height: 1.1;
            }
            .calendar-date-icon .day {
                font-size: 18px;
                font-weight: bold;
                color: #333;
                background-color: #fff;
                line-height: 24px;
            }

            .day-title {
                font-weight: 600;
                font-size: 1.05em;
                color: var(--primary-text-color);
            }
            .add-event-btn {
                background: none;
                border: none;
                color: var(--secondary-text-color);
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s, color 0.2s;
            }
            .add-event-btn:hover {
                color: var(--primary-color);
                background-color: rgba(120, 120, 120, 0.1);
            }
            .add-event-btn ha-icon {
                --mdc-icon-size: 24px;
            }

            /* --- Events (Textliste) --- */
            .event-list {
                padding: 12px 16px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .event-item {
                display: flex;
                align-items: flex-start;
                gap: 16px;
                cursor: pointer;
            }
            .event-time {
                font-size: 0.9em;
                color: var(--secondary-text-color);
                min-width: 65px;
                white-space: nowrap;
                padding-top: 1px;
            }
            .event-title {
                font-size: 0.95em;
                color: var(--primary-text-color);
                word-break: break-word;
            }
            .no-events {
                font-size: 0.9em;
                color: var(--secondary-text-color);
                font-style: italic;
            }
        `;
  }
  getCardSize() {
    return 4;
  }
};
V([
  S({ attribute: !1 })
], j.prototype, "hass", 2);
V([
  Y()
], j.prototype, "config", 2);
V([
  Y()
], j.prototype, "_events", 2);
V([
  Y()
], j.prototype, "_customStart", 2);
V([
  Y()
], j.prototype, "_customEnd", 2);
j = V([
  je("calendar-card-plus")
], j);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "calendar-card-plus",
  name: "Dynamic Calendar Card Plus",
  preview: !0,
  description: "A standalone calendar card with dynamic grid styling"
});
export {
  j as CalendarCardPlus,
  At as DEFAULT_DAY_COLORS,
  Tt as getDayColor
};
