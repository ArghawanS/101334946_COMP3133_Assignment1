const AppError = require("../utils/AppError");
const User = require("../models/userModel");

exports.signup = async args => {
    let message = "";
    const newUser = await User.create({
        username: args.username,
        email: args.email,
        password: args.password,
    }).catch(err => {
        console.log(err);
        if (err.code === 11000) { // duplicate field error
            const duplicateValue = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
            message = `Duplicate value not allowed: ${duplicateValue}. Please enter correct Email!`;
        } else if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(el => el.message);
            message = `Invalid data. ${errors.join(". ")}`;
        }
    });

    if (message !== "") {
        return new AppError(message);
    }

    message = "Created successfully!";
    return {
        message,
        user: newUser
    };
};

exports.login = async args => {
    const user = await User.findOne({ username: args.username });
    if (!(user && await user.isPasswordCorrect(args.password, user.password))) {
        return new AppError("The Username and Password is incorrect");
    }

    return {
        message: `Logged in successfully!`,
        user
    }
}