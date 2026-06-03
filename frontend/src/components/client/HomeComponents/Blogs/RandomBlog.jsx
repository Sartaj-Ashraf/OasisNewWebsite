import Image from "next/image";
import Link from "next/link";
import React from "react";

export const RandomBlog = ({ blog }) => {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="flex items-center gap-4 hover:opacity-80 transition-opacity"
    >
      {/* Assuming your blog object has an image property. 
        Update `blog?.image` to match your actual data schema.
      */}
      <Image
        src={blog?.coverImage?.url || "/api/placeholder/100/100"}
        alt={blog?.title}
        width={100}
        height={100}
        unoptimized
        className="w-20 h-20 rounded-full object-cover shrink-0"
      />

      <div className="flex flex-col">
        <span className="text-sm text-secondary mb-1">
          {blog?.publishedAt
            ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : ""}
        </span>

        <h5 className="text-xl font-medium text-secondary-dark leading-tight line-clamp-2">
          {blog?.title}
        </h5>
      </div>
    </Link>
  );
};
