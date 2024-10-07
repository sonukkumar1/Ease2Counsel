import { IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { useDispatch } from "react-redux";
import { UpdateSettingsType } from "../../redux/slices/settings";
import ProfileForm from "../../sections/settings/ProfileForm";

const Profile = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Stack p={4} spacing={5}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={3}>
          <IconButton onClick={() => dispatch(UpdateSettingsType("MENU"))}>
            <CaretLeft size={24} color="#4b4b4b" />
          </IconButton>
          <Typography variant="h5">Profile</Typography>
        </Stack>

        {/* Profile Form */}
        <ProfileForm />
      </Stack>
    </>
  );
};

export default Profile;
