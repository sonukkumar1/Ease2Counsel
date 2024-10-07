import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { CaretLeft, DownloadSimple, TrashSimple } from "phosphor-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSettingsType } from "../../redux/slices/settings";

const DocList = [
  {
    id: 0,
    name: "Document Name/Title 1",
  },
  {
    id: 1,
    name: "Document Name/Title 2",
  },
  {
    id: 2,
    name: "Document Name/Title 3",
  },
  {
    id: 3,
    name: "Document Name/Title 4",
  },
  {
    id: 4,
    name: "Document Name/Title 5",
  },
  {
    id: 5,
    name: "Document Name/Title 6",
  },
  {
    id: 6,
    name: "Document Name/Title 7",
  },
  {
    id: 7,
    name: "Document Name/Title 8",
  },
  {
    id: 8,
    name: "Document Name/Title 9",
  },
  {
    id: 9,
    name: "Document Name/Title 10",
  },
];
const SavedDocument = () => {
  const theme = useTheme();
  const { documents } = useSelector((state) => state.app.student);

  return (
    <>
      {documents &&
        documents.map((document, idx) => (
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: "8px",
              boxShadow: "0 0 2.5px rgba(0, 0, 0, 0.15)",
            }}
            p={1}
            key={document._id}
          >
            <Stack alignItems="flex-start" spacing={1}>
              <Stack spacing={1} direction="row" alignItems="center">
                <Typography
                  sx={{ color: theme.palette.primary.main }}
                  variant="body2"
                >
                  {idx + 1 + "."}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ width: "100%" }}
                >
                  {document.docName}
                </Typography>
              </Stack>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "#f8f0ff"
                      : theme.palette.background,
                  width: "100%",
                  boxShadow: "0 0 1px rgba(0,0,0, 0.25) inset",
                  borderRadius: "4px",
                }}
                p={1}
              >
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.primary.lighter,
                    },
                  }}
                  href={document.docUrl}
                  download={true}
                  target="_blank"
                >
                  <DownloadSimple
                    color={theme.palette.primary.main}
                    size={20}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    "&:hover": { backgroundColor: theme.palette.error.lighter },
                  }}
                >
                  <TrashSimple color={theme.palette.error.main} size={20} />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        ))}
    </>
  );
};

const Saved = () => {
  const dispatch = useDispatch();

  return (
    <Stack p={4} spacing={5}>
      {/* Header */}
      <Stack direction={"row"} alignItems="center" spacing={3}>
        <IconButton onClick={() => dispatch(UpdateSettingsType("MENU"))}>
          <CaretLeft size={24} color={"#4b4b4b"} />
        </IconButton>
        <Typography variant="h6">Saved Documents</Typography>
      </Stack>
      <Stack spacing={2} sx={{ width: "100%", height: "100%" }}>
        <SavedDocument />
      </Stack>
    </Stack>
  );
};

export default Saved;
