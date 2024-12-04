import React, { useEffect, useState } from "react";
import {
  useEliminarUsuarioGrupoMutation,
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
import OpcionesModal from "./ModalOpciones";

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
  const [modalVisibleAgregarPersona, setModalVisibleAgregarPersona] =
    useState(false);
  const [modalVisibleOpciones, setModalVisibleOpciones] = useState(false);
  const [datosGrupo, setDatosGrupo] = useState<any>({
    grupo: {},
    miembros: [],
  });
  const [celularPersona, setCelularPersona] = useState("");
  const [integrante, setIntegrante] = useState<any>();
  const [grupoDataUpdated, setGrupoDataUpdated] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const {
    data: dataGrupoCompleto = {
      grupo: {},
      miembros: [],
    },
    error: errorGrupoCompleto,
    isLoading: isLoadingGrupoCompleto,
    refetch: refetchGrupoCompleto,
  } = useListarGrupoCompletoQuery({ id_grupo: grupoId });

  useEffect(() => {
    const fetchGrupoData = async () => {
      if (modalVisibleGrupo) {
        setIsFetchingData(true); // Activa la bandera de carga
        setDatosGrupo({
          grupo: {},
          miembros: [],
        }); // Limpia los datos anteriores

        try {
          const result = await refetchGrupoCompleto(); // Ejecuta refetch y obtiene la nueva data

          if (result?.data) {
            setDatosGrupo(result.data); // Usa la data fresca obtenida
          }
        } catch (error) {
          console.error("Error al cargar datos del grupo:", error);
        } finally {
          setIsFetchingData(false); // Desactiva la bandera de carga
        }
      } else {
        setDatosGrupo({
          grupo: {},
          miembros: [],
        }); // Limpia los datos al cerrar el modal
      }
    };

    fetchGrupoData();
  }, [modalVisibleGrupo, grupoDataUpdated, refetchGrupoCompleto]);

  const [
    invitarPersona,
    { isLoading: isLoadingInvitado, error: errorInvitado, data: dataInvitado },
  ] = useInvitarUsuarioMutation();

  const handleAgregarPersona = () => {
    setModalVisibleAgregarPersona(false);
    setModalVisibleGrupo(false);
    invitarPersona({
      id_grupo: grupoId,
      celular: celularPersona,
      id_usuario_emisor: id_usuario,
    })
      .unwrap()
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.error("Error al enviar el Alerta:", error);
      });
    setCelularPersona("");
  };

  const [
    eliminarUsuarioGrupo,
    {
      isLoading: isLoadingEliminareliminarUsuarioGrupo,
      error: errorEliminareliminarUsuarioGrupo,
      data: dataEliminareliminarUsuarioGrupo,
    },
  ] = useEliminarUsuarioGrupoMutation();

  const handleEliminarPersona = () => {
    eliminarUsuarioGrupo({
      id_grupo: grupoId,
      id_usuario: integrante.id_usuario,
    })
      .unwrap()
      .then((response) => {
        setGrupoDataUpdated((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario del grupo:", error);
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
          <View className="w-11/12 min-h-[150px] max-h-[550px] p-5 bg-[#F5F5F5] rounded-xl shadow-lg">
            {isLoadingGrupoCompleto || isFetchingData ? (
              <Text className="text-center text-base my-4 w-full">
                Cargando detalles...
              </Text>
            ) : errorGrupoCompleto ? (
              <Text>Error al cargar detalles</Text>
            ) : (
              <>
                <Text className="text-lg font-bold text-center">
                  {datosGrupo?.grupo?.nombre_grupo}
                </Text>
                <Text className="text-base text-center mb-4">
                  {datosGrupo?.grupo?.descripcion}
                </Text>

                <ScrollView>
                  {/* Mostrar el creador del grupo */}
                  {datosGrupo?.grupo && (
                    <>
                      <Text className="p-2 mx-2 text-lg font-bold">
                        Creador del grupo:
                      </Text>
                      <View className="p-2 mx-2 mb-2 bg-white rounded shadow shadow-black">
                        <Text className="text-lg">
                          {
                            datosGrupo.miembros.find(
                              (m: any) =>
                                m.id_usuario === datosGrupo.grupo.id_usuario
                            )?.persona.nombre
                          }{" "}
                          {
                            datosGrupo.miembros.find(
                              (m: any) =>
                                m.id_usuario === datosGrupo.grupo.id_usuario
                            )?.persona.apellido
                          }
                        </Text>
                        <Text className="text-base">
                          {
                            datosGrupo.miembros.find(
                              (m: any) =>
                                m.id_usuario === datosGrupo.grupo.id_usuario
                            )?.persona.numero_telefono
                          }
                        </Text>
                      </View>
                    </>
                  )}

                  {/* Mostrar los miembros excluyendo al creador */}
                  <Text className="p-2 mx-2 text-lg font-bold">
                    Miembros del grupo:
                  </Text>
                  {datosGrupo?.miembros?.filter(
                    (m: any) => m.id_usuario !== datosGrupo.grupo.id_usuario
                  ).length > 0 ? (
                    datosGrupo.miembros
                      .filter(
                        (m: any) => m.id_usuario !== datosGrupo.grupo.id_usuario
                      )
                      .map((integrante: any, index: number) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.75}
                          className="p-2 mx-2 mb-2 bg-white rounded shadow shadow-black"
                          onPress={() => {
                            if (id_usuario === datosGrupo?.grupo?.id_usuario) {
                              setIntegrante({});
                              setIntegrante(integrante);
                              setModalVisibleOpciones(true);
                            } else {
                              console.log(
                                "No tienes permisos para realizar esta acción."
                              );
                            }
                          }}
                        >
                          <Text className="text-lg">
                            {integrante.persona.nombre}{" "}
                            {integrante.persona.apellido}
                          </Text>
                          <Text className="text-base">
                            {integrante.persona.numero_telefono}
                          </Text>
                        </TouchableOpacity>
                      ))
                  ) : (
                    <Text className="p-2 mx-2 text-base text-gray-500">
                      No hay más miembros en este grupo.
                    </Text>
                  )}
                </ScrollView>
              </>
            )}

            {/* Botones de acción */}
            <View className="flex-row mt-4 justify-between">
              <TouchableOpacity
                onPress={() => {
                  setDatosGrupo({
                    grupo: {},
                    miembros: [],
                  });
                  setGrupoId("");
                  setModalVisibleGrupo(false);
                }}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleAgregarPersona(true);
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

      {/* Añadir persona */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleAgregarPersona}
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
              maxLength={9}
              keyboardType="phone-pad"
            />

            {/* Botones de acción */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setCelularPersona("");
                  setModalVisibleAgregarPersona(false);
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

      {/* Opciones persona */}
      <OpcionesModal
        modalVisible={modalVisibleOpciones}
        setModalVisible={setModalVisibleOpciones}
        colorOpcion1="#ff2222"
        opcion1Texto="Eliminar"
        handleOpcion1={() => {
          handleEliminarPersona();
          setModalVisibleOpciones(false);
        }}
      />
    </>
  );
};

export default GrupoModal;
