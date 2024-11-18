import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

export default function AyudaScreen() {
  return (
    <ImagenBackground>
      <SafeAreaView className="flex-1 p-4">
        <StatusBar style="light" backgroundColor="black" />
        <Swiper
          style={{ height: height * 0.8 }} // Altura del Swiper
          dotStyle={{
            backgroundColor: "rgba(0,0,0,.2)",
            width: 8,
            height: 8,
            borderRadius: 4,
            margin: 3,
          }}
          activeDotStyle={{
            backgroundColor: "#000",
            width: 10,
            height: 10,
            borderRadius: 5,
            margin: 3,
          }}
          showsPagination={true} // Muestra los puntos
          loop={false} // No se repite el swiper en bucle
        >
          {/* Primera tarjeta */}
          <View className="flex flex-col items-center p-4 bg-red-400 h-full rounded">
            <Text className="w-10/12 text-lg text-center mb-4">
              ¿Necesitas saber como funciona la aplicación?
            </Text>
            <Text className="w-10/12 text-justify mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              fuga optio in voluptatem est numquam debitis vero, repellat quos
              placeat! Eius soluta veritatis architecto ullam sed? Incidunt,
              quo. Animi, dicta?
            </Text>
            <Text>(Imagen)</Text>
            <Text className="w-10/12 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              fuga optio in voluptatem est numquam debitis vero, repellat quos
              placeat! Eius soluta veritatis architecto ullam sed? Incidunt,
              quo. Animi, dicta?
            </Text>
          </View>

          {/* Segunda tarjeta */}
          <View className="flex flex-col items-center p-4 bg-blue-400 h-full rounded">
            <Text className="w-10/12 text-lg text-center mb-4">
              Como registrar la clave
            </Text>
            <Text>(Imagen)</Text>
          </View>

          {/* Tercera tarjeta */}
          <View className="flex flex-col items-center p-4 bg-green-400 h-full rounded">
            <Text className="w-10/12 text-lg text-center mb-4">
              Como registrar la clave
            </Text>
            <Text className="w-10/12 text-justify mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              fuga optio in voluptatem est numquam debitis vero, repellat quos
              placeat! Eius soluta veritatis architecto ullam sed? Incidunt,
              quo. Animi, dicta?
            </Text>
            <Text>(Imagen)</Text>
          </View>
        </Swiper>
      </SafeAreaView>
    </ImagenBackground>
  );
}
