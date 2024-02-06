const { Schema, model } = require('mongoose');
const EmployeeSchema = require('./Employee');

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
    employees: [EmployeeSchema]
});

const Supervisor = model('Supervisor', SupervisorSchema);

module.exports = Supervisor;
