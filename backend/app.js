const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ItemModel = require('./models/Orders')
const OrderModel = require('./models/ClientOrder')
const dotenv = require('dotenv');
const app = express();
const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);
dotenv.config();

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

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

app.post('/placeOrder', async (req, res) => {
    const orders = req.body.orders;

    try {
        const newOrders = await Promise.all(orders.map(async (order) => {
            const { itemId, quantity } = order;
            const item = await ItemModel.findById(itemId);

            const newOrder = new OrderModel({
                itemname: item.itemname,
                quantity
            });

            return newOrder.save();
        }));

        res.status(200).json({ message: 'Orders placed successfully. Waiting for admin approval.' });
    } catch (error) {
        console.error("Error Placing Order", error)
        res.status(500).json({ message: 'Failed to place orders. Please try again later' })
    }
})


app.get('/pendingOrders', async (req, res) => {
    try{
        const orders = await OrderModel.find()
        res.status(200).json(orders)
    }catch(error){
        console.error("Failed to fetch pending orders", error)
        res.status(500).json({message: 'Failed to fetch pending orders'})
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

app.delete('/pendingOrders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      res.status(404).json({ error: 'Order not found' });
    }

    io.emit('orderReady', deletedOrder._id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

app.post('/addItem', async(req, res) => {
    const item = new ItemModel(req.body);
    let result = await item.save();
    res.send(result);
})

server.listen(8000, () => {
    console.log("Server running on port 8000")
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})