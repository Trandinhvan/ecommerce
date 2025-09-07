import api from './api';

export const getProducts = async () => { 
    const { data } = await api.get('/api/product');
    return data;
}

export const getProductById = async (id: string ) => {
    const { data } = await api.get(`/api/product/${id}`);
    return data;
}