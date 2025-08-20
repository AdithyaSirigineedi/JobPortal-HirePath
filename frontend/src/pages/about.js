import React, { use, useEffect } from 'react';
import CountUp from '../pages/counter.js';
import '../css/about.css';


const About = () => {
  useEffect(() => {
    document.title = "About-Us | HirePath"; 
  },[]);
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About HirePath</h1>
        <p>
          HirePath is built with one goal in mind — helping employers find the best talent efficiently. 
          We’re a team of engineers, designers, and hiring experts who believe great teams build great products.
        </p>
      </section>

      <section className="about-stats">
        <div className="stat-box">
          <h2><CountUp to={5000} duration={2} separator="," />+</h2>
          <p>Jobs Posted</p>
        </div>
        <div className="stat-box">
          <h2><CountUp to={12000} duration={2} separator="," />+</h2>
          <p>Registered Employers</p>
        </div>
        <div className="stat-box">
          <h2><CountUp to={25000} duration={2} separator="," />+</h2>
          <p>Active Users</p>
        </div>
        <div className="stat-box">
          <h2><CountUp to={4.8} duration={2} /> / 5</h2>
          <p>Average Rating</p>
        </div>
      </section>

      <section className="about-values">
        <h2>Our Mission</h2>
        <p>
          To revolutionize hiring by creating a seamless, data-driven, and human-first recruitment experience.
        </p>
      </section>

      <section className="about-testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          <blockquote className="testimonial">
            <p>"HirePath helped us hire the best engineers quickly. Their platform is intuitive and powerful."</p>
            <footer>- Sarah Lee, CTO at TechCorp</footer>
          </blockquote>
          <blockquote className="testimonial">
            <p>"The data-driven insights gave us confidence in our hiring decisions. Highly recommend!"</p>
            <footer>- Michael Green, HR Manager at FinServe</footer>
          </blockquote>
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; 2025 HirePath. Empowering employers, one hire at a time.</p>
      </footer>
    </div>
  );
};

export default About;
