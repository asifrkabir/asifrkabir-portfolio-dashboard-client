import { IOrder } from "./order.type";
import { IShop } from "./shop.type";
import { IUser } from "./user.type";

export interface IPaymentIntent {
  amount: number;
}

export interface IPayment {
  _id: string;
  user: IUser;
  order: IOrder;
  shop: IShop;
  amount: number;
  status: "successful" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePayment {
  order: string;
  shop: string;
  amount: number;
}
