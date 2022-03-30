import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function LoginForm() {
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
        <form action="">
          <div className="form-section">
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" id="email" />
            <br />
          </div>
          <div className="form-section">
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password" />
            <br />
          </div>
          <button className="auth-form-submit button border-radius-4px">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
