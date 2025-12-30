import AppRouter from "./config/AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
const App = () => {
  return (
    <AuthProvider>
      {/* App router */}
      <AppRouter />
      
    </AuthProvider>
  );
}

export default App