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
    updateProfileAction: (
      state,
      action: PayloadAction<{ perfil?: any; persona?: any }>
    ) => {
      if (action.payload.perfil) {
        state.perfil = { ...state.perfil, ...action.payload.perfil };
        SecureStore.setItemAsync("perfil", JSON.stringify(state.perfil));
      }
      if (action.payload.persona) {
        state.persona = { ...state.persona, ...action.payload.persona };
        SecureStore.setItemAsync("persona", JSON.stringify(state.persona));
      }
    },
  },
});

export const { loginAction, logoutAction, updateProfileAction } =
  authSlice.actions;
export default authSlice.reducer;
