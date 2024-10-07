import { faker } from "@faker-js/faker";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Radio,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import {
  CaretLeft,
  Files,
  Key,
  PencilCircle,
  UserCircle,
} from "phosphor-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSettingsType } from "../../redux/slices/settings";
import ThemeChangeForm from "../../sections/ThemeChangeForm";
import RHFRadioField from "../hook-form/RHFRadioForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SelectThemeDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
    >
      <DialogTitle>Choose Theme</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Select theme option and apply
        </DialogContentText>
        <ThemeChangeForm />
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="text" onClick={handleClose}>
          Close
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleClose}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Menu = () => {
  const [openTheme, setOpenTheme] = useState(false);

  const handleCloseTheme = () => {
    setOpenTheme(false);
  };

  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.app);

  const list = [
    {
      key: 0,
      icon: <UserCircle size={20} />,
      title: "Profile",
      onclick: () => dispatch(UpdateSettingsType("PROFILE")),
    },
    {
      key: 1,
      icon: <Files size={20} />,
      title: "Saved Documents",
      onclick: () => dispatch(UpdateSettingsType("SAVED")),
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Account",
      onclick: () => dispatch(UpdateSettingsType("ACCOUNT")),
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: () => setOpenTheme(true),
    },
  ];

  return (
    <Stack p={4} spacing={5}>
      {/* Header */}
      <Stack direction={"row"} alignItems="center" spacing={3}>
        <IconButton>
          <CaretLeft size={24} color={"#4b4b4b"} />
        </IconButton>
        <Typography variant="h6">Settings</Typography>
      </Stack>
      {/* Profile */}
      <Stack direction={"row"} alignItems="center" spacing={3}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          src={student?.picture}
          alt={student?.name}
        />
        <Stack spacing={0.5}>
          <Typography variant="article">{student?.name}</Typography>
          <Typography variant="body2">{student?.generalDetails?.designation}</Typography>
        </Stack>
      </Stack>
      {/* List of options */}
      <Stack spacing={4}>
        {list.map(({ key, icon, title, onclick }) => (
          <Stack
            onClick={onclick}
            sx={{ cursor: "pointer" }}
            spacing={2}
            key={key}
          >
            <Stack direction={"row"} spacing={2} alignItems="center">
              {icon}
              <Typography variant="body2">{title}</Typography>
            </Stack>
            {key !== 3 && <Divider />}
          </Stack>
        ))}
      </Stack>
      {openTheme && (
        <SelectThemeDialog open={openTheme} handleClose={handleCloseTheme} />
      )}
    </Stack>
  );
};

export default Menu;
