const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require("bcrypt")

exports.postuser = function (req, res, next) {
    console.log(req.body);
    let user = {
        schEmail: req.body.schEmail,
        address: req.body.address,
        schName: req.body.schName,
        adminName: req.body.adminName,
        password: req.body.password,
    };
    let newUser = new User(user);
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save();
    res.redirect('/#login');
}

exports.homePage = function (req, res, next) {
    res.render('index', { title: 'TIMETABLE' });
};

exports.dashboardPage = function (req, res, next) {
    res.render('dashboard', { title: 'LASUCode' });
};

exports.dashboardPage1 = function (req, res, next) {
    res.render('dashboard1', { title: 'LASUCode' });
};
exports.dashboardPage2 = function (req, res, next) {
    res.render('dashboard2', { title: 'LASUCode' });
};
exports.dashboardPage3 = function (req, res, next) {
    res.render('dashboard3', { title: 'LASUCode' });
};
exports.studentsPage = function (req, res, next) {
    res.render('student', { title: 'LASUCode' });
};
exports.studentsPage2 = function (req, res, next) {
    res.render('student2', { title: 'LASUCode' });
};

