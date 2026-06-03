import { createBrowserRouter } from "react-router";
import Mainmother from "../Layouts/Mainmother";
import Home from "../Pages/Home/Home";
import Cart from "../Pages/Cart/Cart";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import CompleteProfile from "../Authentication/CompleteProfile";
import ForgetPassword from "../Authentication/ForgetPassword";
import TermsAndConditions from "../Pages/Legal/TermsAndConditions";
import AboutUs from "../Pages/About/AboutUs";
import EmailVerification from "../Authentication/EmailVerification";
import AllClothes from "../Pages/AllClothes/AllClothes";
import Profilelayout from "../Layouts/Profilelayout";
import MyProfile from "../Pages/Profile/MyProfile";
import MyOrders from "../Pages/Profile/MyOrders";
import MyReviews from "../Pages/Profile/MyReviews";
import NotFound from "../Pages/NotFound";
import BestClothesDetails from "../components/BestClothesDetails";
import KidsClothesDetails from "../Pages/AllClothes/KidsClothes";
import MensClothesDetails from "../Pages/AllClothes/MensClothes";
import WomensClothesDetails from "../Pages/AllClothes/Womenclothes";
import PrivetRoute from "../Authentication/Privetroute/Privetroute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainmother></Mainmother>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "complete-profile",
        element: <CompleteProfile></CompleteProfile>,
      },
      {
        path: "/forgot-password",
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: "verify-email",
        element: <EmailVerification></EmailVerification>,
      },
      {
        path: "about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "terms",
        element: <TermsAndConditions></TermsAndConditions>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "all-clothes",
        element: <AllClothes></AllClothes>,
      },
      {
        path: "bestclothes/:id",
        element: <BestClothesDetails></BestClothesDetails>,
      },
      {
        path: "kidsclothes/:id",
        element: <KidsClothesDetails></KidsClothesDetails>,
      },
      {
        path: "womensclothes/:id",
        element: <WomensClothesDetails></WomensClothesDetails>,
      },
      {
        path: "mensclothes/:id",
        element: <MensClothesDetails></MensClothesDetails>,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "profile",
    element: (
      <PrivetRoute>
        <Profilelayout></Profilelayout>
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        element: <MyProfile></MyProfile>,
      },
      {
        path: "profile/my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "profile/my-reviews",
        element: <MyReviews></MyReviews>,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
