# Task Manager Server

This project is a Task Manager Server built with Node.js and Express. It provides a RESTful API for managing tasks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Tasks

#### Get all tasks

- **URL:** `/readTasks`
- **Method:** `GET`
- **Description:** Retrieve all tasks.
- **Response:**

    ```json
    {
        "tasks": [
            {
                "id": "1",
                "taskName": "Task 1",
                "description": "Description for task 1",
                "completed": false
            },
            ...
        ],
        "message": "tasks retrieved successfully"
    }
    ```

#### Get a task by ID

- **URL:** `/singlTask/:id`
- **Method:** `GET`
- **Description:** Retrieve a task by its ID.
- **Response:**

    ```json
    {
        "id": "1",
        "taskName": "Task 1",
        "description": "Description for task 1",
        "completed": false
    }
    ```

#### Create a new task

- **URL:** `/createTask`
- **Method:** `POST`
- **Description:** Create a new task.
- **Request Body:**

    ```json
    {
        "newTask": {
            "taskName": "New Task",
            "description": "Description for the new task",
            "estimation": "2 hours",
            "type": "Development"
        }
    }
    ```

- **Response:**

    ```json
    {
        "task": {
            "id": "2",
            "taskName": "New Task",
            "description": "Description for the new task",
            "completed": false
        },
        "message": "Task created successfully"
    }
    ```

#### Update a task

- **URL:** `/updateTask/:id`
- **Method:** `PATCH`
- **Description:** Update an existing task.
- **Request Body:**

    ```json
    {
        "taskName": "Updated Task",
        "description": "Updated description",
        "completed": true
    }
    ```

- **Response:**

    ```json
    {
        "id": "1",
        "taskName": "Updated Task",
        "description": "Updated description",
        "completed": true
    }
    ```

#### Delete a task

- **URL:** `/delete/:id`
- **Method:** `DELETE`
- **Description:** Delete a task by its ID.
- **Response:**

    ```json
    {
        "id": "1",
        "taskName": "Deleted Task",
        "description": "Description for the deleted task",
        "completed": false
    }
    ```

#### Track date estimation

- **URL:** `/track/:id/trackEstimation`
- **Method:** `POST`
- **Description:** Track date estimation for a task.
- **Request Body:**

    ```json
    {
        "estimation": "3 hours"
    }
    ```

- **Response:**

    ```json
    {
        "id": "1",
        "taskName": "Task 1",
        "description": "Description for task 1",
        "estimation": "3 hours",
        "completed": false
    }
    ```

#### Update task status

- **URL:** `/:id/updateStatus`
- **Method:** `PATCH`
- **Description:** Update the status of a task.
- **Request Body:**

    ```json
    {
        "status": "In Progress"
    }
    ```

-
## Project Structure

```
/home/tgod/codeAttitudes/task-manager-server
├── node_modules
├── src
│   ├── controllers
│   │   └── taskController.js
│   ├── models
│   │   └── taskModel.js
│   ├── routes
│   │   └── taskRoutes.js
│   ├── app.js
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── ReadMe.md
```

- `src/controllers`: Contains the logic for handling requests and responses.
- `src/models`: Contains the data models.
- `src/routes`: Contains the route definitions.
- `src/app.js`: Initializes the Express application.
- `src/server.js`: Starts the server.