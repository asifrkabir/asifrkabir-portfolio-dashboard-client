import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface AppRichTextEditorProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const AppRichTextEditor = ({
  name,
  label,
  placeholder,
  required = false,
}: AppRichTextEditorProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <ReactQuill
              {...field}
              theme="snow"
              placeholder={placeholder}
              className={`${errors[name] ? "border-red-500" : ""}`}
            />
          </div>
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name]?.message?.toString() || "This field is required."}
        </span>
      )}
    </div>
  );
};

export default AppRichTextEditor;
