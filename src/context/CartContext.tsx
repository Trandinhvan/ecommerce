'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { addToBasket, getBasket, removeItem, clearBasket } from "../services/basketService";

interface CartContextType {
  items: any[];
  refreshBasket: () => void;
  addToCart: (item: { productId: string; productName: string; price: number; quantity: number }) => void;
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

  // cần sửa lại addToCart để tương thích ở các trang, hiện tại các component đang gọi trực tiếp đến services
  const addToCart = async (item: { productId: string; productName: string; price: number; quantity: number }) => {
    await addToBasket({
      productId: Number(item.productId), // Chuyển productId từ string sang number
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
    });
    await refreshBasket();
  };

  const removeFromCart = async (productId: string) => {
    await removeItem(productId);
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