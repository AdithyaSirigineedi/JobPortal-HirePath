# HirePath – Job Portal 👔

HirePath is a job portal built for a company’s hiring needs. It connects **Employers** who post jobs with **Job Seekers** who search, filter, and apply for jobs. The application includes modern features like dual logins, email notifications, scratchcard rewards, dark/light mode, and more.

---

## Features

* **Two roles**: Job Seeker & Employer with separate logins
* **Employers**: add and manage free job postings
* **Job Seekers**: apply to jobs, upload resumes, track applications
* **Search & Filters**: find jobs by keywords, location, salary, type, etc.
* **Scratchcard rewards**: fun surprise feature for users
* **Stop/Countdown timer**: shows application deadlines
* **Dark/Light mode**: theme toggle with persistence
* **Forgot Password**: reset via email (Nodemailer)
* **Logout functionality**: secure session termination
* **Lazy Loading**: better performance with optimized loading
* **Email notifications**: for password resets and job application events

---

## Tech Stack

* **Frontend**: React
* **Backend**: Node.js & Express.js
* **Database**: MySQL
* **Email Service**: Nodemailer

---

## How It Works

* **Employers** sign up, log in, and post job vacancies.
* **Job Seekers** create accounts, browse jobs using search & filters, and apply directly.
* Application deadlines are shown with timers.
* Scratchcard rewards add a gamified touch.
* Secure authentication, password reset, and logout are included.
* Email notifications keep users updated.

---

## Getting Started

1. Clone the repository:

   git clone https://github.com/AdithyaSirigineedi/JobPortal-HirePath.git
   

2. Install dependencies for both backend and frontend:

   ```bash
   cd server && npm install
   cd ../frontend && npm install
   ```

3. Start the backend:

   ```bash
   cd ../server && npm run dev
   ```

4. Start the frontend:

   cd ../frontend && npm start
   

5. Open [http://localhost:3000](http://localhost:5000) in your browser.

---

## Roadmap

* Resume parsing
* Employer analytics dashboard
* Interview scheduling & reminders
* Admin panel for managing users and jobs

---

## License

MIT © 2025 Adithya Sirigineedi
