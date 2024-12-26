"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IProduct } from "@/types";

interface IRecentProductsContext {
  recentProducts: IProduct[];
  addProduct: (product: IProduct) => void;
}

const RecentProductsContext = createContext<IRecentProductsContext | undefined>(
  undefined
);

const RECENT_PRODUCTS_STORAGE_KEY = "recentProducts";
const MAX_RECENT_PRODUCTS = 10;

export const RecentProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recentProducts, setRecentProducts] = useState<IProduct[]>(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem(RECENT_PRODUCTS_STORAGE_KEY);
      return storedProducts ? JSON.parse(storedProducts) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      RECENT_PRODUCTS_STORAGE_KEY,
      JSON.stringify(recentProducts)
    );
  }, [recentProducts]);

  const addProduct = (product: IProduct) => {
    setRecentProducts((prevProducts) => {
      const filteredProducts = prevProducts.filter(
        (p) => p._id !== product._id
      );
      const updatedProducts = [product, ...filteredProducts];
      return updatedProducts.slice(0, MAX_RECENT_PRODUCTS);
    });
  };

  return (
    <RecentProductsContext.Provider value={{ recentProducts, addProduct }}>
      {children}
    </RecentProductsContext.Provider>
  );
};

export const useRecentProducts = (): IRecentProductsContext => {
  const context = useContext(RecentProductsContext);
  if (!context) {
    throw new Error(
      "useRecentProducts must be used within a RecentProductsProvider"
    );
  }
  return context;
};
