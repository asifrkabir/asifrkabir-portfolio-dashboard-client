"use client";

import TotalUsersCard from "@/components/analytics/TotalUsersCard";

const AdminAnalytics = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalUsersCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </>
  );
};

export default AdminAnalytics;
