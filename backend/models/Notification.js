const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema({
    message:{
        type: String
    }
})

const NotifyModel = mongoose.model('order', NotificationSchema);
module.exports = NotifyModel