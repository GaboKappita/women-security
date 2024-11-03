import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

// Function to load user from SecureStore
const loadUserFromStorage = async () => {
  try {
    const userInfo = await SecureStore.getItemAsync("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Failed to load user info", error);
    return null;
  }
};

const initialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      console.log("entro de alguna forma?");
      
      state.user = action.payload;
      state.loading = false;
      // Storing user info securely
      SecureStore.setItemAsync("userInfo", JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      state.loading = false;
      // Removing user info securely
      SecureStore.deleteItemAsync("userInfo");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loginAction, logoutAction, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

export const loadUser = () => async (dispatch: any) => {
  const user = await loadUserFromStorage();
  if (user) {
    dispatch(setUser(user));
  } else {
    dispatch(setLoading(false));
  }
};