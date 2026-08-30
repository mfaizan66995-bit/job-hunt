import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import JobCard from '../components/JobCard';

export default function JobSearchPage() {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    remoteStatus: ''
  });

  const { jobs, jobsLoading, searchJobs, getRecommendedJobs } = useStore();

  useEffect(() => {
    getRecommendedJobs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchJobs(
      filters.keyword,
      filters.location,
      filters.jobType,
      filters.remoteStatus
    );
  };

  return (
    <div className="job-search-container">
      <h1>Job Search</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="keyword"
          placeholder="Job title, keywords..."
          value={filters.keyword}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleFilterChange}
        >
          <option value="">All Job Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
        <select
          name="remoteStatus"
          value={filters.remoteStatus}
          onChange={handleFilterChange}
        >
          <option value="">All Locations</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="on-site">On-site</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {jobsLoading ? (
        <div className="loading">Searching jobs...</div>
      ) : (
        <div className="jobs-grid">
          {jobs.length === 0 ? (
            <p>No jobs found. Try adjusting your filters.</p>
          ) : (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          )}
        </div>
      )}
    </div>
  );
}
