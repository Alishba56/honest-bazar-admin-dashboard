"use client";

import { useState } from "react";
import { client } from "@/sanity/lib/client";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // New fields
  const [tags, setTags] = useState("");
  const [reviews, setReviews] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [sizes, setSizes] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [slug, setSlug] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      let imageRef = "";

      if (image) {
        const imageAsset = await client.assets.upload("image", image);
        imageRef = imageAsset._id; 
      }

      await client.create({
        _type: "product",
        title: name,
        quantity,
        price: Number.parseFloat(price),
        description,
        productImage: imageRef
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageRef, 
              },
            }
          : undefined,
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
      });

      // Reset form fields
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setTags("");
      setReviews(0);
      setIsNew(false);
      setSizes("");
      setSku("");
      setStock("");
      setSlug("");
      setRating(0);
      setCategory("");
      setDiscountPercentage(0);
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          step="0.01"
          min="0"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          min="0"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="reviews" className="block text-sm font-medium text-gray-700">
          Reviews
        </label>
        <input
          type="number"
          id="reviews"
          value={reviews}
          onChange={(e) => setReviews(Number(e.target.value))}
          min="0"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="isNew" className="block text-sm font-medium text-gray-700">
          Is New
        </label>
        <input
          type="checkbox"
          id="isNew"
          checked={isNew}
          onChange={(e) => setIsNew(e.target.checked)}
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">
          Sizes (comma separated)
        </label>
        <input
          type="text"
          id="sizes"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
          SKU
        </label>
        <input
          type="text"
          id="sku"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
          Stock
        </label>
        <input
          type="text"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="0"
          max="5"
          step="0.1"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">
          Discount Percentage
        </label>
        <input
          type="number"
          id="discountPercentage"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(Number(e.target.value))}
          min="0"
          max="100"
          step="0.1"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button> 
    </form>
  );
}
