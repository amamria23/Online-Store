import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Badge,
  styled,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Home,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector} from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Drawerr = ({
  drawerWidth,
  settheme,
  display,
  typeDrawer,
  hideDrawer,
}) => {
  // @ts-ignore
  const { selectorProducts } = useSelector((state) => state.Carttt);
  const navigate = useNavigate();
  const theme = useTheme();
  let location = useLocation();
  const iconList = [
    { primary: "Home", icon: <Home />, path: "/" },
    {
      primary: "Cart",
      icon: (
        <StyledBadge badgeContent={selectorProducts.length} color="secondary">
          <ShoppingCart />
        </StyledBadge>
      ),
      path: "/cart",
    },
  ];
  return (
    <Drawer
      sx={{
        display: { xs: display, md: "block" },
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant={typeDrawer}
      anchor="left"
      open={true}
      onClose={() => {
        hideDrawer();
      }}
    >
      <List>
        <ListItem
          sx={{ display: "flex", justifyContent: "center", mb: "14px" }}
          disablePadding
        >
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "currentMode",
                theme.palette.mode === "light" ? "dark" : "light"
              );
              settheme(theme.palette.mode === "light" ? "dark" : "light");
            }}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7 sx={{ color: "orange" }} />
            ) : (
              <Brightness4 />
            )}
          </IconButton>
        </ListItem>
        <Divider />

        {iconList.map((item) => {
          return (
            <ListItem
              disablePadding
              key={item.primary}
              sx={{
                bgcolor:
                  // @ts-ignore
                  location.pathname === item.path
                    // @ts-ignore
                    ? theme.palette.favcolor.main
                    : null,
              }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  hideDrawer();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.primary} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Drawerr;
