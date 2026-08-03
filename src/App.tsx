import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Container from "./components/Container";
import { WatchlistProvider } from "./context/WatchlistProvider";
import AuthProvider from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { Dashboard } from "./pages/Dashboard";
import { Markets } from "./pages/Markets";
import { Converter } from "./pages/Converter";
import { Watchlist } from "./pages/Watchlist";
import { Login } from "./pages/Login";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <HashRouter>
          <Container>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/markets/:id" element={<Markets />} />
              <Route path="/converter" element={<Converter />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </Container>
        </HashRouter>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;
