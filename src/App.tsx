import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Container from "./components/Container";
import { WatchlistProvider } from "./context/WatchlistProvider";

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;