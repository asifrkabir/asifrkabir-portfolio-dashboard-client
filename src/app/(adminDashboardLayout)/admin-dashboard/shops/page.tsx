import Shops from "./components/Shops";

const ShopsPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Shop</h1>
      </div>
      <Shops />
    </div>
  );
};

export default ShopsPage;
