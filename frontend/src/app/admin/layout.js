"use client";
import { AdminSidebar } from '@/components/admin/Admin-sidebar';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuth } from "@/services/auth.service";
import { motion } from "framer-motion";
export default function AdminLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await isAuth();
                setLoading(false);
            } catch (error) {
                router.push("/login");
            }
        };
        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="relative flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-slate-500 text-sm font-medium tracking-wide animate-pulse">
                    Verifying Session...
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-950">
            <div className="h-full">
                <AdminSidebar />
            </div>

            {/* Main Content (scrollable only here) */}
            <main className="flex-1 h-full overflow-y-auto p-6">
                {children}
            </main>

        </div>
    );
}