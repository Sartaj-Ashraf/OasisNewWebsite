"use client";

import BlogForm from "./BlogForm";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
    const router = useRouter();
    return <BlogForm onSuccess={() => router.push("/admin/blogs")} />;
}
