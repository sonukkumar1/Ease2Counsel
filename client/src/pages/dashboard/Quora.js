import React from "react";
import { faker } from "@faker-js/faker";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import RHFTextAreaField from "../../components/hook-form/RHFTextAreaForm";
import QuoraForm from "../../sections/QuoraForm";
import QuestionMark from "../../assets/Illustration/Question.png";
import FeedSpace from "../../sections/quora/FeedSpace";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Quora = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);


  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
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
        <Typography variant="h4">Q&A Section</Typography>

        <Stack direction="row" alignItems="flex-start" spacing={7} >
          <Box
            sx={{
              width: 360,
              //   height: 380,
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: "0 0 2px rgba(0,0,0,0.25)",
            }}
            p={3}
          >
            <Stack
              spacing={2.5}
              alignItems="center"
              sx={{ width: "100%", height: "100%", mb: 20 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Create Post
              </Typography>
              <Avatar
                sx={{
                  width: "75px",
                  height: "75px",
                  border: "2px solid rgba(0,250,0,0.5)",
                }}
                src={faker.image.avatar()}
              />
              {/* Post Form */}
              <QuoraForm />
            </Stack>
            <img src={QuestionMark} alt="questionMark" />
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* Feed Space */}
          <FeedSpace />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Quora;
