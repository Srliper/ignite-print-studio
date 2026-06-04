export function StoreFooter() {
  return (
    <footer className="bg-surface border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 bg-brand/10 text-brand px-6 py-3 rounded-full mb-8">
          <span className="size-2 bg-brand rounded-full animate-pulse" />
          <span className="text-sm font-bold uppercase tracking-widest">
            Entrega rápida na sua região
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          © 2026 Emerson Store — Estilo e Atitude
        </p>
        <div className="flex justify-center gap-6 text-xs font-bold uppercase tracking-tighter">
          <a href="#" className="hover:text-brand">Instagram</a>
          <a href="#" className="hover:text-brand">WhatsApp</a>
          <a href="#" className="hover:text-brand">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
