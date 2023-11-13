import { Menu } from "@mui/icons-material";
import {
  Link,
  AppBar,
  Avatar,
  Typography,
  Toolbar,
  IconButton,
} from "@mui/material";

const AppBarr = ({ drawerWidth,  showDrawer }) => {
  return (
    <AppBar
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
      position="static"
    >
      <Toolbar>
        <IconButton onClick={() => {
          showDrawer()
        }} sx={{ color: "inherit", display:{md:"none"} }}>
          <Menu />
        </IconButton>
        <Link
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            "&:hover": { fontSize: "18px" },
          }}
          color="inherit"
          href="/"
        >
          Online Store
        </Link>
        <Typography sx={{ mr: 2 }}>Amamria Ilyess</Typography>
        <Avatar
          alt="Travis Howard"
          src="https:mui.com/static/images/avatar/2.jpg"
        />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarr;
