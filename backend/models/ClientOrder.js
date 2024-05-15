const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    itemname:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
})

const OrderModel = mongoose.model('order', OrderSchema);
module.exports = OrderModel