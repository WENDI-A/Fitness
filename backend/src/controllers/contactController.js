import { Contact } from "../models/index.js";

// Submit contact form
export const submitContact = async (req, res) => {
    try {
        // console.log('--- Debug Contact Submission ---');
        // console.log('Headers:', JSON.stringify(req.headers, null, 2));
        // console.log('Body:', req.body);
        // console.log('--------------------------------');

        const { name, email, phone, message } = req.body || {};

        // Validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        // Get user_id if authenticated (optional)
        const user_id = req.user?.id || null;

        // Create contact message
        const contactMessage = await Contact.create({
            name,
            email,
            phone,
            message,
            user_id,
            status: 'new'
        });

        res.status(201).json({
            message: "Thank you for your message! We'll get back to you soon.",
            data: {
                id: contactMessage.id,
                created_at: contactMessage.created_at
            }
        });
    } catch (error) {
        console.error("Contact submission error:", error);
        res.status(500).json({
            error: "Failed to submit contact message.",
            details: error.message // Expose error for debugging
        });
    }
};

// Get all contact messages (Admin only)
export const getAllContacts = async (req, res) => {
    try {
        const { status, limit = 50, offset = 0 } = req.query;

        const whereClause = status ? { status } : {};

        const contacts = await Contact.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']],
        });

        res.json({
            total: contacts.count,
            contacts: contacts.rows
        });
    } catch (error) {
        console.error("Get contacts error:", error);
        res.status(500).json({ error: "Failed to retrieve contact messages" });
    }
};

// Update contact status (Admin only)
export const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['new', 'read', 'responded', 'archived'].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const contact = await Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: "Contact message not found" });
        }

        contact.status = status;
        await contact.save();

        res.json({
            message: "Contact status updated successfully",
            data: contact
        });
    } catch (error) {
        console.error("Update contact status error:", error);
        res.status(500).json({ error: "Failed to update contact status" });
    }
};

// Delete contact message (Admin only)
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: "Contact message not found" });
        }

        await contact.destroy();

        res.json({ message: "Contact message deleted successfully" });
    } catch (error) {
        console.error("Delete contact error:", error);
        res.status(500).json({ error: "Failed to delete contact message" });
    }
};
