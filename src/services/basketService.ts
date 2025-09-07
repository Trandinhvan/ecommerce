import api from "./api";

export const getBasket = async () => {
    const { data } = await api.get("/basket");
    return data;
}

export const addItem = async (productId: string, quantity: number) => {
    const { data } = await api.post("/basket/add", {productId, quantity});
    return data;
}

export const removeItem = async (productId: string) => {
    const { data } = await api.delete(`/basket/remove/${productId}`);
    return data;
}

export const clearBasket = async () => {
  const { data } = await api.delete("/basket/clear");
  return data;
};