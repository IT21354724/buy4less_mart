import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Buy4Less Mart" },
      { name: "description", content: "Review your items and place your order with Buy4Less Mart." },
      { property: "og:title", content: "Your Cart — Buy4Less Mart" },
      { property: "og:description", content: "Review your items and place your order." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, total, setQty, clear } = useCart();
  const [placed, setPlaced] = useState<string | null>(null);

  if (placed) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-primary">Thank you, {placed}!</h1>
        <p className="mt-3 text-muted-foreground">Your order has been received. We'll contact you shortly to confirm delivery.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Continue shopping</Link>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Browse products</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
      <section>
        <h1 className="mb-6 font-display text-3xl font-bold">Your Cart</h1>
        <ul className="space-y-3">
          {lines.map(({ product: p, qty }) => (
            <li key={p.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3">
              <img src={p.image} alt={p.name} className="h-20 w-20 rounded-lg bg-muted object-contain p-1" />
              <div className="flex-1">
                <p className="font-bold">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.quantity} · {formatPrice(p.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Decrease" onClick={() => setQty(p.id, qty - 1)} className="rounded-full border border-border p-1.5"><Minus className="h-4 w-4" /></button>
                <span className="w-6 text-center font-semibold">{qty}</span>
                <button aria-label="Increase" onClick={() => setQty(p.id, qty + 1)} className="rounded-full border border-border p-1.5"><Plus className="h-4 w-4" /></button>
              </div>
              <p className="w-24 text-right font-bold text-primary">{formatPrice(p.price * qty)}</p>
              <button aria-label="Remove" onClick={() => setQty(p.id, 0)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-5 w-5" /></button>
            </li>
          ))}
        </ul>
      </section>

      <form
        className="h-fit space-y-3 rounded-2xl border border-border bg-card p-5"
        onSubmit={(e) => {
          e.preventDefault();
          const name = String(new FormData(e.currentTarget).get("name") || "");
          clear();
          setPlaced(name);
        }}
      >
        <h2 className="font-display text-xl font-bold">Checkout</h2>
        <div className="flex justify-between border-b border-border pb-3 text-lg">
          <span>Total</span>
          <span className="font-bold text-primary">{formatPrice(total)}</span>
        </div>
        <input required name="name" placeholder="Full name" className="w-full rounded-lg border border-input bg-background px-3 py-2" />
        <input required name="phone" type="tel" placeholder="Phone number" className="w-full rounded-lg border border-input bg-background px-3 py-2" />
        <textarea required name="address" placeholder="Delivery address" rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2" />
        <p className="text-sm text-muted-foreground">Payment: Cash on delivery</p>
        <button className="w-full rounded-full bg-secondary py-3 font-bold text-secondary-foreground hover:opacity-90">Place order</button>
      </form>
    </main>
  );
}
