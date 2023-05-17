const router = require('express').Router();
const ProjectCtrl = require('../controllers/projectCtrl');
const auth = require('../middleware/auth');


router.route('/project')
    .get(ProjectCtrl.getProjects)
    .post(ProjectCtrl.createProject)

router.route('/project/:id')
    .get(ProjectCtrl.getProjectById)
    .delete(ProjectCtrl.deleteProject)
    .put(ProjectCtrl.updateProject)

router.route('/project/email')
    .post(ProjectCtrl.getProjectsUser)

module.exports = router