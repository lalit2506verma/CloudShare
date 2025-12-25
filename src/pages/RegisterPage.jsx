import React from 'react'
import RegisterSection from '../components/loginAndRegister/RegisterSection';

const RegisterPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <RegisterSection />
      </div>
    </div>
  );
};

export default RegisterPage