import { useEffect, useState } from "react";
import "./Projects.css";
import "./Dashboard.css";
import { getTasks, updateTaskStatus } from "../services/api";

function MyTasks({ onNavigate = () => {} }) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        getTasks()
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);
    const handleStatusChange = (id, status) => {

    updateTaskStatus(id, status)
        .then(() => {

            setTasks(
                tasks.map(task =>
                    task.id === id
                        ? { ...task, status: status }
                        : task
                )
            );

        })
        .catch(error => {
            console.error("STATUS UPDATE ERROR:", error);
        });
};

    return (
        <div className="dashboard">

            {/* Sidebar */}
            <aside className="sidebar">

                <div className="sidebar-logo">
                    <div className="sidebar-logo-mark">S</div>
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
                        My Tasks
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


            {/* Main Content */}
            <main className="main-content">

                <div className="page">

                    <div className="page-header">
                        <div>
                            <h1>My Tasks</h1>
                            <p>Tasks assigned to you</p>
                        </div>
                    </div>


                    <div className="task-list">

                        {tasks.map(task => (
                            <div
                                className="task-card"
                                key={task.id}
                            >

                                <div>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                </div>

                               <select
    value={task.status}
    onChange={(e) =>
        handleStatusChange(task.id, e.target.value)
    }
>
    <option value="TODO">To Do</option>
    <option value="IN_PROGRESS">In Progress</option>
    <option value="COMPLETED">Completed</option>
</select>

                            </div>
                        ))}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default MyTasks;