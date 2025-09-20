import api from "./api";

export const addToBasket = async (listBasket : any []) => {
  console.log("AccessToken gửi lên:", localStorage.getItem("token"));
  const res = await api.post("/api/basket", {
    items: listBasket
  });
  return res.data;
};


export const getBasket = async () => {
  const res = await api.get("/api/basket");
  return res.data;
};

export const removeFromBasket = async (productId: number) => {
  const res = await api.delete(`/api/basket/${productId}`);
  return res.data;
};