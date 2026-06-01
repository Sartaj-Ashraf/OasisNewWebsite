"use client";
import React, { useEffect, useState } from "react";
import { BlogCard } from "./Blogs/BlogCard";
import { getAllBlogs } from "@/services/blogs.service";

export const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await getAllBlogs();
      setBlogs(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 h-full md:h-screen lg:max-h-[500px] bg-accent-dark mt-8 rounded-3xl ">
      <h2>Latest Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center h-full gap-4">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};
