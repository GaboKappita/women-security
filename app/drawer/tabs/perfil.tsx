import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";

export default function PerfilScreen() {
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const [modalVisibleAgregarGrupo, setModalVisibleAgregarGrupo] =
    useState(false);
  const [nombreGrupo, setNombreGrupo] = useState("");

  const id_usuario = persona.id_persona;
  const imagen_usuario = perfil.imagen_usuario;

  console.log(persona);
  console.log(perfil);
  

  return (
    <ScrollView className="bg-[#F5F5F5] flex p-4 w-full">
      <StatusBar style="light" backgroundColor="black" />
      <View className="bg-white shadow shadow-black rounded p-4 mb-4">
        <View className="flex flex-row justify-center items-center w-full">
          <View className="w-16 h-16 bg-white mr-4 border-black border-2 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              className="w-full h-full"
              source={
                imagen_usuario
                  ? { uri: imagen_usuario }
                  : require("../../../assets/profile-user.png")
              }
            />
          </View>
          <View>
            <Text className="text-black text-lg flex">
              {persona.nombre} {persona.apellido}
            </Text>
            <Text className="text-black text-base">
              {persona.numero_telefono}
            </Text>
          </View>
        </View>
      </View>

      {/* Agregar grupo */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleAgregarGrupo}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Crear grupo
            </Text>

            <TextInput
              value={nombreGrupo}
              onChangeText={setNombreGrupo}
              placeholder="Nombre del grupo"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />

            {/* Botones de acción */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleAgregarGrupo(false);
                }}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                className="bg-blue-500 p-2 rounded-md flex-1"
              >
                <Text className="text-center text-white">Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
