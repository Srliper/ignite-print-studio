var n, l, u$1, v = [];
function _(l2, u2, t) {
  var i, o, r, f2 = {};
  for (r in u2) "key" == r ? i = u2[r] : "ref" == r ? o = u2[r] : f2[r] = u2[r];
  if (arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : t), "function" == typeof l2 && null != l2.defaultProps) for (r in l2.defaultProps) void 0 === f2[r] && (f2[r] = l2.defaultProps[r]);
  return g(l2, f2, i, o);
}
function g(n2, t, i, o, r) {
  var f2 = { type: n2, props: t, key: i, ref: o, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: ++u$1, __i: -1, __u: 0 };
  return null != l.vnode && l.vnode(f2), f2;
}
function b(n2) {
  return n2.children;
}
n = v.slice, l = { __e: function(n2, l2, u2, t) {
  for (var i, o, r; l2 = l2.__; ) if ((i = l2.__c) && !i.__) try {
    if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(n2)), r = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n2, t || {}), r = i.__d), r) return i.__E = i;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u$1 = 0, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
var f = 0;
function u(e, t, n2, o, i, u2) {
  t || (t = {});
  var a, c, l$1 = t;
  "ref" in t && (a = t.ref, delete t.ref);
  var p = { type: e, props: l$1, key: n2, ref: a, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --f, __i: -1, __u: 0, __source: i, __self: u2 };
  if ("function" == typeof e && (a = e.defaultProps)) for (c in a) void 0 === l$1[c] && (l$1[c] = a[c]);
  return l.vnode && l.vnode(p), p;
}
export {
  _,
  b,
  l,
  u
};
