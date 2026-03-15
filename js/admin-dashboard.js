// Check if admin is logged in
if (!sessionStorage.getItem('adminLoggedIn')) {
    window.location.href = 'admin-login.html';
}

// Display admin email
document.getElementById('adminEmail').textContent = sessionStorage.getItem('adminEmail') || 'Admin';

// Initialize data from localStorage
let events = JSON.parse(localStorage.getItem('events')) || [
    {
        id: 1,
        name: "Guest Lecture on Artificial Intelligence & Machine Learning",
        date: "2023-08-15",
        type: "Guest Lecture",
        description: "Expert talk by Dr. Rajesh Kumar from IIT Bombay",
        resourcePerson: "Dr. Rajesh Kumar",
        designation: "Professor, IIT Bombay",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "Workshop on Cloud Computing (AWS)",
        date: "2023-09-10",
        type: "Workshop",
        description: "Hands-on AWS workshop",
        resourcePerson: "Mr. Amit Sharma",
        designation: "Cloud Architect, Amazon Web Services",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        name: "Coding Competition - CodeFest 2023",
        date: "2023-10-05",
        type: "Competition",
        description: "Annual coding competition for students",
        resourcePerson: "IT Department Faculty",
        designation: "TGPCET Nagpur",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        name: "Industrial Visit to IT Company",
        date: "2023-10-20",
        type: "Industrial Visit",
        description: "Visit to TCS Nagpur office",
        resourcePerson: "Industry Experts",
        designation: "TCS, Nagpur",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        name: "Seminar on Cybersecurity Awareness",
        date: "2023-11-15",
        type: "Seminar",
        description: "Cybersecurity best practices and awareness",
        resourcePerson: "Dr. Priya Deshmukh",
        designation: "Security Analyst, Infosys",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 6,
        name: "Project Exhibition - Tech Expo 2023",
        date: "2023-12-10",
        type: "Exhibition",
        description: "Student project showcase",
        resourcePerson: "Prof. Abhay Rewatkar",
        designation: "HOD, IT Department, TGPCET",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 7,
        name: "Workshop on Web Development (MERN Stack)",
        date: "2024-01-25",
        type: "Workshop",
        description: "Full stack web development workshop",
        resourcePerson: "Mr. Suresh Patil",
        designation: "Senior Developer, Wipro Technologies",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 8,
        name: "Guest Lecture on Data Science & Analytics",
        date: "2024-02-15",
        type: "Guest Lecture",
        description: "Data Science and Analytics trends",
        resourcePerson: "Dr. Anjali Verma",
        designation: "Data Scientist, Google India",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 9,
        name: "Hackathon - Code Sprint 24",
        date: "2024-03-10",
        type: "Hackathon",
        description: "24-hour coding hackathon",
        resourcePerson: "IT Department Faculty",
        designation: "TGPCET Nagpur",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 10,
        name: "Technical Paper Presentation Competition",
        date: "2024-03-25",
        type: "Competition",
        description: "Technical paper presentation by students",
        resourcePerson: "Prof. Jayesh Fating",
        designation: "Assistant Professor, IT Dept, TGPCET",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 11,
        name: "Workshop on IoT & Embedded Systems",
        date: "2024-04-15",
        type: "Workshop",
        description: "IoT and embedded systems hands-on",
        resourcePerson: "Mr. Rahul Deshmukh",
        designation: "IoT Specialist, Bosch India",
        status: "Completed",
        createdAt: new Date().toISOString()
    },
    {
        id: 12,
        name: "Placement Training & Mock Interviews",
        date: "2024-05-01",
        type: "Training",
        description: "Ongoing placement preparation",
        resourcePerson: "Training & Placement Cell",
        designation: "TGPCET Nagpur",
        status: "Ongoing",
        createdAt: new Date().toISOString()
    }
];

let faculty = JSON.parse(localStorage.getItem('faculty')) || [
    {
        id: 1,
        name: "Prof. Abhay Rewatkar",
        designation: "Head of Department",
        qualification: "M.Tech (CSE)",
        experience: "15+ Years",
        specialization: "Software Engineering, AI & ML",
        email: "hod.it@tgpcet.com",
        phone: "+91 97660 85909",
        image: "images/faculty/Abhay-Rewatkar.jpg"
    },
    {
        id: 2,
        name: "Prof. Jayesh Fating",
        designation: "Assistant Professor",
        qualification: "M.Tech (CSE)",
        specialization: "Cloud Computing, Software Engineering",
        image: "images/faculty/jayesh-fating.jpg"
    },
    {
        id: 3,
        name: "Prof. Anita Yadav",
        designation: "Assistant Professor",
        qualification: "M.Tech (CSE)",
        specialization: "Data Structures, Java Programming",
        image: "images/faculty/anita-yadav.jpg"
    },
    {
        id: 4,
        name: "Prof. Ashwini Mahajan",
        designation: "Assistant Professor",
        qualification: "M.Tech (IT)",
        specialization: "Web Technologies, Programming",
        image: "images/faculty/Ashwini Mahajan.jpg"
    },
    {
        id: 5,
        name: "Prof. Lenna Suryawanshi",
        designation: "Assistant Professor",
        qualification: "M.Tech (IT)",
        specialization: "Software Engineering, Programming",
        image: "images/faculty/Lenna Suryawanshi.jpg"
    },
    {
        id: 6,
        name: "Prof. Ruchita Tajne",
        designation: "Assistant Professor",
        qualification: "M.Tech (IT)",
        specialization: "Database Systems, Programming",
        image: "images/faculty/Ruchita Tajne.jpg"
    },
    {
        id: 7,
        name: "Prof. Sayara Bano Sheikh",
        designation: "Assistant Professor",
        qualification: "M.Tech (CSE)",
        specialization: "Computer Networks, Security",
        image: "images/faculty/Sayara Bano Sheikh.jpg"
    },
    {
        id: 8,
        name: "Prof. Sushil Bhise",
        designation: "Assistant Professor",
        qualification: "M.Tech (IT)",
        specialization: "AI & ML, Python Programming",
        image: "images/faculty/Sushil Bhise.jpg"
    },
    {
        id: 9,
        name: "Prof. Swati Thengane",
        designation: "Assistant Professor",
        qualification: "M.Tech (IT)",
        specialization: "DBMS, Web Technologies",
        image: "images/faculty/Swati Thengane.jpg"
    },
    {
        id: 10,
        name: "Prof. T. P. Raju",
        designation: "Assistant Professor",
        qualification: "M.Tech (CSE)",
        specialization: "Operating Systems, Computer Architecture",
        image: "images/faculty/T. P. Raju.jpg"
    }
];

