import { useEffect, useState } from "react";
import {
  useInvitarUsuarioMutation,
  useListarGrupoCompletoQuery,
} from "../../services/api";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const GrupoModal = ({
  grupoId,
  setGrupoId,
  modalVisibleGrupo,
  setModalVisibleGrupo,
  id_usuario,
}: {
  grupoId: string;
  setGrupoId: (id: string) => void;
  modalVisibleGrupo: boolean;
  setModalVisibleGrupo: (visible: boolean) => void;
  id_usuario: string;
}) => {
  const [modalVisiblePersona, setModalVisiblePersona] = useState(false);
  const [triggerQuery, setTriggerQuery] = useState(false);
  const [celularPersona, setCelularPersona] = useState("");

  const {
    data: dataGrupoCompleto,
    error: errorGrupoCompleto,
    isLoading: isLoadingGrupoCompleto,
    refetch: refetchGrupoCompleto,
  } = useListarGrupoCompletoQuery(
    { id_grupo: grupoId },
    { skip: !triggerQuery }
  );

  // Reinicia el trigger cada vez que se abra el modal
  useEffect(() => {
    if (modalVisibleGrupo) {
      setTriggerQuery(true);
    }
  }, [modalVisibleGrupo]);

  // Maneja el cierre del modal y reinicia los datos
  const handleCloseModal = () => {
    setGrupoId("");
    setTriggerQuery(false);
    setModalVisibleGrupo(false);
  };

  useEffect(() => {
    if (!modalVisibleGrupo) {
      setTriggerQuery(false);
    }
  }, [modalVisibleGrupo]);

  const handleAgregarPersona = () => {
    handleAgregarPersonaGrupo(celularPersona);
    setCelularPersona("");
    setModalVisiblePersona(false);
    setModalVisibleGrupo(false);
  };

  const [
    invitarPersona,
    { isLoading: isLoadingInvitado, error: errorInvitado, data: dataInvitado },
  ] = useInvitarUsuarioMutation();

  const handleAgregarPersonaGrupo = async (celular: string) => {
    const data = {
      id_grupo: grupoId,
      celular: celular,
      id_usuario_creador: id_usuario,
    };

    invitarPersona(data)
      .unwrap()
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.error("Error al enviar el Alerta:", error);
      });
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleGrupo}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-11/12 p-5 bg-[#F5F5F5] rounded-xl shadow-lg">
            {/* Muestra el estado de carga o los detalles */}
            {isLoadingGrupoCompleto ? (
              <Text className="text-center w-full">Cargando detalles...</Text>
            ) : errorGrupoCompleto ? (
              <Text>Error al cargar detalles</Text>
            ) : (
              <>
                <Text className="text-lg font-bold text-center">
                  {dataGrupoCompleto?.grupo?.nombre_grupo}
                </Text>
                <Text className="text-base text-center mb-4">
                  {dataGrupoCompleto?.grupo?.descripcion}
                </Text>
              </>
            )}

            {/* Mostrar los integrantes */}
            <ScrollView>
              {dataGrupoCompleto?.miembros?.map(
                (integrante: any, index: number) => (
                  <View
                    key={index}
                    className="p-2 mb-2 bg-white rounded shadow"
                  >
                    <Text className="text-lg">
                      {integrante.persona.nombre} {integrante.persona.apellido}
                    </Text>
                    <Text className="text-base">
                      {integrante.persona.numero_telefono}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>

            {/* Botones de acción */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={handleCloseModal}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisiblePersona(true);
                }}
                className="bg-blue-500 p-2 rounded-md flex-1"
                disabled={isLoadingGrupoCompleto}
              >
                {isLoadingGrupoCompleto ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Text className="text-center text-white">Añadir persona</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisiblePersona}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Añadir persona
            </Text>

            <TextInput
              value={celularPersona}
              onChangeText={setCelularPersona}
              placeholder="Número de celular de la persona"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />

            {/* Botones de acción */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setCelularPersona("");
                  setModalVisiblePersona(false);
                }}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAgregarPersona}
                className="bg-blue-500 p-2 rounded-md flex-1"
              >
                <Text className="text-center text-white">Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default GrupoModal;
