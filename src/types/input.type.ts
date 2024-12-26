export interface IInput {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  variant?: string;
  step?: string;
}

export interface IDropdownOption {
  label: string;
  value: string;
}
