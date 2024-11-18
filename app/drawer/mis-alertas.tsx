import CardBlack from "../../components/aplicacion/CardBlack";
import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useListarAlertasQuery } from "../../services/api";

export default function MisAlertasScreen() {
  const { perfil, persona } = useSelector((state: RootState) => state.auth);

  const id_usuario = persona.id_persona;

  const {
    data: dataAlertas,
    error: errorAlertas,
    isLoading: isLoadingAlertas,
    refetch,
  } = useListarAlertasQuery({ id_usuario: id_usuario });

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
          Estas son tus alertas registradas.
        </Text>
      </View>
      <View className="mt-4">
        {!isLoadingAlertas && dataAlertas && (
          <View className="px-2">
            {dataAlertas?.alertasUsuario.map((item: any, index: number) => {
              // Convertir el timestamp de la fecha a un objeto Date
              const fechaObj = item.fecha; // Suponiendo que el campo "fecha" está en cada "item"
              const date = new Date(fechaObj._seconds * 1000);
              date.setMilliseconds(
                date.getMilliseconds() + fechaObj._nanoseconds / 1e6
              );

              // Formatear la fecha como quieras, por ejemplo, en formato ISO:
              const formattedDate = date.toLocaleString();

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.75}
                  className="bg-white p-4 mb-4 rounded-lg shadow shadow-black w-full relative"
                >
                  <View className="flex-row justify-between ">
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
        )}
      </View>
    </ScrollView>

    // <ImagenBackground>
    //   <ScrollView className='flex p-4 w-full'>
    //     <StatusBar style="light" backgroundColor="black" />
    //     <CardBlack>
    //       <LogoVolver
    //         titulo="WOMEN'S SECURITY" estilo_titulo='text-white text-2xl font-bold mb-4'
    //         onPressBack={() => {
    //           router.push("/drawer/tabs/home")
    //         }}
    //       />
    //       <View className='relative w-full py-2 flex items-center rounded'>

    //         <View className='w-full flex flex-row p-2'>
    //           <Text className='text-lg flex-1 text-center text-white'>Fecha</Text>
    //           <Text className='text-lg flex-1 text-center text-white'>Motivo</Text>
    //         </View>

    //         {/* Separador */}
    //         <View className='w-10/12 h-[1px] bg-white mx-auto my-2'></View>

    //         {/* Filas de datos */}
    //         <View className='w-full flex flex-row p-2'>
    //           <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
    //           <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
    //         </View>
    //         <View className='w-full flex flex-row p-2'>
    //           <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
    //           <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
    //         </View>
    //         <View className='w-full flex flex-row p-2'>
    //           <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
    //           <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
    //         </View>
    //         <View className='w-full flex flex-row p-2'>
    //           <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
    //           <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
    //         </View>
    //         <View className='w-full flex flex-row p-2'>
    //           <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
    //           <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
    //         </View>
    //       </View>
    //     </CardBlack>
    //   </ScrollView>
    // </ImagenBackground>
  );
}
