import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/utils";

export default function PriceRisers({ products }: { products: Product[] }) {
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  if (!risers.length) return null;

  return (
    <section className="bg-white px-4 py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-2">
          <span className="text-2xl text-red-500">▲</span>
          <h2 className="text-3xl font-bold text-slate-800">আজ দাম বেড়েছে</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
