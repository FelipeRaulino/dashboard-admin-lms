import React from "react";

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";

import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/">
            {" "}
            <SpaceDashboardIcon />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/users">
            <PersonIcon />
            Clientes
          </NavLink>
        </li>
        <li>
          <NavLink to="/products">
            <ShoppingCartIcon />
            Produtos
          </NavLink>
        </li>
        <li>
          <NavLink to="/sells">
            <CheckIcon />
            Vendas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
