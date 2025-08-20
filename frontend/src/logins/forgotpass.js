import React, { useState, useRef, useEffect } from 'react';
import EmployeeImage from '../images/employee-image.jpg';
import JobSeekerImage from '../images/jobseeker.webp';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {
  const [accountType, setAccountType] = useState('Employer');
  const confirmPassRef = useRef();
  const [newPassError, setPassError] = useState('');
  const [confirmError, setconfirmPassError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const [forgot, setForgot] = useState({
    email: '',
    newPass: '',
  });

  useEffect(() => {
    document.title = "Forgot Password | HirePath";
  }, []);

  const onHandleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setForgot((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email,newPass } = forgot;

    const confirmPass = confirmPassRef.current.value;
    let valid = true;

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      toast.error('Invalid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!strongPassword.test(newPass)) {
      setPassError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
      toast.error('Weak password.');
      valid = false;
    } else {
      setPassError('');
    }

    if (confirmPass !== newPass || confirmPass === "") {
      setconfirmPassError('Passwords do not match');
      toast.error('Passwords must match.');
      valid = false;
    } else {
      setconfirmPassError('');
    }

    if (valid) {
      fetch('http://localhost:5000/users/forgot', {
      method: "POST",
      headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: forgot.email,
    password: forgot.newPass
      }),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      toast.success('Password updated successfully!');
      confirmPassRef.current.value = '';
      setForgot({ email: '', newPass: '' });
      setTimeout(() => {
      navigate('/');
      },3000);
    } else {
      toast.error(data.message || 'Failed to update password.');
    }
  })
  .catch((err) => {
    toast.error('Server error: ' + err.message);
  });
     
    }
  };

  const onEmployeeChange = () => {
    navigate('/employee/forgotpassword');
  };
  const onJobChange = () => {
    navigate('/jobseeker/forgotpassword');
  };

  return (
    <div className="login-container">
      <h2>Choose Account Type</h2>
      <div className="account-types">
        <div
          className={`account-option ${accountType === 'Employer' ? 'active' : ''}`}
          onClick={() => setAccountType('Employer')}
        >
          <img src={EmployeeImage} alt="Employee" onClick={onEmployeeChange} />
          <p style={{ fontSize: "25px" }}>Employer</p>
        </div>
        <div
          className={`account-option ${accountType === 'Job Seeker' ? 'active' : ''}`}
          onClick={() => setAccountType('Job Seeker')}
        >
          <img src={JobSeekerImage} alt="Job Seeker" onClick={onJobChange} />
          <p style={{ fontSize: "25px" }}>Job Seeker</p>
        </div>
      </div>

      <p className="greeting">
        Hello {accountType.toLowerCase()}!<br />Please set your password correctly.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label style={{ fontSize: "20px" }}>Email</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25ZM3 7.5l9 5.25L21 7.5" />
          </svg>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={onHandleInput}
            value={forgot.email}
            name="email"
          />
        </div>
        {emailError && <p className="error">{emailError}</p>}

        <label style={{ fontSize: "20px" }}>New Password</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5
                 a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75
                 a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <input
            type="password"
            placeholder="Enter new password"
            onChange={onHandleInput}
            value={forgot.newPass}
            name="newPass"
          />
        </div>
        {newPassError && <p className="error">{newPassError}</p>}

        <label style={{ fontSize: "20px" }}>Confirm Password</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5
                 a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75
                 a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <input type="password" placeholder="Confirm new password" ref={confirmPassRef} />
        </div>
        {confirmError && <p className="error">{confirmError}</p>}

        <button type="submit" className="login-button">Confirm</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </div>
  );
};

export default Forgot;
