import customFetch from "@/lib/customFetch";

export const getAllClients = async () => {
  try {
    const response = await customFetch.get("/clients");
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
