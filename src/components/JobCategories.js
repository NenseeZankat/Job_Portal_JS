import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './JobCategories.css';

const JobCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/category'); // Adjust the path based on your setup
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle explore button click
  const handleExploreClick = (categoryId) => {
    // Navigate to a new page with the category ID
    navigate(`/jobs/category/${categoryId}`);
  };

  return (
    <div className="categories">
      <h2>Explore Job Categories</h2>
      <div className="category-container">
        {categories.map((category) => (
          <div key={category._id} className="category-card">
            <div className="card-inner">
              <div className="card-front">
                <div className="category-icon">💼</div> {/* Placeholder icon */}
                <div className="card-title">{category.name}</div>
              </div>
              <div className="card-back">
                <div className="card-description">{category.description}</div>
                <button className="card-button" onClick={() => handleExploreClick(category._id)}>
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
