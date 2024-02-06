const { Schema, model } = require('mongoose');

const reportSchema = new Schema({
    employeeId:{
        type:Number,
        required:true
    },
    handsDealt: {
        type:Number,
        required:true
    },
    promotionTaken: {
        type:Number,
        required:true
    },
    moneyTaken: {
        type:Number, 
        required:true
    },
    date: {
        type: String,
        default: Date.now
    }
    //TODO check on date format
});

const Report = model('Report', reportSchema);

module.exports = Report;