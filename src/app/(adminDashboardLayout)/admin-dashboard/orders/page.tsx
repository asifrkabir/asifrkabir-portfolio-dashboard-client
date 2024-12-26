import Orders from "./components/Orders";

const OrdersPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Order</h1>
      </div>
      <Orders />
    </div>
  );
};

export default OrdersPage;
