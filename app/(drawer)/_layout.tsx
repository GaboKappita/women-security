import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

export const CustomDrawerComponent = (props: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View className="flex flex-col py-4">
          <View className="flex flex-col justify-center items-center">
            <View className="relative">
              <View className="absolute -top-4 -right-10">
                <Ionicons name="chatbox-ellipses" size={32} color="#ff80b5" />
              </View>
              <View className="h-24 w-24 mb-4 overflow-hidden border-2 border-black rounded-full flex justify-center items-center">
                <Image
                  source={{
                    uri: "https://i.pinimg.com/564x/72/97/62/72976236f7a13f5076b620c02457a917.jpg",
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text>Gabriel Olivares</Text>
          </View>
        </View>
        <View className="w-10/12 h-[1px] bg-black m-auto"></View>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          label={"Inicio"}
          icon={({ color, size }) => (
            <Ionicons
              name="home"
              size={24}
              color={pathname == "/home" ? "#fff" : "#000"}
            />
          )}
          labelStyle={[
            {
              color: pathname == "/home" ? "#fff" : "#000",
            },
          ]}
          style={{
            backgroundColor: pathname == "/home" ? "#ff80b5" : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(tabs)/home");
          }}
        />
        <DrawerItem
          label={"Registrar clave"}
          icon={({ color, size }) => (
            <Ionicons
              name="mic"
              size={24}
              color={pathname == "/registrar-clave" ? "#fff" : "#000"}
            />
          )}
          labelStyle={[
            {
              color: pathname == "/registrar-clave" ? "#fff" : "#000",
            },
          ]}
          style={{
            backgroundColor:
              pathname == "/registrar-clave" ? "#ff80b5" : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(modulos)/registrar-clave");
          }}
        />
        <DrawerItem
          label={"Mis claves"}
          icon={({ color, size }) => (
            <Ionicons
              name="list"
              size={24}
              color={pathname == "/mis-claves" ? "#fff" : "#000"}
            />
          )}
          labelStyle={[
            {
              color: pathname == "/mis-claves" ? "#fff" : "#000",
            },
          ]}
          style={{
            backgroundColor:
              pathname == "/mis-claves" ? "#ff80b5" : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(modulos)/mis-claves");
          }}
        />
        <DrawerItem
          label={"Mis alertas"}
          icon={({ color, size }) => (
            <Ionicons
              name="notifications"
              size={24}
              color={pathname == "/mis-alertas" ? "#fff" : "#000"}
            />
          )}
          labelStyle={[
            {
              color: pathname == "/mis-alertas" ? "#fff" : "#000",
            },
          ]}
          style={{
            backgroundColor:
              pathname == "/mis-alertas" ? "#ff80b5" : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(modulos)/mis-alertas");
          }}
        />
        <DrawerItem
          label={"Reportes"}
          icon={({ color, size }) => (
            <Ionicons
              name="document-text"
              size={24}
              color={pathname == "/reportes" ? "#fff" : "#000"}
            />
          )}
          labelStyle={[
            {
              color: pathname == "/reportes" ? "#fff" : "#000",
            },
          ]}
          style={{
            backgroundColor:
              pathname == "/reportes" ? "#ff80b5" : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(modulos)/reportes");
          }}
        />
        <DrawerItem
          label={"Noticias"}
          icon={({ color, size }) => (
            <Ionicons
              name="earth"
              size={24}
              color={pathname == "/noticias" ? "#fff" : "#000"}
            />
          )}
          labelStyle={[
            {
              color: pathname == "/noticias" ? "#fff" : "#000",
            },
          ]}
          style={{
            backgroundColor:
              pathname == "/noticias" ? "#ff80b5" : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(modulos)/noticias");
          }}
        />
        <DrawerItem
          label={"Ayuda"}
          icon={({ color, size }) => (
            <Ionicons
              name="help"
              size={24}
              color={pathname == "/ayuda" ? "#fff" : "#000"}
            />
          )}
          labelStyle={[
            {
              color: pathname == "/ayuda" ? "#fff" : "#000",
            },
          ]}
          style={{
            backgroundColor: pathname == "/ayuda" ? "#ff80b5" : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(modulos)/ayuda");
          }}
        />
      </DrawerContentScrollView>

      <View className="w-10/12 h-[1px] bg-black opacity-40 m-auto"></View>
      <View className="py-4">
        <DrawerItem
          label={"Configuración"}
          icon={({ color, size }) => (
            <Ionicons
              name="settings"
              size={24}
              color={pathname == "/configuracion" ? "#fff" : "#000"}
            />
          )}
          labelStyle={[
            {
              color: pathname == "/configuracion" ? "#fff" : "#000",
            },
          ]}
          style={{
            backgroundColor:
              pathname == "/configuracion" ? "#ff80b5" : "transparent",
          }}
          onPress={() => {
            router.push("/(drawer)/(modulos)/configuracion");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="log-out" size={24} color={color} />
          )}
          label={"Cerrar sesión"}
          onPress={() => {
            router.push("/(auth)/iniciar-sesion");
          }}
        />
      </View>
    </View>
  );
};

export default function Layout() {
  const pathname = usePathname();

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff80b5",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: getHeaderTitle(pathname),
      }}
      drawerContent={(props: any) => <CustomDrawerComponent {...props} />}
    />
  );
}

// Función para obtener el título basado en el pathname
const getHeaderTitle = (pathname: string) => {
  switch (pathname) {
    case "/home":
      return "Inicio";
    case "/grupos":
      return "Mis grupos";
    case "/reportes":
      return "Reportes";
    case "/ayuda":
      return "Ayuda";
    case "/noticias":
      return "Noticias";
    case "/registrar-clave":
      return "Registrar clave";
    case "/mis-alertas":
      return "Mis alertas";
    case "/configuracion":
      return "Configuración";
    default:
      return "Women's Security";
  }
};
