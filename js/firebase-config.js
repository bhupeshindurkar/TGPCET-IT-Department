// Firebase Configuration for TGPCET IT Department
// Developer: Bhupesh Indurkar

// Firebase configuration object
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "YOUR_DATABASE_URL"
};

// Initialize Firebase
let app, db, storage;

try {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    storage = firebase.storage();
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Firebase Database Helper Functions
const FirebaseDB = {
    // Gallery Functions
    async addGalleryImage(imageData) {
        try {
            const docRef = await db.collection('gallery').add({
                ...imageData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ Gallery image added:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('❌ Error adding gallery image:', error);
            throw error;
        }
    },

    async getGalleryImages() {
        try {
            const snapshot = await db.collection('gallery').orderBy('timestamp', 'desc').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('❌ Error getting gallery images:', error);
            return [];
        }
    },

    async deleteGalleryImage(id) {
        try {
            await db.collection('gallery').doc(id).delete();
            console.log('✅ Gallery image deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting gallery image:', error);
            throw error;
        }
    },

    // News Functions
    async addNews(newsData) {
        try {
            const docRef = await db.collection('news').add({
                ...newsData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ News added:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('❌ Error adding news:', error);
            throw error;
        }
    },

    async getNews() {
        try {
            const snapshot = await db.collection('news').orderBy('timestamp', 'desc').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('❌ Error getting news:', error);
            return [];
        }
    },

    async deleteNews(id) {
        try {
            await db.collection('news').doc(id).delete();
            console.log('✅ News deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting news:', error);
            throw error;
        }
    },

    // Events Functions
    async addEvent(eventData) {
        try {
            const docRef = await db.collection('events').add({
                ...eventData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ Event added:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('❌ Error adding event:', error);
            throw error;
        }
    },

    async getEvents() {
        try {
            const snapshot = await db.collection('events').orderBy('timestamp', 'desc').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('❌ Error getting events:', error);
            return [];
        }
    },

    async deleteEvent(id) {
        try {
            await db.collection('events').doc(id).delete();
            console.log('✅ Event deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting event:', error);
            throw error;
        }
    },

    // Placements Functions
    async addPlacement(placementData) {
        try {
            const docRef = await db.collection('placements').add({
                ...placementData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ Placement added:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('❌ Error adding placement:', error);
            throw error;
        }
    },

    async getPlacements() {
        try {
            const snapshot = await db.collection('placements').orderBy('year', 'desc').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('❌ Error getting placements:', error);
            return [];
        }
    },

    async deletePlacement(id) {
        try {
            await db.collection('placements').doc(id).delete();
            console.log('✅ Placement deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting placement:', error);
            throw error;
        }
    },

    // Messages Functions
    async addMessage(messageData) {
        try {
            const docRef = await db.collection('messages').add({
                ...messageData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                read: false
            });
            console.log('✅ Message added:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('❌ Error adding message:', error);
            throw error;
        }
    },

    async getMessages() {
        try {
            const snapshot = await db.collection('messages').orderBy('timestamp', 'desc').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('❌ Error getting messages:', error);
            return [];
        }
    },

    async deleteMessage(id) {
        try {
            await db.collection('messages').doc(id).delete();
            console.log('✅ Message deleted:', id);
        } catch (error) {
            console.error('❌ Error deleting message:', error);
            throw error;
        }
    },

    async markMessageAsRead(id) {
        try {
            await db.collection('messages').doc(id).update({ read: true });
            console.log('✅ Message marked as read:', id);
        } catch (error) {
            console.error('❌ Error marking message as read:', error);
            throw error;
        }
    },

    // Storage Functions (for image uploads)
    async uploadImage(file, folder = 'gallery') {
        try {
            const timestamp = Date.now();
            const fileName = `${folder}/${timestamp}_${file.name}`;
            const storageRef = storage.ref(fileName);
            
            const snapshot = await storageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            
            console.log('✅ Image uploaded:', downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('❌ Error uploading image:', error);
            throw error;
        }
    },

    async deleteImage(imageUrl) {
        try {
            const storageRef = storage.refFromURL(imageUrl);
            await storageRef.delete();
            console.log('✅ Image deleted from storage');
        } catch (error) {
            console.error('❌ Error deleting image:', error);
            throw error;
        }
    }
};

// Export for use in other files
window.FirebaseDB = FirebaseDB;
