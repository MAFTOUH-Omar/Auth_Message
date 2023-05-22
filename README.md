## Description

This repository contains a sample application built with Express.js, MongoDB, and JWT for authentication and a Message model for handling messages. It also includes Dockerfiles and a Docker Compose file for easy deployment and containerization of the application.
##Features

    User authentication: The application provides user authentication using JSON Web Tokens (JWT). Users can sign up, log in, and access protected routes by validating their JWT tokens.

    Message model: The application includes a Message model that allows users to send and receive messages. Messages can be created, retrieved, updated, and deleted through the provided API endpoints.

    MongoDB integration: MongoDB is used as the database to store user information, messages, and other necessary data. The application utilizes MongoDB's flexible document model for efficient data storage and retrieval.

## Technologies Used

    Express.js: A popular Node.js web application framework used for building RESTful APIs and handling HTTP requests/responses.

    MongoDB: A NoSQL document database used for persistent storage of user information, messages, and other data.

    JWT (JSON Web Tokens): A standard method for representing claims securely between two parties. JWTs are used for user authentication and authorization.

    Docker: The application is containerized using Docker, allowing for easy deployment, portability, and scalability.

## Repository Structure

    src/: Contains the source code for the Express.js application, including routes, controllers, models, and middleware.

    docker/: Contains the Dockerfiles used to build the application's Docker images.

    docker-compose.yml: A Docker Compose file that defines the services required to run the application, including the Express.js app and MongoDB database.

## Usage

  Clone the repository:

git clone <repository-url>

Set up the environment variables:

    Create a .env file in the root directory of the project.
    Add necessary environment variables such as database connection details, JWT secret, etc.

Build and run the application using Docker Compose:


    docker-compose up --build

    Access the application:
        The Express.js application will be running on http://localhost:<port>, where <port> is the port specified in the .env file or the default port if not specified.
        Use API testing tools like Postman or cURL to interact with the application's endpoints.

Feel free to explore the code and modify it according to your requirements.

# Note: Make sure you have Docker and Docker Compose installed on your machine before running the application using Docker.
