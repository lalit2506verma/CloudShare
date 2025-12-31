import { useState } from "react";
import LoginSection from "../components/loginAndRegister/LoginSection";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form Data state
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Form validation
  const validation = () => {
    if (!credentials.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!credentials.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setError("Please provide a valid email");
      return false;
    }
    return true;
  };

  // Handle form submission - Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form
    if (!validation()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginUser(credentials);
      console.log(response);

      if (response.token && response.userDto) {
        login(response.userDto, response.token);

        // redirecting to Home page after 1 second
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
      
      // Reset Credentials
      setCredentials({
        email: "",
        password: "",
      });

    } catch (error) {
      // Handle response format
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Login Failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex max-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginSection
          credentials={credentials}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default LoginPage;
