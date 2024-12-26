import { IDropdownOption } from "@/types";

export function extractDropdownOptions<T>(
  data: T[],
  labelKey: keyof T,
  valueKey: keyof T
): IDropdownOption[] {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  return data.map((item) => ({
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  }));
}
