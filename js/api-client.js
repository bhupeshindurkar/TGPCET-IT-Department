// API Client for TGPCET IT Department
// Developer: Bhupesh Indurkar
// Connects to Render.com backend

// API Base URL - Render deployment
const API_BASE_URL = 'https://tgpcet-it-department.onrender.com/api';

// API Client
const API = {
    // Gallery API
    gallery: {
        async getAll() {
            try {
                const response = await fetch(`${API_BASE_URL}/gallery`);
                return await response.json();
            } catch (error) {
                console.error('Error fetching gallery:', error);
                return [];
            }
        },

        async add(imageData) {
            try {
                const response = await fetch(`${API_BASE_URL}/gallery`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(imageData)
                });
                return await response.json();
            } catch (error) {
                console.error('Error adding image:', error);
                throw error;
            }
        },

        async delete(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
                    method: 'DELETE'
                });
                return await response.json();
            } catch (error) {
                console.error('Error deleting image:', error);
                throw error;
            }
        }
    },

    // News API
    news: {
        async getAll() {
            try {
                const response = await fetch(`${API_BASE_URL}/news`);
                return await response.json();
            } catch (error) {
                console.error('Error fetching news:', error);
                return [];
            }
        },

        async add(newsData) {
            try {
                const response = await fetch(`${API_BASE_URL}/news`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newsData)
                });
                return await response.json();
            } catch (error) {
                console.error('Error adding news:', error);
                throw error;
            }
        },

        async delete(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/news/${id}`, {
                    method: 'DELETE'
                });
                return await response.json();
            } catch (error) {
                console.error('Error deleting news:', error);
                throw error;
            }
        }
    },

    // Events API
    events: {
        async getAll() {
            try {
                const response = await fetch(`${API_BASE_URL}/events`);
                return await response.json();
            } catch (error) {
                console.error('Error fetching events:', error);
                return [];
            }
        },

        async add(eventData) {
            try {
                const response = await fetch(`${API_BASE_URL}/events`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eventData)
                });
                return await response.json();
            } catch (error) {
                console.error('Error adding event:', error);
                throw error;
            }
        },

        async delete(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/events/${id}`, {
                    method: 'DELETE'
                });
                return await response.json();
            } catch (error) {
                console.error('Error deleting event:', error);
                throw error;
            }
        }
    },

    // Placements API
    placements: {
        async getAll() {
            try {
                const response = await fetch(`${API_BASE_URL}/placements`);
                return await response.json();
            } catch (error) {
                console.error('Error fetching placements:', error);
                return [];
            }
        },

        async add(placementData) {
            try {
                const response = await fetch(`${API_BASE_URL}/placements`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(placementData)
                });
                return await response.json();
            } catch (error) {
                console.error('Error adding placement:', error);
                throw error;
            }
        },

        async delete(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/placements/${id}`, {
                    method: 'DELETE'
                });
                return await response.json();
            } catch (error) {
                console.error('Error deleting placement:', error);
                throw error;
            }
        }
    },

    // Faculty API
    faculty: {
        async getAll() {
            try {
                const response = await fetch(`${API_BASE_URL}/faculty`);
                return await response.json();
            } catch (error) {
                console.error('Error fetching faculty:', error);
                return [];
            }
        },

        async add(facultyData) {
            try {
                const response = await fetch(`${API_BASE_URL}/faculty`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(facultyData)
                });
                return await response.json();
            } catch (error) {
                console.error('Error adding faculty:', error);
                throw error;
            }
        },

        async delete(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
                    method: 'DELETE'
                });
                return await response.json();
            } catch (error) {
                console.error('Error deleting faculty:', error);
                throw error;
            }
        }
    },

    // Messages API
    messages: {
        async getAll() {
            try {
                const response = await fetch(`${API_BASE_URL}/messages`);
                return await response.json();
            } catch (error) {
                console.error('Error fetching messages:', error);
                return [];
            }
        },

        async add(messageData) {
            try {
                const response = await fetch(`${API_BASE_URL}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(messageData)
                });
                return await response.json();
            } catch (error) {
                console.error('Error adding message:', error);
                throw error;
            }
        },

        async delete(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
                    method: 'DELETE'
                });
                return await response.json();
            } catch (error) {
                console.error('Error deleting message:', error);
                throw error;
            }
        },

        async markAsRead(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/messages/${id}/read`, {
                    method: 'PATCH'
                });
                return await response.json();
            } catch (error) {
                console.error('Error marking message as read:', error);
                throw error;
            }
        }
    }
};

// Export for use in other files
window.API = API;

// Test API connection on load
window.addEventListener('load', async () => {
    try {
        const response = await fetch(API_BASE_URL.replace('/api', ''));
        const data = await response.json();
        if (data.status === 'OK') {
            console.log('✅ API Connected:', data.message);
        }
    } catch (error) {
        console.warn('⚠️ API not connected. Using localStorage fallback.');
    }
});
