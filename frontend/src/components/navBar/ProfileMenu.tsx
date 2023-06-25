import { AccountCircle } from "@mui/icons-material";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/authentication");
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={"profile-menu-component"}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        style={{ top: "50px" }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={"profile-menu-component-menu"}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
