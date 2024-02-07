const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reportSchema = new Schema({
    dealerId:{
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
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    //TODO check on date format-- done
    }
});

const Report = model('Report', reportSchema);

module.exports = Report;