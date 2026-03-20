/* ===================================
   TGPCET IT Department Website
   Developer: Bhupesh Indurkar
   Email: bhupeshindurkar6@gmail.com
   =================================== */

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === MOBILE MENU TOGGLE ===
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// === SCROLL ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .glass-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// === COUNTER ANIMATION ===
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Trigger counter animation when visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// === ACTIVE NAV LINK ===
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// === BACK TO TOP BUTTON ===
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    // Header scroll background
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// === FORM VALIDATION ===
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email');
            return;
        }

        alert('Thank you! Your message has been sent.');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// === LOADING ANIMATION ===
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('TGPCET IT Department Website');
console.log('Developer: Bhupesh Indurkar');
console.log('Email: bhupeshindurkar6@gmail.com');

// === ADMIN DASHBOARD INTEGRATION (DYNAMIC CONTENT) ===
window.addEventListener('DOMContentLoaded', () => {
    // 1. Load Dynamic News & Events
    loadDynamicContent();

    // 2. Intercept Feedback Form for Admin Messages
    const homeForm = document.getElementById('homeFeedbackForm');
    if (homeForm) {
        homeForm.addEventListener('submit', (e) => {
            // We let the form actually submit to formsubmit.co, 
            // but we also save it to localStorage for the Admin Dashboard.
            try {
                const formData = new FormData(homeForm);
                const newMessage = {
                    id: Date.now().toString(),
                    name: formData.get('name') || 'Unknown User',
                    email: formData.get('email') || 'No Email provided',
                    phone: formData.get('phone') || 'N/A',
                    subject: formData.get('category') || 'Feedback',
                    message: formData.get('message') || '',
                    date: new Date().toISOString().split('T')[0],
                    isRead: false
                };

                const messages = JSON.parse(localStorage.getItem('messages') || '[]');
                messages.unshift(newMessage); // add to top
                localStorage.setItem('messages', JSON.stringify(messages));
                console.log('Message saved to Admin Dashboard');
            } catch (err) {
                console.error("Error saving message for Admin Dashboard:", err);
            }
        });
    }
});

function loadDynamicContent() {
    const newsContainer = document.getElementById('dynamic-news-container');
    const eventsContainer = document.getElementById('dynamic-events-container');
    const sectionContainer = document.getElementById('news-events-section');

    // Only proceed if we are on the page with these containers
    if (!newsContainer || !eventsContainer || !sectionContainer) return;

    let contentFound = false;

    // Load News
    const news = JSON.parse(localStorage.getItem('news') || '[]');
    if (news.length > 0) {
        contentFound = true;
        newsContainer.innerHTML = news.slice(0, 3).map(item => `
            <div style="padding: 1rem; background: rgba(255,255,255,0.05); border-left: 3px solid #3b82f6; border-radius: 4px; margin-bottom: 0.5rem;">
                <h4 style="color: #e2e8f0; margin-bottom: 0.5rem; font-size: 1.1rem;">${item.title}</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.5rem;">
                    <i class="fas fa-calendar-alt" style="margin-right:0.3rem"></i> ${new Date(item.date).toLocaleDateString()}
                    <span style="margin-left:1rem; padding: 0.1rem 0.5rem; background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-radius: 10px; font-size:0.8rem;">${item.category}</span>
                </p>
                <p style="color: #cbd5e1; font-size: 0.95rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.description}</p>
            </div>
        `).join('');
    } else {
        newsContainer.innerHTML = '<p style="color: #94a3b8; font-style: italic;">No recent news available.</p>';
    }

    // Load Events
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    if (events.length > 0) {
        contentFound = true;
        // Show only 'Upcoming' or the next most recent events
        const upcomingEvents = events.filter(e => e.status === 'Upcoming' || e.status === 'Ongoing');
        const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : events;

        eventsContainer.innerHTML = displayEvents.slice(0, 3).map(item => `
            <div style="padding: 1rem; background: rgba(255,255,255,0.05); border-left: 3px solid #10b981; border-radius: 4px; margin-bottom: 0.5rem;">
                <h4 style="color: #e2e8f0; margin-bottom: 0.5rem; font-size: 1.1rem;">${item.name}</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.5rem;">
                    <i class="fas fa-calendar-check" style="margin-right:0.3rem"></i> ${new Date(item.date).toLocaleDateString()}
                    <span style="margin-left:1rem; padding: 0.1rem 0.5rem; background: rgba(16, 185, 129, 0.1); color: #10b981; border-radius: 10px; font-size:0.8rem;">${item.type}</span>
                </p>
                <p style="color: #cbd5e1; font-size: 0.95rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.description}</p>
            </div>
        `).join('');
    } else {
        eventsContainer.innerHTML = '<p style="color: #94a3b8; font-style: italic;">No upcoming events available.</p>';
    }

    // Show section if we found dynamic content
    if (contentFound) {
        sectionContainer.style.display = 'block';
    }
}



