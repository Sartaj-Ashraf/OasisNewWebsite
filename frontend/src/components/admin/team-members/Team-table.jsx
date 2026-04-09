"use client";

import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, MoreVertical, User, Briefcase, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getInitials = (name = "") =>
  name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

const AvatarCell = ({ src, name }) => (
  // Changed border to slate-200 and bg to slate-50
  <div className="h-9 w-9 rounded-xl border border-slate-200 p-0.5 flex-shrink-0 bg-slate-50 overflow-hidden shadow-sm">
    {src ? (
      <img src={src} alt={name} className="h-full w-full rounded-[10px] object-cover" />
    ) : (
      // Amber tones adjusted for light mode legibility
      <div className="h-full w-full flex items-center justify-center text-amber-700 font-bold text-xs uppercase bg-amber-100">
        {getInitials(name)}
      </div>
    )}
  </div>
);

const StatusPill = ({ isActive }) => (
  // Swapped to soft emerald and slate palettes
  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${isActive
    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
    : "bg-slate-50 text-slate-400 border-slate-200"
    }`}>
    <span className={`w-1 h-1 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-300"
      }`} />
    {isActive ? "Active" : "Inactive"}
  </div>
);

const ActionMenu = ({ item, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex justify-end" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        // Hover and text colors updated for light background
        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
      >
        <MoreVertical size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            // Swapped to white background with slate border
            className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5 overflow-hidden"
          >
            <button
              onClick={() => { onEdit(item); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Pencil size={14} className="text-blue-500" /> Edit Member
            </button>
            <div className="h-px bg-slate-100 mx-2 my-1" />
            <button
              onClick={() => { onDelete(item._id); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} /> Remove Personnel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TeamTable = ({ data = [], onDelete, onEdit }) => {
  return (
    // Main container now bg-white with slate-200 border
    <div className="w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            {/* Header background adjusted to very light slate */}
            <tr className="bg-slate-50/50">
              <th className="p-4 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <div className="flex items-center gap-2"><User size={12} /> Member</div>
              </th>
              <th className="hidden md:table-cell p-4 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <div className="flex items-center gap-2"><Briefcase size={12} /> Role</div>
              </th>
              <th className="hidden sm:table-cell p-4 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <div className="flex items-center gap-2"><Hash size={12} /> Priority</div>
              </th>
              <th className="p-4 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">
                Status
              </th>
              <th className="p-4 border-b border-slate-100 text-right text-slate-300">
                <MoreVertical size={14} className="ml-auto" />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {
              data.map((item) => (
                // Hover effect changed to light slate
                <tr key={item._id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <AvatarCell src={item.profileImage?.url} name={item.name} />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 tracking-tight">{item.name}</span>
                        <span className="md:hidden text-[10px] text-slate-500 uppercase tracking-wider">{item.designation}</span>
                      </div>
                    </div>
                  </td>

                  <td className="hidden md:table-cell p-4">
                    <span className="text-[13px] text-slate-600">{item.designation}</span>
                  </td>

                  <td className="hidden sm:table-cell p-4">
                    <span className="font-mono text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                      #{String(item.order).padStart(2, "0")}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <StatusPill isActive={item.isActive} />
                  </td>

                  <td className="p-4">
                    <ActionMenu item={item} onEdit={onEdit} onDelete={onDelete} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};