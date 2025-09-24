"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingCart, Gift, Shield, Truck, ArrowLeft, CreditCard, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/services/catalogService";
import { clearBasket, removeFromBasket, updateBasketQuantity } from "@/services/basketService";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  quantity: number;
  specs?: string;
  gift?: string;
  warranty?: string;
}

export default function CartPage() {
  const cart = useCart();
  const items = cart?.items || [];

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // 🔹 Fetch product details từ API dựa vào cart.items
  useEffect(() => {
    async function fetchProducts() {
      const products = await Promise.all(
        items.map((item) => getProductById(item.productId))
      );
      const merged = items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          id: item.productId,
          name: product?.name || "Sản phẩm",
          price: product?.price || 0,
          originalPrice: product?.originalPrice,
          imageUrl: product?.imageUrl || "/images/placeholder.png",
          quantity: item.quantity,
          specs: product?.specs,
          gift: product?.gift,
          warranty: product?.warranty,
        };
      });
      setCartItems(merged);
    }

    if (items.length > 0) {
      fetchProducts();
    } else {
      setCartItems([]);
    }
  }, [items]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    console.log("newQuantity", newQuantity);
  if (newQuantity < 1) {
    // Nếu giảm về 0 thì xóa khỏi giỏ hàng
    await removeFromBasket(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    return;
  }
  try {
    await updateBasketQuantity(id, newQuantity);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  } catch (error) {
    alert("Cập nhật số lượng thất bại!");
  }
};

  const removeItem = async (id: number) => {
    try {
      console.log("Removing product with ID:", id);
      await removeFromBasket(id); // Gọi API xóa trên backend
    setCartItems((prev) => prev.filter((item) => item.id !== id)); // Xóa trên frontend
    } catch (error) {
      alert("Xóa sản phẩm thất bại!");
    }
  };

  const clearAllItems = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?")) {
      return;
    }

    setIsClearing(true);
    
    try {
      await clearBasket(); // Gọi API xóa tất cả trên backend
      
      setCartItems([]);
      setIsPromoApplied(false);
      setPromoCode("");
    } catch (error) {
      alert("Xóa giỏ hàng thất bại!");
    } finally {
      setIsClearing(false);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "tgdd2025") {
      setIsPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = cartItems.reduce(
    (sum, item) =>
      sum +
      ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  );
  const promoDiscount = isPromoApplied ? 1000000 : 0; // 1 triệu VND giảm giá
  const shippingFee = subtotal >= 500000 ? 0 : 30000; // Free ship từ 500k
  const total = subtotal - promoDiscount + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-orange-600 font-medium">Giỏ hàng</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 mb-8">
              Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
            </p>
            <Link href="/catalog">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <ShoppingCart size={24} className="text-orange-500" />
                      Giỏ hàng của bạn ({cartItems.length} sản phẩm)
                    </h2>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={clearAllItems}
                        disabled={isClearing}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                        {isClearing ? "Đang xóa..." : "Xóa tất cả"}
                      </button>
                      <Link href="/catalog">
                        <button className="text-orange-600 hover:text-orange-700 flex items-center gap-1 text-sm font-medium">
                          <ArrowLeft size={16} />
                          Tiếp tục mua sắm
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={120}
                            height={120}
                            className="object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                                {item.name}
                              </h3>

                              {item.specs && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {item.specs}
                                </p>
                              )}

                              {/* Price */}
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-lg font-bold text-orange-600">
                                  {formatPrice(item.price)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through">
                                    {formatPrice(item.originalPrice)}
                                  </span>
                                )}
                              </div>

                              {/* Benefits */}
                              <div className="space-y-1 mb-4">
                                {item.gift && (
                                  <div className="flex items-center gap-1 text-xs text-green-600">
                                    <Gift size={12} />
                                    <span>Tặng: {item.gift}</span>
                                  </div>
                                )}
                                {item.warranty && (
                                  <div className="flex items-center gap-1 text-xs text-blue-600">
                                    <Shield size={12} />
                                    <span>Bảo hành: {item.warranty}</span>
                                  </div>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-gray-600">
                                    Số lượng:
                                  </span>
                                  <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.id, item.quantity - 1)
                                      }
                                      className="p-2 hover:bg-gray-100 rounded-l-lg"
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus size={16} />
                                    </button>
                                    <span className="px-4 py-2 font-semibold min-w-[50px] text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.id, item.quantity + 1)
                                      }
                                      className="p-2 hover:bg-gray-100 rounded-r-lg"
                                    >
                                      <Plus size={16} />
                                    </button>
                                  </div>
                                </div>

                                {/* Subtotal */}
                                <div className="text-right">
                                  <div className="font-bold text-gray-800">
                                    {formatPrice(item.price * item.quantity)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg ml-4"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Mã giảm giá</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>
                {isPromoApplied && (
                  <div className="mt-2 text-green-600 text-sm font-medium">
                    ✅ Đã áp dụng mã giảm giá TGDD2025
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">
                  Thông tin đơn hàng
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Tiết kiệm:</span>
                      <span className="font-semibold">
                        -{formatPrice(savings)}
                      </span>
                    </div>
                  )}

                  {isPromoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá (TGDD2025):</span>
                      <span className="font-semibold">
                        -{formatPrice(promoDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Truck size={14} />
                      Phí vận chuyển:
                    </span>
                    <span
                      className={`font-semibold ${
                        shippingFee === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {shippingFee === 0
                        ? "Miễn phí"
                        : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-orange-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-orange-700 text-sm">
                    <Truck size={16} />
                    <span className="font-medium">
                      {shippingFee === 0
                        ? "Miễn phí vận chuyển"
                        : "Phí vận chuyển 30.000₫"}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-xs text-orange-600 mt-1">
                      Mua thêm {formatPrice(500000 - subtotal)} để được miễn phí
                      vận chuyển
                    </p>
                  )}
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 mb-3">
                  <CreditCard size={20} />
                  Tiến hành thanh toán
                </button>

                {/* Payment Methods */}
                <div className="text-center text-xs text-gray-500">
                  <p className="mb-2">Phương thức thanh toán</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-8 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                      VISA
                    </div>
                    <div className="w-8 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center">
                      MC
                    </div>
                    <div className="w-8 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center">
                      ATM
                    </div>
                    <div className="w-8 h-6 bg-purple-500 rounded text-white text-xs flex items-center justify-center">
                      COD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}