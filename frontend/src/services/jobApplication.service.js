import customFetch from "@/lib/customFetch";
const base="/job-applications";
export const applyForJob = async (formData) => {
    const response = await customFetch(base+"/apply", {
        method: "POST",
        body: formData
    });
    return response.json();
};
export const getApplications = async (params = {}) => {

  const query = new URLSearchParams(params).toString();

  const response = await customFetch(
    `${base}/applications?${query}`
  );

  return response.data;
};
export const deleteApplication = async (applicationId) => {
    const response = await customFetch(base+"/applications/"+applicationId, {
        method: "DELETE"
    });
    return response.data;
};
export const updateApplicationStatus = async (applicationId, status) => {
    const response = await customFetch.patch(base+"/applications/"+applicationId, {
        status
    });
    return response.data;
};
