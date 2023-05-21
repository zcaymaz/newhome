const router = require('express').Router();
const TaskCtrl = require('../controllers/taskCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin')


router.route('/task')
    .get(TaskCtrl.getTasks)
    .post(TaskCtrl.createTask)

router.route('/task/:id')
    .get(TaskCtrl.getTaskById)
    .delete( TaskCtrl.deleteTask)
    .put( TaskCtrl.updateTask)

router.route('/task/email')
    .post(TaskCtrl.getTasksUser)

module.exports = router