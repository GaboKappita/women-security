import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image } from "react-native";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

export default function AyudaScreen() {
  return (
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
          <Text className="w-10/12 text-lg text-white font-bold text-center mb-4">
            ¿Tienes problemas con la ubicación o las alertas?
          </Text>
          <Text className="w-10/12 text-justify text-white mb-4">
            Si estás teniendo dificultades para que la aplicación funcione
            correctamente, asegúrate de activar la ubicación en todo momento.
            Para ello, ve a la configuración de tu celular y habilita la opción
            de ubicación de manera continua. Esto es fundamental para que las
            alertas se envíen correctamente y para que la app funcione como se
            espera.
          </Text>
          <Text className="w-10/12 text-white text-justify">
            Recuerda que la aplicación depende de la ubicación precisa para
            enviar alertas de emergencia. Si no tienes la ubicación activada, la
            app no podrá enviar tu posición en tiempo real. Asegúrate de revisar
            la configuración de tu teléfono y de permitir que la aplicación
            acceda a tu ubicación sin restricciones.
          </Text>
        </View>

        {/* Segunda tarjeta */}
        <View className="flex flex-col items-center p-4 bg-blue-400 h-full rounded">
          <Text className="w-10/12 text-lg text-white font-bold text-center mb-4">
            Cómo registrar la palabra clave
          </Text>
          <Text className="w-10/12 text-justify text-white mb-4">
            Solo debes ir a la sección "Mis Claves" y pulsar el botón "Agregar
            palabra clave". A continuación, se abrirá una ventana donde podrás
            ingresar la palabra clave y seleccionar el nivel de gravedad. Una
            vez hecho esto, se guardará automáticamente.
          </Text>
        </View>
      </Swiper>
    </SafeAreaView>
  );
}
