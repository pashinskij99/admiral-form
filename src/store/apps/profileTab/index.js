const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  activeTab: 'account' // account, change_password, payment
}

const profileTabSlice = createSlice({
  name: 'profileTab',
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload
    }
  }
})

export const { setActiveTab } = profileTabSlice.actions

export default profileTabSlice.reducer