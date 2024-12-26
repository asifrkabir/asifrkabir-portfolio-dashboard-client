"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllUsers } from "@/hooks/user.hook";
import { IUser } from "@/types";
import { columns } from "./data-table/columns";
import { UserDataTable } from "./data-table/data-table";

const Users = () => {
  const { data, isLoading, isError } = useGetAllUsers([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching users.</p>;
  }

  const users: IUser[] = data?.data || [];

  return (
    <>
      <UserDataTable data={users} columns={columns} />
    </>
  );
};

export default Users;
