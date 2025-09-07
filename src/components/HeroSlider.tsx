import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Link from "next/link"

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      title: "KHUYẾN MÃI HOT",
      subtitle: "iPhone 15 Series",
      description: "Giảm đến 3 triệu - Trả góp 0%",
      buttonText: "Mua ngay",
      link: "/iphone-15",
      background: "bg-gradient-to-r from-orange-500 to-red-500",
      image: "📱"
    },
    {
      id: 2,
      title: "SĂN SALE ĐÓN LỄ",
      subtitle: "Laptop Gaming",
      description: "Ưu đãi lên đến 5 triệu + Quà tặng",
      buttonText: "Xem ngay",
      link: "/laptop-gaming", 
      background: "bg-gradient-to-r from-blue-600 to-purple-600",
      image: "💻"
    },
    {
      id: 3,
      title: "DEAL SỐC HÔM NAY",
      subtitle: "Đồng hồ thông minh",
      description: "Apple Watch Series 10 - Giá từ 9.9 triệu",
      buttonText: "Đặt mua",
      link: "/apple-watch",
      background: "bg-gradient-to-r from-green-500 to-teal-500",
      image: "⌚"
    },
    {
      id: 4,
      title: "QUÀ TẶNG KHỦNG",
      subtitle: "Máy cũ đổi mới",
      description: "Thu cũ lên đời - Trợ giá lên đến 2 triệu",
      buttonText: "Đổi ngay",
      link: "/may-cu-doi-moi",
      background: "bg-gradient-to-r from-orange-600 to-yellow-500",
      image: "🔄"
    }
  ]

  return (
    <div className="relative">
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Autoplay, Pagination]}
        className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide.link}>
              <div className={`${slide.background} h-64 md:h-96 flex items-center justify-center relative cursor-pointer hover:scale-105 transition-transform duration-300`}>
                {/* Background pattern */}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center text-white px-6 max-w-4xl">
                  {/* Badge */}
                  <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold mb-3 animate-pulse">
                    {slide.title}
                  </div>
                  
                  {/* Main title with emoji */}
                  <h2 className="text-3xl md:text-6xl font-bold mb-3 flex items-center justify-center gap-3">
                    <span className="text-4xl md:text-7xl">{slide.image}</span>
                    <span>{slide.subtitle}</span>
                  </h2>
                  
                  {/* Description */}
                  <p className="text-lg md:text-2xl mb-6 font-medium">
                    {slide.description}
                  </p>
                  
                  {/* CTA Button */}
                  <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg md:text-xl hover:bg-orange-50 transition-colors shadow-lg transform hover:scale-105">
                    {slide.buttonText}
                  </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white border-opacity-30 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-20 h-20 border-2 border-white border-opacity-20 rounded-full"></div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all shadow-lg">
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all shadow-lg">
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #ea580c;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  )
}