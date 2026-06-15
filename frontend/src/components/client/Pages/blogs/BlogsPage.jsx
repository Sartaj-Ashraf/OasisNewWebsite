"use client";

import React, { useEffect, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { getAllBlogs } from "@/services/blogs.service";
import { BlogCard } from "../../HomeComponents/Blogs/BlogCard";
import { DetailedBlogCard } from "../../HomeComponents/Blogs/DetailedBlogCard";
import { RandomBlog } from "../../HomeComponents/Blogs/RandomBlog";
import { BlogsPageSkeleton } from "@/components/skeleton/BlogsPageSkeleton";

export const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // 'grid' | 'list'

  // New state for Search and Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce the search input to avoid spamming the API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); 
    }, 200);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await getAllBlogs({ 
        search: debouncedSearch, 
        page, 
        limit: 10 
      });
      
      setBlogs(data?.data || []);
      setTotalPages(data?.totalPages || 1); 
      
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedBlogs = async () => {
    try {
      const data = await getAllBlogs({ isFeatured: true });
      setFeatured(data?.data?.data || []);
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
    }
  };

  // Fetch featured blogs only once on mount
  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  // Fetch main blogs whenever search or page changes
  useEffect(() => {
    fetchBlogs();
  }, [debouncedSearch, page]);

  // If loading and no blogs are present, show spinner. 
  // (Optional: remove `&& blogs.length === 0` if you want a full spinner on every page turn)
  if (loading && blogs.length === 0) {
    return (
    <BlogsPageSkeleton/>
    );
  }
if(blogs.length == 0 ) return null
  return (
    <div className=" bg-accent-dark font-sans py-8 ">
      
      {/* Dynamic layout: row for list view (main + sidebar), col for grid view (full width) */}
      <div className={`container flex md:flex-row flex-col ${view === 'list' ? 'lg:flex-row' : ''} gap-12`}>
        
        {/* ======================================================== */}
        {/* MAIN CONTENT (Dynamically resizes based on view)         */}
        {/* ======================================================== */}
        <div className={`w-full ${view === 'list' ? 'lg:w-[95%]' : ''} flex flex-col gap-6`}>
          
          {/* Header & View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b  border-gray-100 gap-4 pb-4">
            <h3 className=" font-medium px-2">All Blogs</h3>
            
            <div className="flex flex-wrap items-center gap-4">
              
              {/* TOP SEARCH BAR: ONLY VISIBLE IN GRID VIEW */}
              
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full rounded-full border border-gray-300 py-[8px] pl-4 pr-10 focus:outline-none focus:border-[#002B49] text-gray-700 text-sm"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#002B49]">
                    <Search size={16} />
                  </button>
                </div>

              {/* View Toggles */}
              <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-white">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md transition-all ${
                    view === "grid" 
                      ? "bg-white shadow-sm text-[#002B49]" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-md transition-all ${
                    view === "list" 
                      ? "bg-white shadow-sm text-[#002B49]" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  aria-label="List View"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Blogs Render Area */}
          <div >
            {/* Show a subtle loading indicator while fetching pages/searches */}
            {loading && blogs.length > 0 && (
               <div className="text-center py-4 text-sm text-gray-500">Updating results...</div>
            )}

            {view === "grid" ? (
              // GRID VIEW
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            ) : (
              // LIST VIEW
              <div className="flex flex-col gap-12">
                {blogs.map((blog) => (
                  <DetailedBlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
            
            {blogs.length === 0 && !loading && (
              <p className="text-gray-500 text-center py-12">No blogs found.</p>
            )}

            {/* ======================================================== */}
            {/* PAGINATION CONTROLS                                      */}
            {/* ======================================================== */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
                  <span className="font-semibold text-gray-900">{totalPages}</span>
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || loading}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SIDEBAR: ONLY VISIBLE IN LIST VIEW                       */}
        {/* ======================================================== */}
        {view === "list" && (
          <aside className="w-full lg:w-[35%] flex flex-col gap-12">
            
            {/* Recent Posts */}
            <div className="sticky top-5">
              <div className="flex flex-col gap-6">
                <h4 className=" font-medium text-secondary-dark">Featured Posts</h4>
                {featured.map((blog) => (
                  <RandomBlog key={blog._id} blog={blog} />
                ))}
              </div>
            </div>

          </aside>
        )}

      </div>
    </div>
  );
};