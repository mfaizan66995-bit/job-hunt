import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import JobSearchPage from './pages/JobSearchPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ResumePage from './pages/ResumePage';
import NavBar from './components/NavBar';

function App() {
  const { user, isLoading, checkAuth } = useStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      {user && <NavBar />}
      <main className="app-container">
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/jobs" element={<JobSearchPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
