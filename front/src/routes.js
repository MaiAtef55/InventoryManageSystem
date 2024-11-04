import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Warehouse from "./pages/warehouse/warehouse";
import Warehouselist from "./pages/warehouse/warehouselist";
import Managewarehouse from "./pages/warehouse/Managewarehouse";
import Updatewarehouse from "./pages/warehouse/Updatewarehouse";
import Addwarehouse from "./pages/warehouse/addwarehouse";
import Allrequest from "./pages/request/allrequest";
import Request from "./pages/request/request";
import Managerequest from "./pages/request/managerequest";
import Sendrequest from "./pages/request/sendrequest";
import ManageProduct from "./pages/manage-product/ManageProduct";
import Addproduct from "./pages/manage-product/Addproduct";
import Update from "./pages/manage-product/Update";
import App from "./App";
import Mangesupervisors from "./pages/supervisors/Mangesupervisors";
import Updatesupervisors from "./pages/supervisors/Updatesupervisors";
import Addsupervisors from "./pages/supervisors/Addsupervisors";
import Show from "./pages/supervisors/Show";
import Productcurd from "./pages/product/productcurd";
import Allproductcurd from "./pages/product/Allproductcurd";
import User from "./middleware/user";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // GUEST MIDDLEWARE
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        path: "/Managewarehouse",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Managewarehouse />,
          },
          {
            path: "addwarehouse",
            element: <Addwarehouse />,
          },
          {
            path: ":id",
            element: <Updatewarehouse />,
          },
        ],
      },
      {
        path: "/supervisors",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Mangesupervisors />,
          },
          {
            path: "Addsupervisors",
            element: <Addsupervisors />,
          },
          {
            path: "Show/:id",
            element: <Show />,
          },
          {
            path: ":id",
            element: <Updatesupervisors />,
          },
        ],
      },
      {
        path: "",
        element: <Admin />,
        children: [
          {
            path: "/Managerequest",
            element: <Managerequest />,
          },
          {
            path: "/ManageProduct",
            element: <ManageProduct />,
          },
          {
            path: "/Addproduct",
            element: <Addproduct />,
          },
          {
            path: "/Update/:id",
            element: <Update />,
          },
          {
            path: "/allrequest",
            element: <Allrequest />,
          },
        ],
      },
      {
        path: "",
        element: <Admin />,
        children: [
          {
            path: "/Warehouselist",
            element: <Warehouselist />,
          },
          {
            path: "Allproductcurd",
            element: <Allproductcurd />,
          },
          {
            path: "/Warehouse",
            element: <Warehouse />,
          },
          {
            path: "/Updatewarehouse",
            element: <Updatewarehouse />,
          },
        ],
      },
      {
        path: "",
        element: <Admin />,
        children: [
          {
            path: "Allproductcurd",
            element: <Allproductcurd />,
          },
        ],
      },
      {
        path: "",
        element: <User />,
        children: [
          {
            path: "Productcurd",
            element: <Productcurd />,
          },

          {
            path: "/sendrequest/:id",
            element: <Sendrequest />,
          },
          {
            path: "/request",
            element: <Request />,
          },

          {
            path: "Productcurd",
            element: <Productcurd />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);

/*
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "Productcurd",
        element: <Productcurd />,
      },
      {
        path: "Allproductcurd",
        element: <Allproductcurd />,
      },

    
      {
        path: "/supervisors",

        children: [
          {
            path: "",
            element: <Mangesupervisors />,
          },
          {
            path: "add",
            element: <Addsupervisors />,
          },
          {
            path: "Show/:id",
            element: <Show />,
          },
          {
            path: ":id",
            element: <Updatesupervisors />,
          },
        ],
      },
      {
        path: "/Warehouse",
        element: <Warehouse />,
      },
      {
        path: "/Managerequest",
        element: <Managerequest />,
      },
      {
        path: "/ManageProduct",
        element: <ManageProduct />,
      },
      {
        path: "/Addproduct",
        element: <Addproduct />,
      },
      {
        path: "/Update/:id",
        element: <Update />,
      },
      {
        path: "/allrequest",
        element: <Allrequest />,
      },
      {
        path: "/sendrequest/:id",
        element: <Sendrequest />,
      },
      {
        path: "/request",
        element: <Request />,
      },
      {
        path: "/Updatewarehouse",
        element: <Updatewarehouse />,
      },
      {
        path: "/Warehouselist",
        element: <Warehouselist />,
      },
      ////
      {
        path: "/Managewarehouse",

        children: [
          {
            path: "",
            element: <Managewarehouse />,
          },
          {
            path: "addwarehouse",
            element: <Addwarehouse />,
          },
          {
            path: ":id",
            element: <Updatewarehouse />,
          },
        ],
      },
      ////
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]); 

*/
