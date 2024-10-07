import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { MouseSimple } from "phosphor-react";
import heroImg from "../../assets/Images/hero-img.png";

const Hero = () => {
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
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
        p={10}
      >
        <Stack sx={{ width: "50%" }} spacing={2}>
          <Stack
            alignItems="flex-start"
            justifyContent="flex-start"
            spacing={1}
          >
            <Typography
              variant="h1"
              sx={{
                color: (theme) => theme.palette.primary.main,
                textAlign: "start",
                maxWidth: "50%",
                lineHeight: "4.5rem",
              }}
            >
              Welcome Freshers!
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              A new journey begins.
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Typography variant="body1" sx={{ textAlign: "start" }}>
              We are here to guide you throughout the process of counselling.
              E2C will help you all to interact with your seniors as well as
              your batch mates. Any doubts regarding document verification,
              hostels will be answered by the counselling team. So! What's the
              wait for?
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{
                transition: "translate 0.25s ease-in-out",
                "&:hover": {
                  translate: "0 4px",
                },
              }}
            >
              <MouseSimple size={24} />
              <Typography variant="subtitle2">Scroll Down</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box sx={{ width: "50%" }} p={4}>
          <img alt="hero-img" src={heroImg} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Hero;
