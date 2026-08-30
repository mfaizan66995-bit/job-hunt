import React, { useState, useEffect } from 'react';
import { useStore } from '../store';

export default function ApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { applications, getApplications, updateApplicationStatus } = useStore();

  useEffect(() => {
    getApplications(statusFilter);
  }, [statusFilter]);

  const handleStatusChange = async (applicationId, newStatus) => {
    await updateApplicationStatus(applicationId, newStatus);
  };

  const statusColors = {
    draft: '#999',
    submitted: '#2196F3',
    viewed: '#FF9800',
    interview: '#9C27B0',
    rejected: '#F44336',
    offer: '#4CAF50',
    accepted: '#00A000'
  };

  return (
    <div className="applications-container">
      <h1>My Applications</h1>

      <div className="filter-section">
        <label>Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Applications</option>
          <option value="draft">Draft</option>
          <option value="submitted">Submitted</option>
          <option value="viewed">Viewed</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
          <option value="accepted">Accepted</option>
        </select>
      </div>

      {applications.length === 0 ? (
        <p className="no-data">No applications found.</p>
      ) : (
        <div className="applications-table">
          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Company</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.jobId?.title}</td>
                  <td>{app.jobId?.company}</td>
                  <td>
                    {app.appliedDate
                      ? new Date(app.appliedDate).toLocaleDateString()
                      : '-'}
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: statusColors[app.status] }}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="draft">Draft</option>
                      <option value="submitted">Submitted</option>
                      <option value="viewed">Viewed</option>
                      <option value="interview">Interview</option>
                      <option value="rejected">Rejected</option>
                      <option value="offer">Offer</option>
                      <option value="accepted">Accepted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
