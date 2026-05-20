"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import BlogForm from "../../create/BlogForm";

import { getBlogBySlug } from "@/services/blogs.service";

import { toast } from "sonner";

export default function BlogEdit() {
  const router = useRouter();
  const params = useParams();

  const slug = params?.slug;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const response = await getBlogBySlug(slug);

        setBlog(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-sm text-slate-500">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-sm text-red-500">
        Blog not found
      </div>
    );
  }

  return (
    <BlogForm

      initialData={blog}
      onSuccess={() => router.refresh()}
      onCancel={() => router.back()}
    />
  );
}