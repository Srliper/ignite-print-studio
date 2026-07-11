import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as StoreNav } from "./StoreNav-BlsI1KNG.mjs";
import { o as openWhatsApp, W as WHATSAPP_NUMBER } from "./whatsapp-Bk-mZZnG.mjs";
import { u as useCart, p as parsePrice } from "./router-BBvkWRQ4.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./useAuth-Adry0145.mjs";
import "./auth-CHLIm9Dg.mjs";
import "../_libs/auth__core.mjs";
import "../_libs/panva__hkdf.mjs";
import "../_libs/jose.mjs";
import "../_libs/preact-render-to-string.mjs";
import "../_libs/preact.mjs";
import "../_libs/oauth4webapi.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-CMbdw2-U.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "./client-Bb-1S0Oi.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DQvKKjOX.mjs";
import "../_libs/start-authjs.mjs";
import "../_libs/zod.mjs";
const heroImg = "/assets/hero-street-B6BcjCkl.jpg";
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "top", className: "relative h-[80vh] min-h-[600px] flex items-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: heroImg,
        alt: "Atmosfera urbana neon",
        width: 1920,
        height: 1280,
        className: "absolute inset-0 w-full h-full object-cover opacity-50"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-brand font-bold text-xs uppercase tracking-[0.3em] mb-6 border border-brand/40 px-3 py-1 rounded-full", children: "Drop 2026 — Entrega Delivery" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-6 italic tracking-tighter", children: [
        "STREET",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "ESSENTIALS." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-muted-foreground mb-8 text-lg", children: "Pods Ignite, perfumes contratipos premium e estamparia personalizada de anime. Tudo entregue na sua porta." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => openWhatsApp("Olá Emerson! Quero fazer um pedido pela loja."),
            className: "bg-brand text-primary-foreground px-8 py-4 font-bold uppercase text-sm hover:scale-105 transition-transform rounded-md",
            children: "Pedir no WhatsApp"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#shirts",
            className: "border border-white/20 text-foreground px-8 py-4 font-bold uppercase text-sm hover:bg-white/5 transition-colors rounded-md",
            children: "Personalizar Camiseta"
          }
        )
      ] })
    ] })
  ] });
}
const v150 = "/assets/vape-v150-DLForF-c.jpg";
const v250 = "/assets/vape-v250-JMs_iG3X.jpg";
const v300 = "/assets/vape-v300-DXUC-JpL.jpg";
const smokingSilverCover = "/assets/smoking-silver-cover-CA-uagAX.jpg";
const VAPES = [
  {
    id: "v155",
    name: "Ignite V155 Ultra Slim",
    image: v150,
    price: "R$ 100,00",
    puffs: "15.5k puffs",
    flavors: [
      "Banana Ice",
      "Uva Ice",
      "Watermelon Ice",
      "Strawberry",
      "Cherry",
      "Miami Mint"
    ]
  },
  {
    id: "v250",
    name: "Ignite V250",
    image: v250,
    price: "R$ 130,00",
    puffs: "25k puffs",
    flavors: [
      "Strawberry Watermelon",
      "Banana Ice",
      "Strawberry Kiwi",
      "Pineapple Ice"
    ]
  },
  {
    id: "v300",
    name: "Ignite V300",
    image: v300,
    price: "R$ 150,00",
    puffs: "30k puffs",
    flavors: [
      "Pineapple Ice",
      "Strawberry",
      "Cherry Ice",
      "Tropical Mix",
      "Mint Power"
    ]
  },
  {
    id: "mix",
    name: "Ignite MIX",
    image: v250,
    price: "R$ 120,00",
    puffs: "Multi-sabor",
    flavors: [
      "Watermelon Ice",
      "Strawberry",
      "Cherry Cool",
      "Miami Mint",
      "Banana Ice",
      "Uva Ice"
    ]
  },
  {
    id: "airmez",
    name: "Airmez 2 in 1",
    image: v300,
    price: "R$ 110,00",
    puffs: "2 sabores no mesmo pod",
    flavors: ["Strawberry + Grape", "Coal Mint", "Watermelon + Ice"]
  },
  {
    id: "eternity",
    name: "Eternity 28.000 puffs",
    image: v150,
    price: "R$ 170,00",
    puffs: "28k puffs",
    flavors: [
      "Strawberry Watermelon",
      "Banana Ice",
      "Uva Ice",
      "Mint Power"
    ]
  }
];
function VapesSection() {
  const [picked, setPicked] = reactExports.useState({});
  const addToCart = useCart((s) => s.add);
  const addCart = (v) => {
    const flavor = picked[v.id] ?? v.flavors[0];
    addToCart({
      id: `${v.id}-${flavor}`,
      productId: v.id,
      category: "vape",
      name: v.name,
      price: parsePrice(v.price),
      image: v.image,
      options: { Sabor: flavor, Capacidade: v.puffs }
    });
    toast.success(`${v.name} adicionado ao carrinho`);
  };
  const orderWhats = (v) => {
    const flavor = picked[v.id] ?? v.flavors[0];
    openWhatsApp(
      `Olá! Quero pedir um pod ${v.name}
• Capacidade: ${v.puffs}
• Sabor: ${flavor}
• Valor: ${v.price}`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "vapes", className: "py-24 max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full rounded-3xl overflow-hidden mb-12 border border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: smokingSilverCover,
          alt: "Smoking Silver — coleção de pods Ignite",
          width: 1536,
          height: 1024,
          loading: "lazy",
          className: "w-full h-[280px] md:h-[420px] object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-6 md:bottom-10 md:left-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold text-xs uppercase tracking-[0.2em]", children: "New Drop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-6xl font-display font-bold tracking-tighter mt-1", children: "IGNITE PODS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-xl text-sm md:text-base", children: "Escolha o modelo, confira a média de puffs e selecione o sabor." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: VAPES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "bg-surface p-6 rounded-2xl border border-white/5 hover:border-brand/50 transition-colors group flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-square bg-background rounded-xl mb-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: v.image,
              alt: v.name,
              loading: "lazy",
              width: 768,
              height: 768,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: v.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold px-2 py-1 rounded-full bg-white/5 text-brand", children: v.puffs })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-4", children: [
            "Sabores disponíveis: ",
            v.flavors.join(", "),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mb-4", children: v.flavors.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setPicked((p) => ({ ...p, [v.id]: f })),
              className: `px-3 py-2 rounded-lg text-xs font-semibold uppercase transition-colors text-left ${(picked[v.id] ?? v.flavors[0]) === f ? "bg-brand text-primary-foreground" : "bg-white/5 hover:bg-white/10"}`,
              children: f
            },
            f
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-4 border-t border-white/5 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold text-lg", children: v.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => orderWhats(v),
                  className: "text-xs font-semibold uppercase opacity-60 hover:opacity-100 transition-opacity",
                  children: "WhatsApp"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => addCart(v),
                className: "w-full px-4 py-2.5 bg-brand text-primary-foreground rounded-lg text-xs font-bold uppercase hover:scale-[1.02] transition-transform",
                children: "Adicionar ao carrinho"
              }
            )
          ] })
        ]
      },
      v.id
    )) })
  ] });
}
const shirt1 = "/assets/shirt-anime-1-d5dcvE0B.jpg";
const shirt2 = "/assets/shirt-anime-2-CuPHGtUy.jpg";
const shirt3 = "/assets/shirt-anime-3-CoUYIeoJ.jpg";
const SHIRT_PRICE = 79.9;
const PRESETS = [
  { id: "p1", name: "Drop Demon Style", image: shirt1 },
  { id: "p2", name: "Drop Attack Mono", image: shirt2 },
  { id: "p3", name: "Drop Akatsuki Street", image: shirt3 }
];
const SIZES = ["P", "M", "G", "GG"];
const COLORS = ["Preta", "Branca", "Off-White"];
function ShirtsSection() {
  const [size, setSize] = reactExports.useState("M");
  const [color, setColor] = reactExports.useState("Preta");
  const [preset, setPreset] = reactExports.useState("p1");
  const [uploadName, setUploadName] = reactExports.useState(null);
  const [uploadPreview, setUploadPreview] = reactExports.useState(null);
  const fileRef = reactExports.useRef(null);
  const addToCart = useCart((s) => s.add);
  const onUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadName(f.name);
    setPreset(null);
    setUploadPreview(URL.createObjectURL(f));
  };
  const selectedPreset = PRESETS.find((p) => p.id === preset);
  const artLabel = uploadName ? `Arte personalizada (${uploadName})` : selectedPreset?.name ?? "—";
  const previewImage = uploadPreview ?? selectedPreset?.image ?? shirt1;
  const addCart = () => {
    addToCart({
      id: `shirt-${size}-${color}-${uploadName ?? preset}`,
      productId: "shirt",
      category: "shirt",
      name: `Camiseta — ${artLabel}`,
      price: SHIRT_PRICE,
      image: previewImage,
      options: { Tamanho: size, Cor: color, Estampa: artLabel }
    });
    toast.success("Camiseta adicionada ao carrinho");
  };
  const orderWhats = () => {
    openWhatsApp(
      `Olá! Quero personalizar uma camiseta
• Tamanho: ${size}
• Cor base: ${color}
• ${artLabel}
• Valor: R$ ${SHIRT_PRICE.toFixed(2).replace(".", ",")}`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "shirts", className: "bg-brand py-24 text-primary-foreground overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-5xl md:text-6xl font-display font-bold leading-tight mb-8", children: [
        "CAMISETAS DE ANIME E",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary-foreground text-brand px-3 ml-3 inline-block", children: "ESTAMPA PRÓPRIA" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl mb-10 font-medium opacity-80 max-w-lg", children: "Escolha uma arte no estilo das referências enviadas ou mande sua própria imagem para produzir a camiseta personalizada." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold uppercase tracking-tight text-xs mb-2 block", children: "01 — Tamanho" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: SIZES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSize(s),
              className: `size-12 rounded-full font-bold border-2 transition-all ${size === s ? "bg-primary-foreground text-brand border-primary-foreground" : "border-primary-foreground/30 hover:border-primary-foreground"}`,
              children: s
            },
            s
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold uppercase tracking-tight text-xs mb-2 block", children: "02 — Cor da camiseta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setColor(c),
              className: `px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${color === c ? "bg-primary-foreground text-brand border-primary-foreground" : "border-primary-foreground/30 hover:border-primary-foreground"}`,
              children: c
            },
            c
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold uppercase tracking-tight text-xs mb-2 block", children: "03 — Enviar sua imagem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*",
              onChange: onUpload,
              className: "hidden"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => fileRef.current?.click(),
              className: "w-full border-2 border-dashed border-primary-foreground/40 hover:border-primary-foreground rounded-xl p-5 text-left transition-colors bg-primary-foreground/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold uppercase text-sm", children: uploadName ?? "Clique para enviar sua arte" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-70 mt-1", children: "PNG ou JPG até 10MB. Também fazemos baseado na imagem que você mandar." })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: addCart,
              className: "flex-1 bg-primary-foreground text-brand px-8 py-4 font-bold uppercase text-sm rounded-full hover:scale-105 transition-transform",
              children: [
                "Adicionar — R$ ",
                SHIRT_PRICE.toFixed(2).replace(".", ",")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: orderWhats,
              className: "px-6 py-4 font-bold uppercase text-sm rounded-full border-2 border-primary-foreground/40 hover:border-primary-foreground transition-colors",
              children: "WhatsApp"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/5] bg-primary-foreground/10 rounded-3xl overflow-hidden relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: uploadPreview ?? PRESETS.find((p) => p.id === preset)?.image ?? shirt1,
            alt: "Preview da estampa",
            loading: "lazy",
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 bg-primary-foreground text-brand text-xs font-bold uppercase px-3 py-1.5 rounded-full", children: "Preview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest mb-3 opacity-70", children: "Escolha uma estampa pronta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setPreset(p.id);
              setUploadName(null);
              setUploadPreview(null);
            },
            className: `aspect-square rounded-xl overflow-hidden border-2 transition-all ${preset === p.id && !uploadPreview ? "border-primary-foreground scale-95" : "border-transparent hover:border-primary-foreground/40"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: p.image,
                alt: p.name,
                loading: "lazy",
                className: "w-full h-full object-cover"
              }
            )
          },
          p.id
        )) })
      ] })
    ] })
  ] }) }) });
}
const fortune = "/assets/perfume-fortune-BoLrN7Ca.jpg";
const poloClub = "/assets/perfume-polo-club-CIz1mND_.jpg";
const racingCar = "/assets/perfume-racing-car-BsjmqrD1.jpg";
const vipRose = "/assets/perfume-521-rose-wc1_MbWT.jpg";
const vipBlack = "/assets/perfume-521-black-B9x1k43A.jpg";
const PERFUMES = [
  {
    name: "Perfume Fortune Parfum Bortoletto 100ml",
    ref: "Insp. One Million (Paco Rabanne)",
    family: "Masculino • 100ml",
    description: "O perfume masculino mais fácil de vender, com aroma amadeirado e sedutor.",
    price: "R$ 92,28",
    image: fortune
  },
  {
    name: "Perfume Polo Club Parfum Bortoletto 100ml",
    ref: "Insp. Polo Blue (Ralph Lauren)",
    family: "Masculino • 100ml",
    description: "Opção fresca, aquática e elegante, perfeita para uso diário e climas quentes.",
    price: "R$ 139,98",
    image: poloClub
  },
  {
    name: "Perfume Racing Car 100ml Atlântica Natural - Bortoletto",
    ref: "Insp. Ferrari Black",
    family: "Masculino • 100ml",
    description: "Um dos aromas cítricos/amadeirados mais populares do Brasil, com venda rápida garantida.",
    price: "R$ 205,42",
    image: racingCar
  },
  {
    name: "Perfume Bortoletto 521 Vip Rose Feminino 100ml",
    ref: "Insp. 212 VIP Rosé",
    family: "Feminino • 100ml",
    description: "Fragrância floral amadeirada muito procurada para festas e eventos cotidianos.",
    price: "R$ 180,00",
    image: vipRose
  },
  {
    name: "Perfume 521 Vip Black 100ml Atlântica Natural - Bortoletto",
    ref: "Insp. 212 VIP Black",
    family: "Masculino • 100ml",
    description: "Aroma moderno e marcante muito desejado pelo público jovem para a noite.",
    price: "R$ 187,92",
    image: vipBlack
  }
];
function PerfumesSection() {
  const addToCart = useCart((s) => s.add);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "perfumes", className: "py-24 max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold text-xs uppercase tracking-[0.3em]", children: "Linha Inspirada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-display font-bold mb-4 italic mt-2", children: "Perfumes estilo Bortoleto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Seleção com fragrâncias femininas e masculinas no estilo das referências que você enviou, pronta para pedir no delivery pelo WhatsApp." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: PERFUMES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "group text-left bg-surface rounded-2xl border border-white/5 overflow-hidden hover:border-brand/50 transition-colors flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[4/5] overflow-hidden ring-1 ring-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: p.image,
              alt: p.name,
              loading: "lazy",
              width: 640,
              height: 800,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg leading-snug", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase mt-1", children: p.ref }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: p.family }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/80 mt-2", children: p.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand font-bold italic", children: p.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => openWhatsApp(
                    `Olá! Quero pedir o perfume ${p.name}
