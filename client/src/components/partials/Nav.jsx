import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to={"/"}> Home</Link>
      <ul>
        <li>
          <Link to={"/salons"}>Index</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
