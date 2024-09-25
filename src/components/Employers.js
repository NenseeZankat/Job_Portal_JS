import React from 'react';
import './styles.css';

const employers = [
  { name: 'Company A', logo: '/images/company-a-logo.png' },
  { name: 'Company B', logo: '/images/company-b-logo.png' },
  { name: 'Company C', logo: '/images/company-c-logo.png' },
  { name: 'Company D', logo: '/images/company-d-logo.png' },
];

const Employers = () => {
  return (
    <section className="employers">
      <h2>Featured Employers</h2>
      <div className="employers-logos">
        {employers.map((employer) => (
          <img key={employer.name} src={employer.logo} alt={employer.name} />
        ))}
      </div>
    </section>
  );
};

export default Employers;