• Estilo: ${p.ref}
• Categoria: ${p.family}
• Valor: ${p.price}`
                  ),
                  className: "text-xs uppercase font-semibold opacity-60 hover:opacity-100 transition-opacity",
                  children: "WhatsApp"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  addToCart({
                    id: p.name,
                    productId: p.name,
                    category: "perfume",
                    name: p.name,
                    price: parsePrice(p.price),
                    image: p.image,
                    options: { Estilo: p.ref, Categoria: p.family }
                  });
                  toast.success(`${p.name} adicionado ao carrinho`);
                },
                className: "mt-4 w-full bg-brand text-primary-foreground py-2.5 rounded-lg text-xs font-bold uppercase hover:scale-[1.02] transition-transform",
                children: "Adicionar ao carrinho"
              }
            )
          ] })
        ]
      },
      p.name
    )) })
  ] });
}
const OWNER_EMAIL = "emerstore385@gmail.com";
function StoreFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-surface border-t border-white/5 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-3 bg-brand/10 text-brand px-6 py-3 rounded-full mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 bg-brand rounded-full animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase tracking-widest", children: "Entrega rápida na sua região" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "© 2026 Emerson Store — Estilo e Atitude" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-tighter", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://wa.me/${WHATSAPP_NUMBER}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-brand",
          children: "WhatsApp (15) 98118-3740"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${OWNER_EMAIL}`, className: "hover:text-brand normal-case tracking-normal", children: OWNER_EMAIL })
    ] })
  ] }) });
}
function WhatsFloat() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: () => openWhatsApp("Olá Emerson! Vim pela loja online."),
      "aria-label": "Falar no WhatsApp",
      className: "fixed bottom-6 right-6 z-50 size-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-black/40 hover:scale-110 transition-transform",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "size-7 text-white fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) })
    }
  );
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("link", { href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;500;600;700&display=swap", rel: "stylesheet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoreNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(VapesSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShirtsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PerfumesSection, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StoreFooter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsFloat, {})
  ] });
}
export {
  Index as component
};
