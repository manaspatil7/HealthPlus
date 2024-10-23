import React, { useState } from "react";
import { auth, provider } from "../firebase"; // Import auth and Google provider
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import "../Styles/Login.css"; // Importing the CSS
import GoogleLogo from "../Assets/google-logo.png"; // Import Google logo image

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Email validation function
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Validate email format before proceeding
        if (!isValidEmail(email)) {
            toast.error("Invalid email format.");
            setLoading(false);
            return;
        }

        console.log("Attempting to log in with email:", email); // Debugging log

        try {
            // Attempt to sign in with email and password
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully");
            navigate("/"); // Redirect to home after successful login
        } catch (error) {
            console.log("Login error:", error); // Debugging log
            let errorMessage = "Error logging in with email:";
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "Invalid email format.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No user found with this email.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Incorrect password.";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "User account is disabled.";
                    break;
                default:
                    errorMessage = "An error occurred: " + error.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            toast.success("Logged in successfully with Google");
            navigate("/"); // Redirect to home after successful login
        } catch (error) {
            toast.error("Error logging in with Google: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome to Health +</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="login-divider">OR</div>
                <button onClick={handleGoogleLogin} className="google-btn" disabled={loading}>
                    <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
                    {loading ? "Logging in..." : "Login with Google"}
                </button>
                <div className="login-footer">
                    Don't have an account? 
                    <span className="login-switch" onClick={() => navigate("/signup")}>
                        Sign Up
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
