// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { task } = req.body;
  tasks.push({ id: tasks.length + 1, task });
  res.status(201).json({ message: 'Task added successfully' });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
  if (taskIndex !== -1) {
    tasks[taskIndex].task = task;
    res.json({ message: 'Task updated successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
