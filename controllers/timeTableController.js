// const mongoose = require('mongoose');
// const timeTable = mongoose.model('timeTable');

let pluralize = require('pluralize');
let Class = require('../models/class.model.js');
let Subject = require('../models/subject.model.js');
let Timetable = require('../models/timetable.model.js');

exports.homePage = function (req, res, next) {
    res.render('index', { title: 'TimeTable App' });
};

exports.reg = function (req, res, next) {
    res.render('registration', { title: '' });
};

exports.logout = function (req, res, next) {
    req.flash('error', 'Login to continue!');
    req.logout();
    res.redirect('/#login');
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

exports.dashboardPage = function (req, res, next) {
    res.render('dashboard', { title: 'Admin Dashboard', username: req.user.adminName });
};

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

    function createSlots(classname) {
        let day = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        let period = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'];
        let slots = [];

        for (let i = 0; i < day.length; i++) {
            for (let j = 0; j < period.length; j++) {
                slots.push({ day: day[i], period: period[j], classname: classname });
            }
        }
        console.log(slots);
        // let timeTableData = new Timetable();
        Timetable.create(slots)
                    .then((slot) => {
                        console.log('Slots created for', classname)
                    })
                    .catch((err) => {
                        console.log('An err occured: ', err);
                    })
    }

    let oneClass = new Class;
    oneClass.name = req.body.name;
    oneClass.status = req.body.status;

    oneClass.save()
        .then((data) => {
            createSlots(data.name)
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
    oneSubject.periods = req.body.periods;
    

    oneSubject.save()
        .then((data) => {
            res.redirect('/dashboard/subjects');
        })
        .catch((err) => {
            console.log("Error occured", err);
            res.send(`${err.name}: ${err._message}`);
        });
}

exports.createTimeTable = function (req, res, next) {
    let oneTimetable = new Timetable;
    oneTimetable.name = req.body.name;
    oneTimetable.time = req.body.time;
    oneTimetable.day = req.body.day;

    oneTimetable.save()
        .then((data) => {
            res.redirect('/timetable');
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
    Subject.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, status: req.body.status, class: req.body.class, periods: req.body.periods })
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

exports.timetable = function (req, res, next) {
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
};

