import api from "./api";

// src/types/payment.ts
export interface PaymentRequest {
  orderId: string;
  userId: string;
  amount: number;
}

export interface PaymentResponse {
  paymentUrl: string;
  status: string;
}


// export const payOrder = async (orderId: string, paymentData: any) => {
//     const { data } = await api.post(`payment/pay/${orderId}`, paymentData);
//     return data;
// }

export const processPayment = async (payload: PaymentRequest): Promise<PaymentResponse> => {
  const res = await api.post<PaymentResponse>("/api/payment", payload);
  return res.data;
};