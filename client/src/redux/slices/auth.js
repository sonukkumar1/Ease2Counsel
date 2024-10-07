import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { UpdateStudentData, showSnackbar } from "./app";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  studentId: "",
  error: false,
  registrationStatus: false,
  baseDocuments: [],
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
      state.studentId = "";
      state.registrationStatus = false;
      state.baseDocuments = [];
    },
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    updateStudentId(state, action) {
      state.studentId = action.payload.studentId;
    },
    updateRegistrationStatus(state, action) {
      state.registrationStatus = action.payload.registrationStatus;
    },
    closeRegistrationWarning(state, action) {
      state.registrationStatus = true;
    },
    updateBaseDocuments(state, action) {
      state.baseDocuments = action.payload.docs;
    },
  },
});

// Reducer
export default slice.reducer;

// Login
export function LoginStudent(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",
        { ...formValues },
        { headers: { "Content-Type": "application/json" } }
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
          slice.actions.updateStudentId({
            studentId: response.data.data.user_id,
          })
        );

        dispatch(
          slice.actions.updateRegistrationStatus({
            registrationStatus: response.data.data.registrationStatus,
          })
        );

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );

        dispatch(GetBaseDocs());
        dispatch(UpdateStudentData({ data : response.data.data }));
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

export function PatchStudent(formValues) {
  return async (dispatch, getState) => {
    await axios
      .patch(
        `/students/${getState().auth.studentId}/update`,
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
          slice.actions.updateRegistrationStatus({
            registrationStatus: response.data.data.registrationStatus,
          })
        );

        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );

        dispatch(GetBaseDocs())
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

export function UploadDocument(title, url) {
  return async (dispatch, getState) => {
    await axios
      .post(
        `/documents/${getState().auth.studentId}`,
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

        dispatch(GetBaseDocs())
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
