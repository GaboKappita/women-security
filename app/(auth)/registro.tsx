import BotonPrincipal from "../../components/aplicacion/BotonPrincipal";
import CardBlack from "../../components/aplicacion/CardBlack";
import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/api/auth";
import useFetchComunas from "../../hooks/useFetchComunas";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});

export default function RegistroScreen() {
  const swiperRef = useRef<Swiper>(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { comunas, loading, error } = useFetchComunas();

  // if (loading) {
  //   return <Text>Cargando comunas...</Text>;
  // }

  // if (error) {
  //   return <Text>{error}</Text>;
  // }

  const siguienteAccion = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const anteriorAccion = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["register"],
  });

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="black" />
      <ScrollView>
        <ImagenBackground>
          <Swiper ref={swiperRef} loop={false} showsPagination={false}>
            <View className="flex justify-center h-screen p-4 w-full">
              <CardBlack>
                <LogoVolver
                  titulo="Registro de usuario"
                  estilo_titulo="text-white text-2xl font-bold mb-4"
                  onPressBack={() => {
                    router.push("/(auth)/iniciar-sesion");
                  }}
                />
                <Formik
                  initialValues={{
                    email: "atom@gmail.com",
                    password: "123456",
                    confirmPassword: "123456",
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={(values) => {
                    const data = {
                      nombre: "Gabriel Alonso",
                      apellido: "Olivares Opazo",
                      correo: "gaboolivaresopazo@gmail.com",
                      password: "Hola123$&",
                      fecha_nacimiento: "2002-09-11",
                      numero_telefono: "+56963462711",
                      rut: "21.127.856-0",
                      direccion: "Direccion de mi casa",
                      id_comuna: "0uitcldou0fT6sADzScd",
                      tipo_usuario: 1,
                      id_genero: "TZfnq567GbsAj9VcCFqt",
                      id_municipalidad: "jLk6tks6WFngFWQ1Zf8B",
                    };
                    mutation
                      .mutateAsync(data)
                      .then(() => {
                        setMessage("Registration successful!");
                        setMessageType("success");
                        setTimeout(() => {
                          setMessage("");
                          router.push("/(auth)/iniciar-sesion");
                        }, 2000);
                      })
                      .catch((error) => {
                        setMessage(error?.response?.data?.message);
                        setMessageType("error");
                      });
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
                        placeholder="Email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        keyboardType="email-address"
                      />
                      {errors.email && touched.email && (
                        <Text className="text-red-500 mb-4">
                          {errors.email}
                        </Text>
                      )}

                      <TextInput
                        className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                        placeholder="Password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry
                      />
                      {errors.password && touched.password && (
                        <Text className="text-red-500 mb-4">
                          {errors.password}
                        </Text>
                      )}

                      <TextInput
                        className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                        placeholder="Confirm Password"
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                        secureTextEntry
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text className="text-red-500 mb-4">
                          {errors.confirmPassword}
                        </Text>
                      )}

                      <TouchableOpacity
                        className={`h-12 bg-purple-600 rounded-md justify-center items-center my-4 ${
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
                            Registrarse
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>
                <TextInput
                  className="bg-gray-200 my-2 mx-2 p-2 rounded text-center"
                  placeholder="Run"
                />
                <TextInput
                  className="bg-gray-200 my-2 mx-2 p-2 rounded text-center"
                  placeholder="Nombres"
                />
                <TextInput
                  className="bg-gray-200 my-2 mx-2 p-2 rounded text-center"
                  placeholder="Apellidos"
                />
                <TextInput
                  className="bg-gray-200 my-2 mx-2 p-2 rounded text-center"
                  placeholder="Correo electrónico"
                />
                <View className="flex flex-row items-center justify-center mt-4">
                  {/* Botón de ya tiene cuenta */}
                  <BotonPrincipal
                    titulo="Ya tengo una cuenta"
                    estilo_boton="flex-1 m-2 py-2"
                    onPress={() => {
                      router.push("/(auth)/iniciar-sesion");
                    }}
                  ></BotonPrincipal>
                  {/* Botón siguiente */}
                  <BotonPrincipal
                    titulo="Siguiente"
                    estilo_boton="flex-1 m-2 py-2"
                    onPress={siguienteAccion}
                  ></BotonPrincipal>
                </View>
              </CardBlack>
            </View>

            <View className="flex justify-center h-screen p-4 w-full">
              <CardBlack>
                <LogoVolver
                  titulo="Registro de usuario"
                  estilo_titulo="text-white text-2xl font-bold mb-4"
                  onPressBack={() => {
                    router.push("/(auth)/iniciar-sesion");
                  }}
                />
                <TextInput
                  className="bg-gray-200 my-2 mx-2 p-2 rounded text-center"
                  placeholder="Comuna"
                />
                <TextInput
                  className="bg-gray-200 my-2 mx-2 p-2 rounded text-center"
                  placeholder="Dirección"
                />
                <TextInput
                  className="bg-gray-200 my-2 mx-2 p-2 rounded text-center"
                  placeholder="Celular"
                />
                <View className="flex flex-row items-center justify-center mb-4">
                  <TextInput
                    className="bg-gray-200 my-2 mx-2 p-2 flex-1 rounded text-center"
                    placeholder="Fecha de nacimiento >"
                  />
                  <TextInput
                    className="bg-gray-200 my-2 mx-2 p-2 flex-1 rounded text-center"
                    placeholder="Género >"
                  />
                </View>
                <View className="flex flex-row items-center justify-center">
                  {/* Botón anterior */}
                  <BotonPrincipal
                    titulo="Anterior"
                    estilo_boton="flex-1 m-2 py-2"
                    onPress={anteriorAccion}
                  ></BotonPrincipal>
                  {/* Botón siguiente */}
                  <BotonPrincipal
                    titulo="Siguiente"
                    estilo_boton="flex-1 m-2 py-2"
                    onPress={siguienteAccion}
                  ></BotonPrincipal>
                </View>
              </CardBlack>
            </View>

            <View className="flex justify-center h-screen p-4 w-full">
              <CardBlack>
                <LogoVolver
                  titulo="Registro de usuario"
                  estilo_titulo="text-white text-2xl font-bold mb-4"
                  onPressBack={() => {
                    router.push("/(auth)/iniciar-sesion");
                  }}
                />
                <TextInput
                  className="bg-gray-200 my-2 mx-2 p-2 rounded text-center"
                  placeholder="Contraseña"
                />
                <TextInput
                  className="bg-gray-200 my-2 mx-2 p-2 rounded text-center"
                  placeholder="Repetir contraseña"
                />
                <View className="flex flex-row items-center justify-center mt-4">
                  {/* Botón anterior */}
                  <BotonPrincipal
                    titulo="Anterior"
                    estilo_boton="flex-1 m-2 py-2"
                    onPress={anteriorAccion}
                  ></BotonPrincipal>
                  {/* Botón crear cuenta */}
                  <BotonPrincipal
                    titulo="Crear cuenta"
                    estilo_boton="flex-1 m-2 py-2"
                    onPress={() => {
                      router.push("/(auth)/iniciar-sesion");
                    }}
                  ></BotonPrincipal>
                </View>
              </CardBlack>
            </View>
          </Swiper>
        </ImagenBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
