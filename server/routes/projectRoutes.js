const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authentication');

const { createProject, getAllProjects, updateProject, getSingleProject, getAllArchived, getAllCompleted } = require('../controllers/projectController');
// const { getAllArchived } = require('../controllers/archivedController');

router.route('/').post(authenticateUser, createProject)

router.route('/all').get(authenticateUser, getAllProjects);
router.route('/archived').get(authenticateUser, getAllArchived);
router.route('/completed').get(authenticateUser, getAllCompleted);

router
.route('/:id')
.get(getSingleProject)
.patch(authenticateUser, updateProject);


module.exports = router