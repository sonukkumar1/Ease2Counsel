import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import { WarningCircle } from "phosphor-react";
import icon404 from "../assets/Images/noPage.svg";

const Page404 = () => {
  const theme = useTheme();

  const useStyles = {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
    },
    icon: {
      fontSize: theme.typography.h2.fontSize,
      color: theme.palette.error.main,
    },
    message: {
      margin: theme.spacing(2),
      fontWeight: theme.typography.fontWeightBold,
    },
  };

  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" width="100%">
      <WarningCircle
        icon="alert-circle"
        weight="fill"
        size={64}
        color={useStyles.icon.color}
      />
      <img
        width="250px"
        style={{ objectFit: "cover" }}
        src={icon404}
        alt="404image"
      />
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={useStyles.message}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button component={Link} to="/home" variant="text" color="primary">
        Go to Homepage
      </Button>
    </Stack>
  );
};

export default Page404;
