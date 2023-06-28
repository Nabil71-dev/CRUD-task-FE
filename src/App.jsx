import React from "react";
import { Routes } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Routes>
      {
        DashboardRoutes.map((route, index) => <React.Fragment key={`dashboard-route-${index}`}>{route}</React.Fragment>)
      }
    </Routes>
  )
}

export default App
