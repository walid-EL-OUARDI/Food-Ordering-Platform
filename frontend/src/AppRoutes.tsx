import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterationPage from "./pages/RegisterationPage";
import PrivateRoute from "./components/PrivateRoute";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import OrderStatusPage from "./pages/OrderStatusPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/search/:country",
    element: (
      <Layout showHero={false}>
        <SearchPage />
      </Layout>
    ),
  },
  {
    path: "/details/:restaurantId",
    element: (
      <Layout showHero={false}>
        <DetailsPage />
      </Layout>
    ),
  },
  {
    path: "/orders-status",
    element: (
      <Layout showHero={false}>
        <OrderStatusPage />
      </Layout>
    ),
  },
  {
    element: <PrivateRoute fromAuthenticatedUsers />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterationPage />,
      },
    ],
  },
  {
    element: <PrivateRoute fromAuthenticatedUsers={false} />,
    children: [
      {
        path: "/user-profile",
        element: (
          <Layout showHero={false}>
            <UserProfilePage />
          </Layout>
        ),
      },
      {
        path: "/manage-restaurant",
        element: (
          <Layout showHero={false}>
            <ManageRestaurantPage />
          </Layout>
        ),
      },
    ],
  },
]);
