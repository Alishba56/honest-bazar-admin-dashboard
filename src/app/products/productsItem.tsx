import React, { useState } from "react";
import { Product } from "./productscontent";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProductItemProps {
  product: Product;
  onDelete: (id: string) => void;
  onUpdate: (updatedProduct: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.title);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description);

  // New fields
  const [tags, setTags] = useState(product.tags.join(", "));
  const [reviews, setReviews] = useState(product.reviews);
  const [isNew, setIsNew] = useState(product.isNew);
  const [sizes, setSizes] = useState(product.sizes.join(", "));
  const [sku, setSku] = useState(product.sku);
  const [stock, setStock] = useState(product.stock);
  const [slug, setSlug] = useState(product.slug.current);
  const [rating, setRating] = useState(product.rating);
  const [category, setCategory] = useState(product.category);
  const [discountPercentage, setDiscountPercentage] = useState(product.discountPercentage);

  console.log("Product Data:", product); // ✅ Debugging

  const handleDeleteClick = () => onDelete(product._id);
  const handleEditClick = () => setIsEditing(!isEditing);

  const handleSaveClick = () => {
    const updatedProduct = {
      ...product,
      title: name,
      price: parseFloat(price),
      description,
      tags: tags.split(",").map(tag => tag.trim()),
      reviews,
      isNew,
      sizes: sizes.split(",").map(size => size.trim()),
      sku,
      stock,
      slug: { current: slug, _type: "slug" },
      rating,
      category,
      discountPercentage,
    };
    onUpdate(updatedProduct);
    setIsEditing(false);
  };

  const imageUrl = product?.productImage?.asset
    ? urlFor(product.productImage).url()
    : "/fallback-image.jpg"; 

  return (
    <div className="p-4 border rounded-md">
      {!isEditing ? (
        <>
          <h2 className="text-lg font-semibold">{product._id}</h2>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title || "Product image"}
              width={400}
              height={200}
              className="w-[300px] h-[200px] object-cover"
            />
          ) : (
            <p>No Image Available</p>
          )}
          <p className="line-clamp-2">{product.description}</p>
          <p className="font-bold">${product.price}</p>
          <p>Tags: {product.tags.join(", ")}</p>
          <p>Reviews: {product.reviews}</p>
          <p>Is New: {product.isNew ? "Yes" : "No"}</p>
          <p>Sizes: {product.sizes.join(", ")}</p>
          <p>SKU: {product.sku}</p>
          <p>Stock: {product.stock}</p>
          <p>Slug: {product.slug.current}</p>
          <p>Rating: {product.rating}</p>
          <p>Category: {product.category}</p>
          <p>Discount Percentage: {product.discountPercentage}%</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Editable
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            ></textarea>
          </div>
          <div className="mt-2">
            <label>Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>Reviews</label>
            <input
              type="number"
              value={reviews}
              onChange={(e) => setReviews(Number(e.target.value))}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>Is New</label>
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
              className="mt-1"
            />
          </div>
          <div className="mt-2">
            <label>Sizes (comma separated)</label>
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>Stock</label>
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>Rating</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="0"
              max="5"
              step="0.1"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2">
            <label>Discount Percentage</label>
            <input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              min="0"
              max="100"
              step="0.1"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleEditClick}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductItem;
