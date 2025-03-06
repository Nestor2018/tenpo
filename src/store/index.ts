import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
};

// Envolvemos el reducer con persistReducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configuramos el store
export const store = configureStore({
  reducer: {
    auth: persistedReducer, // Usamos el reducer persistido
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoramos ciertas acciones de redux-persist para evitar warnings
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Exportamos el persistor para usarlo en main.tsx
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
