// ResumeUploadPage.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ResumeUploadPage.css';

const ResumeUploadPage = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { jobId } = useParams();  // Get jobId from the URL params

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setError('Please upload a resume.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('userId', '64fe28bcf4b9a03824b1f3aa'); // Replace with actual user ID

    try {
      const response = await fetch(`http://localhost:3000/api/jobs/${jobId}/apply`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Resume uploaded successfully! Your application has been submitted.');
        setTimeout(() => navigate('/'), 3000); // Redirect to home page after 3 seconds
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to submit your application.');
      }
    } catch (error) {
      console.error('Error submitting resume:', error);
      setError('An error occurred while submitting the resume. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload Your Resume</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResumeUploadPage;
    