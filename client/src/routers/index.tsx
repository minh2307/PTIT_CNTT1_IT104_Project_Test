import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { LazyLoader } from "./LazyLoader.router";

const Login = lazy(() => import("../component/Login"));
const Register = lazy(() => import("../component/Register"));
const Home = lazy(() => import("../component/home/Index"));
const CategoryManager = lazy(
  () => import("../component/manager/categoryManger/Index")
);

const Test = lazy(() => import("../component/manager/TestManager/Index"));
const TestFormPage = lazy(
  () => import("../component/manager/TestManager/AddTestManager/Index")
);
const Quizz = lazy(() => import("../component/quizzTest/index"));

export const router = createBrowserRouter([
  {
    path: "*",
    element: <LazyLoader element={Login} />,
  },
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
      {
        path: "tests",
        children: [
          {
            index: true,
            element: <LazyLoader element={Test} />,
          },
          {
            path: "add",
            element: <LazyLoader element={TestFormPage} />,
          },
          {
            path: "edit/:id",
            element: <LazyLoader element={TestFormPage} />,
          },
        ],
      },
    ],
  },
  {
    path: "/quizz/:id",
    element: <LazyLoader element={Quizz}></LazyLoader>,
  },
]);
