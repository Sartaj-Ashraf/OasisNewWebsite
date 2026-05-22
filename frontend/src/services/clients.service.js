import customFetch from "@/lib/customFetch";

export const getClientsService = async (params) => {
  const { data } = await customFetch.get("/clients", { params });
  return data;
};

export const getClientByIdService = async (id) => {
  const { data } = await customFetch.get(`/clients/${id}`);
  return data;
};

export const createClientService = async (formData) => {
  const { data } = await customFetch.post("/clients", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateClientService = async (id, formData) => {
  const { data } = await customFetch.put(`/clients/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteClientService = async (id) => {
  const { data } = await customFetch.delete(`/clients/${id}`);
  return data;
};
export const getClientBySlugService = async (slug) => {
  const { data } = await customFetch.get(`/clients/slug/${slug}`);
  return data;
};