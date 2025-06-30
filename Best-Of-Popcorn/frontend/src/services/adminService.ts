import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const listAllUsers = async () => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    if (!userToken) {
      Alert.alert("Kimlik Doğrulanamadı");
      return;
    }

    const response = await axios.get(`${API_URL}/admin/users/`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data && Array.isArray(response.data.users)) {
      return response.data.users;
    }
  } catch (error: any) {
    console.log("Kullanıcılar listelenemedi.");
  }
};

const updateUserRole = async (userId: string, newRole: string) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    if (!userToken) {
      Alert.alert("Kimlik Doğrulanamadı");
      return;
    }
    const response = await axios.put(
      `${API_URL}/admin/users/${userId}/role`,
      { role: newRole },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.user;
  } catch (error) {
    console.log("Kullanıcı rolü güncellenemedi");
  }
};

export default { listAllUsers, updateUserRole };
