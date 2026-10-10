import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/ProductDetailPage";
import type { Product } from "@/lib/utils";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const products = (await response.json()) as Product[];
    return products.find((product) => product.slug === slug) || null;
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
