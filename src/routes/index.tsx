import React from "react";
import { Route, Routes } from "react-router-dom";

// COMPONENTS LAYOUTS
import { AuthLayout } from "../layouts/AuthLayout";

// COMPONENTS PAGES
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

//* PAGES CLIENT
import { DashboardClient } from "../pages/client/DashboardClient";
import { DashboardEstablishment } from "../pages/establishment/DashboardEstablishment";
import { Profile } from "../pages/Profile";

//* PAGES ESTABLISHMENT

export const Router: React.FC = () => {
  return (
    <Routes>
      {/* UNAUTHENTICATED ROUTES */}
      <Route path="/">
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* AUTHENTICATED ROUTES */}
      <Route path="/users" element={<AuthLayout />}>
        <Route path="/users/me" element={<Profile />} />
      </Route>

      {/* AUTHENTICATED ROUTES CLIENT */}
      <Route path="/client" element={<AuthLayout />}>
        <Route path="/client/dashboard" element={<DashboardClient />} />

        <Route path="/client/reservas" element={<div />} />
      </Route>

      {/* AUTHENTICATED ROUTES CLIENT */}
      <Route path="/establishment" element={<AuthLayout />}>
        <Route
          path="/establishment/dashboard"
          element={<DashboardEstablishment />}
        />
      </Route>
    </Routes>
  );
};
