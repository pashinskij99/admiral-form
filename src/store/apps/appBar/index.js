import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  appBarShow: true
}

const appBarSlice = createSlice({
  name: 'appBarSlice',
  initialState,
  reducers: {
    setAppBarState(state, action) {
      state.appBarShow = action.payload
    }
  }
})

export const { setAppBarState } = appBarSlice.actions

export default appBarSlice.reducer
