import { createSlice } from '@reduxjs/toolkit'

export const citySlice = createSlice({
  name: 'city',
  initialState: null,
  reducers: {
    setCityStore: (state, action) => state = action.payload,
    resetCityStore: state => state = null
  },
})

export const { setCityStore, resetCityStore } = citySlice.actions;
export const cityReducer = citySlice.reducer;