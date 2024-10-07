import { Stack, Typography } from "@mui/material";
import React from "react";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";
import Logo from "../../assets/Images/logoV3.png";

const Login = () => {
  return (
    <Stack
      spacing={1}
      p={3}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "50%", height: "100%", background: "white" }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <img
          style={{ objectFit: "cover", maxWidth: 35 }}
          src={Logo}
          alt="logo"
        />
        <Typography variant="h5" mb={2} sx={{ fontWeight: 500, letterSpacing: 2}}>E2C</Typography>
      </Stack>
      <Typography variant="h3">Login</Typography>

      {/* Login Form */}
      <LoginForm />

      <AuthSocial />
    </Stack>
  );
};

export default Login;
