"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  price: number;
  title: string;
  description: string;
  productImage?: {
    asset?: {
      url?: string;
    };
  };
}

const TopProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const query = `*[_type == "product"] | order(_createdAt desc) {
        _id,
        title,
        description,
        price,
        productImage { asset -> { url } }
      }`;

      try {
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-4xl justify-center flex font-bold mb-10">Products</h2>
      <ul className="flex flex-wrap justify-center gap-6">
        {products.map((product) => {
          const imageUrl =
            product.productImage?.asset?.url || "/placeholder.png";

          return (
            <li
              key={product._id}
              className="rounded-md border w-[280px] h-[350px] bg-slate-100 items-center mb-2"
            >
              <Image
                src={imageUrl}
                alt={product.title}
                width={280}
                height={180}
                className="w-full h-48 object-cover"
              />
              <h1 className="font-bold"> Name: {product.title}</h1>
              <h1 className="font-bold">Price: ${product.price}</h1>
              <span className="line-clamp-3">{product.description} </span>
              
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopProducts;
