import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import RegisterPage from "./RegisterPage";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    }
    if (response.ok) {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Logged in Successfully!");
    } else {
      toast.error("Wrong credentials!");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
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
        <button>Login 🔑</button>
        <p style={{ textAlign: "center" }}>
          Don't have an account ? <Link to={"/register"}>register</Link>
        </p>
      </form>
    </>
  );
}

export default LoginPage;
