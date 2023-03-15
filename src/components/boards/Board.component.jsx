import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Panels } from "..";
import { EditBoardModal } from ".";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.component";

export function Board({
  children,
  value,
  index,
  panels,
  refresh,
  setRefresh,
  ...other
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  console.log(index);
  const [columns, setColumns] = useState(panels);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <h5
          style={{
            marginLeft: "60px",
            cursor: "pointer",
          }}
          onClick={handleOpenEditModal}
        >
          Edit Board
        </h5>
        <h5
          style={{ marginLeft: "50px", cursor: "pointer", color: "maroon" }}
          onClick={handleOpenDeleteDialog}
        >
          Delete Board
        </h5>
      </Grid>
      <Panels columns={columns} setColumns={setColumns} />
      <EditBoardModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        setRefresh={setRefresh}
        refresh={refresh}
        boardID={index}
      />
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        setRefresh={setRefresh}
        refresh={refresh}
        boardID={index}
      />
    </div>
  );
}
