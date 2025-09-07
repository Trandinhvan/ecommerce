"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid, List, ChevronDown, SlidersHorizontal } from "lucide-react";

export default function CatalogClient({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = category === "all" 
    ? products 
    : products.filter((p) => p.categoryId === category);

  // Sort products
  const sortedProducts = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
        return b.id - a.id; // assuming higher id = newer
      default:
        return 0;
    }
  });

  // Filter by price range
  const finalProducts = priceRange === "all" 
    ? sortedProducts
    : sortedProducts.filter(p => {
        switch (priceRange) {
          case "under-10":
            return p.price < 10000000;
          case "10-20":
            return p.price >= 10000000 && p.price <= 20000000;
          case "20-30":
            return p.price >= 20000000 && p.price <= 30000000;
          case "over-30":
            return p.price > 30000000;
          default:
            return true;
        }
      });

  const categories = Array.from(new Set(products.map((p) => p.categoryId)));

  // Map categoryId -> categoryName
  const categoryMap: Record<string, string> = {};
  products.forEach((p) => {
    categoryMap[p.categoryId] = p.categoryName;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Laptop - Máy tính xách tay
              </h1>
              <p className="text-gray-600">
                Ưu đãi đến 15 triệu - Trả góp 0% - Bảo hành chính hãng
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">
                  {finalProducts.length}
                </div>
                <div className="text-sm text-gray-500">sản phẩm</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === "all"
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-orange-300 hover:text-orange-600"
                }`}
                onClick={() => setCategory("all")}
              >
                Tất cả ({products.length})
              </button>
              {categories.map((catId) => (
                <button
                  key={catId}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    category === catId
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-orange-300 hover:text-orange-600"
                  }`}
                  onClick={() => setCategory(catId)}
                >
                  {categoryMap[catId]} ({products.filter(p => p.categoryId === catId).length})
                </button>
              ))}
            </div>

            {/* Price Range & Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-3">
                {/* Price Range */}
                <div className="relative">
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="all">Tất cả mức giá</option>
                    <option value="under-10">Dưới 10 triệu</option>
                    <option value="10-20">10 - 20 triệu</option>
                    <option value="20-30">20 - 30 triệu</option>
                    <option value="over-30">Trên 30 triệu</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="default">Nổi bật</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="name">Tên A-Z</option>
                    <option value="newest">Mới nhất</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid" 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list" 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        {/* Products Grid/List */}
        <AnimatePresence>
          <motion.div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-4"
            }
            layout
          >
            {finalProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === "grid" ? (
                  <ProductCard product={product} />
                ) : (
                  /* List View - Simple implementation */
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center gap-4">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.categoryName}</p>
                      <div className="text-lg font-bold text-orange-600">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors">
                      Mua ngay
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {finalProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-gray-500">
              Vui lòng thay đổi bộ lọc để xem thêm sản phẩm khác
            </p>
          </div>
        )}
      </div>
    </div>
  );
}