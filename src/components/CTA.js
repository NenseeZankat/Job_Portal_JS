import React from 'react';
import './styles.css';

const CTA = () => {
  return (
    <section className="cta">
      <h2>Ready to Get Started?</h2>
      <p>Create an account and start applying for jobs or post your open positions today.</p>
      <div className="cta-buttons">
        <button className="cta-job-seekers">I'm a Job Seeker</button>
        <button className="cta-employers">I'm an Employer</button>
      </div>
    </section>
  );
};

export default CTA;
