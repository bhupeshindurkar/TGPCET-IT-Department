// Enhanced IT Assistant with Career Guidance
// This file contains the career domain responses

function getCareerGuidance() {
    return '🚀 <strong>IT Career Domains (2025 Trending):</strong><br><br>' +
           '1️⃣ <strong>AI & Machine Learning</strong> - Demand: ⭐⭐⭐⭐⭐ | Salary: 6-15 LPA<br>' +
           '2️⃣ <strong>Cloud Computing & DevOps</strong> - Demand: ⭐⭐⭐⭐⭐ | Salary: 5-12 LPA<br>' +
           '3️⃣ <strong>Cybersecurity</strong> - Demand: ⭐⭐⭐⭐⭐ | Salary: 5-10 LPA<br>' +
           '4️⃣ <strong>Full Stack Development</strong> - Demand: ⭐⭐⭐⭐ | Salary: 4-10 LPA<br>' +
           '5️⃣ <strong>Data Science</strong> - Demand: ⭐⭐⭐⭐ | Salary: 5-12 LPA<br>' +
           '6️⃣ <strong>IoT & Embedded</strong> - Demand: ⭐⭐⭐ | Salary: 4-9 LPA<br>' +
           '7️⃣ <strong>Mobile Development</strong> - Demand: ⭐⭐⭐⭐ | Salary: 4-10 LPA<br>' +
           '8️⃣ <strong>Blockchain & Web3</strong> - Demand: ⭐⭐⭐ | Salary: 6-15 LPA<br><br>' +
           '💡 Type domain name for detailed info! (e.g., "AI", "Cloud", "Cybersecurity")';
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getCareerGuidance };
}
