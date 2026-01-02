import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import UploadPage from "../pages/UploadPage";
import MyFilesPage from "../pages/MyFilesPage";
import SubscriptionPage from "../pages/SubscriptionPage";
import TransactionPage from "../pages/TransactionPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-files"
        element={
          <ProtectedRoute>
            <MyFilesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subscription"
        element={
          <ProtectedRoute>
            <SubscriptionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <TransactionPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;