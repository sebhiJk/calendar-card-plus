var We = Object.defineProperty;
var Ge = (n, e, t) => e in n ? We(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var y = (n, e, t) => Ge(n, typeof e != "symbol" ? e + "" : e, t);
async function qe(n, e, t, i) {
  const a = encodeURI(`?start=${e.toISOString()}&end=${t.toISOString()}`), o = i.map(async (d) => {
    try {
      const s = await n.callApi("GET", `calendars/${d}${a}`);
      if (!Array.isArray(s))
        throw new Error("Response is not an array");
      return s.map((c) => {
        var p, f, b, A, h, $;
        const _ = ((p = c.start) == null ? void 0 : p.dateTime) || ((f = c.start) == null ? void 0 : f.date) || c.start, g = ((b = c.end) == null ? void 0 : b.dateTime) || ((A = c.end) == null ? void 0 : A.date) || c.end;
        return {
          ...c,
          start: { dateTime: _.includes("T") ? _ : void 0, date: _.includes("T") ? void 0 : _ },
          end: { dateTime: g.includes("T") ? g : void 0, date: g.includes("T") ? void 0 : g },
          summary: c.summary || c.title || "Unknown Event",
          entity_id: d,
          calendar_name: (($ = (h = n.states[d]) == null ? void 0 : h.attributes) == null ? void 0 : $.friendly_name) || d
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
const ae = globalThis, ve = ae.ShadowRoot && (ae.ShadyCSS === void 0 || ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, fe = Symbol(), ze = /* @__PURE__ */ new WeakMap();
let Ue = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== fe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ve && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ze.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ze.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Fe = (n) => new Ue(typeof n == "string" ? n : n + "", void 0, fe), ye = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, a, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + n[o + 1], n[0]);
  return new Ue(t, n, fe);
}, Ye = (n, e) => {
  if (ve) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), a = ae.litNonce;
    a !== void 0 && i.setAttribute("nonce", a), i.textContent = t.cssText, n.appendChild(i);
  }
}, Ae = ve ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Fe(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Je, defineProperty: Qe, getOwnPropertyDescriptor: Xe, getOwnPropertyNames: et, getOwnPropertySymbols: tt, getPrototypeOf: it } = Object, P = globalThis, Ee = P.trustedTypes, at = Ee ? Ee.emptyScript : "", de = P.reactiveElementPolyfillSupport, F = (n, e) => n, ne = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? at : null;
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
} }, we = (n, e) => !Je(n, e), Se = { attribute: !0, type: String, converter: ne, reflect: !1, useDefault: !1, hasChanged: we };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), P.litPropertyMetadata ?? (P.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let V = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Se) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), a = this.getPropertyDescriptor(e, i, t);
      a !== void 0 && Qe(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: a, set: o } = Xe(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(F("elementProperties"))) return;
    const e = it(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(F("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
      const t = this.properties, i = [...et(t), ...tt(t)];
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
      for (const a of i) t.unshift(Ae(a));
    } else e !== void 0 && t.push(Ae(e));
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
    return Ye(e, this.constructor.elementStyles), e;
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
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : ne).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(a) : this.setAttribute(a, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, r;
    const i = this.constructor, a = i._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const d = i.getPropertyOptions(a), s = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : ne;
      this._$Em = a;
      const l = s.fromAttribute(t, d.type);
      this[a] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(a)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, a = !1, o) {
    var r;
    if (e !== void 0) {
      const d = this.constructor;
      if (a === !1 && (o = this[e]), i ?? (i = d.getPropertyOptions(e)), !((i.hasChanged ?? we)(o, t) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(d._$Eu(e, i)))) return;
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
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[F("elementProperties")] = /* @__PURE__ */ new Map(), V[F("finalized")] = /* @__PURE__ */ new Map(), de == null || de({ ReactiveElement: V }), (P.reactiveElementVersions ?? (P.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, De = (n) => n, oe = Y.trustedTypes, Te = oe ? oe.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, He = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, Re = "?" + T, nt = `<${Re}>`, N = document, J = () => N.createComment(""), Q = (n) => n === null || typeof n != "object" && typeof n != "function", xe = Array.isArray, ot = (n) => xe(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", le = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pe = /-->/g, Me = />/g, j = RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), je = /'/g, Le = /"/g, Ve = /^(?:script|style|textarea|title)$/i, st = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), u = st(1), I = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Be = /* @__PURE__ */ new WeakMap(), L = N.createTreeWalker(N, 129);
function Ie(n, e) {
  if (!xe(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Te !== void 0 ? Te.createHTML(e) : e;
}
const rt = (n, e) => {
  const t = n.length - 1, i = [];
  let a, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = q;
  for (let d = 0; d < t; d++) {
    const s = n[d];
    let l, c, _ = -1, g = 0;
    for (; g < s.length && (r.lastIndex = g, c = r.exec(s), c !== null); ) g = r.lastIndex, r === q ? c[1] === "!--" ? r = Pe : c[1] !== void 0 ? r = Me : c[2] !== void 0 ? (Ve.test(c[2]) && (a = RegExp("</" + c[2], "g")), r = j) : c[3] !== void 0 && (r = j) : r === j ? c[0] === ">" ? (r = a ?? q, _ = -1) : c[1] === void 0 ? _ = -2 : (_ = r.lastIndex - c[2].length, l = c[1], r = c[3] === void 0 ? j : c[3] === '"' ? Le : je) : r === Le || r === je ? r = j : r === Pe || r === Me ? r = q : (r = j, a = void 0);
    const p = r === j && n[d + 1].startsWith("/>") ? " " : "";
    o += r === q ? s + nt : _ >= 0 ? (i.push(l), s.slice(0, _) + He + s.slice(_) + T + p) : s + T + (_ === -2 ? d : p);
  }
  return [Ie(n, o + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class X {
  constructor({ strings: e, _$litType$: t }, i) {
    let a;
    this.parts = [];
    let o = 0, r = 0;
    const d = e.length - 1, s = this.parts, [l, c] = rt(e, t);
    if (this.el = X.createElement(l, i), L.currentNode = this.el.content, t === 2 || t === 3) {
      const _ = this.el.content.firstChild;
      _.replaceWith(..._.childNodes);
    }
    for (; (a = L.nextNode()) !== null && s.length < d; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const _ of a.getAttributeNames()) if (_.endsWith(He)) {
          const g = c[r++], p = a.getAttribute(_).split(T), f = /([.?@])?(.*)/.exec(g);
          s.push({ type: 1, index: o, name: f[2], strings: p, ctor: f[1] === "." ? lt : f[1] === "?" ? ct : f[1] === "@" ? _t : se }), a.removeAttribute(_);
        } else _.startsWith(T) && (s.push({ type: 6, index: o }), a.removeAttribute(_));
        if (Ve.test(a.tagName)) {
          const _ = a.textContent.split(T), g = _.length - 1;
          if (g > 0) {
            a.textContent = oe ? oe.emptyScript : "";
            for (let p = 0; p < g; p++) a.append(_[p], J()), L.nextNode(), s.push({ type: 2, index: ++o });
            a.append(_[g], J());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Re) s.push({ type: 2, index: o });
      else {
        let _ = -1;
        for (; (_ = a.data.indexOf(T, _ + 1)) !== -1; ) s.push({ type: 7, index: o }), _ += T.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = N.createElement("template");
    return i.innerHTML = e, i;
  }
}
function K(n, e, t = n, i) {
  var r, d;
  if (e === I) return e;
  let a = i !== void 0 ? (r = t._$Co) == null ? void 0 : r[i] : t._$Cl;
  const o = Q(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== o && ((d = a == null ? void 0 : a._$AO) == null || d.call(a, !1), o === void 0 ? a = void 0 : (a = new o(n), a._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = a : t._$Cl = a), a !== void 0 && (e = K(n, a._$AS(n, e.values), a, i)), e;
}
class dt {
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
    const { el: { content: t }, parts: i } = this._$AD, a = ((e == null ? void 0 : e.creationScope) ?? N).importNode(t, !0);
    L.currentNode = a;
    let o = L.nextNode(), r = 0, d = 0, s = i[0];
    for (; s !== void 0; ) {
      if (r === s.index) {
        let l;
        s.type === 2 ? l = new ee(o, o.nextSibling, this, e) : s.type === 1 ? l = new s.ctor(o, s.name, s.strings, this, e) : s.type === 6 && (l = new ht(o, this, e)), this._$AV.push(l), s = i[++d];
      }
      r !== (s == null ? void 0 : s.index) && (o = L.nextNode(), r++);
    }
    return L.currentNode = N, a;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class ee {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, a) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
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
    e = K(this, e, t), Q(e) ? e === x || e == null || e === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : e !== this._$AH && e !== I && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ot(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== x && Q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(N.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, a = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = X.createElement(Ie(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === a) this._$AH.p(t);
    else {
      const r = new dt(a, this), d = r.u(this.options);
      r.p(t), this.T(d), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Be.get(e.strings);
    return t === void 0 && Be.set(e.strings, t = new X(e)), t;
  }
  k(e) {
    xe(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, a = 0;
    for (const o of e) a === t.length ? t.push(i = new ee(this.O(J()), this.O(J()), this, this.options)) : i = t[a], i._$AI(o), a++;
    a < t.length && (this._$AR(i && i._$AB.nextSibling, a), t.length = a);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const a = De(e).nextSibling;
      De(e).remove(), e = a;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class se {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, a, o) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = e, this.name = t, this._$AM = a, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = x;
  }
  _$AI(e, t = this, i, a) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = K(this, e, t, 0), r = !Q(e) || e !== this._$AH && e !== I, r && (this._$AH = e);
    else {
      const d = e;
      let s, l;
      for (e = o[0], s = 0; s < o.length - 1; s++) l = K(this, d[i + s], t, s), l === I && (l = this._$AH[s]), r || (r = !Q(l) || l !== this._$AH[s]), l === x ? e = x : e !== x && (e += (l ?? "") + o[s + 1]), this._$AH[s] = l;
    }
    r && !a && this.j(e);
  }
  j(e) {
    e === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class lt extends se {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === x ? void 0 : e;
  }
}
class ct extends se {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== x);
  }
}
class _t extends se {
  constructor(e, t, i, a, o) {
    super(e, t, i, a, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = K(this, e, t, 0) ?? x) === I) return;
    const i = this._$AH, a = e === x && i !== x || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== x && (i === x || a);
    a && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ht {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    K(this, e);
  }
}
const ce = Y.litHtmlPolyfillSupport;
ce == null || ce(X, ee), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.2");
const ut = (n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let a = i._$litPart$;
  if (a === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = a = new ee(e.insertBefore(J(), o), o, void 0, t ?? {});
  }
  return a._$AI(n), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis;
class O extends V {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ut(t, this.renderRoot, this.renderOptions);
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
    return I;
  }
}
var Ne;
O._$litElement$ = !0, O.finalized = !0, (Ne = B.litElementHydrateSupport) == null || Ne.call(B, { LitElement: O });
const _e = B.litElementPolyfillSupport;
_e == null || _e({ LitElement: O });
(B.litElementVersions ?? (B.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = (n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = { attribute: !0, type: String, converter: ne, reflect: !1, hasChanged: we }, gt = (n = mt, e, t) => {
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
  return (e, t) => typeof t == "object" ? gt(n, e, t) : ((i, a, o) => {
    const r = a.hasOwnProperty(o);
    return a.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(a, o) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function H(n) {
  return S({ ...n, state: !0, attribute: !1 });
}
let he = 0;
function ue(n, e, ...t) {
  return "var(--primary-color, #03a9f4)";
}
function me(n, e, ...t) {
  return u`<ha-icon icon="mdi:calendar"></ha-icon>`;
}
function ge(n, e, ...t) {
  return "var(--card-background-color, #1c1c1e)";
}
function pe(...n) {
  return "";
}
function pt(...n) {
  return "";
}
function Ke(n) {
  const e = {};
  return (n || []).forEach((t) => {
    const i = t.start.date || t.start.dateTime;
    if (!i) return;
    const a = new Date(i), o = a.toDateString();
    e[o] || (e[o] = { date: a, events: [] }), e[o].events.push(t);
  }), Object.values(e);
}
function vt(n) {
  return Ke(n);
}
function ft(n, e, t) {
  if (!e)
    return u`<div style="padding: 16px; text-align: center;">Lade Termine...</div>`;
  const i = bt(e);
  return u`
        <div class="calendar-container" style="padding: 12px;">
            ${yt(n, t)}
            <div class="calendar-days-list" style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
                ${Object.keys(i).map((a) => {
    const o = new Date(a), r = i[a];
    return wt(n, o, r, t);
  })}
            </div>
        </div>
    `;
}
function yt(n, e) {
  return u`
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <button 
                @click=${(t) => Oe(t, -7)} 
                style="background: none; border: none; cursor: pointer; color: var(--primary-text-color);"
                title="Vorherige Woche"
            >
                <ha-icon icon="mdi:chevron-left" style="--mdc-icon-size: 28px;"></ha-icon>
            </button>

            <span style="font-weight: bold; font-size: 1.1em; color: var(--primary-text-color);">
                ${e.title || "Kalender"}
            </span>

            <button 
                @click=${(t) => Oe(t, 7)} 
                style="background: none; border: none; cursor: pointer; color: var(--primary-text-color);"
                title="Nächste Woche"
            >
                <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 28px;"></ha-icon>
            </button>
        </div>
    `;
}
function Oe(n, e) {
  he += e;
  const t = /* @__PURE__ */ new Date();
  t.setDate(t.getDate() + he - 7), t.setHours(0, 0, 0, 0);
  const i = /* @__PURE__ */ new Date();
  i.setDate(i.getDate() + he + 14), i.setHours(23, 59, 59, 999), n.currentTarget.dispatchEvent(
    new CustomEvent("calendar-card-range-changed", {
      bubbles: !0,
      composed: !0,
      detail: { start: t, end: i }
    })
  );
}
function wt(n, e, t, i) {
  const a = e.toLocaleDateString(n.language || "de", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  }), r = (/* @__PURE__ */ new Date()).toDateString() === e.toDateString() ? "var(--primary-color, #03a9f4)" : "var(--divider-color, rgba(255,255,255,0.12))";
  return u`
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border: 1px solid ${r}; border-radius: 12px; background: var(--card-background-color, #1c1c1e);">
            <div style="display: flex; flex-direction: column; flex: 1;">
                <span style="font-weight: 600; font-size: 0.95em; color: var(--primary-text-color); margin-bottom: 4px;">
                    ${a}
                </span>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    ${t.filter((d) => !d.is_empty).length === 0 ? u`<span style="font-size: 0.85em; color: var(--secondary-text-color);">Keine Termine</span>` : t.filter((d) => !d.is_empty).map((d) => u`
                            <div style="font-size: 0.85em; color: var(--primary-text-color); display: flex; gap: 6px;">
                                <span style="color: var(--secondary-text-color);">${$t(d)}</span>
                                <span>${d.summary}</span>
                            </div>
                          `)}
                </div>
            </div>

            <button 
                @click=${(d) => xt(d, e, i)}
                style="background: none; border: none; color: var(--secondary-text-color); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
                title="Termin für diesen Tag hinzufügen"
            >
                <ha-icon icon="mdi:plus-circle-outline" style="--mdc-icon-size: 28px; color: ${r};"></ha-icon>
            </button>
        </div>
    `;
}
function xt(n, e, t) {
  n.stopPropagation();
  const i = new Date(e);
  i.setHours(9, 0, 0, 0);
  const a = new Date(e);
  a.setHours(10, 0, 0, 0);
  let o = t == null ? void 0 : t.entity;
  !o && (t != null && t.entities) && Array.isArray(t.entities) && t.entities.length > 0 && (o = typeof t.entities[0] == "string" ? t.entities[0] : t.entities[0].entity), n.target.dispatchEvent(
    new CustomEvent("show-dialog", {
      bubbles: !0,
      composed: !0,
      detail: {
        dialogTag: "ha-dialog-calendar-event-editor",
        dialogImport: () => Promise.resolve(),
        dialogParams: {
          selectedDate: i,
          startDate: i,
          endDate: a,
          calendarId: o,
          entityId: o
        }
      }
    })
  );
}
function bt(n) {
  const e = {};
  return n.forEach((t) => {
    const i = t.start.date || t.start.dateTime;
    if (!i) return;
    const a = new Date(i).toDateString();
    e[a] || (e[a] = []), e[a].push(t);
  }), e;
}
function $t(n) {
  return n.start.date ? "Ganztägig" : n.start.dateTime ? new Date(n.start.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
}
async function kt(n, e, t, i) {
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
function Ct(n, e, t, i, a, o) {
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
    var l, c;
    return u`
                            <option value=${s} ?selected=${s === t.calendar_id}>
                                ${((c = (l = n.states[s]) == null ? void 0 : l.attributes) == null ? void 0 : c.friendly_name) || s}
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
const R = {
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
function w(n, e, t, i) {
  var r;
  const a = ((r = n.locale) == null ? void 0 : r.language) || n.language || "en";
  let o;
  if (R[a] && R[a][e])
    o = R[a][e];
  else if (R.en && R.en[e])
    o = R.en[e];
  else
    return e;
  return o;
}
var Ze = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, At = (n, e, t) => e in n ? Ze(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, M = (n, e, t, i) => {
  for (var a = i > 1 ? void 0 : i ? zt(e, t) : e, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (a = (i ? r(e, t, a) : r(a)) || a);
  return i && a && Ze(e, t, a), a;
}, Et = (n, e, t) => At(n, e + "", t);
let z = class extends O {
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
    await kt(
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
          ${e ? Ct(
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
    return this.config.group_by_date_and_calendar ? vt(this.detailEvents).map((t) => {
      const i = t.date, a = ue(t.events[0].entity_id, this.config), o = me(
        this.hass,
        i,
        a,
        this.config.dark_mode ?? !1
      ), d = `background-color: ${ge(
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
        var E;
        const l = s.is_empty ? w(this.hass, "empty") : s.summary, c = new Date(
          s.start.dateTime || s.start.date
        ), _ = new Date(s.end.dateTime || s.end.date), g = !s.start.dateTime, p = pe(
          this.hass,
          c,
          _,
          g
        ), f = ((E = this.hass.locale) == null ? void 0 : E.language) || this.hass.language || navigator.language, b = (v) => v.toLocaleTimeString(f, {
          hour: "2-digit",
          minute: "2-digit"
        }), A = `${b(c)} - ${b(_)}`, h = this.config.show_date ?? !1, $ = this.config.show_time ?? !1, C = this.hass.localize(
          "component.calendar.entity_component._.state_attributes.all_day.name"
        ) || "All day";
        let m = "";
        if (s.is_empty)
          m = "";
        else if (h || $)
          if (g) {
            const v = h ? c.toLocaleDateString(f, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            }) : "";
            h && $ ? m = `${v}, ${C}` : m = v || C;
          } else {
            const v = [];
            h && v.push(
              c.toLocaleDateString(f, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })
            ), $ && v.push(A), m = v.join(", ");
          }
        else
          m = g ? C : b(c);
        if (!s.is_empty && this.config.show_duration && (m.endsWith(p) || (m += ` • ${p}`)), !s.is_empty && this.config.show_weekday) {
          const v = c.toLocaleDateString(f, {
            weekday: this.config.show_weekday_long ? "long" : "short"
          });
          m.includes(v) || (m += ` • ${v}`);
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
                      ${!s.is_empty && (h || $) ? u`<ha-icon
                            icon="mdi:clock-time-four-outline"
                            style="--mdc-icon-size: 14px;"
                          ></ha-icon>` : ""}
                      ${m}
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
    }) : this.config.group_by_date ? Ke(this.detailEvents).map((t) => {
      const i = t.date, a = ue(t.events[0].entity_id, this.config), o = me(
        this.hass,
        i,
        a,
        this.config.dark_mode ?? !1
      ), d = `background-color: ${ge(
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
        var E;
        const l = s.is_empty ? w(this.hass, "empty") : s.summary, c = new Date(
          s.start.dateTime || s.start.date
        ), _ = new Date(s.end.dateTime || s.end.date), g = !s.start.dateTime, p = pe(
          this.hass,
          c,
          _,
          g
        ), f = ((E = this.hass.locale) == null ? void 0 : E.language) || this.hass.language || navigator.language, b = (v) => v.toLocaleTimeString(f, {
          hour: "2-digit",
          minute: "2-digit"
        }), A = `${b(c)} - ${b(_)}`, h = this.config.show_date ?? !1, $ = this.config.show_time ?? !1, C = this.hass.localize(
          "component.calendar.entity_component._.state_attributes.all_day.name"
        ) || "All day";
        let m = "";
        if (s.is_empty)
          m = "";
        else if (h || $)
          if (g) {
            const v = h ? c.toLocaleDateString(f, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            }) : "";
            h && $ ? m = `${v}, ${C}` : m = v || C;
          } else {
            const v = [];
            h && v.push(
              c.toLocaleDateString(f, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })
            ), $ && v.push(A), m = v.join(", ");
          }
        else
          m = g ? C : b(c);
        if (!s.is_empty && this.config.show_duration && (m.endsWith(p) || (m += ` • ${p}`)), !s.is_empty && this.config.show_weekday) {
          const v = c.toLocaleDateString(f, {
            weekday: this.config.show_weekday_long ? "long" : "short"
          });
          m.includes(v) || (m += ` • ${v}`);
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
                      ${!s.is_empty && (h || $) ? u`<ha-icon
                            icon="mdi:clock-time-four-outline"
                            style="--mdc-icon-size: 14px;"
                          ></ha-icon>` : ""}
                      ${m}
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
      var te;
      const i = e.is_empty ? w(this.hass, "empty") : e.summary;
      let a = "", o, r;
      try {
        o = new Date(e.start.dateTime || e.start.date), r = new Date(e.end.dateTime || e.end.date);
      } catch {
        return u`<div class="error">Date Error</div>`;
      }
      const d = /* @__PURE__ */ new Date(), s = !e.start.dateTime, l = ((te = this.hass.locale) == null ? void 0 : te.language) || this.hass.language || navigator.language, c = (k) => k.toLocaleTimeString(l, { hour: "2-digit", minute: "2-digit" }), _ = pe(this.hass, o, r, s), g = `${c(o)} - ${c(r)}`, p = this.config.show_date ?? !1, f = this.config.show_time ?? !1, b = this.hass.localize(
        "component.calendar.entity_component._.state_attributes.all_day.name"
      ) || "All day";
      if (e.is_empty)
        a = "";
      else if (p || f)
        if (s) {
          const k = p ? o.toLocaleDateString(l, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          }) : "";
          p && f ? a = `${k}, ${b}` : a = k || b;
        } else {
          const k = [];
          p && k.push(
            o.toLocaleDateString(l, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })
          ), f && k.push(g), a = k.join(", ");
        }
      else if (o > d) {
        const k = o.getTime() - d.getTime(), ie = Math.ceil(k / 6e4);
        a = pt(this.hass, ie);
      } else
        a = s ? b : c(o);
      if (!e.is_empty && this.config.show_duration && (a ? a.endsWith(_) || (a += ` • ${_}`) : a = _), !e.is_empty && this.config.show_weekday) {
        const k = o.toLocaleDateString(l, {
          weekday: this.config.show_weekday_long ? "long" : "short"
        });
        a += ` • ${k}`;
      }
      const h = !e.is_empty && o <= d && r >= d ? d : o, $ = e.is_empty ? "var(--disabled-text-color, #bdbdbb)" : ue(e.entity_id, this.config), C = me(
        this.hass,
        h,
        $,
        this.config.dark_mode ?? !1
      ), m = this.config.show_divider && t > 0, v = `background-color: ${ge(e.entity_id, this.config)}; border: none;`;
      return u`
        ${m ? u`<div class="calendar-divider"></div>` : ""}
        <div
          class="calendar-item detail"
          style="${v} ${e.is_empty ? "cursor: default; opacity: 0.7;" : ""}"
          @click=${() => e.is_empty ? null : this._handleMoreInfo(e.entity_id)}
        >
          <div class="calendar-icon dynamic">${C}</div>
          <div class="calendar-content">
            <div class="event-title">${i}</div>
            <div class="event-time">
              ${!e.is_empty && (p || f) ? u`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ""}
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
Et(z, "styles", ye`
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
M([
  S({ attribute: !1 })
], z.prototype, "hass", 2);
M([
  S({ attribute: !1 })
], z.prototype, "config", 2);
M([
  S({ type: Boolean })
], z.prototype, "open", 2);
M([
  S({ type: String })
], z.prototype, "mode", 2);
M([
  S({ type: String })
], z.prototype, "detailTitle", 2);
M([
  S({ type: Array })
], z.prototype, "detailEvents", 2);
M([
  H()
], z.prototype, "_addEventState", 2);
z = M([
  be("calendar-card-plus-popup")
], z);
const St = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusPopup() {
    return z;
  }
}, Symbol.toStringTag, { value: "Module" }));
var Dt = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, W = (n, e, t, i) => {
  for (var a = i > 1 ? void 0 : i ? Tt(e, t) : e, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (a = (i ? r(e, t, a) : r(a)) || a);
  return i && a && Dt(e, t, a), a;
};
let U = class extends O {
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
    y(this, "_onEventSaved", () => {
      this._events = void 0, this.requestUpdate(), this._fetchEvents();
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("calendar-card-show-detail", this._handleShowDetail), this.addEventListener("calendar-card-range-changed", this._handleRangeChanged);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("calendar-card-show-detail", this._handleShowDetail), this.removeEventListener("calendar-card-range-changed", this._handleRangeChanged);
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
    e || (e = /* @__PURE__ */ new Date(), e.setDate(e.getDate() - 30), e.setHours(0, 0, 0, 0));
    let t = this._customEnd;
    if (!t) {
      const o = /* @__PURE__ */ new Date();
      let r = 43200;
      this.config.upcoming_events && (this.config.days !== void 0 || this.config.hours !== void 0 || this.config.minutes !== void 0 ? r = (this.config.days || 0) * 1440 + (this.config.hours || 0) * 60 + (this.config.minutes || 0) : this.config.max_minutes_until_start !== void 0 && (r = this.config.max_minutes_until_start)), t = new Date(o.getTime() + r * 6e4);
    }
    const i = Object.keys(this.hass.states).filter((o) => o.startsWith("calendar.")).filter((o) => {
      var r;
      return !((r = this.config.exclude_entities) != null && r.includes(o));
    });
    if (i.length === 0) {
      this._events = [];
      return;
    }
    const a = await qe(this.hass, e, t, i);
    this.config.show_empty_days ? this._events = this._injectEmptyDays(a, e, t) : this._events = a, this.requestUpdate();
  }
  _injectEmptyDays(e, t, i) {
    const a = [...e], o = /* @__PURE__ */ new Set();
    e.forEach((s) => {
      const l = s.start.date || s.start.dateTime;
      if (l) {
        const c = new Date(l);
        o.add(c.toISOString().split("T")[0]);
      }
    });
    const r = new Date(t);
    r.setHours(0, 0, 0, 0);
    const d = new Date(i);
    for (d.setHours(0, 0, 0, 0); r <= d; ) {
      const s = r.toISOString().split("T")[0];
      o.has(s) || a.push({
        start: { date: s },
        end: { date: s },
        summary: "empty",
        is_empty: !0,
        entity_id: "empty",
        calendar_name: ""
      }), r.setDate(r.getDate() + 1);
    }
    return a.sort((s, l) => {
      const c = new Date(s.start.dateTime || s.start.date).getTime(), _ = new Date(l.start.dateTime || l.start.date).getTime();
      return c - _;
    });
  }
  render() {
    if (!this.config || !this.hass)
      return u``;
    const e = ft(this.hass, this._events, this.config);
    return u`
            <ha-card>
                ${e}
            </ha-card>
        `;
  }
  _showPopup(e, t) {
    this.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => Promise.resolve().then(() => St),
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
  static get styles() {
    return ye`
            :host {
                display: block;
            }
            ha-card {
                height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            
            .calendar-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                width: 100%;
                box-sizing: border-box;
            }
            .calendar-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                border-radius: var(--ha-card-border-radius, 12px);
                cursor: pointer;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .calendar-item:last-child {
                margin-bottom: 0px;
            }
            .calendar-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--primary-color, #03a9f4);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                flex-shrink: 0;
            }
            .calendar-icon ha-icon {
                --mdc-icon-size: 20px;
            }
            .calendar-content {
                display: flex;
                flex-direction: column;
                overflow: hidden;
                flex: 1;
            }
            .event-title {
                font-size: 14px;
                font-weight: 500;
                color: var(--primary-text-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .event-time {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 12px;
                color: var(--secondary-text-color);
            }
            .event-time ha-icon {
                --mdc-icon-size: 14px;
                color: var(--secondary-text-color);
            }
            .event-location, .event-calendar {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 0.9em;
                color: var(--secondary-text-color);
                margin-top: 1px;
            }
            .event-location ha-icon, .event-calendar ha-icon {
                --mdc-icon-size: 14px;
                color: var(--secondary-text-color);
            }
            .progress-bar {
                margin-top: 4px;
                height: 4px;
                background-color: var(--secondary-background-color, #444);
                border-radius: 2px;
                overflow: hidden;
                width: 100%;
            }
            .progress-fill {
                height: 100%;
                background-color: var(--primary-text-color, #fff);
                border-radius: 2px;
                opacity: 0.7;
            }
            .calendar-divider {
                border-top: 1px solid var(--divider-color, #e0e0e0);
                margin: 4px 12px;
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
        `;
  }
  getCardSize() {
    return 1;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => jt), document.createElement("calendar-card-plus-editor");
  }
  static getStubConfig(e) {
    return {
      type: "custom:calendar-card-plus",
      exclude_entities: [],
      unfold_events: !1
    };
  }
};
W([
  S({ attribute: !1 })
], U.prototype, "hass", 2);
W([
  H()
], U.prototype, "config", 2);
W([
  H()
], U.prototype, "_events", 2);
W([
  H()
], U.prototype, "_customStart", 2);
W([
  H()
], U.prototype, "_customEnd", 2);
U = W([
  be("calendar-card-plus")
], U);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "calendar-card-plus",
  name: "Dynamic Calendar Card Plus",
  preview: !0,
  description: "A standalone calendar card with dynamic grid styling"
});
const D = (n, e, t, i) => {
  i = i || {}, t = t ?? {};
  const a = new Event(e, {
    bubbles: i.bubbles === void 0 ? !0 : i.bubbles,
    cancelable: !!i.cancelable,
    composed: i.composed === void 0 ? !0 : i.composed
  });
  return a.detail = t, n.dispatchEvent(a), a;
};
var Pt = Object.defineProperty, Mt = Object.getOwnPropertyDescriptor, re = (n, e, t, i) => {
  for (var a = i > 1 ? void 0 : i ? Mt(e, t) : e, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (a = (i ? r(e, t, a) : r(a)) || a);
  return i && a && Pt(e, t, a), a;
};
let Z = class extends O {
  constructor() {
    super(...arguments);
    y(this, "hass");
    y(this, "_config", {
      type: "custom:calendar-card-plus"
    });
    y(this, "_showAllCalendars", !1);
  }
  set config(e) {
    this.setConfig(e);
  }
  setConfig(e) {
    this._config = e, this.requestUpdate();
  }
  render() {
    var d, s, l, c, _, g, p, f, b, A;
    if (!this.hass)
      return u``;
    const e = this._config.upcoming_events ?? !1, t = this._config.unfold_events ?? !1, i = this._config.days ?? 1, a = this._config.hours ?? 0, o = this._config.minutes ?? 0, r = this._config.exclude_entities ?? [];
    return u`
      <div class="card-config">
        <ha-expansion-panel outlined>
          <div
            slot="header"
            role="heading"
            aria-level="3"
            style="display: flex; align-items: center; gap: 8px;"
          >
            <ha-icon
              icon="mdi:cog"
              style="color: var(--secondary-text-color);"
            ></ha-icon>
            ${w(this.hass, "editor_configuration")}
          </div>
          <div
            class="settings-grid"
            style="margin-top: 16px; margin-bottom: 16px;"
          >
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "editor_unfold_events")}</span
              >
              <ha-switch
                .checked=${t}
                @change=${this._compactModeChanged}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "editor_show_divider")}</span
              >
              <ha-switch
                .checked=${this._config.show_divider ?? !1}
                @change=${this._calendarDividerChanged}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "editor_show_add_event")}</span
              >
              <ha-switch
                .checked=${this._config.show_add_event ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "show_add_event")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label">${w(this.hass, "group_by_date")}</span>
              <ha-switch
                .checked=${this._config.group_by_date ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "group_by_date")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "group_by_date_and_calendar")}</span
              >
              <ha-switch
                .checked=${this._config.group_by_date_and_calendar ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "group_by_date_and_calendar")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label">Dark Mode</span>
              <ha-switch
                .checked=${this._config.dark_mode ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "dark_mode")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "editor_show_upcoming")}</span
              >
              <ha-switch
                .checked=${e}
                @change=${this._calendarShowAllChanged}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "editor_show_empty_days")}</span
              >
              <ha-switch
                .checked=${this._config.show_empty_days ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "show_empty_days")}
              ></ha-switch>
            </div>
          </div>

          ${t ? u`
                <div
                  class="settings-row full-width"
                  style="margin-bottom: 16px;"
                >
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ number: { min: 0, max: 20, mode: "box" } }}
                    .value=${this._config.max_lines || 0}
                    .label=${w(this.hass, "editor_max_lines")}
                    .configValue=${"max_lines"}
                    @value-changed=${this._valueChanged}
                  ></ha-selector>
                </div>
              ` : ""}
          ${e ? u`
                <div
                  class="settings-row full-width"
                  style="margin-bottom: 8px;"
                >
                  <span class="label" style="margin-bottom: 8px;"
                    >${((d = this.hass) == null ? void 0 : d.localize(
      "ui.panel.lovelace.editor.card.statistic.period"
    )) || "Period"}</span
                  >
                  <div class="period-selectors">
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{ number: { min: 0, max: 365, mode: "box" } }}
                      .value=${i}
                      .label=${((s = this.hass) == null ? void 0 : s.localize(
      "component.input_datetime.entity_component._.state_attributes.day.name"
    )) || "Days"}
                      .configValue=${"days"}
                      @value-changed=${this._valueChanged}
                    ></ha-selector>
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{ number: { min: 0, max: 23, mode: "box" } }}
                      .value=${a}
                      .label=${((l = this.hass) == null ? void 0 : l.localize(
      "component.input_datetime.entity_component._.state_attributes.hour.name"
    )) || "Hours"}
                      .configValue=${"hours"}
                      @value-changed=${this._valueChanged}
                    ></ha-selector>
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{ number: { min: 0, max: 59, mode: "box" } }}
                      .value=${o}
                      .label=${((c = this.hass) == null ? void 0 : c.localize(
      "component.input_datetime.entity_component._.state_attributes.minute.name"
    )) || "Minutes"}
                      .configValue=${"minutes"}
                      @value-changed=${this._valueChanged}
                    ></ha-selector>
                  </div>
                </div>
              ` : ""}

          <div class="settings-row full-width" style="margin-bottom: 16px;">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ ui_color: {} }}
              .value=${this._config.calendar_icon_color || ""}
              .label="Global ${this.hass.localize(
      "ui.panel.lovelace.editor.card.tile.color"
    ) || "Color"}"
              .configValue=${"calendar_icon_color"}
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>

          <div class="settings-row full-width" style="margin-bottom: 16px;">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ ui_color: {} }}
              .value=${this._config.background_color || ""}
              .label=${w(this.hass, "editor_background_color")}
              .configValue=${"background_color"}
              @value-changed=${this._valueChanged}
            ></ha-selector>
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel outlined>
          <div
            slot="header"
            role="heading"
            aria-level="3"
            style="display: flex; align-items: center; gap: 8px;"
          >
            <ha-icon
              icon="mdi:card-text"
              style="color: var(--secondary-text-color);"
            ></ha-icon>
            ${w(this.hass, "editor_text_visibility")}
          </div>
          <div
            class="settings-grid"
            style="margin-top: 16px; margin-bottom: 16px;"
          >
            <div class="settings-row">
              <span class="label"
                >${(_ = this.hass) == null ? void 0 : _.localize("ui.common.show")}
                ${(g = this.hass) == null ? void 0 : g.localize(
      "component.calendar.entity_component._.name"
    )}
                ${(p = this.hass) == null ? void 0 : p.localize("ui.common.name")}</span
              >
              <ha-switch
                .checked=${this._config.show_calendar_name ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "show_calendar_name")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${(f = this.hass) == null ? void 0 : f.localize("ui.common.show")}
                ${((b = this.hass) == null ? void 0 : b.localize(
      "ui.dialogs.helper_settings.input_datetime.date"
    )) || "Date"}</span
              >
              <ha-switch
                .checked=${this._config.show_date ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "show_date")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "editor_show_location")}</span
              >
              <ha-switch
                .checked=${this._config.show_location ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "show_location")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "editor_show_duration")}</span
              >
              <ha-switch
                .checked=${this._config.show_duration ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "show_duration")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "editor_show_time")}</span
              >
              <ha-switch
                .checked=${this._config.show_time ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "show_time")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${w(this.hass, "editor_icon_show_weekday")}</span
              >
              <ha-switch
                .checked=${this._config.icon_show_weekday ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "icon_show_weekday")}
              ></ha-switch>
            </div>
            <div class="settings-row">
              <span class="label"
                >${this._config.icon_show_weekday ? w(this.hass, "editor_show_month") : w(this.hass, "editor_show_weekday")}</span
              >
              <ha-switch
                .checked=${this._config.show_weekday ?? !1}
                @change=${(h) => this._toggleBooleanConfig(h, "show_weekday")}
              ></ha-switch>
            </div>
            ${this._config.show_weekday ? u`
                  <div class="settings-row">
                    <span
                      class="label"
                      style="color: var(--secondary-text-color);"
                      >${this._config.icon_show_weekday ? w(this.hass, "editor_show_month_long") : w(this.hass, "editor_show_weekday_long")}</span
                    >
                    <ha-switch
                      .checked=${this._config.show_weekday_long ?? !1}
                      @change=${(h) => this._toggleBooleanConfig(h, "show_weekday_long")}
                    ></ha-switch>
                  </div>
                  <div></div>
                ` : ""}
          </div>
        </ha-expansion-panel>

        <h4>
          ${((A = this.hass) == null ? void 0 : A.localize("ui.components.calendar.my_calendars")) || "Calendars"}
        </h4>
        <div class="entities-list">
          ${(() => {
      const h = this._getCalendarEntities(), $ = this._showAllCalendars ? h : h.slice(0, 3), C = h.length > 3;
      return u`
              ${$.map((m) => {
        var k, ie, $e, ke, Ce;
        const E = !r.includes(m.entity_id), v = ((k = this._config.calendar_colors) == null ? void 0 : k[m.entity_id]) || "", te = this._toCssColor(
          v || this._config.calendar_icon_color || "#fa3e3e"
        );
        return u`
                  <div class="entity-row ${E ? "" : "disabled"}">
                    <div class="entity-row-top">
                      <div
                        class="entity-icon dynamic"
                        style="background: transparent;"
                      >
                        ${this._renderDynamicIcon(
          /* @__PURE__ */ new Date(),
          te,
          this._config.dark_mode ?? !1,
          this._config.icon_show_weekday ?? !1
        )}
                      </div>
                      <div class="entity-info">
                        <span class="entity-name"
                          >${m.attributes.friendly_name || m.entity_id}</span
                        >
                        <span class="entity-id">${m.entity_id}</span>
                      </div>
                      <ha-button
                        size="small"
                        appearance="filled"
                        variant="brand"
                        class="${E ? "action-hide" : "action-show"}"
                        @click=${(G) => this._calendarToggleEntity(G, m.entity_id)}
                      >
                        ${E ? ((ie = this.hass) == null ? void 0 : ie.localize("ui.common.hide")) || "Hide" : (($e = this.hass) == null ? void 0 : $e.localize("ui.common.show")) || "Show"}
                      </ha-button>
                    </div>
                    <div class="entity-row-bottom">
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${v}
                        .label=${((ke = this.hass) == null ? void 0 : ke.localize(
          "ui.panel.lovelace.editor.card.tile.color"
        )) || "Color"}
                        @value-changed=${(G) => this._calendarColorChanged(G, m.entity_id)}
                      ></ha-selector>
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${((Ce = this._config.calendar_background_colors) == null ? void 0 : Ce[m.entity_id]) || ""}
                        .label=${w(
          this.hass,
          "editor_background_color"
        )}
                        @value-changed=${(G) => this._calendarBackgroundColorChanged(
          G,
          m.entity_id
        )}
                      ></ha-selector>
                    </div>
                  </div>
                `;
      })}
              ${C ? u`
                    <div class="show-more-row">
                      <ha-button
                        @click=${() => {
        this._showAllCalendars = !this._showAllCalendars, this.requestUpdate();
      }}
                      >
                        ${this._showAllCalendars ? w(this.hass, "editor_show_less") : w(this.hass, "editor_show_more")}
                      </ha-button>
                    </div>
                  ` : ""}
            `;
    })()}
        </div>
      </div>
    `;
  }
  _getCalendarEntities() {
    return this.hass ? Object.keys(this.hass.states).filter((e) => e.startsWith("calendar.")).map((e) => {
      var t;
      return (t = this.hass) == null ? void 0 : t.states[e];
    }) : [];
  }
  _calendarToggleEntity(e, t) {
    e.stopPropagation();
    const i = [...this._config.exclude_entities ?? []], a = i.indexOf(t);
    a === -1 ? i.push(t) : i.splice(a, 1), this._config = {
      ...this._config,
      exclude_entities: i
    }, D(this, "config-changed", { config: this._config });
  }
  _calendarShowAllChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      upcoming_events: t
    }, D(this, "config-changed", { config: this._config });
  }
  _compactModeChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      unfold_events: t
    }, D(this, "config-changed", { config: this._config });
  }
  _calendarDividerChanged(e) {
    const t = e.target.checked;
    this._config = {
      ...this._config,
      show_divider: t
    }, D(this, "config-changed", { config: this._config });
  }
  _toggleBooleanConfig(e, t) {
    const i = e.target.checked;
    this._config = {
      ...this._config,
      [t]: i
    }, D(this, "config-changed", { config: this._config });
  }
  _valueChanged(e) {
    var r;
    if (!this._config || !this.hass)
      return;
    const i = e.target.configValue;
    if (!i)
      return;
    const a = (r = e.detail) == null ? void 0 : r.value;
    if (this._config[i] === a)
      return;
    const o = { ...this._config };
    a == null || a === "" ? delete o[i] : o[i] = a, this._config = o, D(this, "config-changed", { config: this._config });
  }
  _calendarColorChanged(e, t) {
    const i = e.detail.value, a = { ...this._config.calendar_colors || {} };
    if (i == null || i === "" ? delete a[t] : a[t] = i, Object.keys(a).length === 0) {
      const o = { ...this._config };
      delete o.calendar_colors, this._config = o;
    } else
      this._config = {
        ...this._config,
        calendar_colors: a
      };
    D(this, "config-changed", { config: this._config });
  }
  _calendarBackgroundColorChanged(e, t) {
    const i = e.detail.value, a = {
      ...this._config.calendar_background_colors || {}
    };
    if (i == null || i === "" ? delete a[t] : a[t] = i, Object.keys(a).length === 0) {
      const o = { ...this._config };
      delete o.calendar_background_colors, this._config = o;
    } else
      this._config = {
        ...this._config,
        calendar_background_colors: a
      };
    D(this, "config-changed", { config: this._config });
  }
  static get styles() {
    return ye`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .ha-select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid var(--divider-color, #eee);
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        width: 50%;
      }
      .settings-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px 16px;
      }
      @media (min-width: 600px) {
        .settings-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      .settings-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      .settings-row.full-width {
        flex-direction: column;
        align-items: stretch;
      }
      .settings-row.full-width ha-selector {
        width: 100%;
      }
      .period-selectors {
        display: flex;
        flex-direction: row;
        gap: 8px;
        width: 100%;
      }
      .period-selectors ha-selector {
        flex: 1;
      }
      .entities-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-bottom: 12px;
      }
      .show-more-row {
        display: flex;
        justify-content: center;
        margin-top: 8px;
      }
      .entity-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        border: 1px solid var(--divider-color, #eee);
        border-radius: 8px;
        transition: opacity 0.2s;
      }
      .entity-row-top {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
      }
      .entity-row-bottom {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .entity-row.disabled {
        opacity: 0.6;
      }
      .entity-icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--secondary-text-color);
      }
      .entity-info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .entity-name {
        font-weight: 500;
      }
      .entity-id {
        font-size: 0.85em;
        color: var(--secondary-text-color);
      }
      .action-hide {
        --mdc-theme-primary: var(--error-color, #db4437);
      }
      .action-show {
        --mdc-theme-primary: var(--primary-color, #03a9f4);
      }
      h4 {
        margin-bottom: 0px;
        margin-top: 8px;
      }
      ha-textfield {
        width: 100%;
      }
    `;
  }
  _toCssColor(e) {
    return e.startsWith("#") || e.startsWith("rgb") || e.startsWith("hsl") || e.startsWith("var") ? e : `var(--${e}-color)`;
  }
  _renderDynamicIcon(e, t, i = !1, a = !1) {
    var _, g, p;
    const o = ((g = (_ = this.hass) == null ? void 0 : _.locale) == null ? void 0 : g.language) || ((p = this.hass) == null ? void 0 : p.language) || navigator.language || "en";
    let r;
    a ? r = e.toLocaleDateString(o, { weekday: "short" }).toUpperCase() : r = e.toLocaleDateString(o, { month: "short" }).toUpperCase();
    const d = e.getDate();
    return u`
      <svg
        viewBox="0 0 100 100"
        class="dynamic-calendar-icon"
        style="width: 100%; height: 100%; display: block;"
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          rx="20"
          ry="20"
          fill="${i ? "#222222" : "white"}"
        ></rect>
        <path
          d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z"
          fill="${t}"
        ></path>
        <text
          x="50"
          y="23"
          font-family="sans-serif"
          font-size="22"
          font-weight="bold"
          fill="${i ? "#222222" : "white"}"
          text-anchor="middle"
        >
          ${r}
        </text>
        <text
          x="50"
          y="82"
          font-family="sans-serif"
          font-size="52"
          font-weight="bold"
          fill="${i ? "white" : "#333"}"
          text-anchor="middle"
        >
          ${d}
        </text>
      </svg>
    `;
  }
};
re([
  S({ attribute: !1 })
], Z.prototype, "hass", 2);
re([
  H()
], Z.prototype, "_config", 2);
re([
  H()
], Z.prototype, "_showAllCalendars", 2);
Z = re([
  be("calendar-card-plus-editor")
], Z);
const jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get CalendarCardPlusEditor() {
    return Z;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  U as CalendarCardPlus
};
