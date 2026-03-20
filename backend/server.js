// TGPCET IT Department - Backend API Server
// Developer: Bhupesh Indurkar
// Deploy on: Render.com

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;

// Gemini AI Setup
const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'AIzaSyCnKIPwwP0JoX3BPXR_kDKVtW-nSp9kD4M' });

const SYSTEM_INSTRUCTION = `You are the IT Assistant for the Department of Information Technology at TGPCET (Tulsiramji Gaikwad-Patil College of Engineering and Technology), Nagpur.

LANGUAGE RULE (MOST IMPORTANT):
- If user writes in Hindi or Hinglish → reply FULLY in Hindi/Hinglish
- If user writes in English → reply in English
- NEVER switch language unless user switches first
- Match the user's exact tone and language style

DEPARTMENT INFO:
- HOD: Prof. Abhay Rewatkar | hod.it@tgpcet.com | +91 97660 85909
- NBA Accredited B.Tech IT Program | Established: 2007 | Intake: 60/year
- 9 Advanced Labs, 10 Faculty Members | NAAC A+ Grade
- Location: Mohgaon, Wardha Road, Nagpur - 441108
- Placements: 69+ students placed at TCS, Infosys, Hexaware, Genpact, Wipro, Cognizant
- Upcoming Event: TECH-XION 2.0 on 27 & 28 March 2026
- Website: https://tgpcet-it-department.vercel.app

IT CAREER GUIDANCE (answer confidently, not just "detect AI"):
- IT mein bahut saari fields hain: Web Development, AI/ML, Cloud Computing, Cybersecurity, Data Science, Mobile App Dev, IoT, Blockchain
- Har field mein jobs hain - Web Dev mein bhi, AI mein bhi, Cloud mein bhi
- Fresher ke liye best: Web Development (React, Node.js) ya Cloud (AWS) - jaldi job milti hai
- AI/ML mein scope bahut zyada hai lekin thoda advanced hai
- Cybersecurity mein demand bahut hai aur salary bhi achhi hai
- Agar user pooche "IT mein kya hai" ya "IT mein jobs" → specific fields batao with job roles and salary range

BEHAVIOR:
- Be helpful, friendly, and direct
- Give practical career advice, not vague answers
- If asked about IT jobs/career in Hindi → answer in Hindi with specific details
- Never say "I am just an AI" - give real useful answers
- Keep responses concise but informative`;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schemas
const gallerySchema = new mongoose.Schema({
    title: String,
    category: String,
    image: String,
    date: String,
    timestamp: { type: Date, default: Date.now }
});

const newsSchema = new mongoose.Schema({
    title: String,
    date: String,
    category: String,
    description: String,
    image: String,
    timestamp: { type: Date, default: Date.now }
});

const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    type: String,
    description: String,
    status: String,
    resourcePerson: String,
    designation: String,
    timestamp: { type: Date, default: Date.now }
});

const placementSchema = new mongoose.Schema({
    studentName: String,
    rollNumber: String,
    company: String,
    year: String,
    timestamp: { type: Date, default: Date.now }
});

const facultySchema = new mongoose.Schema({
    name: String,
    designation: String,
    qualification: String,
    specialization: String,
    email: String,
    phone: String,
    experience: String,
    image: String,
    timestamp: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

const announcementSchema = new mongoose.Schema({
    title: String,
    message: String,
    image: String,
    link: String,
    type: { type: String, default: 'info' },
    active: { type: Boolean, default: true },
    timestamp: { type: Date, default: Date.now }
});

// Models
const Gallery = mongoose.model('Gallery', gallerySchema);
const News = mongoose.model('News', newsSchema);
const Event = mongoose.model('Event', eventSchema);
const Placement = mongoose.model('Placement', placementSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
const Message = mongoose.model('Message', messageSchema);
const Announcement = mongoose.model('Announcement', announcementSchema);

// Routes

// Health Check
app.get('/', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'TGPCET IT Department API Server',
        developer: 'Bhupesh Indurkar'
    });
});

// Gallery Routes
app.get('/api/gallery', async (req, res) => {
    try {
        const images = await Gallery.find().sort({ timestamp: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/gallery', async (req, res) => {
    try {
        const newImage = new Gallery(req.body);
        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/gallery/:id', async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/gallery/:id', async (req, res) => {
    try {
        const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// News Routes
app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find().sort({ timestamp: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/news', async (req, res) => {
    try {
        const newNews = new News(req.body);
        await newNews.save();
        res.status(201).json(newNews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/news/:id', async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Events Routes
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ timestamp: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/events', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Placements Routes
app.get('/api/placements', async (req, res) => {
    try {
        const placements = await Placement.find().sort({ year: -1 });
        res.json(placements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/placements', async (req, res) => {
    try {
        const newPlacement = new Placement(req.body);
        await newPlacement.save();
        res.status(201).json(newPlacement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/placements/:id', async (req, res) => {
    try {
        await Placement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Placement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Faculty Routes
app.get('/api/faculty', async (req, res) => {
    try {
        const faculty = await Faculty.find().sort({ timestamp: -1 });
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/faculty', async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        await newFaculty.save();
        res.status(201).json(newFaculty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/faculty/:id', async (req, res) => {
    try {
        await Faculty.findByIdAndDelete(req.params.id);
        res.json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/faculty/:id', async (req, res) => {
    try {
        const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Messages Routes
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/messages/:id/read', async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Announcements Routes
app.get('/api/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.find({ active: true }).sort({ timestamp: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/announcements/all', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ timestamp: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/announcements', async (req, res) => {
    try {
        const newAnn = new Announcement(req.body);
        await newAnn.save();
        res.status(201).json(newAnn);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/announcements/:id', async (req, res) => {
    try {
        await Announcement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Announcement deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/announcements/:id/toggle', async (req, res) => {
    try {
        const ann = await Announcement.findById(req.params.id);
        ann.active = !ann.active;
        await ann.save();
        res.json(ann);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Gemini AI Chat Route
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message required' });

        const response = await genai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: message,
            config: { systemInstruction: SYSTEM_INSTRUCTION }
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('Gemini error:', error);
        res.status(500).json({ reply: 'Sorry, AI service unavailable. Please try again.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}`);
});
