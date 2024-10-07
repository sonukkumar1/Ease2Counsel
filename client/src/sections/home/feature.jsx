import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import FeatureCards from "../../components/cards/FeatureCards";
import SectionHeading from "../../components/SectionHeading";

const Feature = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#f8faff"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        justifyContent="flex-start"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
        p={10}
        spacing={5}
      >
        <SectionHeading title="Features" />
        <FeatureCards />
      </Stack>
    </Box>
  );
};

export default Feature;
