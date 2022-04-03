import { useState } from "react";
import { Link } from "react-router-dom";

function Nav({ isLoggedIn }) {
  if (isLoggedIn == true) {
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
            <Link to={"/explore"}>Explore</Link>
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
            <Link
              to={"/logout"}
              className="button button-s header_join-button border-radius-6px"
            >
              Logout
            </Link>
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
            <Link to={"/explore"}>Explore</Link>
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
