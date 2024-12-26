import { IUser } from "./user.type";

export interface IShop {
  _id: string;
  name: string;
  logoUrl?: string;
  description: string;
  owner: IUser;
  isBlacklisted: boolean;
  followerCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateShop {
  name: string;
  logoUrl?: string;
  description: string;
}

export interface IUpdateShop {
  id: string;
  formData: FormData;
}

export interface IToggleShopBlacklistStatus {
  id: string;
  payload: {
    isBlacklisted: boolean;
  };
}
