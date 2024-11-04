import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface InputOpcionesProps {
  options: any;
  placeholder?: string;
  onSelect: (selectedOption: any) => void;
}

const InputOpciones: React.FC<InputOpcionesProps> = ({
  options,
  placeholder = "Selecciona una opción",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: any) => {
    setSelected(option);
    onSelect(option); // Notificar al componente padre
    setIsOpen(false); // Cerrar el menú después de seleccionar
  };

  return (
    <View className="relative w-full">
      <TouchableOpacity
        className="p-4 border border-gray-300 rounded-md bg-white shadow-md"
        onPress={toggleDropdown}
      >
        <Text className="text-gray-700">
          {selected ? selected.descripcion : placeholder}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <ScrollView className="bg-white border mt-1 border-gray-300 rounded-md shadow-lg max-h-60">
          {options.map((item: any) => (
            <TouchableOpacity
              key={item.id_gravedad}
              className="p-3 hover:bg-gray-200 active:bg-gray-300 border-b border-gray-200 last:border-b-0"
              onPress={() => handleOptionSelect(item)}
            >
              <Text className="text-gray-700">{item.descripcion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default InputOpciones;
