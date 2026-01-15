const mongoose = require('mongoose');

/**
 * Chat Schema - Represents a conversation session
 */
const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    status: {
        type: String,
        enum: ['active', 'closed', 'pending'],
        default: 'active'
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);
