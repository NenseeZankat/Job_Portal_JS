import React, { useState, useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Optional: Add styling for the login page
import { AuthContext } from '../AuthContext';

const LoginPage = () => {

    const auth = useContext(AuthContext);
    // const [isLoginMode, setIsLoginMode] = useState(true);


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

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
            const response = await fetch('http://localhost:3000/api/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                auth.login();
                const data = await response.json();
                if(data.userType === "job_seeker" )
                    auth.setJobSeeker();
                setSuccessMessage('Login successful!');

                setTimeout(() => {
                    navigate('/'); // Redirect to home page
                }, 2000);
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;   
