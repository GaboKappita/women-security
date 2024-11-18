import { useRouter, Stack } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Espera a que el Root Layout esté completamente montado
    const timeout = setTimeout(() => {
      router.replace("/auth/iniciar-sesion");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  // Mostramos un indicador de carga mientras se redirige
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
