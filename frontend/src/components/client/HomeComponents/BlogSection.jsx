import React from 'react'
import { BlogCard } from './Blogs/BlogCard'

export const BlogSection = () => {
  return (
    <div className="flex flex-col gap-4 p-8 h-full md:h-screen lg:max-h-[500px] bg-accent-dark mt-8 rounded-3xl ">
        <h2>Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center h-full gap-4">
        {[1,2,3].map((item) => (
            <div key={item}>
                <BlogCard />
            </div>
        ))}
        </div>
    </div>
  )
}
