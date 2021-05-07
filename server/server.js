const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const db = require('../db')
const movieRouter = require('../db/routes/movie-router')
// import firebase from 'firebase'
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use('/api', movieRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(port, () => `Server running on port ${port}`);



