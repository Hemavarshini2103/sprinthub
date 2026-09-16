import { useEffect, useState } from "react";
import "./Dashboard.css";
import { getProjects, getTasks } from "../services/api";
import Projects from "./Projects";
import MyTasks from "./MyTasks";
function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState("dashboard");
    useEffect(() => {

    getProjects()
        .then(data => {
            setProjects(data);
        })
        .catch(error => {
            console.error(error);
        });

    getTasks()
        .then(data => {
            setTasks(data);
        })
        .catch(error => {
            console.error(error);
        });

}, []);
    if (currentPage === "projects") {
    return <Projects onNavigate={setCurrentPage} />;
}
if (currentPage === "tasks") {
    return <MyTasks onNavigate={setCurrentPage} />;
}

return (
    <div className="dashboard">

            {/* Sidebar */}
            <aside className="sidebar">

                <div className="sidebar-logo">
                    <div className="sidebar-logo-mark">S</div>
                    <span>SprintHub</span>
                </div>

                <nav className="sidebar-nav">
                    <button className="nav-item active">
                        Dashboard
                    </button>

                    <button
    className="nav-item"
    onClick={() => setCurrentPage("projects")}
>
    Projects
</button>

                    <button
    className="nav-item"
    onClick={() => setCurrentPage("tasks")}
>
    My Tasks
</button>
                </nav>

                <button
    className="logout-button"
    onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        window.location.reload();
    }}
>
    Logout
</button>

            </aside>


            {/* Main Content */}
            <main className="main-content">

                <header className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>
    Welcome back, {localStorage.getItem("name")}!
</p>
                    </div>

                    <div className="profile">
                        <div className="profile-avatar">D</div>
                        <span>{localStorage.getItem("name")}</span>
                    </div>
                </header>


                {/* Statistics */}
                <section className="stats-grid">

                    <div className="stat-card">
                        <span className="stat-label">Projects</span>
                        <strong>{projects.length}</strong>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">My Tasks</span>
                        <strong>{tasks.length}</strong>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">In Progress</span>
                        <strong>
    {tasks.filter(task => task.status === "IN_PROGRESS").length}
</strong>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">Completed</span>
                        <strong>
    {tasks.filter(task => task.status === "COMPLETED").length}
</strong>
                    </div>

                </section>


                {/* Tasks */}
                <section className="tasks-section">

                    <div className="section-header">
                        <div>
                            <h2>My Tasks</h2>
                            <p>Tasks assigned to you</p>
                        </div>

                        <button
    className="view-all-button"
    onClick={() => setCurrentPage("tasks")}
>
    View All
</button>
                    </div>


                    <div className="task-list">

    {tasks.map(task => (
        <div className="task-card" key={task.id}>

            <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </div>

            <span className={`status ${
    task.status === "IN_PROGRESS"
        ? "in-progress"
        : task.status === "COMPLETED"
        ? "completed"
        : "todo"
}`}>
    {task.status === "IN_PROGRESS"
        ? "In Progress"
        : task.status === "COMPLETED"
        ? "Completed"
        : "To Do"}
</span>

        </div>
    ))}

</div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;