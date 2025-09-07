import api from "./api";

export const placeOrder = async (orderData: any) => {
  const { data } = await api.post("/ordering/place", orderData);
  return data;
};

export const getOrders = async () => {
  const { data } = await api.get("/ordering");
  return data;
};
