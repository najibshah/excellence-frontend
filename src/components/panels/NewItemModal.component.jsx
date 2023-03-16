import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";

const apiURI = process.env.REACT_APP_API_URI;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  pr: 4,
  pb: 4,
  pl: 4,
  borderRadius: "15px",
};

export function NewItemModal({
  open,
  setOpen,
  refresh,
  setRefresh,
  boardID,
  panelID,
}) {
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newBoard = {
      boardID: boardID,
      panelID: panelID,
      content: data.get("content"),
    };
    console.log(newBoard);
    axios
      .post(`${apiURI}/edc/boards/addItem`, newBoard)
      .then((response) => {
        console.log(response);
        handleClose();
        setRefresh(!refresh);
      })
      .catch((response) => {
        console.log("error in axios login call react");
        setErrors({});
        setErrors(response.response.data);
      });
    // eslint-disable-next-line no-console
  };
  errors && console.log({ errors });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Item
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 6 }}>
            Add a new item to this panel.
          </Typography>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="content"
            label="Item Title"
            name="content"
            autoComplete="content"
            autoFocus
            error={errors && errors.content && true}
            helperText={errors && errors.content !== "" ? errors.content : " "}
          />
          <Button type="submit" variant="contained" sx={{ mt: 4 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
