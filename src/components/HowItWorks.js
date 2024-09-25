import React from 'react';
import './styles.css';

const steps = [
  { number: '1', description: 'Create an account and set up your profile' },
  { number: '2', description: 'Search for jobs that fit your skills' },
  { number: '3', description: 'Apply and track your applications easily' },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        {steps.map((step) => (
          <div key={step.number} className="step">
            <span>{step.number}</span>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
