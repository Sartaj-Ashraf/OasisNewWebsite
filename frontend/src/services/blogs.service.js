// services/blogs.service.js
import customFetch from "@/lib/customFetch";

const API = "/blogs";

/* =========================
   PUBLIC
========================= */
export const getAllBlogs = () => customFetch.get(API);

export const getBlogBySlug = (slug) =>
  customFetch.get(`${API}/slug/${slug}`);

/* =========================
   ADMIN
========================= */
export const getAllBlogsAdmin = () =>
  customFetch.get(`${API}`);

export const getBlogStats = () =>
  customFetch.get(`${API}/stats`);

/* =========================
   CREATE BLOG
========================= */
export const createBlog = (formData) =>
  customFetch.post(`${API}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/* =========================
   UPDATE BLOG
========================= */
export const updateBlog = (id, formData) =>
  customFetch.put(`${API}/admin/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/* =========================
   DELETE BLOG
========================= */
export const deleteBlog = (id) =>
  customFetch.delete(`${API}/admin/${id}`);

/* =========================
   TOGGLE STATUS
========================= */
export const toggleBlogStatus = (id) =>
  customFetch.patch(`${API}/admin/${id}/toggle-status`);

/* =========================
   REORDER CONTENT
========================= */
export const reorderContentSections = (id, sectionOrder) =>
  customFetch.patch(`${API}/admin/${id}/reorder-sections`, {
    sectionOrder,
  });