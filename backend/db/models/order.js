const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    itemname: {
        type: String,
        required: true
    },
    itemprice: {
        type: Number,
        required: true
    },
    itemdescription: {
        type: String,
        required: true
    },
    itemcategory: {
        type: String,
        required: true
    },
})

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;