import React from "react";
import { View, Text } from "react-native";

const ErrorList = ({ errors }: { errors: any }) => {
  // Convierte el objeto de errores en un array de mensajes
  const errorMessages = Object.values(errors).filter(
    (error) => typeof error === "string" // Solo mensajes de texto
  );

  return (
    <View>
      {errorMessages.length > 0 && (
        <>
          <Text className="text-white font-bold text-lg mb-2">Errores</Text>
          {errorMessages.map((error, index) => (
            <Text key={index} className="text-red-500">
              {index + 1}. {error}
            </Text>
          ))}
        </>
      )}
    </View>
  );
};

export default ErrorList;
