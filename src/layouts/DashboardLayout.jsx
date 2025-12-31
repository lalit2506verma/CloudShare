import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>

          {/* Display User Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">Name:</span>
              <span className="text-gray-900">
                {user?.firstName} {user?.lastName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-900">{user?.email}</span>
            </div>

            {user?.userId && (
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-medium">User ID:</span>
                <span className="text-gray-900">{user.userId}</span>
              </div>
            )}
          </div>

          {/* Example of using user data in components */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              🎉 You're logged in as <strong>{user?.email}</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout