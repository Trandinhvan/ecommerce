import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 bg-white">
        {/* Breadcrumb section - optional */}
        <div className="bg-gray-100 border-b">
          <div className="container mx-auto px-4 py-2">
            <div className="text-sm text-gray-600">
              {/* Breadcrumb sẽ được thêm vào từng trang cụ thể */}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}