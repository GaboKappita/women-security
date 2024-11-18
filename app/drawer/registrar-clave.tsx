import BotonPrincipal from "../../components/aplicacion/BotonPrincipal";
import CardBlack from "../../components/aplicacion/CardBlack";
import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useListarGravedadQuery } from "../../services/api";
import InputOpciones from "../../components/aplicacion/Inputs/InputOpciones";
import CustomSelector from "../../components/aplicacion/CustomSelector";

export default function RegistrarClaveScreen() {
  const [selectedGravedad, setSelectedGravedad] = useState(0);
  const {
    data: dataGravedad,
    error: errorGravedad,
    isLoading: isLoadingGravedad,
    refetch,
  } = useListarGravedadQuery({});

  const handleSelect = () => {
    console.log("seleccionado");
  };

  return (
    <ScrollView className="bg-[#F5F5F5] flex p-4 w-full ">
      <StatusBar style="light" backgroundColor="black" />
      <LogoVolver
        titulo="WOMEN'S SECURITY"
        estilo_titulo="text-black text-2xl font-bold mb-4"
        onPressBack={() => {
          router.push("/drawer/tabs/home");
        }}
      />
      <View className="relative w-full py-2 flex items-center">
        <Text className="w-10/12 text-black text-center">
          Recuerda registrar palabras poco comunes o que no se utilicen en el
          día a día.
        </Text>
      </View>
      <View className="mt-4">
        <Text className="my-4 font-bold">Ingresa la palabra clave</Text>
        <TextInput
          className="bg-white rounded-lg px-4 py-3 text-base shadow shadow-black"
          placeholder="Escribe aqui..."
        />
        <Text className="my-4 font-bold">Tipo de gravedad</Text>
        {!isLoadingGravedad && (
          <CustomSelector
            options={dataGravedad.gravedades}
            onSelect={(gravedad) => setSelectedGravedad(gravedad.id_gravedad)}
          />
        )}
        <BotonPrincipal
          titulo="Registrar clave"
          estilo_boton="w-full my-2 mt-4 p-3"
          onPress={() => {
            console.log("registrar clave");
          }}
        ></BotonPrincipal>
      </View>
    </ScrollView>
  );
}
