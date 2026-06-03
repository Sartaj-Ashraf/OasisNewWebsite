// services/blogs.service.js
import customFetch from "@/lib/customFetch";
const API = "/blogs";
/* =========================
   PUBLIC
========================= */
export const getAllBlogs = ({
  search,
  isFeatured,
  page = 1,
  limit = 10,
} = {}) =>
  customFetch.get(API, {
    params: {
      search,
      isFeatured,
      page,
      limit,
    },
  });
export const getBlogBySlug = (slug) => {
  const response = customFetch.get(`${API}/slug/${slug}`);
  return response;
};
/* =========================
   ADMIN
========================= */
export const getAllBlogsAdmin = async ({
  page = 1,
  limit = 10,
  search,
  isPublished,
  isFeatured,
}) => {
  const response = await customFetch.get(`${API}/admin`, {
    params: {
      page,
      limit,
      search,
      isPublished,
      isFeatured,
    },
  });

  return response.data;
};

export const getBlogStats = () => customFetch.get(`${API}/stats`);

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
  customFetch.put(`${API}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/* =========================
   DELETE BLOG
========================= */
export const deleteBlog = (id) => customFetch.delete(`${API}/admin/${id}`);

/* =========================
   TOGGLE STATUS
========================= */
export const toggleBlogStatus = (id) =>
  customFetch.patch(`${API}/${id}/toggle-status`);

/* =========================
   REORDER CONTENT
========================= */
export const reorderContentSections = (id, sectionOrder) =>
  customFetch.patch(`${API}/admin/${id}/reorder-sections`, {
    sectionOrder,
  });

// Random Blogs

export const getRandomBlogs = (blogId) =>
  customFetch.get(`${API}/random?blogId=${blogId}`);
