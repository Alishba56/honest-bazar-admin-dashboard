"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  item: number;
}

interface Order {
  _id: string;
  customer: string;
  date: string;
  status: string;
  item: number[];
  phone: number;  
  email: string;
  user: string;
  streetAddress: string;
  zip: number;
  country: string;
  city: string;
  products: Product[];
}

export default function OrderDetail() {
  const { id } = useParams(); // Get order ID from URL
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        console.error("No order ID found in URL.");
        setError("Invalid order ID.");
        setLoading(false);
        return;
      }

      console.log("Fetching order with ID:", id);

      const query = `*[_type == "order" && _id == $id][0]`;

      try {
        const data = await client.fetch(query, { id });
        console.log("Sanity response:", data);

        if (!data) {
          console.warn("No order found for ID:", id);
          setError("Order not found.");
          setOrder(null);
          setLoading(false);
          return;
        }

        setOrder({
          _id: data._id,
          customer: `${data.details?.firstName || "Unknown"} ${data.details?.lastName || ""}`,
          date: new Date(data._createdAt).toLocaleDateString(),
          item: data.products.item || 0,
          status: data.status || "Unknown",
          phone: data.details.phone || "Unknown",
          email: data.details.email || "Unknown",
          user: data.user || "Unknown",
          streetAddress: data.details.streetAddress || "Unknown",
          zip: data.details.zip || "Unknown",
          city: data.details.city || "Unknown",
          country: data.details.country || "Unknown",
          products: data.products
            ? data.products.map((product: Product) => ({
                _id: product._id || product,
                item: product.item || product, 
                title: product.title || "Unknown",
                price: product.price || "price",
                quantity: product.quantity || 0,
              }))
            : [],
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order. Please try again.");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Order #{order._id}</h2>
      <p><strong>User:</strong> {order.user}</p>
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Items:</strong> {order.products.length} items </p>
      <p><strong>Date:</strong> {order.date}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Street Address:</strong> {order.streetAddress}</p>
      <p><strong>Zip:</strong> {order.zip}</p>
      <p><strong>City:</strong> {order.city}</p>

      <hr className="my-6" />
      <h3 className="text-lg font-bold mt-6">Shipping Details</h3>
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Street Address:</strong> {order.streetAddress}</p>

      <h3 className="text-lg font-bold mt-6">Products</h3>
      {order.products.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200 mt-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Product Name</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Product Id</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Price</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Quantity</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">{product._id}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">${product.price * product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-gray-500">No products found in this order.</p>
      )}
    </div>
  );
}
