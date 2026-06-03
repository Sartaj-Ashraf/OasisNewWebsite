"use client";

import { useState, useEffect } from "react";
import { getApplications, deleteApplication } from "@/services/jobApplication.service";
import { DeleteModal } from "@/components/admin/DeleteModal";
import { Modal, Spinner } from "@/components/admin/job-applications/ApplicationsUi";
import { ApplicationDetail } from "@/components/admin/job-applications/ApplicationModals";
import { ApplicationsFilters, ApplicationsTable, ApplicationsPagination } from "@/components/admin/job-applications/Applicationstable";
import { toast } from "sonner";
// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [minExp, setMinExp] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // modals
  const [addOpen, setAddOpen] = useState(false);
  const [detailApp, setDetailApp] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ── data fetching ──────────────────────────────────────────────────────────

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await getApplications({
        page,
        limit,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
        ...(minExp && { minExperience: minExp }),
      });
      setApplications(res.data ?? []);
      setTotal(res.total ?? 0);
      setPages(res.pages ?? 1);
    } catch {
      setApplications([]);
      setTotal(0);
      setPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, [page, statusFilter, minExp]);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); fetchApplications(); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  // ── handlers ──────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteApplication(deleteTarget._id);
      toast.success("Application deleted successfully");
      setDeleteTarget(null);
      fetchApplications();
    } catch {
      toast.error("Failed to delete application");
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = (id, newStatus) =>
    setApplications((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
    );

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">

          

      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3 text-amber-600 mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Job Application Management</span>
            </div>
            <h3 className="text-4xl! font-bold tracking-tight text-slate-800">
              Job <span className="text-amber-500 italic">Applications</span>
            </h3>
          </div>
  

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">

        {/* Filters */}
        <ApplicationsFilters
          search={search} setSearch={setSearch}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          minExp={minExp} setMinExp={setMinExp}
          setPage={setPage}
        />

        {/* Table */}
        <ApplicationsTable
          applications={applications}
          loading={loading}
          onView={setDetailApp}
          onDelete={setDeleteTarget}
        />

        {/* Pagination */}
        <ApplicationsPagination page={page} pages={pages} setPage={setPage} />
      </div>

      {/* ── Modals ── */}

      {/* Detail / status update */}
      <Modal open={!!detailApp} onClose={() => setDetailApp(null)} title="Application detail">
        {detailApp && (
          <ApplicationDetail
            app={detailApp}
            onStatusChange={handleStatusChange}
            onClose={() => setDetailApp(null)}
          />
        )}
      </Modal>

      {/* Delete confirm */}
      
    <DeleteModal
  isOpen={!!deleteTarget}
  onClose={() => setDeleteTarget(null)}
  onConfirm={handleDelete}
  title={deleteTarget?.fullName || "Application"}
/>
    </div>
  );
}