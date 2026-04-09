// services/teamService.js
import customFetch from "@/lib/customFetch";


const API = "/team-members";

export const getTeamMembers = () => customFetch.get(API);

export const createTeamMember = (data) =>
  customFetch.post(API, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getTeamMemberid = (id) => customFetch.get(`${API}/${id}`);
export const updateTeamMember = (id, data) =>
  customFetch.put(`${API}/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteTeamMember = (id) =>
  customFetch.delete(`${API}/${id}`);