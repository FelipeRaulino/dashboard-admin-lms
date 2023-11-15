import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PaidIcon from "@mui/icons-material/Paid";

import "./Navbar.css";
import { Avatar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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

  function onClickShowNotificationMenu(event) {
    const notificationMenu = document.getElementById(
      "navbar__notification-modal"
    );

    if (notificationMenu.classList.contains("menu-hidden")) {
      notificationMenu.classList.remove("menu-hidden");
    } else {
      notificationMenu.classList.add("menu-hidden");
    }

    event.stopPropagation();
  }

  function handleOnClickOutsideNotificationMenu() {
    const notificationMenu = document.getElementById(
      "navbar__notification-modal"
    );

    document.addEventListener("click", function (event) {
      if (notificationMenu) {
        if (
          !notificationMenu.contains(event.target) &&
          event.target.id !== "navbar__notification-icon"
        ) {
          notificationMenu.classList.add("menu-hidden");
        }
      }
    });
  }

  React.useEffect(() => {
    handleOnClickOutsideNotificationMenu();

    return () => {
      document.removeEventListener(
        "click",
        handleOnClickOutsideNotificationMenu
      );
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <DashboardIcon fontSize="large" />
        <span>Useradmin</span>
      </div>
      <div className="navbar__icons">
        <SearchIcon />
        <div className="navbar__notification-wrapper">
          <NotificationsIcon
            className="navbar__notification-icon"
            id="navbar__notification-icon"
            onClick={onClickShowNotificationMenu}
          />
          <div
            className="navbar__notification-modal menu-hidden"
            id="navbar__notification-modal"
          >
            <div className="notification-modal__header">
              <h3>Notificações</h3>
            </div>
            <div className="notification-modal__content">
              <div className="notification-modal__item">
                <PaidIcon />
                <span>
                  O cliente <strong>Teste</strong> efetuou uma nova compra
                </span>
              </div>
              <div className="notification-modal__item">
                <PaidIcon />
                <span>
                  O cliente <strong>Teste</strong> efetuou uma nova compra
                </span>
              </div>
              <div className="notification-modal__item">
                <PaidIcon />
                <span>
                  O cliente <strong>Teste</strong> efetuou uma nova compra
                </span>
              </div>
              <div className="notification-modal__item">
                <PaidIcon />
                <span>
                  O cliente <strong>Teste</strong> efetuou uma nova compra
                </span>
              </div>
            </div>
          </div>
        </div>
        <MenuIcon
          className="navbar__menu-icon"
          onClick={onClickShowNavbarMenu}
        />
        <div className="navbar__user" onClick={() => navigate("/userProfile")}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.generated.photos/EuuJzFsXBWXS1u0Dg4rDlCl4Kak2k0q__wGguSkfFhM/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzIwNzM0LmpwZw.jpg"
            sx={{ width: 38, height: 38 }}
          />
          <span>Username</span>
          <ArrowRightIcon fontSize="large" />
        </div>
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
