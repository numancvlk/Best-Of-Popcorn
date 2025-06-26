import React from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";

import { useState } from "react";
import authService from "src/services/authService";

import styles from "src/styles/LoginScreenStyle";

type LoginScreenType = StackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await authService.login(email, password);
      Alert.alert("Başarılı", "Giriş Başarılı");
      navigation.navigate("Home");
    } catch (err: any) {
      const errorMessage = err.message || "Bilinmeyen bir hata oluştu!";
      Alert.alert("Hata", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BEST OF POPCORN - GİRİŞ</Text>

      <TextInput
        style={styles.input}
        placeholder="E-POSTA"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="ŞİFRE"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
