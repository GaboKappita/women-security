import queryClient from "../services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppWrapper from "./redux/app-wrapper";
import { Stack } from "expo-router";
import { LocationProvider } from "../contexts/LocationContext";
import { NavigationContainer } from "@react-navigation/native";

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* <QueryClientProvider client={queryClient}> */}
      <LocationProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="drawer" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </LocationProvider>
      {/* </QueryClientProvider> */}
    </Provider>
  );
}