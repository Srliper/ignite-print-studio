import p1 from "@/assets/perfume-1.jpg";
import p2 from "@/assets/perfume-2.jpg";
import p3 from "@/assets/perfume-3.jpg";
import p4 from "@/assets/perfume-4.jpg";
import { openWhatsApp } from "@/lib/whatsapp";

const PERFUMES = [
  { name: "Signature Gold", ref: "Inspirado em 1 Million", price: "R$ 89,90", image: p1 },
  { name: "Ocean Deep", ref: "Inspirado em Invictus", price: "R$ 89,90", image: p2 },
  { name: "Dark Night", ref: "Inspirado em Sauvage", price: "R$ 95,00", image: p3 },
  { name: "L'Elegance", ref: "Inspirado em La Vie Est Belle", price: "R$ 95,00", image: p4 },
];

export function PerfumesSection() {
  return (
    <section id="perfumes" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-brand font-bold text-xs uppercase tracking-[0.3em]">
          Bortoleto Collection
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 italic tracking-tighter mt-2">
          Contratipos Premium
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Fragrâncias inspiradas nas maiores marcas do mundo, com fixação de
          até 12h.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {PERFUMES.map((p) => (
          <button
            key={p.name}
            onClick={() =>
              openWhatsApp(`Olá! Quero o perfume ${p.name} (${p.ref}) — ${p.price}`)
            }
            className="group text-left"
          >
            <div className="w-full aspect-[4/5] bg-surface rounded-xl mb-4 overflow-hidden ring-1 ring-white/5 group-hover:ring-brand/50 transition-all">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={640}
                height={800}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h4 className="font-bold">{p.name}</h4>
            <p className="text-xs text-muted-foreground uppercase">{p.ref}</p>
            <p className="text-brand mt-2 font-bold italic">{p.price}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
