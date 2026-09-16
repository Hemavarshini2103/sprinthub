export async function getProjects() {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8088/projects", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
});


    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    return response.json();
}
export async function getTasks() {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8088/tasks", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}
export async function createProject(project) {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8088/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(project)
    });

    if (!response.ok) {
        throw new Error("Failed to create project");
    }

    return response.json();
}
export async function updateProject(id, project) {

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8088/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(project)
    });

    if (!response.ok) {
        throw new Error("Failed to update project");
    }

    return response.json();
}
export async function deleteProject(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8088/projects/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete project");
    }

    return;
}
export async function getUsers() {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8088/users", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
}
export async function createTask(taskData) {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8088/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
}
export async function deleteTask(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8088/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
}
export async function updateTask(id, taskData) {

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8088/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return response.json();
}
export async function updateTaskStatus(id, status) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:8088/tasks/${id}/status?status=${status}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update task status");
    }
}