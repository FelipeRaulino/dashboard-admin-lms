import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./Sales.css";
import { getAllSales } from "../../utils/salesUtils";

const Sales = () => {
  const [users, setUsers] = React.useState([]);

  const columns = [
    { field: "count", headerName: "Total de Vendas", flex: 0.3 },
    { field: "title", headerName: "Item", flex: 1 },
    { field: "category", headerName: "Categoria", flex: 0.3 },
    { field: "price", headerName: "Preço", flex: 1 },
  ];

  async function fetchData() {
    const usersResponse = await getAllSales();
    const productNameToIdMap = {};
    const salesWithId = [];

    usersResponse.forEach((user) => {
      const itemName = user.productName;
      const itemCategory = user.productCategory;
      const itemPreco = user.productPrice;

      if (productNameToIdMap[itemName]) {
        const existingItem = salesWithId.find((item) => item.id === productNameToIdMap[itemName]);
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
  }

  const defaultSortModel = [
    {
      field: 'count',
      sort: 'desc',
    },
  ];

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="sales">
      <h1>Sales</h1>
      <Box sx={{ height: 400, maxWidth: "98%", marginTop: 4 }}>
        <DataGrid
          rows={!!users && users}
          columns={columns}
          sortModel={defaultSortModel}
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

export default Sales;
