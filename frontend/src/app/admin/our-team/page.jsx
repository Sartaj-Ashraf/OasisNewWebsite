"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, Search, Filter, RotateCcw } from "lucide-react";
import { TeamTable } from "@/components/admin/Team-members/Team-table.jsx";
import { getTeamMembers, deleteTeamMember } from "@/services/team.service";
import { toast } from "sonner";
import { DeleteModal } from "@/components/admin/DeleteModal";
import { useRouter } from "next/navigation";

export default function TeamPage() {
    const router = useRouter();
    const [team, setTeam] = useState([]);
    const [filteredTeam, setFilteredTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        id: null,
        name: "",
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getTeamMembers();
            const members = res.data.data;
            setTeam(members);
            setFilteredTeam(members);
        } catch {
            toast.error("Protocol Error: Failed to load team");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let result = team;

        if (searchQuery) {
            result = result.filter((m) =>
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.designation.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            const isActive = statusFilter === "active";
            result = result.filter((m) => m.isActive === isActive);
        }

        setFilteredTeam(result);
    }, [searchQuery, statusFilter, team]);

    const openDeleteModal = (item) => {
        setDeleteModal({ isOpen: true, id: item._id, name: item.name });
    };

    const confirmDelete = async () => {
        try {
            await deleteTeamMember(deleteModal.id);
            toast.success("Identity Removed from Database");
            setDeleteModal({ isOpen: false, id: null, name: "" });
            fetchData();
        } catch {
            toast.error("Operation Failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-6 lg:p-10 font-sans">
            <DeleteModal
                isOpen={deleteModal.isOpen}
                title={deleteModal.name}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={confirmDelete}
            />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* ── TOP HEADER ── */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 text-amber-600 mb-2">
                            <Users size={18} />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Personnel Management</span>
                        </div>
                        <h3 className="text-4xl font-bold tracking-tight text-slate-800">
                            Our <span className="text-amber-500 italic">Team</span>
                        </h3>
                    </div>

                    <button
                        onClick={() => router.push("/admin/our-team/create")}
                        className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
                    >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                        Onboard Member
                    </button>
                </header>

                {/* ── SEARCH & FILTERS ── */}
                <section className="flex flex-col lg:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or designation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400 shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-48">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-8 text-sm outline-none cursor-pointer appearance-none hover:border-slate-300 transition-all shadow-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active Only</option>
                                <option value="inactive">Inactive Only</option>
                            </select>
                        </div>

                        <button
                            onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}
                            className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all shadow-sm"
                            title="Reset Filters"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </section>

                {/* ── TABLE AREA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                >
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <div className="w-8 h-8 border-3 border-slate-100 border-t-amber-500 rounded-full animate-spin" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Fetching Records</span>
                        </div>
                    ) : (
                        <TeamTable
                            data={filteredTeam}
                            onDelete={(id) => {
                                const item = team.find((m) => m._id === id);
                                if (item) openDeleteModal(item);
                            }}
                            onEdit={(item) => {
                                router.push(`/admin/our-team/edit/${item._id}`);
                            }}
                        />
                    )}

                    {!loading && filteredTeam.length === 0 && (
                        <div className="py-24 text-center">
                            <Users size={40} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-400 text-sm italic">No matching personnel found.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}