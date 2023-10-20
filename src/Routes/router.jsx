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
        path: "/addProduct",
        element: <PrivateRoute><AddProduct /></PrivateRoute>
      },
      {
        path: "/myCart",
        element: <PrivateRoute><MyCart /></PrivateRoute>
      },
      {
        path: "/products/:brandName",
        element: <ProductPage />,
        loader: ({ params }) => fetch(`http://localhost:5000/products/${params.brandName}`)
      },
      {
        path: "/productDetails/:_id",
        element: <PrivateRoute><ProductDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/brandProducts/${params._id}`)
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />
      }
    ]
  },
]);

export default router;