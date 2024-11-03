//task controller
const fs = require('fs');
const path = require('path');
const tasksFilePath = path.join(__dirname, '../data/tasks.json');

const readTasksFromFile = () => JSON.parse(fs.readFileSync(tasksFilePath, 'utf-8'));
const writeTasksToFile = (tasks) => fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

// Get all tasks
const getTasks = (req, res) => {
    const tasks = readTasksFromFile();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
};

// Create a task
const createTask = (req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        const newTask = JSON.parse(body);
        const tasks = readTasksFromFile();
        tasks.push({ id: tasks.length + 1, ...newTask });
        writeTasksToFile(tasks);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
    });
};

// Update a task
const updateTask = (req, res, id) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        const updatedTaskData = JSON.parse(body);
        const tasks = readTasksFromFile();
        const taskIndex = tasks.findIndex(task => task.id == id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTaskData };
            writeTasksToFile(tasks);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(tasks[taskIndex]));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Task not found' }));
        }
    });
};

// Delete a task
const deleteTask = (req, res, id) => {
    const tasks = readTasksFromFile();
    const filteredTasks = tasks.filter(task => task.id != id);
    if (tasks.length !== filteredTasks.length) {
        writeTasksToFile(filteredTasks);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task deleted' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task not found' }));
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
