"use client";

import { useEffect, useMemo, useState } from "react";

import CareerForm from "@/components/admin/careers/Careerform";
import CareersTable from "@/components/admin/careers/Careerstable";
import ViewCareerContent from "@/components/admin/careers/Viewcareer";
import { Modal } from "@/components/admin/careers/ui";
import { StatsGrid, FiltersBar } from "@/components/admin/careers/Statsandfilters";
import {toast} from "sonner";
import {
  getAllCareersAdmin,
  createCareerAdmin,
  updateCareerAdmin,
  deleteCareerAdmin,
  toggleCareerStatusAdmin,
} from "@/services/careers.service";
const LIMIT = 10;



/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function CareersAdminPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [page, setPage] = useState(1);

    const [searchInput, setSearchInput] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [jobTypeFilter, setJobTypeFilter] = useState("all");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const [selectedJob, setSelectedJob] = useState(null);

    /* ───────────────────────────────────── */
    /* FETCH */
    /* ───────────────────────────────────── */
    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await getAllCareersAdmin();
            console.log(res);
            setJobs(res.data.data|| []);
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    /* ───────────────────────────────────── */
    /* FILTERING */
    /* ───────────────────────────────────── */
    const filteredJobs = useMemo(() => {
        let arr = [...jobs];

        if (searchInput.trim()) {
            const q = searchInput.toLowerCase();

            arr = arr.filter((job) => {
                return [
                    job.JobTitle,
                    job.Location,
                    job.Qualification,
                    job.jobDescription,
                    job.JobType,
                ]
                    .filter(Boolean)
                    .some((v) => v.toLowerCase().includes(q));
            });
        }

        if (statusFilter !== "all") {
            arr = arr.filter(
                (job) => String(job.isActive) === statusFilter
            );
        }

        if (jobTypeFilter !== "all") {
            arr = arr.filter((job) => job.JobType === jobTypeFilter);
        }

        arr.sort((a, b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];

            if (sortBy === "createdAt") {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }

            if (typeof valA === "string") {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }

            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return arr;
    }, [
        jobs,
        searchInput,
        statusFilter,
        jobTypeFilter,
        sortBy,
        sortOrder,
    ]);

    /* ───────────────────────────────────── */
    /* PAGINATION */
    /* ───────────────────────────────────── */
    const totalPages = Math.ceil(filteredJobs.length / LIMIT);

    const paginatedJobs = useMemo(() => {
        const start = (page - 1) * LIMIT;
        return filteredJobs.slice(start, start + LIMIT);
    }, [filteredJobs, page]);

    useEffect(() => {
        setPage(1);
    }, [searchInput, statusFilter, jobTypeFilter]);

    /* ───────────────────────────────────── */
    /* STATS */
    /* ───────────────────────────────────── */
    const stats = useMemo(() => {
        const activeJobs = jobs.filter((j) => j.isActive).length;
        const inactiveJobs = jobs.length - activeJobs;

        const totalVacancies = jobs.reduce(
            (sum, j) => sum + (Number(j.TotalVacancies) || 0),
            0
        );

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentJobs = jobs.filter(
            (j) => new Date(j.createdAt) >= thirtyDaysAgo
        ).length;

        const jobsByType = [...new Set(jobs.map((j) => j.JobType))];

        return {
            totalJobs: jobs.length,
            activeJobs,
            inactiveJobs,
            totalVacancies,
            recentJobs,
            jobsByType,
        };
    }, [jobs]);

    /* ───────────────────────────────────── */
    /* CRUD */
    /* ───────────────────────────────────── */
    const handleCreate = async (payload) => {
        try {
            setSaving(true);
            await createCareerAdmin(payload);
            setCreateOpen(false);
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to create job");
        } finally {
            setSaving(false);
        }
    };

    const handleUpdate = async (payload) => {
        try {
            setSaving(true);
            await updateCareerAdmin(selectedJob._id, payload);
            setEditOpen(false);
            toast.success("Job updated successfully");
            setSelectedJob(null);
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to update job");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (job) => {
        const ok = confirm(`Delete ${job.JobTitle}?`);
        if (!ok) return;

        try {
            await deleteCareerAdmin(job._id);
            toast.success("Job deleted successfully");
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to delete job");
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await toggleCareerStatusAdmin(id);
            toast.success("Job status toggled successfully");
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to toggle status");
        }
    };

    /* ───────────────────────────────────── */
    /* VIEW / EDIT */
    /* ───────────────────────────────────── */
    const openView = (job) => {
        setSelectedJob(job);
        setViewOpen(true);
    };

    const openEdit = (job) => {
        setSelectedJob(job);
        setEditOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* ── HEADER ── */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8 select-none">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold mb-3">
                            💼 Careers Management
                        </div>

                        <h3 className="text-4xl! font-bold tracking-tight text-slate-800">
                            Careers <span className="text-amber-500 italic">Hub</span>
                        </h3>

                        <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-2xl!">
                            Manage jobs, hiring visibility, vacancies, and career listings from one place.
                        </p>
                    </div>

                    <button
                        onClick={() => setCreateOpen(true)}
                        className="h-12 px-5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-white font-bold border-none cursor-pointer shadow-xs shadow-amber-400/20 transition-all hover:-translate-y-0.5"
                    >
                        + Create Job
                    </button>
                </div>

                {/* ── STATS ── */}
                <StatsGrid stats={stats} />

                {/* ── FILTERS ── */}
                <FiltersBar
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    jobTypeFilter={jobTypeFilter}
                    setJobTypeFilter={setJobTypeFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />

                {/* ── TABLE ── */}
                <CareersTable
                    rows={paginatedJobs}
                    loading={loading}
                    page={page}
                    totalPages={totalPages}
                    total={filteredJobs.length}
                    onPageChange={setPage}
                    onView={openView}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                />
            </div>

            {/* ═════════════════════════════════ */}
            {/* CREATE */}
            {/* ═════════════════════════════════ */}
            <Modal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                title="Create Career"
                size="xl"
            >
                <CareerForm
                    onSubmit={handleCreate}
                    onCancel={() => setCreateOpen(false)}
                    loading={saving}
                />
            </Modal>

            {/* ═════════════════════════════════ */}
            {/* EDIT */}
            {/* ═════════════════════════════════ */}
            <Modal
                open={editOpen}
                onClose={() => {
                    setEditOpen(false);
                    setSelectedJob(null);
                }}
                title="Edit Career"
                size="xl"
            >
                {selectedJob && (
                    <CareerForm
                        initial={selectedJob}
                        onSubmit={handleUpdate}
                        onCancel={() => {
                            setEditOpen(false);
                            setSelectedJob(null);
                        }}
                        loading={saving}
                    />
                )}
            </Modal>

            {/* ═════════════════════════════════ */}
            {/* VIEW */}
            {/* ═════════════════════════════════ */}
            <Modal
                open={viewOpen}
                onClose={() => {
                    setViewOpen(false);
                    setSelectedJob(null);
                }}
                title="Job Details"
                size="xl"
            >
                {selectedJob && (
                    <ViewCareerContent
                        job={selectedJob}
                        onEdit={() => {
                            setViewOpen(false);
                            setEditOpen(true);
                        }}
                        onDelete={() => {
                            setViewOpen(false);
                            handleDelete(selectedJob);
                        }}
                        onToggleStatus={() => {
                            handleToggleStatus(selectedJob._id);
                        }}
                    />
                )}
            </Modal>

            {/* ── ANIMATION ── */}
            <style jsx global>{`
                @keyframes rowFade {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}