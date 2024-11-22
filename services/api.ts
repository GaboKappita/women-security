import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EXPO_PUBLIC_BASE_URL } from "@env";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: EXPO_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    listarComunas: builder.query({
      query: () => {
        const params = {};
        return {
          url: "comunas",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarGeneros: builder.query({
      query: () => {
        const params = {};
        return {
          url: "generos",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarGravedad: builder.query({
      query: () => {
        const params = {};
        return {
          url: "listar-gravedades",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarClaves: builder.query({
      query: ({ id_usuario }) => {
        const params = {
          id_usuario,
        };
        return {
          url: "obtener-claves-usuario",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarAlertas: builder.query({
      query: ({ id_usuario }) => {
        const params = {
          id_usuario,
        };
        return {
          url: "alertas-usuario",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarContactos: builder.query({
      query: ({ id_usuario }) => {
        const params = {
          id_usuario,
        };
        return {
          url: "ver-contactos",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarGrupos: builder.query({
      query: ({ id_usuario }) => {
        const params = {
          id_usuario,
        };
        return {
          url: "ver-grupos-usuario",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarGrupoCompleto: builder.query({
      query: ({ id_grupo }) => {
        const params = { id_grupo };
        return {
          url: "grupo-completo",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarInvitaciones: builder.query({
      query: ({ id_usuario }) => {
        const params = { id_usuario };
        return {
          url: "ver-invitaciones",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarMensajes: builder.query({
      query: ({ id_persona }) => {
        const params = { id_persona };
        return {
          url: "obtener-mensajes",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    listarUbicacionSeleccion: builder.query({
      query: ({ id_persona }) => {
        const params = { id_persona };
        return {
          url: "listar-ubicacion-seleccion",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    actualizarUbicacion: builder.mutation({
      query: ({ id_persona, tipo, id_grupo, id_persona_buscar }) => ({
        url: "actualizar-ubicacion-seleccion",
        method: "POST",
        body: {
          id_persona,
          tipo,
          id_grupo,
          id_persona_buscar,
        },
      }),
      invalidatesTags: [],
    }),
    listarDatosUsuario: builder.query({
      query: ({ uid }) => {
        const params = { uid };
        return {
          url: "user",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
    }),
    editarUsuario: builder.mutation({
      query: ({
        uid,
        nombre,
        apellido,
        numero_telefono,
        direccion,
        correo,
        fecha_nacimiento,
        imagen_usuario,
        nombre_usuario,
        password,
      }) => ({
        url: "update-profile",
        method: "PUT",
        body: {
          uid,
          ...(nombre && { nombre }),
          ...(apellido && { apellido }),
          ...(numero_telefono && { numero_telefono }),
          ...(direccion && { direccion }),
          ...(correo && { correo }),
          ...(fecha_nacimiento && { fecha_nacimiento }),
          ...(imagen_usuario && { imagen_usuario }),
          ...(nombre_usuario && { nombre_usuario }),
          ...(password && { password }),
        },
      }),
      invalidatesTags: [],
    }),
    generarAlerta: builder.mutation({
      query: ({ id_usuario, latitud, longitud, id_gravedad, mensaje }) => ({
        url: "guardar-ubicacion",
        method: "POST",
        body: {
          id_usuario,
          latitud,
          longitud,
          id_gravedad,
          mensaje,
        },
      }),
      invalidatesTags: [],
    }),
    guardarContacto: builder.mutation({
      query: ({ nombres, apellidos, celular, email, id_usuario }) => ({
        url: "guardar-contacto",
        method: "POST",
        body: {
          nombres,
          apellidos,
          celular,
          email,
          id_usuario,
        },
      }),
      invalidatesTags: [],
    }),
    eliminarContacto: builder.mutation({
      query: ({ id_contacto }) => ({
        url: "borrar-contacto",
        method: "DELETE",
        body: {
          id_contacto,
        },
      }),
      invalidatesTags: [],
    }),
    editarContacto: builder.mutation({
      query: ({ id_contacto, nombres, apellidos, celular, email }) => ({
        url: "editar-contacto",
        method: "PUT",
        body: {
          id_contacto,
          nombres,
          apellidos,
          celular,
          email,
        },
      }),
      invalidatesTags: [],
    }),
    invitarUsuario: builder.mutation({
      query: ({ id_grupo, celular, id_usuario_emisor }) => ({
        url: "invitar-usuario",
        method: "POST",
        body: {
          id_grupo,
          celular,
          id_usuario_emisor,
        },
      }),
      invalidatesTags: [],
    }),
    eliminarUsuarioGrupo: builder.mutation({
      query: ({ id_grupo, id_usuario }) => ({
        url: "grupo/eliminar-usuario",
        method: "POST",
        body: {
          id_grupo,
          id_usuario,
        },
      }),
      invalidatesTags: [],
    }),
    responderInvitacion: builder.mutation({
      query: ({ id_InvitacionGrupo, aceptar }) => ({
        url: "responder-invitacion",
        method: "POST",
        body: {
          id_InvitacionGrupo,
          aceptar,
        },
      }),
      invalidatesTags: [],
    }),
    crearGrupo: builder.mutation({
      query: ({
        nombre_grupo,
        id_usuario_creador,
        color_hex,
        descripcion,
      }) => ({
        url: "crear-grupo",
        method: "POST",
        body: {
          nombre_grupo,
          id_usuario_creador,
          color_hex,
          descripcion,
        },
      }),
      invalidatesTags: [],
    }),
    eliminarGrupo: builder.mutation({
      query: ({ id_grupo }) => ({
        url: "eliminar-grupo",
        method: "DELETE",
        body: {
          id_grupo,
        },
      }),
      invalidatesTags: [],
    }),
    editarGrupo: builder.mutation({
      query: ({ id_grupo, nombre_grupo, color_hex, descripcion }) => ({
        url: "editar-grupo",
        method: "PUT",
        body: { id_grupo, nombre_grupo, color_hex, descripcion },
      }),
      invalidatesTags: [],
    }),
    insertarClave: builder.mutation({
      query: ({ id_gravedad, id_usuario, palabra, id_mensaje }) => ({
        url: "guardar-clave",
        method: "POST",
        body: {
          id_gravedad,
          id_usuario,
          palabra,
          id_mensaje,
        },
      }),
      invalidatesTags: [],
    }),
    eliminarClave: builder.mutation({
      query: ({ id_clave }) => ({
        url: "eliminar-clave",
        method: "DELETE",
        body: {
          id_clave,
        },
      }),
      invalidatesTags: [],
    }),
    editarClave: builder.mutation({
      query: ({ id_clave, id_gravedad, id_mensaje, palabra }) => ({
        url: "editar-clave",
        method: "PUT",
        body: { id_clave, id_gravedad, id_mensaje, palabra },
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useListarComunasQuery,
  useListarGenerosQuery,
  useListarGravedadQuery,
  useListarClavesQuery,
  useListarAlertasQuery,
  useListarContactosQuery,
  useListarGruposQuery,
  useListarGrupoCompletoQuery,
  useListarInvitacionesQuery,
  useListarMensajesQuery,
  useListarUbicacionSeleccionQuery,
  useActualizarUbicacionMutation,
  useListarDatosUsuarioQuery,
  useEditarUsuarioMutation,
  useGenerarAlertaMutation,
  useGuardarContactoMutation,
  useEliminarContactoMutation,
  useEditarContactoMutation,
  useInvitarUsuarioMutation,
  useEliminarUsuarioGrupoMutation,
  useResponderInvitacionMutation,
  useCrearGrupoMutation,
  useEliminarGrupoMutation,
  useEditarGrupoMutation,
  useInsertarClaveMutation,
  useEliminarClaveMutation,
  useEditarClaveMutation,
} = apiSlice;
 