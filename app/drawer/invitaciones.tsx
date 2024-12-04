import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useListarInvitacionesQuery,
  useResponderInvitacionMutation,
} from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function InvitacionesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const id_usuario = persona.id_persona;
  const {
    data: dataInvitaciones = { invitaciones: [] },
    error: errorInvitaciones,
    isLoading: isLoadingInvitaciones,
    refetch: refetchInvitaciones,
  } = useListarInvitacionesQuery({ id_usuario: id_usuario });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchInvitaciones().finally(() => setRefreshing(false));
  }, [refetchInvitaciones]);

  const [
    responderInvitacion,
    {
      isLoading: isLoadingInvitacion,
      error: errorInvitacion,
      data: dataInvitacion,
    },
  ] = useResponderInvitacionMutation();

  const handleAccept = (idInvitacion: string) => {
    setRefetching(true);
    responderInvitacion({
      id_InvitacionGrupo: idInvitacion,
      aceptar: true,
    })
      .unwrap()
      .then((response: any) => {
        setRefreshing(true);
        refetchInvitaciones().finally(() => {
          setRefreshing(false);
          setRefetching(false);
        });
      })
      .catch((error: any) => {
        setRefetching(false);
        console.error("Error al enviar el Alerta:", error);
      });
  };

  const handleReject = (idInvitacion: string) => {
    setRefetching(true);
    responderInvitacion({
      id_InvitacionGrupo: idInvitacion,
      aceptar: false,
    })
      .unwrap()
      .then((response: any) => {
        setRefreshing(true);
        refetchInvitaciones().finally(() => {
          setRefreshing(false);
          setRefetching(false);
        });
      })
      .catch((error: any) => {
        setRefetching(false);
        console.error("Error al enviar el Alerta:", error);
      });
  };

  return (
    <ScrollView
      className="bg-[#F5F5F5] p-4"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LogoVolver
        titulo="Mis invitaciones"
        estilo_titulo="text-black text-2xl font-bold mb-4"
        onPressBack={() => {
          router.back();
        }}
      />
      {isLoadingInvitaciones || refreshing || refetching ? (
        <View className="flex items-center justify-center">
          <Text>Cargando...</Text>
        </View>
      ) : dataInvitaciones?.invitaciones?.length > 0 ? (
        dataInvitaciones.invitaciones.map((invitacion: any) => {
          const fecha = new Date(invitacion.fecha_invitacion._seconds * 1000);
          const formattedDate = fecha.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <View
              key={invitacion.id_InvitacionGrupo}
              className="bg-white rounded-lg shadow p-4 mb-4 flex-row items-center justify-between"
            >
              {/* Izquierda: Información de la invitación */}
              <View className="flex-1">
                <Text className="text-sm text-gray-500">{formattedDate}</Text>
                <Text className="text-base text-black pr-4">
                  {invitacion.emisor.nombre} {invitacion.emisor.apellido} te ha
                  invitado a unirte al grupo {invitacion.grupo.nombre_grupo}
                </Text>
              </View>

              {/* Derecha: Botones de acción */}
              <View className="flex-row items-center space-x-2">
                <TouchableOpacity
                  className="bg-red-500 p-2 rounded-full"
                  onPress={() => handleReject(invitacion.id_InvitacionGrupo)}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-500 p-2 rounded-full"
                  onPress={() => handleAccept(invitacion.id_InvitacionGrupo)}
                >
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      ) : (
        <View className="flex items-center justify-center">
          <Text>No tienes invitaciones</Text>
        </View>
      )}
    </ScrollView>
  );
}
