import { configureStore } from '@reduxjs/toolkit'
import { cityReducer } from './city/citySlice'

export default configureStore({
  reducer: {
    city: cityReducer
  },
})