let placements = JSON.parse(localStorage.getItem('placements')) || [
    // 2023-24 Placements
    { id: 1, studentName: "Samadhan Chaudhari", rollNumber: "20211027226519", company: "TCS, Pune", year: "2023-24" },
    { id: 2, studentName: "Rahul Rameshwar Chute", rollNumber: "20211027226512", company: "ESAF Small Finance Bank, Thrissur, Kerala", year: "2023-24" },
    { id: 3, studentName: "Jeet Agrawal", rollNumber: "20211027226502", company: "MENRVA TECHNOLOGIES, Bangalore", year: "2023-24" },
    { id: 4, studentName: "Kumudini Barasagade", rollNumber: "20221027203112", company: "Instant Career Academy, Bramhapuri", year: "2023-24" },
    { id: 5, studentName: "Tushar Narayan Hiwarkar", rollNumber: "20211027226531", company: "TCS, Pune", year: "2023-24" },
    { id: 6, studentName: "Monish Tarachand Khidkikar", rollNumber: "20211027226505", company: "Genpact India Pvt. Ltd, Hyderabad", year: "2023-24" },
    { id: 7, studentName: "Piyush Lingayat", rollNumber: "20221027203120", company: "ESAF Small Finance Bank, Thrissur, Kerala", year: "2023-24" },
    { id: 8, studentName: "Abhishek Kombe", rollNumber: "20211027226491", company: "MS IT Services Pvt Ltd, Nagpur", year: "2023-24" },
    { id: 9, studentName: "Anannya Moundekar", rollNumber: "20211027226472", company: "ExcelR EdTech Pvt. Ltd., Bengaluru, Karnataka", year: "2023-24" },
    { id: 10, studentName: "Asif Siddiqui", rollNumber: "20221027203118", company: "The Kiran Academy, Nagpur", year: "2023-24" },
    { id: 11, studentName: "Ayush Nighot", rollNumber: "20221027203114", company: "Smart Data Enterprices Ltd, Nagpur", year: "2023-24" },
    { id: 12, studentName: "Bhagyashri Agrawal", rollNumber: "20221027226497", company: "Waysprire Ed-Tech Pvt. Ltd., Gurugram, Haryana", year: "2023-24" },
    { id: 13, studentName: "Diksha Tembhare", rollNumber: "20211027226473", company: "The Kiran Academy, Nagpur", year: "2023-24" },
    { id: 14, studentName: "Dilkash Kamble", rollNumber: "20211027226499", company: "SGS Technical Services Pvt Ltd, Indore, MP", year: "2023-24" },
    { id: 15, studentName: "Gaurav Dane", rollNumber: "20211027226500", company: "MSIT Services Pvt Ltd, Nagpur", year: "2023-24" },
    { id: 16, studentName: "Anand Patil", rollNumber: "20211027226494", company: "The Kiran Academy, Nagpur", year: "2023-24" },
    { id: 17, studentName: "Harshali Kanoje", rollNumber: "20211027226474", company: "Hexaware technologies, Nagpur", year: "2023-24" },
    { id: 18, studentName: "Sanika Patare", rollNumber: "20211027226483", company: "MSIT Services Pvt Ltd, Nagpur", year: "2023-24" },
    { id: 19, studentName: "Mangesh Meshram", rollNumber: "20221027203116", company: "Smart Data Enterprices Ltd, Nagpur", year: "2023-24" },
    { id: 20, studentName: "Nikita Ramchandra Kadiwike", rollNumber: "20211027226507", company: "Numetry Technologies Pvt Ltd, Pune", year: "2023-24" },
    { id: 21, studentName: "Samir Dholane", rollNumber: "20211027226521", company: "Byju's Pvt. Ltd.", year: "2023-24" },
    { id: 22, studentName: "Poonam Dighole", rollNumber: "20211027226477", company: "AROHI Software Development, Ahamadnagar", year: "2023-24" },
    { id: 23, studentName: "Prachi Dahikar", rollNumber: "20211027226478", company: "CapitalVia FinTech Pvt. Ltd., Indore, MP", year: "2023-24" },
    { id: 24, studentName: "Rupa Bawane", rollNumber: "20211027226479", company: "SGS Technical Services Pvt Ltd, Indore", year: "2023-24" },
    { id: 25, studentName: "Radha Gondchor", rollNumber: "20211027226480", company: "Hexaware Technologies, Nagpur", year: "2023-24" },
    { id: 26, studentName: "Shweta Turankar", rollNumber: "20211027226485", company: "MS IT Services Pvt Ltd, Nagpur", year: "2023-24" },
    { id: 27, studentName: "Raj Shekokar", rollNumber: "20211027226513", company: "Cofag Investment Advisor, Nagpur", year: "2023-24" },
    { id: 28, studentName: "Ritika Arya", rollNumber: "20211027226481", company: "PIE Infocomm Pvt Ltd, Nagpur", year: "2023-24" },
    { id: 29, studentName: "Rujvet Wasnik", rollNumber: "20211027226516", company: "CapitalVia FinTech Pvt. Ltd., Indore, MP", year: "2023-24" },
    { id: 30, studentName: "Sagar Chourasia", rollNumber: "20221027203121", company: "SGS Technical Services Pvt Ltd, Indore", year: "2023-24" },
    { id: 31, studentName: "Samyek Khobragade", rollNumber: "20211027226522", company: "CapitalVia FinTech Pvt. Ltd., Indore, MP", year: "2023-24" },
    { id: 32, studentName: "Sanskruti Shambharkar", rollNumber: "20211027226484", company: "PIE Infocomm Pvt Ltd, Aliganj, Lucknow", year: "2023-24" },
    { id: 33, studentName: "Sufia Mohankar", rollNumber: "20211027226486", company: "ESAF Small Finance Bank, Thrissur, Kerala", year: "2023-24" },
    { id: 34, studentName: "Tushar Sonkusare", rollNumber: "20211027226530", company: "MS IT Services Pvt Ltd, Nagpur", year: "2023-24" },
    { id: 35, studentName: "Vaibhav Chaudhari", rollNumber: "20211027226532", company: "MS IT Services Pvt Ltd, Nagpur", year: "2023-24" },
    { id: 36, studentName: "Vaibhav Rathod", rollNumber: "20211027226533", company: "Byju's Pvt. Ltd.", year: "2023-24" },
    { id: 37, studentName: "Suraj Pathade", rollNumber: "20211027226528", company: "The Kiran Academy, Nagpur", year: "2023-24" },
    { id: 38, studentName: "Sachin Kiran Ranmale", rollNumber: "20211027226739", company: "MS IT Services Pvt. Ltd, Nagpur", year: "2023-24" },
    { id: 39, studentName: "Vina Vithhal Kadukar", rollNumber: "20221027203113", company: "MS IT Services Pvt. Ltd, Nagpur", year: "2023-24" },
    { id: 40, studentName: "Sukanya Bhujade", rollNumber: "20211027226487", company: "MS IT Services Pvt. Ltd, Nagpur", year: "2023-24" },
    { id: 41, studentName: "Pallavi Dhande", rollNumber: "20211027226508", company: "MS IT Services Pvt. Ltd, Nagpur", year: "2023-24" },
    { id: 42, studentName: "Manisha Mahule", rollNumber: "20211027226504", company: "MS IT Services Pvt. Ltd, Nagpur", year: "2023-24" },
    { id: 43, studentName: "Samiksha Sahare", rollNumber: "20211027226520", company: "MS IT Services Pvt. Ltd, Nagpur", year: "2023-24" },
    { id: 44, studentName: "Raj Rabin Das", rollNumber: "20211027226514", company: "Waysprire Ed-Tech Pvt. Ltd., Gurugram, Haryana", year: "2023-24" },
    { id: 45, studentName: "Yogesh Alokar", rollNumber: "20211027226535", company: "Hexaware Technologies, Nagpur", year: "2023-24" },
    { id: 46, studentName: "Kunal Waghmare", rollNumber: "20211027226503", company: "The Kiran Academy, Nagpur", year: "2023-24" },
    { id: 47, studentName: "Aditya Samrit", rollNumber: "20211027226492", company: "Waysprire Ed-Tech Pvt. Ltd., Gurugram, Haryana", year: "2023-24" },

    // 2022-23 Placements
    { id: 48, studentName: "Ayush Ramteke", rollNumber: "20201027227054", company: "Genpact India Pvt. Ltd., Hyderabad", year: "2022-23" },
    { id: 49, studentName: "Tharun R. Racharla", rollNumber: "20201027227075", company: "Infosys BPM Limited", year: "2022-23" },
    { id: 50, studentName: "Shireen Mariyam Zulfekar Khan Ansari", rollNumber: "20211027226163", company: "Oakland System Pvt. Ltd., Nagpur", year: "2022-23" },
    { id: 51, studentName: "Aarati Jagtap", rollNumber: "20201027227023", company: "C-Tech Group, Nagpur", year: "2022-23" },
    { id: 52, studentName: "Abhishek Wadatkar", rollNumber: "20211027226164", company: "MSIT Services, Nagpur", year: "2022-23" },
    { id: 53, studentName: "Achal Telmasre", rollNumber: "20201027227024", company: "MSIT Services, Nagpur", year: "2022-23" },
    { id: 54, studentName: "Aman Devhare", rollNumber: "20201027227049", company: "C-Tech Group, Nagpur", year: "2022-23" },
    { id: 55, studentName: "Amol Ingale", rollNumber: "20201027227051", company: "C-Tech Group, Nagpur", year: "2022-23" },
    { id: 56, studentName: "Anup Kolhe", rollNumber: "20211027226165", company: "MSIT Services, Nagpur", year: "2022-23" },
    { id: 57, studentName: "Ashish Pimpalkar", rollNumber: "20201027227053", company: "C-Tech Group, Nagpur", year: "2022-23" },
    { id: 58, studentName: "Babita Saha", rollNumber: "20201027227027", company: "C-Tech Group, Nagpur", year: "2022-23" },
    { id: 59, studentName: "Bharati Nagpure", rollNumber: "20201027227029", company: "MSIT Services, Nagpur", year: "2022-23" },
    { id: 60, studentName: "Chaitali Warbhe", rollNumber: "20201027227031", company: "MSIT Services, Nagpur", year: "2022-23" },
    { id: 61, studentName: "Chirag Dhore", rollNumber: "20201027227056", company: "C-Tech Group, Nagpur", year: "2022-23" },
    { id: 62, studentName: "Divya Hatwar", rollNumber: "20201027227033", company: "C-Tech Group, Nagpur", year: "2022-23" },
    { id: 63, studentName: "Aman Mishra", rollNumber: "20201027227050", company: "C-Tech Group, Nagpur", year: "2022-23" },
    { id: 64, studentName: "Jyoti Meshram", rollNumber: "20201027227035", company: "MSIT Services, Nagpur", year: "2022-23" },
    { id: 65, studentName: "Achal Butke", rollNumber: "20201027227025", company: "MSIT Services, Nagpur", year: "2022-23" },
    { id: 66, studentName: "Komal Kumbhare", rollNumber: "20211027226159", company: "Oakland System Pvt. Ltd., Nagpur", year: "2022-23" },
    { id: 67, studentName: "Krutika Jichkar", rollNumber: "20201027227036", company: "SGS Technical Services Pvt. Ltd/ Indore", year: "2022-23" },
    { id: 68, studentName: "Madhavi Bhute", rollNumber: "20201027227037", company: "C-Tech Group, Nagpur", year: "2022-23" },
    { id: 69, studentName: "Sagar Wandile", rollNumber: "20201027227068", company: "Endurance Technologies Pvt. Ltd. Sambhajinagar, Maharashtra", year: "2022-23" }
];

