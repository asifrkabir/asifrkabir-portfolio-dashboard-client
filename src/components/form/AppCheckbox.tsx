import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext, Controller } from "react-hook-form";

interface AppCheckboxProps {
  name: string;
  label?: string;
  required?: boolean;
}

const AppCheckbox = ({ name, label, required = false }: AppCheckboxProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex items-center mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={field.value || false}
            onCheckedChange={field.onChange}
            className={`${errors[name] ? "border-red-500" : ""}`}
          />
        )}
      />
      {label && (
        <label htmlFor={name} className="ml-2 text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {errors[name] && (
        <span className="text-red-500 text-sm ml-2">
          {errors[name]?.message?.toString() || "This field is required."}
        </span>
      )}
    </div>
  );
};

export default AppCheckbox;
