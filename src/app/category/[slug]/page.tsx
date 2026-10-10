"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import type { Category, Product } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams();
  const slug = String(params?.slug || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    Promise.all([
      fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`, { signal: controller.signal }),
      fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`, { signal: controller.signal }),
    ])
      .then(async ([productResponse, categoryResponse]) => {
        if (!productResponse.ok || !categoryResponse.ok) {
          throw new Error("Invalid category");
        }

        const productData = (await productResponse.json()) as Product[];
        const categoryData = (await categoryResponse.json()) as Category;

        if (!ignore) {
          setProducts(productData);
          setCategory(categoryData);
          setError(false);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        if (!ignore) {
          setProducts([]);
          setCategory(null);
          setError(true);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [slug]);

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "price-asc") return result.sort((a, b) => a.today - b.today);
    if (sortBy === "price-desc") return result.sort((a, b) => b.today - a.today);

    return result;
  }, [products, sortBy]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="skeleton mb-2 h-8 w-40" />
            <div className="skeleton h-4 w-28" />
          </div>
          <div className="skeleton h-10 w-36" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="skeleton h-12 w-12 rounded-2xl" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-3 w-16" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <div className="skeleton h-3 w-20" />
                  <div className="skeleton h-6 w-24" />
                </div>
                <div className="skeleton h-6 w-14" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || sortedProducts.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 text-6xl">😢</div>
        <h2 className="mb-2 text-3xl font-bold text-slate-800">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="mb-6 max-w-md text-slate-500">এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।</p>
        <Link href="/" className="btn btn-success rounded-full text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-800">
            <span>{category?.icon || "🛍️"}</span>
            {category?.nameBn || "পণ্য"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">এই ক্যাটাগরিতে মোট {products.length}টি পণ্য</p>
        </div>

        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
