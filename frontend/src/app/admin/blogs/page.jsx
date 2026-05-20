"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Edit3, Trash2, Eye, EyeOff, 
  FileText, CheckCircle, Edit, Search, Filter, RotateCcw
} from "lucide-react";
import Link from "next/link";
import { 
  getAllBlogsAdmin, 
  toggleBlogStatus, 
  deleteBlog, 
  getBlogStats 
} from "@/services/blogs.service";
import { toast } from "sonner"; // Using the toast notification from your team theme

export default function AdminBlogDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  
  // Search and Filter States (Aligned with team filters)
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch Page Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [blogsRes, statsRes] = await Promise.all([
        getAllBlogsAdmin(),
        getBlogStats()
      ]);
      
      let fetchedBlogs = [];
      if (blogsRes && blogsRes.success) {
        fetchedBlogs = blogsRes.data || [];
      } else if (blogsRes?.data?.success) {
        fetchedBlogs = blogsRes.data.data || [];
      }
      
      setBlogs(fetchedBlogs);
      setFilteredBlogs(fetchedBlogs);
      
      if (statsRes?.data?.success) {
        setStats(statsRes.data.data);
      } else if (statsRes?.success) {
        setStats(statsRes.data);
      }

    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      toast.error("Protocol Error: Failed to load blog data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Live Search and Filter logic running sequentially
  useEffect(() => {
    let result = blogs;

    if (searchQuery) {
      result = result.filter((b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.excerpt && b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (statusFilter !== "all") {
      const wantPublished = statusFilter === "published";
      result = result.filter((b) => b.isPublished === wantPublished);
    }

    setFilteredBlogs(result);
  }, [searchQuery, statusFilter, blogs]);

  // Handle Toggle Published Status
  const handleToggleStatus = async (id) => {
    setActionLoading(id);
    try {
      const response = await toggleBlogStatus(id);
      const isSuccess = response?.success || response?.data?.success;
      
      if (isSuccess) {
        toast.success("Visibility updated successfully");
        setBlogs((prev) =>
          prev.map((blog) =>
            blog._id === id
              ? { ...blog, isPublished: !blog.isPublished, publishedAt: !blog.isPublished ? new Date() : null }
              : blog
          )
        );
        
        // Refresh Stats to match new count
        const statsRes = await getBlogStats();
        if (statsRes?.data?.success) setStats(statsRes.data.data);
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  // Handle Delete Blog
  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this blog? All linked S3 assets will be scrubbed.")) return;
    
    try {
      const response = await deleteBlog(id);
      const isSuccess = response?.success || response?.data?.success;

      if (isSuccess) {
        toast.success("Article layout removed from database");
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        
        const statsRes = await getBlogStats();
        if (statsRes?.data?.success) setStats(statsRes.data.data);
      }
    } catch (error) {
      toast.error("Operation Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── TOP HEADER ── */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-amber-600 mb-2">
              <FileText size={18} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Content Architecture</span>
            </div>
            <h3 className="text-4xl font-bold tracking-tight text-slate-800">
              Blog <span className="text-amber-500 italic">Hub</span>
            </h3>
          </div>

          <Link href="/admin/blogs/create">
            <button className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95">
              <Plus size={16} className="group-hover:rotate-90 transition-transform" />
              Write Article
            </button>
          </Link>
        </header>

        {/* ── BENTO ANALYTICS CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Total Articles", count: stats?.total ?? 0, icon: <FileText className="w-5 h-5 text-slate-600" /> },
            { title: "Published", count: stats?.published ?? 0, icon: <CheckCircle className="w-5 h-5 text-emerald-600" /> },
            { title: "Draft Content", count: stats?.draft ?? 0, icon: <Edit className="w-5 h-5 text-amber-600" /> }
          ].map((card, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-slate-400 text-base! font-bold uppercase tracking-wider">{card.title}</p>
                <h3 className="text-3xl!   font-bold mt-1 text-slate-800">{loading ? "..." : card.count}</h3>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* ── SEARCH & FILTERS ── */}
        <section className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or snippet..."
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
                <option value="all">All Records</option>
                <option value="published">Live Only</option>
                <option value="draft">Drafts Only</option>
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

        {/* ── DATA DATA TABLE AREA ── */}
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
          ) : filteredBlogs.length === 0 ? (
            <div className="py-24 text-center">
              <FileText size={40} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 text-sm italic">No matching articles found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 text-[10px] font-bold tracking-wider uppercase">
                    <th className="py-4 px-6">Article Details</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  <AnimatePresence initial={false}>
                    {filteredBlogs.map((blog) => (
                      <motion.tr 
                        key={blog._id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        {/* Title & Excerpt */}
                        <td className="py-4 px-6 max-w-md">
                          <div className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-1">
                            {blog.title}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {blog.excerpt || "No excerpt structured for this record."}
                          </div>
                        </td>

                        {/* Status Toggle Badge */}
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleStatus(blog._id)}
                            disabled={actionLoading === blog._id}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                              blog.isPublished
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : "bg-slate-100 border-slate-200 text-slate-600"
                            } ${actionLoading === blog._id ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}
                          >
                            {actionLoading === blog._id ? (
                              <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                            ) : blog.isPublished ? (
                              <Eye className="w-3. h-3." size={13} />
                            ) : (
                              <EyeOff className="w-3. h-3." size={13} />
                            )}
                            {blog.isPublished ? "Live" : "Draft"}
                          </button>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/blogs/edit/${blog.slug}`}>
                              <button 
                                title="Edit Document Blocks"
                                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all shadow-xs"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            </Link>

                            <button
                              onClick={() => handleDeleteBlog(blog._id)}
                              title="Delete Record & S3 Content Assets"
                              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition-all shadow-xs"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}