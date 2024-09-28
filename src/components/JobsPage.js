import React, { useEffect, useState } from 'react';
import './JobsPage.css';
import { useNavigate } from 'react-router-dom'; 

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch job data from the backend
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/jobs'); // Adjust the API endpoint as necessary
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="jobs-page">
      <h1>Available Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h2>{job.title}</h2>
              <p><strong>Company ID:</strong> {job.companyId}</p>
              <p><strong>Location:</strong> {job.address[0]?.city || 'N/A'}, {job.address[0]?.state || 'N/A'}, {job.address[0]?.country || 'N/A'}</p>
              <p><strong>Salary:</strong> ${job.salary || 'N/A'}</p>
              <p><strong>Experience Required:</strong> {job.experienceRequired || 'N/A'} years</p>
              <p><strong>Skills Required:</strong> {job.skillsRequired.length > 0 ? job.skillsRequired.join(', ') : 'N/A'}</p>
              <p><strong>Description:</strong> {job.description || 'N/A'}</p>
              <button className="apply-button" onClick={() => navigate(`/jobs/${job._id}/apply`)}>Apply Now</button> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
