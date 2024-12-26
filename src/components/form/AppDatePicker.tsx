"use client";

import { useState } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IDatePickerProps {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const AppDatePicker = ({
  name,
  label,
  required = false,
  disabled = false,
}: IDatePickerProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedDate = watch(name);
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const handleDateChange = (date: Date) => {
    setDate(date);
    setValue(name, format(date, "yyyy-MM-dd"), { shouldValidate: true });
  };

  register(name, {
    required: required ? "This field is required." : undefined,
    validate: (value) => (value ? true : "Please select a valid date."),
  });

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className={`w-[240px] justify-start text-left font-normal ${
              errors[name] ? "border-red-500" : ""
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Select a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => handleDateChange(date!)}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {(errors[name] as FieldError).message || "This field is required."}
        </span>
      )}
    </div>
  );
};

export default AppDatePicker;
