import { IShop } from "./shop.type";

export interface ICoupon {
  _id: string;
  code: string;
  shop: IShop;
  discountPercentage: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCoupon {
  code: string;
  shop: string;
  discountPercentage: number;
}

export interface IUpdateCoupon {
  id: string;
  payload: {
    code: string;
    discountPercentage: number;
  };
}

export interface ICheckCoupon {
  code: string;
  shopId: string;
}
