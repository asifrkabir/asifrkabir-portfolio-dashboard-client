"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppRichTextEditor from "@/components/form/AppRichTextEditor";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/hooks/project.hook";
import { createProjectValidationSchema } from "@/schemas/project.schema";
import { IApiResponse } from "@/types";
import { ICreateProject, IProject } from "@/types/project.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
}

export function AddProjectForm({ closeModal }: IProps) {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { mutate: createProject, isPending } = useCreateProject();
  const queryClient = useQueryClient();

  const handleImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageDelete = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const projectData: ICreateProject = {
      title: data.title,
      description: data.description,
      technologies: data.technologies
        ? data.technologies.split(",").map((tech: string) => tech.trim())
        : undefined,
      repositoryUrls: data.repositoryUrls
        ? data.repositoryUrls.split(",").map((url: string) => url.trim())
        : undefined,
      liveDemoUrl: data.liveDemoUrl || undefined,
    };

    formData.append("data", JSON.stringify(projectData));

    for (const image of imageFiles) {
      formData.append("projectImages", image);
    }

    createProject(formData, {
      onSuccess: (res: IApiResponse<IProject>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Project created successfully");

          queryClient.invalidateQueries({ queryKey: ["PROJECTS"] });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to create project. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to create project. Please try again."
        );
      },
    });
  };

  return (
    <div className="grid gap-4 my-2">
      <AppForm
        onSubmit={handleSubmit}
        resolver={zodResolver(createProjectValidationSchema)}
      >
        <AppInput
          name="title"
          label="Project Title"
          type="text"
          placeholder="Enter project title"
          required
        />

        <AppRichTextEditor
          name="description"
          label="Description"
          placeholder="Enter description"
          required
        />

        <AppInput
          name="technologies"
          label="Technologies"
          type="text"
          placeholder="Comma-separated technologies (e.g., React, TypeScript)"
          required
        />

        <AppInput
          name="repositoryUrls"
          label="Repository URLs"
          type="text"
          placeholder="Enter repository URLs (comma separated)"
        />

        <AppInput
          name="liveDemoUrl"
          label="Live Demo URL"
          type="url"
          placeholder="Enter live demo URL"
        />

        <div className="min-w-fit flex-1">
          <label
            className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
            htmlFor="image"
          >
            Upload images
          </label>
          <input
            multiple
            className="hidden"
            id="image"
            type="file"
            onChange={handleImageAdd}
          />
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 m-8">
            {imagePreviews.length > 0 &&
              imagePreviews.map((imageDataUrl, index) => (
                <div
                  key={index}
                  className="relative size-32 border-2 border-dashed border-default-300 p-2 group"
                >
                  <Image
                    className="h-full w-full object-cover object-center"
                    src={imageDataUrl}
                    alt={`Preview ${index + 1}`}
                    width={128}
                    height={128}
                  />

                  <button
                    className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(event) => {
                      event.preventDefault();
                      handleImageDelete(index);
                    }}
                  >
                    <Trash2 className="text-white w-5 h-5" />
                  </button>
                </div>
              ))}
          </div>
        </div>

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
}
