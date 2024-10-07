import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  students: [],
  sidebarTab: 0,
  snackbar: {
    open: false,
    message: null,
    severity: null,
  },
  dialogBox: {
    open: false,
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
    updateStudents(state, action) {
      state.students = action.payload.data;
    },
    updateSidebarTab(state, action) {
      state.sidebarTab = action.payload;
    },
    updateDialogBox(state, action) {
      state.dialogBox = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

//
export function UpdateSidebarTab(tabNum) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateSidebarTab(tabNum));
  };
}

export function UpdateDialogBox(condition) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDialogBox(condition));
  }
}

export function showSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackbar({ message, severity }));

    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar());
    }, 4000);
  };
}

export const closeSnackbar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackbar());
};

export const FetchStudents = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/students", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(slice.actions.updateStudents({ data: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
