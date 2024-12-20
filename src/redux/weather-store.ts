import { configureStore } from '@reduxjs/toolkit'
import { cityReducer } from './city/citySlice'
import { City } from '../models/City';

export interface WeatyherState {
  city: City
};

export type WeatherDispatch = typeof weatherStore.dispatch;

const weatherStore = configureStore({
  reducer: {
    city: cityReducer
  },
})


export default weatherStore;