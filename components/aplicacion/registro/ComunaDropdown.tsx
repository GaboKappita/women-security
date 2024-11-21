import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ComunaDropdown = ({ value, onChange, comunas }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedComuna = comunas.find(
    (comuna: any) => comuna.id_comuna === value
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        className="h-12 border border-gray-300 rounded-md px-4 mb-4 justify-center bg-white"
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
                {comunas
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
                  ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default ComunaDropdown;
