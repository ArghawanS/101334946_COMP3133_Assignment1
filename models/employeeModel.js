const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter first name'],
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: [true,' Please enter lastname']
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter email "],
        trim: true,
        uppercase: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other",
        trim: true,
        lowercase: true
    },
    salary: {
        type: Number,
        required: [true, "Please enter Salary  "]
    }
});

employeeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

employeeSchema.set('toObject', { virtuals: true });
employeeSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Employee", employeeSchema);