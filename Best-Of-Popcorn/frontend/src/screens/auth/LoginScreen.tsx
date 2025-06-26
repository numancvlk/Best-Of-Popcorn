import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";

import { useState } from "react";
import authService from "src/services/authService";

type LoginScreenType = StackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await authService.login(email, password);
      Alert.alert("Başarılı", "Giriş Başarılı");
      console.log("Veri:", userData);
      navigation.navigate("Home");
    } catch (err: any) {
      const errorMessage = err.message || "Bilinmeyen bir hata oluştu!";
      Alert.alert("Hata", errorMessage);
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>

      <TextInput
        placeholder="E-POSTA"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="ŞİFRE"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Giriş Yap!" onPress={handleLogin} />

      <Button
        title="Hesabın Yok mu? KAYIT OL!"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}
