const receipts = require('../models/receiptsModel')
const mongoose = require('mongoose')

//create new receipt and return id
const createNewReceipt = async (req, res) => {
    const {retailer, purchaseDate, purchaseTime, total, items } = req.body

try {//try catch block used here because many things wrong can happen when posting than compared to other methods like calc cash rewards or deleting
    
    const receipt1 = await receipts.create({retailer, purchaseDate, purchaseTime, total, items })

    return res.status(200).json(receipt1._id)

} catch (error) {

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
        
        const receipt3 = {Points: receipt2}
        
        
        return res.status(200).json(receipt2)
    }
}


//func that calc points
function calcpoints(receipt3){
    pointtally = 0//initialize points awarded

    pointtally2 = 0
    pointtally3 = 0
    pointtally4 = 0
    pointtally5 = 0
    pointtally6 = 0
    pointtally7 = 0

    pointtally2 = namepoints(receipt3, pointtally2) //adding points for each alphanumeric char in retailer name

    pointtally3 = multpoints(receipt3, pointtally3) //adding points if total is multiple of 25 cents or dollar

    pointtally4 = itempoints(receipt3, pointtally4) //adding points for very 2 items

    pointtally5 = oddpoints(receipt3, pointtally5) //adding points if purchase date is odd

    pointtally6 = timepoints(receipt3, pointtally6) //adding points if time is between 2 and 4 pm

    pointtally7 = descpoints(receipt3, pointtally7) //adding points if decription lenght is mult of 3

    pointtally = pointtally2 + pointtally3 + pointtally4 + pointtally5 + pointtally6 + pointtally7


    return pointtally
}


function namepoints(receipt4, pointtally1){

    //we award a point for each alphanumeric character in retailer name usiing this for loop
    for (var i = 0; i < receipt4.retailer.length; i++){
        var regEx = /^[0-9a-zA-Z]+$/
        if (receipt4.retailer.charAt(i).match(regEx)){
            pointtally1++
        }
    }

    return pointtally1
}


function multpoints(receipt4, pointtally1){

    //we check if total is a multiple of a quarter or dollar and award 25 and 50 points respectively
    if(parseFloat(receipt4.total)%(1.00)===0){
        pointtally1+=50
        
    }
    if (parseFloat(receipt4.total)%(0.25)===0){
        pointtally1+=25
        
    }
    
    return pointtally1
}

function itempoints(receipt4, pointtally1){

    //add 5 points for every 2 items
    pointtally1 += Math.floor(receipt4.items.length/2)*5
    
    return pointtally1
}

function oddpoints(receipt4, pointtally1){

    //check if purchase date is odd
    if (!(receipt4.purchaseDate.charAt(receipt4.purchaseDate.length-1)%2===0)){
        pointtally1+=6
        
    }
    
    return pointtally1
}

function timepoints(receipt4, pointtally1){

    //check if purchasetime is between 2 and 4 pm
    //the code below calc hours in military time
    pointer = 0
    stop = true
    hours = ""
    while (stop){
        if (receipt4.purchaseTime.charAt(pointer)===':'){
            stop = false
        }else{
            hours = hours.concat(receipt4.purchaseTime.charAt(pointer))
        }
        
        pointer++

    }

    //this returns the minutes in military time
    mins = ''
    for (i = pointer; i<pointer+2; i++){
        mins = mins.concat(receipt4.purchaseTime.charAt(i))
    }

    //here we need to check if hour is past 2 pm and at least 1 minute has lapsed, also want to check if hour is less than 4 pm
    if (parseFloat(hours)>=14 && parseFloat(hours)<16){
        if (parseFloat(hours)===14 && parseFloat(mins)==='00'){
            pointtally1=pointtally1
        }else{
            pointtally1+=10
            
        }
    }
    
    return pointtally1
}

function descpoints(receipt4, pointtally1){

    //check each item to see if its description is a multiple of 3, if so we add 0.2*item price
    for (var i = 0; i < receipt4.items.length; i++){
        if (receipt4.items[i].shortDescription.length%3===0){
            pointtally1 += Math.ceil(parseFloat(receipt4.items[i].price)*0.2)
        }
    }
    
    return pointtally1
}




module.exports = {//exports all 3 methods
    getReceiptPoints,
    createNewReceipt,
    deleteReceipt
}