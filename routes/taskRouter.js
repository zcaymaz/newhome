const router = require('express').Router();
const TaskCtrl = require('../controllers/taskCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin')


router.route('/task')
    .get(TaskCtrl.getTasks)
    .post(TaskCtrl.createTask)

router.route('task/:id')
    .delete(auth, TaskCtrl.deleteTask)
    .put(auth, TaskCtrl.updateTask)

module.exports = router