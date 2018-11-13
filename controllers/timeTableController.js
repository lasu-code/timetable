// const mongoose = require('mongoose');
// const timeTable = mongoose.model('timeTable');

let pluralize = require('pluralize');
let Class = require('../models/class.model.js');
let Subject = require('../models/subject.model.js');

exports.homePage = function (req, res, next) {
    res.render('index', { title: 'TimeTable App' });
};

exports.dashboardPage = function (req, res, next) {
    res.render('dashboard', { title: 'Admin Dashboard' });
};

exports.studentsPage = function (req, res, next) {
    Class.find({})
        .exec()
        .then((classes) => {
            res.render('student', { title: "Students Page", classes: classes});
        })
        .catch((err) => {
            console.log("Error occured", err);
        });
};

exports.studentsPage2 = function (req, res, next) {
    res.render('student2');
};
exports.testPage = function (req, res, next) {
    Class.find({ 'status': true })
        .exec()
        .then((classes) => {
            Subject.find({})
                .populate('class')
                .exec()
                .then((subjects) => {
                    res.render('timetable', { title: "Manage Subjects", subjects: subjects, pluralize: pluralize, classes: classes });
                })
                .catch((err) => {
                    console.log("Subject query error:", err);
                });
        })
        .catch((err) => {
            console.log("Class query error:", err);
        });
}
exports.classPage = function (req, res, next) {
    let bcrumb = { dashboard: '/dashboard', classes: '/dashboard/classes' };
    Class.find({})
        .exec()
        .then((classes) => {
            res.render('class', { title: "Manage Classes", classes: classes, bcrumb: bcrumb });
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
        .then((data) => {
            res.redirect('/dashboard/classes');
        })
        .catch((err) => {
            console.log("Error occured", err);
            res.send(`${err.name}: ${err._message}`);
        });
}

exports.oneClassPage = function (req, res, next) {
    let bcrumb = { dashboard: '/dashboard', classes: '/dashboard/classes', edit: '' };
    let classID = req.params.id;
    Class.findOne({ _id: classID })
        .exec()
        .then((oneclass) => {
            res.render('classone', { title: "Edit Class: " + oneclass.name, oneclass: oneclass, bcrumb: bcrumb });
        })
        .catch((err) => {
            console.log("Error occured", err);
        });
}

exports.oneClassPost = function (req, res, next) {
    Class.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, status: req.body.status })
        .exec()
        .then(() => {
            res.redirect('/dashboard/classes');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.oneClassDelete = function (req, res, next) {
    Class.findByIdAndDelete({ _id: req.body._id })
        .exec()
        .then(() => {
            res.redirect('/dashboard/classes');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.subjectPage = function (req, res, next) {
    let bcrumb = { dashboard: '/dashboard', subjects: '/dashboard/subjects' };
    Class.find({ 'status': true })
        .exec()
        .then((classes) => {
            Subject.find({})
                .populate('class')
                .exec()
                .then((subjects) => {
                    res.render('subject', { title: "Manage Subjects", subjects: subjects, bcrumb: bcrumb, classes: classes, pluralize: pluralize });
                })
                .catch((err) => {
                    console.log("Subject query error:", err);
                });
        })
        .catch((err) => {
            console.log("Class query error:", err);
        });
}

exports.subjectPost = function (req, res, next) {
    let oneSubject = new Subject;
    oneSubject.name = req.body.name;
    oneSubject.status = req.body.status;
    oneSubject.class = req.body.class;

    oneSubject.save()
        .then((data) => {
            res.redirect('/dashboard/subjects');
        })
        .catch((err) => {
            console.log("Error occured", err);
            res.send(`${err.name}: ${err._message}`);
        });
}

exports.oneSubjectPage = function (req, res, next) {
    let bcrumb = { dashboard: '/dashboard', subjects: '/dashboard/subjects', edit: '' };
    Class.find({ 'status': true })
        .exec()
        .then((classes) => {
            Subject.findOne({ _id: req.params.id })
                .populate('class')
                .exec()
                .then((onesubject) => {
                    let unassigned = classes;
                    if (onesubject.class) {
                        unassigned = []
                        classes.forEach((c, index) => {
                            if (!onesubject.class.find((x) => x.name == c.name)) {
                                unassigned.push(classes[index]);
                            }
                        })
                    }

                    res.render('subjectone', { title: "Edit Subject: " + onesubject.name, onesubject: onesubject, classes: unassigned, bcrumb: bcrumb });
                })
                .catch((err) => {
                    console.log("Subject query error:", err);
                })
        })
        .catch((err) => {
            console.log("Class query error:", err);
        });
}

exports.oneSubjectPost = function (req, res, next) {
    Subject.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, status: req.body.status, class: req.body.class })
        .exec()
        .then(() => {
            res.redirect('/dashboard/subjects');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.oneSubjectDelete = function (req, res, next) {
    Subject.findByIdAndDelete({ _id: req.body._id })
        .exec()
        .then(() => {
            res.redirect('/dashboard/subjects');
        })
        .catch((err) => {
            console.log(err);
        })
}





