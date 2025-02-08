import DashboardOverview from "@/components/DashboardOverview";
import RecentOrders from "@/components/RecentOrders";
import TopProducts from "@/components/TopProducts";

export default function Home() {
  return (
    <div className=" p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardOverview />
      <div className="flex flex-col  gap-6">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  )
}

