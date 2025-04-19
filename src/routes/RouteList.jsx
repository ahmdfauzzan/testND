import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import Protected from "../components/Protected";

export const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
