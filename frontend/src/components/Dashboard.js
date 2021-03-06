import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Button,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useAuth0 } from "@auth0/auth0-react";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/edvjask">
        Edvinas Jaskovikas
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const titles = {
  "/": "Meal Search",
  "/by_nutrients": "Meal by Nutrients",
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState(titles["/"]);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const location = useLocation();

  useEffect(() => {
    setTitle(titles[location.pathname]);
  }, [location.pathname]);

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <Box sx={{ display: "flex", gap: "2px" }}>
              <div>
                {!isAuthenticated && (
                  <Button
                    color={"inherit"}
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                )}
                {isAuthenticated && (
                  <div>
                    Welcome back, {user.given_name}
                    <Button
                      color={"inherit"}
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Log out
                    </Button>
                  </div>
                )}
              </div>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem button component={RouterLink} to={".."}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Meal Search" />
            </ListItem>
            <ListItem button component={RouterLink} to={"../by_nutrients"}>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary="Recipe by Nutrients" />
            </ListItem>
            {isAuthenticated && (
              <ListItem button component={RouterLink} to={"../plans"}>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Saved plans" />
              </ListItem>
            )}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {/*####################DASHBOARD CONTENT###############################*/}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
          {/*####################DASHBOARD CONTENT###############################*/}
          <Copyright />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
