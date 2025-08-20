import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import './home.css';
import '../css/home.css';
import { Link } from 'react-router-dom';
import womanLottie from '../images/women.lottie';
import manLottie from '../images/men.lottie';
import { useNavigate} from 'react-router-dom';
import ProfileLogo from '../images/profile.lottie';
import ResumeLogo from '../images/resume.svg';
import clockLogo from '../images/clock.svg';
import notifyLogo from '../images/notify.svg';
import DemoLogo from '../images/A.lottie';
import Load from '../pages/loading.js';
import instagramLogo from '../images/instagram.png';
import linkedinLogo from '../images/linkedin.png';
import whatsappLogo from '../images/whatsapp.png';
import facebookLogo from '../images/facebook.png';
import hirePathLogo from '../images/hirepath.jpg';


const EmployerHome = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem('Account-type');
    localStorage.removeItem('Email');
    localStorage.removeItem('Password');
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setTimeout(() => {
      navigate('/profile');
    }, 3000);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  useEffect(() => {
    document.title = "Employer-Home | HirePath";

    toggleDarkMode();
  }, [])

  if (loading) {
    return <Load />;
  }

  const account = localStorage.getItem('Account-type');
  const email = localStorage.getItem('Email');
  const username = localStorage.getItem('Username');
  
  const onInstagramClick = () => {
    window.location.href = 'https://instagram.com';
  };
  const onLinkedInClick = () => {
    window.location.href = 'https://linkedin.com';
  };
  const onWhatsappClick = () => {
    window.location.href = 'https://whatsapp.com';
  };
  const onFacebookClick = () => {
    window.location.href = 'https://facebook.com';
  };

  return (
    <>
      <header className="navbar">
        <div className="logo-container">
          <img src={hirePathLogo} alt="HirePath Logo" className="logo-img" />
          </div>
        <div className="logo">HirePath</div>
        <ul className="nav-links">
          <Link to="/employer/home">
            <li>Home</li>
          </Link>
          <Link to="/add-job">
            <li>Post jobs</li>
          </Link>
          <Link to="/find-talent">Find Talent</Link>

          <input type="text" list="job-categories" placeholder="Roles" />
          <datalist id="job-categories">
            <option value="Customer Services" />
            <option value="Design" />
            <option value="Development" />
            <option value="Project Management" />
          </datalist>
          <Link to="/about">
            <li>About</li>
          </Link>
          <li className="logout-btn" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
          </li>
          <div className="profile-dropdown">
            <DotLottieReact
              src={ProfileLogo} className="profilelogo" onClick={toggleDropdown}
              loop
              autoplay
            />
            {/* <img src={ProfileLogo} alt="Profile" className="profilelogo" onClick={toggleDropdown} /> */}
            {showDropdown && (
              <div className="dropdown-menu">
                <p><strong>{`${username || 'Username'} (${account || 'Account type not found'})`}</strong></p>
                <p>{email || 'Email not found'}</p>
              </div>
            )}
          </div>
          <li className="dark-mode-btn" onClick={toggleDarkMode}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </li>
        </ul>
      </header>
      <section className="hero-section">
        <div className="left-img lottie-wrapper">
          <DotLottieReact src={womanLottie} loop autoplay />
        </div>

        <div className="hero-content">
          <p className="tagline">Build your dream team</p>
          <h1>Find Skilled<br />Talent on HirePath.</h1>
          <p className="subtitle">Post jobs, connect with professionals, and hire the right candidates quickly.</p>

          <div className="search-bar">
            <input type="text" placeholder="Search Skills, Roles..." />
            <button onClick={() => {navigate('/find-talent')}}>Find Talent</button>
          </div>

          <div className="categories">
            Popular Roles:
            <span>UI/UX Designers</span>
            <span>Project Managers</span>
            <span>Full Stack Developers</span>
          </div>
        </div>
        <button id="scroll-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </button>

        <div className="right-img lottie-wrapper">
          <DotLottieReact src={manLottie} loop autoplay />
        </div>
      </section>

      <br /><br />
      <div className="job-container">
        <h1>The Only Employer-Focused<br />Hiring Platform</h1>
      </div>
      <br /><br />
      <div className="text">
        <div className="job-cont">
          <img src={ResumeLogo} className="resume-logo" alt="image not found" />
          <p className="p">Access curated resumes</p>
        </div>
        <div className="job-cont">
          <img src={clockLogo} className="clock-logo" alt="image not found" />
          <p className="p">Hire in record time</p>
        </div>
        <div className="job-cont">
          <img src={notifyLogo} className="notify-logo" alt="image not found" />
          <p className="p">Stay updated on applications</p>
        </div>
      </div>
      <br /><br /><br /><br />
      <section className="faq-section">
        <div className="faq-left">
          <p className="faq-subheading">F.A.Q</p>
          <h2 className="faq-heading">For Hiring Managers & Recruiters</h2>
          <div className="faq-item">
            <details>
              <summary>How do I post a job opening?</summary>
              <br />
              <p>Sign in and go to your dashboard, then click “Post Job.”</p>
            </details>
            <details>
              <summary>How long does it take to get applicants?</summary>
              <br />
              <p>You'll start seeing applicants within hours, typically within a day.</p>
            </details>
            <details>
              <summary>Can I search for candidates manually?</summary>
              <br />
              <p>Yes, use our Talent Search tool for proactive hiring.</p>
            </details>
            <details>
              <summary>What are featured job postings?</summary>
              <br />
              <p>They receive higher visibility and more applications. Pricing starts at $49.</p>
            </details>
            <details>
              <summary>Is there a free plan available?</summary>
              <br />
              <p>Yes, we offer a limited free plan to help you get started.</p>
            </details>
          </div>
        </div>
        <div className="faq-right">
          <DotLottieReact src={DemoLogo} loop autoplay className="Logo" />
        </div>
      </section>

      <br /><br /><br /><br />
      <div className="btn-container">
        <h3>Ready to Hire Top Talent?</h3>
        <b>Let us help you find the perfect match for your team.</b>
        <br /><br />
        <button type="button" className="demo-btn" onClick={() => navigate('/find-talent')}>Start Hiring</button>
      </div>

      <br /><br /><br /><br /><br />
      <hr />

      <footer>
        <div className="footer-container">
          <div className="address-section">
            <h1>HirePath</h1>

            <div className="email">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" />
              <p>HirePath@gmail.com</p>
            </div>
            <div className="phone">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" />
              <p>123456-789</p>
            </div>
            <div className="location">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" />
              <p>Near Hi-tech city, Hyderabad</p>
            </div>
          </div>
          <div className="social-section">
            <img src={instagramLogo} alt="Instagram" onClick={onInstagramClick} className='soc' />
            <img src={linkedinLogo} alt="linkedin" onClick={onLinkedInClick} className="soc" />
            <img src={whatsappLogo} alt="whatsapp" onClick={onWhatsappClick} className='soc' />
            <img src={facebookLogo} alt="facebook" onClick={onFacebookClick} className='soc' />
          </div>
        </div>
        <br />
        <p className="copyrights">&copy; 2025 HirePath. All rights reserved.</p>
      </footer>
    </>
  );
};

export default EmployerHome;
