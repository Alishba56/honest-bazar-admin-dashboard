"use client";
import { client } from "@/sanity/lib/client"; // Import the Sanity client
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface Order {
  _id: string;
  _updatedAt: string;
  _type: "order";
  items: number;
  details: { firstName: string; _id: string } | null;
  total: number;
  status: string;
  _createdAt: string;
}

const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const query = `*[_type == "order"]`;

      try {
        const data = await client.fetch(query);
        console.log("Fetched orders:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      Completed: "bg-green-100 text-green-800",
      Processing: "bg-yellow-100 text-yellow-800",
      Shipped: "bg-blue-100 text-blue-800",
      Pending: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[status] || "bg-gray-200 text-gray-900"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Customer
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Date
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Status
              </th>
              <th className="p-3 border text-right">Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t border-gray-200">
                  <td className="px-4 py-3 text-gray-700">{order._id}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {order.details ? order.details.firstName : "Unknown"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                   {   new Date(order._updatedAt ?? "").toLocaleDateString() }
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                  <td className="p-3 border text-right">
                    <Button className="items-center justify-center">
                      <Link href={`/order/${order._id}`}>Details</Link>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-gray-700">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
