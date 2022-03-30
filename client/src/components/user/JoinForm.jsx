import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function JoinForm() {
  return (
    <div className="join-content-wrapper">
      <div className="join-content-container">
        <button className="auth-join button border-radius-4px">
          <FontAwesomeIcon
            icon={faGoogle}
            className="google-icon"
          ></FontAwesomeIcon>{" "}
          Join with Google
        </button>
        <form action="http://localhost:9000/users" method="POST">
          <div className="form-section">
            <label htmlFor="first_name">First Name</label>
            <br />
            <input type="text" id="first_name" name="first_name" />
            <br />
          </div>
          <div className="form-section">
            <label htmlFor="last_name">Last Name</label>
            <br />
            <input type="text" id="last_name" name="last_name" />
            <br />
          </div>
          <div className="form-section">
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" id="email" name="email" />
            <br />
          </div>
          <div className="form-section">
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password" name="password" />
            <br />
          </div>
          <button className="auth-form-submit button border-radius-4px">
            Join
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <a href="/login" className="blue">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default JoinForm;
