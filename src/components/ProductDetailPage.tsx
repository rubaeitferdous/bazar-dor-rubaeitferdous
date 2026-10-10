"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { formatPrice, getUnitBn, toBengaliNumber, type Product } from "@/lib/utils";

export default function ProductDetailPage({ product }: { product: Product }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("দয়া করে সাইন ইন করে এই পণ্যের বিস্তারিত দেখুন.");
      router.replace(`/signin?callbackUrl=/product/${product.slug}`);
    }
  }, [isPending, product.slug, router, session]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600" />
      </div>
    );
  }

  const marketsByDivision = product.markets.reduce(
    (accumulator, market) => {
      if (!accumulator[market.division]) {
        accumulator[market.division] = [];
      }
      accumulator[market.division].push(market);
      return accumulator;
    },
    {} as Record<string, typeof product.markets>,
  );

  const minPrice = Math.min(...product.markets.map((market) => market.min));
  const maxPrice = Math.max(...product.markets.map((market) => market.max));
  const avgPrice = Math.round(
    product.markets.reduce((total, market) => total + (market.min + market.max) / 2, 0) /
      product.markets.length,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 text-sm text-slate-500">
        <div className="breadcrumbs">
          <ul>
            <li>
              <Link href="/">হোম</Link>
            </li>
            <li>
              <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link>
            </li>
            <li className="font-semibold text-slate-700">{product.nameBn}</li>
          </ul>
        </div>
      </div>

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-5xl shadow-inner">
              {product.image}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{product.nameBn}</h1>
              <p className="mt-1 text-slate-500">আজকের বাজারের সর্বশেষ দাম ও বিস্তারিত</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
                  {getUnitBn(product.unit)}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    product.change.dir === "up"
                      ? "bg-red-500 text-white"
                      : product.change.dir === "down"
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {product.change.dir === "up"
                    ? `▲ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                    : product.change.dir === "down"
                      ? `▼ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                      : `— ${toBengaliNumber("0.0")}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm text-slate-500">সর্বনিম্ন দাম</p>
          <p className="mt-2 text-2xl font-bold text-emerald-700">
            {formatPrice(minPrice)} <span className="text-sm font-medium text-slate-500">টাকা</span>
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-slate-500">সর্বোচ্চ দাম</p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {formatPrice(maxPrice)} <span className="text-sm font-medium text-slate-500">টাকা</span>
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-slate-500">গড় দাম</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {formatPrice(avgPrice)} <span className="text-sm font-medium text-slate-500">টাকা</span>
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-slate-500">আজকের দাম</p>
          <p className="mt-2 text-2xl font-bold text-slate-800">
            {formatPrice(product.today)} <span className="text-sm font-medium text-slate-500">টাকা</span>
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">🏪 বাজারভিত্তিক আজকের দাম</h2>
        <div className="space-y-6">
          {Object.entries(marketsByDivision).map(([division, markets]) => (
            <div key={division}>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-700">📍 {division}</h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-700">বাজার</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">সর্বনিম্ন</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">সর্বোচ্চ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {markets.map((market) => (
                      <tr key={market.market}>
                        <td className="px-4 py-3 font-medium text-slate-700">{market.market}</td>
                        <td className="px-4 py-3 font-semibold text-emerald-600">{formatPrice(market.min)} টাকা</td>
                        <td className="px-4 py-3 font-semibold text-red-500">{formatPrice(market.max)} টাকা</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">📊 দামের তুলনা</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["আজ", product.today],
            ["গতকাল", product.yesterday],
            ["গত সপ্তাহ", product.lastWeek],
            ["গত মাস", product.lastMonth],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-lg font-bold text-slate-800">{formatPrice(Number(value))} টাকা</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
