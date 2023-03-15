import { Button, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

export const NewBoardButton = ({ handleOpen }) => {
  return (
    <Button
      onClick={handleOpen}
      style={{
        marginLeft: "20px",
        color: "#023047",
      }}
    >
      <AddBoxRoundedIcon />
      <Typography sx={{ ml: 1 }}> New Tab </Typography>
    </Button>
  );
};
