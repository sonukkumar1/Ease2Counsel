// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";

import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./redux/slices/app";

const vertical = "bottom";
const horizontal = "center";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.app.snackbar
  );

  return (
    <>
      <ThemeProvider>
          <Router />
      </ThemeProvider>

      {open && message ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(closeSnackbar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(closeSnackbar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
