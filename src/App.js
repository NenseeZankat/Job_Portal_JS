import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JobCategories from './components/JobCategories';
import FeaturedJobs from './components/FeaturedJobs';
import Footer from './components/Footer';
import Contact from './components/Contact';
import About from './components/About';
import JobsPage from './components/JobsPage';
import CompaniesList from './components/CompaniesList';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import { AuthContext } from "./AuthContext";
// In your `App.js` or `Routes.js`
import CategoryJobs from './components/CategoryJobs';
import ResumeUploadPage from './components/ResumeUploadPage';



import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isJobSeeker, setIsJobSeeker] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsJobSeeker(false);
  }, []);

  const setJobSeeker = useCallback(() => {
    setIsJobSeeker(true);
  },[])

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
          <Route path="/" element={<><Hero /><JobCategories /><FeaturedJobs /></>} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs/:jobId/apply" element={<ResumeUploadPage />} />
          <Route path="/jobs/category/:categoryId" element={<CategoryJobs />} />
        </Routes>
    );
  } else {
    routes = (
      <Routes>
          <Route path="/" element={<><Hero /><JobCategories /><FeaturedJobs /></>} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, isJobSeeker: isJobSeeker, login: login, logout: logout , setJobSeeker: setJobSeeker}}>
      <Router>
        <div className="app">
          <Navbar />
          <main>{routes}</main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
