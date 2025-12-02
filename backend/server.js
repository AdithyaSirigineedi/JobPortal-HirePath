require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/resumes", express.static("uploads"));

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 4000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

if (process.env.DB_CA_PATH && fs.existsSync(path.join(__dirname, process.env.DB_CA_PATH))) {
  dbConfig.ssl = {
    ca: fs.readFileSync(path.join(__dirname, process.env.DB_CA_PATH)),
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  };
}

const db = mysql.createPool(dbConfig).promise();

(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
})();

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendEmail(to, subject, text, res) {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
}
app.get("/", (req, res) => res.status(200).json({ message: "Main Route..." }));

app.get("/getJobs", async (req, res) => {
  try {
    const [jobs] = await db.query("SELECT * FROM jobPostings");
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/getApplications", async (req, res) => {
  try {
    const [applications] = await db.query("SELECT * FROM jobApplications");
    res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/jobApplications", upload.single("resume"), async (req, res) => {
  const { name, phone, gender, email, location, jobTitle, companyName } = req.body;
  const resume = req.file ? req.file.filename : null;
  if (!name || !phone || !gender || !resume || !email || !location || !jobTitle || !companyName)
    return res.status(400).json({ success: false, message: "All fields are required" });

  const q = `INSERT INTO jobApplications (name, phone, gender, resume, email, location, jobTitle, companyName) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    await db.query(q, [name, phone, gender, resume, email, location, jobTitle, companyName]);
    res.status(200).json({ success: true, message: "Application submitted", jobTitle, companyName });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.post("/jobPosting", async (req, res) => {
  const { jobTitle, companyName, Location, salary, description_, jobType } = req.body;
  if (!jobTitle || !companyName || !Location || !salary || !description_ || !jobType)
    return res.status(400).json({ success: false, message: "All fields are required" });

  const q = `INSERT INTO jobPostings (jobTitle, companyName, Location, salary, description_, jobType) 
             VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    await db.query(q, [jobTitle, companyName, Location, salary, description_, jobType]);
    res.status(200).json({ success: true, message: "Job posted successfully", jobTitle, companyName });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.post("/users/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) return res.status(400).json({ success: false, message: "All fields are required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO Form (userName, email, password) VALUES (?, ?, ?)", [userName, email, hashedPassword]);
    res.status(200).json({ success: true, message: "Signup successful", userName, email });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

  try {
    const [users] = await db.query("SELECT * FROM Form WHERE email = ?", [email]);
    if (users.length === 0) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const isMatched = await bcrypt.compare(password, users[0].password);
    if (!isMatched) return res.status(401).json({ success: false, message: "Invalid email or password" });

    res.status(200).json({ success: true, message: "Login successful", user: users[0] });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/users/forgot", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("UPDATE Form SET password = ? WHERE email = ?", [hashedPassword, email]);
    res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/users/email", (req, res) => {
  const { name, email, jobTitle } = req.body;
  sendEmail(email, "Regarding Job Opportunity", `Dear ${name},\n\nThank you for applying for ${jobTitle}.`, res);
});

app.post("/acceptEmail", (req, res) => {
  const { name, email, jobTitle } = req.body;
  sendEmail(email, "Job Application Update", `Dear ${name},\n\nYour application for ${jobTitle} has been accepted.`, res);
});

app.post("/declineEmail", (req, res) => {
  const { name, email, jobTitle } = req.body;
  sendEmail(email, "Job Application Update", `Dear ${name},\n\nYour application for ${jobTitle} was not selected.`, res);
});

app.delete("/deleteApplication/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM jobApplications WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Application deleted successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at port ${PORT}`));
