import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagenBackground from '../../components/aplicacion/ImagenBackground';
import CardBlack from '../../components/aplicacion/CardBlack';
import LogoVolver from '../../components/aplicacion/LogoVolver';
import BotonPrincipal from '../../components/aplicacion/BotonPrincipal';

export default function RecuperarScreen() {
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="black" />
      <ScrollView>
        <ImagenBackground>
          <View className='flex justify-center h-screen p-4 w-full'>
            <CardBlack>
              <LogoVolver
                titulo="WOMEN'S SECURITY" estilo_titulo='text-white text-2xl font-bold mb-4'
                onPressBack={() => {
                  router.push("/(auth)/iniciar-sesion")
                }}
              />
              <Text className='text-center text-base text-white mb-4'>Ingrese el correo electrónico para enviar instrucciones de restableciiento de contraseña.</Text>
              <TextInput className='bg-gray-200 my-2 mx-2 p-2 rounded' placeholder='Ingresa un correo electrónico' />
              {/* Botón de envio de correo */}
              <BotonPrincipal titulo='Enviar correo' estilo_boton='my-2 mx-2 py-2'
                onPress={() => {
                  router.push("/(auth)/iniciar-sesion")
                }}>
              </BotonPrincipal>
            </CardBlack>
          </View>
        </ImagenBackground>
      </ScrollView>
    </SafeAreaView >
  )
}
