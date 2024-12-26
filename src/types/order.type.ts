import { IProduct } from "./product.type";
import { IShop } from "./shop.type";
import { IUser } from "./user.type";

export interface IOrder {
  _id: string;
  user: IUser;
  shop: IShop;
  products: IOrderProduct[];
  totalPrice: number;
  discount?: number;
  status: "pending" | "complete";
  createdAt: string;
  updatedAt: string;
}

export interface IOrderProduct {
  product: IProduct;
  price: number;
  quantity: number;
}

export interface ICreateOrder {
  shop: string;
  products: ICreateOrderProduct[];
  totalPrice: number;
  discount?: number;
  deliveryAddress: string;
  status: string;
}

export interface ICreateOrderProduct {
  product: string;
  price: number;
  quantity: number;
}

export interface IWeeklySale {
  week: string;
  totalOrders: number;
}