// === IT ASSISTANT CHATBOT ===
(function() {
    // Create chatbot button
    const chatBtn = document.createElement('div');
    chatBtn.id = 'it-assistant-btn';
    chatBtn.innerHTML = `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-comment-dots"></i>
            <span style="position:absolute;top:-8px;right:-8px;width:16px;height:16px;background:#ef4444;border-radius:50%;border:3px solid #0f172a;animation:pulse 2s infinite;"></span>
        </div>
    `;
    chatBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        z-index: 998;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px rgba(59,130,246,0.5);
        transition: all 0.3s ease;
    `;

    // Create chatbot window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'it-assistant-window';
    chatWindow.style.cssText = `
        position: fixed;
        bottom: 170px;
        right: 30px;
        width: 380px;
        height: 550px;
        background: linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98));
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        z-index: 997;
        display: none;
        flex-direction: column;
        border: 2px solid rgba(59,130,246,0.3);
        overflow: hidden;
    `;

    chatWindow.innerHTML = `
        <div style="padding:1.5rem;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:white;display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:1rem;">
                <div style="width:45px;height:45px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                    <i class="fas fa-robot" style="font-size:1.5rem;"></i>
                </div>
                <div>
                    <h3 style="margin:0;font-size:1.1rem;font-weight:700;">IT Assistant</h3>
                    <p style="margin:0;font-size:0.8rem;opacity:0.9;">Always here to help</p>
                </div>
            </div>
            <button id="close-chat" style="background:none;border:none;color:white;font-size:1.5rem;cursor:pointer;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background 0.3s;">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div id="chat-messages" style="flex:1;padding:1.5rem;overflow-y:auto;display:flex;flex-direction:column;gap:1rem;">
            <div style="background:rgba(59,130,246,0.2);padding:1rem;border-radius:15px;border-left:4px solid #3b82f6;">
                <p style="color:#e2e8f0;margin:0;font-size:0.95rem;line-height:1.6;">
                    👋 Hello! I'm your IT Department Assistant. How can I help you today?
                </p>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.5rem;">
                <button class="quick-reply" data-msg="Which IT domain should I choose?">🚀 Career Guidance</button>
                <button class="quick-reply" data-msg="Tell me about AI and Machine Learning">🤖 AI & ML</button>
                <button class="quick-reply" data-msg="Cloud Computing career">☁️ Cloud & DevOps</button>
                <button class="quick-reply" data-msg="Cybersecurity career">🛡️ Cybersecurity</button>
                <button class="quick-reply" data-msg="Web development career">💻 Web Development</button>
                <button class="quick-reply" data-msg="Data Science career">📊 Data Science</button>
                <button class="quick-reply" data-msg="What courses are offered?">📖 Courses</button>
                <button class="quick-reply" data-msg="Placement information">💼 Placements</button>
            </div>
        </div>
        
        <div style="padding:1rem;background:rgba(30,41,59,0.8);border-top:1px solid rgba(59,130,246,0.3);">
            <div style="display:flex;gap:0.5rem;">
                <input type="text" id="chat-input" placeholder="Type your message..." style="flex:1;padding:0.75rem 1rem;border-radius:25px;border:1px solid rgba(59,130,246,0.3);background:rgba(15,23,42,0.8);color:#e2e8f0;font-size:0.95rem;outline:none;">
                <button id="send-btn" style="width:45px;height:45px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:none;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(chatBtn);
    document.body.appendChild(chatWindow);

    // Toggle chat window
    chatBtn.addEventListener('click', () => {
        const isVisible = chatWindow.style.display === 'flex';
        chatWindow.style.display = isVisible ? 'none' : 'flex';
        chatBtn.style.transform = isVisible ? 'scale(1)' : 'scale(0.9)';
    });

    // Close button
    document.getElementById('close-chat').addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatBtn.style.transform = 'scale(1)';
    });

    // Hover effects
    chatBtn.addEventListener('mouseenter', () => {
        chatBtn.style.transform = 'scale(1.1)';
        chatBtn.style.boxShadow = '0 15px 40px rgba(59,130,246,0.6)';
    });

    chatBtn.addEventListener('mouseleave', () => {
        chatBtn.style.transform = 'scale(1)';
        chatBtn.style.boxShadow = '0 10px 30px rgba(59,130,246,0.5)';
    });

    // Chat functionality
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // Quick replies
    document.querySelectorAll('.quick-reply').forEach(btn => {
        btn.style.cssText = `
            padding: 0.75rem 1rem;
            background: rgba(59,130,246,0.15);
            border: 1px solid rgba(59,130,246,0.3);
            border-radius: 10px;
            color: #60a5fa;
            cursor: pointer;
            text-align: left;
            font-size: 0.9rem;
            transition: all 0.3s;
        `;
        
        btn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(59,130,246,0.25)';
            this.style.borderColor = 'rgba(59,130,246,0.5)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(59,130,246,0.15)';
            this.style.borderColor = 'rgba(59,130,246,0.3)';
        });
        
        btn.addEventListener('click', function() {
            const message = this.getAttribute('data-msg');
            sendMessage(message);
        });
    });

    async function sendMessage(text) {
        if (!text.trim()) return;

        // User message
        const userMsg = document.createElement('div');
        userMsg.style.cssText = 'align-self:flex-end;background:linear-gradient(135deg,#3b82f6,#2563eb);padding:0.75rem 1rem;border-radius:15px;max-width:80%;color:white;';
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Typing indicator
        const typingMsg = document.createElement('div');
        typingMsg.id = 'typing-indicator';
        typingMsg.style.cssText = 'background:rgba(59,130,246,0.2);padding:1rem 1.2rem;border-radius:15px;border-left:4px solid #3b82f6;max-width:85%;display:flex;align-items:center;gap:0.4rem;';
        typingMsg.innerHTML = `
            <span style="display:inline-flex;gap:5px;align-items:center;">
                <span style="width:8px;height:8px;border-radius:50%;background:#60a5fa;animation:typingDot 1.2s infinite ease-in-out;animation-delay:0s;"></span>
                <span style="width:8px;height:8px;border-radius:50%;background:#60a5fa;animation:typingDot 1.2s infinite ease-in-out;animation-delay:0.2s;"></span>
                <span style="width:8px;height:8px;border-radius:50%;background:#60a5fa;animation:typingDot 1.2s infinite ease-in-out;animation-delay:0.4s;"></span>
                <span id="typing-status" style="color:#94a3b8;font-size:0.8rem;margin-left:6px;">Connecting...</span>
            </span>
        `;
        setTimeout(() => { const s = document.getElementById('typing-status'); if (s) s.textContent = 'Waking up server...'; }, 5000);
        setTimeout(() => { const s = document.getElementById('typing-status'); if (s) s.textContent = 'Almost there...'; }, 25000);
        if (!document.getElementById('typing-keyframes')) {
            const style = document.createElement('style');
            style.id = 'typing-keyframes';
            style.textContent = `@keyframes typingDot { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }`;
            document.head.appendChild(style);
        }
        chatMessages.appendChild(typingMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Try Gemini API, fallback to local on failure
        let reply = '';
        try {
            const res = await fetch('https://tgpcet-it-department.onrender.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
                signal: AbortSignal.timeout(60000)
            });
            if (res.ok) {
                const data = await res.json();
                reply = data.reply || getBotResponse(text);
            } else {
                reply = getBotResponse(text);
            }
        } catch (e) {
            reply = getBotResponse(text);
        }

        // Remove typing indicator and show reply
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();

        const botMsg = document.createElement('div');
        botMsg.style.cssText = 'background:rgba(59,130,246,0.2);padding:1rem;border-radius:15px;border-left:4px solid #3b82f6;max-width:85%;';
        botMsg.innerHTML = `<p style="color:#e2e8f0;margin:0;font-size:0.95rem;line-height:1.6;">${reply}</p>`;
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function isHindi(text) {
        // Check for Hindi/Hinglish keywords
        const hindiWords = ['kya','hai','hain','kaise','kaisa','kaisi','mujhe','mera','meri','mere','aap','tum','vo','voh','yeh','ye','nahi','nhi','haan','haa','bhai','yaar','bata','batao','chahiye','karo','karna','milega','milti','milte','accha','acha','theek','thik','sahi','galat','dekho','dekh','sun','suno','bol','bolo','kar','karo','ja','jao','lo','lena','dena','do','dedo','lelo','samjha','samjho','padh','padho','sikho','seekho','jana','aana','rehna','kab','kahan','kyun','kyunki','lekin','aur','ya','toh','to','se','mein','pe','par','ke','ki','ka','ko','ne','wala','wali','wale','bahut','bohat','thoda','zyada','jyada','kam','sab','kuch','koi','kitna','kitne','pehle','baad','abhi','ab','phir','fir','dobara'];
        const lowerText = text.toLowerCase();
        return hindiWords.some(w => lowerText.includes(w));
    }

    function getBotResponse(message) {
        const msg = message.toLowerCase();
        const hindi = isHindi(message);

        // TECH-XION 2.0 Event (Priority check)
        if (msg.includes('techxion') || msg.includes('tech-xion') || msg.includes('tech xion') || msg.includes('hack arena') || msg.includes('hackathon') || msg.includes('bgmi') || msg.includes('free fire') || msg.includes('battle royale') || msg.includes('cipher chase') || msg.includes('idea canvas') || msg.includes('powerplay') || msg.includes('national event') || msg.includes('register') || (msg.includes('event') && !msg.includes('events page'))) {
            return '🎉 <strong>TECH-XION 2.0 2K26</strong><br><br>' +
                   '🏆 <strong>National Level Technical Event</strong><br>' +
                   'IT Department, TGPCET Nagpur<br><br>' +
                   '📅 <strong>27 & 28 March 2026</strong><br>' +
                   '📍 TGPCET, Nagpur<br><br>' +
                   '🗓️ <strong>Day 1 (27 March):</strong><br>' +
                   '⚡ Hack Arena - 9 Hrs Hackathon<br>' +
                   '🏏 Power-Play - Box Cricket<br>' +
                   '🎮 Battle Royale - BGMI & Free Fire<br><br>' +
                   '🗓️ <strong>Day 2 (28 March):</strong><br>' +
                   '🔐 Cipher Chase - Escape Room<br>' +
                   '🎨 Idea Canvas - Poster Presentation<br><br>' +
                   '👨‍🏫 <strong>Coordinator:</strong> Prof. Jayesh Fating | 📞 9763643881<br><br>' +
                   '🔗 <a href="https://informationtechnology-tgpcet.vercel.app/#/events" target="_blank" style="color:#60a5fa;font-weight:bold;">👉 Register Now</a>';
        }
        
        // Developer/Creator Info (Priority check - before other keywords)
        if (msg.includes('who created') || msg.includes('who made') || msg.includes('who built') || msg.includes('who designed') || msg.includes('creator') || msg.includes('developer of this') || (msg.includes('bhupesh') && !msg.includes('contact'))) {
            return '👨‍💻 <strong>Website Developer</strong><br><br>' +
                   '<strong>Bhupesh Indurkar</strong><br>' +
                   '🎓 Full Stack Developer from Nagpur, Maharashtra<br><br>' +
                   '<strong>Expertise:</strong><br>' +
                   '• Java & Spring Boot<br>' +
                   '• Modern Web Technologies<br>' +
                   '• Scalable Applications<br>' +
                   '• Clean Code & Innovative Solutions<br><br>' +
                   '<strong>Experience:</strong><br>' +
                   '✅ 10+ Projects Completed<br>' +
                   '✅ 6+ Internships<br>' +
                   '✅ 15+ Technologies Mastered<br><br>' +
                   '📧 Email: bhupeshindurkar6@gmail.com<br>' +
                   '🌐 Portfolio: <a href="https://bhupesh-indurkar-portfolio.vercel.app/" target="_blank" style="color:#60a5fa;">View Portfolio</a><br>' +
                   '💼 LinkedIn: <a href="https://www.linkedin.com/in/bhupesh-indurkar" target="_blank" style="color:#60a5fa;">Connect</a><br><br>' +
                   '💡 This website was designed & developed by Bhupesh Indurkar for TGPCET IT Department!';
        }
        
        // Career Guidance & Domain Selection
        if (msg.includes('domain') || msg.includes('career') || msg.includes('field') || msg.includes('specialization') || (msg.includes('which') && (msg.includes('choose') || msg.includes('select'))) || (hindi && (msg.includes('konsa') || msg.includes('kaunsa') || msg.includes('kaun sa')))) {
            if (hindi) {
                return 'IT mein bahut saare career options hain:<br><br>' +
                       '<strong>1. Web Development</strong> - React, Node.js - 4-10 LPA<br>' +
                       '<strong>2. AI & Machine Learning</strong> - Python, TensorFlow - 6-15 LPA<br>' +
                       '<strong>3. Cloud Computing</strong> - AWS, Azure - 5-12 LPA<br>' +
                       '<strong>4. Cybersecurity</strong> - Ethical Hacking - 5-10 LPA<br>' +
                       '<strong>5. Data Science</strong> - Python, SQL - 5-12 LPA<br><br>' +
                       'Fresher ke liye Web Development ya Cloud sabse jaldi job dilata hai. Kisi ek ke baare mein aur detail mein batao?';
            }
            return '🚀 <strong>IT Career Domains (2025 Trending):</strong><br><br>' +
                   '1️⃣ <strong>AI & Machine Learning</strong> - ⭐⭐⭐⭐⭐ | 6-15 LPA<br>' +
                   '2️⃣ <strong>Cloud & DevOps</strong> - ⭐⭐⭐⭐⭐ | 5-12 LPA<br>' +
                   '3️⃣ <strong>Cybersecurity</strong> - ⭐⭐⭐⭐⭐ | 5-10 LPA<br>' +
                   '4️⃣ <strong>Full Stack Web Dev</strong> - ⭐⭐⭐⭐ | 4-10 LPA<br>' +
                   '5️⃣ <strong>Data Science</strong> - ⭐⭐⭐⭐ | 5-12 LPA<br>' +
                   '6️⃣ <strong>IoT & Embedded</strong> - ⭐⭐⭐ | 4-9 LPA<br>' +
                   '7️⃣ <strong>Mobile Development</strong> - ⭐⭐⭐⭐ | 4-10 LPA<br>' +
                   '8️⃣ <strong>Blockchain & Web3</strong> - ⭐⭐⭐ | 6-15 LPA<br><br>' +
                   '💡 Ask about any domain for details! (e.g., "AI", "Cloud", "Cyber")';
        }
        
        // AI/ML Domain
        else if (msg.includes('artificial intelligence') || msg.includes('machine learning') || msg.includes('deep learning') || msg.includes(' ml ') || /\bai\b/.test(msg)) {
            return '🤖 <strong>AI & Machine Learning</strong><br><br>' +
                   '<strong>Why Choose?</strong> Highest paying, future-proof<br>' +
                   '<strong>Skills:</strong> Python, TensorFlow, PyTorch, Neural Networks<br>' +
                   '<strong>Jobs:</strong> ML Engineer (8-15L), Data Scientist (6-12L)<br>' +
                   '<strong>Companies:</strong> Google, Microsoft, Amazon, TCS<br>' +
                   '🎓 We have AI/ML Lab! <a href="infrastructure.html" style="color:#60a5fa;">View</a>';
        }
        
        // Cloud Computing
        else if (msg.includes('cloud') || msg.includes('aws') || msg.includes('azure') || msg.includes('devops')) {
            return '☁️ <strong>Cloud Computing & DevOps</strong><br><br>' +
                   '<strong>Why Choose?</strong> Every company needs cloud<br>' +
                   '<strong>Skills:</strong> AWS/Azure, Docker, Kubernetes, CI/CD<br>' +
                   '<strong>Jobs:</strong> Cloud Engineer (5-12L), DevOps (6-14L)<br>' +
                   '<strong>Cert:</strong> AWS Solutions Architect, Azure Admin<br>' +
                   '💼 Regular cloud workshops! <a href="gallery.html" style="color:#60a5fa;">Events</a>';
        }
        
        // Cybersecurity
        else if (msg.includes('cyber') || msg.includes('security') || msg.includes('hacking') || msg.includes('ethical')) {
            return '🛡️ <strong>Cybersecurity</strong><br><br>' +
                   '<strong>Why Choose?</strong> Critical need, job security<br>' +
                   '<strong>Skills:</strong> Ethical Hacking, Network Security, Cryptography<br>' +
                   '<strong>Jobs:</strong> Security Analyst (4-10L), Ethical Hacker (6-15L)<br>' +
                   '<strong>Cert:</strong> CEH, CISSP, CompTIA Security+<br>' +
                   '🔒 Cybersecurity Lab available! <a href="infrastructure.html" style="color:#60a5fa;">View</a>';
        }
        
        // Web Development
        else if (msg.includes('web') || msg.includes('frontend') || msg.includes('backend') || msg.includes('full stack') || msg.includes('react')) {
            return '💻 <strong>Full Stack Web Development</strong><br><br>' +
                   '<strong>Why Choose?</strong> Easy start, freelancing opportunities<br>' +
                   '<strong>Skills:</strong> React, Node.js, MongoDB, REST APIs<br>' +
                   '<strong>Jobs:</strong> Frontend (3-8L), Backend (4-10L), Full Stack (5-12L)<br>' +
                   '<strong>Stack:</strong> MERN/MEAN<br>' +
                   '🎯 MERN workshops at TGPCET! <a href="gallery.html" style="color:#60a5fa;">Events</a>';
        }
        
        // Data Science
        else if (msg.includes('data science') || msg.includes('data analyst') || msg.includes('analytics') || msg.includes('big data')) {
            return '📊 <strong>Data Science & Analytics</strong><br><br>' +
                   '<strong>Why Choose?</strong> Data is the new oil<br>' +
                   '<strong>Skills:</strong> Python, SQL, Pandas, Tableau, Power BI<br>' +
                   '<strong>Jobs:</strong> Data Analyst (4-8L), Data Scientist (6-15L)<br>' +
                   '<strong>Industries:</strong> Finance, Healthcare, E-commerce<br>' +
                   '📈 Data Science Lab! <a href="infrastructure.html" style="color:#60a5fa;">View</a>';
        }
        
        // IoT
        else if (msg.includes('iot') || msg.includes('internet of things') || msg.includes('embedded') || msg.includes('arduino')) {
            return '🔌 <strong>IoT & Embedded Systems</strong><br><br>' +
                   '<strong>Why Choose?</strong> Smart devices everywhere<br>' +
                   '<strong>Skills:</strong> Arduino, Raspberry Pi, Python, C/C++, MQTT<br>' +
                   '<strong>Jobs:</strong> IoT Developer (4-9L), Embedded Engineer (5-10L)<br>' +
                   '<strong>Apps:</strong> Smart Home, Healthcare, Industry 4.0<br>' +
                   '⚡ IoT Lab at TGPCET! <a href="infrastructure.html" style="color:#60a5fa;">View</a>';
        }
        
        // Mobile Development
        else if (msg.includes('mobile') || msg.includes('android') || msg.includes('ios') || msg.includes('app') || msg.includes('flutter')) {
            return '📱 <strong>Mobile App Development</strong><br><br>' +
                   '<strong>Why Choose?</strong> Billions of users, build your own apps<br>' +
                   '<strong>Skills:</strong> Flutter/React Native, Android (Kotlin), iOS (Swift)<br>' +
                   '<strong>Jobs:</strong> Android Dev (4-10L), iOS Dev (5-12L)<br>' +
                   '<strong>Companies:</strong> Google, Amazon, Flipkart, Startups';
        }
        
        // Blockchain
        else if (msg.includes('blockchain') || msg.includes('crypto') || msg.includes('web3') || msg.includes('bitcoin')) {
            return '⛓️ <strong>Blockchain & Web3</strong><br><br>' +
                   '<strong>Why Choose?</strong> Emerging tech, high salaries<br>' +
                   '<strong>Skills:</strong> Solidity, Ethereum, Cryptography, Web3.js<br>' +
                   '<strong>Jobs:</strong> Blockchain Dev (6-15L), Smart Contract Dev (8-18L)<br>' +
                   '<strong>Industries:</strong> Finance, Supply Chain, Gaming';
        }
        
        // Department Info
        if (msg.includes('about') || msg.includes('department') || msg.includes('tgpcet')) {
            return '🎯 <strong>IT Department - TGPCET Nagpur</strong><br>Established in 2007, NBA accredited B.Tech program with 10+ experienced faculty and 9 advanced labs.<br><a href="index.html" style="color:#60a5fa;">Learn more</a>';
        } 
        
        // Courses & Programs
        else if (msg.includes('course') || msg.includes('program') || msg.includes('syllabus') || msg.includes('curriculum')) {
            return '📖 <strong>Programs Offered:</strong><br>• B.Tech in Information Technology (NBA Accredited)<br>• Specializations: AI/ML, Cloud Computing, Data Science<br>• Duration: 4 Years<br><a href="academics.html" style="color:#60a5fa;">View Syllabus</a>';
        }
        
        // Admission Process
        else if (msg.includes('admission') || msg.includes('eligibility') || msg.includes('apply') || msg.includes('entrance')) {
            return '📋 <strong>Admission Process:</strong><br>• Based on MHT-CET scores<br>• Eligibility: 12th with PCM (45% for Open, 40% for Reserved)<br>• Seats: 60 per year<br>• Visit: <a href="https://www.tgpcet.com" target="_blank" style="color:#60a5fa;">www.tgpcet.com</a><br><a href="contact.html" style="color:#60a5fa;">Contact for details</a>';
        }
        
        // Contact & HOD
        else if (msg.includes('contact') || msg.includes('hod') || msg.includes('phone') || msg.includes('email') || msg.includes('address')) {
            return '👤 <strong>Contact Information:</strong><br>HOD: Prof. Abhay Rewatkar<br>✉️ hod.it@tgpcet.com<br>☎️ +91 97660 85909<br>📍 TGPCET, Mohgaon, Wardha Road, Nagpur - 441108<br><a href="contact.html" style="color:#60a5fa;">Contact Page</a>';
        }
        
        // Faculty
        else if (msg.includes('faculty') || msg.includes('teacher') || msg.includes('professor') || msg.includes('staff')) {
            return '👥 <strong>Our Faculty:</strong><br>10 experienced faculty members with Ph.D. and M.Tech qualifications<br>Expertise in: AI/ML, Cloud Computing, Cybersecurity, IoT, Data Science<br><a href="faculty.html" style="color:#60a5fa;">Meet our Faculty</a>';
        }
        
        // Placements
        else if (msg.includes('placement') || msg.includes('job') || msg.includes('company') || msg.includes('package') || msg.includes('salary')) {
            return '🎯 <strong>Placement Highlights:</strong><br>• Top Companies: TCS, Infosys, Wipro, Cognizant, Tech Mahindra<br>• Average Package: 3-4 LPA<br>• Highest Package: 7+ LPA<br>• 70%+ Placement Rate<br><a href="placements.html" style="color:#60a5fa;">View Placements</a>';
        }
        
        // Labs & Infrastructure
        else if (msg.includes('lab') || msg.includes('infrastructure') || msg.includes('facility') || msg.includes('computer')) {
            return '🏢 <strong>Our Labs:</strong><br>• AI & Machine Learning Lab<br>• Cloud Computing Lab<br>• IoT Lab<br>• Cybersecurity Lab<br>• Data Science Lab<br>• Networking Lab<br>• Software Engineering Lab<br>• DBMS Lab<br>• Computer Graphics Lab<br><a href="infrastructure.html" style="color:#60a5fa;">View Labs</a>';
        }
        
        // Events & Activities
        else if (msg.includes('event') || msg.includes('workshop') || msg.includes('seminar') || msg.includes('activity') || msg.includes('competition')) {
            return '📅 <strong>Events & Activities:</strong><br>• Regular workshops on latest technologies<br>• Guest lectures by industry experts<br>• Industrial visits to IT companies<br>• Coding competitions & hackathons<br>• Technical club: ACME Forum<br><a href="gallery.html" style="color:#60a5fa;">View Gallery</a>';
        }
        
        // Gallery
        else if (msg.includes('gallery') || msg.includes('photo') || msg.includes('image') || msg.includes('picture')) {
            return '📷 <strong>Photo Gallery:</strong><br>View photos of events, workshops, labs, industrial visits, and celebrations.<br><a href="gallery.html" style="color:#60a5fa;">Browse Gallery</a>';
        }
        
        // Research
        else if (msg.includes('research') || msg.includes('project') || msg.includes('publication') || msg.includes('paper')) {
            return '🔬 <strong>Research & Projects:</strong><br>• Faculty publications in reputed journals<br>• Student projects on AI/ML, IoT, Cloud Computing<br>• Research collaborations with industries<br><a href="research.html" style="color:#60a5fa;">View Research</a>';
        }
        
        // Fees
        else if (msg.includes('fee') || msg.includes('cost') || msg.includes('tuition') || msg.includes('expense')) {
            return '💰 <strong>Fee Structure:</strong><br>For detailed fee information, please contact:<br>☎️ +91 97660 85909<br>✉️ hod.it@tgpcet.com<br>Or visit: <a href="https://www.tgpcet.com" target="_blank" style="color:#60a5fa;">www.tgpcet.com</a>';
        }
        
        // Scholarship
        else if (msg.includes('scholarship') || msg.includes('financial aid') || msg.includes('loan')) {
            return '🎓 <strong>Scholarships Available:</strong><br>• Government scholarships for eligible students<br>• Merit-based scholarships<br>• EBC/OBC/SC/ST scholarships<br>Contact office for details: +91 97660 85909';
        }
        
        // Location & Transport
        else if (msg.includes('location') || msg.includes('reach') || msg.includes('transport') || msg.includes('bus') || msg.includes('direction')) {
            return '📍 <strong>How to Reach:</strong><br>TGPCET, Mohgaon, Wardha Road, Nagpur - 441108<br>• 15 km from Nagpur Railway Station<br>• Well connected by local buses<br>• College bus facility available<br><a href="contact.html" style="color:#60a5fa;">View Map</a>';
        }
        
        // Hostel
        else if (msg.includes('hostel') || msg.includes('accommodation') || msg.includes('stay') || msg.includes('room')) {
            return '🏠 <strong>Hostel Facilities:</strong><br>Separate hostels for boys and girls available on campus.<br>For details contact: +91 97660 85909<br>Visit: <a href="https://www.tgpcet.com" target="_blank" style="color:#60a5fa;">www.tgpcet.com</a>';
        }
        
        // Library
        else if (msg.includes('library') || msg.includes('book') || msg.includes('journal')) {
            return '📚 <strong>Library Facilities:</strong><br>• Well-stocked central library<br>• Digital library with e-resources<br>• Technical journals and magazines<br>• Study area for students<br>Contact for more info: +91 97660 85909';
        }
        
        // Exam & Results
        else if (msg.includes('exam') || msg.includes('result') || msg.includes('marks') || msg.includes('grade')) {
            return '📝 <strong>Examinations:</strong><br>• Semester system (2 semesters per year)<br>• Internal assessments + End semester exams<br>• Results published on university portal<br>For queries: hod.it@tgpcet.com';
        }
        
        // Greetings (Time-based intelligent responses)
        else if (msg.includes('good morning') || msg.includes('morning')) {
            const hour = new Date().getHours();
            if (hour >= 5 && hour <= 12) {
                return '🌅 <strong>Good Morning!</strong><br>Great to see you starting your day with us! How can I assist you today?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            } else if (hour >= 13 && hour < 17) {
                return '☀️ <strong>Good Afternoon!</strong><br>It\'s afternoon now, but good to hear from you! How can I help you today?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            } else if (hour >= 17 && hour < 21) {
                return '🌆 <strong>Good Evening!</strong><br>It\'s evening now, but I\'m here to help! What would you like to know?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            } else {
                return '🌙 <strong>Good Night!</strong><br>It\'s quite late now! But I\'m always here to help. What can I do for you?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            }
        }
        else if (msg.includes('good afternoon') || msg.includes('afternoon')) {
            const hour = new Date().getHours();
            if (hour >= 13 && hour < 17) {
                return '☀️ <strong>Good Afternoon!</strong><br>Hope you\'re having a productive day! How can I assist you?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            } else if (hour >= 5 && hour < 12) {
                return '🌅 <strong>Good Morning!</strong><br>It\'s still morning! But good to hear from you. How can I help?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            } else if (hour >= 17 && hour < 21) {
                return '🌆 <strong>Good Evening!</strong><br>It\'s evening now! How can I assist you today?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            } else {
                return '🌙 <strong>Good Night!</strong><br>It\'s quite late! But I\'m here to help. What would you like to know?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            }
        }
        else if (msg.includes('good evening') || msg.includes('evening')) {
            const hour = new Date().getHours();
            if (hour >= 17 && hour < 21) {
                return '🌆 <strong>Good Evening!</strong><br>Hope you had a great day! How can I help you this evening?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            } else if (hour >= 5 && hour < 12) {
                return '🌅 <strong>Good Morning!</strong><br>It\'s morning now! But good to hear from you. How can I assist?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            } else if (hour >= 13 && hour < 17) {
                return '☀️ <strong>Good Afternoon!</strong><br>It\'s afternoon! How can I help you today?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            } else {
                return '🌙 <strong>Good Night!</strong><br>It\'s quite late now! But I\'m always here. What can I do for you?<br><br>💡 Ask me about: Career Guidance, Courses, Admissions, or anything else!';
            }
        }
        else if (msg.includes('good night') || msg.includes('goodnight')) {
            const hour = new Date().getHours();
            if (hour >= 21 || hour < 5) {
                return '🌙 <strong>Good Night!</strong><br>It\'s indeed late! Take care and sleep well. Feel free to reach out anytime!<br><br>💤 Sweet dreams! See you tomorrow!';
            } else if (hour >= 5 && hour < 12) {
                return '🌅 <strong>Good Morning!</strong><br>It\'s morning now! But if you\'re going to sleep, have a good rest!<br><br>💡 Or ask me anything if you need help!';
            } else if (hour >= 13 && hour < 17) {
                return '☀️ <strong>Good Afternoon!</strong><br>It\'s afternoon! But if you need to rest, sleep well!<br><br>💡 Or I can help you with anything!';
            } else {
                return '🌆 <strong>Good Evening!</strong><br>It\'s evening! A bit early for sleep, but rest well if you\'re tired!<br><br>💡 Or ask me anything you need!';
            }
        }
        else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('namaste') || msg.includes('bhai') || msg.includes('helo')) {
            if (hindi) {
                return 'Namaste! Main TGPCET IT Department ka AI Assistant hoon. Aap mujhse kuch bhi pooch sakte hain - IT career, courses, placements, ya koi bhi sawaal. Batao kya jaanna chahte ho?';
            }
            return `👋 <strong>Hello!</strong><br><br>` +
                   `Welcome to <strong>TGPCET IT Department</strong>. I'm your intelligent assistant, here to guide you through your academic and career journey.<br><br>` +
                   `<strong>How can I assist you today?</strong><br><br>` +
                   `🚀 <strong>Career Guidance</strong> - Explore IT domains & career paths<br>` +
                   `📚 <strong>Academic Info</strong> - Courses, Syllabus, Admissions<br>` +
                   `💼 <strong>Placements</strong> - Companies, Packages, Success Stories<br>` +
                   `🏢 <strong>Infrastructure</strong> - Labs, Facilities, Resources<br>` +
                   `👥 <strong>Faculty</strong> - Meet our expert professors<br>` +
                   `📞 <strong>Contact</strong> - Get in touch with us<br><br>` +
                   `💡 <em>Simply type your question or choose from quick replies below!</em>`;
        }
        
        // Thanks
        else if (msg.includes('thank') || msg.includes('thanks')) {
            return '😊 You\'re welcome! Feel free to ask if you need any more information. Happy to help!';
        }
        
        // Default - Smart fallback
        else {
            if (hindi) {
                // Casual conversation
                if (msg.includes('kar rahe') || msg.includes('karte ho') || msg.includes('kya ho') || msg.includes('kaisa hai') || msg.includes('kaise ho')) {
                    return 'Main theek hoon, aapki help karne ke liye taiyaar hoon! Batao kya jaanna chahte ho - IT career, courses, placements, ya kuch aur?';
                }
                return 'Samajh gaya! Main IT department ke baare mein, career guidance, placements, courses - sab ke baare mein bata sakta hoon. Thoda aur detail mein poochho!';
            }
            if (msg.includes('?') || msg.includes('how') || msg.includes('what') || msg.includes('why') || msg.includes('when')) {
                return '🤔 <strong>I understand you have a question!</strong><br><br>' +
                       'I can help you with:<br>' +
                       '🚀 <strong>Career Guidance</strong> - IT domains, job roles, salaries<br>' +
                       '📚 <strong>College Info</strong> - Courses, admissions, faculty, placements<br>' +
                       '🏢 <strong>Facilities</strong> - Labs, infrastructure, events<br><br>' +
                       'Try asking:<br>' +
                       '• "Which IT domain should I choose?"<br>' +
                       '• "Tell me about AI and Machine Learning"<br>' +
                       '• "What are the admission requirements?"<br>' +
                       '• "Show me placement companies"<br><br>' +
                       'Or use the quick reply buttons below!';
            } else if (msg.length < 3) {
                return '👋 Hi there! How can I assist you today?<br><br>Try asking about careers, courses, admissions, or anything else!';
            } else {
                return '💡 <strong>I can help you with:</strong><br><br>' +
                       '🚀 <strong>Career Guidance (NEW!)</strong><br>' +
                       'Which IT domain to choose? AI/ML, Cloud, Cybersecurity, Web Dev, Data Science, IoT, Mobile, Blockchain<br><br>' +
                       '📚 <strong>College Info:</strong><br>' +
                       'Courses, Admissions, Faculty, Placements, Labs, Events<br><br>' +
                       'Type "career" or "domain" to explore IT fields!<br>' +
                       'Or ask me anything specific! 😊';
            }
        }
    }

    sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(chatInput.value);
    });

    // Close button hover
    document.getElementById('close-chat').addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255,255,255,0.2)';
    });
    document.getElementById('close-chat').addEventListener('mouseleave', function() {
        this.style.background = 'none';
    });
})();


// === TOP BANNER SEAMLESS SCROLL ===
(function() {
    const banner = document.querySelector('.banner-content');
    if (banner) {
        // Duplicate content for seamless loop
        const content = banner.innerHTML;
        banner.innerHTML = content + content;
    }
})();
