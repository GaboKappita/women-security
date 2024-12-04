import CardBlack from "../../components/aplicacion/CardBlack";
import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useListarAlertasQuery } from "../../services/api";

export default function MisAlertasScreen() {
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  const id_usuario = persona.id_persona;

  const {
    data: dataAlertas,
    error: errorAlertas,
    isLoading: isLoadingAlertas,
    refetch,
  } = useListarAlertasQuery({ id_usuario: id_usuario });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  return (
    <ScrollView
      className="bg-[#F5F5F5] flex p-4 w-full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="light" backgroundColor="black" />
      <LogoVolver
        titulo="WOMEN'S SECURITY"
        estilo_titulo="text-black text-2xl font-bold mb-4"
        onPressBack={() => {
          router.push("/drawer/tabs/home");
        }}
      />
      <View className="relative w-full py-2 flex items-center">
        <Text className="w-10/12 text-black text-center">
          Estas son tus alertas registradas.
        </Text>
      </View>
      <View className="mt-4">
        {isLoadingAlertas || refreshing ? (
          // Indicador de carga
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-black">Cargando alertas...</Text>
          </View>
        ) : dataAlertas?.alertasUsuario?.length > 0 ? (
          // Lista de alertas ordenadas
          <View className="px-2">
            {[...dataAlertas.alertasUsuario]
              .sort((a: any, b: any) => {
                const dateA = new Date(
                  a.fecha._seconds * 1000 + a.fecha._nanoseconds / 1e6
                );
                const dateB = new Date(
                  b.fecha._seconds * 1000 + b.fecha._nanoseconds / 1e6
                );
                return dateB.getTime() - dateA.getTime();
              })
              .map((item: any, index: number) => {
                // Convertir el timestamp de la fecha a un objeto Date
                const fechaObj = item.fecha;
                const date = new Date(fechaObj._seconds * 1000);
                date.setMilliseconds(
                  date.getMilliseconds() + fechaObj._nanoseconds / 1e6
                );

                // Formatear la fecha a DD/MM/YYYY, HH:mm
                const formattedDate =
                  date.toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }) +
                  `, ${date.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.85}
                    className="bg-white p-4 mb-4 rounded-lg shadow shadow-black w-full relative"
                  >
                    <View className="flex-row justify-between">
                      <Text className="text-base font-bold text-black">
                        Comuna
                      </Text>
                      <View className="flex items-end">
                        <Text className="text-sm text-gray-500">
                          {formattedDate}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-sm text-black">{item.comuna}</Text>
                    <Text className="text-base font-bold text-black">
                      Dirección
                    </Text>
                    <Text
                      className="text-sm text-black"
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.direccion}
                    </Text>
                    <Text className="text-base font-bold text-black">
                      Mensaje
                    </Text>
                    <Text
                      className="text-sm text-black"
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.mensaje}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        ) : (
          // Mensaje cuando no hay alertas
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-gray-500">
              No hay alertas disponibles.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
