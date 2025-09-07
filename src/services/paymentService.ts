import api from "./api";

export const payOrder = async (orderId: string, paymentData: any) => {
    const { data } = await api.post(`payment/pay/${orderId}`, paymentData);
    return data;
}