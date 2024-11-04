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
    insertarClave: builder.mutation({
      query: ({ id_gravedad, id_usuario, palabra, id_mensaje }) => ({
        url: "guardar-clave",
        method: "POST",
        body: {
          id_gravedad,
          id_usuario,
          palabra,
          id_mensaje,
          /* 
          ...(palabra && { palabra }),
           */
        },
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useListarComunasQuery,
  useListarGravedadQuery,
  useListarClavesQuery,
  useInsertarClaveMutation,
} = apiSlice;
