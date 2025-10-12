const cvData = [
    {
      fullName: "Mugisha Kabanda Dalton",
      phone: "+250726300260",
      email: "mugishadalton23@gmail.com",
      objective: "Seeking a scholarship to study Software Engineering and contribute to Rwanda’s development.",
      languages: ["Kinyarwanda (Excellent)", "English (Excellent)"],
      skills: ["Computer", "Coding", "Programming", "App Development"],
      hobbies: ["Coding", "Reading Books"],
    },
  ];
  
  const locationData = [
    {
      street: "KN 5 Rd",
      city: "Kigali",
      country: "Rwanda",
      postalCode: "250",
    },
  ];
  
  const educationData = [
    {
      level: "High School",
      name: "École Technique Saint Kizito Save",
      fieldOfStudy: "Mathematics, Chemistry, and Biology (MCB)",
      year: "2021-2024",
    },
    {
      level: "Bachelor’s (Planned)",
      fieldOfStudy: "Software Engineering",
      year: "2025+",
    },
  ];
  
  const certificationData = [
    { title: "Full-Stack Web Development", provider: "Coursera", year: 2023 },
    { title: "Python for Beginners", provider: "Udemy", year: 2022 },
  ];
  
  const internshipData = [
    { company: "Nova Service", year: 2022, role: "Coding Intern" },
    { company: "Rwejo Tec", year: 2023, role: "Coding Intern" },
    { company: "Tost Group", year: 2024, role: "Coding Intern" },
  ];
  
  const projectData = [
    {
      title: "E-commerce App",
      description: "Built a full-stack e-commerce platform using React and Firebase.",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      year: 2023,
    },
    {
      title: "Task Management System",
      description: "Developed a web app for managing daily tasks and schedules.",
      technologies: ["Node.js", "MongoDB", "Express"],
      year: 2024,
    },
  ];
  
  const referenceData = [
    {
      name: "John Doe",
      position: "Senior Developer",
      company: "Tost Group",
      phone: "+250700000000",
      email: "john.doe@tostgroup.com",
    },
    {
      name: "Jane Smith",
      position: "Tech Lead",
      company: "Rwejo Tec",
      phone: "+250711111111",
      email: "jane.smith@rwejotec.com",
    },
  ];
  
  const websiteTheme = {
    gradientBackground: "bg-[#188bff]",
    textStyle: "bg-clip-text text-transparent",
  };
  
  const DocInfo = () => {
    return {
      cvData,
      locationData,
      educationData,
      certificationData,
      internshipData,
      projectData,
      referenceData,
      websiteTheme,
    };
  };
  
  export default DocInfo;
  