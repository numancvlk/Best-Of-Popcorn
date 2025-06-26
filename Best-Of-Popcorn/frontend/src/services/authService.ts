import axiosInstance from "../api/axiosInstance";

const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    const detailedErrorMessage =
      error.response?.data?.message ||
      (typeof error.response?.data === "string" ? error.response.data : null) ||
      error.message ||
      "Bilinmeyen bir hata oluştu.";

    throw new Error(detailedErrorMessage);
  }
};

const register = async (username: string, email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    const detailedErrorMessage =
      error.response?.data?.message ||
      (typeof error.response?.data === "string" ? error.response.data : null) ||
      error.message ||
      "Bilinmeyen bir hata oluştu.";

    throw new Error(detailedErrorMessage);
  }
};

const authService = {
  login,
  register,
};

export default authService;
