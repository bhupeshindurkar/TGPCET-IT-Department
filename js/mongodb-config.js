// MongoDB Atlas Configuration for TGPCET IT Department
// Developer: Bhupesh Indurkar
// Using MongoDB Realm Web SDK for browser-based access

// MongoDB Realm App Configuration
const MONGODB_CONFIG = {
    appId: "YOUR_REALM_APP_ID", // Will be provided after setup
    dataSource: "Cluster0",
    database: "tgpcet_it_dept",
    collections: {
        gallery: "gallery",
        news: "news",
        events: "events",
        placements: "placements",
        messages: "messages"
    }
};

// Initialize MongoDB Realm
let app, mongodb, db;

async function initializeMongoDB() {
    try {
        // Initialize Realm App
        app = new Realm.App({ id: MONGODB_CONFIG.appId });
        
        // Anonymous login (no authentication required for public access)
        const credentials = Realm.Credentials.anonymous();
        const user = await app.logIn(credentials);
        
        // Get MongoDB service
        mongodb = user.mongoClient("mongodb-atlas");
        db = mongodb.db(MONGODB_CONFIG.database);
        
        console.log('✅ MongoDB initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ MongoDB initialization error:', error);
        return false;
    }
}

// MongoDB Database Helper Functions
const MongoDB = {
    // Gallery Functions
    async addGalleryImage(imageData) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.gallery);
            const result = await collection.insertOne({
                ...imageData,
                timestamp: new Date(),
                _id: new Date().getTime().toString()
            });
            console.log('✅ Gallery image added:', result.insertedId);
            return result.insertedId;
        } catch (error) {
            console.error('❌ Error adding gallery image:', error);
            throw error;
        }
    },

    async getGalleryImages() {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.gallery);
            const images = await collection.find({}, { sort: { timestamp: -1 } });
            return images;
        } catch (error) {
            console.error('❌ Error getting gallery images:', error);
            return [];
        }
    },

    async deleteGalleryImage(id) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.gallery);
            await collection.deleteOne({ _id: id });
            console.log('✅ Gallery image deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting gallery image:', error);
            throw error;
        }
    },

    // News Functions
    async addNews(newsData) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.news);
            const result = await collection.insertOne({
                ...newsData,
                timestamp: new Date(),
                _id: new Date().getTime().toString()
            });
            console.log('✅ News added:', result.insertedId);
            return result.insertedId;
        } catch (error) {
            console.error('❌ Error adding news:', error);
            throw error;
        }
    },

    async getNews() {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.news);
            const news = await collection.find({}, { sort: { timestamp: -1 } });
            return news;
        } catch (error) {
            console.error('❌ Error getting news:', error);
            return [];
        }
    },

    async deleteNews(id) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.news);
            await collection.deleteOne({ _id: id });
            console.log('✅ News deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting news:', error);
            throw error;
        }
    },

    // Events Functions
    async addEvent(eventData) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.events);
            const result = await collection.insertOne({
                ...eventData,
                timestamp: new Date(),
                _id: new Date().getTime().toString()
            });
            console.log('✅ Event added:', result.insertedId);
            return result.insertedId;
        } catch (error) {
            console.error('❌ Error adding event:', error);
            throw error;
        }
    },

    async getEvents() {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.events);
            const events = await collection.find({}, { sort: { timestamp: -1 } });
            return events;
        } catch (error) {
            console.error('❌ Error getting events:', error);
            return [];
        }
    },

    async deleteEvent(id) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.events);
            await collection.deleteOne({ _id: id });
            console.log('✅ Event deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting event:', error);
            throw error;
        }
    },

    // Placements Functions
    async addPlacement(placementData) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.placements);
            const result = await collection.insertOne({
                ...placementData,
                timestamp: new Date(),
                _id: new Date().getTime().toString()
            });
            console.log('✅ Placement added:', result.insertedId);
            return result.insertedId;
        } catch (error) {
            console.error('❌ Error adding placement:', error);
            throw error;
        }
    },

    async getPlacements() {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.placements);
            const placements = await collection.find({}, { sort: { year: -1 } });
            return placements;
        } catch (error) {
            console.error('❌ Error getting placements:', error);
            return [];
        }
    },

    async deletePlacement(id) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.placements);
            await collection.deleteOne({ _id: id });
            console.log('✅ Placement deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting placement:', error);
            throw error;
        }
    },

    // Messages Functions
    async addMessage(messageData) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.messages);
            const result = await collection.insertOne({
                ...messageData,
                timestamp: new Date(),
                read: false,
                _id: new Date().getTime().toString()
            });
            console.log('✅ Message added:', result.insertedId);
            return result.insertedId;
        } catch (error) {
            console.error('❌ Error adding message:', error);
            throw error;
        }
    },

    async getMessages() {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.messages);
            const messages = await collection.find({}, { sort: { timestamp: -1 } });
            return messages;
        } catch (error) {
            console.error('❌ Error getting messages:', error);
            return [];
        }
    },

    async deleteMessage(id) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.messages);
            await collection.deleteOne({ _id: id });
            console.log('✅ Message deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting message:', error);
            throw error;
        }
    },

    async markMessageAsRead(id) {
        try {
            const collection = db.collection(MONGODB_CONFIG.collections.messages);
            await collection.updateOne(
                { _id: id },
                { $set: { read: true } }
            );
            console.log('✅ Message marked as read:', id);
        } catch (error) {
            console.error('❌ Error marking message as read:', error);
            throw error;
        }
    }
};

// Auto-initialize on load
window.addEventListener('load', async () => {
    await initializeMongoDB();
});

// Export for use in other files
window.MongoDB = MongoDB;
window.initializeMongoDB = initializeMongoDB;
