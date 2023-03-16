import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
import ConfirmDeletePanelDialog from "./ConfirmDeletePanelDialog.component";

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

export function EditPanelModal({
  open,
  setOpen,
  refresh,
  setRefresh,
  boardID,
  panelID,
}) {
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const editPanel = {
      boardID: boardID,
      panelID: panelID,
      name: data.get("name"),
    };
    console.log(editPanel);
    axios
      .post(`${apiURI}/edc/boards/editPanel`, editPanel)
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
            Edit Panel
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 6 }}>
            Edit panel name or delete panel.
          </Typography>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Panel Title"
            name="name"
            autoComplete="name"
            autoFocus
            error={errors && errors.name && true}
            helperText={errors && errors.name !== "" ? errors.name : " "}
          />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button type="submit" variant="contained">
              Save
            </Button>
            <h5
              style={{ marginLeft: "50px", cursor: "pointer", color: "maroon" }}
              onClick={handleOpenDeleteDialog}
            >
              Delete Panel
            </h5>
          </Grid>
        </Box>
      </Modal>

      <ConfirmDeletePanelDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        handleCloseModal={handleClose}
        setRefresh={setRefresh}
        refresh={refresh}
        boardID={boardID}
        panelID={panelID}
      />
    </div>
  );
}
