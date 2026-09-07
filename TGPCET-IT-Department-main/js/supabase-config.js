// ==============================================================================
// Supabase Client Configuration
// Project URL: https://qqzjnylpkftyzishsssa.supabase.co
// ==============================================================================

const SUPABASE_CONFIG = {
    url: 'https://qqzjnylpkftyzishsssa.supabase.co',
    publishableKey: 'sb_publishable_cI316TXVj4o1x1wrbg7EtQ_lZseYTjG',
    options: {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
};

// Initialize Supabase Client (handles both browser global CDN and module loaders)
let supabaseClient = null;

function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;

    if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
        supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, SUPABASE_CONFIG.options);
        return supabaseClient;
    }
    
    // In Node.js / CommonJS or ESM environments
    if (typeof require !== 'undefined') {
        try {
            const { createClient } = require('@supabase/supabase-js');
            supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, SUPABASE_CONFIG.options);
            return supabaseClient;
        } catch (e) {
            console.warn('Supabase JS not found via require:', e);
        }
    }

    return null;
}

// Attach globally if in browser
if (typeof window !== 'undefined') {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
    window.getSupabaseClient = getSupabaseClient;
}

// Export for CommonJS / Node if applicable
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SUPABASE_CONFIG,
        getSupabaseClient
    };
}
