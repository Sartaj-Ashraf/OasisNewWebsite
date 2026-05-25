"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Database } from "lucide-react";
import ClientForm from "@/components/admin/clients/client-form";
import { createClientService } from "@/services/clients.service";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function CreateClientPage() {
  const router = useRouter();

  const handleCreate = async (formData) => {
    try {
      await createClientService(formData);
      router.push("/admin/clients");
      toast.success("Client created successfully");
    } catch (error) {
  console.log(error);

  toast.error(
    error?.response?.data?.message ||
    "Something went wrong"
  );

    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 lg:p-10 font-sans relative overflow-hidden">
      
      {/* Soft Light Amber Background Flare Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[5%] w-[45%] h-[40%] bg-amber-500/ blur-[130px]" />
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
                <Database size={18} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Directory Administration</span>
              </div>
              <h3 className="text-4xl! font-bold tracking-tight text-slate-800">
                Register New <span className="text-amber-500 italic">Client</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Client Form Component Area */}
        <ClientForm
          onSubmit={handleCreate}
          buttonText="Register Client Identity"
        />
        
      </motion.div>
    </div>
  );
}