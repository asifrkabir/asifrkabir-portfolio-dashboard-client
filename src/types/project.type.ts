export interface IProject {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  images?: string[];
  repositoryUrls?: string[];
  liveDemoUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProject {
  title: string;
  description: string;
  technologies: string[];
  repositoryUrls?: string[];
  liveDemoUrl?: string;
}

export interface IUpdateProject {
  title: string;
  description: string;
  technologies: string[];
  images?: string[];
  repositoryUrls?: string[];
  liveDemoUrl?: string;
}

export interface IUpdateProjectFormData {
  id: string;
  formData: FormData;
}
