import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isAppStarted: boolean;
  isFirstLaunch: boolean;
  selectedLanguage: string;
}

const initialState: AppState = {
  isAppStarted: false,
  isFirstLaunch: true,
  selectedLanguage: "en",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppStarted(state) {
      state.isAppStarted = true;
    },
    setFirstLaunch(state, action: PayloadAction<boolean>) {
      state.isFirstLaunch = action.payload;
    },
    setSelectedLanguage(state, action: PayloadAction<string>) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setAppStarted, setFirstLaunch, setSelectedLanguage } = appSlice.actions;

export default appSlice.reducer;
