import { useEffect } from "react";
import { router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
import BotonSecundario from "../../components/aplicacion/BotonSecundario";
import CardBlack from "../../components/aplicacion/CardBlack";
import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/api/api";
import { Formik } from "formik";

const LoginSchema = Yup.object().shape({
  correo: Yup.string().email("Correo invalido").required("Required"),
  contrasena: Yup.string()
    .min(6, "Contraseña demasiada corta")
    .required("Required"),
});

export default function IniciarSesionScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  //dispatch
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    if (user) {
      router.push("/(drawer)/(tabs)/home");
    }
  }, []);

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
                correo: "gaboolivaresopazo@gmail.com",
                contrasena: "Hola123$&",
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                try {
                  const result = await mutation.mutateAsync(values);
                  if (!result.success) {
                    Alert.alert("Credenciales no válidas", result.message, [
                      { text: "OK" },
                    ]);
                    setMessage(result.message || "");
                    setMessageType("error");
                    return;
                  }
                  setMessage("Inicio de sesión exitoso");
                  setMessageType("exitoso");
                  router.push("/(drawer)/(tabs)/home");
                } catch (err) {
                  console.error("Error during mutation:", err);
                  // Puedes manejar un error global si algo sale mal
                  setMessage(
                    "Ocurrió un error inesperado. Inténtalo de nuevo."
                  );
                  setMessageType("error");
                }
              }}
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
                    value={values.correo}
                    keyboardType="email-address"
                  />
                  {errors.correo && touched.correo && (
                    <Text className="text-red-500 mb-4">{errors.correo}</Text>
                  )}

                  <TextInput
                    className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                    placeholder="Contraseña"
                    onChangeText={handleChange("contrasena")}
                    onBlur={handleBlur("contrasena")}
                    value={values.contrasena}
                    secureTextEntry
                  />
                  {errors.contrasena && touched.contrasena && (
                    <Text className="text-red-500 mb-4">
                      {errors.contrasena}
                    </Text>
                  )}

                  <TouchableOpacity
                    activeOpacity={0.8}
                    className={`h-12 bg-[#b17940] rounded-md justify-center items-center my-4 ${
                      mutation.status === "pending" ? "opacity-50" : ""
                    }`}
                    onPress={() => {
                      handleSubmit();
                    }}
                    disabled={mutation.status === "pending"}
                  >
                    {mutation.status === "pending" ? (
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
            <BotonSecundario
              titulo="¿Olvidaste tu contraseña?"
              estilo_boton="my-2 mx-2 py-2"
              onPress={() => {
                router.push("/(auth)/recuperar");
              }}
            ></BotonSecundario>
            <View className="flex flex-row items-center justify-center">
              <Text className="text-white">¿No tienes cuenta?</Text>
              {/* Botón de crear cuenta */}
              <BotonPrincipal
                titulo="CREA UNA AQUÍ"
                estilo_boton="m-2 py-2 px-4"
                onPress={() => {
                  router.push("/(auth)/registro");
                }}
              ></BotonPrincipal>
            </View>
          </CardBlack>
        </View>
      </ScrollView>
    </ImagenBackground>
  );
}
