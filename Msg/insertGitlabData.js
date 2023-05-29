const axios = require('axios');
const { MongoClient } = require('mongodb');

// Function to insert GitLab issues into MongoDB
async function insertGitlabData() {
  try {
    // Fetch GitLab issues using the API
    const response = await axios.get('https://gitlab.com/api/v4/issues', {
      headers: {
        'Private-Token': 'glpat-BHAnsnvxQY7Gj2JiNxQ3',
      },
    });

    const issues = response.data;

    // Create a MongoDB client and connect to the database
    const client = new MongoClient('mongodb://127.0.0.1:27017/FS_201');
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the desired database and collection
    const db = client.db('FS_201');
    const collection = db.collection('gitlabissues');


    // Create a unique index on the 'iid' field to ensure uniqueness
    await collection.createIndex({ iid: 1 }, { unique: true });

    // Insert GitLab issues into the collection
    const result = await collection.insertMany(issues);
    console.log(`${result.insertedCount} GitLab issues inserted`);

    // Close the MongoDB connection
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error inserting GitLab issues:', error);
  }
}

// Call the function to insert GitLab data
insertGitlabData();
