import { Button, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Board, NewBoard } from "../components/boards";
import { a11yProps } from "../functions";
import axios from "axios";

const apiURI = process.env.REACT_APP_API_URI;

export function Boards() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("black");
  const [refresh, setRefresh] = useState(false);

  const [errors, setErrors] = useState();
  errors && console.error(errors);
  const [board, setBoard] = useState();

  useEffect(() => {
    axios
      .get(`${apiURI}/edc/boards/all`)
      .then((response) => {
        setBoard(response.data);
      })

      .catch((response) => {
        console.log("error in axios form call react");
        setErrors({});
        setErrors(response.response.data);
      });
    // eslint-disable-next-line no-console
  }, [refresh]);

  // const [tabPanels, setTabPanels] = useState([
  //   {
  //     id: "black",
  //     children: (
  //       <div>
  //         <div>Abc</div> <div>XXyz</div>{" "}
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "white",
  //     children: (
  //       <div>
  //         <div>xyz</div> <div>aaa</div>{" "}
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "blue",
  //     children: (
  //       <div>
  //         <div>jsh</div> <div>2hjsj</div>{" "}
  //       </div>
  //     ),
  //   },
  // ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpen(true);

  const ButtonInTabs = ({ children }) => {
    return <Button onClick={handleOpen} children={children} />;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {board &&
            board.map((board, index) => {
              return (
                <Tab
                  label={board.boardLabel}
                  {...a11yProps(board.boardID)}
                  key={index}
                />
              );
            })}
          <ButtonInTabs>
            <AddBoxRoundedIcon sx={{ ml: 4 }} />
            <Typography sx={{ ml: 1 }}> New Tab </Typography>
          </ButtonInTabs>
        </Tabs>
      </Box>
      {board &&
        board.map((board, index) => {
          return <Board key={index} value={value} index={board.boardID} />;
        })}
      {/* <Board /> */}
      {/* {tabPanels.map((tabPanel, index) => {
        return (
          <BoardPanel value={value} index={tabPanel.id} key={index}>
            {tabPanel.children}
          </BoardPanel>
        );
      })} */}
      <NewBoard
        open={open}
        setOpen={setOpen}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </Box>
  );
}
