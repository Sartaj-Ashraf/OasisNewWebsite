import customFetch from "@/lib/customFetch";

export const createContactApi = async (data) => {
  const response = await customFetch.post("/contacts", data);

  return response.data;
};

export const getContactsApi = async ({
  page = 1,
  limit = 10,
  isRead,
}) => {
  const params = { page, limit };

  if (isRead !== undefined) {
    params.isRead = isRead;
  }

  const response = await customFetch.get("/contacts", {
    params,
  });

  return response.data;
};

export const getSingleContactApi = async (id) => {
  const response = await customFetch.get(`/contacts/${id}`);

  return response.data;
};

export const deleteContactApi = async (id) => {
  const response = await customFetch.delete(`/contacts/${id}`);

  return response.data;
};

export const toggleReadStatusApi = async (id) => {
  const response = await customFetch.patch(
    `/contacts/toggle-read/${id}`
  );

  return response.data;
};