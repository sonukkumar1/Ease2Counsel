import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { FetchStudents, showSnackbar } from "./app";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  adminId: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.adminId = "";
    },
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    updateAdminId(state, action) {
      state.adminId = action.payload.adminId;
    },
  },
});

// Reducer
export default slice.reducer;

// Login
export function LoginAdmin(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login/admin",
        { ...formValues },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);

        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );

        dispatch(
          slice.actions.updateAdminId({
            adminId: response.data.data.user_id,
          })
        );

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
}

export function PatchStudent(formValues, studentId) {
  return async (dispatch, getState) => {
    await axios
      .patch(
        `/students/${studentId}/update`,
        { ...formValues },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);

        dispatch(FetchStudents());

        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
}

export function UploadDocument(title, url, studentId) {
  return async (dispatch, getState) => {
    await axios
      .post(
        `/documents/${studentId}`,
        {
          docName: title,
          docUrl: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);

        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
}

export function GetBaseDocs() {
  return async (dispatch, getState) => {
    await axios
      .get("/documents/base", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.updateBaseDocuments({
            docs: response.data.data,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.signOut());
  };
}

export function VerifyStudent(studentId) {
  return async (dispatch, getState) => {
    await axios
      .patch(`/students/${studentId}/verify`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then(function (response) {
        console.log(response);

        dispatch(FetchStudents());

        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response.data.message,
          })
        );
      });
  };
}
