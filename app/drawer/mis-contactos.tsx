import React, { useCallback, useState } from "react";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useGuardarContactoMutation,
  useListarContactosQuery,
} from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function MisContactosScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);

  const id_usuario = persona.id_persona;

  const {
    data: dataContactos,
    error: errorContactos,
    isLoading: isLoadingContactos,
    refetch,
  } = useListarContactosQuery({ id_usuario: id_usuario });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const [contactNombres, setContactNombres] = useState("");
  const [contactCelular, setContactCelular] = useState("");
  const [contactApellidos, setContactApellidos] = useState("");
  const [contactCorreo, setContactCorreo] = useState("");

  const handleAddContact = () => {
    handleEnviarAlerta(
      contactNombres,
      contactApellidos,
      contactCelular,
      contactCorreo
    );

    setModalVisible(false);
  };

  const [
    guardarContacto,
    { isLoading: isLoadingGuardado, error: errorGuardado, data: dataGuardado },
  ] = useGuardarContactoMutation();

  const handleEnviarAlerta = async (
    nombres: string,
    apellidos: string,
    celular: string,
    correo: string
  ) => {
    const data = {
      nombres: nombres,
      apellidos: apellidos,
      celular: celular,
      email: correo,
      id_usuario: id_usuario,
    };

    guardarContacto(data)
      .unwrap()
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.error("Error al enviar el Alerta:", error);
      });
  };

  return (
    <ScrollView
      className="bg-[#F5F5F5] flex p-4 w-full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="light" backgroundColor="black" />
      <LogoVolver
        titulo="WOMEN'S SECURITY"
        estilo_titulo="text-black text-2xl font-bold mb-4"
        onPressBack={() => {
          router.push("/drawer/tabs/home");
        }}
      />
      <View className="relative w-full py-2 flex items-center">
        <Text className="w-10/12 text-black text-center">
          Estas son tus contactos registrados.
        </Text>
      </View>
      <View className="mt-4">
        <TouchableOpacity
          activeOpacity={0.75}
          className="bg-[#ff80b5] justify-center items-center rounded p-3 mb-4"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-base">+ Agregar un contacto</Text>
        </TouchableOpacity>
        {!isLoadingContactos && dataContactos.CONTACTO && (
          <View>
            {dataContactos?.CONTACTO.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.75}
                className="bg-white p-4 mb-4 rounded-lg shadow shadow-black w-full relative"
              >
                <Text className="text-lg text-black">
                  {item.nombres} {item.apellidos}
                </Text>
                <Text className="text-lg text-black">{item.email}</Text>
                <Text className="text-lg text-black">{item.celular}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Agregar Contacto
            </Text>

            {/* Campo para el nombre del contacto */}
            <TextInput
              value={contactNombres}
              onChangeText={setContactNombres}
              placeholder="Nombres del contacto"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />

            {/* Campo para el apellido del contacto */}
            <TextInput
              value={contactApellidos}
              onChangeText={setContactApellidos}
              placeholder="Apellidos del contacto"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />

            {/* Campo para el número de teléfono */}
            <TextInput
              value={contactCelular}
              onChangeText={setContactCelular}
              placeholder="Número de teléfono"
              keyboardType="phone-pad"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />

            {/* Campo para el correo del contacto */}
            <TextInput
              value={contactCorreo}
              onChangeText={setContactCorreo}
              placeholder="Correo electronico"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />

            {/* Botones de acción */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddContact}
                className="bg-blue-500 p-2 rounded-md flex-1"
              >
                <Text className="text-center text-white">Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
