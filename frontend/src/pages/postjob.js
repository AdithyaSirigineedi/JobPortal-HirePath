import { useState, useEffect } from 'react';
import '../css/job.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddJob = () => {
  const [jobPosting, setJobPosting] = useState({
    jobTitle: '',
    companyName: '',
    jobType: '',
    Location: '',
    salary: '',
    description_: ''
  });
  useEffect(() => {
    document.title = "Job-Posting | HirePath";
  }, []);

  const onHandleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setJobPosting((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onAddJob = (e) => {
    e.preventDefault();

    const { jobTitle, companyName, Location, salary, description_, jobType } = jobPosting;

    if (!jobTitle.trim() || !companyName.trim() || !Location.trim() || !salary.trim() || !description_.trim() || !jobType.trim()) {
      toast.error('Please fill in all the fields.');
      return;
    }

    fetch('https://jobportal-hirepath.onrender.com/jobPosting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobPosting)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success('Job posted successfully!');
          setJobPosting({
            jobTitle: '',
            companyName: '',
            jobType: '',
            Location: '',
            salary: '',
            description_: ''
          });

        } else {
          toast.error(data.message || 'Sorry, failed to update');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong!');
      });
  };

  return (
    <div className="add-job-container">
      <h2>Post a New Job</h2>
      <form className="job-form" onSubmit={onAddJob}>
        <label>
          Job Title:
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter job title"
            value={jobPosting.jobTitle}
            onChange={onHandleChange}
          />
        </label>

        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            placeholder="Enter company name"
            value={jobPosting.companyName}
            onChange={onHandleChange}
          />
        </label>

        <label>
          job type:
          <input
            type="text"
            name="jobType"
            placeholder="Enter job type"
            value={jobPosting.jobType}
            onChange={onHandleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="Location"
            placeholder="Enter location"
            value={jobPosting.Location}
            onChange={onHandleChange}
          />
        </label>

        <label>
          Salary:
          <input
            type="text"
            name="salary"
            placeholder="Enter salary"
            min="1000"
            max="10000000"
            value={jobPosting.salary}
            onChange={onHandleChange}
          />
        </label>

        <label>
          Job Description:
          <textarea
            name="description_"
            placeholder="Enter job description"
            value={jobPosting.description_}
            onChange={onHandleChange}
          />
        </label>

        <button type="submit">Post Job</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </div>
  );
};

export default AddJob;
