const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ItemModel = require('./models/Orders')
const dotenv = require('dotenv');
const app = express()
dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(result => console.log("Connection Successful"))
.catch((err) => console.log(err));

app.get('/getItems', async(req, res) => {
    try{
        const items = await ItemModel.find();
        res.status(200).json(items)
    }
    catch(err){
        console.error("Error fetching items", error)
        res.status(500).json({error: "Erro fetching items from Database"})
    }
})

app.get('/getItems/:id', async (req, res) => {
    try{
        const itemId = req.params.id;
        const item = await ItemModel.findById(itemId);
        if(!item){
            res.status(404).json({error: "Item not found"});
        }
        res.status(200).json(item)
    }catch(error){
        console.error("Error fetching item", error);
        res.status(500).json({error: "Error fetching items from the Database."})
    }
})

app.post('/addItem', async(req, res) => {
    const item = new ItemModel(req.body);
    let result = await item.save();
    res.send(result);
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})