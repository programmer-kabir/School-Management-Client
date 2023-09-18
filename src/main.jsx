import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { Provider } from "react-redux";
import store from "./Pages/Redux/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import{ Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <Toaster />
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      </Provider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
