const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
      {
        mongoAtlas: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('devices', Movie)