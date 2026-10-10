import Link from "next/link";
import { formatPrice, getUnitBn, toBengaliNumber, type Product } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const badgeClass =
    product.change.dir === "up"
      ? "bg-red-500 text-white"
      : product.change.dir === "down"
        ? "bg-emerald-500 text-white"
        : "bg-slate-200 text-slate-700";

  const badgeText =
    product.change.dir === "up"
      ? `▲ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
      : product.change.dir === "down"
        ? `▼ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
        : `— ${toBengaliNumber("0.0")}%`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl shadow-inner">
          {product.image}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-slate-800 group-hover:text-emerald-700">
            {product.nameBn}
          </h3>
          <p className="text-xs text-slate-500">{getUnitBn(product.unit)}</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">আজকের দাম</p>
          <p className="mt-1 text-xl font-bold text-slate-800">
            {formatPrice(product.today)}
            <span className="ml-1 text-sm font-medium text-slate-500">টাকা</span>
          </p>
        </div>

        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}>
          {badgeText}
        </span>
      </div>
    </Link>
  );
}
