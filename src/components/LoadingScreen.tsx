"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[999] bg-[#030712] flex flex-col items-center justify-center"
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg" />

          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-2xl"
                style={{ boxShadow: "0 0 60px rgba(255,255,255,0.25)" }}>
                <span className="text-3xl font-black text-black tracking-tight leading-none">AI</span>
              </div>
              {/* Orbit rings */}
              {[1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 rounded-full border border-cyan-500/20"
                  style={{ margin: `-${ring * 12}px` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3 + ring, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-black text-white mb-1">
                AI<span className="text-cyan-400">AI</span>AI
              </div>
              <div className="text-slate-400 text-sm">טוען פתרונות AI...</div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-64"
            >
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: "linear-gradient(90deg, #00f5ff, #bf00ff)",
                    transition: "width 0.2s ease",
                  }}
                />
              </div>
              <div className="text-center mt-2 text-xs text-slate-600">{Math.min(Math.round(progress), 100)}%</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