let gallery = JSON.parse(localStorage.getItem('gallery')) || [
    // Farewell & Convocation
    { id: 1, title: "Farwell Celebration 2K25", category: "farewell", image: "https://www.tgpcet.com/assets/img/IT/38.jpg", date: "2025-01-15" },
    { id: 2, title: "Farwell Celebration 2K25", category: "farewell", image: "https://www.tgpcet.com/assets/img/IT/37.jpg", date: "2025-01-15" },
    { id: 3, title: "Farwell Celebration 2K25", category: "farewell", image: "https://www.tgpcet.com/assets/img/IT/36.jpg", date: "2025-01-15" },
    { id: 8, title: "Farwell Celebration", category: "farewell", image: "https://www.tgpcet.com/assets/img/IT/31.jpeg", date: "2024-04-24" },
    { id: 9, title: "Farwell Celebration", category: "farewell", image: "https://www.tgpcet.com/assets/img/IT/30.jpeg", date: "2024-04-24" },
    { id: 10, title: "Farwell Celebration", category: "farewell", image: "https://www.tgpcet.com/assets/img/IT/29.jpeg", date: "2024-04-24" },
    { id: 18, title: "Convocation Ceremony- Graduating Class of 2023", category: "farewell", image: "https://www.tgpcet.com/assets/img/IT/20.png", date: "2024-01-13" },

    // Events & Activities
    { id: 4, title: "Forum Reinstallation of ACME", category: "events", image: "https://www.tgpcet.com/assets/img/IT/35.png", date: "2024-08-14" },
    { id: 12, title: "Parents Teacher Conclave", category: "events", image: "https://www.tgpcet.com/assets/img/IT/27.png", date: "2024-05-04" },
    { id: 19, title: "10th International conference on IKSAT-2K24 MCA track welcome", category: "events", image: "https://www.tgpcet.com/assets/img/IT/19.png", date: "2024-01-10" },
    { id: 21, title: "Parents Teacher Conclave", category: "events", image: "https://www.tgpcet.com/assets/img/IT/17.png", date: "2023-11-25" },

    // Guest Lectures
    { id: 5, title: "Guest Lecture on AI and its usage in modern world", category: "guest-lectures", image: "https://www.tgpcet.com/assets/img/IT/34.png", date: "2024-08-02" },
    { id: 7, title: "Guest Lecture on Carrier in cloud and salesforce", category: "guest-lectures", image: "https://www.tgpcet.com/assets/img/IT/32.png", date: "2024-07-18" },
    { id: 15, title: "Guest Lecture on Introduction to cloud computing and Amazon web services", category: "guest-lectures", image: "https://www.tgpcet.com/assets/img/IT/23.png", date: "2024-02-06" },
    { id: 16, title: "Guest Lecture on Design Thinking- A practical approach", category: "guest-lectures", image: "https://www.tgpcet.com/assets/img/IT/22.png", date: "2024-02-02" },
    { id: 24, title: "Guest lecture on Carriers on Salesforce", category: "guest-lectures", image: "https://www.tgpcet.com/assets/img/IT/13.jpeg", date: "2023-05-22" },

    // Industrial Visits
    { id: 6, title: "Industrial visit at Clic2Cloud, Nagpur", category: "industrial-visits", image: "https://www.tgpcet.com/assets/img/IT/33.png", date: "2024-07-24" },
    { id: 17, title: "Industrial visit at Metlok Pvt. Ltd – Nagpur", category: "industrial-visits", image: "https://www.tgpcet.com/assets/img/IT/21.png", date: "2024-02-01" },
    { id: 23, title: "Industrial Visit to Royals Webtech", category: "industrial-visits", image: "https://www.tgpcet.com/assets/img/IT/14.jpeg", date: "2023-07-28" },

    // Workshops & Seminars
    { id: 11, title: "Hands-on Workshop Industrial Code Design Pattern", category: "workshops", image: "https://www.tgpcet.com/assets/img/IT/28.png", date: "2024-05-03" },
    { id: 13, title: "One Day Workshop on Career in Salesforce & cloud computing", category: "workshops", image: "https://www.tgpcet.com/assets/img/IT/26.png", date: "2024-02-24" },
    { id: 22, title: "Two days hand on workshop on DBA", category: "workshops", image: "https://www.tgpcet.com/assets/img/IT/15.jpeg", date: "2023-07-22" },

    // Competitions
    { id: 14, title: "Project Competition and Model Making", category: "competitions", image: "https://www.tgpcet.com/assets/img/IT/25.png", date: "2024-02-17" },

    // Celebrations
    { id: 20, title: "Gandhi Jayanti Celebration", category: "celebrations", image: "https://www.tgpcet.com/assets/img/IT/18.png", date: "2023-10-02" },

    // Labs
    { id: 25, title: "Artificial Intelligence and Machine Learning Lab", category: "labs", image: "https://www.tgpcet.com/assets/img/IT/LAB/AIML.jpg", date: "2024-01-01" },
    { id: 26, title: "Computer Graphics Lab", category: "labs", image: "https://www.tgpcet.com/assets/img/IT/LAB/Computer_Graphics.jpg", date: "2024-01-01" },
    { id: 27, title: "Computer Workshop Lab", category: "labs", image: "https://www.tgpcet.com/assets/img/IT/LAB/Computer_Workshop.jpg", date: "2024-01-01" },
    { id: 28, title: "Data Science Lab", category: "labs", image: "https://www.tgpcet.com/assets/img/IT/LAB/Data_Science.jpg", date: "2024-01-01" },
    { id: 29, title: "Data Structure Lab", category: "labs", image: "https://www.tgpcet.com/assets/img/IT/LAB/Data_Structure.jpg", date: "2024-01-01" },
    { id: 30, title: "Database Management System Lab", category: "labs", image: "https://www.tgpcet.com/assets/img/IT/LAB/DBMS.jpg", date: "2024-01-01" },
    { id: 31, title: "Research Lab", category: "labs", image: "https://www.tgpcet.com/assets/img/IT/LAB/Research_Lab.jpg", date: "2024-01-01" },
    { id: 32, title: "Software Engineering Lab", category: "labs", image: "https://www.tgpcet.com/assets/img/IT/LAB/Software_Engineering.jpg", date: "2024-01-01" },

    // News
    { id: 33, title: "Department Achievement News", category: "news", image: "https://www.tgpcet.com/assets/img/IT/News/1.jpg", date: "2024-01-01" },
    { id: 34, title: "Academic Excellence Clipping", category: "news", image: "https://www.tgpcet.com/assets/img/IT/News/2.jpg", date: "2024-01-01" },
    { id: 35, title: "Student Achievement News", category: "news", image: "https://www.tgpcet.com/assets/img/IT/News/3.jpg", date: "2024-01-01" },
    { id: 36, title: "Workshop Report Clipping", category: "news", image: "https://www.tgpcet.com/assets/img/IT/News/4.jpg", date: "2024-01-01" },
    { id: 37, title: "Department Event News", category: "news", image: "https://www.tgpcet.com/assets/img/IT/News/5.jpg", date: "2024-01-01" }
];

