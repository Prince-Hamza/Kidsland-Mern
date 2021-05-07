const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
      {
        amount: { type: Number, required: false },
        timeLocal: { type: String, required: false },
        timeSync: { type: String, required: false },
        moneyReset:{ type: String, required: false },
        Device:{ type: String, required: false },
        type:{ type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('devices', Movie)