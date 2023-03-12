import { Button, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { BoardPanel } from "../components/boards";
import { a11yProps } from "../functions";

export function Boards() {
  const [value, setValue] = useState("black");
  const [tabs, setTabs] = useState([
    { label: "Item One", id: "black" },
    { label: "Item Two", id: "white" },
    { label: "Item Three", id: "blue" },
  ]);
  const [tabPanels, setTabPanels] = useState([
    {
      id: "black",
      children: (
        <div>
          <div>Abc</div> <div>XXyz</div>{" "}
        </div>
      ),
    },
    {
      id: "white",
      children: (
        <div>
          <div>xyz</div> <div>aaa</div>{" "}
        </div>
      ),
    },
    {
      id: "blue",
      children: (
        <div>
          <div>jsh</div> <div>2hjsj</div>{" "}
        </div>
      ),
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setTabs([...tabs, { label: "Item four", id: "bell" }]);
    setTabPanels([
      ...tabPanels,
      {
        id: "bell",
        children: (
          <div>
            <div>uuuu</div> <div>22222</div>{" "}
          </div>
        ),
      },
    ]);
  };
  const ButtonInTabs = ({ children }) => {
    return <Button onClick={handleClick} children={children} />;
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
          {tabs.map((tab, index) => {
            return <Tab label={tab.label} {...a11yProps(tab.id)} key={index} />;
          })}
          <ButtonInTabs>
            <AddBoxRoundedIcon sx={{ ml: 4 }} />
            <Typography sx={{ ml: 1 }}> New Tab </Typography>
          </ButtonInTabs>
        </Tabs>
      </Box>
      {tabPanels.map((tabPanel, index) => {
        return (
          <BoardPanel value={value} index={tabPanel.id} key={index}>
            {tabPanel.children}
          </BoardPanel>
        );
      })}
    </Box>
  );
}