let news = JSON.parse(localStorage.getItem('news')) || [
    {
        id: 1,
        title: "Department Achievement Featured in Local News",
        date: "2024-01-15",
        category: "Achievement",
        description: "IT Department's outstanding performance in academics and placements featured in leading newspapers",
        image: "https://www.tgpcet.com/assets/img/IT/News/1.jpg",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Students Excel in National Level Competition",
        date: "2024-01-10",
        category: "Student Achievement",
        description: "Our students secured top positions in national level coding competition",
        image: "https://www.tgpcet.com/assets/img/IT/News/3.jpg",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: "Workshop on AI & ML Conducted Successfully",
        date: "2024-01-05",
        category: "Workshop",
        description: "Two-day intensive workshop on Artificial Intelligence and Machine Learning concluded with great success",
        image: "https://www.tgpcet.com/assets/img/IT/News/4.jpg",
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        title: "100% Placement Record Achieved",
        date: "2023-12-20",
        category: "Placement",
        description: "IT Department achieves remarkable 100% placement record for final year students",
        image: "https://www.tgpcet.com/assets/img/IT/News/2.jpg",
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: "Department Hosts International Conference",
        date: "2023-12-15",
        category: "Conference",
        description: "Successfully organized international conference on emerging technologies with participants from 15 countries",
        image: "https://www.tgpcet.com/assets/img/IT/News/5.jpg",
        createdAt: new Date().toISOString()
    }
];
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Update stats
async function updateStats() {
    const eventsData = await AdminAPI.getEvents();
    const newsData = await AdminAPI.getNews();
    const galleryData = await AdminAPI.getGallery();
    const messagesData = await AdminAPI.getMessages();
    
    document.getElementById('totalEvents').textContent = eventsData.length;
    document.getElementById('totalNews').textContent = newsData.length;
    document.getElementById('totalGallery').textContent = galleryData.length;
    document.getElementById('totalMessages').textContent = messagesData.length;
}

// Save all data to localStorage
function saveData() {
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('faculty', JSON.stringify(faculty));
    localStorage.setItem('placements', JSON.stringify(placements));
    localStorage.setItem('gallery', JSON.stringify(gallery));
    localStorage.setItem('news', JSON.stringify(news));
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');

        // Update page title
        const title = this.textContent.trim();
        document.getElementById('pageTitle').textContent = title;
    });
});

// Toggle Sidebar (Mobile)
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminEmail');
        window.location.href = 'admin-login.html';
    }
}

// Modal Functions
function showAddEventModal() {
    // Reset modal to add mode
    document.querySelector('#addEventModal .modal-header h2').textContent = 'Add New Event';
    document.querySelector('#addEventModal button[type="submit"]').textContent = 'Add Event';
    document.getElementById('addEventForm').reset();
    document.getElementById('addEventModal').classList.add('active');
}

function showAddNewsModal() {
    // Reset modal to add mode
    document.querySelector('#addNewsModal .modal-header h2').textContent = 'Add News & Announcement';
    document.querySelector('#addNewsModal button[type="submit"]').textContent = 'Add News';
    document.getElementById('addNewsForm').reset();
    document.getElementById('newsImageName').textContent = 'No file chosen';
    document.getElementById('newsImagePreview').style.display = 'none';
    document.getElementById('addNewsModal').classList.add('active');
}

function showAddGalleryModal() {
    // Reset modal to add mode
    currentEditingGalleryId = null;
    document.querySelector('#addGalleryModal .modal-header h2').textContent = 'Add Gallery Image';
    document.querySelector('#addGalleryModal button[type="submit"]').textContent = 'Add Image';
    document.getElementById('addGalleryForm').reset();
    document.getElementById('galleryImageName').textContent = 'No file chosen';
    document.getElementById('galleryImagePreview').style.display = 'none';
    
    // Restore required attributes for add mode
    document.getElementById('galleryImageFile').setAttribute('required', 'required');
    document.getElementById('galleryImage').setAttribute('required', 'required');
    
    document.getElementById('addGalleryModal').classList.add('active');
}

