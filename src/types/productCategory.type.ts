export interface IProductCategory {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProductCategory {
  name: string;
}

export interface IUpdateProductCategory {
  id: string;
  payload: {
    name: string;
  };
}
