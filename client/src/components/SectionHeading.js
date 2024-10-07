import { Box, Typography } from "@mui/material";
import React from "react";

const SectionHeading = ({ title }) => {
  return (
    <Box
      py={1}
      px={4}
      sx={{
        color: (theme) => theme.palette.primary.main,
        backgroundColor: (theme) => theme.palette.primary.lighter,
        borderRadius: "8px",
      }}
    >
      <Typography variant="h3">{title}</Typography>
    </Box>
  );
};

export default SectionHeading;
