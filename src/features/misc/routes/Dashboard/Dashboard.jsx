import React from "react";

import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Legend,
  Bar,
  BarChart,
} from "recharts";

import avatar1 from "../../../../assets/user-avatar-1.jpg";
import avatar2 from "../../../../assets/user-avatar-2.jpg";
import avatar3 from "../../../../assets/user-avatar-3.jpg";
import avatar4 from "../../../../assets/user-avatar-4.jpg";
import avatar5 from "../../../../assets/user-avatar-5.jpg";

import PersonIcon from "@mui/icons-material/Person";

import "./Dashboard.css";

import {
  getSalesPerMonthForChart,
  getTopBuyers,
  getTotalSalesFormatted,
} from "../../../sales/utils/salesUtils";
import { Avatar } from "@mui/material";
import { getUserTotals } from "../../../users/utils/usersUtils";
import { NavLink } from "react-router-dom";
import { totalProducts } from "../../../products/utils/productsUtils";

const Dashboard = () => {
  const [topBuyers, setTopBuyers] = React.useState([]);
  const [userTotals, setUserTotals] = React.useState(0);
  const [productsTotal, setProductsTotal] = React.useState(0);
  const [salesPerMonth, setSalesPerMonth] = React.useState([]);
  const [customSalesTotal, setCustomSalesTotal] = React.useState([]);

  const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5];

  const fetchData = async () => {
    const topBuyersLocalStorage = localStorage.getItem("topBuyers");
    const userTotalsLocalStorage = localStorage.getItem("userTotals");
    const productTotalLocalStorage = localStorage.getItem("productTotal");
    const salesPerMonthLocalStorage = localStorage.getItem("salesPerMonth");
    const customSalesTotalLocalStorage =
      localStorage.getItem("customSalesTotal");

    if (
      topBuyersLocalStorage &&
      userTotalsLocalStorage &&
      productTotalLocalStorage &&
      salesPerMonthLocalStorage &&
      customSalesTotalLocalStorage
    ) {
      setTopBuyers(JSON.parse(topBuyersLocalStorage));
      setUserTotals(JSON.parse(userTotalsLocalStorage));
      setProductsTotal(JSON.parse(productTotalLocalStorage));
      setSalesPerMonth(JSON.parse(salesPerMonthLocalStorage));
      setCustomSalesTotal(JSON.parse(customSalesTotalLocalStorage));
    } else {
      try {
        const result = await getTopBuyers();
        const utotal = await getUserTotals();
        const ptotal = await totalProducts();
        const spmtotal = await getSalesPerMonthForChart();
        const customST = await getTotalSalesFormatted();

        setTopBuyers(result);
        localStorage.setItem("topBuyers", JSON.stringify(result));

        setUserTotals(utotal);
        localStorage.setItem("userTotals", JSON.stringify(utotal));

        setProductsTotal(ptotal);
        localStorage.setItem("productTotal", JSON.stringify(ptotal));

        setSalesPerMonth(spmtotal);
        localStorage.setItem("salesPerMonth", JSON.stringify(spmtotal));

        setCustomSalesTotal(customST);
        localStorage.setItem("customSalesTotal", JSON.stringify(customST));
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 600, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 800, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 580, pv: 2400, amt: 2400 },
  ];

  const pageViews = [
    {
      name: "Junho",
      totalViews: 4000,
    },
    {
      name: "Julho",
      totalViews: 3000,
    },
    {
      name: "Agosto",
      totalViews: 2000,
    },
    {
      name: "Setembro",
      totalViews: 2780,
    },
    {
      name: "Outubro",
      totalViews: 1890,
    },
    {
      name: "Novembro",
      totalViews: 2390,
    },
    {
      name: "Dezembro",
      totalViews: 3490,
    },
  ];

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <div className="grid-container">
        <div className="dashboard__top-buyers">
          <h3>Melhores clientes</h3>
          <ul>
            {topBuyers.map((client, index) => (
              <li key={client.userId}>
                <div className="top-buyers__item-info">
                  <Avatar
                    alt="Remy Sharp"
                    src={avatarImages[index]}
                    sx={{ width: 38, height: 38 }}
                  />
                  <div className="top-buyers__item-text">
                    <span>
                      {client.name.firstname} {client.name.lastname}
                    </span>
                    <span>{client.email}</span>
                  </div>
                </div>
                <span className="top-buyers__item-total">
                  ${client.totalSpent.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard__totals">
          <div className="totals__item">
            <div className="totals__item-first">
              <div className="item__description">
                <PersonIcon fontSize="large" />
                <h4>Total de clientes</h4>
              </div>
              <span>{userTotals}</span>
              <NavLink to="/users">Ver todos</NavLink>
            </div>
            <div className="totals__item-second">
              <ResponsiveContainer width="80%" height={80}>
                <LineChart data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="totals__item">
            <div className="totals__item-first">
              <div className="item__description">
                <PersonIcon fontSize="large" />
                <h4>Total de produtos</h4>
              </div>
              <span>{productsTotal}</span>
              <NavLink to="/products">Ver todos</NavLink>
            </div>
            <div className="totals__item-second">
              <ResponsiveContainer width="80%" height={80}>
                <LineChart data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="item-3">
          <div className="item-3__title">
            <PersonIcon fontSize="large" />
            <h3>Total de vendas</h3>
          </div>
          <span className="item-3__total-value">
            {salesPerMonth.reduce((acc, salesItem) => {
              acc += salesItem.totalSales;
              return acc;
            }, 0)}
          </span>
          <div className="item-3__chart__wrapper">
            <ResponsiveContainer width="95%" height="60%">
              <LineChart data={salesPerMonth}>
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="item-4">
          <h3>Vendas por categoria</h3>
          <div className="item-4__chart-wrapper">
            <ResponsiveContainer width="90%" height="80%">
              <PieChart>
                <Pie
                  data={customSalesTotal}
                  dataKey="quantidadeVendas"
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="70%"
                  fill="#8884d8"
                />
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="item-5">
          <h3>Fluxo de visitas</h3>
          <div className="item-5__chart-wrapper">
            <ResponsiveContainer width="95%" height="75%">
              <BarChart data={pageViews}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalViews" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
