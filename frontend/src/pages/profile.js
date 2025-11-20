import { useState, useEffect, useRef } from 'react';
import '../css/profile.css';
import defaultUserImg from '../images/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(defaultUserImg);

  const fileInputRef = useRef();

  useEffect(() => {
    document.title = "User-Profile | HirePath";
    setUsername(localStorage.getItem('Username') || '');
    setEmail(localStorage.getItem('Email') || '');
    setAccountType(localStorage.getItem('Account-type') || '');
    setPhone(localStorage.getItem('Phone') || '');
    setLocation(localStorage.getItem('Location') || '');
    setBio(localStorage.getItem('Bio') || '');

    const savedImage = localStorage.getItem('ProfileImage');
    if (savedImage) setProfileImage(savedImage);
    
  }, []);

  const handleSave = () => {
    localStorage.setItem('Username', username);
    localStorage.setItem('Phone', phone);
    localStorage.setItem('Location', location);
    localStorage.setItem('Bio', bio);
    localStorage.setItem('ProfileImage', profileImage);
    toast.success('Profile Updated Successfully...');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.onerror = () => {
      toast.error('Error while uploading the image.');
    };
    reader.readAsDataURL(file);
  };

  const onImageUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-card">
        <div className="profile-image-section">
          <img src={profileImage} alt="Profile" className="profile-avatar" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <button className="upload" onClick={onImageUploadClick}>
            Upload
          </button>
        </div>

        <div className="profile-details">
          <p>
            <strong>Username:</strong>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </p>

          <p><strong>Email:</strong> {email}</p>
          <p><strong>Account Type:</strong> {accountType}</p>

          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />

          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />

          <label>Bio:</label>
          <textarea
            rows="5"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
          />

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </div>
  );
};

export default Profile;
