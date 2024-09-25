import React, { useEffect, useState } from 'react';
import './JobCategories.css';

const JobCategories = () => {
  const [categories, setCategories] = useState([]);

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
                <button className="card-button">Explore</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default JobCategories;
