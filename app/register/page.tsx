"use client";

import React, { useState, Suspense, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess, showError } from "@/lib/sweetalert";
import {
  AuthRuleError,
  signupWithEmail,
  loginWithGoogle,
} from "@/lib/services/authService";
import { useLanguage } from "@/app/context/LanguageContext";
import { useAppTheme } from "@/app/context/ThemeContext";
import {
  CustomerRegisterForm,
  type CustomerFormData,
} from "@/components/auth/CustomerRegisterForm";
import {
  HelperRegisterForm,
  type HelperFormData,
} from "@/components/auth/HelperRegisterForm";
import { ArrowLeft, ArrowRight, Sparkles, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function RegisterPageContent() {
  const { dict, isRTL } = useLanguage();
  const { isDark } = useAppTheme();
  const searchParams = useSearchParams();
  const defaultType =
    searchParams.get("type") === "helper" ? "helper" : "customer";
  const [registerType, setRegisterType] = useState<"customer" | "helper">(
    defaultType as "customer" | "helper",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGoogleSignup = useCallback(async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle({ role: registerType });
      await showSuccess(
        dict.auth.welcome_back,
        `Signed up with Google as ${registerType}`,
      );
      router.push(
        registerType === "helper"
          ? "/subscriptions?role=helper&next=/helper/dashboard"
          : "/subscriptions?role=customer&next=/customer/dashboard",
      );
    } catch (err: unknown) {
      const msg =
        err instanceof AuthRuleError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Google sign-up failed";
      await showError("Google Sign-up Failed", msg);
      setIsLoading(false);
    }
  }, [registerType, router, dict]);

  const onCustomerSubmit = useCallback(
    async (data: CustomerFormData) => {
      setIsLoading(true);
      try {
        await signupWithEmail({
          role: "customer",
          email: data.email,
          password: data.password,
          displayName: data.fullName,
          phone: data.phone,
        });
        await showSuccess("Account created successfully!");
        router.push("/subscriptions?role=customer&next=/customer/dashboard");
      } catch (err: unknown) {
        const msg =
          err instanceof AuthRuleError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Registration failed";
        await showError("Registration Failed", msg);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const onHelperSubmit = useCallback(
    async (data: HelperFormData) => {
      setIsLoading(true);
      try {
        await signupWithEmail({
          role: "helper",
          email: data.email,
          password: data.password,
          displayName: data.fullName,
          phone: data.phone,
        });
        await showSuccess("Application submitted successfully!");
        router.push("/subscriptions?role=helper&next=/helper/dashboard");
      } catch (err: unknown) {
        const msg =
          err instanceof AuthRuleError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Registration failed";
        await showError("Registration Failed", msg);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

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

      {/* Left Side - Premium Image & Features */}
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
            Start Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-orange-500 to-yellow-500 animate-pulse">
              Journey
            </span>
            <br />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-300 text-xl max-w-md leading-relaxed"
          >
            {dict.auth.join_roadhelper}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10 flex gap-4"
        >
          {[
            {
              icon: Sparkles,
              label: dict.auth.verified,
              value: "100%",
            },
            { icon: Zap, label: dict.auth.fast, value: "< 2 min" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className={cn(
                "px-6 py-4 rounded-2xl border backdrop-blur-xl cursor-pointer group transition-all",
                isDark
                  ? "glass-dark border-white/10 bg-white/5"
                  : "bg-white/50 border-gray-200",
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon
                  className="text-brand-red group-hover:animate-spin"
                  size={24}
                />
                <p
                  className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {stat.value}
                </p>
              </div>
              <p
                className={`text-xs uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
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
          href="/"
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
          className="w-full max-w-125"
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
              <Sparkles size={40} className="text-brand-red" />
            </div>
            <h2
              className={cn(
                "font-manrope text-4xl font-bold mb-2 bg-clip-text text-transparent",
                isDark
                  ? "bg-gradient-to-r from-white to-gray-300"
                  : "bg-gradient-to-r from-gray-900 to-gray-700",
              )}
            >
              {dict.auth.create_account}
            </h2>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              {dict.auth.join_roadhelper}
            </p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {(["customer", "helper"] as const).map((type) => (
              <motion.button
                key={type}
                onClick={() => setRegisterType(type)}
                className={cn(
                  "py-3 px-4 rounded-lg font-medium transition-all",
                  registerType === type
                    ? "bg-brand-red text-white"
                    : isDark
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {type === "customer" ? dict.auth.customer : dict.auth.helper}
              </motion.button>
            ))}
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {registerType === "customer" ? (
              <CustomerRegisterForm
                key="customer"
                isLoading={isLoading}
                onSubmit={onCustomerSubmit}
              />
            ) : (
              <HelperRegisterForm
                key="helper"
                isLoading={isLoading}
                onSubmit={onHelperSubmit}
              />
            )}
          </AnimatePresence>

          {/* Google Signup */}
          <div
            className={cn(
              "mt-6 pt-6 border-t",
              isDark ? "border-white/10" : "border-gray-200",
            )}
          >
            <Button
              onClick={handleGoogleSignup}
              disabled={isLoading}
              variant="outline"
              className={cn(
                "w-full",
                isDark
                  ? "bg-white/3 border-white/10 hover:bg-white/10 text-white"
                  : "bg-white border-gray-300 hover:bg-gray-50 text-gray-900",
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  {dict.auth.continue_google}
                </>
              ) : (
                dict.auth.continue_google
              )}
            </Button>
          </div>

          {/* Login Link */}
          <p
            className={cn(
              "text-center mt-6 text-sm font-semibold",
              isDark ? "text-gray-400" : "text-gray-600",
            )}
          >
            {dict.auth.already_have_account}{" "}
            <Link
              href={`/login?type=${registerType}`}
              className="text-brand-red font-bold hover:underline transition-all"
            >
              {dict.auth.sign_in}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}
