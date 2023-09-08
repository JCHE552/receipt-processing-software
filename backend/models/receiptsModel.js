//this folder details how the receipts should be structured (schema)


const mongoose = require('mongoose')

const Schema = mongoose.Schema

const receiptSchema = new Schema({//details how jsonn receipt should be formatted
    retailer:{
        type:String,
        required: true
    },
    purchaseDate:{
        type:String,
        required: true
    },
    purchaseTime:{
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    items:{
        type: Array,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('receipts2',receiptSchema)
