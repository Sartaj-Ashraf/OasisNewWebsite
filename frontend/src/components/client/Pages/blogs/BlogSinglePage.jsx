"use client";

import { useEffect, useState } from "react";
import ContentRenderer from "@/components/content/ContentRenderer";
import { getBlogBySlug, getRandomBlogs } from "@/services/blogs.service";
import { BlogHeader } from "./BlogHeader";
import { RandomBlog } from "../../HomeComponents/Blogs/RandomBlog";
import BlogSinglePageSkeleton from "@/components/skeleton/BlogSinglePageSkeleton";

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

  
  if (!blog) {
    return (
     <BlogSinglePageSkeleton/>
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
