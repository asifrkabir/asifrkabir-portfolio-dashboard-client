import Coupons from "./_components/Coupons";

const CouponsPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Coupon</h1>
      </div>
      <Coupons />
    </div>
  );
};

export default CouponsPage;
