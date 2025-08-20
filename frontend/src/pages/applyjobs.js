import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/applyjobs.css';

const ApplyJobs = () => {
  const navigate = useNavigate();
  const [originalJobData, setOriginalJobData] = useState([]);
  const [filteredJobData, setFilteredJobData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = "Find-Jobs | HirePath";

    fetch('http://localhost:5000/getJobs')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOriginalJobData(data.jobs);
          setFilteredJobData(data.jobs);
        } else {
          console.error("Failed to fetch jobs:", data.message);
        }
      })
      .catch(error => {
        console.error("❌ Error fetching jobs:", error);
      });
  }, []);

  const onApplyJobFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredValues = value.length > 0
      ? originalJobData.filter(job => job.jobTitle.toLowerCase().includes(value))
      : originalJobData;
    setFilteredJobData(filteredValues);
  };

  const onDetailsClick = (ID) => {
    navigate(`/details/${ID}`);
  };

  return (
    <div className="apply-jobs-container">
      <h1>Find Your Dream Job</h1>
      <div className="job-search-bar">
        <input
          type="text"
          placeholder="Search job title..."
          value={searchTerm}
          onChange={onApplyJobFilter}
        />
      </div>
      <div className="job-list">
        {
        filteredJobData.map(job => (
          <div key={job.ID} className="job-card">
            <h3>{job.jobTitle}</h3>
            <p><strong>Company:</strong> {job.companyName}</p>
            <p><strong>Location:</strong> {job.Location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Type:</strong> {job.jobType}</p>
            <p><strong>Description:</strong>{job.description_}</p>
            <button onClick={() => onDetailsClick(job.ID)}>Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplyJobs;
