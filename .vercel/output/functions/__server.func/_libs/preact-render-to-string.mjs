import { l as l$1, _ as _$1, b } from "./preact.mjs";
var r = /[\s\n\\/='"\0<>]/, o = /^(xlink|xmlns|xml)([A-Z])/, i = /^accessK|^auto[A-Z]|^cell|^ch|^col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z]/, a = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/, c = /* @__PURE__ */ new Set(["draggable", "spellcheck"]), s = /["&<]/;
function l(e) {
  if (0 === e.length || false === s.test(e)) return e;
  for (var t = 0, n = 0, r2 = "", o2 = ""; n < e.length; n++) {
    switch (e.charCodeAt(n)) {
      case 34:
        o2 = "&quot;";
        break;
      case 38:
        o2 = "&amp;";
        break;
      case 60:
        o2 = "&lt;";
        break;
      default:
        continue;
    }
    n !== t && (r2 += e.slice(t, n)), r2 += o2, t = n + 1;
  }
  return n !== t && (r2 += e.slice(t, n)), r2;
}
var u = {}, f = /* @__PURE__ */ new Set(["animation-iteration-count", "border-image-outset", "border-image-slice", "border-image-width", "box-flex", "box-flex-group", "box-ordinal-group", "column-count", "fill-opacity", "flex", "flex-grow", "flex-negative", "flex-order", "flex-positive", "flex-shrink", "flood-opacity", "font-weight", "grid-column", "grid-row", "line-clamp", "line-height", "opacity", "order", "orphans", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "widows", "z-index", "zoom"]), p = /[A-Z]/g;
function h(e) {
  var t = "";
  for (var n in e) {
    var r2 = e[n];
    if (null != r2 && "" !== r2) {
      var o2 = "-" == n[0] ? n : u[n] || (u[n] = n.replace(p, "-$&").toLowerCase()), i2 = ";";
      "number" != typeof r2 || o2.startsWith("--") || f.has(o2) || (i2 = "px;"), t = t + o2 + ":" + r2 + i2;
    }
  }
  return t || void 0;
}
function d() {
  this.__d = true;
}
function _(e, t) {
  return { __v: e, context: t, props: e.props, setState: d, forceUpdate: d, __d: true, __h: new Array(0) };
}
var k, w, x, C, A = {}, L = [], E = Array.isArray, T = Object.assign, j = "";
function D(r2, o2, i2) {
  var a2 = l$1.__s;
  l$1.__s = true, k = l$1.__b, w = l$1.diffed, x = l$1.__r, C = l$1.unmount;
  var c2 = _$1(b, null);
  c2.__k = [r2];
  try {
    var s2 = U(r2, o2 || A, false, void 0, c2, false, i2);
    return E(s2) ? s2.join(j) : s2;
  } catch (e) {
    if (e.then) throw new Error('Use "renderToStringAsync" for suspenseful rendering.');
    throw e;
  } finally {
    l$1.__c && l$1.__c(r2, L), l$1.__s = a2, L.length = 0;
  }
}
function P(e, t) {
  var n, r2 = e.type, o2 = true;
  return e.__c ? (o2 = false, (n = e.__c).state = n.__s) : n = new r2(e.props, t), e.__c = n, n.__v = e, n.props = e.props, n.context = t, n.__d = true, null == n.state && (n.state = A), null == n.__s && (n.__s = n.state), r2.getDerivedStateFromProps ? n.state = T({}, n.state, r2.getDerivedStateFromProps(n.props, n.state)) : o2 && n.componentWillMount ? (n.componentWillMount(), n.state = n.__s !== n.state ? n.__s : n.state) : !o2 && n.componentWillUpdate && n.componentWillUpdate(), x && x(e), n.render(n.props, n.state, t);
}
function U(t, s2, u2, f2, p2, d2, v) {
  if (null == t || true === t || false === t || t === j) return j;
  var m = typeof t;
  if ("object" != m) return "function" == m ? j : "string" == m ? l(t) : t + j;
  if (E(t)) {
    var y, g = j;
    p2.__k = t;
    for (var b$1 = 0; b$1 < t.length; b$1++) {
      var S = t[b$1];
      if (null != S && "boolean" != typeof S) {
        var L2, D2 = U(S, s2, u2, f2, p2, d2, v);
        "string" == typeof D2 ? g += D2 : (y || (y = []), g && y.push(g), g = j, E(D2) ? (L2 = y).push.apply(L2, D2) : y.push(D2));
      }
    }
    return y ? (g && y.push(g), y) : g;
  }
  if (void 0 !== t.constructor) return j;
  t.__ = p2, k && k(t);
  var F = t.type, M = t.props;
  if ("function" == typeof F) {
    var W, $, z, H = s2;
    if (F === b) {
      if ("tpl" in M) {
        for (var N = j, q = 0; q < M.tpl.length; q++) if (N += M.tpl[q], M.exprs && q < M.exprs.length) {
          var B = M.exprs[q];
          if (null == B) continue;
          "object" != typeof B || void 0 !== B.constructor && !E(B) ? N += B : N += U(B, s2, u2, f2, t, d2, v);
        }
        return N;
      }
      if ("UNSTABLE_comment" in M) return "<!--" + l(M.UNSTABLE_comment) + "-->";
      $ = M.children;
    } else {
      if (null != (W = F.contextType)) {
        var I = s2[W.__c];
        H = I ? I.props.value : W.__;
      }
      var O = F.prototype && "function" == typeof F.prototype.render;
      if (O) $ = P(t, H), z = t.__c;
      else {
        t.__c = z = _(t, H);
        for (var R = 0; z.__d && R++ < 25; ) z.__d = false, x && x(t), $ = F.call(z, M, H);
        z.__d = true;
      }
      if (null != z.getChildContext && (s2 = T({}, s2, z.getChildContext())), O && l$1.errorBoundaries && (F.getDerivedStateFromError || z.componentDidCatch)) {
        $ = null != $ && $.type === b && null == $.key && null == $.props.tpl ? $.props.children : $;
        try {
          return U($, s2, u2, f2, t, d2, v);
        } catch (e) {
          return F.getDerivedStateFromError && (z.__s = F.getDerivedStateFromError(e)), z.componentDidCatch && z.componentDidCatch(e, A), z.__d ? ($ = P(t, s2), null != (z = t.__c).getChildContext && (s2 = T({}, s2, z.getChildContext())), U($ = null != $ && $.type === b && null == $.key && null == $.props.tpl ? $.props.children : $, s2, u2, f2, t, d2, v)) : j;
        } finally {
          w && w(t), t.__ = null, C && C(t);
        }
      }
    }
    $ = null != $ && $.type === b && null == $.key && null == $.props.tpl ? $.props.children : $;
    try {
      var V = U($, s2, u2, f2, t, d2, v);
      return w && w(t), t.__ = null, l$1.unmount && l$1.unmount(t), V;
    } catch (n) {
      if (v && v.onError) {
        var K = v.onError(n, t, function(e) {
          return U(e, s2, u2, f2, t, d2, v);
        });
        if (void 0 !== K) return K;
        var G = l$1.__e;
        return G && G(n, t), j;
      }
      throw n;
    }
  }
  var J, Q = "<" + F, X = j;
  for (var Y in M) {
    var ee = M[Y];
    if ("function" != typeof ee || "class" === Y || "className" === Y) {
      switch (Y) {
        case "children":
          J = ee;
          continue;
        case "key":
        case "ref":
        case "__self":
        case "__source":
          continue;
        case "htmlFor":
          if ("for" in M) continue;
          Y = "for";
          break;
        case "className":
          if ("class" in M) continue;
          Y = "class";
          break;
        case "defaultChecked":
          Y = "checked";
          break;
        case "defaultSelected":
          Y = "selected";
          break;
        case "defaultValue":
        case "value":
          switch (Y = "value", F) {
            case "textarea":
              J = ee;
              continue;
            case "select":
              f2 = ee;
              continue;
            case "option":
              f2 != ee || "selected" in M || (Q += " selected");
          }
          break;
        case "dangerouslySetInnerHTML":
          X = ee && ee.__html;
          continue;
        case "style":
          "object" == typeof ee && (ee = h(ee));
          break;
        case "acceptCharset":
          Y = "accept-charset";
          break;
        case "httpEquiv":
          Y = "http-equiv";
          break;
        default:
          if (o.test(Y)) Y = Y.replace(o, "$1:$2").toLowerCase();
          else {
            if (r.test(Y)) continue;
            "-" !== Y[4] && !c.has(Y) || null == ee ? u2 ? a.test(Y) && (Y = "panose1" === Y ? "panose-1" : Y.replace(/([A-Z])/g, "-$1").toLowerCase()) : i.test(Y) && (Y = Y.toLowerCase()) : ee += j;
          }
      }
      null != ee && false !== ee && (Q = true === ee || ee === j ? Q + " " + Y : Q + " " + Y + '="' + ("string" == typeof ee ? l(ee) : ee + j) + '"');
    }
  }
  if (r.test(F)) throw new Error(F + " is not a valid HTML tag name in " + Q + ">");
  if (X || ("string" == typeof J ? X = l(J) : null != J && false !== J && true !== J && (X = U(J, s2, "svg" === F || "foreignObject" !== F && u2, f2, t, d2, v))), w && w(t), t.__ = null, C && C(t), !X && Z.has(F)) return Q + "/>";
  var te = "</" + F + ">", ne = Q + ">";
  return E(X) ? [ne].concat(X, [te]) : "string" != typeof X ? [ne, X, te] : ne + X + te;
}
var Z = /* @__PURE__ */ new Set(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
export {
  D
};
