import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 max-auto">
            <p className="mt-4 text-gray-600">
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated() ? children : <Navigate to="/auth/login" replace />
};

export default ProtectedRoute;