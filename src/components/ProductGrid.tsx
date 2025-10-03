"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Gift, Zap, Tag } from "lucide-react"
import { Product } from "@/types/Product"

export default function ProductGrid({ products }: { products: Product[] }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫'
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map(product => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-100 hover:border-orange-200 transition-all duration-300 cursor-pointer group overflow-hidden">
              
              {/* Image container */}
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Labels */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discount && (
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
                      -{product.discount}%
                    </div>
                  )}
                  {product.isHot && (
                    <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md font-semibold flex items-center gap-1">
                      <Zap size={12} />
                      HOT
                    </div>
                  )}
                  {product.isNew && (
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
              </div>

              {/* Content */}
              <div className="p-3">
                {/* Product name */}
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[40px] leading-5">
                  {product.name}
                </h3>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.floor(product.rating!) ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    {product.reviewCount && (
                      <span className="text-xs text-gray-500">({product.reviewCount})</span>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="mb-3">
                  <div className="text-lg font-bold text-orange-600 mb-1">
                    {formatPrice(product.price)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                  )}
                  {product.installment && (
                    <div className="text-xs text-blue-600 mt-1">
                      {product.installment}
                    </div>
                  )}
                </div>

                {/* Gift */}
                {product.gift && (
                  <div className="flex items-center gap-1 text-xs text-green-600 mb-2">
                    <Gift size={12} />
                    <span className="truncate">{product.gift}</span>
                  </div>
                )}

                {/* Buy button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1">
                  <span>Mua ngay</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}