const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    itemname:{
        type:String,
        required:true
    },
    itemprice:{
        type:Number,
        required:true
    },
    itemdescription:{
        type:String,
        required:true
    },
    itemimageurl:{
        type: String,
        required: true
    },
    itemavailable:{
        type: Boolean
    }
})

const ItemModel = mongoose.model('item', ItemSchema);
module.exports = ItemModel