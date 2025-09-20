'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getBasket, addItem, removeItem, clearBasket } from "../services/basketService";

interface CartContextType {
  items: any[];
  refreshBasket: () => void;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<any[]>([]);

  const refreshBasket = async () => {
  const data = await getBasket();
  setItems(data?.items ?? []); // fallback [] nếu null
};

  const addToCart = async (productId: string, quantity: number) => {
    await addItem(productId, quantity);
    refreshBasket();
  };

  const removeFromCart = async (productId: string) => {
    await removeItem(productId);
    refreshBasket();
  };

  const clearCartFn = async () => {
    await clearBasket();
    refreshBasket();
  };

  useEffect(() => {
    refreshBasket();
  }, []);

  return (
    <CartContext.Provider value={{ items, refreshBasket, addToCart, removeFromCart, clearCart: clearCartFn }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
