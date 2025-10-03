import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { LazyLoader } from "./LazyLoader.router";

const Login = lazy(() => import("../component/Login"));
const Register = lazy(() => import("../component/Register"));
const Home = lazy(() => import("../component/home/Index"));
const CategoryManager = lazy(
  () => import("../component/manager/categoryManger/Index")
);

const Test = lazy(() => import("../App"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LazyLoader element={Login} />,
  },
  {
    path: "/register",
    element: <LazyLoader element={Register} />,
  },
  {
    path: "/",
    element: <LazyLoader element={Home} />,
  },
  {
    path: "/manager",
    children: [
      {
        path: "category",
        element: <LazyLoader element={CategoryManager} />,
      },
    ],
  },
  {
    path: "/test",
    element: <LazyLoader element={Test} />,
  },
]);
