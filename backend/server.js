require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const mailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/resumes", express.static("uploads"));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("❌ Error connecting to DB:", err);
    return;
  }
  console.log("✅ Database connected successfully");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Main Route..." });
});

app.get("/getJobs", (req, res) => {
  const q = `SELECT * FROM jobPostings`;
  db.query(q, (err, result) => {
    if (err)
      return res.status(500).json({ success: false, message: "Internal server error" });
    res.status(200).json({ success: true, jobs: result });
  });
});

// GET APPLICATIONS
app.get("/getApplications", (req, res) => {
  const q = `SELECT * FROM jobApplications`;
  db.query(q, (err, result) => {
    if (err)
      return res.status(500).json({ success: false, message: "Internal server error" });
    res.status(200).json({ success: true, applications: result });
  });
});

app.post("/jobApplications", upload.single("resume"), (req, res) => {
  const { name, phone, gender, email, location, jobTitle, companyName } = req.body;
  const resume = req.file ? req.file.filename : null;

  if (!name || !phone || !gender || !resume || !email || !location || !jobTitle || !companyName) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const q = `INSERT INTO jobApplications (name, phone, gender, resume, email, location, jobTitle, companyName)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    q,
    [name, phone, gender, resume, email, location, jobTitle, companyName],
    (err) => {
      if (err)
        return res.status(500).json({ success: false, message: "Something went wrong" });

      res.status(200).json({
        success: true,
        message: "Application submitted",
        jobTitle,
        companyName,
      });
    }
  );
});

app.post("/jobPosting", (req, res) => {
  const { jobTitle, companyName, Location, salary, description_, jobType } = req.body;

  if (!jobTitle || !companyName || !Location || !salary || !description_ || !jobType) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const q = `INSERT INTO jobPostings(jobTitle, companyName, Location, salary, description_, jobType)
             VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    q,
    [jobTitle, companyName, Location, salary, description_, jobType],
    (err) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: "Something went wrong, please check again",
        });

      res.status(200).json({
        success: true,
        message: "Job posted successfully",
        jobTitle,
        companyName,
      });
    }
  );
});

app.post("/users/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const q = `INSERT INTO Form(userName, email, password) VALUES (?, ?, ?)`;

    db.query(q, [userName, email, hashedPassword], (err) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: "Something went wrong, please check again",
        });

      res.status(200).json({
        success: true,
        message: "Signup successful",
        userName,
        email,
      });
    });
  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password are required" });

  try {
    const q = `SELECT * FROM Form WHERE email = ?`;

    db.query(q, [email], async (err, result) => {
      if (err)
        return res.status(500).json({ success: false, message: "Internal server error" });

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password, Please Signup!",
        });
      }

      const isMatched = await bcrypt.compare(password, result[0].password);
      if (!isMatched)
        return res.status(401).json({ success: false, message: "Invalid email or password" });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: result[0],
      });
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error while processing login" });
  }
});

// FORGOT PASSWORD
app.post("/users/forgot", async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password are required" });

  try {
    const encrypted_password = await bcrypt.hash(password, 10);
    const q = `UPDATE Form SET password = ? WHERE email = ?`;

    db.query(q, [encrypted_password, email], (err) => {
      if (err)
        return res.status(500).json({ success: false, message: "Internal server error" });

      res.status(200).json({ success: true, message: "Password updated successfully!" });
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// EMAIL CONFIG (uses ENV password)
function createTransporter() {
  return mailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // now using .env
      pass: process.env.EMAIL_PASS, // secure
    },
  });
}

// SEND APPLICATION EMAIL
app.post("/users/email", (req, res) => {
  const { name, email, jobTitle } = req.body;
  const transporter = createTransporter();

  const mail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Regarding Job Opportunity",
    text: `Dear ${name},

Thank you for applying for ${jobTitle}. We appreciate your interest.`,
  };

  transporter.sendMail(mail, (error) => {
    if (error)
      return res.status(500).json({ success: false, message: "Failed to send email" });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  });
});

app.post("/acceptEmail", (req, res) => {
  const { name, email, jobTitle } = req.body;
  const transporter = createTransporter();

  const mail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Job Application Update",
    text: `Dear ${name},

Your application for ${jobTitle} has been accepted.`,
  };

  transporter.sendMail(mail, (error) => {
    if (error)
      return res.status(500).json({ success: false, message: "Failed to send email" });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  });
});

// DECLINE EMAIL
app.post("/declineEmail", (req, res) => {
  const { name, email, jobTitle } = req.body;
  const transporter = createTransporter();

  const mail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Job Application Update",
    text: `Dear ${name},

Your application for ${jobTitle} was not selected.`,
  };

  transporter.sendMail(mail, (error) => {
    if (error)
      return res.status(500).json({ success: false, message: "Failed to send email" });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  });
});

app.delete("/deleteApplication/:id", (req, res) => {
  const id = req.params.id;
  const q = `DELETE FROM jobApplications WHERE id = ?`;

  db.query(q, [id], (err) => {
    if (err)
      return res.status(500).json({ success: false, message: "Internal server error" });

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at port ${PORT}`);
});
