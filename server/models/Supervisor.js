const { Schema, model } = require('mongoose');
const DealerSchema = require('./Dealer');

const SupervisorSchema = new Schema({
    id: {
        type: Number, 
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    dealers: [DealerSchema]
});

const Supervisor = model('Supervisor', SupervisorSchema);

module.exports = Supervisor;
