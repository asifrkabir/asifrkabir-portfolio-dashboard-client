"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllSkills } from "@/hooks/skill.hook";
import { ISkill } from "@/types";
import { columns } from "./data-table/columns";
import { SkillsDataTable } from "./data-table/data-table";

const Skills = () => {
  const { data, isLoading, isError } = useGetAllSkills([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching skills.</p>;
  }

  const skills: ISkill[] = data?.data || [];

  return (
    <>
      <SkillsDataTable data={skills} columns={columns} />
    </>
  );
};

export default Skills;
