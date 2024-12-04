import BotonPrincipal from "../../components/aplicacion/BotonPrincipal";
import CardBlack from "../../components/aplicacion/CardBlack";
import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { RegistrarUsuario } from "../../services/api/auth";
import {
  useListarComunasQuery,
  useListarGenerosQuery,
} from "../../services/api";
import GeneroDropdown from "../../components/aplicacion/registro/GeneroDropdown";
import FechaNacimientoPicker from "../../components/aplicacion/registro/FechaNacimiento";
import ComunaDropdown from "../../components/aplicacion/registro/ComunaDropdown";
import ErrorList from "../../components/aplicacion/registro/ListaErrores";
import CalendarPicker from "../../components/aplicacion/registro/FechaNacimiento";
import CalendarPicker2 from "../../components/aplicacion/registro/FechaNacimiento2";

const RegisterSchema = Yup.object().shape({
  // Validación para RUN: Obligatorio, con un patrón básico para formato correcto
  run: Yup.string()
    .matches(
      /^[0-9]+-[0-9kK]{1}$/,
      "El RUN debe tener el formato correcto (ejemplo: 12345678-9)"
    )
    .required("El RUN es obligatorio"),

  // Validación para correo: Obligatorio y debe ser un email válido
  correo: Yup.string()
    .email("El correo no es válido")
    .required("El correo es obligatorio"),

  // Nombres: Obligatorio
  nombres: Yup.string().required("El nombre es obligatorio"),

  // Apellidos: Obligatorio
  apellidos: Yup.string().required("El apellido es obligatorio"),

  // Fecha de nacimiento: Obligatoria
  fechaNacimiento: Yup.string().required(
    "La fecha de nacimiento es obligatoria"
  ),

  // Género: Obligatorio
  genero: Yup.string().required("El género es obligatorio"),

  // Dirección: Opcional pero con longitud mínima
  direccion: Yup.string()
    .min(4, "La dirección debe tener al menos 4 caracteres")
    .optional(),

  // Comuna: Obligatoria
  comuna: Yup.string().required("La comuna es obligatoria"),

  // Celular: Obligatorio y debe ser numérico
  celular: Yup.string()
    .matches(
      /^[0-9]{8,15}$/,
      "El número de celular debe tener entre 8 y 15 dígitos numéricos"
    )
    .required("El número de celular es obligatorio"),

  // Contraseña: Mínimo de 6 caracteres y obligatorio
  contrasena: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),

  // Repetir contraseña: Debe coincidir con el campo de contraseña
  repetirContrasena: Yup.string()
    .required("Debes confirmar tu contraseña")
    .test(
      "passwords-match",
      "Las contraseñas no coinciden",
      function (value: any) {
        return value === this.parent.contrasena;
      }
    ),
});