function showAddFacultyModal() {
    // Reset modal to add mode
    document.querySelector('#addFacultyModal .modal-header h2').textContent = 'Add Faculty Member';
    document.querySelector('#addFacultyModal button[type="submit"]').textContent = 'Add Faculty';
    document.getElementById('addFacultyForm').reset();
    document.getElementById('facultyImageName').textContent = 'No file chosen';
    document.getElementById('facultyImagePreview').style.display = 'none';
    document.getElementById('addFacultyModal').classList.add('active');
}

function showAddPlacementModal() {
    // Reset modal to add mode
    document.querySelector('#addPlacementModal .modal-header h2').textContent = 'Add Placement Record';
    document.querySelector('#addPlacementModal button[type="submit"]').textContent = 'Add Placement';
    document.getElementById('addPlacementForm').reset();
    document.getElementById('addPlacementModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Store original form handlers
let currentEditingEventId = null;
let currentEditingPlacementId = null;
let currentEditingGalleryId = null;
let currentEditingFacultyId = null;
let currentEditingNewsId = null;

// Add Event Form
document.getElementById('addEventForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (currentEditingEventId) {
        // Edit mode
        const event = events.find(e => e.id === currentEditingEventId);
        event.name = document.getElementById('eventName').value;
        event.date = document.getElementById('eventDate').value;
        event.type = document.getElementById('eventType').value;
        event.description = document.getElementById('eventDescription').value;
        event.status = document.getElementById('eventStatus').value;
        event.resourcePerson = document.getElementById('resourcePerson').value;
        event.designation = document.getElementById('designation').value;

        saveData();
        addActivity('Updated event: ' + event.name);
        alert('Event updated successfully!');
        currentEditingEventId = null;
    } else {
        // Add mode
        const event = {
            id: Date.now(),
            name: document.getElementById('eventName').value,
            date: document.getElementById('eventDate').value,
            type: document.getElementById('eventType').value,
            description: document.getElementById('eventDescription').value,
            status: document.getElementById('eventStatus').value,
            resourcePerson: document.getElementById('resourcePerson').value,
            designation: document.getElementById('designation').value,
            createdAt: new Date().toISOString()
        };

        events.push(event);
        saveData();
        updateStats();
        addActivity('Added new event: ' + event.name);
        alert('Event added successfully!');
    }

    this.reset();
    closeModal('addEventModal');
    renderEvents();
});

// Render Events
function renderEvents() {
    const tbody = document.getElementById('eventsTableBody');

    if (events.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 2rem; color: #94a3b8;">
                    No events added yet. Click "Add New Event" to get started.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = events.map(event => `
        <tr>
            <td>${event.name}</td>
            <td>${new Date(event.date).toLocaleDateString()}</td>
            <td><span class="badge">${event.type}</span></td>
            <td><span class="status-badge status-${event.status.toLowerCase()}">${event.status}</span></td>
            <td>
                <button class="btn-icon" onclick="editEvent(${event.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteEvent(${event.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Delete Event
function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        const event = events.find(e => e.id === id);
        events = events.filter(e => e.id !== id);
        saveData();
        renderEvents();
        updateStats();
        addActivity('Deleted event: ' + (event ? event.name : 'Unknown'));
    }
}

// Edit Event
function editEvent(id) {
    const event = events.find(e => e.id === id);
    if (!event) return;

    currentEditingEventId = id;

    // Fill form with existing data
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventType').value = event.type;
    document.getElementById('eventDescription').value = event.description;
    document.getElementById('eventStatus').value = event.status;
    document.getElementById('resourcePerson').value = event.resourcePerson || '';
    document.getElementById('designation').value = event.designation || '';

    // Change modal title
    document.querySelector('#addEventModal .modal-header h2').textContent = 'Edit Event';
    document.querySelector('#addEventModal button[type="submit"]').textContent = 'Update Event';

    document.getElementById('addEventModal').classList.add('active');
}

// Add Activity
function addActivity(text) {
    const activityList = document.getElementById('activityList');
    const activity = document.createElement('div');
    activity.className = 'activity-item';
    activity.innerHTML = `
        <i class="fas fa-circle" style="color: #3b82f6; font-size: 0.5rem;"></i>
        <span>${text}</span>
        <span style="color: #94a3b8; font-size: 0.85rem;">${new Date().toLocaleString()}</span>
    `;

    if (activityList.querySelector('p')) {
        activityList.innerHTML = '';
    }

    activityList.insertBefore(activity, activityList.firstChild);
}

// Export Data
function exportData() {
    const data = {
        events,
        faculty,
        placements,
        gallery,
        news,
        messages,
        exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tgpcet-it-backup-${Date.now()}.json`;
    link.click();

    addActivity('Exported data backup');
}

// Show Edit Profile Modal
function showEditProfileModal() {
    const adminEmail = sessionStorage.getItem('adminEmail') || 'bhupeshindurkar6@gmail.com';
    document.getElementById('currentEmail').value = adminEmail;
    document.getElementById('editProfileForm').reset();
    document.getElementById('currentEmail').value = adminEmail; // Reset clears it, so set again
    document.getElementById('editProfileModal').classList.add('active');
}

// Image Upload Handlers
function handleFacultyImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            document.getElementById('facultyImage').value = imageData;
            document.getElementById('facultyImageName').textContent = file.name;

            // Show preview
            const preview = document.getElementById('facultyImagePreview');
            preview.style.display = 'block';
            preview.querySelector('img').src = imageData;
        };
        reader.readAsDataURL(file);
    }
}

function handleGalleryImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById('galleryImageName').textContent = file.name;
    document.getElementById('galleryUploadStatus').style.display = 'inline';

    // Upload to ImgBB (free image hosting)
    const formData = new FormData();
    formData.append('image', file);

    fetch('https://api.imgbb.com/1/upload?key=a8b5c2d1e3f4a6b7c8d9e0f1a2b3c4d5', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            const imageUrl = data.data.url;
            document.getElementById('galleryImage').value = imageUrl;
            document.getElementById('galleryImageUrl').value = imageUrl;
            document.getElementById('galleryUploadStatus').innerHTML = '<i class="fas fa-check-circle"></i> Uploaded!';
            document.getElementById('galleryUploadStatus').style.color = '#10b981';

            const preview = document.getElementById('galleryImagePreview');
            preview.style.display = 'block';
            preview.querySelector('img').src = imageUrl;
        } else {
            // Fallback: convert to base64
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('galleryImage').value = e.target.result;
                document.getElementById('galleryUploadStatus').innerHTML = '<i class="fas fa-check-circle"></i> Ready!';
                const preview = document.getElementById('galleryImagePreview');
                preview.style.display = 'block';
                preview.querySelector('img').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        document.getElementById('galleryUploadStatus').style.display = 'inline';
    })
    .catch(() => {
        // Fallback to base64
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('galleryImage').value = e.target.result;
            document.getElementById('galleryUploadStatus').innerHTML = '<i class="fas fa-check-circle"></i> Ready!';
            document.getElementById('galleryUploadStatus').style.display = 'inline';
            const preview = document.getElementById('galleryImagePreview');
            preview.style.display = 'block';
            preview.querySelector('img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function handleNewsImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            document.getElementById('newsImage').value = imageData;
            document.getElementById('newsImageName').textContent = file.name;

            // Show preview
            const preview = document.getElementById('newsImagePreview');
            preview.style.display = 'block';
            preview.querySelector('img').src = imageData;
        };
        reader.readAsDataURL(file);
    }
}

