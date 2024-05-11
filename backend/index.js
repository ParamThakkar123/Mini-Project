const express = require("express");
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Item = require("./db/models/order")
require('./db/connect')
const app = express()

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')))
app.use(bodyParser.urlencoded({extended: true}))

console.log(path.join(__dirname, '..'))

app.get('/addItem', (req, res) => {
    res.set({"Allow-access-Allow-Origin" : '*'});
    return res.redirect('addItem.html');
})

const db = mongoose.connection

app.get('/', async (req, res) => {
    try{
        const data = await db.collection('item').find().toArray();
        res.status(200).send(data);
    }catch(e){
        res.status(400).send("Invalid Response")
    }
})

app.post('/add-item', async (req, res) => {
    try{
        const itemName = req.body.itemName;
        const itemPrice = req.body.itemPrice;
        const itemDescription = req.body.itemDescription;
        const itemCategory = req.body.itemCategory;

        const data = {
            "itemName": itemName,
            "itemPrice": itemPrice,
            "itemDescription": itemDescription,
            "itemCategory": itemCategory
        }

        db.collection('item').insertOne(data, (err, collection) => {
            if(err){
                throw err;
            }
            console.log("Record Success")
            res.status(200).redirect('admin.html')
            console.log(data)
        })
    }catch(e){
        res.status(400).send("Invalid Response")
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})