import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CompaniesList.css'; // Optional CSS file for styling

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]); // State to hold companies
  const [selectedCompany, setSelectedCompany] = useState(null); // State for selected company
  const [jobs, setJobs] = useState([]); // State to hold jobs of the selected company
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State for error handling

  const navigate = useNavigate(); // Define navigate function

  // Fetch companies from the backend
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await fetch('http://localhost:3000/api/company'); // Adjust the URL if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchCompanies();
  }, []);

  // Fetch jobs when a company is clicked
  const handleCompanyClick = async (companyId) => {
    setLoading(true); // Set loading to true
    setSelectedCompany(null); // Reset selected company
    try {
      const response = await fetch(`http://localhost:3000/api/company/${companyId}/jobs`); // Fetch jobs by company ID
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setSelectedCompany(data); // Set the selected company
      setJobs(data.jobsPosted || []); // Set jobs; default to an empty array if none found
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Render loading state
  if (loading) {
    return <p>Loading companies...</p>;
  }

  // Render error state if there's an error
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the companies list
  return (
    <div className="companies-list">
      <h2>All Companies</h2>
      <div className="company-grid">
        {companies.length > 0 ? (
          companies.map((company) => (
            <div
              key={company._id}
              className="company-card"
              onClick={() => handleCompanyClick(company._id)} // Handle click to fetch jobs
            >
              <h3>{company.name}</h3>
              <p><strong>Industry:</strong> {company.industry || 'Not specified'}</p>
              <p>
                <strong>Website:</strong> 
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  {company.website || 'N/A'}
                </a>
              </p>
              <div className="company-address">
                {company.address.map((addr, index) => (
                  <p key={index}>
                    {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
                  </p>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No companies available.</p> // Handle case with no companies
        )}
      </div>

      {selectedCompany && (
        <div className="company-jobs">
          <br/>
          <br/>
          <br/>
          <br/>
          <h3>Jobs at {selectedCompany.name}</h3>
          {jobs.length > 0 ? (
            <div className="job-list">
              {jobs.map((job) => (
                <div key={job._id} className="job-card">
                  <h4>{job.title}</h4>
                  <p>{job.description}</p>
                  <p>
                    <strong>Location:</strong> 
                    {job.address.map(addr => `${addr.city}, ${addr.state}`).join(', ')}
                  </p>
                  <p><strong>Salary:</strong> ${job.salary}</p>
                  <button 
                    className="apply-button" 
                    onClick={() => navigate(`/jobs/${job._id}/apply`)} // Navigate to apply page
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <h4>No jobs available for this company.</h4> // Handle case with no jobs
          )}
        </div>
      )}
    </div>
  );
};

export default CompaniesList;
