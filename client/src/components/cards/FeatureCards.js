import { Stack } from "@mui/material";
import { Chats, FileDoc, Upload } from "phosphor-react";
import React from "react";
import BodyCard from "./BodyCard";
import TitleCard from "./TitleCard";

const FeatureContent = [
  {
    id: 0,
    title: "Collection of documents",
    icon: <FileDoc size={65} />,
    desc: "Detailed information regarding all the documents needed for verification purpose, with a sample attached to it. You will also get separate doubt section for each documents.",
  },
  {
    id: 1,
    title: "Save & secure your documents",
    icon: <Upload size={65} />,
    desc: "You can save your document's drive links which you may have uploaded to google drive, to get them at one place later!",
  },
  {
    id: 2,
    title: "Post your query",
    icon: <Chats size={65} />,
    desc: "Get the chance to interact with your batch mates and seniors for any other query regarding college life. You might also post your first impression here!",
  },
];

const FeatureCards = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      sx={{ width: "100%" }}
    >
      {FeatureContent &&
        FeatureContent.map((feature) => (
          <Stack
            key={feature.id}
            justifyContent="center"
            p={1}
            spacing={2.5}
            mt={feature.id === 1 ? "80px" : "0"}
          >
            <TitleCard {...feature} />
            <BodyCard {...feature} fullWidth={false} />
          </Stack>
        ))}
    </Stack>
  );
};

export default FeatureCards;
