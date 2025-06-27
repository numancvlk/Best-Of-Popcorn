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
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          setUserToken(token);
        }
      } catch (e) {
        console.log("Token yüklenirken hata oluştu");
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
      const token = response.token;
      if (token) {
        await SecureStore.setItemAsync("userToken", token);
        setUserToken(token);
        Alert.alert("Giriş Başarılı", "Hoş geldiniz!");
        success = true;
      } else {
        success = false;
      }
    } catch (error: any) {
      const errorMessage =
        error.message || "Giriş işlemi sırasında bilinmeyen bir hata oluştu.";

      Alert.alert("Giriş Hatası", errorMessage);
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
      setUserToken(null);
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
      signIn,
      signOut,
      isLoading,
    }),
    [userToken, isLoading]
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
