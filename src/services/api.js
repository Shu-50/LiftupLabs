const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Get auth token from localStorage
    getAuthToken() {
        const userData = localStorage.getItem('liftuplabs_user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                return user.token;
            } catch (error) {
                console.error('Error parsing user data:', error);
                return null;
            }
        }
        return null;
    }

    // Make HTTP request with auth headers
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = this.getAuthToken();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                const error = new Error(data.message || 'API request failed');
                error.response = { data, status: response.status };
                throw error;
            }

            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint, params = {}) {
        // Filter out empty, null, and undefined values
        const filteredParams = Object.entries(params)
            .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

        const queryString = new URLSearchParams(filteredParams).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;

        return this.request(url, {
            method: 'GET',
        });
    }

    // POST request
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // PUT request
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE',
        });
    }

    // Authentication APIs
    async register(userData) {
        return this.post('/auth/register', userData);
    }

    async login(credentials) {
        return this.post('/auth/login', credentials);
    }

    async getProfile() {
        return this.get('/auth/me');
    }

    async updateProfile(profileData) {
        return this.put('/auth/profile', profileData);
    }

    async changePassword(passwordData) {
        return this.post('/auth/change-password', passwordData);
    }

    async logout() {
        return this.post('/auth/logout');
    }

    async verifyEmail(token) {
        return this.post('/auth/verify-email', { token });
    }

    async resendVerification(email) {
        return this.post('/auth/resend-verification', { email });
    }

    async forgotPassword(email) {
        return this.post('/auth/forgot-password', { email });
    }

    async verifyResetToken(token) {
        return this.post('/auth/verify-reset-token', { token });
    }

    async resetPassword(token, newPassword) {
        return this.post('/auth/reset-password', { token, newPassword });
    }

    // Event APIs
    async getEvents(filters = {}) {
        return this.get('/events', filters);
    }

    async getEvent(eventId) {
        return this.get(`/events/${eventId}`);
    }

    async createEvent(eventData) {
        return this.post('/events', eventData);
    }

    async updateEvent(eventId, eventData) {
        return this.put(`/events/${eventId}`, eventData);
    }

    async deleteEvent(eventId) {
        return this.delete(`/events/${eventId}`);
    }

    async registerForEvent(eventId, registrationData = {}) {
        return this.post(`/events/${eventId}/register`, registrationData);
    }

    async unregisterFromEvent(eventId) {
        return this.delete(`/events/${eventId}/register`);
    }

    async getHostedEvents() {
        return this.get('/events/my/hosted');
    }

    async getRegisteredEvents() {
        return this.get('/events/my/registered');
    }

    async getEventParticipants(eventId) {
        return this.get(`/events/${eventId}/participants`);
    }

    async updateParticipantStatus(eventId, participantId, status) {
        return this.put(`/events/${eventId}/participants/${participantId}/status`, { status });
    }

    async getEventAnalytics(eventId) {
        return this.get(`/events/${eventId}/analytics`);
    }

    // User APIs
    async getUsers(filters = {}) {
        return this.get('/users', filters);
    }

    async getUser(userId) {
        return this.get(`/users/${userId}`);
    }

    async searchMentors(filters = {}) {
        return this.get('/users/search/mentors', filters);
    }

    async getDashboardStats() {
        return this.get('/users/stats/dashboard');
    }

    async updateUserStatus(userId, status) {
        return this.put(`/users/${userId}/status`, { isActive: status });
    }

    // Contact API
    async submitContactForm(contactData) {
        return this.post('/contact', contactData);
    }
}

export default new ApiService();