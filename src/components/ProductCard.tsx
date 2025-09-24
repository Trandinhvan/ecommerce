"use client";

import Link from "next/link"
import Image from "next/image"
import { Star, Gift, Zap, Heart, Eye, ShoppingCart } from "lucide-react"
import { addToBasket } from "@/services/basketService";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  categoryName?: string;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  gift?: string;
  isHot?: boolean;
  isNew?: boolean;
  installment?: string;
  specs?: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  const { id, name, price, originalPrice, imageUrl, categoryName, discount, rating, reviewCount, gift, isHot, isNew, installment, specs } = product;

  const { refreshBasket} = useCart();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫'
  }
  
  const handleAddToBasket = async () => {
    try {
      await addToBasket({ productId: id, productName: name, price: price, quantity: 1 });
      refreshBasket();
    } catch (error) {
      console.log("Error adding to basket:", error);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-100 hover:border-orange-200 transition-all duration-300 overflow-hidden group">
      
      {/* Image container */}
      <Link href={`/catalog/${categoryName}/${id}`}>
        <div className="relative cursor-pointer">
          <div className="aspect-square overflow-hidden bg-gray-50">
            <Image
              src={imageUrl}
              alt={name}
              width={300}
              height={300}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 z-10"
            />
          </div>
          
          {/* Labels */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount && (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
                -{discount}%
              </div>
            )}
            {isHot && (
              <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md font-semibold flex items-center gap-1">
                <Zap size={12} />
                HOT
              </div>
            )}
            {isNew && (
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
                MỚI
              </div>
            )}
          </div>

          {/* TGDĐ Logo */}
          <div className="absolute top-2 right-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">TG</span>
            </div>
          </div>

          {/* Quick actions on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 z-[-1] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-50 transition-colors">
                  <Heart size={18} className="text-gray-600 hover:text-red-500" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-50 transition-colors">
                  <Eye size={18} className="text-gray-600 hover:text-orange-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {categoryName && (
          <div className="text-xs text-gray-500 mb-1">{categoryName}</div>
        )}

        {/* Product name */}
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[40px] leading-5 hover:text-orange-600 cursor-pointer transition-colors">
            {name}
          </h3>
        </Link>

        {/* Specs */}
        {specs && specs.length > 0 && (
          <div className="mb-2">
            {specs.slice(0, 2).map((spec, index) => (
              <div key={index} className="text-xs text-gray-600 bg-gray-50 inline-block px-2 py-1 rounded mr-1 mb-1">
                {spec}
              </div>
            ))}
          </div>
        )}

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            {reviewCount && (
              <span className="text-xs text-gray-500">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mb-3">
          <div className="text-lg font-bold text-orange-600 mb-1">
            {formatPrice(price)}
          </div>
          {originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
              {discount && (
                <span className="text-xs text-red-500 font-semibold">
                  Tiết kiệm {formatPrice(originalPrice - price)}
                </span>
              )}
            </div>
          )}
          {installment && (
            <div className="text-xs text-blue-600 mt-1">
              {installment}
            </div>
          )}
        </div>

        {/* Gift */}
        {gift && (
          <div className="flex items-center gap-1 text-xs text-green-600 mb-3 bg-green-50 p-2 rounded">
            <Gift size={12} />
            <span className="line-clamp-1">{gift}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 px-3 rounded-md transition-colors flex items-center justify-center gap-2"
            onClick={handleAddToBasket}
          >
            <ShoppingCart size={16} />
            <span>Mua ngay</span>
          </button>
          <button className="px-3 py-2.5 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-md transition-colors">
            <Heart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}