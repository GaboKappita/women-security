import BotonPrincipal from "../../components/aplicacion/BotonPrincipal";
import CardBlack from "../../components/aplicacion/CardBlack";
import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { useRef, useState } from "react";
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
import { RegistrarUsuario } from "../../services/api/auth";
import { useListarComunasQuery } from "../../services/api";
import GeneroDropdown from "../../components/aplicacion/registro/GeneroDropdown";
import FechaNacimientoPicker from "../../components/aplicacion/registro/FechaNacimiento";
import ComunaDropdown from "../../components/aplicacion/registro/ComunaDropdown";

const RegisterSchema = Yup.object().shape({
  // run: Yup.string().required("Required"),
  // correo: Yup.string().email("Correo invalido").required("Required"),
  // contrasena: Yup.string()
  //   .min(6, "Demasiado corta, debe ser minimo de 6 caracteres")
  //   .required("Required"),
  // repetirContrasena: Yup.string()
  //   .oneOf([Yup.ref("contrasena"), undefined], "Las contraseñas no coinciden")
  //   .required("Required"),
  // fechaNacimiento: Yup.string().required("La fecha de nacimiento es requerida"),
  // genero: Yup.string().required("El género es requerido"),
  // fechaNacimiento: Yup.date().required("Fecha de nacimiento es requerida"),
});

