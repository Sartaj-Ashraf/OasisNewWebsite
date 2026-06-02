import customFetch from "@/lib/customFetch";

const BASE = "/careers";

/* ─────────────────────────────
   LIST
───────────────────────────── */
export function getAllCareersAdmin(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== "all") {
      q.set(key, value);
    }
  });
  return customFetch.get(`${BASE}/admin?${q.toString()}`);
}

/* ─────────────────────────────
   SINGLE
───────────────────────────── */
export function getCareerByIdAdmin(id) {
  return customFetch.get(`${BASE}/admin/${id}`);
}

/* ─────────────────────────────
   CREATE
───────────────────────────── */
export function createCareerAdmin(body) {
  return customFetch.post(`${BASE}/admin`, body);
}

/* ─────────────────────────────
   UPDATE
───────────────────────────── */
export function updateCareerAdmin(id, body) {
  return customFetch.put(`${BASE}/admin/${id}`, body);
}

/* ─────────────────────────────
   DELETE
───────────────────────────── */
export function deleteCareerAdmin(id) {
  return customFetch.delete(`${BASE}/admin/${id}`);
}

/* ─────────────────────────────
   TOGGLE STATUS
───────────────────────────── */
export function toggleCareerStatusAdmin(id) {
  return customFetch.patch(`${BASE}/admin/${id}/toggle-status`);
}

/* ─────────────────────────────
   STATS
───────────────────────────── */
export function getCareerStatsAdmin() {
  return customFetch.get(`${BASE}/admin/stats`);
}

/* ─────────────────────────────
   FILTERS
───────────────────────────── */
export function getCareerFiltersAdmin() {
  return customFetch.get(`${BASE}/admin/filters`);
}

/* ─────────────────────────────
   LIST (public, active only)
───────────────────────────── */
export function getAllCareers(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== "all") {
      q.set(key, value);
    }
  });
  return customFetch.get(`${BASE}?${q.toString()}`);
}

/* ─────────────────────────────
   SINGLE BY SLUG (public)
───────────────────────────── */
export function getCareerBySlug(slug) {
  return customFetch.get(`${BASE}/slug/${slug}`);
}

/* ─────────────────────────────
   FILTERS (public)
───────────────────────────── */
export function getCareerFilters() {
  return customFetch.get(`${BASE}/filters`);
}