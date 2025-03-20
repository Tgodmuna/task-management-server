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

- **URL:** `/tasks`
- **Method:** `GET`
- **Description:** Retrieve all tasks.
- **Response:**

    ```json
    [
        {
            "id": "1",
            "title": "Task 1",
            "description": "Description for task 1",
            "completed": false
        },
        ...
    ]
    ```

#### Get a task by ID

- **URL:** `/tasks/:id`
- **Method:** `GET`
- **Description:** Retrieve a task by its ID.
- **Response:**

    ```json
    {
        "id": "1",
        "title": "Task 1",
        "description": "Description for task 1",
        "completed": false
    }
    ```

#### Create a new task

- **URL:** `/tasks`
- **Method:** `POST`
- **Description:** Create a new task.
- **Request Body:**

    ```json
    {
        "title": "New Task",
        "description": "Description for the new task"
    }
    ```

- **Response:**

    ```json
    {
        "id": "2",
        "title": "New Task",
        "description": "Description for the new task",
        "completed": false
    }
    ```

#### Update a task

- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **Description:** Update an existing task.
- **Request Body:**

    ```json
    {
        "title": "Updated Task",
        "description": "Updated description",
        "completed": true
    }
    ```

- **Response:**

    ```json
    {
        "id": "1",
        "title": "Updated Task",
        "description": "Updated description",
        "completed": true
    }
    ```

#### Delete a task

- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Description:** Delete a task by its ID.
- **Response:**

    ```json
    {
        "message": "Task deleted successfully"
    }
    ```

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
