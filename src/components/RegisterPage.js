import React, { useState, useContext }  from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './RegisterPage.css'; // Optional: Add some styling
import { AuthContext } from '../AuthContext';

const RegisterPage = () => {

  const auth = useContext(AuthContext);
  // const [isLoginMode, setIsLoginMode] = useState(true);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'job_seeker',
    contact: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    experience: '',
    skills: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        auth.login();
        // const data = await response.json();
        if(formData.userType === "job_seeker")
          auth.setJobSeeker();

        setSuccessMessage('User registered successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          userType: 'job_seeker',
          contact: '',
          city: '',
          pincode: '',
          state: '',
          country: '',
          experience: '',
          skills: '',
        });
        
        // Redirect to the home page after a successful registration
        setTimeout(() => {
          navigate('/'); // Redirect to the home page
        }, 2000); // 2-second delay for success message to be shown

      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while registering. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            required
          >
            <option value="job_seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        <h3>Profile Information</h3>
        <div className="form-group">
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Pincode:</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Experience (in years):</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Skills (comma separated):</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
