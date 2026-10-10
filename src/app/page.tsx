import Hero from "@/components/Hero";
import PriceRisers from "@/components/PriceRisers";
import PriceFallers from "@/components/PriceFallers";
import AllProducts from "@/components/AllProducts";
import type { Product } from "@/lib/utils";

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return [];
    }

    return (await response.json()) as Product[];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <PriceRisers products={products} />
      <PriceFallers products={products} />
      <AllProducts products={products} />
    </>
  );
}
