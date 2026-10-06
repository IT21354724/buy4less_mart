import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Buy4Less Mart" className="h-14 w-14 object-contain" />
          <span className="font-display text-2xl font-bold text-primary">
            Buy4Less <span className="text-accent-foreground">Mart</span>
          </span>
        </Link>
        <Link
          to="/cart"
          className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90"
        >
          <ShoppingCart className="h-5 w-5" />
          Cart
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-secondary px-1 text-xs font-bold text-secondary-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-primary py-8 text-center text-sm text-primary-foreground">
      <p className="font-display text-lg">Buy4Less Mart</p>
      <p className="opacity-80">Quality Products • Better Prices</p>
    </footer>
  );
}
