import React, { useState, useEffect } from 'react';
import { useStore } from '../store';

export default function ResumePage() {
  const [file, setFile] = useState(null);
  const { resumes, getResumes, uploadResume, error } = useStore();

  useEffect(() => {
    getResumes();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      await uploadResume(file);
      setFile(null);
      alert('Resume uploaded successfully!');
    } catch (err) {
      alert('Failed to upload resume');
    }
  };

  return (
    <div className="resume-container">
      <h1>My Resumes</h1>

      <div className="upload-section">
        <h2>Upload New Resume</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleUpload} className="upload-form">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
          />
          <button type="submit" className="btn btn-primary">
            Upload Resume
          </button>
        </form>
      </div>

      <div className="resumes-list">
        <h2>Your Resumes ({resumes.length})</h2>
        {resumes.length === 0 ? (
          <p>No resumes uploaded yet. Upload your first resume to get started!</p>
        ) : (
          <div className="resume-cards">
            {resumes.map((resume) => (
              <div key={resume._id} className="resume-card">
                <div className="resume-info">
                  <h3>📄 {resume.filename}</h3>
                  <p>Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}</p>
                  <p className="file-size">{(resume.filesize / 1024).toFixed(2)} KB</p>
                </div>
                <div className="resume-actions">
                  {resume.isDefault && <span className="badge">Default</span>}
                  <button className="btn btn-small">View</button>
                  <button className="btn btn-small">Edit</button>
                  <button className="btn btn-small btn-danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
