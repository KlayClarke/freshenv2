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
        <form action="">
          <div className="form-section">
            <label htmlFor="first-name">First Name</label>
            <br />
            <input type="text" id="first-name" />
            <br />
          </div>
          <div className="form-section">
            <label htmlFor="last-name">Last Name</label>
            <br />
            <input type="text" id="last-name" />
            <br />
          </div>
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
