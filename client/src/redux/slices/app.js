import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  student: [],
  sidebarTab: 0,
  snackbar: {
    open: false,
    message: null,
    severity: null,
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
    updateStudent(state, action) {
      state.student = action.payload.data;
    },
    updateSidebarTab(state, action) {
      state.sidebarTab = action.payload;
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

export const UpdateStudentData = ({data}) => {
  return async (dispatch, getState) => {
    console.log(data);
    dispatch(slice.actions.updateStudent({ data: data }));
  }
}

export const FetchStudent = ({studentId}) => {
  return async (dispatch, getState) => {
    await axios
      .get(`/students/${studentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(slice.actions.updateStudent({ data: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
