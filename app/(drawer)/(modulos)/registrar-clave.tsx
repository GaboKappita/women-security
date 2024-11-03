import BotonPrincipal from '../../../components/aplicacion/BotonPrincipal';
import CardBlack from '../../../components/aplicacion/CardBlack';
import ImagenBackground from '../../../components/aplicacion/ImagenBackground';
import LogoVolver from '../../../components/aplicacion/LogoVolver';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

export default function RegistrarClaveScreen() {
  return (
    <ImagenBackground>
      <ScrollView className='flex p-4 w-full bg-[#F5F5F5]'>
        <StatusBar style="light" backgroundColor="black" />
        <CardBlack>
          <LogoVolver
            titulo="WOMEN'S SECURITY" estilo_titulo='text-white text-2xl font-bold mb-4'
            onPressBack={() => {
              router.push("/(drawer)/(tabs)/home")
            }}
          />
          <View className='relative w-full py-2 flex items-center rounded'>
            <Text className='w-10/12 text-white text-center'>Recuerda registrar palabras poco comunes o que no se utilicen en el día a día.</Text>
            <TextInput className='bg-gray-200 my-2 mx-2 p-2 rounded text-center w-full' placeholder='Ingresa la palabra clave' />
            <TextInput className='bg-gray-200 my-2 mx-2 p-2 rounded w-full' placeholder='Tipo de gravedad >' />
            <BotonPrincipal titulo='Registrar clave' estilo_boton='w-full my-2 mx-2 py-2'
              onPress={() => {
                console.log("registrar clave");
              }}>
            </BotonPrincipal>
          </View>
        </CardBlack>
      </ScrollView>
    </ImagenBackground>
  )
}
