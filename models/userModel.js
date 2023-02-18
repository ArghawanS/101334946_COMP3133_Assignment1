const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please enter first name"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, " Email is in wrong format"],
        required: [true, "Please enter email address"]
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, " Please enter Password"],
        trim: true,
        lowercase: true
    }
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();


    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.isPasswordCorrect = async function(givenPassword, userPassword) {
    return await bcrypt.compare(givenPassword, userPassword);
}

module.exports = mongoose.model("User", userSchema);