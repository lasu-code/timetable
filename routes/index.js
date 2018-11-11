let express = require('express');
let router = express.Router();
const timeTableController = require('../controllers/timeTableController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', timeTableController.homePage);
router.get('/student', timeTableController.studentsPage);
router.get('/dashboard', timeTableController.dashboardPage);
router.get('/dashboard/classes', timeTableController.classPage);
router.post('/dashboard/classes', timeTableController.classPost);
router.get('/dashboard/classes/edit/:id', timeTableController.oneClassPage);
router.put('/dashboard/classes/edit/:id', timeTableController.oneClassPost);
router.delete('/dashboard/classes/edit/:id', timeTableController.oneClassDelete);

module.exports = router;
