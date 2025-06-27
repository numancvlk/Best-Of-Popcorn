import axiosInstance from "../api/axiosInstance";

const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error("Bilinmeyen bir hata oluştu.");
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
    throw new Error("Bilinmeyen bir hata oluştu.");
  }
};

const authService = {
  login,
  register,
};

export default authService;
