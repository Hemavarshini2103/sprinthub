import { useState } from "react";
import Dashboard from "./Dashboard";
import ManagerDashboard from "./ManagerDashboard";
import "./Login.css";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async () => {

    if (!email.trim()) {
        setMessage("Email is required");
        return;
    }

    if (!password.trim()) {
        setMessage("Password is required");
        return;
    }

    try {
            const response = await fetch("http://localhost:8088/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.ok) {

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);

    const payload = JSON.parse(
        atob(data.token.split(".")[1])
    );

    localStorage.setItem("role", payload.role);

    setIsLoggedIn(true);

} else {

                setMessage("Invalid email or password");

            }

        } catch (error) {

            setMessage("Unable to connect to server");

        }
    };

    if (isLoggedIn) {

    const role = localStorage.getItem("role");

    if (role === "MANAGER") {
        return <ManagerDashboard />;
    }

    return <Dashboard />;
}

    return (
        <div className="login-page">

            <div className="login-card">

            <div className="logo">
    <div className="logo-mark">S</div>
    <h1>SprintHub</h1>
    <p>Project management made simple</p>
</div>

                <h2>Welcome back</h2>

                <div className="form-group">
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="login-button"
                    onClick={handleLogin}
                >
                    Login
                </button>

                {message && (
                    <p className="error-message">
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
}

export default Login;