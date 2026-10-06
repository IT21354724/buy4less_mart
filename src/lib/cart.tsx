import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

type CartLine = { product: Product; qty: number };
type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "b4l-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const save = (next: Record<string, number>) => {
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const lines: CartLine[] = products
    .map((p) => ({ product: p, qty: items[p.id] ?? 0 }))
    .filter((l) => l.qty > 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.product.price, 0);

  return (
    <Ctx.Provider
      value={{
        lines,
        count,
        total,
        add: (id) => save({ ...items, [id]: (items[id] ?? 0) + 1 }),
        setQty: (id, qty) => {
          const next = { ...items };
          if (qty <= 0) delete next[id];
          else next[id] = qty;
          save(next);
        },
        clear: () => save({}),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
