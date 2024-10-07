import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/Images/Logo_IIITL.png";
const MainLayout = () => {
  const theme = useTheme();

  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Box p={4} sx={{ width: "100%", height: "100vh", background: "#19376D" }}>
        <Stack
          width="100%"
          height="100%"
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 0 12px #C4CDD5 inset",
          }}
        >
          <Stack
            direction="row"
            backgroundColor="#F6F1E9"
            height="100%"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "50vw",
              borderRight: "1px solid #F6F1E9",
              boxShadow: "0 0 5px #cccddf inset",
            }}
          >
            <Stack spacing={1} alignItems="center" justifyContent="center">
              <img style={{ width: "50%" }} src={Logo} alt="logo" />
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                Indian Institute of Information Technology, Lucknow
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                भारतीय सूचना प्रौद्योगिकी संस्थान, लखनऊ
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.darker,
                }}
              >
                Ease 2 Counsel
              </Typography>
            </Stack>
          </Stack>

          <Outlet />
        </Stack>
      </Box>
    </>
  );
};

export default MainLayout;
