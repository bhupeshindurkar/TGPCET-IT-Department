/* ===================================
   Smart AI-like Chatbot for TGPCET
   Enhanced with NLP-like features
   =================================== */

// Enhanced getBotResponse with AI-like understanding
function getSmartBotResponse(message) {
    const msg = message.toLowerCase().trim();
    
    // Remove common words for better matching
    const cleanMsg = msg.replace(/\b(the|a|an|is|are|can|you|please|tell|me|about|what|how|when|where|why)\b/g, '').trim();
    
    // Calculate similarity score for better matching
    function similarity(str1, str2) {
        const words1 = str1.split(' ');
        const words2 = str2.split(' ');
        let matches = 0;
        words1.forEach(word => {
            if (words2.some(w => w.includes(word) || word.includes(w))) matches++;
        });
        return matches / Math.max(words1.length, words2.length);
    }
    
    // Context-aware responses
    const responses = {
        // Career & Domain queries
        career: {
            keywords: ['career', 'domain', 'field', 'specialization', 'choose', 'select', 'best', 'future', 'scope', 'opportunity'],
            response: () => '🚀 <strong>IT Career Domains (2025 Trending):</strong><br><br>' +
                   '1️⃣ <strong>AI & Machine Learning</strong> - ⭐⭐⭐⭐⭐ | 6-15 LPA<br>' +
                   '2️⃣ <strong>Cloud & DevOps</strong> - ⭐⭐⭐⭐⭐ | 5-12 LPA<br>' +
                   '3️⃣ <strong>Cybersecurity</strong> - ⭐⭐⭐⭐⭐ | 5-10 LPA<br>' +
                   '4️⃣ <strong>Full Stack Web Dev</strong> - ⭐⭐⭐⭐ | 4-10 LPA<br>' +
                   '5️⃣ <strong>Data Science</strong> - ⭐⭐⭐⭐ | 5-12 LPA<br>' +
                   '6️⃣ <strong>IoT & Embedded</strong> - ⭐⭐⭐ | 4-9 LPA<br>' +
                   '7️⃣ <strong>Mobile Development</strong> - ⭐⭐⭐⭐ | 4-10 LPA<br>' +
                   '8️⃣ <strong>Blockchain & Web3</strong> - ⭐⭐⭐ | 6-15 LPA<br><br>' +
                   '💡 Ask about any domain for details!'
        },
        
        // AI/ML specific
        ai: {
            keywords: ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'ml', 'deep', 'neural', 'tensorflow', 'python'],
            response: () => '🤖 <strong>AI & Machine Learning</strong><br><br>' +
                   '<strong>Why Choose?</strong> Highest paying, future-proof<br>' +
                   '<strong>Skills:</strong> Python, TensorFlow, PyTorch, Neural Networks<br>' +
                   '<strong>Jobs:</strong> ML Engineer (8-15L), Data Scientist (6-12L)<br>' +
                   '<strong>Companies:</strong> Google, Microsoft, Amazon, TCS<br>' +
                   '🎓 We have AI/ML Lab! <a href="infrastructure.html" style="color:#60a5fa;">View</a>'
        },
        
        // General questions
        help: {
            keywords: ['help', 'assist', 'support', 'guide', 'confused', 'dont know', 'what can'],
            response: () => '💡 <strong>I can help you with:</strong><br><br>' +
                   '🚀 <strong>Career Guidance</strong> - Which IT domain to choose?<br>' +
                   '📚 <strong>Academics</strong> - Courses, Syllabus, Programs<br>' +
                   '🎓 <strong>Admissions</strong> - Process, Eligibility, Fees<br>' +
                   '💼 <strong>Placements</strong> - Companies, Packages<br>' +
                   '🏢 <strong>Infrastructure</strong> - Labs, Facilities<br>' +
                   '👥 <strong>Faculty</strong> - Professors, Expertise<br>' +
                   '📞 <strong>Contact</strong> - HOD, Department Info<br><br>' +
                   'Just ask me anything!'
        }
    };
    
    // Check for matches
    for (let category in responses) {
        const keywords = responses[category].keywords;
        const matchCount = keywords.filter(kw => msg.includes(kw) || cleanMsg.includes(kw)).length;
        if (matchCount > 0) {
            return responses[category].response();
        }
    }
    
    // Fallback to original function
    return null;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getSmartBotResponse };
}
