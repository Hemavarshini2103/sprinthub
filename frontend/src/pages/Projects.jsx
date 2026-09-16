import { useEffect, useState } from "react";
import "./Projects.css";
import "./Dashboard.css";
import { getProjects } from "../services/api";

function Projects({ onNavigate = () => {} }) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        getProjects()
            .then(data => {
                setProjects(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

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

                    <button className="nav-item active">
                        Projects
                    </button>

                    <button
    className="nav-item"
    onClick={() => onNavigate("tasks")}
>
    My Tasks
</button>

                </nav>

                <button
    className="logout-button"
    onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
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
                            <h1>Projects</h1>
                            <p>Projects you are working on</p>
                        </div>
                    </div>


                    <div className="project-list">

                        {projects.map(project => (
                            <div
                                className="project-card"
                                key={project.id}
                            >

                                <div>
                                    <h2>{project.name}</h2>
                                    <p>{project.description}</p>
                                </div>

                                <span className="project-status">
                                    {project.status}
                                </span>

                            </div>
                        ))}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Projects;