# TaskBoard Backend API
A Node.js Express backend for a Task Board application with Node.js with express server, MySQL and Socket.io

## Features
- **Authentication**: JWT-based Register & Login.
- **Task Management**: CRUD operations for tasks and assign tasks for users.
- **Filtering**: Filter tasks by status, priority, and assignee.
- **Real-time Updates**: Socket.io notifications for task creation, updates, and deletion.

# Setup Instructions

## 1. Database 
1.  MySQL should be installed and running.
2.  Login to MySQL shell or use a UI tool (like MySQL Workbench).
3.  Run the contents of `schema.sql` to create the database and tables.

## 2. Environment variables Configuration
1.  Create a .env files with following parameters. Fill all the credentials specified with correct values. Use '' if you are using mix of characters when specifying values for each parameter ex: JWT_SECRET='ants#creation', otherwise it will not be accessed by your application:
    ```env
    PORT=<server port that backend should run Ex: 5000 or 5001>                
    DB_HOST=<Database host ex:localhost>
    DB_USER=<Database User ex:root>
    DB_PASSWORD=<MySQL server passsword>
    DB_NAME=<Database name ex: taskboard_db>
    JWT_SECRET=<give any secret value ex:antscreation>
    ```

## 3. Install the required dependencies
```bash
npm install
```

## 4. Running the Server
```bash
npm run dev
```
*Note: Might need to install nodemon globally or add it to devDependencies (`npm install -D nodemon`) and add a script `"dev": "nodemon src/server.js"` to package.json.*

### API Documentation
Import the `postman_collection.json` file into Postman to test the endpoints. Set the base URL accordingly as per your setup. By default it will be setup to `http://localhost:5000`

### Real-time Events (Socket.io)
Connect to `http://localhost:{port}` using a Socket.io client.
1. Open Postman.
2. Click New -> Socket.io.
3. Enter the URL: ex: `http://localhost:5001`.
4. Click Connect.
5. In the "Events" tab, add the event names you want to listen to (e.g., taskCreated, taskUpdated, taskDeleted).
    **Events Emitted:**
    - `taskCreated`: Payload includes the new task object.
    - `taskUpdated`: Payload includes the updated task object.
    - `taskDeleted`: Payload is the ID of the deleted task.
6. When you trigger your API with a normal HTTP request, you will see the event appear in the Postman Socket.io window.

