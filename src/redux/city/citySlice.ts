import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { City } from '../../models/City';

export const citySlice = createSlice({
  name: 'city',
  initialState: null,
  selectors: {
    getCityStore: (_state: City): City => _state
  },
  reducers: {
    setCityStore: (_state: City, action: PayloadAction<City>) => _state = action.payload,
    resetCityStore: (_state: City): void => _state = null
  },
})

export const { setCityStore, resetCityStore } = citySlice.actions;
export const { getCityStore } = citySlice.selectors;
export const cityReducer = citySlice.reducer;