import { Divider, IconButton, Stack } from "@mui/material";
import { GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";
import React from "react";

const AuthSocial = () => {
  return (
    <div >
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before, &::after": { borderTopStyle: "dashed" },
        }}
      >
        OR
      </Divider>
      <Stack spacing={2} direction="row" justifyContent="center">
        <IconButton>
          <GoogleLogo color="#df3e38" />
        </IconButton>
        <IconButton color="inherit">
          <GithubLogo />
        </IconButton>
        <IconButton>
          <TwitterLogo color="#1c9cea" />
        </IconButton>
      </Stack>
    </div>
  );
};

export default AuthSocial;
