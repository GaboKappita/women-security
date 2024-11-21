import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { loginAction } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

export default function IndexScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const perfil = await SecureStore.getItemAsync("perfil");
      const persona = await SecureStore.getItemAsync("persona");

      if (perfil && persona) {
        dispatch(
          loginAction({
            perfil: JSON.parse(perfil),
            persona: JSON.parse(persona),
          })
        );
        router.push("/drawer/tabs/home");
      } else {
        router.replace("/auth/iniciar-sesion");
      }
    };

    checkSession();
  }, []);

  // useEffect(() => {
  //   // Espera a que el Root Layout esté completamente montado
  //   const timeout = setTimeout(() => {
  //     router.replace("/auth/iniciar-sesion");
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, [router]);

  // Mostramos un indicador de carga mientras se redirige
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
