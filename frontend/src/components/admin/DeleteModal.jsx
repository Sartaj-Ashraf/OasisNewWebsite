// components/admin/shared/DeleteModal.jsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export const DeleteModal = ({ isOpen, onClose, onConfirm, title = "Delete Member" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden border border-red-900  rounded-2xl shadow-2xl shadow-red-900/10"
          >
            {/* Header Glow */}

            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 text-gray-500 hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5">
                <h5 className=" font-family-bebas tracking-wider text-white uppercase">
                  Confirm <span className="text-red-500">Deletion</span>
                </h5>
                <span className="mt-2 text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to remove <span className="text-gray-200 font-bold">{title}</span>? 
                  This action is permanent and cannot be undone.
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 p-2 rounded-lg border border-gray-800 text-gray-400 text-xs  hover:bg-gray-900 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs   shadow-lg shadow-red-600/20 transition-all"
                >
                  Delete Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};