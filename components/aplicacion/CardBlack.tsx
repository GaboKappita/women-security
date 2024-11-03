import React from 'react';
import { View } from 'react-native';

interface CardBlackProps {
    estiloCard?: string;
    children: React.ReactNode;
}
const CardBlack: React.FC<CardBlackProps> = ({ estiloCard, children }) => {
    return (
        <View className={`${estiloCard} border-2 border-black h-fit p-4 rounded-xl`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            {children}
        </View>
    );
};

export default CardBlack;