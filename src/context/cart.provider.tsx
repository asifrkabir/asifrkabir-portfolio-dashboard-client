"use client";

import { ICartProduct, ICartState } from "@/types/cart.type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextType {
  cart: ICartState;
  addProductToCart: (
    shopId: string,
    shopName: string,
    product: Omit<ICartProduct, "quantity">,
    quantity: number
  ) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
  replaceCart: (
    shopId: string,
    shopName: string,
    product: ICartProduct
  ) => void;
  calculateTotalPrice: () => number;
  updateProductQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ICartState>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart
        ? JSON.parse(storedCart)
        : { shopId: null, shopName: null, products: [], totalPrice: 0 };
    }
    return { shopId: null, shopName: null, products: [], totalPrice: 0 };
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addProductToCart = (
    shopId: string,
    shopName: string,
    product: Omit<ICartProduct, "quantity">,
    quantity: number
  ) => {
    setCart((prev) => {
      const existingProduct = prev.products.find(
        (p) => p.productId === product.productId
      );

      const updatedProducts = existingProduct
        ? prev.products.map((p) =>
            p.productId === product.productId
              ? { ...p, quantity: p.quantity + quantity }
              : p
          )
        : [...prev.products, { ...product, quantity }];

      const updatedTotalPrice = updatedProducts.reduce(
        (total, p) => total + p.price * p.quantity,
        0
      );

      return {
        shopId: prev.shopId || shopId,
        shopName: prev.shopName || shopName,
        products: updatedProducts,
        totalPrice: updatedTotalPrice,
      };
    });
  };

  const removeProductFromCart = (productId: string) => {
    setCart((prev) => {
      const updatedProducts = prev.products.filter(
        (product) => product.productId !== productId
      );

      const updatedTotalPrice = updatedProducts.reduce(
        (total, p) => total + p.price * p.quantity,
        0
      );

      return {
        ...prev,
        products: updatedProducts,
        totalPrice: updatedTotalPrice,
      };
    });
  };

  const clearCart = () => {
    setCart({
      shopId: null,
      shopName: null,
      products: [],
      totalPrice: 0,
    });
  };

  const replaceCart = (
    shopId: string,
    shopName: string,
    product: ICartProduct
  ) => {
    setCart({
      shopId,
      shopName,
      products: [product],
      totalPrice: product.price * product.quantity,
    });
  };

  const calculateTotalPrice = () => {
    return cart.products.reduce((total, p) => total + p.price * p.quantity, 0);
  };

  const updateProductQuantity = (productId: string, quantity: number) => {
    setCart((prev) => {
      const updatedProducts = prev.products.map((product) =>
        product.productId === productId ? { ...product, quantity } : product
      );

      const updatedTotalPrice = updatedProducts.reduce(
        (total, p) => total + p.price * p.quantity,
        0
      );

      return {
        ...prev,
        products: updatedProducts,
        totalPrice: updatedTotalPrice,
      };
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductFromCart,
        clearCart,
        replaceCart,
        calculateTotalPrice,
        updateProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
