import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateSettingsType } from "../../redux/slices/settings";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete Your Account</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          color="error"
          type="submit"
          variant="contained"
          onClick={handleClose}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Account = () => {
  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Stack p={4} spacing={5}>
      {/* Header */}
      <Stack direction={"row"} alignItems="center" spacing={3}>
        <IconButton onClick={() => dispatch(UpdateSettingsType("MENU"))}>
          <CaretLeft size={24} color={"#4b4b4b"} />
        </IconButton>
        <Typography variant="h6">Account</Typography>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="body1">
          You can permanently earse your data and delete your account from E2C.
        </Typography>
        <Button
          onClick={() => {
            setOpenDelete(true);
          }}
          color="error"
          size="large"
          type="submit"
          variant="outlined"
        >
          Delete Account
        </Button>
      </Stack>
      {openDelete && (
        <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />
      )}
    </Stack>
  );
};

export default Account;
