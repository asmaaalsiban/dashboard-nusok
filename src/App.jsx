/** @format */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./dashboard/context/AuthContext";
import ProtectedRoute from "./dashboard/components/ProtectedRoute";
import DashboardLayout from "./dashboard/components/DashboardLayout";
import Login from "./dashboard/pages/Login";
import DashboardHome from "./dashboard/pages/DashboardHome";
import Bookings from "./dashboard/pages/Bookings";
import Users from "./dashboard/pages/Users";
import Hotels from "./dashboard/pages/Hotels";
import Packages from "./dashboard/pages/Packages";
import ReligiousGuide from "./dashboard/pages/ReligiousGuide";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="users" element={<Users />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="packages" element={<Packages />} />
            <Route path="religious-guide" element={<ReligiousGuide />} />
            <Route path="*" element={<DashboardHome />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;