const express = require('express');
const router = express.Router();
const gitlabController = require('../controllers/gitlab.controller');

// Route to fetch and save GitLab issues
router.get('/issues', gitlabController.insertGitlabData);
router.get('/show', gitlabController.getGitlabIssues);

module.exports = router;
