import React from "react";

import Dashboard from "../features/misc/routes/Dashboard/Dashboard";
import { Outlet, useRoutes } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout/MainLayout";
import Users from "../features/users/routes/Users/Users";
import UserProfile from "../features/users/routes/UserProfile/UserProfile";
import Products from "../features/products/routes/Products/Products";
import Sales from "../features/sales/routes/Sales/Sales";

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const AppRoutes = () => {
  const commonRoutes = [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/users", element: <Users /> },
        { path: "/userProfile", element: <UserProfile /> },
        { path: "/products", element: <Products /> },
        { path: "/sells", element: <Sales /> },
      ],
    },
  ];

  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};

export default AppRoutes;
