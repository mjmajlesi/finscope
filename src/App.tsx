import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Container from "./components/Container";
import { WatchlistProvider } from "./context/WatchlistProvider";
import { Dashboard } from "./pages/Dashboard";
import { Markets } from "./pages/Markets";
import { Converter } from "./pages/Converter";
import { Watchlist } from "./pages/Watchlist";

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/markets/:id" element={<Markets />} />
            <Route path="/converter" element={<Converter />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;