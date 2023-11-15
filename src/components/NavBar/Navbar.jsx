import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import "./Navbar.css";
import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  function onClickShowNavbarMenu() {
    const navbarMenu = document.getElementsByClassName(
      "navbar__menu-overlay-hidden"
    );

    navbarMenu[0].classList.add("navbar__menu-overlay");
    navbarMenu[0].classList.remove("navbar__menu-overlay-hidden");
  }

  function onClickHiddenNavbarMenu() {
    const navbarMenu = document.getElementsByClassName("navbar__menu-overlay");

    navbarMenu[0].classList.add("navbar__menu-overlay-hidden");
    navbarMenu[0].classList.remove("navbar__menu-overlay");
  }

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
        <MenuIcon onClick={onClickShowNavbarMenu} />
      </div>
      <div className="navbar__menu-overlay-hidden">
        <CloseIcon
          fontSize="large"
          className="menu__close-btn"
          onClick={onClickHiddenNavbarMenu}
        />
        <div className="menu-modal__header">
          <DashboardIcon />
          <h3>Useradmin</h3>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" onClick={onClickHiddenNavbarMenu}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" onClick={onClickHiddenNavbarMenu}>
                Clientes
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={onClickHiddenNavbarMenu}>
                Produtos
              </NavLink>
            </li>
            <li>
              <NavLink to="/sells" onClick={onClickHiddenNavbarMenu}>
                Vendas
              </NavLink>
            </li>
            <li>
              <NavLink to="/userProfile" onClick={onClickHiddenNavbarMenu}>
                Ver perfil
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
