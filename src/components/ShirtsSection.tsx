import { useRef, useState } from "react";
import shirt1 from "@/assets/shirt-anime-1.jpg";
import shirt2 from "@/assets/shirt-anime-2.jpg";
import shirt3 from "@/assets/shirt-anime-3.jpg";
import { openWhatsApp } from "@/lib/whatsapp";

const PRESETS = [
  { id: "p1", name: "Tokyo Nights", image: shirt1 },
  { id: "p2", name: "Minimal Anime", image: shirt2 },
  { id: "p3", name: "Street View", image: shirt3 },
];

const SIZES = ["P", "M", "G", "GG"];
const COLORS = ["Preta", "Branca", "Off-White"];

export function ShirtsSection() {
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Preta");
  const [preset, setPreset] = useState<string | null>("p1");
  const [uploadName, setUploadName] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadName(f.name);
    setPreset(null);
    setUploadPreview(URL.createObjectURL(f));
  };

  const order = () => {
    const art = uploadName
      ? `Imagem enviada (${uploadName})`
      : `Estampa ${PRESETS.find((p) => p.id === preset)?.name ?? "—"}`;
    openWhatsApp(
      `Olá! Quero personalizar uma camiseta:\n• Tamanho: ${size}\n• Cor: ${color}\n• ${art}`,
    );
  };

  return (
    <section id="shirts" className="bg-brand py-24 text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-8 tracking-tighter">
              ESTAMPE SUA{" "}
              <span className="bg-primary-foreground text-brand px-3">PRÓPRIA</span>{" "}
              HISTÓRIA
            </h2>
            <p className="text-lg md:text-xl mb-10 font-medium opacity-80 max-w-lg">
              Escolha entre nossos designs de anime ou envie sua própria arte para
              personalização total.
            </p>

            <div className="space-y-5">
              {/* Size */}
              <div>
                <label className="font-bold uppercase tracking-tight text-xs mb-2 block">
                  01 — Tamanho
                </label>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`size-12 rounded-full font-bold border-2 transition-all ${
                        size === s
                          ? "bg-primary-foreground text-brand border-primary-foreground"
                          : "border-primary-foreground/30 hover:border-primary-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="font-bold uppercase tracking-tight text-xs mb-2 block">
                  02 — Cor
                </label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${
                        color === c
                          ? "bg-primary-foreground text-brand border-primary-foreground"
                          : "border-primary-foreground/30 hover:border-primary-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload */}
              <div>
                <label className="font-bold uppercase tracking-tight text-xs mb-2 block">
                  03 — Sua arte (opcional)
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={onUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-primary-foreground/40 hover:border-primary-foreground rounded-xl p-5 text-left transition-colors bg-primary-foreground/5"
                >
                  <div className="font-bold uppercase text-sm">
                    {uploadName ?? "Enviar minha imagem"}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    PNG ou JPG até 10MB — estampamos exatamente como você enviar.
                  </div>
                </button>
              </div>

              <button
                onClick={order}
                className="mt-4 bg-primary-foreground text-brand px-10 py-5 font-bold uppercase text-sm rounded-full hover:scale-105 transition-transform"
              >
                Finalizar Pedido no WhatsApp
              </button>
            </div>
          </div>

          {/* Preview & presets */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-primary-foreground/10 rounded-3xl overflow-hidden relative">
              <img
                src={
                  uploadPreview ??
                  PRESETS.find((p) => p.id === preset)?.image ??
                  shirt1
                }
                alt="Preview"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary-foreground text-brand text-xs font-bold uppercase px-3 py-1.5 rounded-full">
                Preview
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-70">
                Ou escolha um preset
              </p>
              <div className="grid grid-cols-3 gap-3">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPreset(p.id);
                      setUploadName(null);
                      setUploadPreview(null);
                    }}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      preset === p.id && !uploadPreview
                        ? "border-primary-foreground scale-95"
                        : "border-transparent hover:border-primary-foreground/40"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
