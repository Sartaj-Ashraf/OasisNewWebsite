import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ClickAble";

export const DetailedBlogCard = ({ blog }) => {
  // Format the date to look like "MAY 7, 2025"
  const formattedDate = new Date(blog?.publishedAt || new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).toUpperCase();


  // Provide a safe fallback image in case url is empty
  const imageUrl = blog?.coverImage?.url;

  return (
    <div className="flex flex-col w-full px-2 ">
      
      {/* 1. Cover Image Section */}
    <Link 
  href={`/blogs/${blog?.slug || '#'}`} 
  className="relative w-full aspect-video  rounded-2xl overflow-hidden block mb-5"
>
  <Image 
    src={imageUrl} 
    alt={blog?.title || "Blog cover"} 
    fill
    unoptimized
    className="object-cover"
  />
</Link>

      <div className="flex flex-col gap-2">
        {/* 2. Meta Info (Date, Author, Category) */}
        <div className="text-[13px] text-gray-500 font-medium tracking-wide">
          <span>{formattedDate}</span>
        </div>

        {/* 3. Title */}
        <Link href={`/blogs/${blog?.slug || '#'}`}>
          <h3 className="font-medium text-secondary-dark leading-10! hover:text-primary transition-colors">
            {blog?.title}
          </h3>
        </Link>

        {/* 4. Excerpt */}
        <p className="text-[#5b6b79] text-[16px] md:text-[18px] leading-[1.6] line-clamp-3 ">
          {blog?.excerpt}
        </p>

        {/* 5. Footer (Read More & Share) */}
        <div className="flex items-center justify-between ">
          <Link href={`/blogs/${blog?.slug || '#'}`}>
            <Button className="button bg-linear-to-br from-primary via-primary-dark to-primary-dark hover:primary-dark hover:via-primary-dark  hover:to-primary">
              Read More 
            </Button>
          </Link>
          
          {/* <button aria-label="Share article" className="p-2 cursor-pointer">
           <Share2 />
          </button> */}
        </div>
      </div>

    </div>
  );
};