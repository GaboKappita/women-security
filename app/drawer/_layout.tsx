import { router, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { logoutAction } from "../redux/authSlice";

export default function DrawerLayout() {
  const pathname = usePathname();
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#ff80b5",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: getHeaderTitle(pathname),
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="tabs" options={{ title: "Inicio" }} />
      <Drawer.Screen
        name="mis-contactos"
        options={{ title: "Mis contactos" }}
      />
      <Drawer.Screen name="mis-claves" options={{ title: "Mis claves" }} />
      <Drawer.Screen name="mis-alertas" options={{ title: "Mis alertas" }} />
      <Drawer.Screen name="reportes" options={{ title: "reportes" }} />
      <Drawer.Screen
        name="registrar-clave"
        options={{ title: "Registrar clave" }}
      />
      <Drawer.Screen name="noticias" options={{ title: "noticias" }} />
      <Drawer.Screen name="ayuda" options={{ title: "Ayuda" }} />
      <Drawer.Screen
        name="configuracion"
        options={{ title: "configuracion" }}
      />
      <Drawer.Screen
        name="invitaciones"
        options={{ title: "Mis invitaciones" }}
      />
    </Drawer>
  );
}

function CustomDrawerContent({ navigation }: any) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const imagen_usuario = perfil.imagen_usuario;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View className="flex flex-col py-4 pt-8">
          <View className="flex flex-col justify-center items-center">
            <View className="relative">
              <View className="absolute -top-4 -right-10">
                <Ionicons name="chatbox-ellipses" size={32} color="#ff80b5" />
              </View>
              <View className="h-24 w-24 mb-4 overflow-hidden border-2 border-black rounded-full flex justify-center items-center">
                <Image
                  source={
                    imagen_usuario
                      ? { uri: imagen_usuario }
                      : require("../../assets/profile-user.png")
                  }
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text className="text-center text-base">{persona.nombre}</Text>
            <Text className="text-center text-base">{persona.apellido}</Text>
          </View>
        </View>
        <View className="w-10/12 h-[1px] bg-black m-auto"></View>
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
            navigation.navigate("tabs");
            // router.push("/(drawer)/(tabs)/home");
          }}
        />
        {/* <DrawerItem
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
            navigation.navigate("registrar-clave");
            // router.push("/drawer/registrar-clave");
          }}
        /> */}
        <DrawerItem
          label={"Mis contactos"}
          icon={({ color, size }) => (
            <Ionicons
              name="apps"
              size={24}
              color={pathname == "/mis-contactos" ? "#fff" : "#000"}
            />
          )}
          labelStyle={[
            {
              color: pathname == "/mis-contactos" ? "#fff" : "#000",
            },
          ]}
          style={{
            backgroundColor:
              pathname == "/mis-contactos" ? "#ff80b5" : "transparent",
          }}
          onPress={() => {
            navigation.navigate("mis-contactos");
            // router.push("/(drawer)/(modulos)/mis-contactos");
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
            navigation.navigate("mis-claves");
            // router.push("/(drawer)/(modulos)/mis-claves");
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
            navigation.navigate("mis-alertas");
            // router.push("/(drawer)/(modulos)/mis-alertas");
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
            navigation.navigate("reportes");
            // router.push("/(drawer)/(modulos)/reportes");
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
            navigation.navigate("noticias");
            // router.push("/(drawer)/(modulos)/noticias");
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
            navigation.navigate("ayuda");
            // router.push("/(drawer)/(modulos)/ayuda");
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
            navigation.navigate("configuracion");
            // router.push("/(drawer)/(modulos)/configuracion");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="log-out" size={24} color={color} />
          )}
          label={"Cerrar sesión"}
          onPress={() => {
            // Despachar el logoutAction para cerrar la sesión
            dispatch(logoutAction());

            // Redirigir al usuario a la pantalla de inicio de sesión
            router.replace("/auth/iniciar-sesion");
          }}
        />
      </View>
    </View>
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
