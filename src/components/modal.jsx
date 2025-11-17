import { AnimatePresence, motion } from "motion/react";
import React from "react";

export default function Modal({ children }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-6/12 lg:w-4/12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}