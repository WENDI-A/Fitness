const API_BASE_URL = 'https://fitness-kykn.vercel.app/api';

// Submit contact form
export const submitContactForm = async (contactData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error("Contact form submission error:", error);
        throw error;
    }
};

// Get all contact messages (Admin only)
export const getAllContactMessages = async (params = {}) => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/contact${queryString ? '?' + queryString : ''}`;

        const token = localStorage.getItem('token');
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw await response.json();
        return await response.json();
    } catch (error) {
        console.error("Get contact messages error:", error);
        throw error;
    }
};

// Update contact status (Admin only)
export const updateContactStatus = async (id, status) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/contact/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        if (!response.ok) throw await response.json();
        return await response.json();
    } catch (error) {
        console.error("Update contact status error:", error);
        throw error;
    }
};

// Delete contact message (Admin only)
export const deleteContactMessage = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw await response.json();
        return await response.json();
    } catch (error) {
        console.error("Delete contact message error:", error);
        throw error;
    }
};
