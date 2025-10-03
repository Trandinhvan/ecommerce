// import api from "./api";

// export const addToBasket = async (listBasket : any []) => {
//   console.log("AccessToken gửi lên:", localStorage.getItem("token"));
//   const res = await api.post("/api/basket", {
//     items: listBasket
//   });
//   return res.data;
// };


// export const getBasket = async () => {
//   const res = await api.get("/api/basket");
//   return res.data;
// };

// export const removeFromBasket = async (productId: number) => {
//   const res = await api.delete(`/api/basket/${productId}`);
//   return res.data;
// };

import api from "./api";

export const addToBasket = async (item: { productId: string; productName: string; price: number; quantity: number }) => {
  const res = await api.post("/api/basket", item);
  return res.data;
};

export const getBasket = async () => {
  const res = await api.get("/api/basket");
  return res.data;
};


export const updateBasketQuantity = async (productId: string, quantity: number) => {
  const res = await api.put(`/api/basket/${productId}`, { quantity });
  return res.data;
};

export const removeFromBasket = async (productId: string) => {
  console.log("Removing product with ID:", productId);
  const res = await api.delete(`/api/basket/${productId}`);
  return res.data;
};

export const clearBasket = async () => {
  const res = await api.delete("/api/basket");
  return res.data;
};