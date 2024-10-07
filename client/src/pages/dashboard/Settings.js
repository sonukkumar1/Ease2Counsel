import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Account from "../../components/SettingsPage/Account";
import Menu from "../../components/SettingsPage/Menu";
import Saved from "../../components/SettingsPage/Saved";
import Profile from "./Profile.js";

const Settings = () => {
  const theme = useTheme();

  const { pageType } = useSelector((state) => state.settings);

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <Box
          sx={{
            overflowY: "auto",
            height: "100vh",
            width: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f8faff"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          {(() => {
            switch (pageType?.type) {
              case "MENU":
                return <Menu />;
              case "PROFILE":
                return <Profile />;
              case "SAVED":
                return <Saved />;
              case "ACCOUNT":
                return <Account />;

              default:
                return <Menu />;
            }
          })()}
        </Box>
      </Stack>
    </>
  );
};

export default Settings;
