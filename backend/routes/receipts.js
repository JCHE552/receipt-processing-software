//this folder redirects to details the route to where the methods for getting points and posting a receipt are


const express = require('express')
const Receipts = require('../models/receiptsModel')//schema for json entries are detailed by schema in models




const  {//here we access methods for posting reciept, calc cash rewards, and deleting receipts
    createNewReceipt, getReceiptPoints, deleteReceipt
} = require('../controllers/receiptController')

const router = express.Router()

//get points for the id of a receipt based on endpoint
router.get('/:id/points', getReceiptPoints)


//process a receipt and return the json object with id based on endpoint
router.post('/process', createNewReceipt)

//delete a receipt
router.delete('/:id/erase', deleteReceipt)




module.exports = router