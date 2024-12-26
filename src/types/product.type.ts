import { IProductCategory } from "./productCategory.type";
import { IShop } from "./shop.type";

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: IProductCategory;
  inventoryCount: number;
  imageUrls?: string[];
  onSale: boolean;
  discountedPrice?: number;
  shop: IShop;
  status: "available" | "suspended";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isFollowed?: number;
}

export interface IUpdateProduct {
  id: string;
  formData: FormData;
}
