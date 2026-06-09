import p1 from "@/assets/perfume-1.jpg";
import p2 from "@/assets/perfume-2.jpg";
import p3 from "@/assets/perfume-3.jpg";
import p4 from "@/assets/perfume-4.jpg";
import { openWhatsApp } from "@/lib/whatsapp";
import { useCart, parsePrice } from "@/lib/cart-store";
import { toast } from "sonner";

const PERFUMES = [
  {
    name: "521 Vip Rosé",
    ref: "Insp. 212 VIP Rosé",
    family: "Feminino • 100ml",
    price: "R$ 89,90",
    image: p1,
  },
  {
    name: "La Bella",
    ref: "Insp. La Vie Est Belle",
    family: "Feminino • 100ml",
    price: "R$ 89,90",
    image: p2,
  },
  {
    name: "Indomável Black",
    ref: "Insp. Sauvage",
    family: "Masculino • 100ml",
    price: "R$ 95,00",
    image: p3,
  },
  {
    name: "Fantastic",
    ref: "Insp. Fantasy",
    family: "Feminino • 100ml",
    price: "R$ 89,90",
    image: p4,
  },
  {
    name: "Polo Club",
    ref: "Insp. Polo Blue",
    family: "Masculino • 100ml",
    price: "R$ 95,00",
    image: p3,
  },
  {
    name: "Play Men",
    ref: "Insp. Play Givenchy",
    family: "Masculino • 100ml",
    price: "R$ 95,00",
    image: p2,
  },
  {
    name: "Dark Bloom",
    ref: "Insp. Black Orchid",
    family: "Unissex • 100ml",
    price: "R$ 99,00",
    image: p1,
  },
  {
    name: "Fortune",
    ref: "Insp. Olympéa",
    family: "Feminino • 100ml",
    price: "R$ 89,90",
    image: p4,
  },
  {
    name: "521 Number Men",
    ref: "Insp. 212 Men",
    family: "Masculino • 100ml",
    price: "R$ 95,00",
    image: p3,
  },
  {
    name: "Blackout Silver",
    ref: "Insp. Bleu de Chanel",
    family: "Masculino • 100ml",
    price: "R$ 99,00",
    image: p2,
  },
  {
    name: "A'more",
    ref: "Insp. J'adore",
    family: "Feminino • 100ml",
    price: "R$ 89,90",
    image: p1,
  },
  {
    name: "Rouge",
    ref: "Insp. Rouge 540",
    family: "Feminino • 100ml",
    price: "R$ 99,00",
    image: p4,
  },
];

export function PerfumesSection() {
  const addToCart = useCart((s) => s.add);
  return (
    <section id="perfumes" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-brand font-bold text-xs uppercase tracking-[0.3em]">
          Linha Inspirada
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 italic mt-2">
          Perfumes estilo Bortoleto
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Seleção com fragrâncias femininas e masculinas no estilo das referências
          que você enviou, pronta para pedir no delivery pelo WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PERFUMES.map((p) => (
          <button
            key={p.name}
            onClick={() =>
              openWhatsApp(
                `Olá! Quero pedir o perfume ${p.name}\n• Estilo: ${p.ref}\n• Categoria: ${p.family}\n• Valor: ${p.price}`,
              )
            }
            className="group text-left bg-surface rounded-2xl border border-white/5 overflow-hidden hover:border-brand/50 transition-colors"
          >
            <div className="w-full aspect-[4/5] overflow-hidden ring-1 ring-white/5">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={640}
                height={800}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h4 className="font-bold text-lg">{p.name}</h4>
              <p className="text-xs text-muted-foreground uppercase mt-1">{p.ref}</p>
              <p className="text-sm text-muted-foreground mt-2">{p.family}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-brand font-bold italic">{p.price}</span>
                <span className="text-xs uppercase font-bold">Pedir</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
