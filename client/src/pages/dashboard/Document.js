import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Input,
  InputLabel,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from 'prop-types';
import { Tabs } from "antd";
import { DownloadSimple, FileText, UploadSimple } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GetBaseDocs, UploadDocument } from "../../redux/slices/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebaseConfig";
import { showSnackbar } from "../../redux/slices/app";
// import 'antd/lib/tabs/style';

const TabHeading = ({ index, title, desc }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        // backgroundColor: (theme) => theme.palette.primary.main,
        // color: (theme) => theme.palette.primary.dark,
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.10)",
        borderRadius: "8px",
        minWidth: "920px",
        // height: `calc(100vh-200px)`,
        // overflowY:"scroll"
      }}
      p={1}
      px={3}
    >
      <Typography
        variant="body2"
        sx={{ fontSize: "18px", color: (theme) => theme.palette.primary.dark }}
      >
        {++index}
      </Typography>
      <Stack alignItems="flex-start">
        <Typography
          variant="article"
          component="h3"
          sx={{ color: (theme) => theme.palette.primary.dark }}
        >
          {title}
        </Typography>
        <Typography variant="body1" component="p">
          {desc.substring(0, 100)}...
        </Typography>
      </Stack>
    </Stack>
  );
};

const TabContent = ({ title, desc, tmpDL, SmpDL }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [URL, setURL] = useState("");
  const [percent, setPercent] = useState(0);

  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Upload the file to Firebase storage
    const storageRef = ref(storage, `documents/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track the upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
        setPercent(progress);
      },
      (error) => {
        console.error(error);
        dispatch(showSnackbar("error", error.message))
      },
      () => {
        // Once the file is uploaded, get the download URL and save it to MongoDB
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setURL(downloadURL);
            console.log(URL);
          })
          .then(() => {
            dispatch(UploadDocument(title, URL));
            handleCloseUpload();
          });
      }
    );
  };

  const handleOpenUpload = () => {
    setOpen(true);
  };
  const handleCloseUpload = () => {
    setOpen(false);
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

  return (
    <>
      <Stack spacing={3} p={1} pr={10} sx={{ minWidth: "325px" }}>
        <Stack
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.20)",
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="subtitle1"
            p={2}
            sx={{ borderBottom: "1px solid rgba(0,0,0, 0.10)" }}
          >
            {title}
          </Typography>
          <Stack spacing={2} p={2} alignItems="flex-start">
            <Typography variant="body1">{desc}</Typography>

            <Button
              type="button"
              href={tmpDL}
              target="_blank"
              sx={{ backgroundColor: (theme) => theme.palette.primary.lighter }}
            >
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <DownloadSimple size={24} />
                <Typography varinat="button">Download Template</Typography>
              </Stack>
            </Button>
            <Button type="button" href={SmpDL} target="_blank">
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <FileText size={24} />
                <Typography varinat="button">Download Sample</Typography>
              </Stack>
            </Button>
          </Stack>
        </Stack>

        <Divider />

        <Stack
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.20)",
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="subtitle1"
            p={2}
            sx={{ borderBottom: "1px solid rgba(0,0,0, 0.10)" }}
          >
            Save Your's
          </Typography>
          <Stack p={2} alignItems="flex-start">
            <Button type="button" onClick={handleOpenUpload}>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <UploadSimple size={24} />
                <Typography varinat="button">Upload your document</Typography>
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Dialog open={open} onClose={handleCloseUpload}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <DialogContentText>Please select a file to upload.</DialogContentText>
          <FormControl fullWidth sx={{ marginTop: "26px" }}>
            {/* <InputLabel htmlFor="upload-file">File</InputLabel> */}
            <Input id="upload-file" type="file" onChange={handleFileChange} disableUnderline={true} />
          </FormControl>
          {file && (
            <>
              <LinearProgressWithLabel value={percent}  />
              <DialogContentText>
                ({file.type}, {file.size} bytes)
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpload}>Cancel</Button>
          <Button onClick={handleUpload} disabled={!file}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Document = () => {
  const { isLoggedIn, baseDocuments } = useSelector((state) => state.auth);

  const [documentsData, setDocumentsData] = useState(baseDocuments);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setDocumentsData(baseDocuments);

    let items = documentsData.map((doc, idx) => {
      return {
        label: (
          <TabHeading index={idx} title={doc.docName} desc={doc.docDesc} />
        ),
        key: `${idx}`,
        children: (
          <TabContent
            title={doc.docName}
            desc={doc.docDesc}
            tmpDL={doc.docType.template ? doc.docType.template : ""}
            SmpDL={doc.docType.sample ? doc.docType.sample : ""}
          />
        ),
      };
    });

    setItems(items);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  //   {
  //     label: <TabHeading index="0" />,
  //     key: "0",
  //     children: <TabContent />,
  //   },
  //   {
  //     label: <TabHeading index="1" />,
  //     key: "1",
  //     children: <TabContent />,
  //   },
  //   {
  //     label: <TabHeading index="2" />,
  //     key: "2",
  //     children: <TabContent />,
  //   },
  //   {
  //     label: <TabHeading index="3" />,
  //     key: "3",
  //     children: <TabContent />,
  //   },
  //   {
  //     label: <TabHeading index="4" />,
  //     key: "4",
  //     children: <TabContent />,
  //   },
  // ];

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "#f8faff"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack p={4} spacing={2}>
        {/* Header */}
        <Stack>
          <Typography variant="h4">Documents</Typography>
        </Stack>
        <Stack
          alignItems="flex-start"
          spacing={1}
          sx={{ overflowY: "scroll", height: `calc(100vh - 120px)` }}
        >
          <Typography varinat="subtitle1">
            List of Important Documents
          </Typography>
          {items.length === 0 ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%", height: "100%" }}
            >
              Please wait, data is fetching...
            </Stack>
          ) : (
            <Tabs
              defaultActiveKey="0"
              tabPosition="left"
              items={items}
              type="line"
              tabBarGutter={2}
              size="large"
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Document;
