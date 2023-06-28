import { Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Brand from "../pages/Brand";
import Category from "../pages/Category";
import Group from "../pages/Group";
import Product from "../pages/Product";
import CreateProduct from "../forms/CreateProduct";
import EditProduct from "../pages/EditProduct";

const DashboardRoutes = [
    <Route path="/" element={<Dashboard />} />,
    <Route path="/brand" element={<Dashboard><Brand /></Dashboard>} />,
    <Route path="/category" element={<Dashboard><Category /></Dashboard>} />,
    <Route path="/group" element={<Dashboard><Group /></Dashboard>} />,

    <Route path="/product/list" element={<Dashboard><Product /></Dashboard>} />,
    <Route path="/product/create" element={<Dashboard><CreateProduct /></Dashboard>} />,
    <Route path="/product/edit/:productID" element={<Dashboard><EditProduct /></Dashboard>} />,
]

export default DashboardRoutes;