
// services/admin/careers.service.js

import customFetch from "@/lib/customFetch";

const BASE = "/careers";

/* ─────────────────────────────
   LIST
───────────────────────────── */
export function getAllCareersAdmin(params = {}) {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== "" &&
      value !== "all"
    ) {
      q.set(key, value);
    }
  });

  return customFetch(`${BASE}/admin?${q.toString()}`);
}

/* ─────────────────────────────
   SINGLE
───────────────────────────── */
export function getCareerByIdAdmin(id) {
  return customFetch(`${BASE}/${id}`);
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
  return customFetch(`${BASE}/admin/${id}`, {
    method: "PUT",
    body,
  });
}

/* ─────────────────────────────
   DELETE
───────────────────────────── */
export function deleteCareerAdmin(id) {
  return customFetch(`${BASE}/admin/${id}`, {
    method: "DELETE",
  });
}

/* ─────────────────────────────
   TOGGLE STATUS
───────────────────────────── */
export function toggleCareerStatusAdmin(id) {
  return customFetch(`${BASE}/admin/${id}/toggle-status`, {
    method: "PATCH",
  });
}

/* ─────────────────────────────
   STATS
───────────────────────────── */
export function getCareerStatsAdmin() {
  return customFetch(`${BASE}/admin/stats`);
}

/* ─────────────────────────────
   FILTERS
───────────────────────────── */
export function getCareerFiltersAdmin() {
  return customFetch(`${BASE}/admin/filters`);
}
