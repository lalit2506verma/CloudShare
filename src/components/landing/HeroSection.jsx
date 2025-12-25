import React from "react";
import Dashboard from "../../assets/Dashboard.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col p-28 gap-11 bg-linear-to-r from-pink-100 via-purple-100 to-blue-100">
      <div className="text-center">
        <div className="heading text-5xl font-extrabold tracking-tight lg:px-5 md:px-1">
          <h1 className=""> Store, Share, Simplify with</h1>
          <span className="text-purple-600"> Cloud Share</span>
        </div>

        {/* tag line */}
        <p className="text-sm font-semibold text-gray-600 md:px-5 py-3">
          Cloud Share securely store your files in the cloud and share them
          effortlessly with{" "}
          <span className="font-bold">anyone, anywhere. </span>
        </p>

        {/* Get Started Button */}
        <div className="flex justify-center m-3 gap-5">
          <button
            onClick={() => navigate("/auth/register")}
            className="bg-purple-600 rounded-lg p-3 text-white shadow hover:bg-purple-800 hover:cursor-pointer hover:shadow-xl">
            Get Started
          </button>

          <button
            onClick={() => navigate("/auth/login")}
            className="rounded-lg bg-white p-3 w-28 shadow hover:cursor-pointer hover:shadow-xl">
            Sign In
          </button>
        </div>
      </div>

      <div className="relative lg:p-6 mt-7">
        <div className="rounded-lg shadow-xl overflow-hidden">
          <img src={Dashboard} alt="Dashboard" className="w-full h-full object-cover" />
        </div>

        <div className="mt-8 text-center">
          <p className="text-base text-gray-600">
            All your files are encrypted and stored securely with enterprise grade security protocols.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
