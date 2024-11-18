import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";

interface CustomSelectorProps {
  options: any;
  placeholderText?: string;
  onSelect: (selectedItem: any) => void;
}

const CustomSelector: React.FC<CustomSelectorProps> = ({
  options,
  placeholderText = "Selecciona una opción...",
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<any | null>(null);

  // Filtrar las opciones basado en el término de búsqueda
  const filteredOptions = options.filter((option: any) =>
    option.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-white rounded-lg px-4 py-3 shadow shadow-black"
      >
        <Text className="text-base text-gray-800">
          {selectedOption ? selectedOption.descripcion : placeholderText}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 p-4 bg-white">
          <TextInput
            className="border border-gray-300 rounded-lg text-lg py-3 px-4 mb-4"
            placeholder="Buscar..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.id_gravedad.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 border-b border-gray-300"
                onPress={() => handleSelect(item)}
              >
                <Text className="text-base">{item.descripcion}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            className="mt-5 p-2 bg-[#4f66fe] rounded-lg items-center"
            onPress={() => {
              setModalVisible(false);
              setSearchTerm("");
            }}
          >
            <Text className="text-white text-base">Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CustomSelector;
