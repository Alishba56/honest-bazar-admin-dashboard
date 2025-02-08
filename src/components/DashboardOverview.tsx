"use client";
import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  productImage: {
    url: string;
    _ref: string;
  };
}

interface Order {
  _id: string;
  TotalPrice: number;

}

interface Stats {
  totalRevenue: string;
  totalOrders: number;
  totalCustomers: number;
  conversionRate: string;
  products: Product[];
  uniqueCustomers: Set<string>;
  averageOrderValue: string;
}

const DashboardOverview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalRevenue: "0",
    totalOrders: 0,
    totalCustomers: 0,
    products: [],
    uniqueCustomers: new Set(),
    conversionRate: "0.0%",
    averageOrderValue: "$0.00",
  });

  // Function to calculate total revenue
  const calculateTotalRevenue = (orders: Order[]): number => {
    return orders.reduce((sum, order) => sum + (order.TotalPrice ?? 0), 0);
  };

  // Function to get total unique customers
  const getTotalCustomers = (orders: Order[]): number => {
    const customerIds = new Set(orders.map((order) => order._id).filter(Boolean));
    return customerIds.size;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch orders data
        const ordersQuery = `*[_type == "order"] | order(createdAt desc)`;
        const orders: Order[] = await client.fetch(ordersQuery);

        // Fetch products data
        const productsQuery = `*[_type == "product"] {
          _id,
          title,
          price,
          description,
          "productImage": image.asset->{url, _ref}
        }`;
        const products: Product[] = await client.fetch(productsQuery);

        // Compute revenue and customer stats
        const totalRevenue = calculateTotalRevenue(orders);
        const totalCustomers = getTotalCustomers(orders);
        const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

        // Update state with calculated stats
        setStats({
          totalRevenue: `$${totalRevenue.toFixed(2)}`,
          totalOrders: orders.length,
          totalCustomers,
          conversionRate: totalCustomers > 0 
            ? `${((orders.length / totalCustomers) * 100).toFixed(0)}%` 
            : "0.0%",
          products,
          uniqueCustomers: new Set(orders.map((order) => order._id)),
          averageOrderValue: orders.length > 0 
            ? `$${averageOrderValue.toFixed(2)}` 
            : "$0.00",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="Total Revenue" 
        value={stats.totalRevenue} 
        icon={<DollarSign className="h-8 w-8" />} 
      />
      <StatCard 
        title="Total Orders" 
        value={stats.totalOrders.toString()} 
        icon={<ShoppingCart className="h-8 w-8" />} 
      />
      <StatCard 
        title="Total Customers" 
        value={stats.totalCustomers.toString()} 
        icon={<Users className="h-8 w-8" />} 
      />
      <StatCard 
        title="Products" 
        value={stats.products.length.toString()} 
        icon={<Package className="h-8 w-8" />} 
      />
    </div>
  );
};

// Component for displaying individual stats
const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="rounded-full bg-blue-100 p-3 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  </div>
);

export default DashboardOverview;
