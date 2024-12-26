"use client";

import AppDatePicker from "@/components/form/AppDatePicker";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppRichTextEditor from "@/components/form/AppRichTextEditor";
import { Button } from "@/components/ui/button";
import {
  useGetExperienceById,
  useUpdateExperience,
} from "@/hooks/experience.hook";
import { updateExperienceValidationSchema } from "@/schemas/experience.schema";
import { IApiResponse, IExperience, IUpdateExperience } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  id: string;
  closeModal: () => void;
}

const UpdateExperienceForm = ({ id, closeModal }: IProps) => {
  const { data: experienceData, isLoading, isError } = useGetExperienceById(id);
  const { mutate: updateExperience, isPending } = useUpdateExperience();
  const queryClient = useQueryClient();

  if (isLoading || !experienceData) {
    return <p>Loading experience...</p>;
  }

  if (isError) {
    return <p>Something went wrong while fetching experience</p>;
  }

  const experience = experienceData.data as IExperience;

  const existingExperienceValues = {
    title: experience.title,
    company: experience.company,
    startDate: experience.startDate
      ? new Date(experience.startDate).toISOString()
      : undefined,
    endDate: experience.endDate
      ? new Date(experience.endDate).toISOString()
      : undefined,
    description: experience.description,
    technologies: experience.technologies?.join(", "),
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const experienceData: IUpdateExperience = {
      id: experience._id,
      payload: {
        title: data.title,
        company: data.company,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        description: data.description || undefined,
        technologies: data.technologies
          ? data.technologies.split(",").map((tech: string) => tech.trim())
          : undefined,
      },
    };

    updateExperience(experienceData, {
      onSuccess: (res: IApiResponse<IExperience>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Experience updated successfully");

          queryClient.invalidateQueries({
            queryKey: ["EXPERIENCES"],
          });

          queryClient.invalidateQueries({
            queryKey: ["EXPERIENCE", id],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to update experience. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to update experience. Please try again."
        );
      },
    });
  };

  return (
    <div className="grid gap-4 my-2">
      <AppForm
        onSubmit={handleSubmit}
        resolver={zodResolver(updateExperienceValidationSchema)}
        defaultValues={existingExperienceValues}
      >
        <AppInput
          name="title"
          label="Title"
          type="text"
          placeholder="Enter title"
          required
        />

        <AppInput
          name="company"
          label="Company"
          type="text"
          placeholder="Enter company name"
          required
        />

        <AppDatePicker name="startDate" label="Start Date" required />

        <AppDatePicker name="endDate" label="End Date" />

        <AppRichTextEditor
          name="description"
          label="Description"
          placeholder="Enter a brief description"
        />

        <AppInput
          name="technologies"
          label="Technologies"
          type="text"
          placeholder="Comma-separated technologies (e.g., React, TypeScript)"
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Update"
          )}
        </Button>
      </AppForm>
    </div>
  );
};

export default UpdateExperienceForm;
