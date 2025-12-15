import LoginSection from "../components/loginAndRegister/LoginSection";

const LoginPage = () => {
  return (
    <div className="bg-gray-50 flex max-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginSection />
      </div>
    </div>
  );
};

export default LoginPage;
