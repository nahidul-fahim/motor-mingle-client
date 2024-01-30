import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
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
import BidsForAListing from "../Pages/DashboardPages/UserDashboardPages/BidsForAListing/BidsForAListing";

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
        path: "/allListings",
        element: <AllListings />
      },
      {
        path: "/details/:id",
        element: <PrivateRoute><ListingDetails /></PrivateRoute>,
      },
    ]
  },
  // sign up and login route
  {
    path: "/signUp",
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
        path: "allUsers",
        element: <AdminRoute><AllUsers /></AdminRoute>
      },
      {
        path: "adminAllProducts",
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
        path: "myListings",
        element: <MyListings />
      },
      {
        path: "updateListing/:id",
        element: <UpdateListing />
      },
      {
        path: "savedListings",
        element: <SavedListings />
      },
      {
        path: "bids/:id",
        element: <BidsForAListing />
      }
    ]
  }
]);

export default router;