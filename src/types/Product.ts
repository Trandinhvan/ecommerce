export interface Product {
  id: string;              // UUID từ backend
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;  // giá gốc (nếu có)
  discount?: number;       // phần trăm giảm giá (nếu có)

  categoryId?: string;     // backend trả Guid
  categoryName?: string;   // tên category

  imageUrl: string;
  createdAt: string;      // nếu cần thời gian tạo
  stock?: number;          // tồn kho (nếu có)

  // Thông tin hiển thị thêm
  rating?: number;
  reviewCount?: number;
  gift?: string;
  isHot?: boolean;
  isNew?: boolean;
  installment?: string;
  specs?: string[];
}
