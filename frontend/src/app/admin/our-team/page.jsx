"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Search, Filter, RotateCcw, UserCheck, UserMinus } from "lucide-react";
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

    // Fetch Data
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

    // Handle Filtering Logic
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

    // Delete Logic
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

    const stats = {
        total: team.length,
        active: team.filter(m => m.isActive).length,
        inactive: team.filter(m => !m.isActive).length
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-10 font-sans">
            <DeleteModal
                isOpen={deleteModal.isOpen}
                title={deleteModal.name}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={confirmDelete}
            />

            <div className="max-w-7xl mx-auto space-y-10">
                {/* ── TOP HEADER ── */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 text-yellow-500 mb-2">
                            <Users size={18} />
                            <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Personnel Management</span>
                        </div>
                        <h3 className="text-4xl font-bold tracking-tight">Our <span className="text-yellow-500 italic">Team</span></h3>
                    </div>

                    <button
                        onClick={() => router.push("/admin/our-team/create")}
                        className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-yellow-500/10 active:scale-95"
                    >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                        Onboard Member
                    </button>
                </header>



                {/* ── SEARCH & FILTERS ── */}
                <section className="bg-white/2 border border-white/5 rounded-3xl flex flex-col lg:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or designation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/3 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm outline-none focus:border-yellow-500/50 transition-all placeholder:text-white/10"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-48">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full bg-white/3 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm outline-none cursor-pointer appearance-none hover:bg-white/5"
                            >
                                <option value="all" className="bg-[#050505]">All Status</option>
                                <option value="active" className="bg-[#050505]">Active Only</option>
                                <option value="inactive" className="bg-[#050505]">Inactive Only</option>
                            </select>
                        </div>

                        <button
                            onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}
                            className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-white/40 hover:text-white hover:bg-white/10 transition-all"
                            title="Reset Filters"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </section>

                {/* ── TABLE AREA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden"
                >
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <div className="w-8 h-8 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" />
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Accessing Encrypted Data</span>
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
                        <div className="py-20 text-center">
                            <Users size={40} className="mx-auto text-white/5 mb-4" />
                            <p className="text-white/20 text-sm italic">No matching personnel found in database.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}