import BotonPrincipal from "../../components/aplicacion/BotonPrincipal";
import CardBlack from "../../components/aplicacion/CardBlack";
import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import LogoVolver from "../../components/aplicacion/LogoVolver";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  useInsertarClaveMutation,
  useListarGravedadQuery,
  useListarMensajesQuery,
} from "../../services/api";
import InputOpciones from "../../components/aplicacion/Inputs/InputOpciones";
import CustomSelector from "../../components/aplicacion/CustomSelector";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function RegistrarClaveScreen() {
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const id_usuario = persona.id_persona;

  const [selectedGravedad, setSelectedGravedad] = useState(0);
  const [palabraClave, setPalabraClave] = useState("");
  const {
    data: dataGravedad,
    error: errorGravedad,
    isLoading: isLoadingGravedad,
    refetch,
  } = useListarGravedadQuery({});

  const {
    data: dataMensajes = { mensajes: [] },
    error: errorMensajes,
    isLoading: isLoadingMensajes,
  } = useListarMensajesQuery({ id_persona: id_usuario });

  const mensaje_predeterminado = dataMensajes?.mensajes[0];

  const [
    guardarClave,
    {
      isLoading: isLoadingGuardarClave,
      error: errorGuardarClave,
      data: dataGuardarClave,
    },
  ] = useInsertarClaveMutation();

  const handleGuardarClave = () => {
    const data = {
      id_gravedad: selectedGravedad,
      id_usuario: id_usuario,
      palabra: palabraClave,
      id_mensaje: mensaje_predeterminado.id_mensaje,
    };

    guardarClave(data)
      .unwrap()
      .then((response: any) => {
        setSelectedGravedad(0);
        setPalabraClave("");
      })
      .catch((error: any) => {
        console.error("Error al enviar el Alerta:", error);
      });
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
        <View className="bg-white rounded-lg shadow shadow-black">
          <TextInput
            className="px-4 py-3 text-base"
            value={palabraClave}
            onChangeText={setPalabraClave}
            placeholder="Escribe aqui..."
          />
        </View>
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
          onPress={handleGuardarClave}
        ></BotonPrincipal>
      </View>
    </ScrollView>
  );
}
