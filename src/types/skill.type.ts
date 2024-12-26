export interface ISkill {
  _id: string;
  name: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSkill {
  name: string;
}

export interface IUpdateSkill {
  name: string;
  logo: string | null;
}

export interface IUpdateSkillFormData {
  id: string;
  formData: FormData;
}
