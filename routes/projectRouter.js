const router = require('express').Router();
const ProjectCtrl = require('../controllers/projectCtrl');
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.route('/project')
    .get(ProjectCtrl.getProjects)
    .post(uploadMiddleware.array('images', 10), ProjectCtrl.createProject)

router.route('/project/:id')
    .get(ProjectCtrl.getProjectById)
    .delete(ProjectCtrl.deleteProject)
    .put(uploadMiddleware.array('images', 10), ProjectCtrl.updateProject)

router.route('/project/email')
    .post(ProjectCtrl.getProjectsUser)

module.exports = router