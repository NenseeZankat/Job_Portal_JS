import React, { useEffect, useState } from 'react';
import './CompaniesList.css';  // Optional CSS file for styling

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch companies from the backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/company'); // Adjust the URL if necessary
        const data = await response.json();
        setCompanies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <p>Loading companies...</p>;
  }

  return (
    <div className="companies-list">
      <h2>All Companies</h2>
      <div className="company-grid">
        {companies.map((company) => (
          <div key={company._id} className="company-card">
            <h3>{company.name}</h3>
            <p><strong>Industry:</strong> {company.industry || 'Not specified'}</p>
            <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website || 'N/A'}</a></p>
            <div className="company-address">
              {company.address.map((addr, index) => (
                <p key={index}>
                  {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesList;
