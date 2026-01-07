import AppRouter from "./config/AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { UserCreditsProvider } from "./contexts/UserCreditsContext";
const App = () => {
  return (
    <AuthProvider>
      <UserCreditsProvider>
        {/* App router */}
        <AppRouter />
      </UserCreditsProvider>
    </AuthProvider>
  );
};

export default App;
