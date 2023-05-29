const mongoose = require('mongoose');

const gitlabIssueSchema = new mongoose.Schema({
  project_id: {
    type: Number,
    unique: true,
  },
  title: String,
  description: String,
  // Add more fields as needed
});

const GitlabIssue = mongoose.model('GitlabIssue', gitlabIssueSchema);

module.exports = GitlabIssue;