"use client";

import { CurrentMonthSalesCard } from "@/components/analytics/CurrentMonthSalesCard";
import RecentOrdersCard from "@/components/analytics/RecentOrdersCard";
import TotalOrdersCard from "@/components/analytics/TotalOrdersCard";
import TotalRevenueCard from "@/components/analytics/TotalRevenueCard";
import TotalUsersCard from "@/components/analytics/TotalUsersCard";

const AdminAnalytics = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalRevenueCard />
        <TotalUsersCard />
        <TotalOrdersCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CurrentMonthSalesCard />
        <RecentOrdersCard />
      </div>
    </>
  );
};

export default AdminAnalytics;
