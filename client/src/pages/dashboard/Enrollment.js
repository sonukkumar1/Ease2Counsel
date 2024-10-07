import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EnrollmentForm from "../../sections/enrollmentForm";

const Enrollment = () => {
  const { isLoggedIn, registrationStatus } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  if (registrationStatus) {
    return <Navigate to="/documents" />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "#f8faff"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack p={4} spacing={2}>
        {/* Header */}
        <Typography variant="h4" component={"h2"}>
          Registration Cum Enrollment Form : {dayjs().year()}
        </Typography>

        {/* Enrollment Form */}
        <EnrollmentForm />
      </Stack>
    </Box>
  );
};

export default Enrollment;
