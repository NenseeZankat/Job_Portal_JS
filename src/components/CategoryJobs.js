import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryJobs.css'; // For styles (if needed)

const CategoryJobs = () => {
  const { categoryId } = useParams(); // Get categoryId from the URL
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/jobs/category/${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [categoryId]);

  // Handler for applying to a job
  const applyToJob = (jobId) => {
    // Example navigation to job application page
    navigate(`/jobs/${jobId}/apply`);
  };

  // Loading spinner
  if (loading) return <p>Loading jobs...</p>;

  // Error message
  if (error) return <p>{error}</p>;

  return (
    <div className="category-jobs-page">
      <h2>Jobs in this Category</h2>

      {/* Display a message if no jobs are found */}
      {jobs.length === 0 ? (
        <p>No jobs found in this category.</p>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job._id} className="job-item">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Company:</strong> {job.companyId.name}</p>
              <p><strong>Location:</strong> {job.address[0]?.city || 'N/A'}, {job.address[0]?.state || 'N/A'}</p>
              <p><strong>Salary:</strong> ${job.salary || 'N/A'}</p>
              <p><strong>Experience Required:</strong> {job.experienceRequired} years</p>
              {/* Add more job details if necessary */}

              {/* Apply button */}
              <button className="apply-button" onClick={() => applyToJob(job._id)}>
                Apply Now
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Back to Categories button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back to Categories
      </button>
    </div>
  );
};

export default CategoryJobs;
