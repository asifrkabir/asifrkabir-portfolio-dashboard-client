"use client";

import { Textarea } from "@/components/ui/textarea";
import { IInput } from "@/types/input.type";
import { FieldError, useFormContext } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends IInput {
  rows?: number;
}

const AppTextarea = ({
  label,
  name,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Textarea
        {...register(name)}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className={`${errors[name] ? "border-red-500" : ""}`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {(errors[name] as FieldError).message || "This field is required."}
        </span>
      )}
    </div>
  );
};

export default AppTextarea;
