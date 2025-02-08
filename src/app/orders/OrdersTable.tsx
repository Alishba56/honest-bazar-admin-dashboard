"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Button } from "../../components/ui/button";

interface Order {
  _id: string;
  customer?: string;
  details?: {
    firstName: string;
    lastName: string;
  };
  // total?: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  _updatedAt: string;
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "All">(
    "All"
  );
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const query = `*[_type == "order"]`;

      try {
        const data = await client.fetch(query);
        const formattedData = data.map((order: Order) => ({
          _id: order._id,

          customer:
            order.details?.firstName + " " + order.details?.lastName ||
            "Unknown",
        _updatedAt: new Date(order._updatedAt ?? "").toLocaleDateString(),
        status: order.status,
      }));
      
      // total: order.total ?? 0,
        setOrders(formattedData);
        setFilteredOrders(formattedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterOrders(term, statusFilter);
  };

  const handleStatusFilter = (status: Order["status"] | "All") => {
    setStatusFilter(status);
    filterOrders(searchTerm, status);
  };

  const filterOrders = (term: string, status: Order["status"] | "All") => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order._id.toLowerCase().includes(term) ||
        order.customer?.toLowerCase().includes(term);
      const matchesStatus = status === "All" || order.status === status;
      return matchesSearch && matchesStatus;
    });
    setFilteredOrders(filtered);
  };

  const statusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "text-gray-600 bg-gray-200";
      case "Processing":
        return "text-yellow-600 bg-yellow-200";
      case "Shipped":
        return "text-blue-600 bg-blue-200";
      case "Delivered":
        return "text-green-600 bg-green-200";
      case "Cancelled":
        return "text-red-600 bg-red-200";
      default:
        return "text-gray-600 bg-gray-200";
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded-md w-full sm:w-64"
        />

        <div className="flex flex-wrap gap-2">
          {[
            "All",
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() =>
                handleStatusFilter(status as Order["status"] | "All")
              }
              className={`px-4 py-2 rounded-md focus:outline-none ${
                statusFilter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-right">Customer</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border text-center">
                  <td className="p-3 border">{order._id}</td>
                  <td className="p-3 border">{order.customer}</td>
                  <td className="p-3 border">{order. _updatedAt}</td>
                  <td
                    className={`p-3 border font-bold ${statusColor(order.status)}`}
                    >
                    {order.status}
                  </td>
                  <td className="p-3 border text-right">
                    <Button onClick={() => router.push(`/order/${order._id}`)}>
                      details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
