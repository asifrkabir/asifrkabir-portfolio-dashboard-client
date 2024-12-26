"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IInput } from "@/types/input.type";
import { FieldError, useFormContext } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends IInput {
  options: { label: string; value: string }[];
}

const AppSelect = ({
  label,
  name,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  options,
}: IProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  // Watch for the current selected value to provide controlled input
  const selectedValue = watch(name);

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        value={selectedValue}
        onValueChange={(value) => setValue(name, value)}
        disabled={disabled}
      >
        <SelectTrigger
          className={`w-full ${errors[name] ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {(errors[name] as FieldError).message || "This field is required."}
        </span>
      )}
    </div>
  );
};

export default AppSelect;
