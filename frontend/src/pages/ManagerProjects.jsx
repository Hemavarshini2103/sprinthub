import { useEffect, useState } from "react";
import "./Projects.css";
import "./Dashboard.css";
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} from "../services/api";
function ManagerProjects({ onNavigate = () => {} }) {

    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [status, setStatus] = useState("ACTIVE");
const [editingProject, setEditingProject] = useState(null);
const handleCreateProject = async () => {

    try {

        await createProject({
            name: name,
            description: description,
            status: status
        });

        const updatedProjects = await getProjects();
        setProjects(updatedProjects);

        setName("");
        setDescription("");
        setStatus("ACTIVE");
        setShowForm(false);

    } catch (error) {

        console.error(error);

    }
};
const handleEditProject = (project) => {

    setEditingProject(project);

    setName(project.name);
    setDescription(project.description);
    setStatus(project.status);

    setShowForm(true);
};
const handleUpdateProject = async () => {

    try {

        await updateProject(editingProject.id, {
            name: name,
            description: description,
            status: status
        });

        const updatedProjects = await getProjects();
        setProjects(updatedProjects);

        setName("");
        setDescription("");
        setStatus("ACTIVE");
        setEditingProject(null);
        setShowForm(false);

    } catch (error) {

        console.error(error);

    }
};
const handleDeleteProject = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
        return;
    }

    try {

        await deleteProject(id);

        const updatedProjects = await getProjects();
        setProjects(updatedProjects);

    } catch (error) {

        console.error(error);

    }
};


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

                <div className="page">

                    <div className="page-header">
                        <div>
                            <h1>Projects</h1>
                            <p>Manage your projects</p>
                        </div>

                        <button
    className="login-button"
    onClick={() => setShowForm(true)}
>
    + Create Project
</button>
                    </div>


                    <div className="project-list">
                        {showForm && (
    <div className="project-card">

        <div>
            <h2>
    {editingProject ? "Edit Project" : "Create Project"}
</h2>

            <input
                type="text"
                placeholder="Project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <textarea
                placeholder="Project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="ACTIVE">ACTIVE</option>
                <option value="COMPLETED">COMPLETED</option>
            </select>

            <div>
               <button
    className="login-button"
    onClick={editingProject ? handleUpdateProject : handleCreateProject}
>
    {editingProject ? "Update" : "Create"}
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

                        {projects.map(project => (
                            <div
                                className="project-card"
                                key={project.id}
                            >

                                <div>
                                    <h2>{project.name}</h2>
                                    <p>{project.description}</p>
                                </div>

                               <div>

    <span className="project-status">
        {project.status}
    </span>

    <button
        className="login-button"
        onClick={() => handleEditProject(project)}
    >
        Edit
    </button>

    <button
        className="logout-button"
        onClick={() => handleDeleteProject(project.id)}
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

export default ManagerProjects;