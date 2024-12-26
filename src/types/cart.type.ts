export interface ICartProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ICartState {
  shopId: string | null;
  shopName: string | null;
  products: ICartProduct[];
  totalPrice: number;
}
