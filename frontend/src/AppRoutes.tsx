import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterationPage from "./pages/RegisterationPage";

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
    path: "/login",
    element:<LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterationPage/>
  },
]);
