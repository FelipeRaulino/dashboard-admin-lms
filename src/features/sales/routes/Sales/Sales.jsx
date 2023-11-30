import React, { useState, useEffect } from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./Sales.css";
import { getAllSales } from "../../utils/salesUtils";

const Sales = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "count", headerName: "Total de Vendas", flex: 0.5 },
    { field: "title", headerName: "Item", flex: 1 },
    { field: "category", headerName: "Categoria", flex: 0.5 },
    { field: "price", headerName: "Preço", flex: 1 },
  ];

  async function fetchData() {
    try {
      const usersResponse = await getAllSales();
      const productNameToIdMap = {};
      const salesWithId = [];

      usersResponse.forEach((user) => {
        const itemName = user.productName;
        const itemCategory = user.productCategory;
        const itemPreco = user.productPrice;

        if (productNameToIdMap[itemName]) {
          const existingItem = salesWithId.find(
            (item) => item.id === productNameToIdMap[itemName]
          );
          if (existingItem) {
            existingItem.count += 1;
          }
        } else {
          const newItemId = Object.keys(productNameToIdMap).length + 1;
          productNameToIdMap[itemName] = newItemId;

          salesWithId.push({
            id: newItemId,
            title: itemName,
            category: itemCategory,
            price: itemPreco,
            count: 1,
          });
        }
      });

      setUsers(salesWithId);
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
    <section className="sales">
      <h1>Sales</h1>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ width: "98%", marginTop: 4, position: "relative" }}>
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

export default Sales;
