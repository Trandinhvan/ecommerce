import api from "./api";

export const login = async (username: string, password: string ) => {
    const { data } = await api.post('/api/auth/login', { username, password });
    return data;
}

export const register = async (username: string, email: string , password: string) => {
    // const { data } = await api.post('/api/auth/register', { username, email, password });
    const data = await api.post('/api/auth/register', { username, email, password });
    return data;
}