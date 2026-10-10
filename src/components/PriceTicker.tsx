"use client";

import { useEffect, useState } from "react";
import { formatPrice, toBengaliNumber, type Product } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  if (!products.length) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="overflow-hidden border-t border-slate-200 bg-slate-100">
      <div className="animate-marquee flex whitespace-nowrap py-2.5">
        {tickerItems.map((product, index) => (
          <div key={`${product.id}-${index}`} className="mx-4 inline-flex items-center gap-2 text-sm text-slate-700">
            <span>{product.image}</span>
            <span className="font-semibold">{product.nameBn}</span>
            <span className="text-slate-500">
              {formatPrice(product.today)} টাকা/{product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"}
            </span>
            <span className={product.change.dir === "up" ? "font-bold text-red-500" : product.change.dir === "down" ? "font-bold text-emerald-500" : "font-bold text-slate-400"}>
              {product.change.dir === "up"
                ? `▲ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                : product.change.dir === "down"
                  ? `▼ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                  : `— ${toBengaliNumber("0.0")}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
