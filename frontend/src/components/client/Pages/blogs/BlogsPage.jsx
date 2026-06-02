"use client";

import React, { useEffect, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { getAllBlogs } from "@/services/blogs.service";
import { BlogCard } from "../../HomeComponents/Blogs/BlogCard";
import { DetailedBlogCard } from "../../HomeComponents/Blogs/DetailedBlogCard";
import Image from "next/image";
import Link from "next/link";

export const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // 'grid' | 'list'

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await getAllBlogs();
      setBlogs(data?.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002B49]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-accent-dark font-sans py-8">
      
      {/* Dynamic layout: row for list view (main + sidebar), col for grid view (full width) */}
      <div className={`flex flex-col ${view === 'list' ? 'lg:flex-row' : ''} gap-12`}>
        
        {/* ======================================================== */}
        {/* MAIN CONTENT (Dynamically resizes based on view)         */}
        {/* ======================================================== */}
        <div className={`w-full ${view === 'list' ? 'lg:w-[95%]' : ''} flex flex-col gap-6`}>
          
          {/* Header & View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-gray-100 gap-4">
            <h2 className=" font-medium">All Posts</h2>
            
            <div className="flex flex-wrap items-center gap-4">
              
              {/* TOP SEARCH BAR: ONLY VISIBLE IN GRID VIEW */}
              {view === "grid" && (
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full rounded-full border border-gray-300 py-[8px] pl-4 pr-10 focus:outline-none focus:border-[#002B49] text-gray-700 text-sm"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#002B49]">
                    <Search size={16} />
                  </button>
                </div>
              )}

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
          <div className="mt-4 bg-accent-dark ">
            {view === "grid" ? (
              // GRID VIEW (Full width, 3 columns on large screens)
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
            
            {blogs.length === 0 && (
              <p className="text-gray-500 text-center py-12">No blogs found.</p>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SIDEBAR: ONLY VISIBLE IN LIST VIEW                       */}
        {/* ======================================================== */}
        {view === "list" && (
          <aside className="w-full lg:w-[35%] flex flex-col gap-12 pt-4">
            
            {/* Sidebar Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-full border border-gray-300 py-3 pl-6 pr-12 focus:outline-none focus:border-[#002B49] text-gray-700"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#002B49]">
                <Search size={20} />
              </button>
            </div>

            {/* Recent Posts */}
            <div className="flex flex-col gap-6">
              <h3 className=" font-bold text-[#002B49]">Recent Posts</h3>
              <div className="flex flex-col gap-5">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4 items-center group cursor-pointer">
                  
                    <div className="flex flex-col">
                      <span className="text-[12px] text-gray-500 mb-1">May 7, 2025</span>
                      <h4 className="text-[15px]! leading-tight font-medium text-[#002B49] group-hover:text-blue-600 transition-colors">
                        10 Principles Of Effective Web Design
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </aside>
        )}

      </div>
    </div>
  );
};