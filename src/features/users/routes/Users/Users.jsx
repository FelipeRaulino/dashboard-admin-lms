import React, { useState, useEffect } from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./Users.css";
import { getUsers } from "../../api/getUsers";

const Users = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "username", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const usersResponse = await getUsers();

      setUsers(
        usersResponse.map((user) => {
          return {
            id: user.id,
            username: user.name.firstname + " " + user.name.lastname,
            email: user.email,
          };
        })
      );
    } finally {
      setLoading(false);
    }
  }

  const [sortModel, setSortModel] = React.useState([]);

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="users">
      <h1>Clientes</h1>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ maxWidth: "98%", marginTop: 4, position: "relative" }}>
        {!!users && (
          <DataGrid
            rows={users}
            columns={columns}
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            sx={{
              color: "#fff",
              borderColor: "#fff",
              border: 2,
              transition: "height 0.5s",
            }}
          />
        )}
      </Box>
    </section>
  );
};

export default Users;
