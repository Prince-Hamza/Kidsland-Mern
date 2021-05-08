const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Devicez = new Schema(
    {
        admins: { type: Array, required: false },
        lastEvent: { type: Object, required: false },
        Device: { type: String, required: false },
        name: { type: String, required: false },
        rssiDB: { type: String, required: false },
    },

    { timestamps: true },
)

module.exports = mongoose.model('devices', Devicez)