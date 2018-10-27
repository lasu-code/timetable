var express = require('express');
var router = express.Router();
const timeTableController = require('../controllers/timeTableController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', timeTableController.homePage);
router.get('/student', timeTableController.studentsPage);
router.get('/dashboard', timeTableController.dashboardPage);
router.get('/dashboard1', timeTableController.dashboardPage1);
router.get('/dashboard2', timeTableController.dashboardPage2);
router.get('/dashboard3', timeTableController.dashboardPage3);


module.exports = router;
