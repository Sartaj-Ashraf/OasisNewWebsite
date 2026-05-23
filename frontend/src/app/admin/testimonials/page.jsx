"use client";
import { useState, useEffect, useCallback } from "react";
import {
    getAllTestimonialsAdmin,
    getTestimonialStats,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleApproval,
    toggleFeatured,
} from "@/services/testimonials.service";
import { toast } from "sonner";

import { Modal } from "@/components/admin/testimonials/utils";
import { TestimonialForm } from "@/components/admin/testimonials/Testimonialform";
import { ViewTestimonialContent,TestimonialsTable } from "@/components/admin/testimonials/Testimonialstable.jsx";
import { DeleteModal } from "@/components/admin/DeleteModal";
/* =========================
   CONSTANTS
========================= */
const LIMIT = 10;

/* =========================
   DEBOUNCE HOOK
========================= */
function useDebounce(value, delay = 400) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

/* =========================
   STATS CARDS
========================= */
const StatsGrid = ({ stats }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {[
            { label: "Total", value: stats.total, color: "text-slate-800", icon: "🗂" },
            { label: "Approved", value: stats.approved, color: "text-emerald-600", icon: "✓" },
            { label: "Pending", value: stats.pending, color: "text-rose-500", icon: "⏳" },
            { label: "Featured", value: stats.featured, color: "text-amber-500", icon: "★" },
            { label: "Avg Rating", value: `${stats.averageRating}★`, color: "text-amber-500", icon: "⭐" },
        ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 relative overflow-hidden group">
             
                <div className="flex items-start justify-between mb-2">
                    <div className="text-sm font-bold uppercase tracking-wider text-slate-400">{s.label}</div>
                    <span className="text-base opacity-40 group-hover:opacity-70 transition-opacity">{s.icon}</span>
                </div>
                <div className={`text-2xl font-extrabold leading-none ${s.color}`}
                    >{s.value}</div>
            </div>
        ))}
    </div>
);

/* =========================
   FILTERS BAR
========================= */

