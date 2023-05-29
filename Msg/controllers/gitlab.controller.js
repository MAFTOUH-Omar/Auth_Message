const { Gitlab } = require('gitlab');
const GitlabIssue = require('../models/GitlabIssue.model');

// Create an instance of the Gitlab API client
const api = new Gitlab({
    url: 'https://gitlab.com/api/v4/issues',
    token: 'glpat-BHAnsnvxQY7Gj2JiNxQ3',
  });
  
  // Controller function to fetch GitLab issues and save them to MongoDB
  exports.fetchAndSaveIssues = async (req, res) => {
    try {
      // Fetch issues from GitLab API
      const issues = await api.Issues.all({ per_page: 100 }); // Increase per_page if necessary
        // Filter out duplicate issues based on their issue ID
        const uniqueIssues = filterUniqueIssues(issues);
        // Save issues to MongoDB
        await GitlabIssue.insertMany(uniqueIssues);
        res.status(200).json({ message: 'GitLab issues saved to MongoDB' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch and save GitLab issues' });
    }
  };
  function filterUniqueIssues(issues) {
    const uniqueIssueIds = new Set();
    const uniqueIssues = [];
  
    for (const issue of issues) {
      if (!uniqueIssueIds.has(issue.id)) {
        uniqueIssueIds.add(issue.id);
        uniqueIssues.push(issue);
      }
    }
  
    return uniqueIssues;
  }