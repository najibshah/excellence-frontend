import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
const apiURI = process.env.REACT_APP_API_URI;

export default function ConfirmDeleteDialog({
  open,
  setOpen,
  refresh,
  setRefresh,
  boardID,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [errors, setErrors] = useState();

  const handleClose = () => setOpen(false);

  const handleDelete = (event) => {
    event.preventDefault();
    const deleteBoard = {
      boardID: boardID,
    };
    axios
      .post(`${apiURI}/edc/boards/deleteBoard`, deleteBoard)
      .then((response) => {
        console.log(response);
        handleClose();
        setRefresh(!refresh);
      })
      .catch((response) => {
        console.log("error in axios login call react");
        setErrors({});
        setErrors(response.data);
      });
  };
  errors && console.log({ errors });
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm Delete Board"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this board?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
