const BASE_URL = "/testimonials";

import customFetch from "@/lib/customFetch";

/* =========================
   HELPER: BUILD FORM DATA
========================= */
export const buildFormData = (data, imageFile = null) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value);
        }
    });

    if (imageFile) {
        formData.append("image", imageFile);
    }

    return formData;
};

/* =========================
   PUBLIC: GET ALL APPROVED
========================= */
export const getAllTestimonials = async () => {
    const res = await customFetch.get(`${BASE_URL}/`);
    return res.data;
};

/* =========================
   PUBLIC: GET FEATURED
========================= */
export const getFeaturedTestimonials = async () => {
    const res = await customFetch.get(`${BASE_URL}/featured`);
    return res.data;
};

/* =========================
   ADMIN: GET ALL
========================= */
export const getAllTestimonialsAdmin = async ({
    search = "",
    status = "all",
    rating = "all",
    featured = "all",
    page = 1,
    limit = 10,
} = {}) => {

    const params = new URLSearchParams({
        search,
        status,
        rating,
        featured,
        page,
        limit,
    });

    const res = await customFetch.get(
        `${BASE_URL}/admin?${params.toString()}`
    );

    return res.data;
};

/* =========================
   ADMIN: GET BY ID
========================= */
export const getTestimonialById = async (id) => {
    const res = await customFetch.get(`${BASE_URL}/${id}`, {
        withCredentials: true,
    });

    return res.data;
};

/* =========================
   ADMIN: GET STATS
========================= */
export const getTestimonialStats = async () => {
    const res = await customFetch.get(`${BASE_URL}/stats`, {
        withCredentials: true,
    });

    return res.data;
};

/* =========================
   ADMIN: CREATE
========================= */
export const createTestimonial = async (data, imageFile = null) => {
    const formData = buildFormData(data, imageFile);

    const res = await customFetch.post(
        `${BASE_URL}/`,
        formData,
        {
            withCredentials: true,
        }
    );

    return res.data;
};

/* =========================
   ADMIN: UPDATE
========================= */
export const updateTestimonial = async (id, data, imageFile = null) => {
    const formData = buildFormData(data, imageFile);

    const res = await customFetch.put(
        `${BASE_URL}/${id}`,
        formData,
        {
            withCredentials: true,
        }
    );

    return res.data;
};

/* =========================
   ADMIN: DELETE
========================= */
export const deleteTestimonial = async (id) => {
    const res = await customFetch.delete(
        `${BASE_URL}/${id}`,
        {
            withCredentials: true,
        }
    );

    return res.data;
};

/* =========================
   ADMIN: TOGGLE APPROVAL
========================= */
export const toggleApproval = async (id) => {
    const res = await customFetch.patch(
        `${BASE_URL}/${id}/toggle-approval`,
        {},
        {
            withCredentials: true,
        }
    );

    return res.data;
};

/* =========================
   ADMIN: TOGGLE FEATURED
========================= */
export const toggleFeatured = async (id) => {
    const res = await customFetch.patch(
        `${BASE_URL}/${id}/toggle-featured`,
        {},
        {
            withCredentials: true,
        }
    );

    return res.data;
};