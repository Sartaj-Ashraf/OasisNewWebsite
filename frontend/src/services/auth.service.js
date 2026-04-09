import customFetch from "@/lib/customFetch";

// ================= LOGIN =================
export const loginUser = async (credentials) => {
    const { data } = await customFetch.post("/auth/login", credentials);
    return data;
};

// ================= REGISTER =================
export const registerUser = async (userData) => {
    const { data } = await customFetch.post("/auth/register", userData);
    return data;
};

// ================= LOGOUT =================
export const logoutUser = async () => {
    const { data } = await customFetch.get("/auth/logout");
    return data;
};

// ================= IS AUTH =================
export const isAuth = async () => {
    const { data } = await customFetch.get("/auth/is-user-logged-in");
    return data;
};

// ================= GET PROFILE =================
export const getProfile = async () => {
    const { data } = await customFetch.get("/auth/profile");
    return data;
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (profileData) => {
    const isFormData = profileData instanceof FormData;

    const { data } = await customFetch.put(
        "/auth/profile",
        profileData,
        {
            headers: isFormData
                ? { "Content-Type": "multipart/form-data" }
                : { "Content-Type": "application/json" },
        }
    );

    return data;
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (email) => {
    const { data } = await customFetch.post("/auth/forgot-password", { email });
    return data;
};

// ================= RESET PASSWORD WITH OTP =================
export const resetPasswordWithOTP = async (payload) => {
    const { data } = await customFetch.post("/auth/reset-password-otp", payload);
    return data;
};
