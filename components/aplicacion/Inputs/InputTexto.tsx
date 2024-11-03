import React from 'react';
import { View, TextInput } from 'react-native';

const InputTexto = ({ placeholder, onChangeText, value }: any) => {
    return (
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 my-3">
            <TextInput
                className="flex-1 h-10 p-2 text-base text-white"
                placeholder={placeholder || 'Enter text'}
                placeholderTextColor="#B0B0B0"
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    );
};

export default InputTexto;
