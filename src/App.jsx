import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BuyerDashboard from "./pages/BuyerDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import CreateRFQPage from "./pages/CreateRFQPage";
import RFQDetailsPage from "./pages/RFQDetailsPage";
import MyQuotesPage from "./pages/MyQuotesPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/buyer"
          element={
            <ProtectedRoute role="BUYER">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/supplier"
          element={
            <ProtectedRoute role="SUPPLIER">
              <SupplierDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rfqs/new"
          element={
            <ProtectedRoute role="BUYER">
              <CreateRFQPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rfqs/:id"
          element={
            <ProtectedRoute>
              <RFQDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-quotes"
          element={
            <ProtectedRoute role="SUPPLIER">
              <MyQuotesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;