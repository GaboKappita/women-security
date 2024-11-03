import CardBlack from "../../../components/aplicacion/CardBlack";
import ImagenBackground from "../../../components/aplicacion/ImagenBackground";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Button } from "react-native";

const dataList = [
  { id: 1, emoji: ": )", label: "hola" },
  { id: 2, emoji: ": )", label: "hola" },
  { id: 3, emoji: ": )", label: "hola" },
  { id: 4, emoji: ": )", label: "hola" },
  { id: 5, emoji: ": )", label: "hola" },
];

export default function GruposScreen() {
  return (
    <ImagenBackground>
      <ScrollView className="flex p-4 w-full">
        <StatusBar style="light" backgroundColor="black" />
        <CardBlack estiloCard="mb-4">
          <View className="flex flex-row w-full">
            <View className="w-16 h-16 bg-white mr-4 border-black border-2 rounded-full flex items-center justify-center">
              <Text className="text-lg rotate-90">{" : ) "}</Text>
            </View>
            <View>
              <Text className="text-white text-2xl">Nombre de usuario</Text>
              <View className="flex justify-center items-center flex-row">
                <Text className="text-white text-lg mr-2">
                  ID usuario: 2378423794
                </Text>
                <Ionicons name="copy-outline" size={24} color="blue" />
              </View>
            </View>
          </View>
        </CardBlack>

        <CardBlack estiloCard="flex-1">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-xl text-white">Grupo actual</Text>
            <Button title="Agregar grupo"></Button>
            <Ionicons name="caret-down" size={24} color="black" />
          </View>
          <View className="flex flex-row flex-wrap justify-between gap-4">
            {dataList.map((item) => (
              <View key={item.id} className="flex flex-col items-center">
                <View className="w-16 h-16 bg-white border-black border-2 rounded-full flex items-center justify-center">
                  <Text className="text-lg rotate-90">{item.emoji}</Text>
                </View>
                <Text className="text-lg text-white">{item.label}</Text>
              </View>
            ))}
          </View>
        </CardBlack>
      </ScrollView>
    </ImagenBackground>
  );
}