const FiltersBar = ({
  searchInput,
  setSearchInput,
  status,
  setStatus,
  ratingFilter,
  setRatingFilter,
  featuredFilter,
  setFeaturedFilter,
})=> {
  const hasActive =
    searchInput || status !== "all" || ratingFilter !== "all" || featuredFilter !== "all";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        
        {/* Search Input Container */}
        <div className="relative flex-1 max-w-xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            className="w-full bg-gray-50/60 border border-gray-200/80 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 font-normal"
            placeholder="Search name, company or testimonial text…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 bg-transparent border-none cursor-pointer text-xs p-1 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Controls Panel */}
        <div className="flex flex-wrap gap-3 items-center">
          
          {/* Status Segmented Controls */}
          <div className="flex gap-1 bg-gray-50/60 border border-gray-200/80 rounded-xl p-1">
            {[
              { val: "all", label: "All" },
              { val: "approved", label: "✓ Live" },
              { val: "pending", label: "⏳ Pending" },
            ].map(({ val, label }) => (
              <button
                key={val}
                onClick={() => setStatus(val)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium border-none cursor-pointer transition-all ${
                  status === val
                    ? "bg-white text-gray-900 shadow-sm font-semibold"
                    : "bg-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Rating Dropdown Selection */}
          <div className="relative">
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="appearance-none bg-gray-50/60 border border-gray-200/80 text-gray-600 text-xs font-medium rounded-xl pl-3 pr-8 py-2.5 outline-none focus:border-gray-900 cursor-pointer transition-colors"
            >
              <option value="all">★ Any rating</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {"★".repeat(r)} {r} star{r !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[9px] text-gray-400">
              ▼
            </div>
          </div>

          {/* Featured Filter Dropdown */}
          <div className="relative">
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              className="appearance-none bg-gray-50/60 border border-gray-200/80 text-gray-600 text-xs font-medium rounded-xl pl-3 pr-8 py-2.5 outline-none focus:border-gray-900 cursor-pointer transition-colors"
            >
              <option value="all">All placements</option>
              <option value="true">✦ Featured only</option>
              <option value="false">✧ Standard only</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[9px] text-gray-400">
              ▼
            </div>
          </div>

          {/* Clear Filter Action Button */}
          {hasActive && (
            <button
              onClick={() => {
                setSearchInput("");
                setStatus("all");
                setRatingFilter("all");
                setFeaturedFilter("all");
              }}
              className="px-4 py-2.5 text-xs font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200/80 border border-transparent rounded-xl cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function TestimonialsAdmin() {
    const [rows, setRows] = useState([]);
    const [stats, setStats] = useState(null);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    // modal: null | "create" | "edit" | "delete" | "view"
    const [modal, setModal] = useState(null);
    const [selected, setSelected] = useState(null);

    /* filters */
    const [searchInput, setSearchInput] = useState("");
    const [status, setStatus] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [featuredFilter, setFeaturedFilter] = useState("all");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(searchInput, 400);

    /* =========================
       FETCH
    ========================= */
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [tRes, sRes] = await Promise.all([
                getAllTestimonialsAdmin({
                    search: debouncedSearch,
                    status,
                    rating: ratingFilter,
                    featured: featuredFilter,
                    page,
                    limit: LIMIT,
                }),
                getTestimonialStats(),
            ]);
            setRows(tRes.data);
            setTotal(tRes.total);
            setTotalPages(tRes.totalPages);
            setStats(sRes.data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch, status, ratingFilter, featuredFilter, page]);

    useEffect(() => { fetchData(); }, [fetchData]);
    useEffect(() => { setPage(1); }, [debouncedSearch, status, ratingFilter, featuredFilter]);

    /* =========================
       CRUD
    ========================= */
    const handleCreate = async (form, imageFile) => {
        setSaving(true);
        try {
            await createTestimonial(form, imageFile);
            toast.success("Testimonial created ✓");
            closeModal();
            fetchData();
        } catch (err) { toast.error(err.message); }
        finally { setSaving(false); }
    };

    const handleUpdate = async (form, imageFile) => {
        setSaving(true);
        try {
            await updateTestimonial(selected._id, form, imageFile);
            toast.success("Testimonial updated ✓");
            closeModal();
            fetchData();
        } catch (err) { toast.error(err.message); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        setSaving(true);
        try {
            await deleteTestimonial(selected._id);
            toast.success("Testimonial deleted");
            closeModal();
            fetchData();
        } catch (err) { toast.error(err.message); }
        finally { setSaving(false); }
    };

    /* optimistic toggles */
    const handleToggleApproval = async (id) => {
        setRows((p) => p.map((r) => r._id === id ? { ...r, isApproved: !r.isApproved } : r));
        // also update selected if open in view/edit
        setSelected((s) => s?._id === id ? { ...s, isApproved: !s.isApproved } : s);
        try {
            await toggleApproval(id);
            toast.success("Testimonial approval status updated");
            getTestimonialStats().then((s) => setStats(s.data)).catch(() => {});
        } catch (err) {
            setRows((p) => p.map((r) => r._id === id ? { ...r, isApproved: !r.isApproved } : r));
            setSelected((s) => s?._id === id ? { ...s, isApproved: !s.isApproved } : s);
            toast.error(err.message);
        }
    };

    const handleToggleFeatured = async (id) => {
        setRows((p) => p.map((r) => r._id === id ? { ...r, isFeatured: !r.isFeatured } : r));
        setSelected((s) => s?._id === id ? { ...s, isFeatured: !s.isFeatured } : s);
        try {
            await toggleFeatured(id);
            toast.success("Testimonial featured status updated");
            getTestimonialStats().then((s) => setStats(s.data)).catch(() => {});
        } catch (err) {
            setRows((p) => p.map((r) => r._id === id ? { ...r, isFeatured: !r.isFeatured } : r));
            setSelected((s) => s?._id === id ? { ...s, isFeatured: !s.isFeatured } : s);
            toast.error(err.message);
        }
    };

    /* modal helpers */
    const closeModal = () => { setModal(null); setSelected(null); };
    const openView   = (t) => { setSelected(t); setModal("view"); };
    const openEdit   = (t) => { setSelected(t); setModal("edit"); };
    const openDelete = (t) => { setSelected(t); setModal("delete"); };

    /* from view → edit / delete without re-selecting */
    const viewToEdit = () => setModal("edit");
    const viewToDelete = () => setModal("delete");

    /* =========================
       RENDER
    ========================= */
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Nunito:wght@400;500;600;700&display=swap');
                * { font-family: 'Nunito', sans-serif; }
                @keyframes rowFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            <div className="min-h-screen">
                <div className="max-w-360 mx-auto px-4 sm:px-6 xl:px-10 py-8 xl:py-10">

                    {/* HEADER */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                             
                                <h1 className="text-3xl! font-bold text-primary "
                                    >
                                    Testimonials <span className="text-secondary">Admin</span>
                                </h1>
                            </div>
                            <p className="text-slate-500 text-sm!">
                                {loading ? "Loading…" : `${total} record${total !== 1 ? "s" : ""} · page ${page} of ${totalPages}`}
                            </p>
                        </div>
                        <button
                            onClick={() => setModal("create")}
                            className="self-start sm:self-auto inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl border-none cursor-pointer transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            <span className="text-lg! leading-none font-light">+</span> New Testimonial
                        </button>
                    </div>

                    {/* STATS */}
                    {stats && <StatsGrid stats={stats} />}

                    {/* FILTERS */}
                    <FiltersBar
                        searchInput={searchInput} setSearchInput={setSearchInput}
                        status={status} setStatus={setStatus}
                        ratingFilter={ratingFilter} setRatingFilter={setRatingFilter}
                        featuredFilter={featuredFilter} setFeaturedFilter={setFeaturedFilter}
                    />

                    {/* TABLE */}
                    <TestimonialsTable
                        rows={rows}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        total={total}
                        onView={openView}
                        onEdit={openEdit}
                        onDelete={openDelete}
                        onToggleApproval={handleToggleApproval}
                        onToggleFeatured={handleToggleFeatured}
                        onPageChange={setPage}
                    />

                </div>
            </div>

            {/* ── MODALS ── */}

            {/* CREATE */}
            <Modal open={modal === "create"} title="New Testimonial" onClose={closeModal} wide>
                <TestimonialForm onSubmit={handleCreate} onCancel={closeModal} loading={saving} />
            </Modal>

            {/* VIEW */}
            <Modal open={modal === "view"} title="Testimonial Details" onClose={closeModal} wide>
                {selected && (
                    <ViewTestimonialContent
                        t={selected}
                        onEdit={viewToEdit}
                        onDelete={viewToDelete}
                        onToggleApproval={handleToggleApproval}
                        onToggleFeatured={handleToggleFeatured}
                    />
                )}
            </Modal>

            {/* EDIT */}
            <Modal open={modal === "edit"} title="Edit Testimonial" onClose={closeModal} wide>
                {selected && (
                    <TestimonialForm
                        initial={{
                            name: selected.name,
                            company: selected.company || "",
                            rating: selected.rating,
                            testimonial: selected.testimonial,
                            isApproved: selected.isApproved ? "true" : "false",
                            isFeatured: selected.isFeatured ? "true" : "false",
                            order: selected.order || 0,
                            image: selected.image,
                        }}
                        onSubmit={handleUpdate}
                        onCancel={closeModal}
                        loading={saving}
                    />
                )}
            </Modal>

            {/* DELETE */}
         <DeleteModal
    isOpen={modal === "delete"}
    onClose={closeModal}
    onConfirm={handleDelete}
    title={selected?.name || "this testimonial"}
/>
        </>
    );
}