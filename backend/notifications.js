const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
    notif_id: Number,
    email: String,
    title: String,
    description: String,
    type: String,
    is_read: Boolean,
    date: Date
});

const Notifications = mongoose.model('notifications', notificationsSchema);

module.exports = Notifications;