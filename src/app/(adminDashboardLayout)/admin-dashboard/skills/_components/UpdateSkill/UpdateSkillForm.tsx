/* eslint-disable @next/next/no-img-element */
"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import { useGetSkillById, useUpdateSkill } from "@/hooks/skill.hook";
import { updateSkillValidationSchema } from "@/schemas/skill.schema";
import {
  IApiResponse,
  ISkill,
  IUpdateSkill,
  IUpdateSkillFormData,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  id: string;
  closeModal: () => void;
}

const UpdateSkillForm = ({ id, closeModal }: IProps) => {
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { data: skillData, isLoading, isError } = useGetSkillById(id);
  const { mutate: updateSkill, isPending } = useUpdateSkill();
  const queryClient = useQueryClient();

  const skill = skillData?.data as ISkill;

  const existingSkillValues = {
    name: skill?.name,
  };

  useEffect(() => {
    if (skill?.logo) {
      setExistingImageUrls([skill.logo]);
      setImagePreviews([skill.logo]);
    }
  }, [skill]);

  const handleImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles([file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setExistingImageUrls([]);
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const skillData: IUpdateSkill = {
      name: data.name,
      logo: existingImageUrls.length > 0 ? existingImageUrls[0] : null,
    };

    formData.append("data", JSON.stringify(skillData));

    for (const image of imageFiles) {
      formData.append("logos", image);
    }

    const payload: IUpdateSkillFormData = {
      id: skill._id,
      formData,
    };

    updateSkill(payload, {
      onSuccess: (res: IApiResponse<ISkill>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Skill updated successfully");

          queryClient.invalidateQueries({
            queryKey: ["SKILLS"],
          });

          queryClient.invalidateQueries({
            queryKey: ["SKILL", id],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to update skill. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to update skill. Please try again."
        );
      },
    });
  };

  if (isLoading || !skillData) {
    return <p>Loading skill...</p>;
  }

  if (isError) {
    return <p>Something went wrong while fetching skill</p>;
  }

  return (
    <div className="grid gap-4 my-2">
      <AppForm
        onSubmit={handleSubmit}
        resolver={zodResolver(updateSkillValidationSchema)}
        defaultValues={existingSkillValues}
      >
        <AppInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter name"
          required
        />

        <div className="min-w-fit flex-1">
          <label
            className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
            htmlFor="image"
          >
            Upload logo
          </label>
          <input
            className="hidden"
            id="image"
            type="file"
            onChange={(e) => handleImageAdd(e)}
          />
        </div>

        <div>
          <div className="flex justify-center m-8">
            {imagePreviews.length > 0 &&
              imagePreviews.map((imageDataUrl, index) => (
                <div
                  key={index}
                  className="relative size-48 rounded-full border-2 border-dashed border-default-300 p-2 group"
                >
                  <img
                    className="h-full w-full object-cover object-center rounded-full"
                    src={imageDataUrl}
                    alt={"Logo"}
                  />

                  <button
                    className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleImageDelete()}
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
            "Update"
          )}
        </Button>
      </AppForm>
    </div>
  );
};

export default UpdateSkillForm;
