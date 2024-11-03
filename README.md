# personal-task-manager
# Personal Task Manager API

## Project Overview
This project aims to simulate a real-world application for managing tasks, providing hands-on experience with Node.js, HTTP, the file system, and basic routing.

## Features
1. **Task CRUD Operations**: Create, Read, Update, and Delete tasks.
2. **Image Upload for Tasks**: Users can upload images when creating or updating tasks.
3. **Task Storage**: Tasks are stored in a JSON file using the `fs` module.
4. **HTTP Server**: A Node.js server handles CRUD operations on tasks.
5. **Task Persistence**: Tasks are saved in the JSON file across server restarts.
6. **Optional: Basic Authentication**: Simple login with hardcoded credentials.

## Recent Changes
### Updated File Handler
- **File Handling Improvements**: The `fileHandler.js` has been updated to include error handling and new utility functions.
  - **Added Functions**:
    - `readFile`: Reads a file and returns parsed JSON data. Creates the file if it does not exist.
    - `writeFile`: Writes data to a specified file with error handling.
    - `deleteFile`: Deletes a specified file with error handling.

### Task Controller Updates
- The task controller has been updated to utilize the new file handler functions, especially during task deletion to manage associated files better.

## Folder Structure
