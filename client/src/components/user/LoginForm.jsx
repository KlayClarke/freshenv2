import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();
    const response = await axios.post("http://localhost:9000/users/login", {
      email,
      password,
    });
    if (response.data.token && response.data.id) {
      localStorage.setItem(
        "freshen_user_data",
        JSON.stringify({
          token: response.data.token,
          id: response.data.id,
        })
      );
      window.location.reload(false);
    } else {
      window.location.reload(false);
    }
  }

  return (
    <div className="login-content-wrapper">
      <div className="login-content-container">
        <button className="auth-login button border-radius-4px">
          <FontAwesomeIcon
            icon={faGoogle}
            className="google-icon"
          ></FontAwesomeIcon>{" "}
          Log in with Google
        </button>
        <form onSubmit={login}>
          <div className="form-section">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
          </div>
          <div className="form-section">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
          </div>
          <button className="auth-form-submit button border-radius-4px">
            Log In
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/join" className="blue">
            Join
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
