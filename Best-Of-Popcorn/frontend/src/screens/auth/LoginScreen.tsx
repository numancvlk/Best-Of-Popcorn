import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

//--------------DAHİLİ--------------------
import { useAuth } from "src/context/AuthContext";
import { RootStackParamList } from "../../types/types";
import { Colors } from "src/styles/GlobalStyles";
import styles from "src/styles/LoginScreenStyle";

type LoginScreenType = StackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      const success = await signIn(email, password);

      if (success) {
        setEmail("");
        setPassword("");
      } else {
        setPassword("");
      }
    } catch (err: any) {
      Alert.alert(
        "Giriş Hatası",
        "Giriş yaparken hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BEST OF POPCORN GİRİŞ</Text>

      <TextInput
        style={styles.input}
        placeholder="E-POSTA"
        placeholderTextColor={Colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        selectionColor={Colors.primary}
      />

      <TextInput
        style={styles.input}
        placeholder="ŞİFRE"
        placeholderTextColor={Colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        selectionColor={Colors.primary}
      />

      <TouchableOpacity
        style={[styles.touchableButton, styles.primaryButton]}
        onPress={handleLogin}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Giriş Yap!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchableButton, styles.secondaryButton]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={[styles.buttonText, styles.registerText]}>
          Henüz hesabın yok mu? Kayıt Ol!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
