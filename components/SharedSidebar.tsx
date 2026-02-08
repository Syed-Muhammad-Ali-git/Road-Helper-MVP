"use client";

import React, { memo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, LogOut, LucideIcon } from "lucide-react";
import Image from "next/image";

interface MenuItem {
  text: string;
  icon: LucideIcon;
  path: string;
}

interface SharedSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuItems: MenuItem[];
  logoSrc: string | any;
  title: string;
}

const sidebarVariants: Variants = {
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const SharedSidebarComponent = ({
  open,
  setOpen,
  menuItems,
  logoSrc,
  title,
}: SharedSidebarProps) => {
  const pathname = usePathname();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-full w-[280px] bg-brand-black border-r border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 bg-white rounded-lg p-1">
                  <Image
                    src={typeof logoSrc === "string" ? logoSrc : logoSrc.src}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h1 className="font-manrope font-bold text-xl text-white tracking-tight">
                  {title}
                </h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleClose}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                      isActive
                        ? "bg-brand-red text-white shadow-lg shadow-brand-red/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <item.icon
                      size={22}
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white",
                      )}
                    />
                    <span className="font-medium text-sm md:text-base z-10 relative">
                      {item.text}
                    </span>

                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-400 hover:text-red-500 hover:bg-red-500/10 gap-3 px-4 h-12"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(SharedSidebarComponent);
