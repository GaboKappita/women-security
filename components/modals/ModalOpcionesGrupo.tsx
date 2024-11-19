import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useEliminarGrupoMutation } from "../../services/api";

const GrupoOpcionesModal = ({
  id_grupo,
  modalVisibleGrupo,
  setModalVisibleGrupo,
  setIdGrupoOpciones,
}: {
  id_grupo: any;
  setModalVisibleGrupo: (visible: boolean) => void;
  modalVisibleGrupo: boolean;
  setIdGrupoOpciones: (id: any) => void;
}) => {
  const [eliminarGrupo, { isLoading, error, data }] =
    useEliminarGrupoMutation();

  const handleEliminar = async () => {
    try {
      await eliminarGrupo({ id_grupo });
      handleCloseModal();
    } catch (error) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIdGrupoOpciones("");
    setModalVisibleGrupo(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisibleGrupo}>
      <View className="flex-1 bg-black/50 justify-end items-center">
        <View className="w-full p-5 bg-white rounded-t-xl shadow-lg">
          <Text className="text-lg font-bold text-center mb-4">
            Opciones grupo
          </Text>

          <TouchableOpacity
            onPress={handleCloseModal}
            className="bg-green-500 py-4 rounded-md mb-4"
          >
            <Text className="text-center text-white">Seleccionar grupo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleEliminar}
            className="bg-red-500 py-4 rounded-md mb-4"
          >
            <Text className="text-center text-white">Eliminar grupo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCloseModal}
            className="bg-gray-300 py-4 rounded-md mb-4"
          >
            <Text className="text-center text-gray-700">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GrupoOpcionesModal;
