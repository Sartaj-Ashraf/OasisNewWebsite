"use client";

import { useEffect, useState } from "react";
import { deleteProject, fetchAllProjects } from "@/services/Projects.service";
import { toast } from "sonner"
import StatsBar from "@/components/admin/projects/StatsBar.jsx";
import FilterBar from "@/components/admin/projects/FilterBar.jsx";
import ProjectCard from "@/components/admin/projects/Projectcard.jsx";
import ProjectModal from "@/components/admin/projects/Projectmodal.jsx";
import ConfirmModal from "@/components/admin/projects/Confirmmodal.jsx";
import ProjectSkeleton from "@/components/admin/projects/Projectskeleton.jsx";
import EmptyState from "@/components/admin/projects/Emptystate.jsx";

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterActive, setFilterActive] = useState("all");
    const [modal, setModal] = useState(null); // { mode: "create"|"edit", project? }
    const [deleteTarget, setDeleteTarget] = useState(null);

    /* ── Data ── */
    const load = async () => {
        setLoading(true);
        try {
            const res = await fetchAllProjects();
            setProjects(res.data.data || []);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async () => {
        try {
            await deleteProject(deleteTarget._id);
            setDeleteTarget(null);
            toast.success("Project deleted successfully");
            load();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleSaved = () => {
        const msg =
            modal.mode === "edit"
                ? "Project updated successfully"
                : "Project created successfully";
        setModal(null);
        toast.success(msg);
        load();
    };

    /* ── Derived state ── */
    const filtered = projects.filter((p) => {
        const matchesSearch =
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filterActive === "all" ? true :
                filterActive === "active" ? p.isActive :
                    !p.isActive;

        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: projects.length,
        active: projects.filter((p) => p.isActive).length,
        inactive: projects.filter((p) => !p.isActive).length,
    };

    /* ── Render ── */
    return (
<div className="min-h-screen bg-white text-gray-900">
    {/* Background orbs */}
    <div className="fixed inset-0 pointer-events-none">
        {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" /> */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl" />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-10">
            <div>
                <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/40 animate-pulse" />
                    <span className="text-xs! font-medium text-amber-600 tracking-wider uppercase">
                        Admin Panel
                    </span>
                </div>

                <h1 className="text-3xl! font-bold text-gray-900 tracking-tight">
                    Projects
                </h1>

                <p className="text-gray-600 text-sm! mt-1">
                    Manage and organize your portfolio projects
                </p>
            </div>

            <button
                onClick={() => setModal({ mode: "create" })}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/20"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                New Project
            </button>
        </div>

        <StatsBar {...stats} />

        <FilterBar
            search={search}
                    onSearch={setSearch}
                    activeFilter={filterActive}
                    onFilter={setFilterActive}
                />

                {/* Project Grid */}
                {loading ? (
                    <ProjectSkeleton count={6} />
                ) : filtered.length === 0 ? (
                    <EmptyState
                        search={search}
                        onCreate={() => setModal({ mode: "create" })}
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                onEdit={(p) => setModal({ mode: "edit", project: p })}
                                onDelete={setDeleteTarget}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {modal && (
                <ProjectModal
                    mode={modal.mode}
                    project={modal.project}
                    onClose={() => setModal(null)}
                    onSaved={handleSaved}
                />
            )}

            {deleteTarget && (
                <ConfirmModal
                    project={deleteTarget}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}

            {/* Toast */}
         
            <style jsx global>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
        </div>
    );
}