import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import * as SecureStore from "expo-secure-store";
import authService from "../services/authService";
import { Alert } from "react-native";

interface AuthContextType {
  userToken: string | null;
  currentUser: UserInfo | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

interface UserInfo {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        const storedUserId = await SecureStore.getItemAsync("userId");
        const storedUsername = await SecureStore.getItemAsync("username");
        const storedEmail = await SecureStore.getItemAsync("userEmail");
        const storedRole = await SecureStore.getItemAsync("userRole");

        if (
          token &&
          storedUserId &&
          storedUsername &&
          storedEmail &&
          storedRole
        ) {
          setUserToken(token);
          setCurrentUser({
            id: storedUserId,
            username: storedUsername,
            email: storedEmail,
            role: storedRole,
          });
        } else {
          await SecureStore.deleteItemAsync("userToken");
          await SecureStore.deleteItemAsync("userId");
          await SecureStore.deleteItemAsync("username");
          await SecureStore.deleteItemAsync("userEmail");
          await SecureStore.deleteItemAsync("userRole");
          setUserToken(null);
          setCurrentUser(null);
        }
      } catch (e) {
        Alert.alert("HATA", "Bir hata oluştu.");
        setUserToken(null);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    let success = false;
    try {
      const response = await authService.login(email, password);
      const { token, _id: id, username, email: userEmail, role } = response;

      if (token && id && username && userEmail && role) {
        await SecureStore.setItemAsync("userToken", token);
        await SecureStore.setItemAsync("userId", id);
        await SecureStore.setItemAsync("username", username);
        await SecureStore.setItemAsync("userEmail", userEmail);
        await SecureStore.setItemAsync("userRole", role);
        setUserToken(token);
        setCurrentUser({ id, username, email: userEmail, role });
        Alert.alert("Giriş Başarılı", `Hoş geldiniz, ${username}!`);
        success = true;
      } else {
        success = false;
        await SecureStore.deleteItemAsync("userToken");
        await SecureStore.deleteItemAsync("userId");
        await SecureStore.deleteItemAsync("username");
        await SecureStore.deleteItemAsync("userEmail");
        await SecureStore.deleteItemAsync("userRole");
        setUserToken(null);
        setCurrentUser(null);
      }
    } catch (error: any) {
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userId");
      await SecureStore.deleteItemAsync("username");
      await SecureStore.deleteItemAsync("userEmail");
      await SecureStore.deleteItemAsync("userRole");
      setUserToken(null);
      setCurrentUser(null);
      Alert.alert("HATA", "Giriş işlemi sırasında bilinmeyen bir hata oluştu");
      success = false;
    } finally {
      setIsLoading(false);
    }
    return success;
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userId");
      await SecureStore.deleteItemAsync("username");
      await SecureStore.deleteItemAsync("userEmail");
      await SecureStore.deleteItemAsync("userRole");

      setUserToken(null);
      setCurrentUser(null);
      Alert.alert("Çıkış Yapıldı", "Hesabınızdan çıkış yaptınız.");
    } catch (e: any) {
      Alert.alert("Hata", "Çıkış yapılırken bir sorun oluştu:");
    } finally {
      setIsLoading(false);
    }
  };

  const authContextValue = useMemo(
    () => ({
      userToken,
      currentUser,
      signIn,
      signOut,
      isLoading,
    }),
    [userToken, currentUser, isLoading]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
