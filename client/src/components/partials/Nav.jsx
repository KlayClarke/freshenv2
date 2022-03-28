import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}> Home</Link>
        </li>
        <li>
          <Link to={"/salons"}>Salons</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to={"/login"}>Log In</Link>
        </li>
        <li>
          <Link to={"/join"} className="button button_coral border-radius-10px">
            Join
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
