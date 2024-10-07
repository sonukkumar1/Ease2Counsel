import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { Icon } from '@mui/material';
import { YinYang } from 'phosphor-react';

const LoadingScreen = () => {
  const theme = useTheme();

  const classes = {
    icon: {
      fontSize: theme.typography.h2.fontSize,
      color: theme.palette.primary.main,
      // marginBottom: theme.spacing(2)
    },
    message: {
      fontWeight: theme.typography.fontWeightBold
    }
  }

  const props = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 500 },
    reset: true,
    loop: true
  });

  return (
    <Stack sx={{width: "100%", height: "100vh"}} alignItems="center" justifyContent="center">
      <animated.div style={props}>
        <Icon component={YinYang} sx={{ fontSize: 64, mb: 2, color: 'primary.main' }} />
      </animated.div>
      <Typography variant="h5" component="h2" align="center" sx={classes.message}>
        Loading...
      </Typography>
    </Stack>
  );
}

export default LoadingScreen