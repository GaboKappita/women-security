import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface BotonSecundarioProps {
    titulo?: string;
    estilo_titulo?: string;
    estilo_boton?: string;
    onPress?: () => void;
}

const BotonSecundario: React.FC<BotonSecundarioProps> = ({ titulo, estilo_titulo, estilo_boton, onPress }) => {
    return (
        <TouchableOpacity
            className={`${estilo_boton} flex justify-center items-center rounded `}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <Text className={`${estilo_titulo} text-white`}>{titulo}</Text>
        </TouchableOpacity>
    );
};

export default BotonSecundario;
