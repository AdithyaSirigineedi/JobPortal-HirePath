import React, { useEffect, useState, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../css/home.css';
import womanLottie from '../images/uiux designer.lottie';
import manLottie from '../images/Programming.lottie';
import { useNavigate, NavLink } from 'react-router-dom';
import ProfileLogo from '../images/profile.lottie';
import ResumeLogo from '../images/resume.svg';
import clockLogo from '../images/clock.svg';
import notifyLogo from '../images/notify.svg';
import DemoLogo from '../images/Software Development.lottie';
import Load from '../pages/loading.js';
import instagramLogo from '../images/instagram.png';
import linkedinLogo from '../images/linkedin.png';
import whatsappLogo from '../images/whatsapp.png';
import facebookLogo from '../images/facebook.png';
import { Link } from 'react-router-dom';
import HirepathLogo from '../images/hirepath.jpg'; 


const Home = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  

  const handleLogout = () => {
    localStorage.removeItem('Account-type');
    localStorage.removeItem('Email');
    localStorage.removeItem('Password');
    localStorage.removeItem('hirepathScratchRevealed'); 
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
    document.title = "Jobseeker-Home | HirePath";
    toggleDarkMode();
  }, [])

  if (loading) {
    return <Load />
  }

  const account = localStorage.getItem('Account-type');
  const email = localStorage.getItem('Email');
  const username = localStorage.getItem('Username');


  const onInstagramClick = () => {
    window.location.href = "https://instagram.com";
  }
  const onLinkedInClick = () => {
    window.location.href = "https://linkedin.com";
  }
  const onWhatsappClick = () => {
    window.location.href = "https://whatsapp.com";
  }
  const onFacebookClick = () => {
    window.location.href = "https://facebook.com";
  }
  const onApplyJobClick = () => {
    navigate('/applyjobs');
  }

  const onScrollClick = () => {
  }
  
  const onScratchCardClick = () => {
    navigate('/scratch-card');
  }

  return (
    <>
      <header className="navbar">
        <div className="logo-container">
          <img src={HirepathLogo} alt="HirePath Logo" className="logo-img" />
        </div>
        <div className="logo">HirePath</div>
        <ul className="nav-links">
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/applyjobs" onClick={onApplyJobClick}>Apply Jobs
          {/* <li onClick={onApplyJobClick}>Apply Jobs</li> */}
          </Link> 
          <Link to="/application-status" >Application status</Link>
          <Link to="/scratch-card" onClick={onScratchCardClick}>Scratch Cards</Link>
          {/* <input type="text" list="job-categories" placeholder="Categories" />
          <datalist id="job-categories">
            <option value="Customer Services" />
            <option value="Design" />
            <option value="Development" />
            <option value="Project Management" />
          </datalist> */}
          <Link to="/about">About
            {/* <li>About</li> */}
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
            {/* <img
              src={ProfileLogo}
              alt="Profile"
              className="profilelogo"
              onClick={toggleDropdown}
            /> */}
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
          <p className="tagline">We are your future</p>
          <h1>Get Your Desired<br />Job With HirePath.</h1>
          <p className="subtitle">Get jobs, create trackable resumes and enrich your applications</p>

          <div className="search-bar">
            <input type="text" placeholder="Job Title, Keywords..." />
            <button onClick={() => navigate('/applyjobs')}>Search Job</button>
          </div>

          <div className="categories">
            Popular Categories:
            <span>Design</span>
            <span>Project Management</span>
            <span>Development</span>
          </div>
        </div>
        <button id="scroll-btn" onClick={onScrollClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg> 
        </button>
        <div className="right-img lottie-wrapper">
          <DotLottieReact src={manLottie} loop autoplay />
        </div>
      </section>
      <br /><br />
      <div className="job-container">
        <h1>The Only Job Seeker
          <br />Centric Platform</h1>
      </div>
      <br /><br />
      <div className="text">
        <div className="job-cont">
          <img src={ResumeLogo} className="resume-logo" alt="image not found" />
          <p className="p">Create your resume</p>
        </div>
        <div className="job-cont">
          <img src={clockLogo} className="clock-logo" alt="image not found" />
          <p className="p">Get matched in minutes</p>
        </div>
        <div className="job-cont">
          <img src={notifyLogo} className="notify-logo" alt="image not found" />
          <p className="p">Never miss an opportunity</p>
        </div>
      </div>
      <br /><br /><br /><br />
      <section className="faq-section">
        <div className="faq-left">
          <p className="faq-subheading">F.A.Q</p>
          <h2 className="faq-heading">What People Need To Know</h2>
          <div className="faq-item">
            <details>
              <summary>Why won't my payment go through?</summary>
              <br />
              <p>Please check your card details and ensure you have sufficient funds.</p>
            </details>
            <details>
              <summary>How long does it take to get a free job opening approved?</summary>
              <br />
              <p>Approvals usually take 24–48 hours.</p>
            </details>
            <details>
              <summary>Are there bulk discounts for featured job openings?</summary>
              <br />
              <p>Yes! Contact our sales team for custom packages.</p>
            </details>
            <details>
              <summary>What's the cost to post a featured job opening on Jobly?</summary>
              <br />
              <p>It starts at $49 per post with volume discounts available.</p>
            </details>
            <details>
              <summary>How do I redeem a coupon?</summary>
              <br />
              <p>You can enter your coupon code during checkout in the “Promo Code” field.</p>
            </details>
          </div>
        </div>
        <div className="faq-right">
          <DotLottieReact
            src={DemoLogo}
            loop
            autoplay className="Logo"
          />
        </div>
      </section>
      <br /><br /><br /><br />
      <div className="btn-container">
        <h3>Want to Become a Success Employers?</h3>
        <b>We'll help you to grow your career and growth.</b>
        <br /><br />
        <button type="button" className="demo-btn" onClick={() => navigate('/signup')}>Sign Up Today</button>
      </div>
      <br /><br /><br /><br /><br />
      <hr />

      <footer>
        <div className="footer-container">
          <div className="address-section">
            <h1>HirePath</h1>

            <div className="email">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
              </svg>
              <p>HirePath@gmail.com</p>
            </div>

            <div className="phone">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <p>123456-789</p>
            </div>

            <div className="location">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
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

export default Home;
