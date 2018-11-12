// const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require("bcrypt")
let Class = require('../models/class.model.js');

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

exports.dashboardPage2 = function (req, res, next) {
    let bcrumb = { dashboard: '/dashboard', classes: '/dashboard2' };
    Class.find({})
        .exec()
        .then((classes) => {
            res.render('dashboard2', { title: "Manage Classes", classes: classes });
        })
        .catch((err) => {
            console.log("Error occured", err);
        });
};

exports.postDashboard2 = function (req, res, next) {
    let oneClass = new Class;
    oneClass.name = req.body.name;
    oneClass.status = req.body.status;

    oneClass.save()
        .then((data) => {
            res.redirect('/dashboard2');
        })
        .catch((err) => {
            console.log("Error occured", err);
            res.send(`${err.name}: ${err._message}`);
        });
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

exports.dashboardPage3 = function (req, res, next) {
    res.render('dashboard3', { title: 'LASUCode' });
};
exports.studentsPage = function (req, res, next) {
    res.render('student', { title: 'LASUCode' });
};
exports.studentsPage2 = function (req, res, next) {
    res.render('student2', { title: 'LASUCode' });
};

