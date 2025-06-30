import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

//----------------DAHİLİ---------------------
import { RootStackParamList } from "../../types/types";
import { Colors } from "src/styles/GlobalStyles";
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
      Alert.alert(
        "KAYIT HATASI",
        "Kayıt oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BEST OF POPCORN KAYIT</Text>

      <TextInput
        style={styles.input}
        placeholder="KULLANICI ADI"
        placeholderTextColor={Colors.textSecondary}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        selectionColor={Colors.primary}
      />

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