export default function RegistroScreen() {
  const swiperRef = useRef<Swiper>(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  const {
    data: dataComunas = [{}],
    error: errorComunas,
    isLoading: isLoadingComunas,
    refetch,
  } = useListarComunasQuery({});

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

  const handleRegistrar = (datos: any) => {
    console.log(datos);
    // try {
    // const response = await RegistrarUsuario({});
    // await SecureStore.setItemAsync(
    //   "perfil",
    //   JSON.stringify(response.data.perfil)
    // );
    // await SecureStore.setItemAsync(
    //   "persona",
    //   JSON.stringify(response.data.persona)
    // );
    // dispatch(
    //   loginAction({
    //     perfil: response.data.perfil,
    //     persona: response.data.persona,
    //   })
    // );
    // router.push("/drawer/tabs/home");
    // } catch (error) {
    //   console.error("Error al iniciar sesión: ", error);
    // }
  };

  const mutation = { status: "success" };

  return (
    <ImagenBackground>
      <StatusBar style="light" backgroundColor="black" />
      <ScrollView className="flex w-full">
        <Formik
          initialValues={{
            run: "12312-0",
            nombres: "Juan",
            apellidos: "Perez",
            correo: "atom@gmail.com",
            contrasena: "123456",
            repetirContrasena: "123456",
            comuna: "",
            direccion: "",
            celular: "",
            fechaNacimiento: "",
            genero: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegistrar}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              <Swiper
                ref={swiperRef}
                loop={false}
                scrollEnabled={false}
                showsPagination={false}
              >
                <View className="flex justify-center h-screen p-4 w-full">
                  <CardBlack estiloCard="min-h-[550px] flex-col justify-between">
                    <View>
                      <LogoVolver
                        titulo="Registro de usuario"
                        estilo_titulo="text-white text-2xl font-bold mb-4"
                        onPressBack={() => {
                          router.push("/auth/iniciar-sesion");
                        }}
                      />
                      <TextInput
                        className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                        placeholder="Run"
                        onChangeText={handleChange("run")}
                        onBlur={handleBlur("run")}
                        value={values.run}
                      />
                      {errors.run && touched.run && (
                        <Text className="text-red-500 mb-4">{errors.run}</Text>
                      )}

                      <TextInput
                        className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                        placeholder="Nombres"
                        onChangeText={handleChange("nombres")}
                        onBlur={handleBlur("nombres")}
                        value={values.nombres}
                      />
                      {errors.nombres && touched.nombres && (
                        <Text className="text-red-500 mb-4">
                          {errors.nombres}
                        </Text>
                      )}

                      <TextInput
                        className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                        placeholder="Apellidos"
                        onChangeText={handleChange("apellidos")}
                        onBlur={handleBlur("apellidos")}
                        value={values.apellidos}
                      />
                      {errors.apellidos && touched.apellidos && (
                        <Text className="text-red-500 mb-4">
                          {errors.apellidos}
                        </Text>
                      )}

                      <TextInput
                        className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                        placeholder="Correo electrónico"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.correo}
                        keyboardType="email-address"
                      />
                      {errors.correo && touched.correo && (
                        <Text className="text-red-500 mb-4">
                          {errors.correo}
                        </Text>
                      )}

                      <View className="flex flex-row items-center justify-center mt-4">
                        {/* Botón de ya tiene cuenta */}
                        <BotonPrincipal
                          titulo="Ya tengo una cuenta"
                          estilo_boton="flex-1 m-2 py-2"
                          onPress={() => {
                            router.push("/auth/iniciar-sesion");
                          }}
                        />
                        {/* Botón siguiente */}
                        <BotonPrincipal
                          titulo="Siguiente"
                          estilo_boton="flex-1 m-2 py-2"
                          onPress={siguienteAccion}
                        />
                      </View>
                    </View>
                  </CardBlack>
                </View>

                <View className="flex justify-center h-screen p-4 w-full">
                  <CardBlack estiloCard="min-h-[550px] flex-col justify-between">
                    <View>
                      <LogoVolver
                        titulo="Registro de usuario"
                        estilo_titulo="text-white text-2xl font-bold mb-4"
                        onPressBack={() => {
                          router.push("/auth/iniciar-sesion");
                        }}
                      />

                      <ComunaDropdown
                        value={values.comuna}
                        onChange={(selectedValue: any) =>
                          setFieldValue("comuna", selectedValue)
                        }
                        comunas={dataComunas}
                      />
                      {errors.comuna && touched.comuna && (
                        <Text className="text-red-500 mb-4">
                          {errors.comuna}
                        </Text>
                      )}

                      <TextInput
                        className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                        placeholder="Dirección"
                        onChangeText={handleChange("direccion")}
                        onBlur={handleBlur("direccion")}
                        value={values.direccion}
                      />
                      {errors.direccion && touched.direccion && (
                        <Text className="text-red-500 mb-4">
                          {errors.direccion}
                        </Text>
                      )}

                      <TextInput
                        className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                        placeholder="Celular"
                        onChangeText={handleChange("celular")}
                        onBlur={handleBlur("celular")}
                        value={values.celular}
                      />
                      {errors.celular && touched.celular && (
                        <Text className="text-red-500 mb-4">
                          {errors.celular}
                        </Text>
                      )}

                      <View className="flex flex-row items-center justify-center w-full mb-4">
                        <FechaNacimientoPicker
                          value={values.fechaNacimiento}
                          onChange={(selectedDate: Date) =>
                            setFieldValue(
                              "fechaNacimiento",
                              selectedDate.toISOString()
                            )
                          }
                        />
                        {errors.fechaNacimiento && touched.fechaNacimiento && (
                          <Text className="text-red-500 mb-4">
                            {errors.fechaNacimiento}
                          </Text>
                        )}

                        <GeneroDropdown
                          value={values.genero}
                          onChange={(selectedValue: any) =>
                            setFieldValue("genero", selectedValue)
                          }
                        />
                        {errors.genero && touched.genero && (
                          <Text className="text-red-500 mb-4">
                            {errors.genero}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View className="flex flex-row items-center justify-center">
                      {/* Botón anterior */}
                      <BotonPrincipal
                        titulo="Anterior"
                        estilo_boton="flex-1 m-2 py-2"
                        onPress={anteriorAccion}
                      />
                      {/* Botón siguiente */}
                      <BotonPrincipal
                        titulo="Siguiente"
                        estilo_boton="flex-1 m-2 py-2"
                        onPress={siguienteAccion}
                      />
                    </View>
                  </CardBlack>
                </View>

                <View className="flex justify-center h-screen p-4 w-full">
                  <CardBlack estiloCard="min-h-[550px] flex-col justify-between">
                    <View>
                      <LogoVolver
                        titulo="Registro de usuario"
                        estilo_titulo="text-white text-2xl font-bold mb-4"
                        onPressBack={() => {
                          router.push("/auth/iniciar-sesion");
                        }}
                      />

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

                      <TextInput
                        className="h-12 border border-gray-300 rounded-md px-4 mb-4 bg-white"
                        placeholder="Repetir contraseña"
                        onChangeText={handleChange("repetirContrasena")}
                        onBlur={handleBlur("repetirContrasena")}
                        value={values.repetirContrasena}
                        secureTextEntry
                      />
                      {errors.repetirContrasena &&
                        touched.repetirContrasena && (
                          <Text className="text-red-500 mb-4">
                            {errors.repetirContrasena}
                          </Text>
                        )}
                    </View>
                    <View className="flex flex-row items-center justify-center mt-4">
                      {/* Botón anterior */}
                      <BotonPrincipal
                        titulo="Anterior"
                        estilo_boton="flex-1 m-2 py-2"
                        onPress={anteriorAccion}
                      />
                      <TouchableOpacity
                        className={`flex flex-1 m-2 py-2 justify-center items-center bg-[#ff80b5] rounded-lg ${
                          mutation.status === "pending" ? "opacity-50" : ""
                        }`}
                        onPress={() => {
                          handleSubmit();
                        }}
                        disabled={mutation.status === "pending" || isPressed}
                      >
                        {mutation.status === "pending" || isPressed ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text className="text-white">Crear cuenta</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </CardBlack>
                </View>
              </Swiper>
            </>
          )}
        </Formik>
      </ScrollView>
    </ImagenBackground>
  );
}
