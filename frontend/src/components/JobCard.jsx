import React, { useState } from 'react';
import { useStore } from '../store';

export default function JobCard({ job }) {
  const [showDetails, setShowDetails] = useState(false);
  const { createApplication, resumes, saveJob } = useStore();

  const handleApply = async () => {
    if (!resumes.length) {
      alert('Please upload a resume first!');
      return;
    }

    try {
      const resumeId = resumes[0]._id; // Use first resume
      await createApplication(job._id, resumeId, '', 'submitted');
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Failed to submit application');
    }
  };

  const handleSaveJob = async () => {
    await saveJob(job._id);
    alert('Job saved to your list!');
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <div className="job-title-section">
          <h3>{job.title}</h3>
          <p className="company">{job.company}</p>
        </div>
        <div className="job-meta">
          <span className="location">📍 {job.location}</span>
          <span className={`remote ${job.remoteStatus}`}>{job.remoteStatus}</span>
        </div>
      </div>

      <div className="job-info">
        {job.salary && (
          <span className="salary">
            💰 ${job.salary.min}-${job.salary.max}
          </span>
        )}
        {job.jobType && <span className="job-type">{job.jobType}</span>}
        {job.matchScore && (
          <span className={`match-score score-${Math.floor(job.matchScore / 10)}`}>
            Match: {job.matchScore}%
          </span>
        )}
      </div>

      {showDetails && (
        <div className="job-details">
          <h4>Description</h4>
          <p>{job.description}</p>
          {job.requirements && (
            <>
              <h4>Requirements</h4>
              <ul>
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="job-actions">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="btn btn-small"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        <button onClick={handleApply} className="btn btn-primary btn-small">
          Apply
        </button>
        <button onClick={handleSaveJob} className="btn btn-secondary btn-small">
          Save
        </button>
        <a href={job.url} target="_blank" rel="noopener noreferrer" className="btn btn-small">
          View on Site
        </a>
      </div>
    </div>
  );
}
