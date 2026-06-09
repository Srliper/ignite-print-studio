import { useCart, formatBRL } from "@/lib/cart-store";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, clear } = useCart();
  const total = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  const checkoutWhats = () => {
    const lines = items
      .map((it) => {
        const opts = it.options
          ? Object.entries(it.options)
              .map(([k, v]) => `  ${k}: ${v}`)
              .join("\n")
          : "";
        return `• ${it.qty}x ${it.name} — ${formatBRL(it.price * it.qty)}${opts ? "\n" + opts : ""}`;
      })
      .join("\n");
    openWhatsApp(
      `Olá! Quero finalizar este pedido:\n\n${lines}\n\nTotal: ${formatBRL(total)}`,
    );
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          aria-hidden
        />
      )}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-display font-bold flex items-center gap-2">
            <ShoppingBag className="size-5" /> Seu carrinho
          </h2>
          <button
            onClick={close}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 opacity-60 text-sm">
              Seu carrinho está vazio.
            </div>
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                className="flex gap-4 bg-surface rounded-xl p-3 border border-white/5"
              >
                <img
                  src={it.image}
                  alt={it.name}
                  className="size-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm truncate">{it.name}</h3>
                      {it.options && (
                        <p className="text-xs opacity-60 mt-0.5 line-clamp-2">
                          {Object.entries(it.options)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => remove(it.id)}
                      className="opacity-60 hover:opacity-100 hover:text-red-400 transition-colors flex-shrink-0"
                      aria-label="Remover"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-white/5 rounded-full">
                      <button
                        onClick={() => setQty(it.id, it.qty - 1)}
                        className="p-1.5 hover:bg-white/10 rounded-full"
                        aria-label="Diminuir"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{it.qty}</span>
                      <button
                        onClick={() => setQty(it.id, it.qty + 1)}
                        className="p-1.5 hover:bg-white/10 rounded-full"
                        aria-label="Aumentar"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <span className="text-brand font-bold text-sm">
                      {formatBRL(it.price * it.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 p-5 space-y-3">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium opacity-80">Total</span>
              <span className="font-bold text-brand">{formatBRL(total)}</span>
            </div>
            <button
              onClick={checkoutWhats}
              className="w-full bg-brand text-primary-foreground rounded-full py-3.5 font-bold uppercase tracking-tight text-sm hover:scale-[1.02] transition-transform"
            >
              Finalizar no WhatsApp
            </button>
            <button
              onClick={clear}
              className="w-full text-xs opacity-60 hover:opacity-100 transition-opacity"
            >
              Esvaziar carrinho
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
