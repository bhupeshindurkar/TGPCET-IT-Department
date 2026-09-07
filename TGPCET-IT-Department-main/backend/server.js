// TGPCET IT Department - Backend API Server
// Powered 100% by Supabase (PostgreSQL, Auth, Storage) & Google Gemini AI
// Developer: Bhupesh Indurkar

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { supabase } = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

// Gemini AI Setup
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `You are a helpful AI assistant on the TGPCET IT Department website. Answer any question the user asks directly and clearly.

LANGUAGE RULE:
- User Hindi/Hinglish mein likhe → Hindi/Hinglish mein jawab do
- User English mein likhe → English mein jawab do
- Always match the user's language

TGPCET IT DEPARTMENT CONTEXT (use when relevant):
- College: Tulsiramji Gaikwad-Patil College of Engineering & Technology, Nagpur
- HOD: Prof. Abhay Rewatkar | hod.it@tgpcet.com | +91 97660 85909
- NBA Accredited B.Tech IT | Established 2007 | 60 seats/year | NAAC A+
- 9 Labs, 10 Faculty | Placements: 134 students placed (2021-24) at TCS, Infosys, Wipro, Hexaware, Genpact, Reliance Jio, Nitor Infotech, Accenture, Persistent
- Event: TECH-XION 2.0 on 27-28 March 2026 (Hackathon, BGMI, Escape Room)
- Website: https://tgpcet-it-department.vercel.app

RULES:
- Answer every question directly - no restrictions
- Give complete, useful answers
- Be conversational and friendly
- Keep it concise, no unnecessary filler text`;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'TGPCET IT Department API Server - 100% Supabase Powered',
        database: 'Supabase PostgreSQL',
        developer: 'Bhupesh Indurkar'
    });
});

