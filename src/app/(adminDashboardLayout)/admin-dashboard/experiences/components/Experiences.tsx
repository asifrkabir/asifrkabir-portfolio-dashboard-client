"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllExperiences } from "@/hooks/experience.hook";
import { columns } from "./data-table/columns";
import { ExperiencesDataTable } from "./data-table/data-table";
import { IExperience } from "@/types";

const Experiences = () => {
  const { data, isLoading, isError } = useGetAllExperiences([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching experiences.</p>;
  }

  const experiences: IExperience[] = data?.data || [];

  return (
    <>
      <ExperiencesDataTable data={experiences} columns={columns} />
    </>
  );
};

export default Experiences;
