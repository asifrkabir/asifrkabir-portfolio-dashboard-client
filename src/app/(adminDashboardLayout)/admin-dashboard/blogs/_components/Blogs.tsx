"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllBlogs } from "@/hooks/blog.hook";
import { IQueryParam } from "@/types";
import { IBlog } from "@/types/blog.type";
import { useState } from "react";
import { columns } from "./data-table/columns";
import { BlogDataTable } from "./data-table/data-table";

const Blogs = () => {
  const [params] = useState<IQueryParam[]>([{ name: "limit", value: 10000 }]);

  const { data, isLoading, isError } = useGetAllBlogs(params);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching blogs.</p>;
  }

  const blogs: IBlog[] = data?.data || [];

  return (
    <>
      <BlogDataTable data={blogs} columns={columns} />
    </>
  );
};

export default Blogs;
