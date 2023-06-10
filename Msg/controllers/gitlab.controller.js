const GitLabIssue = require('../models/GitlabIssue.model');
const axios = require('axios');
const { MongoClient } = require('mongodb');
// Controller function to get all GitLab issues
const insertGitLabIssues = async (req, res) => {
  try {
    // Fetch GitLab issues using the API
    const response = await axios.get('https://gitlab.com/api/v4/issues', {
      headers: {
        'Private-Token': 'glpat-hegedP8XpmMJLzb3zY2R',
      },
    });

    const issues = response.data;

    // Create a MongoDB client and connect to the database
    const client = new MongoClient('mongodb://127.0.0.1:27017/FS_201', {
      useUnifiedTopology: true,
    });
    await client.connect();

    // Access the desired database and collection
    const db = client.db('FS_201');
    const collection = db.collection('gitlabissues');

    // Insert GitLab issues into the collection
    const result = await collection.insertMany(issues);

    res.status(200).json({ message: `${result.insertedCount} GitLab issues inserted` });
  } catch (error) {
    console.error('Error inserting GitLab issues:', error);
    res.status(500).json({ error: 'Failed to insert GitLab issues' });
  }
};
const getAllGitLabIssues = async (req, res) => {
  try {
    // Fetch all GitLab issues from the database
    const issues = await GitLabIssue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get GitLab issues' });
  }
};

// Controller function to create a new GitLab issue
const createGitLabIssue = async (req, res) => {
  try {
    // Extract the issue details from the request body
    const { title, description } = req.body;

    // Make a POST request to the GitLab API to create the issue
    const response = await axios.post('https://gitlab.com/api/v4/projects/45224080/issues', {
      title,
      description,
    }, {
      headers: {
        'Private-Token': 'glpat-hegedP8XpmMJLzb3zY2R', // Replace with your GitLab access token
      },
    });

    // Retrieve the created issue data from the response
    const createdIssue = response.data;

    // Return the created issue data as the response
    res.json(createdIssue);
  } catch (error) {
    console.error('Error creating GitLab issue:', error);
    res.status(500).json({ error: 'Failed to create GitLab issue' });
  }
};

// Controller function to delete a GitLab issue
const deleteGitLabIssue = async (req, res) => {
  try {
    // Extract the issue ID from the request parameters
    const { id } = req.params;

    // Make a DELETE request to the GitLab API to delete the issue
    const response = await axios.delete(`https://gitlab.com/api/v4/projects/45224080/issues/${id}`, {
      headers: {
        'Private-Token': 'glpat-hegedP8XpmMJLzb3zY2R', // Replace with your GitLab access token
      },
    });

    // Check the response status to determine if the issue was deleted successfully
    if (response.status === 204) {
      res.status(200).json({ message: 'Issue deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete GitLab issue' });
    }
  } catch (error) {
    console.error('Error deleting GitLab issue:', error);
    res.status(500).json({ error: 'Failed to delete GitLab issue' });
  }
};
module.exports = { getAllGitLabIssues, createGitLabIssue, deleteGitLabIssue, insertGitLabIssues  };