"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Script from "next/script"; // ✅ thay thế script thẳng

// Kiểu lỗi trả về từ server
interface ApiError {
  response?: {
    data?: string;
  };
}

export default function Login() {
  const { login: setAuth } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(username, password);

      if (data?.accessToken) {
        setAuth(data.accessToken);
        toast.success("Đăng nhập thành công", {
          description: "Chào mừng bạn quay lại 👋",
        });
        router.push("/catalog");
      } else {
        toast.error("Đăng nhập thất bại", {
          description: "Sai tài khoản hoặc mật khẩu",
        });
      }
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      toast.error("Lỗi", {
        description: apiErr?.response?.data || "Không thể kết nối server",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* ✅ script external phải đưa bằng <Script /> */}
      <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" strategy="afterInteractive" />
      
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Đăng nhập
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="username"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center">
          <p className="w-full">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
