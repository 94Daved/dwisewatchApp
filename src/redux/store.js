import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
};

const rootSlice = combineReducers({
  user: userSlice,
  video: videoSlice,
});

const persistedSlice = persistReducer(rootPersistConfig, rootSlice);

export const store = configureStore({
  reducer: persistedSlice,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