export default function RegistroScreen() {
  const swiperRef = useRef<Swiper>(null);
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);

  const {
    data: dataComunas = [{}],
    error: errorComunas,
    isLoading: isLoadingComunas,
  } = useListarComunasQuery({});

  const {
    data: dataGeneros = [{}],
    error: errorGeneros,
    isLoading: isLoadingGeneros,
  } = useListarGenerosQuery({});

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

  const handleRegistrar = async (datos: any) => {
    setIsPressed(true);
    try {
      const data = {
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        correo: datos.correo,
        password: datos.contrasena,
        fecha_nacimiento: datos.fechaNacimiento,
        telefono: datos.celular,
        rut: datos.run,
        direccion: datos.direccion,
        id_comuna: datos.comuna,
        id_genero: datos.genero,
      };
      const response = await RegistrarUsuario(data);
      // Muestra la alerta de registro exitoso
      Alert.alert(
        "¡Registrado con éxito!",
        "Tu cuenta ha sido creada correctamente.",
        [
          {
            text: "Aceptar",
            onPress: () => {
              // Cuando el usuario cierra la alerta, lo rediriges a la página de iniciar sesión
              router.replace("/auth/iniciar-sesion");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      setIsPressed(false);
      Alert.alert("Error", "Hubo un problema al registrar tu cuenta.");
    }
  };

  const mutation = { status: "success" };

  return (
    <ImagenBackground>
      <StatusBar style="light" backgroundColor="black" />
      <ScrollView className="flex w-full">
        <Formik
          initialValues={{
            run: "211278459-3",
            nombres: "Juan",
            apellidos: "Pérez",
            correo: "juan@gmail.com",
            contrasena: "123456",
            repetirContrasena: "123456",
            comuna: "oOwwYi6Vx3VdeGeXr0fp",
            direccion: "Calle Falsa 123",
            celular: "963462711",
            fechaNacimiento: "2002-09-11",
            genero: "TZfnq567GbsAj9VcCFqt",
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
                        className={`${
                          errors.run && touched.run
                            ? "border-[3px] border-red-500"
                            : "border border-gray-300"
                        } h-12 rounded-md px-4 mb-4 bg-white`}
                        placeholder="Run"
                        onChangeText={handleChange("run")}
                        onBlur={handleBlur("run")}
                      />
                      {errors.run && touched.run && (
                        <Text className="text-red-500 mb-4">{errors.run}</Text>
                      )}

                      <TextInput
                        className={`${
                          errors.nombres && touched.nombres
                            ? "border-[3px] border-red-500"
                            : "border border-gray-300"
                        } h-12 rounded-md px-4 mb-4 bg-white`}
                        placeholder="Nombres"
                        onChangeText={handleChange("nombres")}
                        onBlur={handleBlur("nombres")}
                      />
                      {errors.nombres && touched.nombres && (
                        <Text className="text-red-500 mb-4">
                          {errors.nombres}
                        </Text>
                      )}

                      <TextInput
                        className={`${
                          errors.apellidos && touched.apellidos
                            ? "border-[3px] border-red-500"
                            : "border border-gray-300"
                        } h-12 rounded-md px-4 mb-4 bg-white`}
                        placeholder="Apellidos"
                        onChangeText={handleChange("apellidos")}
                        onBlur={handleBlur("apellidos")}
                      />
                      {errors.apellidos && touched.apellidos && (
                        <Text className="text-red-500 mb-4">
                          {errors.apellidos}
                        </Text>
                      )}

                      <TextInput
                        className={`${
                          errors.correo && touched.correo
                            ? "border-[3px] border-red-500"
                            : "border border-gray-300"
                        } h-12 rounded-md px-4 mb-4 bg-white`}
                        placeholder="Correo electrónico"
                        onChangeText={handleChange("correo")}
                        onBlur={handleBlur("correo")}
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

                      {isLoadingComunas && (
                        <ComunaDropdown
                          value={values.comuna}
                          onChange={(selectedValue: any) =>
                            setFieldValue("comuna", selectedValue)
                          }
                          comunas={dataComunas}
                          error={errors.comuna}
                          touched={touched.comuna}
                          isLoading={isLoadingComunas}
                        />
                      )}
                      {errors.comuna && touched.comuna && (
                        <Text className="text-red-500 mb-4">
                          {errors.comuna}
                        </Text>
                      )}

                      <TextInput
                        className={`${
                          errors.direccion && touched.direccion
                            ? "border-[3px] border-red-500"
                            : "border border-gray-300"
                        } h-12 rounded-md px-4 mb-4 bg-white`}
                        placeholder="Dirección"
                        onChangeText={handleChange("direccion")}
                        onBlur={handleBlur("direccion")}
                      />
                      {errors.direccion && touched.direccion && (
                        <Text className="text-red-500 mb-4">
                          {errors.direccion}
                        </Text>
                      )}

                      <TextInput
                        className={`${
                          errors.celular && touched.celular
                            ? "border-[3px] border-red-500"
                            : "border border-gray-300"
                        } h-12 rounded-md px-4 mb-4 bg-white`}
                        placeholder="Celular"
                        onChangeText={handleChange("celular")}
                        onBlur={handleBlur("celular")}
                      />
                      {errors.celular && touched.celular && (
                        <Text className="text-red-500 mb-4">
                          {errors.celular}
                        </Text>
                      )}

                      <View className="flex flex-row items-center justify-center w-full mb-4">
                        <CalendarPicker2
                          initialDate={values.fechaNacimiento}
                          onDateChange={(date) =>
                            setFieldValue("fechaNacimiento", date)
                          }
                        />
                        
                        <View className="mx-2" />

                        <GeneroDropdown
                          value={values.genero}
                          onChange={(selectedValue: any) =>
                            setFieldValue("genero", selectedValue)
                          }
                          generos={dataGeneros}
                          error={errors.genero}
                          touched={touched.genero}
                          isLoading={isLoadingGeneros}
                        />
                      </View>
                      <View className="flex flex-row items-center justify-center w-full mb-4">
                        <View className="flex-1">
                          {errors.fechaNacimiento &&
                            touched.fechaNacimiento && (
                              <Text className="text-red-500 mb-4">
                                {errors.fechaNacimiento}
                              </Text>
                            )}
                        </View>
                        <View className="flex-1">
                          {errors.genero && touched.genero && (
                            <Text className="text-red-500 mb-4">
                              {errors.genero}
                            </Text>
                          )}
                        </View>
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
                        className={`${
                          errors.contrasena && touched.contrasena
                            ? "border-[3px] border-red-500"
                            : "border border-gray-300"
                        } h-12 rounded-md px-4 mb-4 bg-white`}
                        placeholder="Contraseña"
                        onChangeText={handleChange("contrasena")}
                        onBlur={handleBlur("contrasena")}
                        secureTextEntry
                      />

                      <TextInput
                        className={`${
                          errors.repetirContrasena && touched.repetirContrasena
                            ? "border-[3px] border-red-500"
                            : "border border-gray-300"
                        } h-12 rounded-md px-4 mb-4 bg-white`}
                        placeholder="Repetir contraseña"
                        onChangeText={handleChange("repetirContrasena")}
                        onBlur={handleBlur("repetirContrasena")}
                        secureTextEntry
                      />

                      <View>
                        <ErrorList errors={errors} />
                      </View>
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
