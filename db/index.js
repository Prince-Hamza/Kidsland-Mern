const mongoose = require('mongoose')

// mongoose
//     .connect('mongodb://127.0.0.1:27017/Devices', { useNewUrlParser: true })
//     .catch(e => {
//         console.error('Connection error', e.message)
//     })

// const db = mongoose.connection

// module.exports = db

const uri = "mongodb+srv://HamzaAhmed:isi151isi@devices.4jhf4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to MongoDB")
    }).catch(err => console.log(err))

 const db = mongoose.connection
 module.exports = db





