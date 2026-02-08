"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const token = await userCredential.user.getIdToken();
      setCookie("role", "admin", { maxAge: 60 * 60 * 24 * 7, path: "/" });
      setCookie("token", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });
      toast.success("🎉 Welcome back, Admin!");
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error("⚠️ Invalid credentials or not authorized as admin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-brand-black to-black font-satoshi text-white overflow-hidden relative p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isClient &&
          [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-red/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
                opacity: [0.2, 0.8, 0.2],
                scale: [null, Math.random() * 1.5 + 0.5],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
      </div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-red/20 blur-[150px] rounded-full"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Link
          href="/"
          className="absolute -top-16 left-0 text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
        >
          <ArrowRight
            className="rotate-180 group-hover:-translate-x-1 transition-transform"
            size={16}
          />
          <span className="text-sm font-bold">Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ rotate: [0, 5, -5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-6 rounded-3xl bg-gradient-to-br from-brand-red/30 to-orange-500/30 mb-6 border-2 border-brand-red/30 shadow-2xl shadow-brand-red/30 backdrop-blur-xl"
          >
            <Shield size={56} className="text-brand-red" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-gray-400 text-lg">
            Sign in to manage the platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-dark p-8 rounded-3xl border-2 border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label className="text-gray-300 text-xs uppercase tracking-wider font-bold flex items-center gap-2">
                <Mail size={14} className="text-brand-red" />
                Admin Email
              </Label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative group"
              >
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-brand-red transition-colors z-10" />
                <Input
                  {...register("email")}
                  className="pl-12 h-14 bg-white/5 backdrop-blur-xl border-2 border-white/10 text-white focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red rounded-xl transition-all hover:bg-white/10 hover:border-brand-red/50"
                  placeholder="admin@roadhelper.com"
                />
                <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-red/20 to-transparent opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity pointer-events-none" />
              </motion.div>
              {errors.email && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs ml-1 flex items-center gap-1"
                >
                  ⚠️ {errors.email.message as string}
                </motion.span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label className="text-gray-300 text-xs uppercase tracking-wider font-bold flex items-center gap-2">
                <Lock size={14} className="text-brand-red" />
                Password
              </Label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative group"
              >
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-500 group-focus-within:text-brand-red transition-colors z-10" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="pl-12 pr-12 h-14 bg-white/5 backdrop-blur-xl border-2 border-white/10 text-white focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red rounded-xl transition-all hover:bg-white/10 hover:border-brand-red/50"
                  placeholder="••••••••"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-brand-red transition-colors z-10 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
                <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-red/20 to-transparent opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity pointer-events-none" />
              </motion.div>
              {errors.password && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs ml-1 flex items-center gap-1"
                >
                  ⚠️ {errors.password.message as string}
                </motion.span>
              )}
              {/* Forgot Password Link */}
              <div className="text-right pt-1">
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-brand-red hover:text-white transition-colors hover:underline cursor-pointer inline-flex items-center gap-1 group"
                >
                  <Lock size={12} className="group-hover:animate-pulse" />
                  Forgot Password?
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 text-lg font-bold bg-gradient-to-r from-brand-red via-brand-dark-red to-brand-red bg-size-200 hover:shadow-2xl hover:shadow-brand-red/50 transition-all duration-500 rounded-xl border-2 border-brand-red/50 hover:border-brand-red group relative overflow-hidden cursor-pointer"
                style={{ backgroundSize: "200% 100%" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Shield size={20} />
                      Admin Login
                      <ArrowRight
                        className="group-hover:translate-x-1 transition-transform"
                        size={20}
                      />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
