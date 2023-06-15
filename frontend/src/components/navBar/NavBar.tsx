import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfileMenu from "./ProfileMenu";
import NavBarSearch from "./NavBarSearch";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} margin={{ xs: "0 0 20px 0" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
              className="mr-5"
              size="large"
              aria-label="go back"
              color="inherit"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosNew fontSize="small" />
            </IconButton>
          <Typography
            style={{ cursor: "pointer", paddingLeft: 10 }}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => navigate("/app/home")}
          >
            Deck
          </Typography>
          <NavBarSearch />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
