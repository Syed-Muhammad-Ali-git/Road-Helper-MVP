"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconActivity,
  IconChartBar,
  IconMapPin,
  IconShieldCheck,
} from "@tabler/icons-react";

import { useLanguage } from "@/app/context/LanguageContext";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function IntroOverlay() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { dict, isRTL } = useLanguage();

  const stats = useMemo(
    () => [
      {
        icon: IconMapPin,
        label: dict.common.live_tracking,
        value: dict.common.real_time,
      },
      {
        icon: IconShieldCheck,
        label: dict.common.verified_helpers,
        value: dict.common.trusted,
      },
      {
        icon: IconActivity,
        label: dict.common.fast_dispatch,
        value: dict.common.fast_value,
      },
      {
        icon: IconChartBar,
        label: dict.common.uptime,
        value: dict.common.uptime_value,
      },
    ],
    [dict],
  );

  useEffect(() => {
    // Show on every refresh as per requirement
    const start = Date.now();
    const duration = 5000;
    const t = setInterval(() => {
      const raw = ((Date.now() - start) / duration) * 100;
      const p = clamp(Math.round(raw), 0, 100);
      setProgress(p);
      setVisible(true);
      if (p >= 100) {
        clearInterval(t);
        setTimeout(() => setVisible(false), 250);
      }
    }, 25);

    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center px-6"
        >
          <motion.div
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className={`w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[36px] p-8 md:p-10 relative overflow-hidden ${isRTL ? "text-right" : "text-left"}`}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r from-brand-yellow/10 via-white/5 to-transparent`}
              animate={{ x: isRTL ? ["60%", "-60%"] : ["-60%", "60%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <div className="text-gray-400 text-xs font-black uppercase tracking-[0.3em]">
                {dict.common.road_helper_systems}
              </div>
              <div className="font-manrope font-black text-3xl md:text-4xl mt-2">
                {dict.common.initializing}{" "}
                <span className="text-brand-yellow">
                  {dict.common.live_rescue}
                </span>
              </div>
              <div className="text-gray-400 mt-3">
                {dict.common.preparing_dispatch}
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <s.icon size={18} className="text-brand-yellow" />
                    <div className="text-white font-black mt-2">{s.value}</div>
                    <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-yellow to-brand-gold rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-xs font-black text-gray-500">
                  <span>{dict.common.boot_sequence}</span>
                  <span>{progress}%</span>
                </div>

                <button
                  className="mt-5 w-full md:w-auto px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-black cursor-pointer"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  {dict.common.skip_intro}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
