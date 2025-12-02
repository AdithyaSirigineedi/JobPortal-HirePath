import { useParams } from 'react-router-dom';
import '../css/apply.css';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const JobDetails = () => {
  const { id } = useParams();
  const [timer, setTimer] = useState(3 * 60);
  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');
  const nameRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();
  const resumeRef = useRef();
  const emailRef = useRef();
  const locationRef = useRef();
  const buttonRef = useRef();

  const [Error1, setError1] = useState();
  const [Error2, setError2] = useState();
  const [Error3, setError3] = useState();
  const [Error4, setError4] = useState();
  const [Error5, setError5] = useState();
  const [Error6, setError6] = useState();

  const [email, setEmail] = useState({
    name: '',
    email: '',
  });
  const navigate = useNavigate();

  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    fetch('https://jobportal-hirepath.onrender.com/getJobs')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setJobData(data.jobs);
        } else {
          toast.error(data.message);
        }
      })
      .catch(error => {
        toast.error(error.name);
      });
  }, []);

  const job = jobData.find(job => String(job.ID) === String(id));

  useEffect(() => {
    document.title = "Apply-Job | HirePath";
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  if (!job) {
    return <h2 style={{ textAlign: 'center' }}>Job not found.</h2>;
  }

  const onHandleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setEmail(prev => ({
      ...prev,
      [name]: value 
    }));
  };

  const onSubmitClick = (event) => {
    event.preventDefault();
    const nameVal = nameRef.current.value.trim();
    const phoneVal = phoneRef.current.value.trim();
    const genderVal = genderRef.current.value;
    const resumeVal = resumeRef.current.files[0];
    const emailVal = emailRef.current.value.trim();
    const locationVal = locationRef.current.value.trim();
    let isValid = true;

    if (nameVal === "") {
      setError1("Please Enter Your Name");
      toast.error('Name is required');
      isValid = false;
    } else {
      setError1('');
    }

    if (phoneVal === "") {
      setError2("Please Enter Your Phone Number");
      toast.error('Phone number is required');
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(phoneVal)) {
      setError2("Phone number must be 10 digits");
      toast.error('Invalid Phone Number');
      isValid = false;
    } else {
      setError2('');
    }

    if (genderVal === "") {
      setError3("Please Select Your Gender");
      toast.error('Gender is required');
      isValid = false;
    } else {
      setError3('');
    }

    if (!resumeVal) {
      setError4("Please Upload Your Resume");
      toast.error('Resume is required');
      isValid = false;
    } else {
      setError4('');
    }

    if (emailVal === '' || !emailVal.includes('@')) {
      setError5("Please include '@' Symbol");
      toast.error('Email id is required');
      isValid = false;
    } else {
      setError5('');
    }

    if (locationVal === "") {
      setError6("Please Enter Your Current Location");
      toast.error('Location is required');
      isValid = false;
    } else {
      setError6('');
    }

    const { jobTitle } = job;
    if (isValid) {
      fetch('https://jobportal-hirepath.onrender.com/users/email', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: email.name,
          email: email.email,
          jobTitle: jobTitle
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem("name", nameVal);
            localStorage.setItem("phone", phoneVal);
            localStorage.setItem("gender", genderVal);
            localStorage.setItem("resume", resumeVal);
            localStorage.setItem("email", emailVal);
            localStorage.setItem("location", locationVal);
            localStorage.setItem("hasApplied", isValid); 
            toast.success(`Hey, ${nameVal}, Application submitted successfully 🎉`);
           setTimeout(() => {
            toast.success(`Hello, ${nameVal} you have won a scratch card please checkout in scratchcards page`);
           },2000);
            nameRef.current.value = "";
            phoneRef.current.value = "";
            genderRef.current.value = "";
            resumeRef.current.value = "";
            emailRef.current.value = "";
            locationRef.current.value = "";
          } else {
            toast.error(data.message || 'Application failed');
          }
        })
        .catch(err => {
          console.error(err);
          toast.error("Something went wrong while submitting the application.");
        });

      const formData = new FormData();
      formData.append('name', nameVal);
      formData.append('phone', phoneVal);
      formData.append('gender', genderVal);
      formData.append('resume', resumeRef.current.files[0]);
      formData.append('email', emailVal);
      formData.append('location', locationVal);
      formData.append('jobTitle', job.jobTitle);
      formData.append('companyName', job.companyName);

      fetch('https://jobportal-hirepath.onrender.com/jobApplications', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            toast.success("Application data saved to database!");
            // navigate('/scratch-card');
          } else {
            toast.error(data.message || "Failed to save application data.");
          }
        })
        .catch(err => {
          console.error(err);
          toast.error("Error submitting job application.");
        });
    }
  };

  return (
    <div className="job-details-container">
      <h2>Apply for: {job.jobTitle}</h2>
      <p><strong>Company:</strong> {job.companyName}</p>
      <p><strong>Location:</strong> {job.Location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description:</strong> {job.description_}</p>
      <div className="timer-container">
        <strong>Time Left:</strong> {minutes}:{seconds}
      </div>
      <form className="application-form" onSubmit={onSubmitClick}>
        <label>
          Full Name:
          <input type="text" name="name" ref={nameRef} value={email.name} onChange={onHandleInput} />
          {Error1 && <p className="error1">{Error1}</p>}
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phone" ref={phoneRef} />
          {Error2 && <p className="error2">{Error2}</p>}
        </label>
        <label>
          Gender:
          <select name="gender" ref={genderRef}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {Error3 && <p className="error3">{Error3}</p>}
        </label>
        <label>
          Resume:
          <input type="file" name="resume" accept=".pdf,.doc,.docx" ref={resumeRef} />
          {Error4 && <p className="error4">{Error4}</p>}
        </label>
        <label>
          Email:
          <input type="email" name="email" ref={emailRef} onChange={onHandleInput} value={email.email} />
          {Error5 && <p className="error5">{Error5}</p>}
        </label>
        <label>
          Current Location:
          <input type="text" name="location" ref={locationRef} />
          {Error6 && <p className="error6">{Error6}</p>}
        </label>

        <button type="submit" ref={buttonRef} disabled={timer <= 0}>
          {timer <= 0 ? "Time Expired" : "Submit Application"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </div>
  );
};

export default JobDetails;
