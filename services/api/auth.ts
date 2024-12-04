import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "@env";

const API_URL = EXPO_PUBLIC_BASE_URL;
const API_URL_STRING = API_URL?.replace(/^['"]|['"]$/g, " ");

// Login
const IniciarSesion = async ({ correo, contrasena }: any) => {
  try {
    const response = await axios.post(`${API_URL_STRING}login`, {
      correo,
      password: contrasena,
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    let errorMessage = "Ocurrió un error al iniciar sesión";

    console.log("este es el error", error.response.data);

    if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    } else if (error.request) {
      errorMessage =
        "No se recibió respuesta del servidor. Inténtalo de nuevo más tarde.";
    } else {
      errorMessage = "Error al configurar la solicitud. Inténtalo de nuevo.";
    }

    return { success: false, message: errorMessage };
  }
};

// Registro usuario
const RegistrarUsuario = async ({
  nombres,
  apellidos,
  correo,
  password,
  fecha_nacimiento,
  telefono,
  rut,
  direccion,
  id_comuna,
  id_genero,
}: any) => {
  try {
    const response = await axios.post(`${API_URL}register`, {
      nombre: nombres,
      apellido: apellidos,
      correo: correo,
      password: password,
      fecha_nacimiento: fecha_nacimiento,
      numero_telefono: telefono,
      rut: rut,
      direccion: direccion,
      id_comuna: id_comuna,
      tipo_usuario: 1,
      id_genero: id_genero,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error al registrar el usuario:", error.response.data);
      console.error("Código de estado:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No hubo respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw error;
  }
};

export { IniciarSesion, RegistrarUsuario };
