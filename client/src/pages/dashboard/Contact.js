import { Box, Stack } from "@mui/material";
import React from "react";
import SectionHeading from "../../components/SectionHeading";
import ContactForm from "../../sections/ContactForm";
import ContactImg from "../../assets/Illustration/contactImage.png";

const Contact = () => {
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
      <Stack
        justifyContent="flex-start"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
        p={10}
        spacing={5}
      >
        <SectionHeading title="Contact Us" />
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: "16px",
              boxShadow: "0 0 20px rgba(1, 1, 1, 0.05)"
            }}
            p={3}
            py={4}
          >
            <ContactForm />
          </Box>
          <img src={ContactImg} alt="Contact" />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Contact;
