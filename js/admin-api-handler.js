// Admin Dashboard API Handler
// Handles both MongoDB API and localStorage fallback
// Developer: Bhupesh Indurkar

const AdminAPI = {
    // Check if API is available
    isAPIAvailable: false,

    // Initialize with 5 second timeout
    async init() {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch('https://tgpcet-it-department.onrender.com/', { signal: controller.signal });
            clearTimeout(timeout);
            if (response.ok) {
                this.isAPIAvailable = true;
                console.log('✅ MongoDB API connected');
            }
        } catch (error) {
            console.warn('⚠️ API timeout/unavailable, using localStorage');
            this.isAPIAvailable = false;
        }
    },

    // Gallery Methods
    async getGallery() {
        if (this.isAPIAvailable) {
            try {
                const data = await API.gallery.getAll();
                if (data && data.length > 0) {
                    // Save to localStorage as backup
                    localStorage.setItem('gallery', JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.error('API error, falling back to localStorage:', error);
            }
        }
        // Fallback to localStorage
        return JSON.parse(localStorage.getItem('gallery')) || [];
    },

    async addGallery(data) {
        if (this.isAPIAvailable) {
            try {
                const result = await API.gallery.add(data);
                // Also save to localStorage as backup
                const gallery = JSON.parse(localStorage.getItem('gallery')) || [];
                gallery.push({ ...data, id: result._id || Date.now() });
                localStorage.setItem('gallery', JSON.stringify(gallery));
                return result;
            } catch (error) {
                console.error('API error, saving to localStorage only');
            }
        }
        // Fallback to localStorage
        const gallery = JSON.parse(localStorage.getItem('gallery')) || [];
        const newItem = { ...data, id: Date.now() };
        gallery.push(newItem);
        localStorage.setItem('gallery', JSON.stringify(gallery));
        return newItem;
    },

    async deleteGallery(id) {
        if (this.isAPIAvailable) {
            try {
                await API.gallery.delete(id);
            } catch (error) {
                console.error('API error:', error);
            }
        }
        // Also delete from localStorage
        let gallery = JSON.parse(localStorage.getItem('gallery')) || [];
        gallery = gallery.filter(item => item.id != id && item._id != id);
        localStorage.setItem('gallery', JSON.stringify(gallery));
    },

    // Messages Methods
    async getMessages() {
        if (this.isAPIAvailable) {
            try {
                const data = await API.messages.getAll();
                if (data && Array.isArray(data)) {
                    localStorage.setItem('messages', JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.error('API error, falling back to localStorage:', error);
            }
        }
        return JSON.parse(localStorage.getItem('messages')) || [];
    },

    async deleteMessage(id) {
        if (this.isAPIAvailable) {
            try {
                await API.messages.delete(id);
            } catch (error) {
                console.error('API error:', error);
            }
        }
        // Also delete from localStorage
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages = messages.filter(msg => msg.id != id && msg._id != id);
        localStorage.setItem('messages', JSON.stringify(messages));
    },

    async markMessageAsRead(id) {
        if (this.isAPIAvailable) {
            try {
                await API.messages.markAsRead(id);
            } catch (error) {
                console.error('API error:', error);
            }
        }
        // Also update localStorage
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        const msg = messages.find(m => m.id == id || m._id == id);
        if (msg) {
            msg.read = true;
            msg.isRead = true;
            localStorage.setItem('messages', JSON.stringify(messages));
        }
    },

    // News Methods
    async getNews() {
        if (this.isAPIAvailable) {
            try {
                const data = await API.news.getAll();
                if (data && data.length > 0) {
                    localStorage.setItem('news', JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.error('API error, falling back to localStorage:', error);
            }
        }
        return JSON.parse(localStorage.getItem('news')) || [];
    },

    async addNews(data) {
        if (this.isAPIAvailable) {
            try {
                const result = await API.news.add(data);
                // Also save to localStorage
                const news = JSON.parse(localStorage.getItem('news')) || [];
                news.push({ ...data, id: result._id || Date.now() });
                localStorage.setItem('news', JSON.stringify(news));
                return result;
            } catch (error) {
                console.error('API error, saving to localStorage only');
            }
        }
        // Fallback
        const news = JSON.parse(localStorage.getItem('news')) || [];
        const newItem = { ...data, id: Date.now() };
        news.push(newItem);
        localStorage.setItem('news', JSON.stringify(news));
        return newItem;
    },

    async deleteNews(id) {
        if (this.isAPIAvailable) {
            try {
                await API.news.delete(id);
            } catch (error) {
                console.error('API error:', error);
            }
        }
        let news = JSON.parse(localStorage.getItem('news')) || [];
        news = news.filter(item => item.id != id && item._id != id);
        localStorage.setItem('news', JSON.stringify(news));
    },

    // Events Methods
    async getEvents() {
        if (this.isAPIAvailable) {
            try {
                const data = await API.events.getAll();
                if (data && data.length > 0) {
                    localStorage.setItem('events', JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.error('API error, falling back to localStorage:', error);
            }
        }
        return JSON.parse(localStorage.getItem('events')) || [];
    },

    async addEvent(data) {
        if (this.isAPIAvailable) {
            try {
                const result = await API.events.add(data);
                const events = JSON.parse(localStorage.getItem('events')) || [];
                events.push({ ...data, id: result._id || Date.now() });
                localStorage.setItem('events', JSON.stringify(events));
                return result;
            } catch (error) {
                console.error('API error, saving to localStorage only');
            }
        }
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const newItem = { ...data, id: Date.now() };
        events.push(newItem);
        localStorage.setItem('events', JSON.stringify(events));
        return newItem;
    },

    async deleteEvent(id) {
        if (this.isAPIAvailable) {
            try {
                await API.events.delete(id);
            } catch (error) {
                console.error('API error:', error);
            }
        }
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.filter(item => item.id != id && item._id != id);
        localStorage.setItem('events', JSON.stringify(events));
    },

    // Placements Methods
    async getPlacements() {
        if (this.isAPIAvailable) {
            try {
                const data = await API.placements.getAll();
                if (data && data.length > 0) {
                    localStorage.setItem('placements', JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.error('API error, falling back to localStorage:', error);
            }
        }
        return JSON.parse(localStorage.getItem('placements')) || [];
    },

    async addPlacement(data) {
        if (this.isAPIAvailable) {
            try {
                const result = await API.placements.add(data);
                const placements = JSON.parse(localStorage.getItem('placements')) || [];
                placements.push({ ...data, id: result._id || Date.now() });
                localStorage.setItem('placements', JSON.stringify(placements));
                return result;
            } catch (error) {
                console.error('API error, saving to localStorage only');
            }
        }
        const placements = JSON.parse(localStorage.getItem('placements')) || [];
        const newItem = { ...data, id: Date.now() };
        placements.push(newItem);
        localStorage.setItem('placements', JSON.stringify(placements));
        return newItem;
    },

    async deletePlacement(id) {
        if (this.isAPIAvailable) {
            try {
                await API.placements.delete(id);
            } catch (error) {
                console.error('API error:', error);
            }
        }
        let placements = JSON.parse(localStorage.getItem('placements')) || [];
        placements = placements.filter(item => item.id != id && item._id != id);
        localStorage.setItem('placements', JSON.stringify(placements));
    },

    // Faculty Methods
    async getFaculty() {
        if (this.isAPIAvailable) {
            try {
                const data = await API.faculty.getAll();
                if (data && data.length > 0) {
                    localStorage.setItem('faculty', JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.error('API error, falling back to localStorage:', error);
            }
        }
        return JSON.parse(localStorage.getItem('faculty')) || [];
    },

    async addFaculty(data) {
        if (this.isAPIAvailable) {
            try {
                const result = await API.faculty.add(data);
                const faculty = JSON.parse(localStorage.getItem('faculty')) || [];
                faculty.push({ ...data, id: result._id || Date.now() });
                localStorage.setItem('faculty', JSON.stringify(faculty));
                return result;
            } catch (error) {
                console.error('API error, saving to localStorage only');
            }
        }
        const faculty = JSON.parse(localStorage.getItem('faculty')) || [];
        const newItem = { ...data, id: Date.now() };
        faculty.push(newItem);
        localStorage.setItem('faculty', JSON.stringify(faculty));
        return newItem;
    },

    async deleteFaculty(id) {
        if (this.isAPIAvailable) {
            try {
                await API.faculty.delete(id);
            } catch (error) {
                console.error('API error:', error);
            }
        }
        let faculty = JSON.parse(localStorage.getItem('faculty')) || [];
        faculty = faculty.filter(item => item.id != id && item._id != id);
        localStorage.setItem('faculty', JSON.stringify(faculty));
    }
};

// Initialize on load
window.AdminAPI = AdminAPI;
