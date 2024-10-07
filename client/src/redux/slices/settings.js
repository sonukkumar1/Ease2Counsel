import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageType: {
    type: "MENU", // can be MENU, PROFILE, SAVED, ACCOUNT
  },
};

const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettingsType(state, action) {
      state.pageType.type = action.payload.type;
    },
  },
});

//Reducer
export default slice.reducer;

export function UpdateSettingsType(type) {
  return async (dispatch, getValue) => {
    dispatch(slice.actions.updateSettingsType({ type }));
  };
}
