const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
var mailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs'); 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/resumes', express.static('uploads'));

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// DATABASE CONNECTION
const db = mysql.createConnection({
    host: "mysql.railway.internal",
    user: "root",
    password: process.env.DB_PASSWORD,  
    database: "railway"
});

db.connect((err) => {
    if (err) {
        console.log('error to connect to database');
        return;
    }
    console.log("database connected successfully");
});

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// ROUTES
app.get('/', (req, res) => {
    res.status(200).json({ message: "Main Route..." });
});

app.get('/getJobs', (req, res) => {
    const query = `SELECT * FROM jobPostings`;
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Internal server error" });
        res.status(200).json({ success: true, jobs: result });
    });
});

app.get('/getApplications', (req, res) => {
  const query = `SELECT * FROM jobApplications`;
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Internal server error" });
    res.status(200).json({ success: true, applications: result });
  });
});

app.post('/jobApplications', upload.single('resume'), (req, res) => {
  const { name, phone, gender, email, location, jobTitle, companyName } = req.body;
  const resume = req.file ? req.file.filename : null;

  if (!name || !phone || !gender || !resume || !email || !location || !jobTitle || !companyName) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const query = `INSERT INTO jobApplications (name, phone, gender, resume, email, location, jobTitle, companyName)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, phone, gender, resume, email, location, jobTitle, companyName], (err, result) => {
    try {
      if (err) return res.status(500).json({ success: false, message: "Something went wrong" });
      res.status(200).json({ success: true, message: "Application submitted", jobTitle, companyName });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
});

app.post('/jobPosting', async(req,res) => {
    const {jobTitle, companyName, Location, salary, description_, jobType}  = req.body;

    if(!jobTitle || !companyName || !Location || !salary || !description_ || !jobType){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const query = `INSERT INTO jobPostings(jobTitle, companyName, Location, salary, description_, jobType) VALUES ( ?, ?, ?, ?, ?, ?)`;
        db.query(query, [jobTitle, companyName, Location, salary, description_, jobType], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: "Something went wrong, please check again" });
            res.status(200).json({ success: true, message: "Signup successful", jobTitle, companyName});
        });
    }
     catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post('/users/signup', async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO Form(userName, email, password) VALUES (?, ?, ?)`;

        db.query(query, [userName, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: "Something went wrong, please check again" });

            res.status(200).json({ success: true, message: "Signup successful", userName, email });
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const query = `SELECT * FROM Form WHERE email = ?`;
        db.query(query, [email], async(err, result) => {
            if (err) return res.status(500).json({ success: false, message: "Internal server error" });

            if (result.length === 0) {
                return res.status(401).json({ success: false, message: "Invalid email or password, You don't have account Please Signup!" });
            }

            const isMatched = await bcrypt.compare(password, result[0].password);
            if (!isMatched) return res.status(401).json({ success: false, message: "Invalid email or password" });

            res.status(200).json({ success: true, message: "Login successful", user: result[0] });
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while processing login" });
    }
});

app.post('/users/forgot', async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const encrypted_password = await bcrypt.hash(password, 10);
    const query = 'UPDATE Form SET password = ? WHERE email = ?';

    db.query(query, [encrypted_password, email], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "Internal server error" });

      return res.status(200).json({ success: true, message: "Password updated successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// EMAIL ROUTES — password moved to ENV
function createTransporter() {
  return mailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
          user: "adithya.collector@gmail.com",
          pass: process.env.EMAIL_PASS  
      }
  });
}

app.post('/users/email', (req, res) => {
    const { name, email, jobTitle } = req.body;
    const transporter = createTransporter();

    const options = {
        from: "adithya.collector@gmail.com",
        to: email,
        subject: "Regarding Job Opportunity",
        text: `Dear ${name},

Thank you for submitting your job application for ${jobTitle}. 

We appreciate your interest.`
    };

    transporter.sendMail(options, (error, info) => {
        if (error) return res.status(500).json({ success: false, message: 'Failed to send email' });
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
});

app.post('/acceptEmail',(req,res) => {
    const{name,email,jobTitle} = req.body;
    const transporter = createTransporter();

    const options1 = {
        from: "adithya.collector@gmail.com",
        to: email,
        subject: "Regarding Job Opportunity",
        text: `Dear ${name},

Your application for ${jobTitle} has been accepted.`
    };

    transporter.sendMail(options1, (error, info) => {
        if (error) return res.status(500).json({ success: false, message: 'Failed to send email' });
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
});

app.post('/declineEmail',(req,res) => {
    const{name,email,jobTitle} = req.body;
    const transporter = createTransporter();

    const options2 = {
        from: "adithya.collector@gmail.com",
        to: email,
        subject: "Regarding Job Opportunity",
        text: `Dear ${name},

Your application for ${jobTitle} was not selected.`
    };

    transporter.sendMail(options2, (error, info) => {
        if (error) return res.status(500).json({ success: false, message: 'Failed to send email' });
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
});

app.delete('/deleteApplication/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM jobApplications WHERE id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Internal server error" });
        res.status(200).json({ success: true, message: "Application deleted successfully" });
    });
});

// SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server running at port ${PORT}`);
});
