import { configureStore } from '@reduxjs/toolkit'
// Import your reducers (slices)
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
