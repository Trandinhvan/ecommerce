import api from "./api";

// Kiểu dữ liệu sản phẩm gửi lên khi tạo order
export interface OrderItemDto {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

// Chỉ cần list items, userId lấy từ JWT ở backend
export interface PlaceOrderDto {
  items: OrderItemDto[];
}

// ✅ Gửi yêu cầu tạo order
export const placeOrder = async (
  orderData: PlaceOrderDto
): Promise<{ orderId: string }> => {
  const { data } = await api.post<{ orderId: string }>("/api/orders", orderData);
  return data;
};

// // ✅ Lấy danh sách orders của user
// export const getOrders = async (): Promise<OrderDto[]> => {
//   const { data } = await api.get<OrderDto[]>("/api/orders/user/me"); // backend lấy user từ JWT
//   return data;
// };

// // ✅ Lấy chi tiết 1 order
// export const getOrderById = async (orderId: string): Promise<OrderDto> => {
//   const { data } = await api.get<OrderDto>(`/api/orders/${orderId}`);
//   return data;
// };
