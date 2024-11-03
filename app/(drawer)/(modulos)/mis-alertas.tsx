import CardBlack from '../../../components/aplicacion/CardBlack';
import ImagenBackground from '../../../components/aplicacion/ImagenBackground';
import LogoVolver from '../../../components/aplicacion/LogoVolver';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function MisAlertasScreen() {
  return (
    <ImagenBackground>
      <ScrollView className='flex p-4 w-full'>
        <StatusBar style="light" backgroundColor="black" />
        <CardBlack>
          <LogoVolver
            titulo="WOMEN'S SECURITY" estilo_titulo='text-white text-2xl font-bold mb-4'
            onPressBack={() => {
              router.push("/(drawer)/(tabs)/home")
            }}
          />
          <View className='relative w-full py-2 flex items-center rounded'>

            <View className='w-full flex flex-row p-2'>
              <Text className='text-lg flex-1 text-center text-white'>Fecha</Text>
              <Text className='text-lg flex-1 text-center text-white'>Motivo</Text>
            </View>

            {/* Separador */}
            <View className='w-10/12 h-[1px] bg-white mx-auto my-2'></View>

            {/* Filas de datos */}
            <View className='w-full flex flex-row p-2'>
              <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
              <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
            </View>
            <View className='w-full flex flex-row p-2'>
              <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
              <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
            </View>
            <View className='w-full flex flex-row p-2'>
              <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
              <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
            </View>
            <View className='w-full flex flex-row p-2'>
              <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
              <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
            </View>
            <View className='w-full flex flex-row p-2'>
              <Text className='text-lg flex-1 text-center text-white'>21/09/2024</Text>
              <Text className='text-lg flex-1 text-center text-white'>Robo</Text>
            </View>
          </View>
        </CardBlack>
      </ScrollView>
    </ImagenBackground>
  )
}
