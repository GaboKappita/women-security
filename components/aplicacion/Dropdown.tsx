import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Dropdown = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setModalVisible(false); // Cerrar el modal al seleccionar una opción
  };

  const options = ["Opción 1", "Opción 2", "Opción 3"];

  return (
    <View className="p-5">
      {/* Ícono de 3 puntos */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={30}
          color="black"
        />
      </TouchableOpacity>

      {/* Mostrar la opción seleccionada */}
      <Text className="mt-4">{selectedOption || "Selecciona una opción"}</Text>

      {/* Modal para el dropdown */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-md shadow-lg p-5">
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectOption(option)}
                className="p-3"
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;
