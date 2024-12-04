import React, { useCallback, useState } from "react";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useEditarContactoMutation,
  useEliminarContactoMutation,
  useGuardarContactoMutation,
  useListarContactosQuery,
} from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import OpcionesModal from "../../components/modals/ModalOpciones";

export default function MisContactosScreen() {
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [modalVisibleAgregar, setModalVisibleAgregar] = useState(false);
  const [modalVisibleEditar, setModalVisibleEditar] = useState(false);
  const [modalVisibleOpciones, setModalVisibleOpciones] = useState(false);

  const [idContacto, setIdContacto] = useState<any>();
  const [contactNombres, setContactNombres] = useState("");
  const [contactApellidos, setContactApellidos] = useState("");
  const [contactCelular, setContactCelular] = useState("");
  const [contactCorreo, setContactCorreo] = useState("");

  const [errorNombres, setErrorNombres] = useState("");
  const [errorApellidos, setErrorApellidos] = useState("");
  const [errorCelular, setErrorCelular] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");

  // Función para validar el celular
  const validarCelular = (celular: string) => {
    if (celular.length <= 8) {
      setErrorCelular("El número debe tener 9 dígitos.");
    } else {
      setErrorCelular("");
    }
  };

  // Función para validar los nombres (mínimo 3 caracteres)
  const validarNombres = (nombres: string) => {
    if (nombres.length < 3) {
      setErrorNombres("El nombre debe tener al menos 3 caracteres.");
    } else {
      setErrorNombres("");
    }
  };

  // Función para validar los apellidos (mínimo 3 caracteres)
  const validarApellidos = (apellidos: string) => {
    if (apellidos.length < 3) {
      setErrorApellidos("El apellido debe tener al menos 3 caracteres.");
    } else {
      setErrorApellidos("");
    }
  };

  // Función para validar el correo electrónico
  const validarCorreo = (correo: string) => {
    // Expresión regular básica para validar correo
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexCorreo.test(correo)) {
      setErrorCorreo("El correo electrónico no es válido.");
    } else {
      setErrorCorreo("");
    }
  };

  const id_usuario = persona.id_persona;

  const {
    data: dataContactos = { CONTACTO: [] },
    error: errorContactos,
    isLoading: isLoadingContactos,
    refetch,
  } = useListarContactosQuery({ id_usuario: id_usuario });

  const [
    guardarContacto,
    { isLoading: isLoadingGuardado, error: errorGuardado, data: dataGuardado },
  ] = useGuardarContactoMutation();

  const handleAgregarContacto = () => {
    setModalVisibleAgregar(false);
    setRefetching(true);
    guardarContacto({
      nombres: contactNombres,
      apellidos: contactApellidos,
      celular: contactCelular,
      email: contactCorreo,
      id_usuario: id_usuario,
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

    setContactNombres("");
    setContactApellidos("");
    setContactCelular("");
    setContactCorreo("");
  };

  const [
    editarContacto,
    {
      isLoading: isLoadingEditarContacto,
      error: errorEditarContacto,
      data: dataEditarContacto,
    },
  ] = useEditarContactoMutation();

  const handleEditarContacto = () => {
    setModalVisibleEditar(false);
    setRefetching(true);
    editarContacto({
      id_contacto: idContacto,
      nombres: contactNombres,
      apellidos: contactApellidos,
      celular: contactCelular,
      email: contactCorreo,
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
        console.error("Error al editar la Contacto:", error);
        setRefetching(false);
      });

    setIdContacto("");
    setContactNombres("");
    setContactApellidos("");
    setContactCelular("");
    setContactCorreo("");
  };

  const [
    eliminarContacto,
    {
      isLoading: isLoadingEliminarContacto,
      error: errorEliminarContacto,
      data: dataEliminarContacto,
    },
  ] = useEliminarContactoMutation();

  const handleEliminarContacto = () => {
    setRefetching(true);
    eliminarContacto({
      id_contacto: idContacto,
      nombres: contactNombres,
      apellidos: contactApellidos,
      celular: contactCelular,
      email: contactCorreo,
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
        console.error("Error al editar la Contacto:", error);
        setRefetching(false);
      });

    setIdContacto("");
    setContactNombres("");
    setContactApellidos("");
    setContactCelular("");
    setContactCorreo("");
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
      <LogoVolver
        titulo="WOMEN'S SECURITY"
        estilo_titulo="text-black text-2xl font-bold mb-4"
        onPressBack={() => {
          router.push("/drawer/tabs/home");
        }}
      />
      <View className="relative w-full py-2 flex items-center">
        <Text className="w-10/12 text-black text-center">
          Estas son tus contactos registrados.
        </Text>
      </View>
      <View className="mt-4">
        <TouchableOpacity
          activeOpacity={0.75}
          className="bg-[#ff80b5] justify-center items-center rounded p-3 mb-4"
          onPress={() => {
            setContactNombres("");
            setContactApellidos("");
            setContactCelular("");
            setContactCorreo("");
            setModalVisibleAgregar(true);
          }}
        >
          <Text className="text-white text-base">+ Agregar un contacto</Text>
        </TouchableOpacity>

        {isLoadingContactos || refreshing || refetching ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-black">Cargando contactos...</Text>
          </View>
        ) : dataContactos?.CONTACTO && dataContactos?.CONTACTO?.length > 0 ? (
          <View>
            {dataContactos.CONTACTO.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.75}
                onPress={() => {
                  setIdContacto(item.id_contacto);
                  setContactNombres(item.nombres);
                  setContactApellidos(item.apellidos);
                  setContactCelular(item.celular);
                  setContactCorreo(item.email);
                  setModalVisibleOpciones(true);
                }}
                className="bg-white p-4 mb-4 rounded-lg shadow shadow-black w-full relative"
              >
                <Text className="text-lg text-black">
                  {item.nombres} {item.apellidos}
                </Text>
                <Text className="text-lg text-black">{item.email}</Text>
                <Text className="text-lg text-black">{item.celular}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-gray-500">
              No hay contactos disponibles.
            </Text>
          </View>
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
          handleEliminarContacto();
          setModalVisibleOpciones(false);
        }}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleAgregar}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Agregar Contacto
            </Text>

            {/* Campo para el nombre del contacto */}
            <TextInput
              value={contactNombres}
              onChangeText={(nombres) => {
                validarNombres(nombres);
                setContactNombres(nombres);
              }}
              placeholder="Nombres del contacto"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            {errorNombres && (
              <Text className="text-red-500 mb-4 px-2">{errorNombres}</Text>
            )}

            {/* Campo para el apellido del contacto */}
            <TextInput
              value={contactApellidos}
              onChangeText={(apellidos) => {
                validarApellidos(apellidos);
                setContactApellidos(apellidos);
              }}
              placeholder="Apellidos del contacto"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            {errorApellidos && (
              <Text className="text-red-500 mb-4 px-2">{errorApellidos}</Text>
            )}

            {/* Campo para el número de teléfono */}
            <TextInput
              value={contactCelular}
              onChangeText={(celular) => {
                setContactCelular(celular);
                validarCelular(celular);
              }}
              placeholder="Número de teléfono"
              keyboardType="phone-pad"
              maxLength={9}
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            {errorCelular && (
              <Text className="text-red-500 mb-4 px-2">{errorCelular}</Text>
            )}

            {/* Campo para el correo del contacto */}
            <TextInput
              value={contactCorreo}
              onChangeText={(correo) => {
                validarCorreo(correo);
                setContactCorreo(correo);
              }}
              placeholder="Correo electronico"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            {errorCorreo && (
              <Text className="text-red-500 mb-4 px-2">{errorCorreo}</Text>
            )}

            {/* Botones de acción */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setErrorNombres("");
                  setErrorApellidos("");
                  setErrorCelular("");
                  setErrorCorreo("");
                  setModalVisibleAgregar(false);
                }}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAgregarContacto}
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
        visible={modalVisibleEditar}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 p-5 bg-white rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-center mb-4">
              Editar contacto
            </Text>

            {/* Campo para el nombre del contacto */}
            <TextInput
              value={contactNombres}
              onChangeText={(nombres) => {
                validarNombres(nombres);
                setContactNombres(nombres);
              }}
              placeholder="Nombres del contacto"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            {errorNombres && (
              <Text className="text-red-500 mb-4 px-2">{errorNombres}</Text>
            )}

            {/* Campo para el apellido del contacto */}
            <TextInput
              value={contactApellidos}
              onChangeText={(apellidos) => {
                validarApellidos(apellidos);
                setContactApellidos(apellidos);
              }}
              placeholder="Apellidos del contacto"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            {errorApellidos && (
              <Text className="text-red-500 mb-4 px-2">{errorApellidos}</Text>
            )}

            {/* Campo para el número de teléfono */}
            <TextInput
              value={contactCelular}
              onChangeText={(celular) => {
                validarCelular(celular);
                setContactCelular(celular);
              }}
              placeholder="Número de teléfono"
              keyboardType="phone-pad"
              maxLength={9}
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            {errorCelular && (
              <Text className="text-red-500 mb-4 px-2">{errorCelular}</Text>
            )}

            {/* Campo para el correo del contacto */}
            <TextInput
              value={contactCorreo}
              onChangeText={(correo) => {
                validarCorreo(correo);
                setContactCorreo(correo);
              }}
              placeholder="Correo electronico"
              className="border border-gray-300 p-2 mb-4 rounded-md"
            />
            {errorCorreo && (
              <Text className="text-red-500 mb-4 px-2">{errorCorreo}</Text>
            )}

            {/* Botones de acción */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleEditar(false);
                  setIdContacto("");
                  setContactNombres("");
                  setContactApellidos("");
                  setContactCelular("");
                  setContactCorreo("");
                  setErrorNombres("");
                  setErrorApellidos("");
                  setErrorCelular("");
                  setErrorCorreo("");
                }}
                className="bg-gray-300 p-2 rounded-md flex-1 mr-2"
              >
                <Text className="text-center text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEditarContacto}
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
