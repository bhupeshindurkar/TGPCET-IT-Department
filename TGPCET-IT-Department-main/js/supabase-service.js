// ==============================================================================
// Supabase Service Layer
// Complete client-side & API wrapper for TGPCET IT Department & Career Opportunities
// ==============================================================================

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./supabase-config'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./supabase-config'));
    } else {
        root.SupabaseService = factory(root.SUPABASE_CONFIG);
    }
}(typeof self !== 'undefined' ? self : this, function (config) {

    function getClient() {
        if (typeof window !== 'undefined' && window.getSupabaseClient) {
            return window.getSupabaseClient();
        }
        if (typeof require !== 'undefined') {
            const { getSupabaseClient } = require('./supabase-config');
            return getSupabaseClient();
        }
        return null;
    }

    const SupabaseService = {
        // --------------------------------------------------------------------------
        // 1. AUTHENTICATION SERVICE
        // --------------------------------------------------------------------------
        auth: {
            async signUp(email, password, metadata = {}) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: metadata.fullName || metadata.name || '',
                            role: metadata.role || 'student',
                            department: metadata.department || 'Information Technology',
                            phone: metadata.phone || '',
                            ...metadata
                        }
                    }
                });
                if (error) throw error;
                return data;
            },

            async signIn(email, password) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) throw error;
                return data;
            },

            async signOut() {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { error } = await client.auth.signOut();
                if (error) throw error;
                return true;
            },

            async getSession() {
                const client = getClient();
                if (!client) return null;
                const { data, error } = await client.auth.getSession();
                if (error) {
                    console.error('Error getting session:', error);
                    return null;
                }
                return data.session;
            },

            async getUser() {
                const client = getClient();
                if (!client) return null;
                const { data: { user }, error } = await client.auth.getUser();
                if (error) {
                    return null;
                }
                return user;
            },

            onAuthStateChange(callback) {
                const client = getClient();
                if (!client) return { data: { subscription: { unsubscribe: () => {} } } };
                return client.auth.onAuthStateChange(callback);
            },

            async resetPassword(email, redirectTo = window.location.origin) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client.auth.resetPasswordForEmail(email, {
                    redirectTo
                });
                if (error) throw error;
                return data;
            },

            async updatePassword(newPassword) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client.auth.updateUser({
                    password: newPassword
                });
                if (error) throw error;
                return data;
            }
        },

        // --------------------------------------------------------------------------
        // 2. PROFILES SERVICE
        // --------------------------------------------------------------------------
        profiles: {
            async getProfile(userId) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();
                if (error) throw error;
                return data;
            },

            async getCurrentUserProfile() {
                const client = getClient();
                if (!client) return null;
                const user = await SupabaseService.auth.getUser();
                if (!user) return null;
                return await this.getProfile(user.id);
            },

            async updateProfile(userId, updates) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client
                    .from('profiles')
                    .update(updates)
                    .eq('id', userId)
                    .select()
                    .single();
                if (error) throw error;
                return data;
            },

            async uploadAvatar(userId, file) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                
                const fileExt = file.name.split('.').pop();
                const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`;
                
                const { error: uploadError } = await client.storage
                    .from('avatars')
                    .upload(filePath, file, { upsert: true });

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = client.storage
                    .from('avatars')
                    .getPublicUrl(filePath);

                await this.updateProfile(userId, { avatar_url: publicUrl });
                return publicUrl;
            },

            async uploadResume(userId, file) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');

                const fileExt = file.name.split('.').pop();
                const filePath = `${userId}/resume-${Date.now()}.${fileExt}`;

                const { error: uploadError } = await client.storage
                    .from('resumes')
                    .upload(filePath, file, { upsert: true });

                if (uploadError) throw uploadError;

                // Create signed URL (valid for 1 year) or store reference
                const { data: signedData, error: signError } = await client.storage
                    .from('resumes')
                    .createSignedUrl(filePath, 60 * 60 * 24 * 365);

                const resumeUrl = signedData ? signedData.signedUrl : filePath;
                await this.updateProfile(userId, { resume_url: resumeUrl });
                return { filePath, resumeUrl };
            }
        },

        // --------------------------------------------------------------------------
        // 3. OPPORTUNITIES SERVICE (Jobs, Internships, Projects, Hackathons)
        // --------------------------------------------------------------------------
        opportunities: {
            async getAll(filters = {}) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');

                let query = client
                    .from('opportunities')
                    .select('*, profiles:created_by (full_name, email, role)')
                    .order('created_at', { ascending: false });

                if (filters.status) {
                    query = query.eq('status', filters.status);
                } else if (!filters.includeAllStatus) {
                    query = query.eq('status', 'active');
                }

                if (filters.type) {
                    query = query.eq('type', filters.type);
                }

                if (filters.workplaceType) {
                    query = query.eq('workplace_type', filters.workplaceType);
                }

                if (filters.search) {
                    query = query.or(`title.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
                }

                if (filters.limit) {
                    query = query.limit(filters.limit);
                }

                const { data, error } = await query;
                if (error) throw error;
                return data || [];
            },

            async getById(id) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client
                    .from('opportunities')
                    .select('*, profiles:created_by (full_name, email, role)')
                    .eq('id', id)
                    .single();
                if (error) throw error;
                return data;
            },

            async create(opportunityData) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const user = await SupabaseService.auth.getUser();

                const payload = {
                    ...opportunityData,
                    created_by: user ? user.id : null
                };

                const { data, error } = await client
                    .from('opportunities')
                    .insert([payload])
                    .select()
                    .single();
                if (error) throw error;
                return data;
            },

            async update(id, updates) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client
                    .from('opportunities')
                    .update(updates)
                    .eq('id', id)
                    .select()
                    .single();
                if (error) throw error;
                return data;
            },

            async delete(id) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client
                    .from('opportunities')
                    .delete()
                    .eq('id', id);
                if (error) throw error;
                return data;
            }
        },

        // --------------------------------------------------------------------------
        // 4. SAVED OPPORTUNITIES (Bookmarking)
        // --------------------------------------------------------------------------
        savedOpportunities: {
            async save(opportunityId, notes = '') {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const user = await SupabaseService.auth.getUser();
                if (!user) throw new Error('User must be logged in to save opportunities');

                const { data, error } = await client
                    .from('saved_opportunities')
                    .insert([{
                        user_id: user.id,
                        opportunity_id: opportunityId,
                        notes
                    }])
                    .select()
                    .single();
                if (error) throw error;
                return data;
            },

            async unsave(opportunityId) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const user = await SupabaseService.auth.getUser();
                if (!user) throw new Error('User must be logged in to unsave');

                const { data, error } = await client
                    .from('saved_opportunities')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('opportunity_id', opportunityId);
                if (error) throw error;
                return data;
            },

            async isSaved(opportunityId) {
                const client = getClient();
                if (!client) return false;
                const user = await SupabaseService.auth.getUser();
                if (!user) return false;

                const { data, error } = await client
                    .from('saved_opportunities')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('opportunity_id', opportunityId)
                    .maybeSingle();

                if (error) return false;
                return !!data;
            },

            async getMySaved() {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const user = await SupabaseService.auth.getUser();
                if (!user) throw new Error('User must be logged in');

                const { data, error } = await client
                    .from('saved_opportunities')
                    .select('*, opportunity:opportunity_id (*)')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                return data || [];
            }
        },

        // --------------------------------------------------------------------------
        // 5. APPLICATIONS SERVICE
        // --------------------------------------------------------------------------
        applications: {
            async apply(opportunityId, applicationDetails = {}) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const user = await SupabaseService.auth.getUser();
                if (!user) throw new Error('You must be logged in to apply');

                const payload = {
                    opportunity_id: opportunityId,
                    user_id: user.id,
                    resume_url: applicationDetails.resumeUrl || null,
                    cover_letter: applicationDetails.coverLetter || '',
                    portfolio_link: applicationDetails.portfolioLink || '',
                    custom_answers: applicationDetails.customAnswers || {},
                    status: 'applied'
                };

                const { data, error } = await client
                    .from('applications')
                    .insert([payload])
                    .select()
                    .single();

                if (error) throw error;
                return data;
            },

            async getMyApplications() {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const user = await SupabaseService.auth.getUser();
                if (!user) throw new Error('You must be logged in');

                const { data, error } = await client
                    .from('applications')
                    .select('*, opportunity:opportunity_id (*)')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                return data || [];
            },

            async getApplicationsForOpportunity(opportunityId) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');

                const { data, error } = await client
                    .from('applications')
                    .select('*, profile:user_id (id, full_name, email, phone, avatar_url, resume_url, skills, department, year_of_study)')
                    .eq('opportunity_id', opportunityId)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                return data || [];
            },

            async updateStatus(applicationId, newStatus, feedbackNotes = '') {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const user = await SupabaseService.auth.getUser();

                const { data, error } = await client
                    .from('applications')
                    .update({
                        status: newStatus,
                        feedback_notes: feedbackNotes,
                        reviewed_at: new Date().toISOString(),
                        reviewed_by: user ? user.id : null
                    })
                    .eq('id', applicationId)
                    .select()
                    .single();

                if (error) throw error;
                return data;
            },

            async withdraw(applicationId) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const user = await SupabaseService.auth.getUser();
                if (!user) throw new Error('Unauthorized');

                const { data, error } = await client
                    .from('applications')
                    .delete()
                    .eq('id', applicationId)
                    .eq('user_id', user.id);

                if (error) throw error;
                return data;
            }
        },

        // --------------------------------------------------------------------------
        // 6. STORAGE SERVICE
        // --------------------------------------------------------------------------
        storage: {
            async upload(bucket, path, file, options = {}) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client.storage
                    .from(bucket)
                    .upload(path, file, { upsert: true, ...options });
                if (error) throw error;
                return data;
            },

            getPublicUrl(bucket, path) {
                const client = getClient();
                if (!client) return '';
                const { data } = client.storage.from(bucket).getPublicUrl(path);
                return data ? data.publicUrl : '';
            },

            async createSignedUrl(bucket, path, expiresInSeconds = 3600) {
                const client = getClient();
                if (!client) throw new Error('Supabase client not initialized');
                const { data, error } = await client.storage
                    .from(bucket)
                    .createSignedUrl(path, expiresInSeconds);
                if (error) throw error;
                return data.signedUrl;
            }
        }
    };

    return SupabaseService;
}));
