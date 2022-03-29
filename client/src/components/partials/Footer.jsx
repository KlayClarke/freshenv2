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
        <li>
          <a href="#">
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
        <a href="#" className="bold">
          Klay Clarke
        </a>
        . For those struggling to find a barber or hairstylist they can trust.
      </p>
    </footer>
  );
}

export default Footer;
