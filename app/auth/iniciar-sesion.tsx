import { useEffect, useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../../components/aplicacion/Logo";
import BotonPrincipal from "../../components/aplicacion/BotonPrincipal";
import CardBlack from "../../components/aplicacion/CardBlack";
import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { IniciarSesion } from "../../services/api/auth";
import { loginAction } from "../redux/authSlice";
import { Formik } from "formik";
import * as SecureStore from "expo-secure-store";

const LoginSchema = Yup.object().shape({
  correo: Yup.string()
    .email("Correo invalido")
    .required("El correo es obligatorio"),
  contrasena: Yup.string().required("La contraseña es obligatoria"),
});

export const unstable_settings = {
  headerShown: false,
};

export default function IniciarSesionScreen() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [isPressed, setIsPressed] = useState(false);
  const [errorSesion, setErrorSesion] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/drawer/tabs/home");
    }
  }, []);

  const handleSubmit = async (datos: any) => {
    setIsPressed(true);
    const data = {
      correo: datos.correo,
      contrasena: datos.contrasena,
    };
    try {
      const response = await IniciarSesion(data);
      if (!response.success) {
        setIsPressed(false);
        setErrorSesion("Contraseña o usuario incorrecto.");
        return;
      }

      await SecureStore.setItemAsync(
        "perfil",
        JSON.stringify(response.data.perfil)
      );
      await SecureStore.setItemAsync(
        "persona",
        JSON.stringify(response.data.persona)
      );

      dispatch(
        loginAction({
          perfil: response.data.perfil,
          persona: response.data.persona,
        })
      );
      router.push("/drawer/tabs/home");
    } catch (error) {
      setIsPressed(false);
      console.error("Error al iniciar sesión: ", error);
      Alert.alert(
        "Error al iniciar sesión", // Título de la alerta
        "Posible error de conexión. Por favor, inténtalo de nuevo.", // Mensaje
        [{ text: "OK", onPress: () => console.log("Alerta cerrada") }] // Botón
      );
    }
  };

  const mutation = { status: "success" };

  return (
    <ImagenBackground>
      <StatusBar style="light" backgroundColor="black" />
      <ScrollView className="flex w-full">
        <View className="flex justify-center h-screen p-4 w-full">
          <CardBlack>
            <Logo
              titulo="WOMEN'S SECURITY"
              estilo_titulo="text-white text-2xl font-bold mb-4"
            />
            <Formik
              initialValues={{
                correo: "",
                contrasena: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="w-full">
                  <TextInput
                    className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                    placeholder="Correo electrónico"
                    onChangeText={handleChange("correo")}
                    onBlur={handleBlur("correo")}
                    keyboardType="email-address"
                  />
                  {errors.correo && touched.correo && (
                    <Text className="text-red-500 text-base mb-4 px-2">
                      {errors.correo}
                    </Text>
                  )}

                  <TextInput
                    className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                    placeholder="Contraseña"
                    onChangeText={handleChange("contrasena")}
                    onBlur={handleBlur("contrasena")}
                    secureTextEntry
                  />
                  {errors.contrasena && touched.contrasena && (
                    <Text className="text-red-500 text-base mb-4 px-2">
                      {errors.contrasena}
                    </Text>
                  )}
                  {errorSesion && (
                    <Text className="text-lg  text-center text-red-300 mb-1">
                      {errorSesion}
                    </Text>
                  )}

                  <TouchableOpacity
                    activeOpacity={0.8}
                    className={`h-12 bg-[#ff80b5] rounded-md justify-center items-center my-4 `}
                    onPress={() => {
                      setErrorSesion("");
                      handleSubmit();
                    }}
                    disabled={mutation.status === "pending" || isPressed}
                  >
                    {mutation.status === "pending" || isPressed ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text className="text-white font-bold text-lg">
                        Iniciar sesión
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            {/* Botón de olvido contraseña */}
            {/* <BotonSecundario
              titulo="¿Olvidaste tu contraseña?"
              estilo_boton="my-2 mx-2 py-2"
              onPress={() => {
                router.push("/auth/recuperar");
              }}
            /> */}
            <View className="flex flex-row items-center justify-center">
              <Text className="text-white">¿No tienes cuenta?</Text>
              {/* Botón de crear cuenta */}
              <BotonPrincipal
                titulo="CREA UNA AQUÍ"
                estilo_boton="m-2 py-2 px-4"
                onPress={() => {
                  router.push("/auth/registro");
                }}
              ></BotonPrincipal>
            </View>
          </CardBlack>
        </View>
      </ScrollView>
    </ImagenBackground>
  );
}
