import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeTabParamList, RootStackParamList } from "src/types/types";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

import adminService from "src/services/adminService";

import { useAuth } from "src/context/AuthContext";
import styles from "src/styles/AdminPanelStyles";

import { Colors, Spacing } from "src/styles/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type AdminPanelProps = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, "AdminPanel">,
  StackScreenProps<RootStackParamList>
>;

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  navigation,
  route,
}: AdminPanelProps) => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<string>("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const allUsers = await adminService.listAllUsers();
      setUsers(allUsers);
    } catch (error) {
      Alert.alert("HATA", "Kullanıcılar getirilirken bir sorun oluştu");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "adminRole") {
      Alert.alert("Bu işlemi yapmak için yetkiniz yok");
      navigation.goBack();
    }
    fetchUsers();
  }, [fetchUsers, currentUser, navigation]);

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) {
      Alert.alert("HATA", "Seçilen kullanıcı bulunamadı");
      return;
    }

    if (
      selectedUser._id === currentUser?.id &&
      newRole.toLowerCase() !== "adminRole"
    ) {
      Alert.alert("HATA", "Kendi rolünüzü güncelleyemezsiniz.");
    }

    try {
      await adminService.updateUserRole(selectedUser?._id, newRole);
      Alert.alert(
        "BAŞARILI",
        `${selectedUser.username} kullanıcısının rolü güncellendi`
      );
      setModalVisible(false);
      fetchUsers();
    } catch (error) {
      Alert.alert(
        "HATA",
        "Kullanıcının rolü güncellenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz"
      );
    }
  };

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setModalVisible(true);
  };

  const renderUserItem = ({ item }: { item: User }) => {
    return (
      <View style={styles.userItem}>
        <View style={styles.userInfo}>
          <Text style={styles.userText}>
            <Text style={{ fontWeight: "bold" }}>Kullanıcı Adı:</Text>{" "}
            <Text style={styles.userRole}>{item.username}</Text>
          </Text>
          <Text style={styles.userText}>
            <Text style={{ fontWeight: "bold" }}>E-Posta:</Text> {item.email}
          </Text>
          <Text style={[styles.userText, styles.userTextLast]}>
            {" "}
            <Text style={{ fontWeight: "bold" }}>Rol:</Text>{" "}
            <Text style={styles.userRole}>{item.role}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => openRoleModal(item)}
            style={styles.updateButton}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={20}
              color={Colors.textHighlight}
            />
            <Text style={styles.updateButtonText}>Rolü Güncelle</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialCommunityIcons
          name="loading"
          size={50}
          color={Colors.primary}
        />
        <Text style={styles.loadingText}>Kullanıcılar yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MaterialCommunityIcons
              name="account-details"
              size={30}
              color={Colors.textHighlight}
              style={{ marginBottom: Spacing.small }}
            />

            <Picker
              selectedValue={newRole}
              style={styles.picker}
              onValueChange={(itemValue) => setNewRole(itemValue as string)}
              itemStyle={
                Platform.OS === "android" ? styles.pickerItem : undefined
              }
            >
              <Picker.Item label="Admin Role" value="adminRole" />
              <Picker.Item label="Movie Role" value="movieRole" />
              <Picker.Item label="Actor Role" value="actorRole" />
            </Picker>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={20}
                  color={Colors.textHighlight}
                />

                <Text style={styles.textStyle}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonUpdate]}
                onPress={handleUpdateRole}
              >
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={20}
                  color={Colors.textHighlight}
                />
                <Text style={styles.textStyle}>Güncelle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminPanel;
