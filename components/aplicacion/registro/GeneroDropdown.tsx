import { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const GeneroDropdown = ({
  value,
  onChange,
  generos,
  error,
  touched,
  isLoading,
}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedGenero = generos.find((genero: any) => genero.id === value);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        className={`${
          error && touched
            ? "border-[3px] border-red-500"
            : "border border-gray-300"
        } h-12 rounded-md px-4 flex-1 justify-center bg-white`}
      >
        <Text className={`${!value ? "text-gray-500" : "text-black"}`}>
          {selectedGenero ? selectedGenero.descripcion : "Género"}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 bg-black/50 justify-center items-center">
            <View className="w-10/12 p-5 bg-white rounded-xl shadow-lg">
              {isLoading ? (
                <View className="p-2">
                  <Text className="text-lg">Cargando géneros...</Text>
                </View>
              ) : generos.length === 0 ? (
                <View className="p-2">
                  <Text className="text-lg">No hay géneros disponibles</Text>
                </View>
              ) : (
                generos
                  .slice()
                  .sort((a: any, b: any) => {
                    const nombreA = a.descripcion?.toString() || "";
                    const nombreB = b.descripcion?.toString() || "";
                    return nombreA.localeCompare(nombreB);
                  })
                  .map((genero: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      className="p-2"
                      onPress={() => {
                        onChange(genero.id);
                        setModalVisible(false);
                      }}
                    >
                      <Text className="text-lg">{genero.descripcion}</Text>
                    </TouchableOpacity>
                  ))
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default GeneroDropdown;
