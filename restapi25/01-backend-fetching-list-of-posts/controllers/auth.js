const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const fs = require('fs');
// const path = require('path');

const User = require('../models/user');


exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password, 12)
        .then((hashedPassword) => {
            const user = new User({
                email: email,
                password: hashedPassword,
                name: name
            });
            return user.save();
        })
        .then((result) => {
            res.status(201).json({
                message: 'User Created',
                userId: result._id
            });
        })
        .catch((err) => {

            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.loginUser = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                const error = new Error('Email not found');
                error.statusCode = 401;
                throw error
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                const error = new Error('Incorrect Password or Email');
                error.statusCode = 401;
                throw error
            }
            //generate JSON web token here
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, 'aatikyakhandala', { expiresIn: '1h' });
            res.status(200).json({ token: token, userId: loadedUser._id.toString() });
        })
        // .then(())
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

};

exports.getUserStatus = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                status: user.status
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateUserStatus = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Cannot be Empty');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const newStatus = req.body.status;
    User.findById(req.userId)
        .then((user) => {
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }
            user.status = newStatus;
            return user.save();
        })
        .then((result) => {
            res.status(200).json({
                message: 'Message Updated Successfully',
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

};