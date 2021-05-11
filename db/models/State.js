const mongoose = require('mongoose')
const Schema = mongoose.Schema

const State = new Schema(
  {
    rssiDB: { type: Boolean, required: true },
    timeLocal: { type: String, required: true },
    timeSync: { type: String, required: true },
    Device: { type: String, required: true },
    type: { type: String, required: true },

  },
  { timestamps: true },
)

module.exports = mongoose.model('state', State)