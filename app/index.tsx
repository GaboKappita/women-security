import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { loginAction, setLoading } from "./redux/authSlice";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import store from "./redux/store";

export default function IndexScreen() {
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const perfil = await SecureStore.getItemAsync("perfil");
        const persona = await SecureStore.getItemAsync("persona");

        if (perfil && persona) {
          store.dispatch(
            loginAction({
              perfil: JSON.parse(perfil),
              persona: JSON.parse(persona),
            })
          );
        } else {
          store.dispatch(setLoading(false));
        }
      } catch (error) {
        console.error("Error al cargar el estado inicial:", error);
        store.dispatch(setLoading(false));
      }
    };

    loadAuthState();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/drawer/tabs/home");
      } else {
        router.replace("/auth/iniciar-sesion");
      }
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // const dispatch = useDispatch();
  // const router = useRouter();

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const perfil = await SecureStore.getItemAsync("perfil");
  //     const persona = await SecureStore.getItemAsync("persona");

  //     if (perfil && persona) {
  //       dispatch(
  //         loginAction({
  //           perfil: JSON.parse(perfil),
  //           persona: JSON.parse(persona),
  //         })
  //       );
  //       router.push("/drawer/tabs/home");
  //     } else {
  //       router.replace("/auth/iniciar-sesion");
  //     }
  //   };

  //   checkSession();
  // }, []);

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
