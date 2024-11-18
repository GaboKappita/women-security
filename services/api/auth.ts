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

    console.log(error.response.data);

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
  fecha_nacimiento,
  correo,
  telefono,
  rut,
  numero_documento,
  password,
}: any) => {
  try {
    const response = await axios.post(`${API_URL}register`, {
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
