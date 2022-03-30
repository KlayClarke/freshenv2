import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
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
          <Link to={"/salons"}>Salons</Link>
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

export default Nav;
