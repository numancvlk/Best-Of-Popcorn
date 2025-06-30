import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  SafeAreaView,
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
      console.log("Selected User yada New Role boş");
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
      console.log("Rol güncellenirken bir hata oluştu");
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
        <View>
          <Text>Kullanıcı ID: {item._id}</Text>
          <Text>Kullanıcı Adı: {item.username}</Text>
          <Text>Kullanıcı E-Posta: {item.email}</Text>
          <Text>Kullanıcı Rolü: {item.role}</Text>
        </View>
        <TouchableOpacity onPress={() => openRoleModal(item)}>
          <Text>Rolü Güncelle</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>
          Kullanıcılar yükleniyor...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Admin Paneli</Text>

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
            <Text style={styles.modalTitle}>
              Rol Güncelle: {selectedUser?.username}
            </Text>

            <Picker
              selectedValue={newRole}
              style={styles.picker}
              onValueChange={(itemValue) => setNewRole(itemValue as string)}
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
                <Text style={styles.textStyle}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonUpdate]}
                onPress={handleUpdateRole}
              >
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
