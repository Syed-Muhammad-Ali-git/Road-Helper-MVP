"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess, showError } from "@/lib/sweetalert";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useLanguage } from "@/app/context/LanguageContext";
import { useAppTheme } from "@/app/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { dict, isRTL } = useLanguage();
  const { isDark } = useAppTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setSubmitted(true);
      await showSuccess(
        "Reset link sent",
        "Check your email for the password recovery link.",
      );
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to send reset email";
      await showError("Failed to send reset email", msg);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex font-satoshi overflow-hidden relative",
        isDark
          ? "bg-gradient-to-br from-black via-brand-black to-black text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900",
        isRTL ? "font-urdu" : "font-satoshi",
      )}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isClient &&
          isDark &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-red/30 rounded-full"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1920),
                y:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 1080),
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [
                  null,
                  Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 1080),
                ],
                x: [
                  null,
                  Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1920),
                ],
                opacity: [0.2, 0.8, 0.2],
                scale: [null, Math.random() * 1.5 + 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
      </div>

      {/* Gradient Orbs */}
      {isDark && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-red/20 blur-[150px] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full"
          />
        </>
      )}

      {/* Left Side - Premium Image */}
      <motion.div
        initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 z-10"
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-brand-charcoal/50 to-transparent">
          <Image
            src="/assets/images/login-sidebar.png"
            alt="Background"
            fill
            sizes="50vw"
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-14 h-14 relative bg-white rounded-2xl overflow-hidden shadow-2xl shadow-brand-red/30 p-2"
            >
              <Image
                src="/assets/images/logo.png"
                alt="Road Helper Logo"
                fill
                sizes="56px"
                className="object-contain"
              />
            </motion.div>
            <span className="font-manrope font-bold text-3xl tracking-tighter">
              Road<span className="text-brand-red">Helper</span>
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-7xl font-bold leading-tight mb-6"
          >
            Reset Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-orange-500 to-yellow-500 animate-pulse">
              Password
            </span>
            <br />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-300 text-xl max-w-md leading-relaxed"
          >
            We&apos;ll send you a secure link to reset your password and regain
            access to your RoadHelper account.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10"
        >
          <div
            className={cn(
              "px-6 py-4 rounded-2xl border backdrop-blur-xl cursor-pointer group transition-all inline-block",
              isDark
                ? "glass-dark border-white/10 bg-white/5"
                : "bg-white/50 border-gray-200",
            )}
          >
            <div className="flex items-center gap-3">
              <Sparkles
                className="text-brand-red group-hover:animate-spin"
                size={24}
              />
              <div>
                <p
                  className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Secure Reset
                </p>
                <p
                  className={`text-xs uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Email Verification
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <div
        className={cn(
          "w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10",
          isDark
            ? "bg-black/30 backdrop-blur-sm"
            : "bg-white/50 backdrop-blur-sm",
        )}
      >
        <Link
          href="/login"
          className={`absolute top-4 sm:top-8 ${isRTL ? "right-4 sm:right-8" : "left-4 sm:left-8"} z-20`}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={cn(
              "flex items-center gap-2 text-sm font-bold hover:text-brand-red transition-all",
              isDark ? "text-gray-400" : "text-gray-600",
            )}
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {dict.auth.back_to_home}
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-120"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div
                    className={cn(
                      "inline-block mb-4 p-4 rounded-2xl border",
                      isDark
                        ? "bg-gradient-to-br from-brand-red/20 to-orange-500/20 border-brand-red/30"
                        : "bg-gradient-to-br from-brand-red/10 to-orange-500/10 border-brand-red/20",
                    )}
                  >
                    <Mail size={40} className="text-brand-red" />
                  </div>
                  <h2
                    className={cn(
                      "font-manrope text-4xl font-bold mb-2 bg-clip-text text-transparent",
                      isDark
                        ? "bg-gradient-to-r from-white to-gray-300"
                        : "bg-gradient-to-r from-gray-900 to-gray-700",
                    )}
                  >
                    Forgot Password?
                  </h2>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                    No worries! Enter your email and we&apos;ll send you a
                    recovery link.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label
                      className={cn(
                        "text-xs uppercase tracking-wider font-bold flex items-center gap-2",
                        isDark ? "text-gray-300" : "text-gray-700",
                      )}
                    >
                      <Mail size={14} className="text-brand-red" />
                      {dict.auth.email_address}
                    </Label>
                    <motion.div
                      whileFocus={{ scale: 1.01 }}
                      className="relative group"
                    >
                      <Mail
                        className={`absolute ${isRTL ? "right-4" : "left-4"} top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-brand-red transition-colors z-10`}
                      />
                      <Input
                        {...register("email")}
                        className={cn(
                          `${isRTL ? "pr-12" : "pl-12"} h-14 border-2 backdrop-blur-xl rounded-xl transition-all focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red`,
                          isDark
                            ? "bg-white/5 border-white/10 text-white focus:bg-white/10 hover:bg-white/10 hover:border-brand-red/50"
                            : "bg-white border-gray-300 text-black placeholder:text-gray-400 focus:bg-gray-50 hover:bg-gray-50 hover:border-brand-red/30",
                        )}
                        placeholder="name@example.com"
                        dir="ltr"
                      />
                      <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-red/20 to-transparent opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity pointer-events-none" />
                    </motion.div>
                    {errors.email && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs ml-1 flex items-center gap-1"
                      >
                        ⚠️ {errors.email.message}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "w-full h-16 text-lg font-bold rounded-xl group relative overflow-hidden border-2 transition-all duration-500 cursor-pointer",
                        isDark
                          ? "bg-gradient-to-r from-brand-red via-brand-dark-red to-brand-red hover:shadow-2xl hover:shadow-brand-red/50 border-brand-red/50 hover:border-brand-red"
                          : "bg-gradient-to-r from-brand-red via-orange-600 to-brand-red hover:shadow-2xl hover:shadow-red-500/30 border-brand-red hover:border-brand-red",
                      )}
                      style={{ backgroundSize: "200% 100%" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Reset Link
                            {isRTL ? (
                              <ArrowLeft
                                className="group-hover:-translate-x-1 transition-transform"
                                size={20}
                              />
                            ) : (
                              <ArrowRight
                                className="group-hover:translate-x-1 transition-transform"
                                size={20}
                              />
                            )}
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>

                {/* Back to Login */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-center"
                >
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      className="text-brand-red font-bold hover:underline transition-colors relative group cursor-pointer"
                    >
                      Sign In
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="inline-block mb-8 relative"
                >
                  <div
                    className={cn(
                      "p-4 rounded-2xl",
                      isDark
                        ? "bg-emerald-500/10 border-2 border-emerald-500/30"
                        : "bg-emerald-500/10 border-2 border-emerald-500/30",
                    )}
                  >
                    <CheckCircle size={60} className="text-emerald-500" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={cn(
                    "text-3xl font-bold mb-4",
                    isDark ? "text-white" : "text-gray-900",
                  )}
                >
                  Check Your Inbox
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={isDark ? "text-gray-400" : "text-gray-600"}
                >
                  A password recovery link has been sent to{" "}
                  <span
                    className={cn(
                      "font-bold",
                      isDark ? "text-white" : "text-gray-900",
                    )}
                  >
                    {getValues("email")}
                  </span>
                  . Click the link to reset your password.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 space-y-4"
                >
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className={cn(
                      "w-full h-12",
                      isDark
                        ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                        : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50",
                    )}
                  >
                    Try Another Email
                  </Button>
                  <Link href="/login">
                    <Button
                      className={cn(
                        "w-full h-12 font-semibold",
                        isDark
                          ? "bg-gradient-to-r from-brand-red via-brand-dark-red to-brand-red hover:shadow-2xl hover:shadow-brand-red/50 border-2 border-brand-red/50 text-white"
                          : "bg-gradient-to-r from-brand-red via-orange-600 to-brand-red hover:shadow-2xl hover:shadow-red-500/30 border-2 border-brand-red text-white",
                      )}
                    >
                      Back to Sign In
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
