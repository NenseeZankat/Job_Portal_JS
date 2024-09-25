import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find Your Dream Job Now</h1>
        <p>Connecting talented individuals with top employers</p>
        <div className="hero-btns">
          <button className="btn primary-btn">Browse Jobs</button>
          <button className="btn secondary-btn">Upload CV</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
