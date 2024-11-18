import React from 'react';
import { View, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

interface ImagenBackgroundProps {
  children: React.ReactNode; // Propiedad para el contenido dentro del fondo
}

const ImagenBackground: React.FC<ImagenBackgroundProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/fondo.jpg')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode="cover"
    >
      {/* Fondo borroso */}
      <BlurView
        intensity={50}
        tint="dark"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Contenido que se pasará al componente */}
      {children}
    </ImageBackground>
  );
};

export default ImagenBackground;
