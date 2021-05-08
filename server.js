const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const db = require('./db')
const movieRouter = require('./db/routes/movie-router')
require('dotenv').config()
// import firebase from 'firebase'
const port = process.env.PORT;
console.log(port)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use('/api', movieRouter)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/' , express.static(__dirname + '/kidsland/build'))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(port, () => `Server running on port ${port}`);



