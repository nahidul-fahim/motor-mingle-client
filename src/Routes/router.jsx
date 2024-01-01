import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import AddProduct from "../Pages/DashboardPages/AdminDashboardPages/AddProduct/AddProduct";
import MyCart from "../Pages/MyCart/MyCart";
import ProductPage from "../Pages/ProductPage/ProductPage";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import SignUp from "../Authentication/SignUp/SignUp";
import LogIn from "../Authentication/LogIn/LogIn";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UpdateProduct from "../Pages/DashboardPages/AdminDashboardPages/UpdateProduct/UpdateProduct";
import AllProducts from "../Pages/ProductPage/AllProducts";
import Dashboard from "../Root/Dashboard/Dashboard";
import Statistics from "../Pages/DashboardPages/AdminDashboardPages/Statistics/Statistics";
import AdminAllProducts from "../Pages/DashboardPages/AdminDashboardPages/AdminAllProducts/AdminAllProducts";
import AdminRoute from "./AdminRoute/AdminRoute";
import SellYourCar from "../Pages/DashboardPages/UserDashboardPages/SellYourCar/SellYourCar";
import UserProfile from "../Pages/DashboardPages/UserDashboardPages/UserProfile/UserProfile";
import MyAds from "../Pages/DashboardPages/UserDashboardPages/MyAds/MyAds";
import AllUsers from "../Pages/DashboardPages/AdminDashboardPages/AllUsers/AllUsers";

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
      // admin dashboard router
      {
        path: "statistics",
        element: <AdminRoute><Statistics /></AdminRoute>
      },
      {
        path: "allusers",
        element: <AdminRoute><AllUsers /></AdminRoute>
      },
      {
        path: "adminallproducts",
        element: <AdminRoute><AdminAllProducts /></AdminRoute>
      },
      {
        path: "addProduct",
        element: <AdminRoute><AddProduct /></AdminRoute>
      },
      {
        path: "adminallproducts/updateProduct/:id",
        element: <AdminRoute><UpdateProduct />,</AdminRoute>
      },
      // user dashboard router
      {
        path: "sellyourcar",
        element: <SellYourCar />
      },
      {
        path: "profile",
        element: <UserProfile />
      },
      {
        path: "myads",
        element: <MyAds />
      },
    ]
  }
]);

export default router;