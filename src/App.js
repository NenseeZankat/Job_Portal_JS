import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JobCategories from './components/JobCategories';
import FeaturedJobs from './components/FeaturedJobs';
import Footer from './components/Footer';
import Contact from './components/Contact';
import About from './components/About';
import JobsPage from './components/JobsPage';  // Import Jobs Page
import CompaniesList from './components/CompaniesList'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><JobCategories /><FeaturedJobs /></>} />
          <Route path="/jobs" element={<JobsPage />} />  {/* Jobs Page Route */}
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
