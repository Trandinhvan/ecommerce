import api from "./api";

export const searchProducts = async (query: string ) => {
    const { data } = await api.get(`/search?query=${encodeURIComponent(query)}`);
    return data;
}