// ==============================================================================
// 1. GALLERY ENDPOINTS (Supabase)
// ==============================================================================
app.get('/api/gallery', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/gallery', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('gallery')
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/gallery/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('gallery')
            .update(req.body)
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/gallery/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('gallery')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==============================================================================
// 2. NEWS & ANNOUNCEMENTS ENDPOINTS (Supabase)
// ==============================================================================
app.get('/api/news', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/news', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('news')
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/news/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('news')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==============================================================================
// 3. EVENTS ENDPOINTS (Supabase)
// ==============================================================================
app.get('/api/events', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/events', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==============================================================================
// 4. PLACEMENTS ENDPOINTS (Supabase)
// ==============================================================================
app.get('/api/placements', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('placements')
            .select('*')
            .order('year', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/placements', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('placements')
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/placements/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('placements')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Placement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==============================================================================
// 5. FACULTY ENDPOINTS (Supabase)
// ==============================================================================
app.get('/api/faculty', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('faculty')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/faculty', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('faculty')
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/faculty/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('faculty')
            .update(req.body)
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/faculty/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('faculty')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==============================================================================
// 6. MESSAGES / CONTACT INQUIRIES ENDPOINTS (Supabase)
// ==============================================================================
app.get('/api/messages', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/messages/:id/read', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .update({ read: true, status: 'read' })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==============================================================================
// 7. ANNOUNCEMENTS ENDPOINTS (Supabase)
// ==============================================================================
app.get('/api/announcements', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('announcements')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/announcements/all', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('announcements')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/announcements', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('announcements')
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/announcements/:id/toggle', async (req, res) => {
    try {
        // Fetch current active status
        const { data: current, error: fetchErr } = await supabase
            .from('announcements')
            .select('active')
            .eq('id', req.params.id)
            .single();

        if (fetchErr) throw fetchErr;

        const { data, error } = await supabase
            .from('announcements')
            .update({ active: !current.active })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/announcements/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('announcements')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Announcement deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==============================================================================
// 8. OPPORTUNITIES & APPLICATIONS ENDPOINTS (Supabase)
// ==============================================================================
app.get('/api/opportunities', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('opportunities')
            .select('*, profiles:created_by (full_name, email, role)')
            .eq('status', 'active')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/opportunities/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('opportunities')
            .select('*, profiles:created_by (full_name, email, role)')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/opportunities', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('opportunities')
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/applications', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('applications')
            .insert([req.body])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==============================================================================
// 9. AI CHATBOT ROUTE (OpenRouter & Google Gemini Support)
// ==============================================================================
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        if (!message) return res.status(400).json({ error: 'Message required' });

        const openRouterKey = process.env.OPENROUTER_API_KEY;
        const geminiKey = process.env.GEMINI_API_KEY;

        // 1. Try OpenRouter first if OPENROUTER_API_KEY is configured
        if (openRouterKey && !openRouterKey.includes('your_openrouter') && openRouterKey.trim() !== '') {
            try {
                const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';

                const messages = [
                    { role: 'system', content: SYSTEM_INSTRUCTION }
                ];

                if (Array.isArray(history)) {
                    history.forEach(h => {
                        if (h.role && h.content) messages.push(h);
                    });
                }

                messages.push({ role: 'user', content: message });

                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${openRouterKey}`,
                        'HTTP-Referer': 'https://tgpcet-it-department.vercel.app',
                        'X-Title': 'TGPCET IT Department Chatbot',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: messages,
                        temperature: 0.7,
                        max_tokens: 1000
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const reply = data.choices?.[0]?.message?.content;
                    if (reply) {
                        return res.json({ reply, provider: 'openrouter', model });
                    }
                } else {
                    const errBody = await response.text();
                    console.warn('OpenRouter API error response:', errBody);
                }
            } catch (orError) {
                console.error('OpenRouter request error:', orError.message);
            }
        }

        // 2. Fallback to Gemini if GEMINI_API_KEY is available
        if (geminiKey && geminiKey !== 'your_gemini_api_key' && geminiKey.trim() !== '') {
            try {
                const model = genai.getGenerativeModel({
                    model: 'gemini-2.0-flash',
                    systemInstruction: SYSTEM_INSTRUCTION
                });
                const result = await model.generateContent(message);
                const reply = result.response.text();
                return res.json({ reply, provider: 'gemini' });
            } catch (geminiError) {
                console.error('Gemini error:', geminiError.message);
            }
        }

        // 3. Smart Rule-Based Engine (Instant TGPCET IT Domain Answers)
        const msg = message.toLowerCase();
        const isHindi = /(kya|hai|hain|kaise|kaisa|kaisi|batao|bata|bhai|yaar|kitna|kab|kahan|kyun|chahiye|milega|mujhe|mera|aap|tum)/i.test(message);

        let reply = '';

        if (msg.includes('hod') || msg.includes('head') || msg.includes('abhay') || msg.includes('rewatkar')) {
            reply = isHindi 
                ? `👨‍🏫 **IT Department ke HOD:** **Prof. Abhay Rewatkar** hain.<br>📧 **Email:** hod.it@tgpcet.com<br>📞 **Contact:** +91 97660 85909<br>🏢 **Office:** IT Department, Ground Floor, TGPCET Nagpur.`
                : `👨‍🏫 **Head of IT Department:** **Prof. Abhay Rewatkar**<br>📧 **Email:** hod.it@tgpcet.com<br>📞 **Phone:** +91 97660 85909<br>🏢 **Location:** IT Department, TGPCET Nagpur.`;
        } else if (msg.includes('placement') || msg.includes('package') || msg.includes('company') || msg.includes('tcs') || msg.includes('infosys') || msg.includes('wipro')) {
            reply = isHindi
                ? `💼 **TGPCET IT Placements Highlights:**<br>• **134+ Students Placed** (2021-24 batches).<br>• **Top Recruiters:** TCS, Infosys, Wipro, Hexaware, Genpact, Reliance Jio, Nitor Infotech, Persistent, Accenture.<br>• **Highest Package:** Up to 10-12 LPA.<br>• View all placement records on the [Placements Page](placements.html).`
                : `💼 **TGPCET IT Placement Highlights:**<br>• **134+ students placed** (2021-24) across leading tech companies.<br>• **Top Recruiters:** TCS, Infosys, Wipro, Hexaware, Genpact, Reliance Jio, Nitor Infotech, Persistent, Accenture.<br>• Detailed records are available on our [Placements Page](placements.html).`;
        } else if (msg.includes('techxion') || msg.includes('tech-xion') || msg.includes('event') || msg.includes('hackathon') || msg.includes('bgmi') || msg.includes('27 march') || msg.includes('28 march')) {
            reply = `🎉 **TECH-XION 2.0 2K26 (National Technical Event):**<br>📅 **Dates:** 27 & 28 March 2026<br>📍 **Venue:** TGPCET Nagpur Campus<br>⚡ **Events:** 9-Hour Hackathon (Hack Arena), BGMI & Free Fire (Battle Royale), Escape Room (Cipher Chase), Poster Presentation (Idea Canvas), Box Cricket (PowerPlay).<br>📞 **Coordinator:** Prof. Jayesh Fating (+91 97636 43881)`;
        } else if (msg.includes('lab') || msg.includes('infrastructure') || msg.includes('facility')) {
            reply = `🖥️ **IT Department Labs & Facilities:**<br>• 9 State-of-the-Art Computer Labs with 100+ High-End PCs.<br>• Dedicated AI/ML & Data Science Lab, Cloud Computing Lab, and IoT Hardware Lab.<br>• High-Speed 1 Gbps Leased Line Internet connectivity.`;
        } else if (msg.includes('admission') || msg.includes('eligibility') || msg.includes('seat') || msg.includes('intake')) {
            reply = `🎓 **B.Tech Information Technology Admissions:**<br>• **Intake:** 60 Seats / Year (NBA Accredited, NAAC A+).<br>• **Eligibility:** 10+2 with PCM + MHT-CET / JEE Main score.<br>• Direct Second Year (DSE) lateral entry available for Diploma holders.`;
        } else if (msg.includes('faculty') || msg.includes('teacher') || msg.includes('professor') || msg.includes('staff')) {
            reply = `👥 **IT Department Faculty:**<br>• 10+ highly qualified and experienced professors & assistant professors with specializations in AI/ML, Cloud Computing, Cybersecurity, and Software Engineering.`;
        } else {
            reply = isHindi
                ? `Namaste! Main **TGPCET IT Assistant** hoon. Aap mujhse Admissions, Syllabus, Placements, Faculty, HOD, Labs, ya TECH-XION 2.0 event ke baare me kuch bhi pooch sakte hain.`
                : `Hello! I am the **TGPCET IT Assistant**. You can ask me about Admissions, Placements, Faculty, HOD info, Labs, Career Domains, or the upcoming TECH-XION 2.0 event!`;
        }

        res.json({ reply, provider: 'smart-rule-engine' });
    } catch (error) {
        console.error('Chat error:', error.message || error);
        res.status(500).json({ reply: 'Sorry, AI service is temporarily unavailable. Please try again in a moment.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}`);
    console.log(`⚡ Supabase PostgreSQL Backend connected: https://qqzjnylpkftyzishsssa.supabase.co`);
    console.log(`✨ 100% MongoDB-Free!`);
});
