import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { useEditarUsuarioMutation } from "../../../services/api";
import { logoutAction, updateProfileAction } from "../../redux/authSlice";
import CalendarPicker from "../../../components/aplicacion/registro/FechaNacimiento";
import { useRouter } from "expo-router";

export default function PerfilScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState(persona.nombre || "");
  const [apellido, setApellido] = useState(persona.apellido || "");
  const [numeroTelefono, setNumeroTelefono] = useState(
    persona.numero_telefono || ""
  );
  const [direccion, setDireccion] = useState(persona.direccion || "");
  const [correo, setCorreo] = useState(persona.correo || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    persona.fecha_nacimiento || ""
  );
  const [nombreUsuario, setNombreUsuario] = useState(
    persona.nombre_usuario || ""
  );
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const imagen_usuario = perfil.imagen_usuario;

  const id_usuario = persona.id_persona;

  const [
    cambiarDatos,
    {
      isLoading: isLoadingActualizacion,
      error: errorActualizacion,
      data: dataActualizacion,
    },
  ] = useEditarUsuarioMutation();

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      uid: id_usuario,
      nombre: nombre || undefined,
      apellido: apellido || undefined,
      numero_telefono: numeroTelefono || undefined,
      direccion: direccion || undefined,
      correo: correo || undefined,
      fecha_nacimiento: fechaNacimiento || undefined,
      nombre_usuario: nombreUsuario || undefined,
      password: undefined,
    };

    cambiarDatos(data)
      .unwrap()
      .then((response: any) => {
        const updatedPersona = {
          ...persona,
          nombre: nombre || persona.nombre,
          apellido: apellido || persona.apellido,
          numero_telefono: numeroTelefono || persona.numero_telefono,
          direccion: direccion || persona.direccion,
          correo: correo || persona.correo,
          fecha_nacimiento: fechaNacimiento || persona.fecha_nacimiento,
          nombre_usuario: nombreUsuario || persona.nombre_usuario,
        };

        dispatch(
          updateProfileAction({
            perfil: perfil,
            persona: updatedPersona,
          })
        );
        setLoading(false);

        Alert.alert(
          "Datos actualizados",
          "Los datos se han actualizado correctamente.",
          [{ text: "Aceptar", onPress: () => console.log("Alerta cerrada") }],
          { cancelable: false }
        );
      })
      .catch((error: any) => {
        setLoading(false);
        console.error("Error al enviar el Alerta:", error);
      });
  };

  const handleCambioContrasena = () => {
    if (password !== perfil.password) {
      Alert.alert(
        "Error",
        "Esa no es tu contraseña actual. Por favor, inténtalo de nuevo."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Error",
        "Las contraseñas no coinciden. Por favor, inténtalo de nuevo."
      );
      return;
    }

    setLoading(true);
    const data = {
      uid: id_usuario,
      nombre: undefined,
      apellido: undefined,
      numero_telefono: undefined,
      direccion: undefined,
      correo: undefined,
      fecha_nacimiento: undefined,
      nombre_usuario: undefined,
      password: newPassword || undefined,
    };

    cambiarDatos(data)
      .unwrap()
      .then((response: any) => {
        const updatedPerfil = {
          ...perfil,
          password: newPassword,
        };

        dispatch(
          updateProfileAction({
            perfil: updatedPerfil,
            persona: persona,
          })
        );
        setLoading(false);

        Alert.alert(
          "Éxito",
          "Tu contraseña ha sido cambiada correctamente.",
          [{ text: "Aceptar", onPress: () => console.log("Alerta cerrada") }],
          { cancelable: false }
        );
      })
      .catch((error: any) => {
        setLoading(false);
        console.error("Error al enviar el Alerta:", error);
      });
  };

  return (
    <ScrollView className="bg-[#F5F5F5] flex p-4 w-full">
      <StatusBar style="light" backgroundColor="black" />
      <View className="bg-white shadow shadow-black rounded p-4 mb-4">
        <View className="flex flex-row items-center w-full">
          <View className="w-16 h-16 bg-white mr-4 border-black border-2 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              className="w-full h-full"
              source={
                imagen_usuario
                  ? { uri: imagen_usuario }
                  : require("../../../assets/profile-user.png")
              }
            />
          </View>
          <View>
            <Text className="text-black text-lg flex">
              {persona.nombre} {persona.apellido}
            </Text>
            <Text className="text-gray-500 text-sm">
              {persona.numero_telefono}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-2xl font-bold text-center my-4">Datos usuario</Text>
      <View className="bg-white shadow shadow-black rounded p-4 mb-8">
        <Text className="text-sm mb-1">Nombre</Text>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Introduce tu nombre"
          className="border border-gray-300 p-2 text-base rounded-md mb-4"
        />

        <Text className="mb-1">Apellido</Text>
        <TextInput
          value={apellido}
          onChangeText={setApellido}
          placeholder="Introduce tu apellido"
          className="border border-gray-300 p-2 rounded-md mb-4"
        />

        <Text className="mb-1">Correo electrónico</Text>
        <TextInput
          value={correo}
          onChangeText={setCorreo}
          placeholder="Introduce tu correo electrónico"
          className="border border-gray-300 p-2 rounded-md mb-4"
        />

        <Text className="mb-1">Número de teléfono</Text>
        <TextInput
          value={numeroTelefono}
          onChangeText={setNumeroTelefono}
          placeholder="Introduce tu número de teléfono"
          className="border border-gray-300 p-2 rounded-md mb-4"
        />

        <Text className="mb-1">Dirección</Text>
        <TextInput
          value={direccion}
          onChangeText={setDireccion}
          placeholder="Introduce tu dirección"
          className="border border-gray-300 p-2 rounded-md mb-4"
        />

        <Text className="mb-1">Fecha de nacimiento</Text>
        <View className="mb-4">
          <CalendarPicker
            initialDate={fechaNacimiento}
            onDateChange={(date) => setFechaNacimiento(date)}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.75}
          className="bg-[#ff80b5] p-2 rounded-md justify-center items-center border border-gray-200"
          onPress={() => {
            Alert.alert(
              "Confirmar cambios",
              "¿Desea cambiar sus datos?",
              [
                {
                  text: "Cancelar",
                  onPress: () => console.log("Cancelado"),
                  style: "cancel",
                },
                {
                  text: "Aceptar",
                  onPress: handleSubmit,
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text className="text-white text-lg">Guardar cambios</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-2xl font-bold text-center my-4">Contraseña</Text>
      <View className="bg-white shadow shadow-black rounded p-4 mb-12">
        <Text className="mb-1">Contraseña actual</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Introduce tu contraseña actual"
          // secureTextEntry
          className="border border-gray-300 p-2 rounded-md mb-4"
        />

        <Text className="mb-1">Nueva contraseña</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Introduce tu nueva contraseña"
          // secureTextEntry
          className="border border-gray-300 p-2 rounded-md mb-4"
        />

        <Text className="mb-1">Confirmar nueva contraseña</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirma tu nueva contraseña"
          // secureTextEntry
          className="border border-gray-300 p-2 rounded-md mb-4"
        />

        <TouchableOpacity
          activeOpacity={0.75}
          className="bg-[#ff80b5] p-2 rounded-md justify-center items-center border border-gray-200"
          onPress={() => {
            Alert.alert(
              "Confirmar cambios",
              "¿Desea cambiar su contraseña?",
              [
                {
                  text: "Cancelar",
                  onPress: () => console.log("Cancelado"),
                  style: "cancel",
                },
                {
                  text: "Aceptar",
                  onPress: handleCambioContrasena,
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text className="text-white text-lg">Guardar cambios</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white shadow shadow-black rounded p-4 mb-12">
        <TouchableOpacity
          activeOpacity={0.75}
          className="bg-red-500 p-2 rounded-md justify-center items-center border border-gray-200"
          onPress={() => {
            Alert.alert(
              "Cerrar sesión",
              "¿Estás seguro de que quieres cerrar sesión?",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Aceptar",
                  onPress: () => {
                    try {
                      dispatch(logoutAction());
                      router.replace("/auth/iniciar-sesion");
                    } catch (error) {
                      Alert.alert(
                        "Error",
                        "Hubo un problema Por favor, inténtalo nuevamente.",
                        [
                          {
                            text: "Aceptar",
                          },
                        ],
                        { cancelable: false }
                      );
                    }
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        >
          <Text className="text-white text-lg">Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={loading}
        animationType="fade"
        onRequestClose={() => setLoading(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-8/12 max-h-[550px] p-5 bg-[#F5F5F5] rounded-xl shadow-lg">
            <ActivityIndicator size="large" color="#ff80b5" />
            <Text className="text-center mt-2 text-lg">Actualizando...</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
