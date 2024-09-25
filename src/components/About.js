import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Connecting talent with opportunity.</p>
        </div>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At Job Portal, our mission is to empower individuals and organizations by connecting the right talent with the right opportunity. We believe in creating an inclusive and diverse job market that enables everyone to thrive.
        </p>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-container">
          <div className="value-card">
            <h3>Integrity</h3>
            <p>We uphold the highest standards of honesty and transparency in everything we do.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We embrace new ideas and technology to enhance the job search experience.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>We are committed to building a supportive and inclusive community for job seekers and employers alike.</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-container">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" />
            <h3>Emily Johnson</h3>
            <p>Head of Marketing</p>
          </div>
        </div>
      </section>

      <section className="history-section">
        <h2>Our History</h2>
        <p>
          Founded in 2020, Job Portal started as a small platform with a big vision—to revolutionize the way job seekers and employers connect. Over the years, we’ve grown into a trusted resource for thousands of companies and millions of job seekers around the world.
        </p>
      </section>
    </div>
  );
};

export default About;
