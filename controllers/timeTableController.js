// const mongoose = require('mongoose');
// const timeTable = mongoose.model('timeTable');

let Class = require('../models/class.model.js');

exports.homePage = function (req, res, next) {
    res.render('index', { title: 'TimeTable App' });
};

exports.dashboardPage = function (req, res, next) {
    res.render('dashboard', { title: 'Admin Dashboard' });
};

exports.classPage = function (req, res, next) {
    let bcrumb = {dashboard: '/dashboard', classes: '/dashboard/classes'};
    Class.find({})
    .exec()
    .then((classes) => {
        res.render('class', {title: "Manage Classes", classes: classes, bcrumb: bcrumb});
    })
    .catch((err) => {
        console.log("Error occured", err);
    });
}

exports.classPost = function (req, res, next) {
    let oneClass = new Class;
    oneClass.name = req.body.name;
    oneClass.status = req.body.status;

    oneClass.save()
    .then( (data) => {
        res.redirect('/dashboard/classes');
    })
    .catch((err) => {
        console.log("Error occured", err);
        res.send(`${err.name}: ${err._message}`);
    });
}

exports.oneClassPage = function (req, res, next) {
    let bcrumb = {dashboard: '/dashboard', classes: '/dashboard/classes', edit: ''};
    let classID = req.params.id;
    Class.findOne({_id: classID})
    .exec()
    .then((oneclass) => {
        res.render('classone', {title: "Edit Class: " + oneclass.name, oneclass: oneclass, bcrumb: bcrumb});
    })
    .catch((err) => {
        console.log("Error occured", err);
    });
}

exports.oneClassPost = function (req, res, next) {
    Class.findOneAndUpdate({_id: req.body._id}, {name: req.body.name, status: req.body.status})
    .exec()
    .then(() => {
        res.redirect('/dashboard/classes');
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.oneClassDelete = function (req, res, next) {
    Class.findByIdAndDelete({_id: req.body._id})
    .exec()
    .then(() => {
        res.redirect('/dashboard/classes');
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.studentsPage = function (req, res, next) {
    res.render('student', { title: 'Students' });
};