import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const TitleCard = ({ title, icon}) => {
  return (
    <Box
      p={3}
      sx={{
        backgroundColor: (theme) => theme === "light" ? theme.palette.background.paper : theme.palette.background.default,
        borderRadius: "30px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)",
        width: "330px",
        height: "270px",
      }}
    >
      <Stack sx={{ height: "100%" }} spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: (theme) => theme.palette.primary.lighter,
            borderRadius: "20px",
            height: "100%",
          }}
        >
          {icon}
        </Stack>
        <Typography variant="subtitle1" sx={{ textTransform: "capitalize"}}>{title}</Typography>
      </Stack>
    </Box>
  );
};

export default TitleCard;
