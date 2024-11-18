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
  useCrearGrupoMutation,
  useInvitarUsuarioMutation,
  useListarGrupoCompletoQuery,
  useListarGruposQuery,
} from "../../../services/api";

export default function GruposScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleGrupo, setModalVisibleGrupo] = useState(false);
  const [modalVisiblePersona, setModalVisiblePersona] = useState(false);
  const [grupoCompleto, setGrupoCompleto] = useState<any>(null);
  const [grupoId, setGrupoId] = useState("");
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [descripcionGrupo, setDescripcionGrupo] = useState("");
  const [celularPersona, setCelularPersona] = useState("");

  const id_usuario = persona.id_persona;
  const imagen_usuario = perfil.imagen_usuario;

  const handleModalImagen = () => {};

  const {
    data: dataGrupos,
    error: errorGrupos,
    isLoading: isLoadingGrupos,
    refetch,
  } = useListarGruposQuery({ id_usuario: id_usuario });

  const handleAgregarGrupo = () => {
    handleCrearGrupo(nombreGrupo, descripcionGrupo);
    setNombreGrupo("");
    setDescripcionGrupo("");
    setModalVisible(false);
  };

  const [
    crearGrupo,
    { isLoading: isLoadingGuardado, error: errorGuardado, data: dataGuardado },
  ] = useCrearGrupoMutation();

  const handleCrearGrupo = async (
    nombre_grupo: string,
    descripcion: string
  ) => {
    const data = {
      nombre_grupo: nombre_grupo,
      id_usuario_creador: id_usuario,
      color_hex: "#ff0000",
      descripcion: descripcion,
    };

    crearGrupo(data)
      .unwrap()
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.error("Error al enviar el Alerta:", error);
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const [triggerQuery, setTriggerQuery] = useState(false);
  const {
    data: dataGrupoCompleto,
    error: errorGrupoCompleto,
    isLoading: isLoadingGrupoCompleto,
    refetch: refetchGrupoCompleto,
  } = useListarGrupoCompletoQuery(
    { id_grupo: grupoId },
    { skip: !triggerQuery }
  );

  const handleMostrarDetallesGrupo = (grupoId: any) => {
    setGrupoId(grupoId);
    setTriggerQuery(true);
    setModalVisibleGrupo(true);
  };

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
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-base">+ Crear un grupo</Text>
      </TouchableOpacity>

      {!isLoadingGrupos && dataGrupos.grupos ? (
        <>
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-lg text-black">
              Grupos a los que perteneces
            </Text>
          </View>
          <View>
            {dataGrupos?.grupos.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.75}
                className="bg-white p-4 mb-4 rounded-lg shadow shadow-black w-full relative"
                onPress={() => handleMostrarDetallesGrupo(item.id_grupo)}
              >
                <Text
                  className="text-lg font-bold
                 text-black"
                >
                  {item.nombre_grupo}
                </Text>
                <Text className="text-base text-black">{item.descripcion}</Text>
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

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
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
                  setModalVisible(false);
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleGrupo}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-11/12 p-5 bg-[#F5F5F5] rounded-xl shadow-lg">
            {isLoadingGrupoCompleto ? (
              <Text className="text-center w-full">Cargando detalles...</Text>
            ) : errorGrupoCompleto ? (
              <Text>Error al cargar detalles</Text>
            ) : (
              <>
                <Text className="text-lg font-bold text-center">
                  {dataGrupoCompleto?.grupo.nombre_grupo}
                </Text>
                <Text className="text-base text-center mb-4">
                  {dataGrupoCompleto?.grupo.descripcion}
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
                onPress={() => {
                  setModalVisibleGrupo(false);
                  setGrupoId("");
                  refetchGrupoCompleto();
                }}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisiblePersona(true);
                }}
                className="bg-blue-500 p-2 rounded-md flex-1"
              >
                <Text className="text-center text-white">Añadir persona</Text>
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
    </ScrollView>
  );
}
