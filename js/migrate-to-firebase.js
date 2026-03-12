// Migration Script: localStorage to Firebase
// Run this once after Firebase setup to migrate existing data
// Developer: Bhupesh Indurkar

async function migrateLocalStorageToFirebase() {
    console.log('🔄 Starting migration from localStorage to Firebase...');
    
    try {
        // Check if Firebase is initialized
        if (typeof FirebaseDB === 'undefined') {
            throw new Error('Firebase not initialized. Please add Firebase SDK first.');
        }

        let migrated = {
            gallery: 0,
            news: 0,
            events: 0,
            placements: 0,
            messages: 0
        };

        // Migrate Gallery
        const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
        for (const item of gallery) {
            await FirebaseDB.addGalleryImage(item);
            migrated.gallery++;
        }
        console.log(`✅ Migrated ${migrated.gallery} gallery images`);

        // Migrate News
        const news = JSON.parse(localStorage.getItem('news') || '[]');
        for (const item of news) {
            await FirebaseDB.addNews(item);
            migrated.news++;
        }
        console.log(`✅ Migrated ${migrated.news} news items`);

        // Migrate Events
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        for (const item of events) {
            await FirebaseDB.addEvent(item);
            migrated.events++;
        }
        console.log(`✅ Migrated ${migrated.events} events`);

        // Migrate Placements
        const placements = JSON.parse(localStorage.getItem('placements') || '[]');
        for (const item of placements) {
            await FirebaseDB.addPlacement(item);
            migrated.placements++;
        }
        console.log(`✅ Migrated ${migrated.placements} placements`);

        // Migrate Messages
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        for (const item of messages) {
            await FirebaseDB.addMessage(item);
            migrated.messages++;
        }
        console.log(`✅ Migrated ${migrated.messages} messages`);

        console.log('✅ Migration completed successfully!');
        console.log('📊 Summary:', migrated);
        
        // Ask user if they want to clear localStorage
        if (confirm('Migration successful! Do you want to clear localStorage data? (Recommended)')) {
            localStorage.removeItem('gallery');
            localStorage.removeItem('news');
            localStorage.removeItem('events');
            localStorage.removeItem('placements');
            localStorage.removeItem('messages');
            console.log('✅ localStorage cleared');
        }

        alert('Migration completed! Check console for details.');
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
        alert('Migration failed! Check console for details.');
    }
}

// Auto-run migration if URL has ?migrate=true
if (window.location.search.includes('migrate=true')) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (confirm('Do you want to migrate localStorage data to Firebase?')) {
                migrateLocalStorageToFirebase();
            }
        }, 2000);
    });
}

// Export function for manual use
window.migrateToFirebase = migrateLocalStorageToFirebase;
