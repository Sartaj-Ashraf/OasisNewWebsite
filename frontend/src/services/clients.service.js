import customFetch from "@/lib/customFetch";

export const getAllClients = async () => {
  try {
    const response = await customFetch.get("/clients");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
