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

import { getTopBuyers } from "../../../sales/utils/salesUtils";
import { Avatar } from "@mui/material";
import { getUserTotals } from "../../../users/utils/usersUtils";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [topBuyers, setTopBuyers] = React.useState([]);
  const [userTotals, setUserTotals] = React.useState(0);
  const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTopBuyers();
        const utotal = await getUserTotals();
        setTopBuyers(result);
        setUserTotals(utotal);
      } catch (error) {
        console.error("Erro ao obter os principais compradores:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 600, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 800, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 580, pv: 2400, amt: 2400 },
  ];

  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];

  const dataBarChart = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
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
        </div>
        <div className="item-3">
          <div className="item-3__title">
            <PersonIcon fontSize="large" />
            <h3>Total de vendas</h3>
          </div>
          <div className="item-3__chart__wrapper">
            <ResponsiveContainer width="95%" height="60%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
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
                  data={data01}
                  dataKey="value"
                  nameKey="name"
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
              <BarChart data={dataBarChart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
