import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Board,
  NewBoardModal,
  StyledTab,
  StyledTabs,
  NewBoardButton,
} from "../components/";
import { a11yProps } from "../functions";
import axios from "axios";
import uuid from "uuid";
const apiURI = process.env.REACT_APP_API_URI;

export function Boards() {
  const [openNewModal, setOpenNewModal] = useState(false);
  const [value, setValue] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [errors, setErrors] = useState();
  errors && console.error(errors);
  const [board, setBoard] = useState();

  useEffect(() => {
    console.log("called");
    axios
      .get(`${apiURI}/edc/boards/all`)
      .then((response) => {
        setBoard(response.data);
        setValue(response.data[0].boardID);
      })
      .catch((response) => {
        console.log("error in axios form call react");
        setErrors({});
        setErrors(response.data);
      });
    // eslint-disable-next-line no-console
  }, []);
  useEffect(() => {
    console.log("called");
    axios
      .get(`${apiURI}/edc/boards/all`)
      .then((response) => {
        setBoard(response.data);
      })
      .catch((response) => {
        console.log("error in axios form call react");
        setErrors({});
        setErrors(response.data);
      });
    // eslint-disable-next-line no-console
  }, [refresh]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpenNewModal(true);

  return (
    <Box key={+refresh} sx={{ width: "100%", marginTop: "30px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {board?.map((board, index) => {
            return (
              <StyledTab
                label={board.boardLabel}
                {...a11yProps(board.boardID)}
                key={index}
              />
            );
          })}
          <NewBoardButton handleOpen={handleOpen} />
        </StyledTabs>
      </Box>
      {board?.map((board, index) => {
        console.log(board);
        return (
          <Board
            key={Date.now() + Math.floor(Math.random() * 9999)}
            // key={index}
            value={value}
            index={board.boardID}
            panels={board.panels}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        );
      })}

      <NewBoardModal
        open={openNewModal}
        setOpen={setOpenNewModal}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </Box>
  );
}
