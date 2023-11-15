import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import "./Navbar.css";
import { Avatar } from "@mui/material";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <DashboardIcon fontSize="large" />
        <span>Useradmin</span>
      </div>
      <div className="navbar__icons">
        <div className="navbar__user">
          <Avatar
            alt="Remy Sharp"
            src="https://images.generated.photos/EuuJzFsXBWXS1u0Dg4rDlCl4Kak2k0q__wGguSkfFhM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzIwNzM0LmpwZw.jpg"
            sx={{ width: 38, height: 38 }}
          />
          <span>Username</span>
        </div>
        <SearchIcon />
        <NotificationsIcon />
        <MenuIcon />
      </div>
    </nav>
  );
};

export default Navbar;
