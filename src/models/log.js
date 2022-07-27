const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    load: {
        type: Number,
        required: true
    },
    repetition: {
        type: Number,
        required: true
    },
    series: {
        type: Number,
        required: true
    },
    obs: {
        type: String,
    },
    exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exercise'
    }
},
    {
        timestamps: true
    })

const Log = mongoose.model('Log', logSchema)

module.exports = Log