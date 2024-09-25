import React, { useEffect, useState } from 'react';
import './FeaturedJobs.css';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/jobs'); // Adjust the URL if necessary
        const data = await response.json();
        setJobs(data); // Store fetched jobs in state
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="featured-jobs">
      <h2>Featured Jobs</h2>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.companyId.name}</p> {/* Display the company name */}
            <p>{job.address[0]?.city || 'Location not specified'}</p> {/* Display the first city in the address array */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
