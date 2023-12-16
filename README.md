# To-Do-List Application

## This To-Do-List Application has been developed using React Js for the Client Side, and Node Js For the Server Side

### Prerequisites:

- Node.js and npm (Node Package Manager) Should be installed

### Tasks

`### 1. Set up the backend with Node.js`

```
mkdir to-do-app
cd to-do-app
npm init -y
```

`npm init -y` - This command is a shortcut for initializing a new npm package in your current directory. Here's what it does in detail:

1. `npm init`: This command starts the npm package initialization process. It interactively asks you questions about your package, like its name, version, description, author, and keywords.

2. `-y`: This flag tells npm to skip the interactive questions and automatically create a package.json file based on default values. It's essentially like answering "yes" to all the questions.

`npm init -y` creates a basic `package.json` file with default values for your project, saving you time from manually filling out the information.


2. Install Packages

```
npm install express body-parser cors
```

This Command installs three popular Node.js packages for web development:

1. `express:` This is a popular framework for building web applications and APIs in JavaScript. It provides a powerful and flexible foundation for handling routes, requests, responses, and middleware.

2. `body-parser:` This middleware parses the incoming request body and makes it accessible through the req.body property. This is crucial for processing form data, JSON payloads, and other types of data submitted through POST or PUT requests.

3. `cors:` This middleware enables Cross-Origin Resource Sharing (CORS). This allows your web application to make requests to servers on different domains, which is essential for building modern web applications that interact with external APIs or services.

- `express:` Handles the overall routing and logic of your application.

- `body-parser:` Extracts data from the request body and makes it available to your application code.

- `cors:` Enables your application to communicate with other servers on different domains, preventing security restrictions.


### `Create a simple Express server:`

[index.js]()

```

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let tasks = [];

// API endpoints
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { task } = req.body;
  tasks.push({ id: tasks.length + 1, task });
  res.status(201).json({ message: 'Task added successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### `2. Set up the React frontend`

```
npx create-react-app client
cd client
```

- Start the React app:

```
npm start
```

### `Implementing frontend components and API integration`

[App.js]()

```
// App.js (in the 'client' folder)

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTask }),
      });
      if (response.status === 201) {
        setNewTask('');
        fetchTasks();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

### `4. Run the application`

In separate terminal windows, run both the frontend and backend:

- For the backend (in the root directory):

```
node index.js
```

- For the frontend (in the 'client' directory):

```
npm start
```

Access the To-Do list app by opening a browser and going to `http://localhost:3000/`

### Modifying the client side to look more appealing

[App.css]()

```

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.App {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

h1 {
  text-align: center;
}

input[type='text'] {
  width: calc(100% - 80px);
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 8px 15px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border-bottom: none;
}

```

To apply styles, ensure that the `App.css` file in your React app (`client/src/App.css`). You should see the changes reflected when you run the application (`npm start`)