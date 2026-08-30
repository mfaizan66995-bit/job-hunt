import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export default function NavBar() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>🎯 Job Hunt Agent</h2>
        </div>
        <ul className="nav-menu">
          <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Dashboard</a></li>
          <li><a href="/jobs" onClick={(e) => { e.preventDefault(); navigate('/jobs'); }}>Search Jobs</a></li>
          <li><a href="/applications" onClick={(e) => { e.preventDefault(); navigate('/applications'); }}>Applications</a></li>
          <li><a href="/resume" onClick={(e) => { e.preventDefault(); navigate('/resume'); }}>Resume</a></li>
        </ul>
        <div className="navbar-user">
          <span>{user?.fullName}</span>
          <button onClick={handleLogout} className="btn btn-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
}
