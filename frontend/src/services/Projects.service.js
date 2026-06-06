import customAxios from "@/lib/customFetch";
/**
 * Fetch all active projects
 */
export const fetchProjects = async () => {
  return await customAxios.get("/projects");
};
export const fetchAllProjects = async () => {
  return await customAxios.get("/projects/allProjects");
};
/**
 * Fetch a single project by ID
 */
export const fetchProjectById = async (id) => {
  return await customAxios.get(`/projects/${id}`);
};

/**
 * Create a new project
 */
export const createProject = async (formData) => {
  return await customAxios.post("/projects/create", formData);
};

/**
 * Update an existing project
 */
export const updateProject = async (id, formData) => {
  return await customAxios.put(`/projects/${id}`, formData);
};

/**
 * Delete a project
 */
export const deleteProject = async (id) => {
  return await customAxios.delete(`/projects/${id}`);
};

/**
 * Get all project categories
 */
export const getProjectCategories = async () => {
  return await customAxios.get("/projects/categories");
};