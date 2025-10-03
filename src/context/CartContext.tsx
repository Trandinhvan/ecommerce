'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { addToBasket, getBasket, clearBasket } from "../services/basketService";
import { BasketItem } from "@/types/Basket";

interface CartContextType {
  items: BasketItem[];
  refreshBasket: () => void;
  addToCart: (item: BasketItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<BasketItem[]>([]);

  const refreshBasket = async () => {
    const data = await getBasket();
    setItems(data?.items ?? []);
  };

  const addToCart = async (item: BasketItem) => {
    await addToBasket(item);
    await refreshBasket();
  };

  const removeFromCart = async (productId: string) => {
    // await removeItem(productId); // backend chưa có
    await refreshBasket();
  };

  const clearCart = async () => {
    await clearBasket();
    await refreshBasket();
  };

  useEffect(() => {
    refreshBasket();
  }, []);

  return (
    <CartContext.Provider value={{ items, refreshBasket, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
