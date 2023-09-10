const receipts = require('../models/receiptsModel')
const mongoose = require('mongoose')

//create new receipt and return id
const createNewReceipt = async (req, res) => {
    const {retailer, purchaseDate, purchaseTime, total, items } = req.body

try {//try catch block used here because many things wrong can happen when posting than compared to other methods like calc cash rewards or deleting
    console.log('receipt being made')
    console.log(req.body)
    
    const receipt1 = await receipts.create({retailer, purchaseDate, purchaseTime, total, items })
    console.log(receipt1._id)
    return res.status(200).json(receipt1._id)
} catch (error) {
    console.log('error in creating receipt')
    return res.status(400).json('invalid file')
}

}

//delete a receipt
const deleteReceipt = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json('invalid id')
    }

    const receipt4 = await receipts.findOneAndDelete({_id: id})

    if (!receipts){
        return res.status(400).json('invalid id')
    }

    return res.status(200).json('successful')
}


//get receipt points by id
const getReceiptPoints =  async (req, res) => {
    console.log('inside method for calc points')
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){//check for vaid id
        return res.status(400).json('invlaid id')
    }

    const receipt1 = await receipts.findById(id)//find receipt by id

    if (!receipt1){//checks if receipt is vlaid
        return res.status(400).json('invalid id')
    }
    else{//returns points as a json
        const receipt2 = calcpoints(receipt1)//calculates the points
        console.log(receipt2)
        const receipt3 = {Points: receipt2}
        
        
        return res.status(200).json(receipt2)
    }
}


//func that calc points
function calcpoints(receipt3){
    pointtally = 0//initialize points awarded

    //we award a point for each alphanumeric character in retailer name usiing this for loop
    for (var i = 0; i < receipt3.retailer.length; i++){
        var regEx = /^[0-9a-zA-Z]+$/
        if (receipt3.retailer.charAt(i).match(regEx)){
            pointtally++
        }
    }
    console.log(pointtally)

    //we check if total is a multiple of a quarter or dollar and award 25 and 50 points respectively
    if(parseFloat(receipt3.total)%(1.00)===0){
        pointtally+=50
        console.log(pointtally)
    }
    if (parseFloat(receipt3.total)%(0.25)===0){
        pointtally+=25
        console.log(pointtally)
    }

    //add 5 points for every 2 items
    pointtally += Math.floor(receipt3.items.length/2)*5
    console.log(pointtally)

    //check if purchase date is odd
    if (!(receipt3.purchaseDate.charAt(receipt3.purchaseDate.length-1)%2===0)){
        pointtally+=6
        console.log(pointtally)
    }

    //check if purchasetime is between 2 and 4 pm
    //the code below calc hours in military time
    pointer = 0
    stop = true
    hours = ""
    while (stop){
        if (receipt3.purchaseTime.charAt(pointer)===':'){
            stop = false
        }else{
            hours = hours.concat(receipt3.purchaseTime.charAt(pointer))
        }
        
        pointer++

    }

    //this returns the minutes in military time
    mins = ''
    for (i = pointer; i<pointer+2; i++){
        mins = mins.concat(receipt3.purchaseTime.charAt(i))
    }

    //here we need to check if hour is past 2 pm and at least 1 minute has lapsed, also want to check if hour is less than 4 pm
    if (parseFloat(hours)>=14 && parseFloat(hours)<16){
        if (parseFloat(hours)===14 && parseFloat(mins)==='00'){
            pointtally=pointtally
        }else{
            pointtally+=10
            console.log(pointtally)
        }
    }


    //check each item to see if its description is a multiple of 3, if so we add 0.2*item price
    for (var i = 0; i < receipt3.items.length; i++){
        if (receipt3.items[i].shortDescription.length%3===0){
            pointtally += Math.ceil(parseFloat(receipt3.items[i].price)*0.2)
        }
    }
    console.log(pointtally)


    return pointtally
}


module.exports = {//exports all 3 methods
    getReceiptPoints,
    createNewReceipt,
    deleteReceipt
}