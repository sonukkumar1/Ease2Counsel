import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Stack,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { Cards, Chat, FolderSimpleUser, Heart } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { faker } from "@faker-js/faker";

const Post = ({ data }) => {
  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: "0 0 3px rgba(0, 0, 0, 0.10)",
        borderRadius: "8px",
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={faker.image.avatar()} alt="avatar" />
          <Stack>
            <Typography variant="subtitle1" component="h6">
              Your Name
            </Typography>
            <Typography variant="body1" component="p" sx={{ opacity: "75%" }}>
              yourname@email.com
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="body1" component="div">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ut
          illum accusantium maxime doloribus voluptas dolorum nihil, tempore
          perspiciatis corporis.
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center">
            <IconButton>
              <Heart />
            </IconButton>
            <Typography variant="body1">4k</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButton>
              <Chat />
            </IconButton>
            <Typography variant="body1">321</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
const Posts = ({ content, type }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.app);
  const [isLoading, setIsLoading] = useState(false);
  const data = [];

  //   useEffect(() => {
  //     if (type === "feed")
  //         dispatch(GetFeedPost());
  //     else
  //         dispatch(GetUserPost());
  //   }, []);

  return isLoading ? (
    "Please wait posts are loading...!"
  ) : data ? (
    <Stack spacing={3}  >
        <Post data={data} />
        <Post data={data} />
        <Post data={data} />
        <Post data={data} />
        <Post data={data} />
    </Stack>
  ) : (
    "No Posts"
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{ width: "100%" }}
      //   width={100}
    >
      {value === index && <Box py={3}>{children}</Box>}
    </Box>
  );
};

const FeedSpace = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box width={800} >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="post tabs"
        textColor="secondary"
        indicatorColor="primary"
      >
        <Tab
          icon={<Cards size={24} />}
          iconPosition="start"
          label="Feed Posts"
        />
        <Tab
          icon={<FolderSimpleUser size={24} />}
          iconPosition="start"
          label="Your Posts"
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Posts content="Feed Posts Content" type="feed" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Posts content="Your Posts Content" type="user" />
      </TabPanel>
    </Box>
  );
};

export default FeedSpace;
