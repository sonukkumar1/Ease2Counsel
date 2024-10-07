import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const BodyCard = ({ desc, fullWidth }) => {
  return (
    <Box
      p={3}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.darker,
        color: (theme) => theme.palette.primary.contrastText,
        borderRadius: "24px",
        boxShadow: "0 0 20px rgba(1, 1, 1, 0.25) inset",
        width: fullWidth ? "100%" : "330px",
        maxWidth: "800px",
      }}
    >
      <Stack
        sx={{ height: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body1" sx={{ textAlign: fullWidth ? "justify" : "center"}}>{desc}</Typography>
      </Stack>
    </Box>
  );
};

export default BodyCard;
