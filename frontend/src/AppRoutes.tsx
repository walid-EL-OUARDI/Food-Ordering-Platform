import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterationPage from "./pages/RegisterationPage";
import PrivateRoute from "./components/PrivateRoute";
import UserProfilePage from "./pages/UserProfilePage";
import DetailsSection from "./components/forms/manage-restaurant-form/DetailsSection";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";

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
