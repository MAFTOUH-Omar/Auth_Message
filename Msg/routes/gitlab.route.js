const express = require('express');
const router = express.Router();
const {
    getAllGitLabIssues,
    createGitLabIssue,
    deleteGitLabIssue,
    insertGitLabIssues
  } = require('../controllers/gitlab.controller');
  
  // Route to get all GitLab issues
  router.get('/issues', getAllGitLabIssues);
  
  // Route to create a new GitLab issue
  router.post('/issues', createGitLabIssue);
  
  // Route to delete a GitLab issue by ID
  router.delete('/issues/:id', deleteGitLabIssue);
  // Route to insert GitLab issues into MongoDB
    router.post('/issues/insert', insertGitLabIssues);
  module.exports = router;
  
