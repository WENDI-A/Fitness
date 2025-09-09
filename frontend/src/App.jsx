import React, { useState, useEffect } from "react";
import Header from "./pages/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState("website"); // "website" or "dashboard"

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
      setCurrentPage("dashboard");
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    setCurrentPage("dashboard");
  };

  const handleRegister = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCurrentPage("website");
  };

  const handleGoToDashboard = () => {
    if (user) {
      setCurrentPage("dashboard");
    } else {
      setShowLogin(true);
    }
  };

  const handleGoToWebsite = () => {
    setCurrentPage("website");
  };

  // Show Dashboard if user is logged in and on dashboard page
  if (currentPage === "dashboard" && user) {
    return (
      <ThemeProvider>
        <Dashboard user={user} onLogout={handleLogout} onGoToWebsite={handleGoToWebsite} />
      </ThemeProvider>
    );
  }

  if (showLogin) {
    return (
      <ThemeProvider>
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      </ThemeProvider>
    );
  }

  if (showRegister) {
    return (
      <ThemeProvider>
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="scroll-smooth">
        <Header 
          user={user} 
          onLogin={() => setShowLogin(true)}
          onLogout={handleLogout}
          onGoToDashboard={handleGoToDashboard}
        />
        <section id="home"><Home onJoinNow={() => setShowRegister(true)} /></section>
        <section id="about"><About /></section> 
        <section id="services"><Services /></section>
        <section id="testimonials"><Testimonials /></section> 
        <section id="contact"><Contact /></section>
        <section id="footer"><Footer /></section>
      </div>
    </ThemeProvider>
  );
}

export default App;
