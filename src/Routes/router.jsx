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
        element: <PrivateRoute><MyCart /></PrivateRoute>,
      },
      {
        path: "/products/:brandName",
        element: <ProductPage />,
        loader: ({ params }) => fetch(`http://localhost:5000/products/${params.brandName}`)
      },
      {
        path: "/allProducts",
        element: <AllProducts />,
        loader: () => fetch ('http://localhost:5000/products')
      },
      {
        path: "/productDetails/:_id",
        element: <PrivateRoute><ProductDetails /></PrivateRoute>,
      },
      {
        path: "/productUpdate/:_id",
        element: <PrivateRoute><UpdateProduct /> </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/updateProducts/${params._id}`)
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