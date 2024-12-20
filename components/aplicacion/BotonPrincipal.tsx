import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface BotonPrincipalProps {
    titulo?: string;
    estilo_titulo?: string;
    estilo_boton?: string;
    onPress?: () => void;
}

const BotonPrincipal: React.FC<BotonPrincipalProps> = ({ titulo, estilo_titulo, estilo_boton, onPress }) => {
    return (
        <TouchableOpacity
            className={`${estilo_boton} flex justify-center items-center bg-[#b17940] border-2 border-[#E0D6C4] rounded`}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <Text className={`${estilo_titulo} text-white`}>{titulo}</Text>
        </TouchableOpacity>
    );
};

export default BotonPrincipal;
