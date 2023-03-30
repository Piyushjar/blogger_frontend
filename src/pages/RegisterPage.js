import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginPage from "./LoginPage";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      setRedirect(true);
      toast.success("Registered Successfully!");
    } else {
      toast.error("Registration failed.");
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register 📓</button>
      <p style={{ textAlign: "center" }}>
        Already have an account ? <Link to={"/login"}>login</Link>
      </p>
    </form>
  );
}

export default RegisterPage;
