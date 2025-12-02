import { useState, useRef, useEffect } from 'react';
// import './signup.css';
import '../css/signup.css';
import EmployeeImage from '../images/employee-image.jpg';
import JobSeekerImage from '../images/jobseeker.webp';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const [accountType, setAccountType] = useState('Employer');
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    userName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    document.title = "Signup | HirePath";
  },[])

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const onHandleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setSignup((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userName = signup.userName.trim();
    const email = signup.email.trim();
    const password = signup.password;

    let valid = true;

    if (userName === '') {
      setUserNameError('Please enter your username');
      toast.error("Please enter a valid username");
      valid = false;
    } else {
      setUserNameError('');
    }

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
      fetch('https://jobportal-hirepath.onrender.com/users/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signup)
      })
        .then(res => res.json())
        .then(data => {
          console.log("Server response:", data);
          if (data.success) {
            toast.success("Signup successful!");
            setTimeout(() => navigate('/'), 2000);
          } else {
            toast.error(data.message || "Signup failed.");
          }
        })
        .catch(err => {
          console.error("Error:", err);
          toast.error("Server error");
        });
    }
  };

  
  return (
    <div className="login-container">
      <h2>Choose Account Type</h2>
      <div className="account-types">
        <div
          className={`account-option ${accountType === 'Employer' ? 'active' : ''}`}
          onClick={() => setAccountType('Employer')}
        >
          <img src={EmployeeImage} alt="Employer" />
          <p style={{ fontSize: "25px" }}>Employer</p>
        </div>
        <div
          className={`account-option ${accountType === 'Job Seeker' ? 'active' : ''}`}
          onClick={() => setAccountType('Job Seeker')}
        >
          <img src={JobSeekerImage} alt="Job Seeker" />
          <p style={{ fontSize: "25px" }}>Job Seeker</p>
        </div>
      </div>

      <p className="greeting">
        Hello {accountType.toLowerCase()}!<br />
        Please fill out the form below to get started.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label style={{ fontSize: "20px" }}>Username</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <input
            name="userName"
            placeholder="Enter your username"
            ref={userRef}
            onChange={onHandleChange}
            value={signup.userName}
          />
        </div>
        {userNameError && <p className="error">{userNameError}</p>}

        <label style={{ fontSize: "20px" }}>Email</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.912l-7.5 4.5a2.25 2.25 0 0 1-2.36 0l-7.5-4.5a2.25 2.25 0 0 1-1.07-1.912V6.75" />
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            ref={emailRef}
            onChange={onHandleChange}
            value={signup.email}
          />
        </div>
        {emailError && <p className="error">{emailError}</p>}

        <label style={{ fontSize: "20px" }}>New Password</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            ref={passwordRef}
            onChange={onHandleChange}
            value={signup.password}
          />
        </div>
        {passwordError && <p className="error">{passwordError}</p>}

        <button type="submit" className="login-button">Signup</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </div>
  );
};

export default SignupForm;
