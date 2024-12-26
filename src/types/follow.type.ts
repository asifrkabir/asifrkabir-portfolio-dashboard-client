import { IShop } from "./shop.type";
import { IUser } from "./user.type";

export interface IFollow {
  _id: string;
  follower: IUser;
  shop: IShop;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateFollow {
  shop: string;
}

export type ICreateUnfollow = ICreateFollow;
