export function StoreNav() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="text-2xl font-display font-bold tracking-tighter text-brand">
          EMERSON STORE
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#vapes" className="hover:text-brand transition-colors">Vapes</a>
          <a href="#shirts" className="hover:text-brand transition-colors">Estamparia</a>
          <a href="#perfumes" className="hover:text-brand transition-colors">Perfumes</a>
        </div>
        <div className="bg-brand text-primary-foreground px-5 py-2 rounded-full text-xs font-bold uppercase tracking-tighter flex items-center gap-2">
          <span className="size-1.5 bg-primary-foreground rounded-full animate-pulse" />
          Delivery On
        </div>
      </div>
    </nav>
  );
}
