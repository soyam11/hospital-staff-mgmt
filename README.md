# Hospital Staff Management System

## Overview

The Hospital Staff Management System is a Node.js-based application designed to manage staff records in a hospital setting efficiently. The system allows for creating, reading, updating, and deleting staff records, and implements role-based access control to ensure data security and integrity.

## Features

- **CRUD Operations**: Manage staff records with create, read, update, and delete functionalities.
- **Role-Based Access Control**: Different roles with specific permissions to protect sensitive information.
- **Token-Based Authentication**: Secure authentication mechanism using JSON Web Tokens (JWT).
- **Data Validation**: Ensures the integrity of data entered into the system.

## Technology Stack

- **Backend**: Node.js with Express.js framework.
- **Database**: MySQL.
- **ORM**: Sequelize.
- **Authentication**: JWT for secure token-based authentication.
- **Testing**: Jest for unit testing.
- **Containerization**: Docker for easy deployment and environment consistency.

## Installation

1. **Clone the Repository**:
    git clone https://github.com/your-repository/hospital-staff-management.git
    cd hospital-staff-management

2. **Install Dependencies**:
    npm install

3. **Environment Setup**:
    Create a `.env` file in the project root and add the following:
    SECRET=<your_private_secret>

4. **Database Setup**:
    Ensure MySQL is installed and running. Create a database as per the `config/db.config.js` configuration.

5. **Start the Application**:
    node server.js


## API Endpoints

- **Auth**:
- POST `/api/auth/signin`: Sign in a user.

- **Staff**:
- POST `/api/staff`: Create a new staff record.
- GET `/api/staff/:id`: Retrieve a staff record.
- PUT `/api/staff/:id`: Update a staff record.
- DELETE `/api/staff/:id`: Delete a staff record.

## Running Tests

Run unit tests with the following command: npm test


## Deployment with Docker

1. **Build the Docker Image**: docker-compose build

2. **Run the Docker Container**: docker-compose up 

