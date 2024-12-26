export interface IBlog {
  _id: string;
  title: string;
  content: string;
  images?: string[];
  tags?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBlog {
  title: string;
  content: string;
  tags?: string[];
}

export interface IUpdateBlog {
  title: string;
  content: string;
  tags?: string[];
  images?: string[];
}

export interface IUpdateBlogFormData {
  id: string;
  formData: FormData;
}
