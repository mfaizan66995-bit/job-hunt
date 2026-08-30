import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export default function DashboardPage() {
  const { user, applicationStats, getApplicationStats, getApplications } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    getApplicationStats();
    getApplications();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>Welcome, {user?.fullName}! 👋</h1>
        <p>Your Job Hunt Agent Dashboard</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p className="stat-number">{applicationStats?.total || 0}</p>
        </div>
        <div className="stat-card success">
          <h3>Submitted</h3>
          <p className="stat-number">{applicationStats?.submitted || 0}</p>
        </div>
        <div className="stat-card warning">
          <h3>Interview</h3>
          <p className="stat-number">{applicationStats?.interview || 0}</p>
        </div>
        <div className="stat-card info">
          <h3>Offers</h3>
          <p className="stat-number">{applicationStats?.offer || 0}</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button onClick={() => navigate('/resume')} className="btn btn-primary">
            📄 Upload Resume
          </button>
          <button onClick={() => navigate('/jobs')} className="btn btn-secondary">
            🔍 Search Jobs
          </button>
          <button onClick={() => navigate('/applications')} className="btn btn-info">
            📋 View Applications
          </button>
        </div>
      </div>

      <div className="info-section">
        <h2>How It Works</h2>
        <ol>
          <li><strong>Upload Resume:</strong> Upload your resume to get started</li>
          <li><strong>Search Jobs:</strong> Find jobs that match your profile</li>
          <li><strong>Apply Easily:</strong> Apply to multiple jobs with customized cover letters</li>
          <li><strong>Track Progress:</strong> Monitor your applications and interview status</li>
        </ol>
      </div>
    </div>
  );
}
