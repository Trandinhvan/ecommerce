'use client';

import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  Truck, 
  RotateCcw, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  Plus, 
  Minus, 
  Gift,
  Award,
  Zap,
  Clock
} from 'lucide-react';

// Sample product data
const product = {
  id: 1,
  name: "Laptop ASUS VivoBook 15 X1504VA-NJ070W",
  originalPrice: 15990000,
  salePrice: 12990000,
  discount: 19,
  categoryName: "Laptop Văn Phòng",
  rating: 4.5,
  reviewCount: 1247,
  inStock: true,
  images: [
    "https://cdn.tgdd.vn/Products/Images/44/309832/asus-vivobook-15-x1504va-nj070w-i3-1315u-thumb-600x600.jpg",
    "https://cdn.tgdd.vn/Products/Images/44/309832/asus-vivobook-15-x1504va-nj070w-i3-1315u-1-600x600.jpg",
    "https://cdn.tgdd.vn/Products/Images/44/309832/asus-vivobook-15-x1504va-nj070w-i3-1315u-2-600x600.jpg",
    "https://cdn.tgdd.vn/Products/Images/44/309832/asus-vivobook-15-x1504va-nj070w-i3-1315u-3-600x600.jpg"
  ],
  specifications: {
    "CPU": "Intel Core i3-1315U",
    "RAM": "8GB DDR4",
    "Ổ cứng": "512GB SSD NVMe PCIe",
    "VGA": "Intel UHD Graphics",
    "Màn hình": "15.6 inch Full HD (1920 x 1080)",
    "Hệ điều hành": "Windows 11 Home",
    "Pin": "42WHrs, 3-cell Li-ion",
    "Trọng lượng": "1.7 kg",
    "Màu sắc": "Bạc"
  },
  highlights: [
    "Thiết kế mỏng nhẹ, dễ mang theo",
    "Màn hình 15.6 inch Full HD sắc nét", 
    "CPU Intel Core i3-1315U tiết kiệm pin",
    "RAM 8GB đa nhiệm mượt mà",
    "SSD 512GB khởi động nhanh",
    "Bảo hành chính hãng 24 tháng"
  ],
  promotions: [
    "Tặng balo laptop trị giá 500,000đ",
    "Trả góp 0% lãi suất 6 tháng",
    "Giảm thêm 200,000đ khi thu cũ đổi mới",
    "Miễn phí giao hàng toàn quốc"
  ]
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + '₫';
};

const ProductDetailPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm text-gray-600">
            <a href="#" className="hover:text-orange-600">Trang chủ</a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-orange-600">Laptop</a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-orange-600">{product.categoryName}</a>
            <span className="mx-2">/</span>
            <span className="text-gray-800 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Main Image */}
              <div className="relative mb-4">
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={product.name}
                  className="w-full h-80 object-contain rounded-lg"
                />
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Sale Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
                      selectedImageIndex === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-16 h-16 object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 border-2 rounded-lg font-medium transition-all ${
                    isWishlisted 
                      ? 'border-red-500 text-red-500 bg-red-50' 
                      : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                  Yêu thích
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500 rounded-lg font-medium transition-all">
                  <Share2 size={20} />
                  Chia sẻ
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column - Product Info */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                      className="text-yellow-400"
                    />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">
                    {product.rating} ({product.reviewCount} đánh giá)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Tiết kiệm: {formatPrice(product.originalPrice - product.salePrice)}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Điểm nổi bật:</h3>
                <ul className="space-y-2">
                  {product.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Specs */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Thông số cơ bản:</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">CPU:</span>
                    <span className="font-medium">{product.specifications.CPU}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">RAM:</span>
                    <span className="font-medium">{product.specifications.RAM}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Ổ cứng:</span>
                    <span className="font-medium">{product.specifications["Ổ cứng"]}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Màn hình:</span>
                    <span className="font-medium">{product.specifications["Màn hình"]}</span>
                  </div>
                </div>
              </div>

              {/* Promotions */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Gift className="text-red-500" size={18} />
                  Khuyến mãi đặc biệt:
                </h3>
                <div className="space-y-2">
                  {product.promotions.map((promotion, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm bg-orange-50 p-2 rounded">
                      <Award size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{promotion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Options */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Còn hàng</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Hết hàng</span>
                  </>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng:
                </label>
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 text-center py-2 border-0 focus:outline-none"
                    min="1"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Zap size={18} />
                  MUA NGAY
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <CreditCard size={18} />
                  TRẢ GÓP 0%
                </button>
                <button className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  THÊM VÀO GIỎ
                </button>
              </div>

              {/* Services */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="text-green-500" size={18} />
                  <span>Bảo hành chính hãng 24 tháng</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="text-blue-500" size={18} />
                  <span>Miễn phí giao hàng toàn quốc</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="text-purple-500" size={18} />
                  <span>Đổi trả trong 15 ngày</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="text-orange-500" size={18} />
                  <span>Hỗ trợ kỹ thuật 24/7</span>
                </div>
              </div>

              {/* Contact */}
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-3 text-sm mb-2">
                  <Phone className="text-red-500" size={18} />
                  <span className="font-semibold">Hotline: 1800.2097</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="text-blue-500" size={18} />
                  <span>Hệ thống 2000+ cửa hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tab Navigation */}
            <div className="border-b">
              <nav className="flex">
                <button 
                  onClick={() => setActiveTab('specs')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'specs' 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Thông số kỹ thuật
                </button>
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'description' 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mô tả sản phẩm
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'reviews' 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Đánh giá ({product.reviewCount})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'specs' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Thông số kỹ thuật chi tiết</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex py-3 border-b border-gray-100">
                        <span className="w-32 text-gray-600 font-medium">{key}:</span>
                        <span className="flex-1 text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Mô tả sản phẩm</h3>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      {product.name} là một trong những mẫu laptop văn phòng được ưa chuộng nhất hiện nay. 
                      Với thiết kế mỏng nhẹ, hiệu năng ổn định và mức giá hợp lý, sản phẩm phù hợp cho 
                      sinh viên, nhân viên văn phòng và các công việc cơ bản.
                    </p>
                    <h4 className="text-md font-semibold mb-2">Thiết kế & Màn hình</h4>
                    <p className="mb-4">
                      Laptop sở hữu thiết kế hiện đại với lớp vỏ bằng nhựa cao cấp, trọng lượng chỉ 1.7kg 
                      giúp dễ dàng mang theo mọi lúc mọi nơi. Màn hình 15.6 inch Full HD mang đến hình ảnh 
                      sắc nét, màu sắc chân thực phục vụ tốt cho công việc và giải trí.
                    </p>
                    <h4 className="text-md font-semibold mb-2">Hiệu năng</h4>
                    <p className="mb-4">
                      Trang bị chip Intel Core i3-1315U thế hệ mới kết hợp cùng 8GB RAM DDR4 và ổ cứng 
                      SSD 512GB NVMe PCIe, máy đảm bảo khả năng xử lý mượt mà các tác vụ văn phòng, 
                      lướt web, xem phim và chơi game nhẹ.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Đánh giá từ khách hàng</h3>
                  <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-500">{product.rating}</div>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                            className="text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{product.reviewCount} đánh giá</div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5,4,3,2,1].map(stars => (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="w-8 text-sm">{stars}⭐</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ width: `${Math.random() * 80 + 10}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              U{i}
                            </div>
                            <span className="font-medium">User_{i}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} size={14} fill="#f59e0b" className="text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">2 ngày trước</span>
                        </div>
                        <p className="text-gray-700">
                          Sản phẩm rất tốt, đáng tiền. Giao hàng nhanh, đóng gói cẩn thận. 
                          Máy chạy mượt mà, màn hình đẹp. Rất hài lòng với sự lựa chọn này.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;