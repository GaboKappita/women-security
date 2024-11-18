import ImagenBackground from "../../components/aplicacion/ImagenBackground";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function NoticiasScreen() {
  return (
    <ScrollView className="bg-[#F5F5F5] flex w-full ">
      <StatusBar style="light" backgroundColor="black" />
      <TouchableOpacity
        activeOpacity={0.75}
        className="w-fit rounded-lg bg-white shadow-lg shadow-black p-4 m-4 mb-4"
        onPress={() => {}}
      >
        <Image
          source={{
            uri: "https://www.dt.gob.cl/portal/1627/articles-119486_imagen_portada.thumb_i860x450.jpg",
          }}
          className="w-full h-40 mb-4 rounded"
        ></Image>
        <Text className="text-base">Entrevista a los creadores</Text>
        <Text className="text-sm mb-4" numberOfLines={2} ellipsizeMode="tail">
          Los creadores de Womens Security se sinceran en una entrevista
          realizada por Duoc UC, casa de estudio en donde dieron sus primeros
          pasos, tambien, en dondesurgió esta innovadora idea.
        </Text>
        <Button title="Ver más..."></Button>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.75}
        className="w-fit rounded-lg bg-white shadow-lg shadow-black p-4 m-4 mb-4"
        onPress={() => {}}
      >
        <Image
          source={{
            uri: "https://www.dt.gob.cl/portal/1627/articles-119486_imagen_portada.thumb_i860x450.jpg",
          }}
          className="w-full h-40 mb-4 rounded"
        ></Image>
        <Text className="text-base">Entrevista a los creadores</Text>
        <Text className="text-sm mb-4" numberOfLines={2} ellipsizeMode="tail">
          Los creadores de Womens Security se sinceran en una entrevista
          realizada por Duoc UC, casa de estudio en donde dieron sus primeros
          pasos, tambien, en dondesurgió esta innovadora idea.
        </Text>
        <Button title="Ver más..."></Button>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.75}
        className="w-fit rounded-lg bg-white shadow-lg shadow-black p-4 m-4 mb-4"
        onPress={() => {}}
      >
        <Image
          source={{
            uri: "https://www.dt.gob.cl/portal/1627/articles-119486_imagen_portada.thumb_i860x450.jpg",
          }}
          className="w-full h-40 mb-4 rounded"
        ></Image>
        <Text className="text-base">Entrevista a los creadores</Text>
        <Text className="text-sm mb-4" numberOfLines={2} ellipsizeMode="tail">
          Los creadores de Womens Security se sinceran en una entrevista
          realizada por Duoc UC, casa de estudio en donde dieron sus primeros
          pasos, tambien, en dondesurgió esta innovadora idea.
        </Text>
        <Button title="Ver más..."></Button>
      </TouchableOpacity>
    </ScrollView>
  );
}
