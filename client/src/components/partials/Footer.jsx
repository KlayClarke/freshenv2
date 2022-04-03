import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer({ loading }) {
  if (loading) {
    return <div></div>;
  }
  return (
    <footer>
      <ul>
        <p className="social-media-text">Follow us on socials:</p>
        <li>
          <a href="https://github.com/KlayClarke/freshenv2" target="_blank">
            <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </a>
        </li>
      </ul>
      <p>
        &copy; freshen by{" "}
        <a
          href="https://github.com/KlayClarke"
          target="_blank"
          className="blue"
        >
          Klay Clarke
        </a>
      </p>
    </footer>
  );
}

export default Footer;
