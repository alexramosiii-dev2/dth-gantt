const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require('express-session');

const app = express();
const PORT = 5030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'c1dbd189-740e-41ea-8dd2-3dc55f7a5107', 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(express.static("public"));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Folder where EJS files will reside

const Projects  = require("./models/_projectModel");
const Tasks = require('./models/_taskModel');


app.get('/', (req, res) => {
  res.redirect("/gantt");
});

app.get('/gantt', async (req, res) => {
  res.render('gantt');
});

app.get('/gantt/projects/:id', async (req, res) => {
  const id = req.params.id;
  const project = await Projects.findByID(id);
  const tasks = await Tasks.findAll({project_id: id});
  res.render('project', {project, tasks});//page with project info and tasks
});


//////////////////////////////////////APPIS

//SHOW ALL PROJECTS
app.get('/data/projects', async (req, res) => {
  let projects = await Projects.findAll();
  res.status(200).json(projects); //returns all projects
});

//CREATE NEW PROJECT
app.post('/data/projects', async (req, res) => {
  if(!req.body) return res.status(400).send("Values are needed");
  const id = await Projects.create(req.body);//creates a new project
  res.redirect("/");
})

//EDIT A PROJECT
app.patch('/data/projects/:id', async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await Projects.update(id, updateData);
  if(result.changes) return res.status(200).json({"message": "Project updated successfully"});
  else return res.status(500).json({"message": "Internal server error"});
})




//----------TASKS

//get ALL tasks for a project
app.get('/data/projects/:id/tasks', async (req, res) => {
  const project_id = req.params.id
  const tasks = await Tasks.findAll({project_id});
  res.status(200).json(tasks);//returns all project tasks
})

//crete a new task
app.post('/data/tasks', async (req, res) => {
  const project_id = req.body.project_id;
  if(!req.body) return res.status(400).send("Values are needed");
  const id = await Tasks.create(req.body);
  res.redirect(`/gantt/projects/${project_id}`);
})


//GET ONE TASK INFO
app.get('/data/tasks/:id', async (req, res) => {
  const id = req.params.id;
  let task = await Tasks.findByID(id);
  res.status(200).json(task);
})

//EDIT A TASK
app.patch('/data/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await Tasks.update(id, updateData);
  if(result.changes) return res.status(200).json({"message": "Task updated successfully"});
  else return res.status(500).json({"message": "Internal server error"});
})

//DELETE A PROJECT
app.delete('/data/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Tasks.delete(id)
  if(result.changes) return res.sendStatus(200).json({"message": "Task deleted successfully"});
  else return res.sendStatus(500).json({"message": "Internal server error"});
})



app.get('/gantt-basic', async (req, res) => {
  // const tasksHeader = req.headers['tasks'];
  // const tasks = JSON.parse(tasksHeader);

  // //make data fit for gantt chart libary
  // let adjusted_tasks = tasks.map((item) => {
  //   return {
  //       ...item,
  //       start: new Date(item.task_start_date * 1000),
  //       end: new Date(item.task_end_date * 1000),
  //       dependencies: JSON.parse(item.task_parents),
  //       id: item.id_specific,
  //       name: "asdadasd",
  //       progress: 0,
  //   }
  // })

  res.render("gantt-basic")
})


app.get('/gantt-basic/test', async (req, res) => {


  let tasks = [
    {
      id_general: "abc",
      id_specific: "def",
      task_parents: [],
      task_children: [],
      task_creator: "asdasd",
      task_start_date: 1726392398,
      task_end_date: 1728984398,
      is_evergreen: false,
      is_untimed: false,
      task_assignments: [],
      material_need: [],
      project_parent: "Project #1",
      task_desc: "This is a taks description",
    },
    {
      id_general: "abc",
      id_specific: "def",
      task_parents: [],
      task_children: [],
      task_creator: "asdasd",
      task_start_date: 1726392398,
      task_end_date: 1728984398,
      is_evergreen: false,
      is_untimed: false,
      task_assignments: [],
      material_need: [],
      project_parent: "Project #1",
      task_desc: "This is a taks description",
    },
    {
      id_general: "abc",
      id_specific: "def",
      task_parents: [],
      task_children: [],
      task_creator: "asdasd",
      task_start_date: 1726392398,
      task_end_date: 1728984398,
      is_evergreen: false,
      is_untimed: false,
      task_assignments: [],
      material_need: [],
      project_parent: "Project #1",
      task_desc: "This is a taks description",
    },
    {
      id_general: "abc",
      id_specific: "def",
      task_parents: [],
      task_children: [],
      task_creator: "asdasd",
      task_start_date: 1726392398,
      task_end_date: 1728984398,
      is_evergreen: false,
      is_untimed: false,
      task_assignments: [],
      material_need: [],
      project_parent: "Project #1",
      task_desc: "This is a taks description",
    }
  ]

  let adjusted_tasks = tasks.map((item) => {
    return {
        ...item,
        start: new Date(item.task_start_date * 1000),
        end: new Date(item.task_end_date * 1000),
        dependencies: item.task_parents,
        id: item.id_specific,
        name: "asdadasd",
        progress: 0,
    }
  })

  res.render("iframe-gantt", {tasks: adjusted_tasks})
})



// Projects
// GET /projects: Get all projects
// POST /projects: Create a new project
// GET /projects/:projectId: Get a specific project by ID
// PUT /projects/:projectId: Update a project
// DELETE /projects/:projectId: Delete a project
// Tasks (related to a project)

// GET /projects/:projectId/tasks: Get all tasks for a specific project
// POST /projects/:projectId/tasks: Create a new task for a specific project
// GET /projects/:projectId/tasks/:taskId: Get a specific task by ID
// PUT /projects/:projectId/tasks/:taskId: Update a task
// DELETE /projects/:projectId/tasks/:taskId: Delete a task
// Subtasks (related to a task)

// GET /projects/:projectId/tasks/:taskId/subtasks: Get all subtasks for a specific task
// POST /projects/:projectId/tasks/:taskId/subtasks: Create a new subtask for a specific task
// GET /projects/:projectId/tasks/:taskId/subtasks/:subtaskId: Get a specific subtask by ID
// PUT /projects/:projectId/tasks/:taskId/subtasks/:subtaskId: Update a subtask
// DELETE /projects/:projectId/tasks/:taskId/subtasks/:subtaskId: Delete a subtask






// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Close the database connection when the application is exiting
const db = require("./models/db");
const { start } = require("repl");
const { log } = require("console");
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database ' + err.message);
    } else {
      console.log('Database closed.');
    }
    process.exit(0);
  });
});

