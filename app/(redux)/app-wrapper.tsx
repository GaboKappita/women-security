import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Stack } from "expo-router";
import { loadUser } from "./authSlice";
import { AppDispatch } from "./store";

function AppWrapper() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default AppWrapper;
