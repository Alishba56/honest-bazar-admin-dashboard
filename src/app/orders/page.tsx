import OrdersTable from "@/app/orders/OrdersTable";

export default function OrdersPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Orders</h1>
      <OrdersTable />
    </div>
  )
}

