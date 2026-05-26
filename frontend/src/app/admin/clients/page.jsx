"use client";

import React, { useEffect, useState, useMemo, startTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Plus, Trash2, Edit3, Globe, EyeOff, ShieldCheck, Database, SlidersHorizontal, RotateCcw } from "lucide-react";
import { getClientsService, deleteClientService } from "@/services/clients.service";
import { toast } from "sonner";
import Image from "next/image";


export default function ClientsPage() {
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let isMounted = true;
    
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await getClientsService();
        const data = res?.data || [];
        if (isMounted) {
          setClients(data);
        }
      } catch (error) {
        console.error("Error fetching clients matrix:", error);
        toast.error("Protocol Error: Failed to load clients registry");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchClients();
    return () => { isMounted = false; };
  }, []);

  // Performance Fix: Compute filtered results on the fly instead of chaining states in useEffect
  const filteredClients = useMemo(() => {
    let data = [...clients];

    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter((client) => client.name?.toLowerCase().includes(query));
    }

    if (statusFilter === "active") {
      data = data.filter((client) => client.isActive);
    } else if (statusFilter === "inactive") {
      data = data.filter((client) => !client.isActive);
    }

    return data.sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [search, statusFilter, clients]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Purge this client relationship from the registry?");
    if (!confirmDelete) return;

    try {
      await deleteClientService(id);
      setClients((prev) => prev.filter((item) => item._id !== id));
      toast.success("Client metadata purged successfully");
    } catch (error) {
      console.error("Delete operation failure:", error);
      toast.error("Operation Failed: Master registry write protected");
    }
  };

  const handleReset = () => {
    startTransition(() => {
      setSearch("");
      setStatusFilter("all");
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-zinc-500 font-mono text-xs gap-3">
        <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <span>FETCHING BRAND CLIENT REGISTRY...</span>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-slate-50 text-slate-900 p-6 lg:p-10 font-sans relative overflow-hidden">
      
      {/* Soft Light Amber Background Flare Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[5%] w-[45%] h-[40%] bg-amber-500/5 rounded-full blur-[130px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto relative z-10 space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-amber-600 mb-2">
              <Database size={18} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Personnel Management</span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-slate-800">
              Brand <span className="text-amber-500 italic">Clients</span>
            </h3>
          </div>

          <button
            onClick={() => router.push("/admin/clients/create")}
            className="group flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform" />
            Register Client
          </button>
        </div>

        {/* Search & Filter Controls Box */}
        <section className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Query brand directory records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400 shadow-sm text-slate-800"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-56">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-8 text-sm outline-none cursor-pointer appearance-none hover:border-slate-300 transition-all shadow-sm text-slate-800"
              >
                <option className="text-xs" value="all">All Registered Nodes</option>
                <option className="text-xs" value="active">Active Records Only</option>
                <option className="text-xs" value="inactive">Inactive Records Only</option>
              </select>
            </div>

            <button
              onClick={handleReset}
              className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all shadow-sm shrink-0"
              title="Reset Filtering Configurations"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </section>

        {/* Light Premium Interactive Borderless Table Grid */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                <tr>
                  <th className="p-4 w-16">Visual</th>
                  <th className="p-4">Brand Identifier</th>
                  <th className="p-4">Website Link</th>
                  <th className="p-4">Sorting Index</th>
                  <th className="p-4">Network Status</th>
                  <th className="p-4 text-right pr-6 w-28">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <tr key={client._id} className="hover:bg-slate-50/80 transition-colors group">
                      
                      {/* Image Thumbnail Cell */}
                      <td className="p-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-xs">
                          {client.coverImage?.url ? (
                            <Image
                              src={client.coverImage.url}
                              alt={client.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold tracking-wider text-slate-400">
                              NULL
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Client Name Identity */}
                      <td className="p-4 font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                        {client.name}
                      </td>

                      {/* Website External Destination Link */}
                      <td className="p-4">
                        {client.website ? (
                          <a
                            href={client.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors underline decoration-dotted underline-offset-4"
                          >
                            <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                            <span>VISIT PORTAL</span>
                          </a>
                        ) : (
                          <span className="text-slate-300 text-xs">--</span>
                        )}
                      </td>

                      {/* Display Layout Ordering Priority Weight */}
                      <td className="p-4 text-xs font-medium text-slate-400">
                        {String(client.order ?? 0).padStart(2, "0")}
                      </td>

                      {/* Network Status Badge */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                            client.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          {client.isActive ? (
                            <>
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-slate-400" />
                              <span>Inactive</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Action Mutation Buttons */}
                      <td className="p-4 text-right pr-6">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/admin/clients/edit/${client._id}`)}
                            className="px-2.5 py-1.5 text-xs font-bold bg-amber-500 border border-amber-500 text-white rounded-lg cursor-pointer hover:bg-amber-600 transition-all"
                            title="Modify Node Parameters"
                          >
                           Edit
                          </button>
                        
                          <button
                            onClick={() => handleDelete(client._id)}
                            className="px-2.5 py-1.5 text-xs font-bold bg-red-500 border border-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition-all"
                            title="Purge Node Record"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center p-24 text-sm italic text-slate-400">
                      No matching accounts cataloged inside frame window.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
  