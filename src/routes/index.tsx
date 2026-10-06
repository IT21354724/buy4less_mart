import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { products, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buy4Less Mart — Quality Products, Better Prices" },
      { name: "description", content: "Shop A4 paper, lunch sheets, serviettes, sponges and steel wool at the best prices." },
      { property: "og:title", content: "Buy4Less Mart — Quality Products, Better Prices" },
      { property: "og:description", content: "Shop household and paper essentials at the best prices." },
    ],
  }),
  component: Index,
});

const categories = ["All", "Cleaning", "Paper & Kitchen"] as const;

function Index() {
  const { add } = useCart();
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <main>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
            Everyday essentials
          </p>
          <h1 className="font-display text-4xl font-bold md:text-6xl">
            Spend less. <span className="text-secondary">Get more.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">
            Paper, kitchen and cleaning supplies for home and business — with bulk packs that save you even more.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <article key={p.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={p.image} alt={`${p.name} ${p.quantity}`} loading="lazy" className="h-full w-full object-contain p-3 transition group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="font-display text-lg font-bold text-foreground">{p.name}</h2>
                <p className="text-sm text-muted-foreground">{p.quantity}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-lg font-bold text-primary">{formatPrice(p.price)}</span>
                  <AddButton onAdd={() => { add(p.id); toast.success(`${p.name} (${p.quantity}) added to cart`); }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function AddButton({ onAdd }: { onAdd: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <button
      aria-label="Add to cart"
      onClick={() => { onAdd(); setDone(true); setTimeout(() => setDone(false), 900); }}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition hover:scale-110"
    >
      {done ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
    </button>
  );
}
