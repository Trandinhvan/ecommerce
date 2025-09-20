"use client";

import { getInforUser } from "@/services/authService";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  userName: string; // Khớp với userName từ backend
  email: string;
  role: string; // Khớp với role từ backend
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Lấy token và thông tin user khi component mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUserInfo(savedToken);
    }
  }, []);

  // Hàm gọi API để lấy thông tin user
  const fetchUserInfo = async (accessToken: string) => {
    try {
      const userData = await getInforUser(); // Gọi hàm getInforUser từ authService
      console.log("Fetched user data:", userData);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user info:", error);
      logout(); // Đăng xuất nếu lấy thông tin thất bại
    }
  };

  const login = (accessToken: string) => {
    setToken(accessToken);
    if (typeof window !== "undefined") {
      localStorage.setItem("token", accessToken);
    }
    fetchUserInfo(accessToken); // Lấy thông tin user sau khi đăng nhập
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};