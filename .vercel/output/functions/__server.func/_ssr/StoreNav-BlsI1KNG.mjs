import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCart } from "./router-BBvkWRQ4.mjs";
import { u as useAuth } from "./useAuth-Adry0145.mjs";
import { d as Shield, U as User, S as ShoppingBag } from "../_libs/lucide-react.mjs";
function CartButton() {
  const { items, toggle } = useCart();
  const count = items.reduce((a, b) => a + b.qty, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: toggle,
      className: "relative flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight transition-colors",
      "aria-label": "Abrir carrinho",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Carrinho" }),
        count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 bg-brand text-primary-foreground text-[10px] font-bold size-5 rounded-full flex items-center justify-center", children: count })
      ]
    }
  );
}
const logo = "/assets/logo-B38i25Jl.png";
function StoreNav() {
  const { user } = useAuth();
  const signedIn = !!user;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center", "aria-label": "Emerson Store", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Emerson Store", width: 160, height: 160, className: "h-14 w-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#vapes", className: "hover:text-brand transition-colors", children: "Vapes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#shirts", className: "hover:text-brand transition-colors", children: "Estamparia" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#perfumes", className: "hover:text-brand transition-colors", children: "Perfumes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      signedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin",
          className: "hidden sm:flex items-center gap-2 bg-brand/10 hover:bg-brand/20 border border-brand/40 text-brand px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-4" }),
            " Admin"
          ]
        }
      ),
      signedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/minha-conta",
          className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: user?.name ?? "Minha conta" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/auth",
          className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Entrar" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex bg-brand text-primary-foreground px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 bg-primary-foreground rounded-full animate-pulse" }),
        "Delivery On"
      ] })
    ] })
  ] }) });
}
export {
  StoreNav as S
};