// Edit Profile Form Handler
document.getElementById('editProfileForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get admin credentials from localStorage
    const adminData = JSON.parse(localStorage.getItem('adminCredentials')) || {
        email: 'bhupeshindurkar6@gmail.com',
        password: 'bhupesh123'
    };

    const currentPassword = document.getElementById('currentPassword').value;
    const newEmail = document.getElementById('newEmail').value.trim();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verify current password
    if (currentPassword !== adminData.password) {
        alert('Current password is incorrect!');
        return;
    }

    // Validate new password if provided
    if (newPassword) {
        if (newPassword.length < 6) {
            alert('New password must be at least 6 characters long!');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
    }

    // Update credentials
    let updated = false;

    if (newEmail && newEmail !== adminData.email) {
        adminData.email = newEmail;
        sessionStorage.setItem('adminEmail', newEmail);
        updated = true;
    }

    if (newPassword) {
        adminData.password = newPassword;
        updated = true;
    }

    if (!updated) {
        alert('No changes were made!');
        return;
    }

    // Save to localStorage
    localStorage.setItem('adminCredentials', JSON.stringify(adminData));

    // Update display
    document.getElementById('adminEmail').textContent = adminData.email;

    // Close modal and reset form
    this.reset();
    closeModal('editProfileModal');

    addActivity('Updated admin profile');
    alert('Profile updated successfully! Please use new credentials for next login.');
});

