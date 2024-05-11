const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://paramthakkar864:paramthakkar864@cluster0.lj19rgy.mongodb.net/Orders?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("DB connection successful")
}).catch((e) => {
    console.log("DB connection failed")
    console.log(e)
})