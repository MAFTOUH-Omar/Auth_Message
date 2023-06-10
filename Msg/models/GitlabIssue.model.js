const mongoose = require('mongoose');
// Define the GitLabIssue schema
const gitLabIssueSchema = new mongoose.Schema({
  issueId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Add more fields as needed
});
// Create the GitLabIssue model
const GitLabIssue = mongoose.model('GitLabIssue', gitLabIssueSchema);

module.exports = GitLabIssue;