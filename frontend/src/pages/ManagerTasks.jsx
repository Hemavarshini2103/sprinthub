import { useEffect, useState } from "react";
import "./Projects.css";
import "./Dashboard.css";

import {
    getTasks,
    getProjects,
    getUsers,
    createTask,
    deleteTask,
    updateTask
} from "../services/api";

function ManagerTasks({ onNavigate = () => {} }) {

   const [tasks, setTasks] = useState([]);
const [projects, setProjects] = useState([]);
const [users, setUsers] = useState([]);
const [showForm, setShowForm] = useState(false);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [status, setStatus] = useState("TODO");
const [projectId, setProjectId] = useState("");
const [assignedUserId, setAssignedUserId] = useState("");
const [editingTaskId, setEditingTaskId] = useState(null);
const handleCreateTask = () => {

    const taskData = {
        title: title,
        description: description,
        status: status,
        projectId: Number(projectId),
        assignedUserId: Number(assignedUserId)
    };

    createTask(taskData)
        .then(data => {
            console.log("TASK CREATED:", data);
            setTasks([...tasks, data]);
            setShowForm(false);
        })
        .catch(error => {
            console.error("CREATE TASK ERROR:", error);
        });
};
const handleDeleteTask = (id) => {

    deleteTask(id)
        .then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => {
            console.error("DELETE TASK ERROR:", error);
        });
};
const handleEditTask = (task) => {

    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setProjectId(task.projectId);
    setAssignedUserId(task.assignedUserId);
    setShowForm(true);
};

    useEffect(() => {

    getTasks()
        .then(data => {
            setTasks(data);
        })
        .catch(error => {
            console.error(error);
        });

    getProjects()
        .then(data => {
            setProjects(data);
        })
        .catch(error => {
            console.error(error);
        });
          getUsers()
        .then(data => {
            setUsers(data);
        })
        .catch(error => {
            console.error(error);
        });
}, []);

    return (
        <div className="dashboard">

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <div className="sidebar-logo-mark">
                        S
                    </div>

                    <span>SprintHub</span>
                </div>


                <nav className="sidebar-nav">

                    <button
                        className="nav-item"
                        onClick={() => onNavigate("dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        className="nav-item"
                        onClick={() => onNavigate("projects")}
                    >
                        Projects
                    </button>

                    <button className="nav-item active">
                        Tasks
                    </button>

                </nav>


             <button
    className="logout-button"
    onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        window.location.href = "/";
    }}
>
    Logout
</button>

            </aside>


            <main className="main-content">

                <div className="page">

                    <div className="page-header">

    <div>
        <h1>Tasks</h1>
        <p>Manage your team tasks</p>
    </div>

  <button
    className="login-button"
    onClick={() => {
        setEditingTaskId(null);
        setTitle("");
        setDescription("");
        setStatus("TODO");
        setProjectId("");
        setAssignedUserId("");
        setShowForm(true);
    }}
>
    + Create Task
</button>

</div>
{showForm && (
    <div className="project-card">

        <div>

            <h2>Create Task</h2>

            <input
    type="text"
    placeholder="Task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
/>

           <textarea
    placeholder="Task description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
/>

            <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
>
    <option value="TODO">TODO</option>
    <option value="IN_PROGRESS">IN_PROGRESS</option>
    <option value="COMPLETED">COMPLETED</option>
</select>
<select
    value={projectId}
    onChange={(e) => setProjectId(e.target.value)}
>
    <option value="">
        Select Project
    </option>

    {projects.map(project => (
        <option
            key={project.id}
            value={project.id}
        >
            {project.name}
        </option>
    ))}
</select>
<select
    value={assignedUserId}
    onChange={(e) => setAssignedUserId(e.target.value)}
>
    <option value="">
        Select User
    </option>

    {users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    ))}
</select>

            <div>

           <button
    className="login-button"
    onClick={() => {
        if (editingTaskId) {
            const taskData = {
                title: title,
                description: description,
                status: status,
                projectId: Number(projectId),
                assignedUserId: Number(assignedUserId)
            };

            updateTask(editingTaskId, taskData)
                .then(data => {
                    setTasks(
                        tasks.map(task =>
                            task.id === editingTaskId ? data : task
                        )
                    );

                    setEditingTaskId(null);
                    setShowForm(false);
                })
                .catch(error => {
                    console.error("UPDATE TASK ERROR:", error);
                });

        } else {
            handleCreateTask();
        }
    }}
>
    {editingTaskId ? "Update" : "Create"}
</button>

                <button
                    className="logout-button"
                    onClick={() => setShowForm(false)}
                >
                    Cancel
                </button>

            </div>

        </div>

    </div>
)}

                    <div className="project-list">

                     {tasks.map(task => (

    <div
        className="project-card"
        key={task.id}
    >

        <div>

            <h2>
                {task.title}
            </h2>

            <p>
                {task.description}
            </p>

        </div>

        <div>

            <span className="project-status">
                {task.status}
            </span>

            <button
                className="login-button"
                onClick={() => handleEditTask(task)}
            >
                Edit
            </button>

            <button
                className="logout-button"
                onClick={() => handleDeleteTask(task.id)}
            >
                Delete
            </button>

        </div>

    </div>

))}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default ManagerTasks;