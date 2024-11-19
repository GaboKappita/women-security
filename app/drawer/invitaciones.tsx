import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { useListarInvitacionesQuery } from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";

export default function InvitacionesScreen() {
  const [refreshing, setRefreshing] = useState(false);
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

  return (
    <ScrollView className="bg-[#F5F5F5] p-4" 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <LogoVolver
        titulo="Mis invitaciones"
        estilo_titulo="text-black text-2xl font-bold mb-4"
        onPressBack={() => {
          router.back();
        }}
      />
      {isLoadingInvitaciones ? (
        <View className="flex items-center justify-center">
          <Text>Cargando...</Text>
        </View>
      ) : dataInvitaciones?.invitaciones?.length > 0 ? (
        dataInvitaciones.invitaciones.map((invitacion: any) => (
          <View
            key={invitacion.id_invitacion}
            className="bg-white rounded-lg p-4 mb-4"
          >
            <Text className="text-lg font-bold text-black">
              {invitacion.nombre_grupo}
            </Text>
            <Text className="text-gray-500">{invitacion.descripcion}</Text>
            <Text className="text-gray-500">
              Creado por: {invitacion.nombre_creador}
            </Text>
            <Text className="text-gray-500">
              Fecha de creación: {invitacion.fecha_creacion}
            </Text>
          </View>
        ))
      ) : (
        <View className="flex items-center justify-center">
          <Text>No hay invitaciones</Text>
        </View>
      )}
    </ScrollView>
  );
}
