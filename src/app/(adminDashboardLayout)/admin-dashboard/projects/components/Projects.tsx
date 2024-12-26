"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllProjects } from "@/hooks/project.hook";
import { IQueryParam } from "@/types";
import { IProject } from "@/types/project.type";
import { useState } from "react";
import { columns } from "./data-table/columns";
import { ProjectDataTable } from "./data-table/data-table";

const Projects = () => {
  const [params] = useState<IQueryParam[]>([{ name: "limit", value: 10000 }]);

  const { data, isLoading, isError } = useGetAllProjects(params);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching projects.</p>;
  }

  const projects: IProject[] = data?.data || [];

  return (
    <>
      <ProjectDataTable data={projects} columns={columns} />
    </>
  );
};

export default Projects;
