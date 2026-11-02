"use client";
import { AdminSidebar } from '@/components/admin/Admin-sidebar';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuth } from "@/services/auth.service";

function SessionLoader() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-accent font-sans">
            <div className="flex flex-col items-center gap-5 bg-white border border-border-custom rounded-2xl shadow-sm px-12 py-10 w-full max-w-xs mx-4">
                <div className="w-11 h-11 rounded-full border-4 border-accent-dark border-t-primary animate-spin" />
                <div className="text-center">
                    <p className="text-base font-semibold text-secondary-dark">Verifying session</p>
                    <p className="mt-1 text-sm text-text-secondary">Just a moment…</p>
                </div>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        isAuth()
            .then(({ user }) => {
                // the backend has 3 roles; only admin/manager may enter this area
                if (!["admin", "manager"].includes(user?.role)) throw new Error("forbidden");
                if (!cancelled) setLoading(false);
            })
            .catch(() => {
                if (!cancelled) router.replace("/login");
            });
        return () => { cancelled = true; };
    }, [router]);

    if (loading) return <SessionLoader />;

    return (
        <div className="flex h-screen overflow-hidden bg-accent">
            <div className="h-full">
                <AdminSidebar />
            </div>

            {/* Main content (scrollable only here) */}
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
