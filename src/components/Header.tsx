import Link from "next/link"
import { ShoppingCart, Search, MapPin, Phone, User, Menu, Smartphone, Laptop, Tablet, Watch, Headphones, Monitor, RotateCcw, CreditCard } from "lucide-react"

export default function Header() {
  return (
    <>
      {/* Top bar */}
      <div className="bg-orange-600 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>1800.1060 (miễn phí)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>Tìm siêu thị</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Thông tin khuyến mãi</span>
            <span>Hỏi đáp</span>
            <span>Tuyển dụng</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-orange-500 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-white">
                TechStore
              </div>
              <div className="text-xs text-white">Siêu thị điện tử</div>
            </Link>

            {/* Search bar */}
            <div className="flex-1 max-w-2xl mx-4 bg-white rounded-lg shadow-sm">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Bạn tìm gì..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {/* User account */}
              <Link href="/account" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <User size={20} />
                <div className="hidden md:block">
                  <div className="text-xs text-gray-500">Tài khoản</div>
                  <div className="text-sm font-medium">Đăng nhập</div>
                </div>
              </Link>

              {/* Shopping cart */}
              <Link href="/cart" className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <div className="relative">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div>
                <div className="hidden md:block">
                  <div className="text-xs text-gray-500">Giỏ hàng</div>
                  <div className="text-sm font-medium">0 sản phẩm</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <div className="bg-orange-600 text-white">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-0">
              <Link href="/dien-thoai" className="px-4 py-3 hover:bg-orange-700 transition-colors">
                <div className="flex items-center gap-2">
                  <Smartphone size={16} />
                  <span>Điện thoại</span>
                </div>
              </Link>
              <Link href="/laptop" className="px-4 py-3 hover:bg-orange-700 transition-colors">
                <div className="flex items-center gap-2">
                  <Laptop size={16} />
                  <span>Laptop</span>
                </div>
              </Link>
              <Link href="/tablet" className="px-4 py-3 hover:bg-orange-700 transition-colors">
                <div className="flex items-center gap-2">
                  <Tablet size={16} />
                  <span>Tablet</span>
                </div>
              </Link>
              <Link href="/dong-ho" className="px-4 py-3 hover:bg-orange-700 transition-colors">
                <div className="flex items-center gap-2">
                  <Watch size={16} />
                  <span>Đồng hồ</span>
                </div>
              </Link>
              <Link href="/phu-kien" className="px-4 py-3 hover:bg-orange-700 transition-colors">
                <div className="flex items-center gap-2">
                  <Headphones size={16} />
                  <span>Phụ kiện</span>
                </div>
              </Link>
              <Link href="/pc-gaming" className="px-4 py-3 hover:bg-orange-700 transition-colors">
                <div className="flex items-center gap-2">
                  <Monitor size={16} />
                  <span>PC Gaming</span>
                </div>
              </Link>
              <Link href="/may-cu" className="px-4 py-3 hover:bg-orange-700 transition-colors text-yellow-300">
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} />
                  <span>Máy cũ giá rẻ</span>
                </div>
              </Link>
              <Link href="/sim-the" className="px-4 py-3 hover:bg-orange-700 transition-colors">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <span>Sim, thẻ cào</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}