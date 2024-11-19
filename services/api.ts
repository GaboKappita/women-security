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
          url: "obtener-ubicacion-seleccion",
          params,
        };
      },
      keepUnusedDataFor: 0,
      providesTags: [],
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
  useListarGravedadQuery,
  useListarClavesQuery,
  useListarAlertasQuery,
  useListarContactosQuery,
  useListarGruposQuery,
  useListarGrupoCompletoQuery,
  useListarInvitacionesQuery,
  useListarMensajesQuery,
  useListarUbicacionSeleccionQuery,
  useInsertarClaveMutation,
  useActualizarUbicacionMutation,
  useGenerarAlertaMutation,
  useGuardarContactoMutation,
  useInvitarUsuarioMutation,
  useCrearGrupoMutation,
  useEliminarGrupoMutation,
  useEliminarClaveMutation,
  useEditarClaveMutation,
} = apiSlice;
