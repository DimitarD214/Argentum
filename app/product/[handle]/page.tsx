import { getProduct } from "@/lib/shopify";
import { ProductDetails } from "@/components/ProductDetails";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen pt-24 pb-12">
      <div className="container mx-auto">
        {/* Dynamic Client Component handles image switching and variant selection */}
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
