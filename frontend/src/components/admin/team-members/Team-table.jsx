"use client";

import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, MoreVertical, User, Briefcase, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getInitials = (name = "") =>
  name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

const AvatarCell = ({ src, name }) => (
  <div className="h-9 w-9 rounded-xl border border-white/10 p-0.5 flex-shrink-0 bg-white/5 overflow-hidden">
    {src ? (
      <img src={src} alt={name} className="h-full w-full rounded-[10px] object-cover" />
    ) : (
      <div className="h-full w-full flex items-center justify-center text-[#a89060] font-bold text-xs uppercase bg-[#1a1814]">
        {getInitials(name)}
      </div>
    )}
  </div>
);

const StatusPill = ({ isActive }) => (
  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${isActive ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-white/5 text-white/20 border-white/10"
    }`}>
    <span className={`w-1 h-1 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-white/20"}`} />
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
        className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
      >
        <MoreVertical size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-36 bg-[#121212] border border-white/10 rounded-xl shadow-2xl z-50 py-1 overflow-hidden backdrop-blur-xl"
          >
            <button
              onClick={() => { onEdit(item); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Pencil size={14} className="text-blue-400" /> Edit Profile
            </button>
            <div className="h-px bg-white/5 mx-2 my-1" />
            <button
              onClick={() => { onDelete(item._id); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={14} /> Terminate Member
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TeamTable = ({ data = [], onDelete, onEdit }) => {
  return (
    <div className="w-full bg-[#080808] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-white/2">
              <th className="p-4 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                <div className="flex items-center gap-2"><User size={12} /> Member</div>
              </th>
              <th className="hidden md:table-cell p-4 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                <div className="flex items-center gap-2"><Briefcase size={12} /> Role</div>
              </th>
              <th className="hidden sm:table-cell p-4 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                <div className="flex items-center gap-2"><Hash size={12} /> Priority</div>
              </th>
              <th className="p-4 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-center">
                Status
              </th>
              <th className="p-4 border-b border-white/5 text-right text-white/30">
                <MoreVertical size={14} className="ml-auto" />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/2">
            {!data.length ? (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center opacity-20">
                    <User size={40} className="mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">Database Empty</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id} className="group hover:bg-white/[0.01] transition-all">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <AvatarCell src={item.profileImage?.url} name={item.name} />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white tracking-tight">{item.name}</span>
                        <span className="md:hidden text-[10px] text-white/30 uppercase tracking-wider">{item.designation}</span>
                      </div>
                    </div>
                  </td>

                  <td className="hidden md:table-cell p-4">
                    <span className="text-[13px] text-white/50">{item.designation}</span>
                  </td>

                  <td className="hidden sm:table-cell p-4">
                    <span className="font-mono text-[11px] text-primary/40 bg-white/5 px-2 py-0.5 rounded">
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
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};