import { v4 as uuid } from 'uuid';

const jobDetails = [
  {
    id: uuid(),
    jobTitle: "Frontend Developer",
    company: "HirePath",
    location: "Remote",
    salary: "$80,000 - $100,000",
    jobType: "Full-time",
    description: "Looking for a React developer with strong JavaScript and UI/UX skills."
  },
  {
    id: uuid(),
    jobTitle: "UI/UX Designer",
    company: "HirePath",
    location: "Bangalore",
    salary: "$50,000 - $70,000",
    jobType: "Full-time",
    description: "Design intuitive user interfaces for web and mobile applications."
  },
  {
    id: uuid(),
    jobTitle: "Backend Engineer",
    company: "HirePath",
    location: "Hyderabad",
    salary: "$90,000 - $110,000",
    jobType: "Remote",
    description: "Expert in Node.js, Express, and MongoDB for building robust APIs."
  },
  {
    id: uuid(),
    jobTitle: "Project Manager",
    company: "HirePath",
    location: "Chennai",
    salary: "$70,000 - $95,000",
    jobType: "Full-time",
    description: "Manage agile teams and deliver software products on time."
  },
  {
    id: uuid(),
    jobTitle: "Data Analyst",
    company: "HirePath",
    location: "Remote",
    salary: "$60,000 - $85,000",
    jobType: "Contract",
    description: "Perform data analysis and reporting using SQL and Power BI."
  },
  {
    id: uuid(),
    jobTitle: "Marketing Specialist",
    company: "HirePath",
    location: "Mumbai",
    salary: "$40,000 - $60,000",
    jobType: "Part-time",
    description: "Create and manage digital marketing campaigns for global clients."
  },
  {
    id: uuid(),
    jobTitle: "DevOps Engineer",
    company: "HirePath",
    location: "Remote",
    salary: "$100,000 - $130,000",
    jobType: "Full-time",
    description: "Automate deployments and manage cloud infrastructure using AWS."
  },
  {
    id: uuid(),
    jobTitle: "Mobile App Developer",
    company: "HirePath",
    location: "Delhi",
    salary: "$85,000 - $105,000",
    jobType: "Full-time",
    description: "Develop cross-platform mobile apps using Flutter and Dart."
  },
  {
    id: uuid(),
    jobTitle: "Technical Writer",
    company: "HirePath",
    location: "Kolkata",
    salary: "$45,000 - $55,000",
    jobType: "Remote",
    description: "Write and edit documentation for APIs and developer tools."
  },
  {
    id: uuid(),
    jobTitle: "Customer Support Engineer",
    company: "HirePath",
    location: "Pune",
    salary: "$35,000 - $50,000",
    jobType: "Full-time",
    description: "Provide tech support and troubleshoot issues for end-users."
  },
  {
    id: 10,
    jobTitle: "HR Specialist",
    company: "HirePath",
    location: "Atlanta, GA",
    salary: "$65,000 - $85,000",
    jobType: "Full-Time",
    experience: "3+ years",
    description: "Handle recruitment, onboarding, and employee engagement initiatives."
  },
  {
    id: 11,
    jobTitle: "QA Engineer",
    company: "HirePath",
    location: "Boston, MA",
    salary: "$75,000 - $95,000",
    jobType: "Full-Time",
    experience: "2+ years",
    description: "Write test cases, perform automated and manual testing, and report bugs."
  },
  {
    id: 12,
    jobTitle: "Cloud Architect",
    company: "HirePath",
    location: "San Diego, CA",
    salary: "$130,000 - $160,000",
    jobType: "Full-Time",
    experience: "5+ years",
    description: "Design scalable cloud solutions using Azure, AWS, or GCP."
  },
  {
    id: 13,
    jobTitle: "Business Analyst",
    company: "HirePath",
    location: "Dallas, TX",
    salary: "$70,000 - $95,000",
    jobType: "Full-Time",
    experience: "3+ years",
    description: "Gather requirements, create process documentation, and support agile development."
  },
  {
    id: 14,
    jobTitle: "AI/ML Engineer",
    company: "HirePath",
    location: "Remote",
    salary: "$115,000 - $140,000",
    jobType: "Full-Time",
    experience: "4+ years",
    description: "Build and deploy machine learning models using Python, TensorFlow, and PyTorch."
  },
  {
    id: 15,
    jobTitle: "Cybersecurity Analyst",
    company: "HirePath",
    location: "Washington, DC",
    salary: "$90,000 - $120,000",
    jobType: "Full-Time",
    experience: "3+ years",
    description: "Monitor and prevent cyber threats, conduct vulnerability assessments, and implement security protocols."
  },
  {
    id: 16,
    jobTitle: "Content Strategist",
    company: "HirePath",
    location: "Philadelphia, PA",
    salary: "$60,000 - $85,000",
    jobType: "Full-Time",
    experience: "2+ years",
    description: "Develop and manage content strategies for digital platforms including blogs, social media, and websites."
  },
  {
    id: 17,
    jobTitle: "Network Administrator",
    company: "HirePath",
    location: "Phoenix, AZ",
    salary: "$70,000 - $95,000",
    jobType: "Full-Time",
    experience: "3+ years",
    description: "Maintain and troubleshoot company networks, manage routers, switches, and firewalls."
  },
  {
    id: 18,
    jobTitle: "Product Manager",
    company: "HirePath",
    location: "Remote",
    salary: "$100,000 - $130,000",
    jobType: "Full-Time",
    experience: "4+ years",
    description: "Lead product strategy, gather user feedback, and collaborate with development teams to build scalable solutions."
  },
  {
    id: 19,
    jobTitle: "Customer Support Specialist",
    company: "HirePath",
    location: "Miami, FL",
    salary: "$40,000 - $55,000",
    jobType: "Full-Time",
    experience: "1+ years",
    description: "Respond to customer inquiries, resolve issues via chat, email, and phone."
  },
  {
    id: 20,
    jobTitle: "Graphic Designer",
    company: "HirePath",
    location: "Portland, OR",
    salary: "$50,000 - $70,000",
    jobType: "Full-Time",
    experience: "2+ years",
    description: "Create branding, social media assets, and UI graphics using Adobe Creative Suite."
  },
  {
    id: 21,
    jobTitle: "Sales Executive",
    company: "HirePath",
    location: "Houston, TX",
    salary: "$60,000 base + commission",
    jobType: "Full-Time",
    experience: "3+ years",
    description: "Generate leads, close deals, and maintain client relationships in B2B environments."
  },
  {
    id: 22,
    jobTitle: "AI Prompt Engineer",
    company: "HirePath",
    location: "Remote",
    salary: "$110,000 - $145,000",
    jobType: "Full-Time",
    experience: "2+ years",
    description: "Design, test, and refine prompts for large language models and AI assistants."
  },
  {
    id: 23,
    jobTitle: "IT Support Technician",
    company: "HirePath",
    location: "Detroit, MI",
    salary: "$45,000 - $60,000",
    jobType: "Full-Time",
    experience: "2+ years",
    description: "Provide technical support for hardware/software issues, and assist with system setups."
  },
  {
    id: 24,
    jobTitle: "Video Editor",
    company: "HirePath",
    location: "Los Angeles, CA",
    salary: "$55,000 - $75,000",
    jobType: "Contract",
    experience: "3+ years",
    description: "Edit promotional and corporate videos using Premiere Pro and After Effects."
  },
  {
    id: 25,
    jobTitle: "E-commerce Manager",
    company: "HirePath",
    location: "Charlotte, NC",
    salary: "$80,000 - $100,000",
    jobType: "Full-Time",
    experience: "4+ years",
    description: "Oversee online sales strategies, manage product listings, and optimize conversion rates."
  },
  {
    id: 26,
    jobTitle: "Front-End Developer",
    company: "HirePath",
    location: "Seattle, WA",
    salary: "$80,000 - $105,000",
    jobType: "Full-Time",
    experience: "2+ years",
    description: "Develop responsive web interfaces using React.js, HTML, CSS, and JavaScript."
  },
  {
    id: 27,
    jobTitle: "Digital Marketing Analyst",
    company: "HirePath",
    location: "Chicago, IL",
    salary: "$65,000 - $90,000",
    jobType: "Full-Time",
    experience: "3+ years",
    description: "Analyze marketing data to optimize campaign performance across SEO, SEM, and social platforms."
  },
  {
    id: 28,
    jobTitle: "Mobile App Developer",
    company: "HirePath",
    location: "Remote",
    salary: "$95,000 - $120,000",
    jobType: "Full-Time",
    experience: "3+ years",
    description: "Build and maintain cross-platform mobile apps using Flutter and Dart."
  },
  {
    id: 29,
    jobTitle: "Technical Writer",
    company: "HirePath",
    location: "Denver, CO",
    salary: "$55,000 - $75,000",
    jobType: "Full-Time",
    experience: "2+ years",
    description: "Create user manuals, API documentation, and product guides for SaaS tools."
  },
  {
    id: 30,
    jobTitle: "Cybersecurity Analyst",
    company: "HirePath",
    location: "Atlanta, GA",
    salary: "$100,000 - $130,000",
    jobType: "Full-Time",
    experience: "4+ years",
    description: "Monitor networks for threats, conduct audits, and implement security best practices."
  }
];

export default jobDetails;
