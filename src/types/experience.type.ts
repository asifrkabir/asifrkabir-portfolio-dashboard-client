export interface IExperience {
  _id: string;
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  technologies?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateExperience {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  technologies?: string[];
}

export interface IUpdateExperience {
  id: string;
  payload: {
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
    technologies?: string[];
  };
}
