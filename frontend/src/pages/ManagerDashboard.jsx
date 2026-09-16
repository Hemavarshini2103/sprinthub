import { useEffect, useState } from "react";
import "./Dashboard.css";
import { getProjects, getTasks } from "../services/api";
import ManagerProjects from "./ManagerProjects";
import ManagerTasks from "./ManagerTasks";

function ManagerDashboard() {

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
        return <ManagerProjects onNavigate={setCurrentPage} />;
    }

    if (currentPage === "tasks") {
        return <ManagerTasks onNavigate={setCurrentPage} />;
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

    <button
        className={`nav-item ${
            currentPage === "dashboard" ? "active" : ""
        }`}
        onClick={() => setCurrentPage("dashboard")}
    >
        Dashboard
    </button>

    <button
        className={`nav-item ${
            currentPage === "projects" ? "active" : ""
        }`}
        onClick={() => setCurrentPage("projects")}
    >
        Projects
    </button>

    <button
        className="nav-item"
        onClick={() => setCurrentPage("tasks")}
    >
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


            {/* Main Content */}
            <main className="main-content">

                <header className="dashboard-header">

                    <div>
                        <h1>Manager Dashboard</h1>
                        <p>Manage your projects and team tasks</p>
                    </div>

                    <div className="profile">
                        <div className="profile-avatar">M</div>
                        <span>SprintHub Manager</span>
                    </div>

                </header>


                {/* Statistics */}
                <section className="stats-grid">

                    <div className="stat-card">
                        <span className="stat-label">
                            Total Projects
                        </span>
                        <strong>{projects.length}</strong>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">
                            Total Tasks
                        </span>
                        <strong>{tasks.length}</strong>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">
                            In Progress
                        </span>
                        <strong>
    {tasks.filter(task => task.status === "IN_PROGRESS").length}
</strong>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">
                            Completed
                        </span>
                        <strong>
    {tasks.filter(task => task.status === "COMPLETED").length}
</strong>
                    </div>

                </section>


                {/* Management Actions */}
                <section className="tasks-section">

                    <div className="section-header">

                        <div>
                            <h2>Management</h2>
                            <p>
                                Manage projects and tasks
                            </p>
                        </div>

                    </div>


                    <div className="stats-grid">

                        <div className="stat-card">
                            <span className="stat-label">
                                Projects
                            </span>

                            <button
    className="login-button"
    onClick={() => setCurrentPage("projects")}
>
    Manage Projects
</button>
                        </div>


                        <div className="stat-card">
                            <span className="stat-label">
                                Tasks
                            </span>

                            <button
    className="login-button"
    onClick={() => setCurrentPage("tasks")}
>
    Manage Tasks
</button>
                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default ManagerDashboard;