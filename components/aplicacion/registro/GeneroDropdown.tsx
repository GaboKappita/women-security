import { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const GeneroDropdown = ({ value, onChange }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const opciones = ["Masculino", "Femenino", "Otro"];

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        className="h-12 border border-gray-300 rounded-md px-4 flex-1 justify-center bg-white"
      >
        <Text className={`${!value ? "text-gray-500" : "text-black"}`}>
          {value || "Género"}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 bg-black/50 justify-center items-center">
            <View className="w-10/12 p-5 bg-white rounded-xl shadow-lg">
              {opciones.map((opcion) => (
                <TouchableOpacity
                  key={opcion}
                  className="p-2"
                  onPress={() => {
                    onChange(opcion);
                    setModalVisible(false);
                  }}
                >
                  <Text className="text-lg">{opcion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default GeneroDropdown;
