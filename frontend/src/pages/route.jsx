import { Outlet } from "react-router-dom";
import Drawerr from "../components/Drawer";
import AppBarr from "../components/AppBar";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useState } from "react";
import getDesignTokens from "../styles/myTheme";

const Route = () => {

  const drawerWidth = 240;
  const [mode, settheme] = useState(
    localStorage.getItem("currentMode") === null
      ? "light"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
      );
  const [display, setDisplay] = useState("none");
  const [typeDrawer, settypeDrawer] = useState("permanent");

  const showDrawer = () => {
    settypeDrawer("temporary")
          setDisplay("block")
  }
  const hideDrawer = () => {
    settypeDrawer("permanent");
        setDisplay("none");
  }
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppBarr drawerWidth={drawerWidth} showDrawer={showDrawer}    />
        <Drawerr
          drawerWidth={drawerWidth}
          settheme={settheme}
          display={display} typeDrawer={typeDrawer} hideDrawer={hideDrawer}           />
        <Box
          component="main"
          sx={{
            ml: { md: `${drawerWidth}px` },
            mt: "66px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Route;
