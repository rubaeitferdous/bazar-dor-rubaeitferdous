import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/utils";

export default function AllProducts({ products }: { products: Product[] }) {
  return (
    <section id="সব-পণ্য" className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">সব পণ্য</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-800">আজকের বাজার দর</h2>
          </div>
          <p className="text-sm text-slate-500">মোট {products.length}টি পণ্যের দাম</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
