import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export const TopAppBar = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar disableGutters>
          <Grid
            container
            items
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6" noWrap component="div">
              EDC Kanban
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
