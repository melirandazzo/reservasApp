import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './slices/shopSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer
  },
})
