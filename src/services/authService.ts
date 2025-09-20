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

export const getInforUser = async () => {
  const { data } = await api.get("/api/auth/me");
  return {
    userName: data.userName, // đúng với JSON backend trả
    email: data.email,
    role: data.role,
  };
};