import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import MyCart from "../Pages/MyCart/MyCart";
import ProductPage from "../Pages/ProductPage/ProductPage";
import SignUp from "../Authentication/SignUp/SignUp";
import LogIn from "../Authentication/LogIn/LogIn";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Root/Dashboard/Dashboard";
import Statistics from "../Pages/DashboardPages/AdminDashboardPages/Statistics/Statistics";
import AdminAllProducts from "../Pages/DashboardPages/AdminDashboardPages/AdminAllProducts/AdminAllProducts";
import AdminRoute from "./AdminRoute/AdminRoute";
import SellYourCar from "../Pages/DashboardPages/UserDashboardPages/SellYourCar/SellYourCar";
import UserProfile from "../Pages/DashboardPages/UserDashboardPages/UserProfile/UserProfile";
import AllUsers from "../Pages/DashboardPages/AdminDashboardPages/AllUsers/AllUsers";
import MyListings from "../Pages/DashboardPages/UserDashboardPages/MyListings/MyListings";
import AllListings from "../Pages/AllListings/AllListings";
import ListingDetails from "../Pages/ListingDetails/ListingDetails";
import UpdateListing from "../Pages/DashboardPages/UserDashboardPages/UpdateListing/UpdateListing";
import SavedListings from "../Pages/DashboardPages/UserDashboardPages/savedListings/savedListings";

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
        path: "/alllistings",
        element: <AllListings />
      },
      {
        path: "/details/:id",
        element: <PrivateRoute><ListingDetails /></PrivateRoute>,
      },
      {
        path: "/myCart",
        element: <PrivateRoute><MyCart /></PrivateRoute>,
      },
      {
        path: "/products/:brandName",
        element: <ProductPage />,
      },
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
      // user dashboard router
      {
        path: "sellCar",
        element: <SellYourCar />
      },
      {
        path: "profile",
        element: <UserProfile />
      },
      {
        path: "mylistings",
        element: <MyListings />
      },
      {
        path: "updatelisting/:id",
        element: <UpdateListing />
      },
      {
        path: "savedListings",
        element: <SavedListings />
      }
    ]
  }
]);

export default router;