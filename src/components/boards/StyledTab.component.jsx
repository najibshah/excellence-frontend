import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "black",
    "&.Mui-selected": {
      color: "white",
      backgroundColor: "#023047",
      borderRadius: "15px 15px 0px 0px",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);
