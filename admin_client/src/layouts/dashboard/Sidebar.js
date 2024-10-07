import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FilePdf, Funnel, House, SignOut } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/slices/auth";

import Logo from "../../assets/Images/logoV3.png";
import { useNavigate } from "react-router-dom";
import { UpdateSidebarTab } from "../../redux/slices/app";


const getPath = (index) => {
  switch (index) {
    case 0:
      return "/home";
    case 1:
      return "/generate_pdf";
    case 2:
      return "/query";

    default:
      break;
  }
};

const Nav_Buttons = [
  {
    index: 0,
    icon: <House size={26} />,
    title: "Dashboard",
  },
  {
    index: 1,
    icon: <FilePdf size={26} />,
    title: "Generate PDF",
  },
  {
    index: 2,
    icon: <Funnel size={26} />,
    title: "Query",
  },
];

const Sidebar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarTab = useSelector((state) => state.app.sidebarTab);

  const handleChangeTab = async (tabNum) => {
    dispatch(UpdateSidebarTab(tabNum));
    navigate(getPath(tabNum));
  };

  const handleLogout = () => {
    dispatch(LogoutUser());
  }

  const [selected, setSelected] = useState(sidebarTab);

  useEffect(() => {
    setSelected(sidebarTab);
  }, [sidebarTab]);

  return (
    <Box
      p={3}
      py={4}
      sx={{
        boxShadow: "0px 0px 3px rgba(0,0,0,0.23)",
        height: "100vh",
        width: 300,
        backgroundImage: `linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)`,
      }}
      zIndex="2"
    >
      <Stack
        direction="column"
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ height: "100%" }}
        spacing={3}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack
              sx={{
                height: 55,
                width: 55,
                borderRadius: 1,
                background: theme.palette.background.paper,
                boxShadow: "0 0 0 2px rgba(0,0,0, 0.1)",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <img width={44} src={Logo} alt={"Chat App Logo"} />
            </Stack>
            <Typography variant="h4">Ease2Counsel</Typography>
          </Stack>
          <Stack
            sx={{ width: "100%" }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "100%",
                  }}
                  p={1}
                  key={el.index}
                >
                  <IconButton sx={{ width: "max-content", color: "#fff" }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {el.icon}
                      <Typography variant="subtitle1">{el.title}</Typography>
                    </Stack>
                  </IconButton>
                </Box>
              ) : (
                <Button
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                  sx={{
                    width: "100%",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                  key={el.index}
                  size="large"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="flex-start"
                    width="100%"
                  >
                    {el.icon}
                    <Typography variant="subtitle1">{el.title}</Typography>
                  </Stack>
                </Button>
              )
            )}
          </Stack>
        </Stack>

        <Stack spacing={4} alignItems={"center"} width="100%">
          <Button
            onClick={() => {
              handleLogout();
            }}
            size="large"
            sx={{
              width: "100%",
              color:
                theme.palette.mode === "light"
                  ? "#000"
                  : theme.palette.text.primary,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <SignOut size={26} />
              <Typography variant="subtitle1">Logout</Typography>
            </Stack>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
