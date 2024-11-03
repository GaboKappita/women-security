import React from 'react';
import { View, Text, Image } from 'react-native';

interface HeaderWithIconProps {
  titulo?: string;
  estilo_titulo?: string;
}

const Logo: React.FC<HeaderWithIconProps> = ({ titulo, estilo_titulo }) => {
  return (
    <View className='relative w-full flex items-center'>

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

export default Logo;
