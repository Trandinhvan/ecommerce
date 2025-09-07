import Link from "next/link"
import { Facebook, Youtube, Zap, MapPin, Phone, Mail, Clock, Award, Shield, Truck } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-10">
      {/* Services section */}
      <div className="bg-white py-8 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Truck className="text-orange-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Giao hàng miễn phí</h4>
              <p className="text-sm text-gray-600">Cho đơn hàng từ 500.000đ</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="text-orange-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Bảo hành chính hãng</h4>
              <p className="text-sm text-gray-600">Tại các trung tâm bảo hành</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Award className="text-orange-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Đổi trả 15 ngày</h4>
              <p className="text-sm text-gray-600">Miễn phí đổi trả</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Clock className="text-orange-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Hỗ trợ 24/7</h4>
              <p className="text-sm text-gray-600">Tư vấn online miễn phí</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="mb-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">TechStore</div>
              <div className="text-sm text-gray-600">Siêu thị điện tử</div>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>128 Trần Quang Khải, P.Tân Định, Q.1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>1800.1060 (miễn phí)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@techstore.com</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Link href="#" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                <Facebook size={16} />
              </Link>
              <Link href="#" className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700">
                <Youtube size={16} />
              </Link>
              <Link href="#" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600">
                <Zap size={16} />
              </Link>
            </div>
          </div>

          {/* Product categories */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/dien-thoai" className="hover:text-orange-600">Điện thoại</Link></li>
              <li><Link href="/laptop" className="hover:text-orange-600">Laptop</Link></li>
              <li><Link href="/tablet" className="hover:text-orange-600">Tablet</Link></li>
              <li><Link href="/dong-ho" className="hover:text-orange-600">Đồng hồ thông minh</Link></li>
              <li><Link href="/phu-kien" className="hover:text-orange-600">Phụ kiện</Link></li>
              <li><Link href="/pc-gaming" className="hover:text-orange-600">PC Gaming</Link></li>
              <li><Link href="/may-cu" className="hover:text-orange-600">Máy cũ giá rẻ</Link></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Chăm sóc khách hàng</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/huong-dan-mua-hang" className="hover:text-orange-600">Hướng dẫn mua hàng</Link></li>
              <li><Link href="/chinh-sach-bao-hanh" className="hover:text-orange-600">Chính sách bảo hành</Link></li>
              <li><Link href="/chinh-sach-doi-tra" className="hover:text-orange-600">Chính sách đổi trả</Link></li>
              <li><Link href="/chinh-sach-giao-hang" className="hover:text-orange-600">Chính sách giao hàng</Link></li>
              <li><Link href="/phuong-thuc-thanh-toan" className="hover:text-orange-600">Phương thức thanh toán</Link></li>
              <li><Link href="/tra-gop" className="hover:text-orange-600">Mua trả góp</Link></li>
              <li><Link href="/bao-mat-thong-tin" className="hover:text-orange-600">Bảo mật thông tin</Link></li>
            </ul>
          </div>

          {/* About company */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Về công ty</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/gioi-thieu" className="hover:text-orange-600">Giới thiệu công ty</Link></li>
              <li><Link href="/tuyen-dung" className="hover:text-orange-600">Tuyển dụng</Link></li>
              <li><Link href="/lien-he" className="hover:text-orange-600">Liên hệ</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-orange-600">Tin tức</Link></li>
              <li><Link href="/he-thong-cua-hang" className="hover:text-orange-600">Hệ thống cửa hàng</Link></li>
              <li><Link href="/chinh-sach-bao-mat" className="hover:text-orange-600">Chính sách bảo mật</Link></li>
              <li><Link href="/dieu-khoan-su-dung" className="hover:text-orange-600">Điều khoản sử dụng</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-orange-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-center md:text-left">
              <p>© 2025 TechStore. Tất cả các quyền được bảo lưu.</p>
              <p>Công ty TNHH TechStore - GPĐKKD: 0123456789 do Sở KH & ĐT TP.HCM cấp ngày 01/01/2020</p>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://via.placeholder.com/80x30/ffffff/000000?text=DMCA" alt="DMCA" className="h-8" />
              <img src="https://via.placeholder.com/80x30/ffffff/000000?text=BCT" alt="Bộ Công Thương" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}