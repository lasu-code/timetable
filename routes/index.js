var express = require('express');
var router = express.Router();
const timeController = require('../controllers/timeController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', timeTableController.homePage);
router.get('/student', timeTableController.studentsPage);
router.get('/dashboard', timeTableController.dashboardPage);


module.exports = router;
