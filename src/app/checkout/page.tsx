
"use client"
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/services/orderingService";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    await placeOrder({ items });
    clearCart();
    router.push("/orders");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Checkout</h2>
      {items.map((item) => (
        <div key={item.productId} className="flex justify-between mb-2">
          <span>{item.productName}</span>
          <span>{item.quantity} x ${item.price}</span>
        </div>
      ))}
      <button onClick={handleCheckout} className="bg-green-500 text-white p-2 rounded mt-4">
        Place Order
      </button>
    </div>
  );
}
