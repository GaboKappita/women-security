import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const OpcionesModal = ({
  modalVisible,
  setModalVisible,
  opcion1Texto,
  opcion2Texto,
  opcion3Texto,
  handleOpcion1,
  handleOpcion2,
  handleOpcion3,
  colorOpcion1,
  colorOpcion2,
  colorOpcion3,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  opcion1Texto?: string;
  opcion2Texto?: string;
  opcion3Texto?: string;
  handleOpcion1?: () => void;
  handleOpcion2?: () => void;
  handleOpcion3?: () => void;
  colorOpcion1?: string;
  colorOpcion2?: string;
  colorOpcion3?: string;
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className="flex-1 bg-black/50 justify-end items-center">
          <View className="w-full p-5 bg-white rounded-t-xl shadow-lg">
            {opcion1Texto && (
              <TouchableOpacity
                onPress={handleOpcion1}
                className="py-4 rounded-md mb-4"
                style={{ backgroundColor: colorOpcion1 }}
              >
                <Text className="text-center text-white">{opcion1Texto}</Text>
              </TouchableOpacity>
            )}

            {opcion2Texto && (
              <TouchableOpacity
                onPress={handleOpcion2}
                className="py-4 rounded-md mb-4"
                style={{ backgroundColor: colorOpcion2 }}
              >
                <Text className="text-center text-white">{opcion2Texto}</Text>
              </TouchableOpacity>
            )}

            {opcion3Texto && (
              <TouchableOpacity
                onPress={handleOpcion3}
                className="py-4 rounded-md mb-4"
                style={{ backgroundColor: colorOpcion3 }}
              >
                <Text className="text-center text-white">{opcion3Texto}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-gray-300 py-4 rounded-md mb-4"
            >
              <Text className="text-center text-gray-700">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OpcionesModal;
