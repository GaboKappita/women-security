import React, { useCallback, useState } from "react";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  useEditarClaveMutation,
  useEliminarClaveMutation,
  useInsertarClaveMutation,
  useListarClavesQuery,
  useListarGravedadQuery,
  useListarMensajesQuery,
} from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import OpcionesModal from "../../components/modals/ModalOpciones";
import { Modal } from "react-native";
import CustomSelector from "../../components/aplicacion/CustomSelector";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MisClavesScreen() {
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [modalVisibleOpciones, setModalVisibleOpciones] = useState(false);
  const [modalVisibleAgregar, setModalVisibleAgregar] = useState(false);
  const [modalVisibleEditar, setModalVisibleEditar] = useState(false);
  const [modalVisibleGravedades, setModalVisibleGravedades] = useState(false);
  const [selectedGravedad, setSelectedGravedad] = useState<any>();
  const [palabraClave, setPalabraClave] = useState("");
  const [idPalabraClave, setIdPalabraClave] = useState<any>();
  const [nuevaPalabraClave, setNuevaPalabraClave] = useState("");

  const id_usuario = persona.id_persona;

  const {
    data: dataGravedad = { gravedades: [] },
    error: errorGravedad,
    isLoading: isLoadingGravedad,
  } = useListarGravedadQuery({});

  const {
    data: dataMensajes = { mensajes: [] },
    error: errorMensajes,
    isLoading: isLoadingMensajes,
  } = useListarMensajesQuery({ id_persona: id_usuario });

  const mensaje_predeterminado = dataMensajes?.mensajes[0];

  const {
    data: dataClaves = { clavesConDetalles: [] },
    error: errorClaves,
    isLoading: isLoadingClaves,
    refetch,
  } = useListarClavesQuery({ id_usuario: id_usuario });

  const [
    guardarClave,
    {
      isLoading: isLoadingGuardarClave,
      error: errorGuardarClave,
      data: dataGuardarClave,
    },
  ] = useInsertarClaveMutation();

  const handleAgregarClave = () => {
    setModalVisibleAgregar(false);
    setRefetching(true);
    guardarClave({
      id_gravedad: selectedGravedad.id_gravedad,
      id_usuario: id_usuario,
      palabra: nuevaPalabraClave,
      id_mensaje: mensaje_predeterminado.id_mensaje,
    })
      .unwrap()
      .then((response: any) => {
        setRefreshing(true);
        refetch().finally(() => {
          setRefreshing(false);
          setRefetching(false);
        });
      })
      .catch((error: any) => {
        setRefetching(false);
        console.error("Error al enviar el Alerta:", error);
      });

    setSelectedGravedad({});
    setNuevaPalabraClave("");
  };

  const [
    editarClave,
    {
      isLoading: isLoadingEditarClave,
      error: errorEditarClave,
      data: dataEditarClave,
    },
  ] = useEditarClaveMutation();

  const handleEditarClave = () => {
    setModalVisibleEditar(false);
    setRefetching(true);
    editarClave({
      id_clave: idPalabraClave,
      id_gravedad: selectedGravedad.id_gravedad,
      id_mensaje: mensaje_predeterminado.id_mensaje,
      palabra: palabraClave,
    })
      .unwrap()
      .then((response) => {
        setRefreshing(true);
        refetch().finally(() => {
          setRefreshing(false);
          setRefetching(false);
        });
      })
      .catch((error) => {
        setRefetching(false);
        console.error("Error al editar la clave:", error);
      });
    setSelectedGravedad({});
    setPalabraClave("");
  };

  const [
    eliminarClave,
    {
      isLoading: isLoadingEliminarClave,
      error: errorEliminarClave,
      data: dataEliminarClave,
    },
  ] = useEliminarClaveMutation();

  const handleEliminarClave = () => {
    setModalVisibleEditar(false);
    setRefetching(true);
    eliminarClave({
      id_clave: idPalabraClave,
    })
      .unwrap()
      .then((response) => {
        setRefreshing(true);
        refetch().finally(() => {
          setRefreshing(false);
          setRefetching(false);
        });
      })
      .catch((error) => {
        setRefetching(false);
        console.error("Error al eliminar la clave:", error);
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  return (
    <ScrollView
      className="bg-[#F5F5F5] flex p-4 w-full relative"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="light" backgroundColor="black" />
      <LogoVolver
        titulo="WOMEN'S SECURITY"
        estilo_titulo="text-black text-2xl font-bold mb-4"
        onPressBack={() => {
          router.push("/drawer/tabs/home");
        }}
      />
      <View className="relative w-full py-2 mb-4 flex items-center">
        <Text className="w-10/12 text-black text-center">
          Estas son tus claves registradas.
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.75}
        className="bg-[#ff80b5] justify-center items-center rounded p-4 mb-4"
        onPress={() => {
          setNuevaPalabraClave("");
          setSelectedGravedad({});
          setModalVisibleAgregar(true);
        }}
      >
        <Text className="text-white text-base">
          + Agregar una palabra clave
        </Text>
      </TouchableOpacity>

      <View className="mt-4">
        <View className="w-full flex flex-row p-2">
          <Text className="text-lg flex-1 text-center text-black">
            Palabra clave
          </Text>
          <Text className="text-lg flex-1 text-center text-black">
            Gravedad
          </Text>
        </View>
        <View className="w-11/12 h-[2px] bg-gray-400 mx-auto my-2" />
        {isLoadingClaves || refreshing || refetching ? (
          <Text className="text-center text-lg mt-4 text-black">
            Cargando...
          </Text>
        ) : dataClaves?.clavesConDetalles &&
          dataClaves?.clavesConDetalles?.length > 0 ? (
          <View>
            {dataClaves.clavesConDetalles.map((item: any) => (
              <TouchableOpacity
                key={item.id_clave}
                activeOpacity={0.7}
                onPress={() => {
                  setIdPalabraClave(item.id_clave);
                  setPalabraClave(item.palabra);
                  setSelectedGravedad(
                    dataGravedad.gravedades.find((option: any) => {
                      return option.descripcion === item.gravedad;
                    })
                  );
                  setModalVisibleOpciones(true);
                }}
              >
                <View className="w-full flex flex-row p-2">
                  <Text className="text-lg flex-1 text-center text-black">
                    {item.palabra}
                  </Text>
                  <Text className="text-lg flex-1 text-center text-black">
                    {item.gravedad}
                  </Text>
                </View>
                <View className="w-10/12 h-[1px] bg-gray-300 mx-auto my-2" />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text className="text-center text-black">
            No hay palabras clave disponibles.
          </Text>
        )}
      </View>

      <OpcionesModal
        modalVisible={modalVisibleOpciones}
        setModalVisible={setModalVisibleOpciones}
        colorOpcion1="#2222ff"
        opcion1Texto="Editar"
        handleOpcion1={() => {
          setModalVisibleEditar(true);
          setModalVisibleOpciones(false);
        }}
        colorOpcion2="#ff2222"
        opcion2Texto="Eliminar"
        handleOpcion2={() => {
          handleEliminarClave();
          setModalVisibleOpciones(false);
        }}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleEditar}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Editar clave
            </Text>

            <Text className="mb-4 font-bold">Ingresa la palabra clave</Text>
            <View className="bg-white rounded-lg shadow shadow-black mb-4">
              <TextInput
                className="px-4 py-3 text-base"
                value={palabraClave}
                onChangeText={setPalabraClave}
                placeholder="Escribe aqui..."
              />
            </View>

            <Text className="mb-4 font-bold">Tipo de gravedad</Text>
            {!isLoadingGravedad && (
              <View className="bg-white rounded-lg shadow shadow-black mb-4">
                <TouchableWithoutFeedback
                  onPress={() => setModalVisibleGravedades(true)}
                >
                  <View className="px-4 py-3 text-base">
                    <Text>{selectedGravedad?.descripcion}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}

            <View className="flex-row gap-x-4 justify-between">
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleEditar(false);
                  setSelectedGravedad({});
                }}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleEditarClave();
                }}
                className="bg-blue-500 p-2 rounded-md flex-1"
              >
                <Text className="text-center text-white">Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleAgregar}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Agregar clave
            </Text>

            <Text className="mb-4 font-bold">Ingresa la palabra clave</Text>
            <View className="bg-white rounded-lg shadow shadow-black mb-4">
              <TextInput
                className="px-4 py-3 text-base"
                value={nuevaPalabraClave}
                onChangeText={setNuevaPalabraClave}
                placeholder="Escribe aqui..."
              />
            </View>

            <Text className="mb-4 font-bold">Tipo de gravedad</Text>
            {!isLoadingGravedad && (
              <View className="bg-white rounded-lg shadow shadow-black mb-4">
                <TouchableWithoutFeedback
                  onPress={() => setModalVisibleGravedades(true)}
                >
                  <View className="px-4 py-3 text-base">
                    <Text
                      className={`${
                        selectedGravedad?.descripcion
                          ? "text-black"
                          : "text-gray-500"
                      } text-base`}
                    >
                      {selectedGravedad?.descripcion
                        ? selectedGravedad?.descripcion
                        : "Selecciona aquí..."}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}

            <View className="flex-row gap-x-4 justify-between">
              <TouchableOpacity
                onPress={() => setModalVisibleAgregar(false)}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleAgregarClave();
                }}
                className="bg-green-500 p-2 rounded-md flex-1"
              >
                <Text className="text-center text-white">Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleGravedades}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Selecciona el tipo de gravedad
            </Text>

            {isLoadingGravedad ? (
              <View>
                <Text>Cargando...</Text>
              </View>
            ) : (
              <FlatList
                data={dataGravedad.gravedades}
                keyExtractor={(item) => item.id_gravedad.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="p-4 border-b border-gray-300"
                    onPress={() => {
                      setSelectedGravedad(item);
                      setModalVisibleGravedades(false);
                    }}
                  >
                    <Text className="text-base">{item.descripcion}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <TouchableOpacity
              onPress={() => setModalVisibleGravedades(false)}
              className="bg-gray-300 p-2 rounded-md"
            >
              <Text className="text-center text-gray-700">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
