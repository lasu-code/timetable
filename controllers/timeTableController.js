// const mongoose = require('mongoose');
// const timeTable = mongoose.model('timeTable');

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

