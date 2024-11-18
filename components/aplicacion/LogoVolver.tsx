import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderWithIconProps {
  titulo?: string;
  estilo_titulo?: string;
  onPressBack?: () => void; 
}

const LogoVolver: React.FC<HeaderWithIconProps> = ({ titulo, estilo_titulo, onPressBack }) => {
  return (
    <View className='relative w-full flex items-center'>
      {/* Botón de retroceso */}
      <TouchableOpacity
        className='absolute bg-white border-2 border-black rounded-lg left-2 top-2 w-10 h-10 justify-center items-center'
        onPress={onPressBack}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo de imagen */}
      <Image
        source={require('../../assets/images/LogoEntero.png')}
        className='w-32 h-32 rounded-xl'
        resizeMode="contain"
      />

      {/* Título dinámico */}
      <Text className={`${estilo_titulo} mt-4`}>{titulo}</Text>
    </View>
  );
};

export default LogoVolver;
