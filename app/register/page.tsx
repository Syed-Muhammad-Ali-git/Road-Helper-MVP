"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Phone,
  Mail,
  User,
  Lock,
  ArrowLeft,
  Loader2,
  Briefcase,
  CreditCard,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

const customerSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const helperSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  cnic: z
    .string()
    .min(13, "CNIC must be 13 digits")
    .regex(/^\d+$/, "CNIC must be numbers only"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  serviceType: z.string().min(1, "Service type is required"),
});

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const defaultType =
    searchParams.get("type") === "helper" ? "helper" : "customer";
  const [registerType, setRegisterType] = useState<"customer" | "helper">(
    defaultType as any,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register: registerCustomer,
    handleSubmit: handleSubmitCustomer,
    formState: { errors: errorsCustomer },
  } = useForm({
    resolver: zodResolver(customerSchema),
  });

  const {
    register: registerHelper,
    handleSubmit: handleSubmitHelper,
    formState: { errors: errorsHelper },
  } = useForm({
    resolver: zodResolver(helperSchema),
  });

  const onCustomerSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const token = await userCredential.user.getIdToken();
      await updateProfile(userCredential.user, { displayName: data.fullName });
      setCookie("role", "customer", {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      setCookie("token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      toast.success("🎉 Account created successfully!");
      router.push("/customer/dashboard");
    } catch (error: any) {
      toast.error(`⚠️ ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const onHelperSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const token = await userCredential.user.getIdToken();
      await updateProfile(userCredential.user, { displayName: data.fullName });
      setCookie("role", "helper", { maxAge: 60 * 60 * 24 * 7, path: "/" });
      setCookie("token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      toast.success("🎉 Application submitted successfully!");
      router.push("/helper/dashboard");
    } catch (error: any) {
      toast.error(`⚠️ ${error.message || "Registration failed"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-brand-black to-black font-satoshi text-white overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-brand-red to-orange-500 rounded-full"
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
              opacity: [0.1, 1, 0.1],
              scale: [null, Math.random() * 2 + 0.5],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Rotating Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          x: [0, 100, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-red/20 blur-[180px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          rotate: [360, 180, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[180px] rounded-full"
      />

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10 bg-black/30 backdrop-blur-sm">
        <Link href="/" className="absolute top-8 left-8 group">
          <motion.div
            whileHover={{ scale: 1.05, x: -5 }}
            className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brand-red transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[540px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
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
              className="inline-block mb-6"
            >
              <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-red/30 to-orange-500/30 border-2 border-brand-red/30 shadow-2xl shadow-brand-red/30 backdrop-blur-xl relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <Sparkles size={52} className="text-brand-red relative z-10" />
              </div>
            </motion.div>
            <h2 className="font-manrope text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-400 text-lg">
              Join RoadHelper and start your journey today
            </p>
          </motion.div>

          {/* Enhanced Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-gradient-to-r from-white/10 to-white/5 p-1.5 rounded-2xl border border-white/20 mb-8 backdrop-blur-xl shadow-2xl"
          >
            <motion.div
              layout
              className={cn(
                "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-brand-red to-orange-600 rounded-xl shadow-xl shadow-brand-red/40",
                registerType === "helper" ? "left-[calc(50%+3px)]" : "left-1.5",
              )}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
            <div className="relative z-10 flex gap-1">
              {[
                { type: "customer", icon: "👤", label: "Customer" },
                { type: "helper", icon: "🛠️", label: "Helper" },
              ].map((item) => (
                <motion.button
                  key={item.type}
                  onClick={() => setRegisterType(item.type as any)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex-1 py-4 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-2",
                    registerType === item.type
                      ? "text-white border-transparent"
                      : "text-gray-400 border-transparent hover:border-white/10 hover:text-white",
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {registerType === "customer" ? (
              <motion.div
                key="customer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
              >
                <form
                  onSubmit={handleSubmitCustomer(onCustomerSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    icon={User}
                    label="Full Name"
                    register={registerCustomer("fullName")}
                    placeholder="John Doe"
                    error={errorsCustomer.fullName?.message as string}
                    delay={0.1}
                  />
                  <FormField
                    icon={Mail}
                    label="Email Address"
                    register={registerCustomer("email")}
                    placeholder="john@example.com"
                    error={errorsCustomer.email?.message as string}
                    delay={0.2}
                  />
                  <FormField
                    icon={Phone}
                    label="Phone Number"
                    register={registerCustomer("phone")}
                    placeholder="+1 234 567 8900"
                    error={errorsCustomer.phone?.message as string}
                    delay={0.3}
                  />
                  <PasswordField
                    register={registerCustomer("password")}
                    error={errorsCustomer.password?.message as string}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    delay={0.4}
                  />

                  <SubmitButton
                    isLoading={isLoading}
                    text="Create Account"
                    delay={0.5}
                  />
                </form>
                <CTA delay={0.6} />
              </motion.div>
            ) : (
              <motion.div
                key="helper"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
              >
                <form
                  onSubmit={handleSubmitHelper(onHelperSubmit)}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      icon={User}
                      label="Full Name"
                      register={registerHelper("fullName")}
                      placeholder="Jane Doe"
                      error={errorsHelper.fullName?.message as string}
                      delay={0.1}
                    />
                    <FormField
                      icon={Phone}
                      label="Phone"
                      register={registerHelper("phone")}
                      placeholder="+1..."
                      error={errorsHelper.phone?.message as string}
                      delay={0.15}
                    />
                  </div>
                  <FormField
                    icon={Mail}
                    label="Email Address"
                    register={registerHelper("email")}
                    placeholder="helper@work.com"
                    error={errorsHelper.email?.message as string}
                    delay={0.2}
                  />
                  <FormField
                    icon={CreditCard}
                    label="CNIC Number"
                    register={registerHelper("cnic")}
                    placeholder="35202-0000000-0"
                    error={errorsHelper.cnic?.message as string}
                    delay={0.25}
                  />
                  <ServiceTypeField
                    register={registerHelper("serviceType")}
                    error={errorsHelper.serviceType?.message as string}
                    delay={0.3}
                  />
                  <PasswordField
                    register={registerHelper("password")}
                    error={errorsHelper.password?.message as string}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    delay={0.35}
                  />

                  <SubmitButton
                    isLoading={isLoading}
                    text="Apply as Helper"
                    delay={0.4}
                  />
                </form>
                <CTA delay={0.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Side - Premium Brand */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 z-10"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/login-sidebar.png"
            alt="Background"
            fill
            className="object-cover opacity-25 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/95 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 text-right"
        >
          <div className="flex items-center gap-3 mb-8 justify-end">
            <span className="font-manrope font-bold text-3xl tracking-tighter">
              Road<span className="text-brand-red">Helper</span>
            </span>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-14 h-14 relative bg-white rounded-2xl overflow-hidden shadow-2xl shadow-brand-red/30 p-2"
            >
              <Image
                src="/assets/images/logo.png"
                alt="Road Helper Logo"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-7xl font-bold leading-tight mb-6"
          >
            Join the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-red via-orange-500 to-yellow-500">
              Future
            </span>
            <br /> of Rescue.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-300 text-xl max-w-md ml-auto leading-relaxed"
          >
            Earn on your own terms or get assistance in minutes. Building the
            most reliable network on the road.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10 flex gap-4 justify-end"
        >
          {[
            { icon: Shield, label: "Verified", value: "100%" },
            { icon: Zap, label: "Fast", value: "2 min" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-dark px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-xl cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon
                  className="text-brand-red group-hover:animate-bounce"
                  size={24}
                />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Reusable Components
const FormField = ({
  icon: Icon,
  label,
  register,
  placeholder,
  error,
  delay,
}: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="space-y-2"
  >
    <Label className="uppercase text-xs font-bold text-gray-400 tracking-wider flex items-center gap-2">
      <Icon size={14} className="text-brand-red" />
      {label}
    </Label>
    <motion.div whileFocus={{ scale: 1.01 }} className="relative group">
      <Icon className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-brand-red transition-colors z-10" />
      <Input
        {...register}
        className="pl-12 h-14 bg-white/5 backdrop-blur-xl border-white/10 text-white focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red rounded-xl transition-all hover:bg-white/10 hover:border-brand-red/50"
        placeholder={placeholder}
      />
      <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-red/20 to-transparent opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity pointer-events-none" />
    </motion.div>
    {error && (
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs flex items-center gap-1"
      >
        ⚠️ {error}
      </motion.span>
    )}
  </motion.div>
);

const PasswordField = ({
  register,
  error,
  showPassword,
  setShowPassword,
  delay,
}: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="space-y-2"
  >
    <Label className="uppercase text-xs font-bold text-gray-400 tracking-wider flex items-center gap-2">
      <Lock size={14} className="text-brand-red" />
      Password
    </Label>
    <motion.div whileFocus={{ scale: 1.01 }} className="relative group">
      <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-500 group-focus-within:text-brand-red transition-colors z-10" />
      <Input
        {...register}
        type={showPassword ? "text" : "password"}
        className="pl-12 pr-12 h-14 bg-white/5 backdrop-blur-xl border-white/10 text-white focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red rounded-xl transition-all hover:bg-white/10 hover:border-brand-red/50"
        placeholder="••••••••"
      />
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-4 text-gray-500 hover:text-brand-red transition-colors z-10"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </motion.button>
      <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-red/20 to-transparent opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity pointer-events-none" />
    </motion.div>
    {error && (
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs flex items-center gap-1"
      >
        ⚠️ {error}
      </motion.span>
    )}
  </motion.div>
);

const ServiceTypeField = ({ register, error, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="space-y-2"
  >
    <Label className="uppercase text-xs font-bold text-gray-400 tracking-wider flex items-center gap-2">
      <Briefcase size={14} className="text-brand-red" />
      Service Type
    </Label>
    <motion.div whileFocus={{ scale: 1.01 }} className="relative group">
      <Briefcase className="absolute left-4 top-4 h-5 w-5 text-gray-500 group-focus-within:text-brand-red transition-colors z-10 pointer-events-none" />
      <select
        {...register}
        className="w-full pl-12 h-14 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white focus:ring-2 focus:ring-brand-red focus:border-brand-red appearance-none transition-all hover:bg-white/10 hover:border-brand-red/50 cursor-pointer"
      >
        <option value="" className="bg-brand-black">
          Select Service...
        </option>
        <option value="mechanic" className="bg-brand-black">
          🔧 Mobile Mechanic
        </option>
        <option value="tow" className="bg-brand-black">
          🚗 Towing Truck
        </option>
        <option value="fuel" className="bg-brand-black">
          ⛽ Fuel Delivery
        </option>
        <option value="medical" className="bg-brand-black">
          🚑 Medical Assistance
        </option>
      </select>
      <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-red/20 to-transparent opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity pointer-events-none" />
    </motion.div>
    {error && (
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs flex items-center gap-1"
      >
        ⚠️ {error}
      </motion.span>
    )}
  </motion.div>
);

const SubmitButton = ({ isLoading, text, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full h-16 text-lg font-bold bg-gradient-to-r from-brand-red via-brand-dark-red to-brand-red bg-size-200 hover:shadow-2xl hover:shadow-brand-red/50 transition-all duration-500 rounded-xl group relative overflow-hidden"
      style={{ backgroundSize: "200% 100%" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ["-200%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Creating...
          </>
        ) : (
          <>
            {text}
            <ArrowLeft
              className="rotate-180 group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </>
        )}
      </span>
    </Button>
  </motion.div>
);

const CTA = ({ delay }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className="mt-6 space-y-4"
  >
    <p className="text-gray-500 text-sm text-center">
      Already have an account?{" "}
      <Link
        href="/login"
        className="text-white font-bold hover:text-brand-red transition-colors relative group cursor-pointer"
      >
        Log in
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-300"></span>
      </Link>
    </p>

    {/* Admin Link */}
    <div className="text-center pt-4 border-t border-white/10">
      <Link
        href="/admin/login"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brand-red transition-all group cursor-pointer px-4 py-2 rounded-xl hover:bg-white/5"
      >
        <Shield size={16} className="group-hover:animate-pulse" />
        <span>Are you an Admin?</span>
        <ArrowLeft
          className="rotate-180 group-hover:translate-x-1 transition-transform"
          size={14}
        />
      </Link>
    </div>
  </motion.div>
);

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-brand-black text-white">
          <Loader2 className="animate-spin" size={48} />
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}
