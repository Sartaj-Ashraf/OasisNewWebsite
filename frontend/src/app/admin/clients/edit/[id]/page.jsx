"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Database, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import ClientForm from "@/components/admin/clients/client-form";
import {
  getClientByIdService,
  updateClientService,
} from "@/services/clients.service";

export default function EditClientPage() {
  const { id } = useParams();
  const router = useRouter();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    try {
      const res = await getClientByIdService(id);
      setClient(res.data);
      toast.success("Client records fetched successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong"  );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateClientService(id, formData);
      router.push("/admin/clients");
      toast.success("Client records updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Operation Failed: Could not write changes");
    }
  };

  // Modernized Loading State Indicator
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 font-sans">
        <div className="w-8 h-8 border-3 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Synchronizing Node Data</span>
      </div>
    );
  }

  // Modernized Error State Empty Container
  if (!client) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 font-sans p-6">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 border border-red-100 shadow-xs mb-2">
          <Database size={20} />
        </div>
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Record Unresolved</h4>
        <p className="text-xs text-slate-400 italic max-w-xs text-center">The specific client identity node was not located inside this system catalog framework.</p>
        <button
          onClick={() => router.push("/admin/clients")}
          className="mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-xs"
        >
          <ArrowLeft size={12} /> Return To Directory
        </button>
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
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto relative z-10 space-y-8"
      >
        {/* Navigation Action & Header */}
        <div className="space-y-4">
          <button
            onClick={() => router.push("/admin/clients")}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Directory
          </button>

          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 text-amber-600 mb-2">
                <Settings2 size={18} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Parameters Modification</span>
              </div>
              <h3 className="text-4xl font-bold tracking-tight text-slate-800">
                Edit Client <span className="text-amber-500 italic">Parameters</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Client Form Component Area */}
        <ClientForm
          initialData={client}
          isEdit={true}
          onSubmit={handleUpdate}
          buttonText="Commit Parameter Changes"
        />
        
      </motion.div>
    </div>
  );
}