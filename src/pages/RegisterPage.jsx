import React, { useState } from "react";
import RegisterSection from "../components/loginAndRegister/RegisterSection";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/AuthService";

const RegisterPage = () => {
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Loading ans message states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Form Validation
  const validation = () => {
    if (!formData.firstName.trim()) {
      setError("First Name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validation()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await registerUser(formData);
      setSuccess("Registration successful! Redirecting...");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      // redirecting to login page after 2 seconds
      setTimeout(() => {
        navigate("/auth/login");
      }, 4000);
    }
    catch (err) {
      // Handle different error response formats
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <RegisterSection
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
          success={success}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
