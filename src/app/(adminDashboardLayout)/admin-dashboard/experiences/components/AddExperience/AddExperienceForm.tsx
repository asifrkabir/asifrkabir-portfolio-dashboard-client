import AppDatePicker from "@/components/form/AppDatePicker";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppRichTextEditor from "@/components/form/AppRichTextEditor";
import { Button } from "@/components/ui/button";
import { useCreateExperience } from "@/hooks/experience.hook";
import { createExperienceValidationSchema } from "@/schemas/experience.schema";
import { ICreateExperience } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
}

const AddExperienceForm = ({ closeModal }: IProps) => {
  const { mutate: createExperience, isPending } = useCreateExperience();
  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const experienceData: ICreateExperience = {
      title: data.title,
      company: data.company,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      description: data.description || undefined,
      technologies: data.technologies
        ? data.technologies.split(",").map((tech: string) => tech.trim())
        : undefined,
    };

    createExperience(experienceData, {
      onSuccess: (res) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Experience created successfully");

          queryClient.invalidateQueries({
            queryKey: ["EXPERIENCES"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to add experience. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to add experience. Please try again."
        );
      },
    });
  };

  return (
    <div className="grid gap-4 my-2">
      <AppForm
        onSubmit={handleSubmit}
        resolver={zodResolver(createExperienceValidationSchema)}
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
            "Submit"
          )}
        </Button>
      </AppForm>
    </div>
  );
};

export default AddExperienceForm;
