"use client";

import { useEffect, useState } from "react";
import ContentRenderer from "@/components/content/ContentRenderer";
import { getBlogBySlug, getRandomBlogs } from "@/services/blogs.service";
import { BlogHeader } from "./BlogHeader";
import { RandomBlog } from "../../HomeComponents/Blogs/RandomBlog";

export const BlogSinglePage = ({ slug }) => {
  const [blog, setBlog] = useState(null);
  const [RandomBlogs, setRandomBlogs] = useState([]);
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
  useEffect(() => {
    const fetchRandomBlog = async () => {
      try {
        const { data } = await getRandomBlogs(blog?._id);
        setRandomBlogs(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRandomBlog();
  }, []);
  console.log(RandomBlogs);
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
      <div className=" grid grid-cols-1 md:grid-cols-6 w-full gap-6 ">
        <div className="col-span-4">
          <ContentRenderer sections={blog?.content || []} />
        </div>
        <div className="relative h-full w-full col-span-2 ">
          <div className="flex flex-col py-8 gap-4 sticky top-5 w-full ">
            <h4 className="text-xl font-medium text-secondary-dark">
              Other Blogs
            </h4>
            {RandomBlogs.map((blog) => (
              <RandomBlog key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
