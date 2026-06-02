"use client";

import { useEffect, useState } from "react";
import ContentRenderer from "@/components/content/ContentRenderer";
import { getBlogBySlug } from "@/services/blogs.service";
import { BlogHeader } from "./BlogHeader";
import { BlogCard } from "../../HomeComponents/Blogs/BlogCard";

export const BlogSinglePage = ({ slug }) => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const { data } = await getBlogBySlug(slug);
        setBlog(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="space-y-4 animate-pulse">
          <div className="h-6 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-4/6" />
        </div>
      </div>
    );
  }

  return (
    <main className="container">
      <BlogHeader title={blog?.title} />
      <div className=" grid grid-cols-6 items-center">
        <div className="col-span-4">
          <ContentRenderer sections={blog?.content || []} />
        </div>
        <div className="flex flex-col col-span-2">
          {blog?.relatedBlogs?.map((blog) => (
            <div key={blog._id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
