/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StoreState } from "./store";
import Root from "./pages/root/Root";
import Loader from "./pages/loader/Loader";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import Dashboard from "./pages/dashboard/Dashboard";

const App: React.FC = () => {
  const isLoading = useSelector((state: StoreState) => state.ui.isLoading);

  const router = useRef<any>(
    createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ])
  );
  if (isLoading) return <Loader />;

  return <RouterProvider router={router.current} />;
};

export default App;
