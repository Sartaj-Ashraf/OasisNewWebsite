"use client";
import React, { useEffect, useState } from "react";
import { BlogCard } from "./Blogs/BlogCard";
import { getAllBlogs } from "@/services/blogs.service";
import { BlogSectionSkeleton } from "@/components/skeleton/BlogSectionSkeleton";

export const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await getAllBlogs({
        isFeatured: true,
      });

      const latestBlogs = [...(data?.data || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setBlogs(latestBlogs);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  
  if (loading) {
    return <BlogSectionSkeleton />;
  }
  if(blogs.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 h-full lg:max-h-[500px] bg-accent-dark mt-8 rounded-3xl">
      <h2>Latest Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-4">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};