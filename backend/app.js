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

app.post('/addItem', async(req, res) => {
    const item = new ItemModel(req.body);
    let result = await item.save();
    res.send(result);
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})