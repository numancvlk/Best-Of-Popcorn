import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";

import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";
import authService from "src/services/authService";
import styles from "src/styles/RegisterScreenStyle";

type RegisterScreenType = StackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: RegisterScreenType) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userData = await authService.register(username, email, password);
      Alert.alert("Başarılı", "Kaydınız oluşturuldu! Giriş yapabilirsiniz.");
      navigation.navigate("Login");
    } catch (err: any) {
      const errorMessage = err.message || "Bilinmeyen bir hata oluştu!";
      Alert.alert("Hata", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BEST OF POPCORN - KAYIT</Text>

      <TextInput
        style={styles.input}
        placeholder="KULLANICI ADI"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

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
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Kayıt Ol!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchableButton, styles.secondaryButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={[styles.buttonText, styles.loginText]}>
          Zaten bir hesabın var mı? Giriş Yap!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
