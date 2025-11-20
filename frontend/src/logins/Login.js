import { useState, useRef, useEffect } from 'react';
import '../css/Login.css';
import EmployeeImage from '../images/employee-image.jpg';
import JobSeekerImage from '../images/jobseeker.webp';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Load from '../pages/loading.js';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [accountType, setAccountType] = useState('Employer');
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const[showPassword,setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  useEffect(() => {
    document.title = "Login | HirePath";

    if (localStorage.getItem('Email') && localStorage.getItem('Password')) {
      navigate('/');
    }
  }, []);

  const handleInput = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setLogin(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = login.email.trim();
    const password = login.password;

    let valid = true;

    if (email === '') {
      setEmailError('Please enter your email');
      toast.error('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      toast.error('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPassword.test(password)) {
      setPasswordError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
      toast.error('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {

      fetch('https://jobportal-hirepath-production.up.railway.app/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const encryptedPassword = btoa(password);
            localStorage.setItem('Account-type', accountType);
            localStorage.setItem('Email', email);
            localStorage.setItem('Password', encryptedPassword);

            toast.success(`Logged in as ${accountType}`);
            setLoading(true);

            setTimeout(() => {
              accountType === 'Employer' ? navigate('/employer/home') : navigate('jobseeker/home');
            }, 3000);
          } else {
            toast.error(data.message || 'Login failed');
          }
        })
        .catch(err => {
          console.error(err);
          toast.error('Server error');
        });
    }
  };

  if (loading) {
    return <Load />;
  }

  const onEmployeeChange = () => {
    setAccountType('Employer');
  };

  const onJobChange = () => {
    setAccountType('Job Seeker');
  };

  const onSignupClick = () => {
    navigate('/signup');
  };

  const onForgotClick = () => {
    navigate('/forgot');
  };
  const onTogglePasswordClick = () => {
    setShowPassword(prevPass => ! prevPass);
  }

  return (
    <div className="login-container">
      <h2>Choose Account Type</h2>
      <div className="account-types">
        <div
          className={`account-option ${accountType === 'Employer' ? 'active' : ''}`}
          onClick={onEmployeeChange}
        >
          <img src={EmployeeImage} alt="Employer" />
          <p style={{ fontSize: "25px" }}>Employer</p>
        </div>
        <div
          className={`account-option ${accountType === 'Job Seeker' ? 'active' : ''}`}
          onClick={onJobChange}
        >
          <img src={JobSeekerImage} alt="Job Seeker" />
          <p style={{ fontSize: "25px" }}>Job Seeker</p>
        </div>
      </div>

      <p className="greeting">Hello {accountType.toLowerCase()}!<br />Please login with your credentials.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label style={{ fontSize: "20px" }}>Email</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0
              A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25
              2.25 0 0 1-1.07 1.912l-7.5 4.5a2.25 2.25 0 0 1-2.36
              0l-7.5-4.5a2.25 2.25 0 0 1-1.07-1.912V6.75" />
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            ref={emailRef}
            value={login.email}
            onChange={handleInput}
          />
        </div>
        {emailError && <p className="error">{emailError}</p>}

        <label>
          <b className="password">Password</b>
          <span className="forgot" onClick={onForgotClick}>Forgot?</span>
        </label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9
              0v3.75m-.75 11.25h10.5a2.25 2.25 0 0
              0 2.25-2.25v-6.75a2.25 2.25 0 0
              0-2.25-2.25H6.75a2.25 2.25 0 0
              0-2.25 2.25v6.75a2.25 2.25 0 0
              0 2.25 2.25Z" 
            />
          </svg>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            ref={passwordRef}
            value={login.password}
            onChange={handleInput}
          />
          <p className="toggle-password" onClick={onTogglePasswordClick} >
            {
              showPassword ? "Hide Password" : "Show Password"
            }
          </p>
        </div>
        {passwordError && <p className="error">{passwordError}</p>}

        <div className="google-login-wrapper">
          <p style={{ textAlign: 'center', fontSize:"22px;"}}>or</p>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const userInfo = jwtDecode(credentialResponse.credential);
              console.log("Google User:", userInfo);
              toast.success(`Welcome ${userInfo.name}!`);
            }}
            onError={() => {
              toast.error('Google Login Failed');
            }}
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="signup-text">
        No account? <span className="signup-link" onClick={onSignupClick}>Signup</span>
      </p>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </div>
  );
};

export default LoginForm;