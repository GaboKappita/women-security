import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InputContrasena = ({ placeholder, onChangeText, value }: any) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View className="flex-row items-center border border-gray-300 rounded-lg px-3 my-3">
      <TextInput
        className="flex-1 h-10 p-2 text-base text-white"
        placeholder={placeholder || 'Password'}
        placeholderTextColor="#B0B0B0"
        secureTextEntry={secureText}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity onPress={() => setSecureText(!secureText)}>
        <Ionicons name={secureText ? 'eye-off' : 'eye'} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default InputContrasena;
