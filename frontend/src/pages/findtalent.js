import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/findtalent.css';

const FindTalent = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        document.title = "Find-Talent | HirePath";
        fetch('http://localhost:5000/getApplications')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setApplications(data.applications);
                } else {
                    toast.error(data.message || 'Failed to fetch applications');
                }
            })
            .catch(err => {
                console.error(err);
                toast.error('Error fetching applications');
            });
    }, []);

    const handleAccept = (applicant) => {
        const { id, name, email, jobTitle } = applicant;

        toast.success(`Application ${id} accepted`);

        fetch('http://localhost:5000/acceptEmail', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, jobTitle })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setApplications(prev =>
                        prev.filter(app => app.id !== id)
                    );
                } else {
                    toast.error('Failed to send acceptance email');
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Error while sending email');
            });
        fetch(`http://localhost:5000/deleteApplication/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log("Application Deleted Successfully");
                } else {
                    toast.error(data.message || "Failed to delete application");
                }
            })
            .catch(error => {
                toast.error('Error while Deleting the Application' || error.message);
            });
    };

    const handleDecline = (applicant) => {
        const { id, name, email, jobTitle } = applicant;
        toast.info(`Application ${id} Rejected`);

        fetch('http://localhost:5000/declineEmail', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, jobTitle })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setApplications(prev =>
                    prev.filter(app => app.id !== id)
                    );
                } else {
                    toast.error('Failed to send rejected email');
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Error while sending email');
            });
        fetch(`http://localhost:5000/deleteApplication/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log("Application Deleted Successfully");
                } else {
                    toast.error(data.message || "Failed to delete application");
                }
            })
            .catch(error => {
                toast.error('Error while Deleting the Application' || error.message);
            });
    };

    return (
        <div className="talent-container">
            <ToastContainer />
            <h2 className="title">Applicant List</h2>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                applications.map((applicant) => (
                    <div key={applicant.id} className="applicant-card">
                        <p><strong>Name:</strong> {applicant.name}</p>
                        <p><strong>Email:</strong> {applicant.email}</p>
                        <p><strong>Phone:</strong> {applicant.phone}</p>
                        <p><strong>Gender:</strong> {applicant.gender}</p>
                        <p><strong>Location:</strong> {applicant.location}</p>
                        <p>
                            <strong>Resume:</strong>{' '}
                            <a
                                href={`http://localhost:5000/resumes/${applicant.resume}`}
                                target="_blank"
                                rel="noreferrer"
                                className="resume-link"
                            >
                                View
                            </a>
                        </p>
                        <div className="button-group">
                            <button className="accept-button" onClick={() => handleAccept(applicant)}>Accept</button>
                            <button className="decline-button" onClick={() => handleDecline(applicant)}>Decline</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
export default FindTalent;
