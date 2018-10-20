// const mongoose = require('mongoose');
// const timeTable = mongoose.model('timeTable');

exports.homePage = function (req, res, next) {
    res.render('index', { title: 'TIMETABLE' });
};

exports.dashboardPage = function (req, res, next) {
    res.render('dashboard', { title: 'LASUCode' });
};

exports.studentsPage = function (req, res, next) {
    res.render('student', { title: 'LASUCode' });
};