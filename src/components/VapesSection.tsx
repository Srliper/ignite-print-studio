import { useState } from "react";
import v150 from "@/assets/vape-v150.jpg";
import v250 from "@/assets/vape-v250.jpg";
import v300 from "@/assets/vape-v300.jpg";
import { openWhatsApp } from "@/lib/whatsapp";

type Vape = {
  id: string;
  name: string;
  image: string;
  price: string;
  flavors: string[];
};

const VAPES: Vape[] = [
  {
    id: "v155",
    name: "Ignite V155",
    image: v150,
    price: "R$ 100,00",
    flavors: ["Banana Ice", "Uva Ice", "Melancia Ice", "Menta"],
  },
  {
    id: "v250",
    name: "Ignite V250",
    image: v250,
    price: "R$ 150,00",
    flavors: ["Strawberry Banana", "Uva Ice", "Pineapple", "Miami Mint"],
  },
  {
    id: "v300",
    name: "Ignite V300",
    image: v300,
    price: "R$ 180,00",
    flavors: ["Premium Blend", "Cherry", "Watermelon Ice", "Tropical"],
  },
];

export function VapesSection() {
  const [picked, setPicked] = useState<Record<string, string>>({});

  const order = (v: Vape) => {
    const flavor = picked[v.id] ?? v.flavors[0];
    openWhatsApp(
      `Olá! Quero pedir: ${v.name} - sabor ${flavor} - ${v.price}`,
    );
  };

  return (
    <section id="vapes" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <span className="text-brand font-bold text-xs uppercase tracking-[0.2em]">
            New Drop
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            IGNITE PODS
          </h2>
        </div>
        <div className="text-muted-foreground text-sm font-mono">V155 • V250 • V300</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {VAPES.map((v) => (
          <article
            key={v.id}
            className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-brand/50 transition-colors group flex flex-col"
          >
            <div className="w-full aspect-square bg-background rounded-xl mb-6 overflow-hidden">
              <img
                src={v.image}
                alt={v.name}
                loading="lazy"
                width={768}
                height={768}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{v.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Sabores: {v.flavors.join(", ")}.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {v.flavors.map((f) => (
                <button
                  key={f}
                  onClick={() => setPicked((p) => ({ ...p, [v.id]: f }))}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase transition-colors text-left ${
                    (picked[v.id] ?? v.flavors[0]) === f
                      ? "bg-brand text-primary-foreground"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
              <span className="text-brand font-bold text-lg">{v.price}</span>
              <button
                onClick={() => order(v)}
                className="px-4 py-2 bg-brand text-primary-foreground rounded-lg text-xs font-bold uppercase hover:scale-105 transition-transform"
              >
                Pedir
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
