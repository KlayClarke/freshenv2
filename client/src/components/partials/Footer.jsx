import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <ul>
        <p>Follow us on socials:</p>
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
        &copy; FRESHEN by{" "}
        <a
          href="https://github.com/KlayClarke"
          target="_blank"
          className="bold"
        >
          Klay Clarke
        </a>
        . Here to point you in the right direction.
      </p>
    </footer>
  );
}

export default Footer;
