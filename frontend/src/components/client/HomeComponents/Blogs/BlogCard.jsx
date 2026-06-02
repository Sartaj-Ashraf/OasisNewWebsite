import React from "react";
import bottomCorner from "@/assets/svg/bottomCorner.svg";
import Image from "next/image";
import Link from "next/link";
export const BlogCard = ({ blog }) => {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className=" relative bg-white w-full h-fit md:h-[290px] flex flex-col gap-8 rounded-3xl pl-8 pr-2 py-8  w-full"
    >
      <div className="absolute -bottom-1 -right-1">
        <Image src={bottomCorner} alt="bottom corner" width={77} height={77} />
      </div>

      <h3 className="text-lg font-medium text-black line-clamp-4 py-1">
        {blog?.title}
      </h3>     
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/6">
        <span className="text-xs text-black/60">
          {new Date(blog?.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
};
