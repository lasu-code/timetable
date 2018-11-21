var express = require('express');
var router = express.Router();
let passport = require("passport");

const timeTableController = require('../controllers/timeTableController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', timeTableController.homePage);
router.get('/student', timeTableController.studentsPage);
router.get('/student2', timeTableController.studentsPage2);
router.get('/dashboard', timeTableController.dashboardPage);
router.get('/timetable', timeTableController.timetable);
router.get('/registration', timeTableController.reg);


router.get('/dashboard/classes', timeTableController.classPage);
router.post('/dashboard/classes', timeTableController.classPost);
router.get('/dashboard/classes/edit/:id', timeTableController.oneClassPage);
router.put('/dashboard/classes/edit/:id', timeTableController.oneClassPost);
router.delete('/dashboard/classes/edit/:id', timeTableController.oneClassDelete);
router.get('/dashboard/subjects', timeTableController.subjectPage);
router.post('/dashboard/subjects', timeTableController.subjectPost);
router.get('/dashboard/subjects/edit/:id', timeTableController.oneSubjectPage);
router.put('/dashboard/subjects/edit/:id', timeTableController.oneSubjectPost);
router.delete('/dashboard/subjects/edit/:id', timeTableController.oneSubjectDelete);

router.post('dashboard/createTimeTable', timeTableController.createTimeTable);

router.post('/signup/user', passport.authenticate('local.registerUser', {
    successRedirect: '/registration',
    failureRedirect: '/#sign-up',
    failureFlash: true
}))


router.post('/login/user', passport.authenticate('local.loginUser', {
    successRedirect: '/dashboard',
    failureRedirect: '/#login',
    failureFlash: true
}))
module.exports = router;
