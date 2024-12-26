"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppRichTextEditor from "@/components/form/AppRichTextEditor";
import { Button } from "@/components/ui/button";
import { useGetBlogById, useUpdateBlog } from "@/hooks/blog.hook";
import { updateBlogValidationSchema } from "@/schemas/blog.schema";
import { IApiResponse } from "@/types";
import { IBlog, IUpdateBlog, IUpdateBlogFormData } from "@/types/blog.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
  id: string;
}

export function UpdateBlogForm({ closeModal, id }: IProps) {
  const { data: blogData, isLoading, isError } = useGetBlogById(id);

  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { mutate: updateBlog, isPending } = useUpdateBlog();
  const queryClient = useQueryClient();

  const blog = blogData?.data as IBlog;

  const existingBlogValues = {
    title: blog?.title,
    content: blog?.content,
    tags: blog?.tags?.join(", "),
  };

  useEffect(() => {
    if (blog?.images) {
      setExistingImageUrls(blog.images);
      setImagePreviews(blog.images);
    }
  }, [blog]);

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
    if (index < existingImageUrls.length) {
      setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImageUrls.length;
      setImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const blogData: IUpdateBlog = {
      title: data.title,
      content: data.content,
      tags: data.tags
        ? data.tags.split(",").map((tag: string) => tag.trim())
        : undefined,
      images: existingImageUrls,
    };

    console.log({ projectData: blogData });

    formData.append("data", JSON.stringify(blogData));

    for (const image of imageFiles) {
      formData.append("blogImages", image);
    }

    const payload: IUpdateBlogFormData = {
      id: blog?._id,
      formData,
    };

    updateBlog(payload, {
      onSuccess: (res: IApiResponse<IBlog>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Blog updated successfully");

          queryClient.invalidateQueries({ queryKey: ["BLOGS"] });
          queryClient.invalidateQueries({ queryKey: ["BLOG", id] });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to update blog. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to update blog. Please try again."
        );
      },
    });
  };

  if (isLoading) {
    return <Loader2 className="size-5 animate-spin" />;
  }

  if (isError) {
    return <p>Something went wrong while fetching blog</p>;
  }

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(updateBlogValidationSchema)}
          defaultValues={existingBlogValues}
        >
          <AppInput
            name="title"
            label="Blog Title"
            type="text"
            placeholder="Enter blog title"
            required
          />

          <AppRichTextEditor
            name="content"
            label="Content"
            placeholder="Enter content"
            required
          />

          <AppInput
            name="tags"
            label="Tags"
            type="text"
            placeholder="Comma-separated tags (e.g., tech, travel)"
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
              onChange={(e) => handleImageAdd(e)}
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
              "Update"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
}
