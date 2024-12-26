"use client";

import { Input } from "@/components/ui/input";
import { IInput } from "@/types/input.type";
import { FieldError, useFormContext } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends IInput {}

const AppInput = ({
  type = "text",
  label,
  name,
  placeholder,
  required = false,
  disabled = false,
  step = undefined,
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
      <Input
        {...register(name)}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={`${errors[name] ? "border-red-500" : ""}`}
        step={type === "number" && step ? step : undefined}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {(errors[name] as FieldError).message || "This field is required."}
        </span>
      )}
    </div>
  );
};

export default AppInput;
