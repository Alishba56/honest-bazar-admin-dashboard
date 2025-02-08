import { client } from "@/sanity/lib/client";
import AddProductForm from "./AddProductForm";
import ProductList from "@/app/products/productslist";

export interface Product {
  _id: string;
  title: string;
  price: number;
  description?: string;
  tags: string[];
  reviews: number;
  isNew: boolean;
  sizes: string[];
  sku: string;
  stock: string;
  slug: {
    current: string;
    _type: string;
  };
  rating: number;
  category: string;
  discountPercentage: number;
  productImage: {
    asset: {
      url: string;
    };
  };
}

async function fetchProducts(): Promise<Product[]> {
  return client.fetch(`*[_type == "product"]`, {}, { cache: "no-store" });
}

export default async function ProductsContent() {
  const products = await fetchProducts();

  return (
    <div className="space-y-6">
      <AddProductForm />
      <ProductList initialProducts={products} />
    </div>
  );
}
