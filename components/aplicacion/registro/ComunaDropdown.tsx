import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ComunaDropdown = ({
  value,
  onChange,
  comunas,
  error,
  touched,
  isLoadingComunas,
}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedComuna = comunas.find(
    (comuna: any) => comuna.id_comuna === value
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        className={`${
          error && touched
            ? "border-[3px] border-red-500"
            : "border border-gray-300"
        } h-12 rounded-md justify-center items-start px-4 mb-4 bg-white`}
      >
        <Text className={`${!value ? "text-gray-500" : "text-black"}`}>
          {selectedComuna ? selectedComuna.nombre : "Comuna"}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 bg-black/50 justify-center items-center">
            <View className="w-10/12 p-5 max-h-[500px] bg-white rounded-xl shadow-lg">
              <View>
                <Text className="text-center text-xl mb-4 font-bold">
                  Selecciona tu comuna
                </Text>
              </View>
              <ScrollView>
                {isLoadingComunas ? (
                  <View className="p-2">
                    <Text className="text-lg">Cargando comunas...</Text>
                  </View>
                ) : comunas.length === 0 ? (
                  <View className="p-2">
                    <Text className="text-lg">No hay comunas disponibles</Text>
                  </View>
                ) : (
                  comunas
                    .slice()
                    .sort((a: any, b: any) => {
                      const nombreA = a.nombre?.toString() || "";
                      const nombreB = b.nombre?.toString() || "";
                      return nombreA.localeCompare(nombreB);
                    })
                    .map((comuna: any, index: number) => (
                      <TouchableOpacity
                        key={index}
                        className="p-2"
                        onPress={() => {
                          onChange(comuna.id_comuna);
                          setModalVisible(false);
                        }}
                      >
                        <Text className="text-lg">{comuna.nombre}</Text>
                      </TouchableOpacity>
                    ))
                )}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default ComunaDropdown;
