import React from "react";

import "./MainLayout.css";

import Navbar from "../../NavBar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="main-container">
      <Navbar />
      <main className="content-container">
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
