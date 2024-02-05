const { Schema, model } = require('mongoose');

const reportSchema = new Schema({
    employeeId:{
        type:Int,
        required:true
    },
    handsDealt: {
        type:Int,
        required:true
    },
    promotionTaken: {
        type:Float,
        required:true
    },
    moneyTaken: {
        type:Float, 
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
    //TODO check on date format
});

const Report = model('Report', reportSchema);

module.exports = Report;