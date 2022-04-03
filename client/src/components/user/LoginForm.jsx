import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function LoginForm() {
  const [inputValues, setInputValues] = useState({});

  const navigate = useNavigate();

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setInputValues({ ...inputValues, [name]: value });
  }

  async function login(e) {
    e.preventDefault();
    const response = await axios.post("http://localhost:9000/users/login", {
      email: inputValues.email,
      password: inputValues.password,
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
      navigate("../login");
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
