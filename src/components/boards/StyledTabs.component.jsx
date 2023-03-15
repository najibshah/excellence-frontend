import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";

export const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "5px",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 80,
    width: "100%",
    borderRadius: "55px 55px 0px 0px",
    backgroundColor: "#219ebc",
  },
});
