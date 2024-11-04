import { Stack } from 'expo-router';

export default function ModulosLayout() {
  return (
    <Stack>
      <Stack.Screen name="noticias" options={{ headerShown: false }} />
      <Stack.Screen name="reportes" options={{ headerShown: false }} />
      <Stack.Screen name="ayuda" options={{ headerShown: false }} />
      <Stack.Screen name="registrar-clave" options={{ headerShown: false }} />
      <Stack.Screen name="mis-claves" options={{ headerShown: false }} />
      <Stack.Screen name="mis-alertas" options={{ headerShown: false }} />
      <Stack.Screen name="configuracion" options={{ headerShown: false }} />
    </Stack>
  );
}
