import React from "react";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { useListarClavesQuery } from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function MisClavesScreen() {
  const { perfil, persona } = useSelector((state: RootState) => state.auth);

  const {
    data: dataClaves,
    error: errorClaves,
    isLoading: isLoadingClaves,
    refetch,
  } = useListarClavesQuery({ id_usuario: persona.id_persona });

  return (
    <ScrollView className="bg-[#F5F5F5] flex p-4 w-full ">
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
          Estas son tus claves registradas.
        </Text>
      </View>
      <View className="mt-4">
        <View className="w-full flex flex-row p-2">
          <Text className="text-lg flex-1 text-center text-black">Mensaje</Text>
          <Text className="text-lg flex-1 text-center text-black">
            Gravedad
          </Text>
        </View>
        <View className="w-11/12 h-[1px] bg-gray-400 mx-auto my-2"></View>
        {!isLoadingClaves && dataClaves && (
          <View>
            {dataClaves?.clavesConDetalles.map((item: any) => (
              <View key={item.id_clave} className="w-full flex flex-row p-2">
                <Text className="text-lg flex-1 text-center text-black">
                  {item.palabra}
                </Text>
                <Text className="text-lg flex-1 text-center text-black">
                  {item.gravedad}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
