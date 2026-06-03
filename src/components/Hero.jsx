import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Amazing Deals on Premium Products</h1>
          <p>Discover the best products at unbeatable prices. Shop now and enjoy up to 50% off on selected items!</p>
          <button className="hero-button">Shop Now</button>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/600x400/2d7a2d/ffffff?text=Shopping+Deals" alt="Shopping Deals" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