// Render Faculty
async function renderFaculty() {
    const grid = document.getElementById('facultyGrid');
    const facultyData = await AdminAPI.getFaculty();

    if (facultyData.length === 0) {
        grid.innerHTML = `
            <p style="text-align: center; color: #94a3b8; padding: 2rem; grid-column: 1/-1;">
                No faculty members added yet. Click "Add Faculty" to get started.
            </p>
        `;
        return;
    }

    grid.innerHTML = facultyData.map(member => `
        <div class="glass-card">
            <div style="text-align:center;margin-bottom:1rem;">
                <img src="${member.image || 'images/faculty/default.jpg'}" alt="${member.name}"
                    style="width:120px;height:120px;border-radius:50%;border:3px solid #3b82f6;object-fit:cover;">
            </div>
            <h4 style="text-align:center;color:#3b82f6;margin-bottom:0.5rem;">${member.name}</h4>
            <p style="text-align:center;color:#8b5cf6;font-size:0.9rem;margin-bottom:0.5rem;">${member.designation}</p>
            <p style="text-align:center;color:#94a3b8;font-size:0.85rem;margin-bottom:1rem;">${member.qualification || ''}</p>
            <p style="text-align:center;color:#94a3b8;font-size:0.85rem;margin-bottom:1rem;">${member.specialization || ''}</p>
            ${member.email ? `<p style="text-align:center;font-size:0.8rem;"><i class="fas fa-envelope" style="color:#3b82f6;"></i> ${member.email}</p>` : ''}
            ${member.phone ? `<p style="text-align:center;font-size:0.8rem;"><i class="fas fa-phone" style="color:#10b981;"></i> ${member.phone}</p>` : ''}
            <div style="display:flex;justify-content:center;gap:0.5rem;margin-top:1rem;">
                <button class="btn-icon" onclick="editFaculty('${member._id || member.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteFaculty('${member._id || member.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Render Placements
function renderPlacements() {
    const tbody = document.getElementById('placementsTableBody');

    if (placements.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 2rem; color: #94a3b8;">
                    No placement records yet. Click "Add Placement" to get started.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = placements.map(placement => `
        <tr>
            <td>${placement.studentName}</td>
            <td>${placement.rollNumber}</td>
            <td>${placement.company}</td>
            <td>${placement.year}</td>
            <td>
                <button class="btn-icon" onclick="editPlacement(${placement.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deletePlacement(${placement.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render Gallery
async function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    const galleryData = await AdminAPI.getGallery();

    if (galleryData.length === 0) {
        grid.innerHTML = `
            <p style="text-align: center; color: #94a3b8; padding: 2rem; grid-column: 1/-1;">
                No images in gallery yet. Click "Add Image" to get started.
            </p>
        `;
        return;
    }

    // Category display names
    const categoryNames = {
        'events': 'Events & Activities',
        'workshops': 'Workshops & Seminars',
        'industrial-visits': 'Industrial Visits',
        'guest-lectures': 'Guest Lectures',
        'competitions': 'Competitions & Hackathons',
        'celebrations': 'Celebrations & Festivals',
        'farewell': 'Farewell & Convocation',
        'sports': 'Sports & Cultural',
        'labs': 'Laboratories',
        'infrastructure': 'Infrastructure',
        'news': 'News & Media',
        'achievements': 'Achievements & Awards'
    };

    grid.innerHTML = galleryData.map(item => `
        <div class="glass-card" style="padding:0;overflow:hidden;">
            <img src="${item.image}" alt="${item.title}" style="width:100%;height:200px;object-fit:cover;">
            <div style="padding:1rem;">
                <h4 style="color:#3b82f6;margin-bottom:0.5rem;font-size:1rem;">${item.title}</h4>
                <span style="display:inline-block;background:rgba(139,92,246,0.2);color:#8b5cf6;padding:0.25rem 0.75rem;border-radius:20px;font-size:0.75rem;font-weight:600;margin-bottom:0.5rem;">
                    ${categoryNames[item.category] || item.category}
                </span>
                <p style="color:#94a3b8;font-size:0.8rem;margin-bottom:1rem;margin-top:0.5rem;">${new Date(item.date).toLocaleDateString()}</p>
                <div style="display:flex;justify-content:center;gap:0.5rem;">
                    <button class="btn-icon" onclick="editGallery('${item._id || item.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-danger" onclick="deleteGallery('${item._id || item.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

async function deleteGallery(id) {
    if (confirm('Are you sure you want to delete this gallery item?')) {
        await AdminAPI.deleteGallery(id);
        await renderGallery();
        await updateStats();
        addActivity('Deleted a gallery item');
    }
}

// Render News
function renderNews() {
    const tbody = document.getElementById('newsTableBody');

    if (news.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 2rem; color: #94a3b8;">
                    No news items yet. Click "Add News" to get started.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = news.map(item => `
        <tr>
            <td>${item.title}</td>
            <td>${new Date(item.date).toLocaleDateString()}</td>
            <td><span class="badge">${item.category}</span></td>
            <td>
                <button class="btn-icon" onclick="editNews(${item.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteNews(${item.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render Messages
async function renderMessages() {
    const tbody = document.getElementById('messagesTableBody');
    const messagesData = await AdminAPI.getMessages();

    if (messagesData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 2rem; color: #94a3b8;">
                    No messages yet.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = messagesData.map(msg => `
        <tr style="${!msg.read ? 'background: rgba(59, 130, 246, 0.05); font-weight: 600;' : ''}">
            <td>${msg.name}</td>
            <td><a href="mailto:${msg.email}" style="color: #3b82f6;">${msg.email}</a></td>
            <td>${msg.subject}</td>
            <td>${new Date(msg.timestamp || msg.date).toLocaleDateString()}</td>
            <td>
                <button class="btn-icon" onclick="viewMessage('${msg._id || msg.id}')" title="View Message">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteMessage('${msg._id || msg.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

async function viewMessage(id) {
    const messagesData = await AdminAPI.getMessages();
    const msg = messagesData.find(m => (m.id && m.id == id) || (m._id && m._id == id));
    if (!msg) return;

    // Mark as read
    if (!msg.read) {
        await AdminAPI.markMessageAsRead(id);
        await renderMessages();
        await updateStats();
    }

    alert(`From: ${msg.name} (${msg.email})\nPhone: ${msg.phone || 'N/A'}\nSubject: ${msg.subject}\nDate: ${new Date(msg.timestamp || msg.date).toLocaleDateString()}\n\nMessage:\n${msg.message}`);
}

async function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        await AdminAPI.deleteMessage(id);
        await renderMessages();
        await updateStats();
    }
}

// Edit Faculty
async function editFaculty(id) {
    const facultyData = await AdminAPI.getFaculty();
    const member = facultyData.find(f => (f._id && f._id == id) || (f.id && f.id == id));
    if (!member) return;

    currentEditingFacultyId = id;

    // Fill form
    document.getElementById('facultyName').value = member.name;
    document.getElementById('facultyDesignation').value = member.designation;
    document.getElementById('facultyQualification').value = member.qualification || '';
    document.getElementById('facultySpecialization').value = member.specialization || '';
    document.getElementById('facultyEmail').value = member.email || '';
    document.getElementById('facultyPhone').value = member.phone || '';
    document.getElementById('facultyImage').value = member.image || '';

    // Show existing image preview
    if (member.image) {
        document.getElementById('facultyImageName').textContent = 'Current image';
        const preview = document.getElementById('facultyImagePreview');
        preview.style.display = 'block';
        preview.querySelector('img').src = member.image;
    }

    // Change modal title
    document.querySelector('#addFacultyModal .modal-header h2').textContent = 'Edit Faculty';
    document.querySelector('#addFacultyModal button[type="submit"]').textContent = 'Update Faculty';

    document.getElementById('addFacultyModal').classList.add('active');
}

const addFacultyFormHandler = async function (e) {
    e.preventDefault();

    const facultyData = {
        name: document.getElementById('facultyName').value,
        designation: document.getElementById('facultyDesignation').value,
        qualification: document.getElementById('facultyQualification').value,
        specialization: document.getElementById('facultySpecialization').value,
        email: document.getElementById('facultyEmail').value,
        phone: document.getElementById('facultyPhone').value,
        image: document.getElementById('facultyImage').value || 'images/faculty/default.jpg'
    };

    if (currentEditingFacultyId) {
        // Edit mode - PUT request to MongoDB
        try {
            await API.faculty.update(currentEditingFacultyId, facultyData);
            addActivity('Updated faculty member: ' + facultyData.name);
            alert('Faculty member updated successfully!');
        } catch(err) {
            alert('Error updating faculty. Please try again.');
        }
        currentEditingFacultyId = null;
    } else {
        // Add mode
        await AdminAPI.addFaculty(facultyData);
        addActivity('Added new faculty member: ' + facultyData.name);
        alert('Faculty member added successfully!');
    }

    this.reset();
    closeModal('addFacultyModal');
    await renderFaculty();
};

// Add Faculty Form
document.getElementById('addFacultyForm').addEventListener('submit', addFacultyFormHandler);

// Add Placement Form
document.getElementById('addPlacementForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (currentEditingPlacementId) {
        // Edit mode
        const placement = placements.find(p => p.id === currentEditingPlacementId);
        placement.studentName = document.getElementById('studentName').value;
        placement.rollNumber = document.getElementById('rollNumber').value;
        placement.company = document.getElementById('company').value;
        placement.year = document.getElementById('placementYear').value;

        saveData();
        addActivity('Updated placement: ' + placement.studentName);
        alert('Placement updated successfully!');
        currentEditingPlacementId = null;
    } else {
        // Add mode
        const placement = {
            id: Date.now(),
            studentName: document.getElementById('studentName').value,
            rollNumber: document.getElementById('rollNumber').value,
            company: document.getElementById('company').value,
            year: document.getElementById('placementYear').value,
            createdAt: new Date().toISOString()
        };

        placements.push(placement);
        saveData();
        addActivity('Added new placement record: ' + placement.studentName);
        alert('Placement record added successfully!');
    }

    this.reset();
    closeModal('addPlacementModal');
    renderPlacements();
});

// Add Gallery Form
document.getElementById('addGalleryForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const galleryData = {
        title: document.getElementById('galleryTitle').value,
        category: document.getElementById('galleryCategory').value,
        image: document.getElementById('galleryImage').value || document.getElementById('galleryImageUrl').value,
        date: document.getElementById('galleryDate').value
    };

    if (currentEditingGalleryId) {
        // Edit mode - update in MongoDB
        try {
            await API.gallery.update(currentEditingGalleryId, galleryData);
            addActivity('Updated gallery image: ' + galleryData.title);
            alert('Gallery image updated successfully!');
        } catch(e) {
            alert('Updated locally only.');
        }
        currentEditingGalleryId = null;
    } else {
        // Add mode
        await AdminAPI.addGallery(galleryData);
        addActivity('Added new gallery image: ' + galleryData.title);
        alert('Gallery image added successfully!');
    }

    this.reset();
    closeModal('addGalleryModal');
    await renderGallery();
    await updateStats();
});

// Add News Form
document.getElementById('addNewsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (currentEditingNewsId) {
        // Edit mode
        const item = news.find(n => n.id === currentEditingNewsId);
        item.title = document.getElementById('newsTitle').value;
        item.date = document.getElementById('newsDate').value;
        item.category = document.getElementById('newsCategory').value;
        item.description = document.getElementById('newsDescription').value;
        item.image = document.getElementById('newsImage').value;

        saveData();
        addActivity('Updated news: ' + item.title);
        alert('News updated successfully!');
        currentEditingNewsId = null;
    } else {
        // Add mode
        const newsItem = {
            id: Date.now(),
            title: document.getElementById('newsTitle').value,
            date: document.getElementById('newsDate').value,
            category: document.getElementById('newsCategory').value,
            description: document.getElementById('newsDescription').value,
            image: document.getElementById('newsImage').value,
            createdAt: new Date().toISOString()
        };

        news.push(newsItem);
        saveData();
        updateStats();
        addActivity('Added new news: ' + newsItem.title);
        alert('News added successfully!');
    }

    this.reset();
    closeModal('addNewsModal');
    renderNews();
});

// Delete Functions
async function deleteFaculty(id) {
    if (confirm('Are you sure you want to delete this faculty member?')) {
        await AdminAPI.deleteFaculty(id);
        await renderFaculty();
        addActivity('Deleted a faculty member');
    }
}

function deletePlacement(id) {
    if (confirm('Are you sure you want to delete this placement record?')) {
        placements = placements.filter(placement => placement.id !== id);
        saveData();
        renderPlacements();
        addActivity('Deleted a placement record');
    }
}

function deleteNews(id) {
    if (confirm('Are you sure you want to delete this news item?')) {
        const item = news.find(n => n.id === id);
        news = news.filter(n => n.id !== id);
        saveData();
        renderNews();
        updateStats();
        addActivity('Deleted news: ' + (item ? item.title : 'Unknown'));
    }
}

function editPlacement(id) {
    const placement = placements.find(p => p.id === id);
    if (!placement) return;

    currentEditingPlacementId = id;

    document.getElementById('studentName').value = placement.studentName;
    document.getElementById('rollNumber').value = placement.rollNumber;
    document.getElementById('company').value = placement.company;
    document.getElementById('placementYear').value = placement.year;

    document.querySelector('#addPlacementModal .modal-header h2').textContent = 'Edit Placement';
    document.querySelector('#addPlacementModal button[type="submit"]').textContent = 'Update Placement';

    document.getElementById('addPlacementModal').classList.add('active');
}

async function editGallery(id) {
    // Fetch latest gallery from API
    const galleryData = await AdminAPI.getGallery();
    const item = galleryData.find(g => (g._id && g._id == id) || (g.id && g.id == id));
    if (!item) return;

    currentEditingGalleryId = id;

    document.getElementById('galleryTitle').value = item.title;
    document.getElementById('galleryCategory').value = item.category;
    document.getElementById('galleryImage').value = item.image;
    document.getElementById('galleryImageUrl').value = item.image;
    document.getElementById('galleryDate').value = item.date;

    // Show existing image preview
    if (item.image) {
        document.getElementById('galleryImageName').textContent = 'Current image';
        const preview = document.getElementById('galleryImagePreview');
        preview.style.display = 'block';
        preview.querySelector('img').src = item.image;
        document.getElementById('galleryImageFile').removeAttribute('required');
        document.getElementById('galleryImage').removeAttribute('required');
    }

    document.querySelector('#addGalleryModal .modal-header h2').textContent = 'Edit Gallery Image';
    document.querySelector('#addGalleryModal button[type="submit"]').textContent = 'Update Image';
    document.getElementById('addGalleryModal').classList.add('active');
}

function editNews(id) {
    const item = news.find(n => n.id === id);
    if (!item) return;

    currentEditingNewsId = id;

    document.getElementById('newsTitle').value = item.title;
    document.getElementById('newsDate').value = item.date;
    document.getElementById('newsCategory').value = item.category;
    document.getElementById('newsDescription').value = item.description;
    document.getElementById('newsImage').value = item.image || '';

    // Show existing image preview
    if (item.image) {
        document.getElementById('newsImageName').textContent = 'Current image';
        const preview = document.getElementById('newsImagePreview');
        preview.style.display = 'block';
        preview.querySelector('img').src = item.image;
    }

    document.querySelector('#addNewsModal .modal-header h2').textContent = 'Edit News';
    document.querySelector('#addNewsModal button[type="submit"]').textContent = 'Update News';

    document.getElementById('addNewsModal').classList.add('active');
}

// Initialize
async function initDashboard() {
    // Initialize API
    await AdminAPI.init();
    
    // Load and render all data
    await updateStats();
    renderEvents();
    await renderFaculty();
    renderPlacements();
    await renderGallery();
    renderNews();
    await renderMessages();
    await renderAnnouncements();
    
    console.log('Admin Dashboard Loaded');
    console.log('API Status:', AdminAPI.isAPIAvailable ? 'Connected to MongoDB' : 'Using localStorage');
    console.log('Developer: Bhupesh Indurkar');
}

// ===== ANNOUNCEMENTS =====
function showAddAnnouncementModal() {
    document.getElementById('addAnnouncementForm').reset();
    document.getElementById('addAnnouncementModal').classList.add('active');
}

async function renderAnnouncements() {
    const tbody = document.getElementById('announcementsTableBody');
    const data = await API.announcements.getAll();

    // Also fetch inactive ones for admin view - use a separate call
    let allData = data;
    try {
        const res = await fetch('https://tgpcet-it-department.onrender.com/api/announcements/all');
        if (res.ok) allData = await res.json();
    } catch(e) { /* use active only */ }

    if (!allData || allData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:#94a3b8;">No announcements yet.</td></tr>`;
        return;
    }

    const typeColors = { info: '#3b82f6', warning: '#f59e0b', success: '#10b981', danger: '#ef4444' };

    tbody.innerHTML = allData.map(ann => `
        <tr>
            <td style="font-weight:600;">${ann.title}</td>
            <td style="color:#94a3b8;max-width:300px;">${ann.message.substring(0, 80)}${ann.message.length > 80 ? '...' : ''}</td>
            <td><span style="background:${typeColors[ann.type] || '#3b82f6'}22;color:${typeColors[ann.type] || '#3b82f6'};padding:0.25rem 0.75rem;border-radius:20px;font-size:0.8rem;font-weight:600;">${ann.type.toUpperCase()}</span></td>
            <td><span style="color:${ann.active ? '#10b981' : '#94a3b8'};font-weight:600;">${ann.active ? '🟢 Active' : '⚫ Inactive'}</span></td>
            <td>
                <button class="btn-icon" onclick="toggleAnnouncement('${ann._id}')" title="${ann.active ? 'Deactivate' : 'Activate'}">
                    <i class="fas fa-${ann.active ? 'eye-slash' : 'eye'}"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteAnnouncement('${ann._id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

async function toggleAnnouncement(id) {
    await API.announcements.toggle(id);
    await renderAnnouncements();
}

async function deleteAnnouncement(id) {
    if (confirm('Delete this announcement?')) {
        await API.announcements.delete(id);
        await renderAnnouncements();
        addActivity('Deleted an announcement');
    }
}

document.getElementById('addAnnouncementForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = {
        title: document.getElementById('annTitle').value,
        message: document.getElementById('annMessage').value,
        type: document.getElementById('annType').value,
        active: true
    };
    await API.announcements.add(data);
    addActivity('Added announcement: ' + data.title);
    alert('Announcement published! It will show as popup on home page.');
    this.reset();
    closeModal('addAnnouncementModal');
    await renderAnnouncements();
});

// Start initialization
initDashboard();

// Save initial data to localStorage if not exists
if (!localStorage.getItem('events') || !localStorage.getItem('faculty') ||
    !localStorage.getItem('placements') || !localStorage.getItem('gallery') ||
    !localStorage.getItem('news')) {
    saveData();
    console.log('Initial data saved to localStorage');
}

// Add some CSS for badges and buttons
const style = document.createElement('style');
style.textContent = `
    .badge {
        padding: 0.25rem 0.75rem;
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        border-radius: 20px;
        font-size: 0.85rem;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
    }
    
    .status-upcoming {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
    }
    
    .status-ongoing {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }
    
    .status-completed {
        background: rgba(139, 92, 246, 0.1);
        color: #8b5cf6;
    }
    
    .btn-icon {
        background: none;
        border: none;
        color: #3b82f6;
        cursor: pointer;
        padding: 0.5rem;
        font-size: 1rem;
        transition: all 0.3s ease;
    }
    
    .btn-icon:hover {
        color: #2563eb;
    }
    
    .btn-danger {
        color: #ef4444;
    }
    
    .btn-danger:hover {
        color: #dc2626;
    }
    
    .activity-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .activity-item:last-child {
        border-bottom: none;
    }
`;
document.head.appendChild(style);

console.log('Admin Dashboard Loaded');
console.log('Developer: Bhupesh Indurkar');



// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');

if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Close sidebar when nav item clicked on mobile
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}
