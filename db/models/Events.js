const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Events = new Schema(
  {
    isOnline: { type: Boolean, required: false },
    amount: { type: Number, required: false },
    timeLocal: { type: String, required: true },
    // timeLocalOnly: { type: String, required: true },
    timeSync: { type: String, required: true },
    // timeSyncOnly: { type: String, required: true },
    Device: { type: String, required: false },
    type: { type: String, required: false },

  },
  { timestamps: true },
)

module.exports = mongoose.model('events', Events)