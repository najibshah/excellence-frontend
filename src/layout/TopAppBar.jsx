import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

export const TopAppBar = () => {
  return (
    <Box>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar disableGutters>
          <Grid
            container
            item
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
    </Box>
  );
};
