import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import shopReducer from './slices/shopSlice'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'
import { shopApi } from '../services/shopApi'
import { authApi } from '../services/authApi'
import { profileApi } from '../services/profileApi'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cartReducer', 'userReducer']
}

const combinedReducers = combineReducers({
  shopReducer,
  cartReducer,
  userReducer,
  [shopApi.reducerPath]: shopApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

// Habilitar auto-guardado y rehidratación del estado.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoraracciones propias de redux-persist para evitar warnings
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/FLUSH', 'persist/PURGE', 'persist/REGISTER']
      }
    })
    .concat(shopApi.middleware)
    .concat(authApi.middleware)
    .concat(profileApi.middleware)
  )
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export const clearPersistedState = async (dispatch) => {
  try {
    await persistor.purge()
  } catch (e) {
    console.warn('Failed to purge persisted state', e)
  }
}