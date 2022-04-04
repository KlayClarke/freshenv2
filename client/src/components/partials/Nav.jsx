import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav({ user, loading }) {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("freshen_user_data");
    navigate("../");
    window.location.reload(false);
  }
  if (loading) {
    return <div></div>;
  }

  if (user) {
    return (
      <nav>
        <ul>
          <li>
            <Link to={"/"} id="header_logo">
              freshen
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"/salons"}>Explore</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <span className="divider"></span>
          </li>
          <li>
            <Link to={"/account"}>Account</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="button button-s header_join-button border-radius-6px"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>
            <Link to={"/"} id="header_logo">
              freshen
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"/salons"}>Explore</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <span className="divider"></span>
          </li>
          <li>
            <Link to={"/login"}>Log In</Link>
          </li>
          <li>
            <Link
              to={"/join"}
              className="button button-s header_join-button border-radius-6px"
            >
              Join
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
