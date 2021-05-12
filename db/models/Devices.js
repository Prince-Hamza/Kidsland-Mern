const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Devicez = new Schema(
    {
        admins: { type: Array, required: false },
        lastEvent: { type: Object, required: false },
        Device: { type: String, required: false },
        name: { type: String, required: true },
        rssiDB: { type: String, required: false },
        isBusy: { type: Boolean, required: false },
        moneyReset: { type: Date, required: false },
        connectivity: { type: Object, required: false },

    },
    

    { timestamps: true },
)

module.exports = mongoose.model('devices', Devicez)