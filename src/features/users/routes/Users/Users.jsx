import React from "react";

import "./Users.css";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { getUsers } from "../../api/getUsers";

const Users = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.25 },
    { field: "username", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  const [users, setUsers] = React.useState([]);

  async function fetchData() {
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
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="users">
      <h1>Clientes</h1>
      <Box sx={{ height: 400, maxWidth: "98%", marginTop: 4 }}>
        <DataGrid
          rows={!!users && users}
          columns={columns}
          sx={{
            color: "#fff",
            borderColor: "#fff",
            border: 2,
          }}
        />
      </Box>
    </section>
  );
};

export default Users;
