import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

interface UserState {
  isAuthenticated: boolean;
  persona: any | null;
  perfil: any | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  persona: null,
  perfil: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (
      state,
      action: PayloadAction<{ perfil: any; persona: any }>
    ) => {
      state.perfil = action.payload.perfil;
      state.persona = action.payload.persona;
      state.isAuthenticated = true;
    },
    logoutAction: (state) => {
      SecureStore.deleteItemAsync("perfil");
      SecureStore.deleteItemAsync("persona");
      state.perfil = null;
      state.persona = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions; // Exporta las acciones
export default authSlice.reducer; // Exporta el reducer
