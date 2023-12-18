import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import AddProduct from "../ProductManage/AddProduct/AddProduct";
import MyCart from "../Pages/MyCart/MyCart";
import ProductPage from "../Pages/ProductPage/ProductPage";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import SignUp from "../Authentication/SignUp/SignUp";
import LogIn from "../Authentication/LogIn/LogIn";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UpdateProduct from "../ProductManage/UpdateProduct.jsx/UpdateProduct";
import AllProducts from "../Pages/ProductPage/AllProducts";
import Dashboard from "../Root/Dashboard/Dashboard";
import Statistics from "../Pages/DashboardPages/AdminDashboardPages/Statistics/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/myCart",
        element: <PrivateRoute><MyCart /></PrivateRoute>,
      },
      {
        path: "/products/:brandName",
        element: <ProductPage />,
      },
      {
        path: "/allProducts",
        element: <AllProducts />,
      },
      {
        path: "/productDetails/:_id",
        element: <PrivateRoute><ProductDetails /></PrivateRoute>,
      }
    ]
  },
  // sign up and login route
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />
  },

  // dashboard router
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: "statistics",
        element: <Statistics />
      },
      {
        path: "addProduct",
        element: <AddProduct />
      },
      {
        path: "productUpdate/:_id",
        element: <UpdateProduct />,
        loader: ({ params }) => fetch(`http://localhost:5000/updateProducts/${params._id}`)
      }
    ]
  }
]);

export default router;