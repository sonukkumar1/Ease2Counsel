import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import BodyCard from "../../components/cards/BodyCard";
import SectionHeading from "../../components/SectionHeading";
import { TeamMember } from "../../data";

const desc =
  "Hello guys! This is the counselling team of IIIT Lucknow. Through E2C platform you can make sure that before coming to college for your reporting you all are fully prepared with every document completed accurately in your arsenal. In 'Document Details' section you will find the information regarding each document separately and with a section for queries for each of them. You will get to see a sample for your understanding and the format of documents is available (if applicable). In 'Counselling Quora' interact with your seniors and batch mates. Ask away your queries regarding college faculties, facilities, fests, clubs, and hostels. Also make sure to make your first impression there before coming to college. In 'Saved Documents' you can get all your document saved till now. Or will see a blank for the documents yet to be uploaded. Your seniors are here to help you all. So you can also connect with us via our handles provided beside.";

export const CreatorPart = () => {
  return (
    <Stack alignItems="center" spacing={4}>
      <Typography
        variant="article"
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        Creator Team
      </Typography>
      <Stack direction="row" spacing={4} justifyContent="space-around">
        {TeamMember &&
          TeamMember.map((member) => (
            <Stack
              key={member.id}
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Avatar alt={member.name} src={member.image} />
              <Typography variant="body1">{member.name}</Typography>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

const About = () => {
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
        spacing={8}
      >
        <SectionHeading title="About E2C" />
        <BodyCard desc={desc} fullWidth={true} />
        <CreatorPart />
      </Stack>
    </Box>
  );
};

export default About;
