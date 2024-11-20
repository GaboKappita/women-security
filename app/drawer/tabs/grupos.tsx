import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCallback, useState } from "react";
import {
  useActualizarUbicacionMutation,
  useCrearGrupoMutation,
  useEditarGrupoMutation,
  useEliminarGrupoMutation,
  useListarGruposQuery,
  useListarUbicacionSeleccionQuery,
} from "../../../services/api";
import { router } from "expo-router";
import GrupoModal from "../../../components/modals/ModalGrupo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import OpcionesModal from "../../../components/modals/ModalOpciones";

export default function GruposScreen() {
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [modalVisibleAgregarGrupo, setModalVisibleAgregarGrupo] =
    useState(false);
  const [modalVisibleEditarGrupo, setModalVisibleEditarGrupo] = useState(false);
  const [modalVisibleGrupo, setModalVisibleGrupo] = useState(false);
  const [modalVisibleOpcionesGrupo, setModalVisibleOpcionesGrupo] =
    useState(false);
  const [grupoCompleto, setGrupoCompleto] = useState<any>(null);
  const [grupoId, setGrupoId] = useState("");
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [descripcionGrupo, setDescripcionGrupo] = useState("");

  const id_usuario = persona.id_persona;
  const imagen_usuario = perfil.imagen_usuario;

  const handleModalImagen = () => {};

  const {
    data: dataGrupos = { grupos: [] },
    error: errorGrupos,
    isLoading: isLoadingGrupos,
    refetch,
  } = useListarGruposQuery({ id_usuario: id_usuario });
  // console.log(dataGrupos.grupos);

  const {
    data: dataGrupoSeleccionado,
    error: errorGrupoSeleccionado,
    isLoading: isLoadingGrupoSeleccionado,
    refetch: refetchGrupoSeleccionado,
  } = useListarUbicacionSeleccionQuery({ id_persona: id_usuario });
  console.log(dataGrupoSeleccionado);

  const [
    actualizarSeleccion,
    {
      isLoading: isLoadingActualizacion,
      error: errorActualizacion,
      data: dataActualizacion,
    },
  ] = useActualizarUbicacionMutation();

  const handleActualizarSeleccion = () => {
    setRefetching(true);
    actualizarSeleccion({
      id_persona: id_usuario,
      tipo: 2,
      id_grupo: grupoId,
    })
      .unwrap()
      .then((response: any) => {
        console.log(response);

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
    setGrupoId("");
  };

  const [
    crearGrupo,
    { isLoading: isLoadingGuardado, error: errorGuardado, data: dataGuardado },
  ] = useCrearGrupoMutation();

  const handleAgregarGrupo = () => {
    setModalVisibleAgregarGrupo(false);
    setRefetching(true);
    crearGrupo({
      nombre_grupo: nombreGrupo,
      id_usuario_creador: id_usuario,
      color_hex: "#ff0000",
      descripcion: descripcionGrupo,
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

    setNombreGrupo("");
    setDescripcionGrupo("");
  };

  const [
    editarGrupo,
    {
      isLoading: isLoadingEditarGrupo,
      error: errorEditarGrupo,
      data: dataEditarGrupo,
    },
  ] = useEditarGrupoMutation();

  const handleEditarGrupo = () => {
    setModalVisibleEditarGrupo(false);
    setRefetching(true);
    editarGrupo({
      id_grupo: grupoId,
      nombre_grupo: nombreGrupo,
      color_hex: "#ff0000",
      descripcion: descripcionGrupo,
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
        console.error("Error al editar el grupo:", error);
      });
    setGrupoId("");
    setNombreGrupo("");
    setDescripcionGrupo("");
  };

  const [
    eliminarGrupo,
    {
      isLoading: isLoadingEliminarGrupo,
      error: errorEliminarGrupo,
      data: dataEliminarGrupo,
    },
  ] = useEliminarGrupoMutation();

  const handleEliminarGrupo = () => {
    setRefetching(true);
    eliminarGrupo({
      id_grupo: grupoId,
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
        console.error("Error al eliminar el grupo:", error);
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
      className="bg-[#F5F5F5] flex p-4 w-full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="light" backgroundColor="black" />
      <View className="bg-white shadow shadow-black rounded p-4 mb-4">
        <View className="flex flex-row justify-center items-center w-full">
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-16 h-16 bg-white mr-4 border-black border-2 rounded-full flex items-center justify-center overflow-hidden"
            onPress={() => {
              handleModalImagen();
            }}
          >
            <Image
              className="w-full h-full"
              source={
                imagen_usuario
                  ? { uri: imagen_usuario }
                  : require("../../../assets/profile-user.png")
              }
            />
          </TouchableOpacity>
          <View>
            <Text className="text-black text-lg flex">
              {persona.nombre} {persona.apellido}
            </Text>
            <Text className="text-black text-base">
              {persona.numero_telefono}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        className="bg-[#ff80b5] justify-center items-center rounded p-3 mb-4"
        onPress={() => {
          setNombreGrupo("");
          setDescripcionGrupo("");
          setModalVisibleAgregarGrupo(true);
        }}
      >
        <Text className="text-white text-base">+ Crear un grupo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.75}
        className="bg-[#ff80b5] justify-center items-center rounded p-3 mb-4"
        onPress={() => router.push("/drawer/invitaciones")}
      >
        <Text className="text-white text-base">Ver invitaciones</Text>
      </TouchableOpacity>

      {isLoadingGrupos || refreshing || refetching ? (
        <View className="flex flex-row items-center justify-between mb-4">
          <Text className="text-lg text-black text-center w-full">
            Cargando grupos...
          </Text>
        </View>
      ) : dataGrupos?.grupos && dataGrupos?.grupos?.length > 0 ? (
        <>
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-lg text-black">
              Grupos a los que perteneces
            </Text>
          </View>
          <View>
            {dataGrupos.grupos.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.75}
                className="bg-white p-4 mb-4 flex-row justify-between items-center rounded-lg shadow shadow-black w-full relative"
                onPress={() => {
                  setGrupoId(item.id_grupo);
                  setModalVisibleGrupo(true);
                }}
              >
                <View className="w-10/12">
                  <Text className="text-lg font-bold text-black">
                    {item.nombre_grupo}
                  </Text>
                  <Text className="text-base text-black">
                    {item.descripcion}
                  </Text>
                </View>
                <TouchableOpacity
                  className="justify-center items-center h-10 w-10"
                  activeOpacity={0.7}
                  onPress={() => {
                    setGrupoId(item.id_grupo);
                    setNombreGrupo(item.nombre_grupo);
                    setDescripcionGrupo(item.descripcion);
                    setModalVisibleOpcionesGrupo(true);
                  }}
                >
                  <MaterialCommunityIcons name="dots-vertical" size={32} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <View className="flex flex-row items-center justify-between mb-4">
          <Text className="text-lg text-black text-center w-full">
            No perteneces a ningún grupo
          </Text>
        </View>
      )}

      {/* Detalles del grupo */}
      <GrupoModal
        grupoId={grupoId}
        setGrupoId={setGrupoId}
        modalVisibleGrupo={modalVisibleGrupo}
        setModalVisibleGrupo={setModalVisibleGrupo}
        id_usuario={id_usuario}
      />

      {/* Opciones */}
      <OpcionesModal
        modalVisible={modalVisibleOpcionesGrupo}
        setModalVisible={setModalVisibleOpcionesGrupo}
        colorOpcion1="#009900"
        opcion1Texto="Activar grupo"
        handleOpcion1={() => {
          handleActualizarSeleccion();
          setModalVisibleOpcionesGrupo(false);
        }}
        colorOpcion2="#2222ff"
        opcion2Texto="Editar"
        handleOpcion2={() => {
          setModalVisibleEditarGrupo(true);
          setModalVisibleOpcionesGrupo(false);
        }}
        colorOpcion3="#ff2222"
        opcion3Texto="Eliminar"
        handleOpcion3={() => {
          handleEliminarGrupo();
          setModalVisibleOpcionesGrupo(false);
        }}
      />

      {/* Agregar grupo */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleAgregarGrupo}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Crear grupo
            </Text>

            <TextInput
              value={nombreGrupo}
              onChangeText={setNombreGrupo}
              placeholder="Nombre del grupo"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />

            <TextInput
              value={descripcionGrupo}
              onChangeText={setDescripcionGrupo}
              placeholder="Descripción del grupo"
              className="border border-gray-300 p-2 mb-4 rounded-md"
              style={{ textAlignVertical: "top" }}
              multiline={true}
              numberOfLines={4}
            />

            {/* Botones de acción */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setNombreGrupo("");
                  setDescripcionGrupo("");
                  setModalVisibleAgregarGrupo(false);
                }}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAgregarGrupo}
                className="bg-blue-500 p-2 rounded-md flex-1"
              >
                <Text className="text-center text-white">Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Editar grupo */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleEditarGrupo}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Editar grupo
            </Text>

            <TextInput
              value={nombreGrupo}
              onChangeText={setNombreGrupo}
              placeholder="Nombre del grupo"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />

            <TextInput
              value={descripcionGrupo}
              onChangeText={setDescripcionGrupo}
              placeholder="Descripción del grupo"
              className="border border-gray-300 p-2 mb-4 rounded-md"
              style={{ textAlignVertical: "top" }}
              multiline={true}
              numberOfLines={4}
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setGrupoId("");
                  setNombreGrupo("");
                  setDescripcionGrupo("");
                  setModalVisibleEditarGrupo(false);
                }}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEditarGrupo}
                className="bg-blue-500 p-2 rounded-md flex-1"
              >
                <Text className="text-center text-white">Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
