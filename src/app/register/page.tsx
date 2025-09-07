"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { register } from '@/services/authService';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast, Toaster } from 'sonner';

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const { status, data } = await register(username, email, password);

        if (status === 200) {
          router.push("/login");
        } else {
          toast.error("Registration failed", {
            description: data || "Something went wrong",
          });
        }
      } catch (err: any) {
        toast.error("Error", {
          description: err?.response?.data || "Unexpected error",
        });
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" richColors></Toaster>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold bg-red">Đăng ký tài khoản</CardTitle>
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
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Đăng ký</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
