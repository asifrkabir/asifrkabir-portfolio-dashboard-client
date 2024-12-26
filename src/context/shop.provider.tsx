"use client";

import { IShop } from "@/types";
import React, { createContext, useContext } from "react";

interface ShopContextType {
  shop: IShop;
  isLoading: boolean;
  isError: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

export const ShopProvider: React.FC<{
  value: ShopContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
