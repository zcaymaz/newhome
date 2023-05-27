const router = require('express').Router();
const TaskCtrl = require('../controllers/taskCtrl');
const uploadMiddleware = require('../middleware/uploadMiddleware');


router.route('/task')
    .get(TaskCtrl.getTasks)
    .post(uploadMiddleware.array('images', 10), TaskCtrl.createTask)

router.route('/task/:id')
    .get(TaskCtrl.getTaskById)
    .delete( TaskCtrl.deleteTask)
    .put(uploadMiddleware.array('images', 10), TaskCtrl.updateTask)

router.route('/task/email')
    .post(TaskCtrl.getTasksUser)

module.exports = router