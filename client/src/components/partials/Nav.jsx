import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "react-modal";
import JoinModal from "react-modal";

LoginModal.setAppElement("#root");
JoinModal.setAppElement("#root");

function Nav() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  function toggleLoginModal() {
    if (isJoinOpen) {
      setIsJoinOpen(!isJoinOpen);
    }
    setIsLoginOpen(!isLoginOpen);
  }

  function toggleJoinModal() {
    if (isLoginOpen) {
      setIsLoginOpen(!isLoginOpen);
    }
    setIsJoinOpen(!isJoinOpen);
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"} id="header_logo">
            FRESHEN
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
          <Link to={"/login"} onClick={toggleLoginModal}>
            Log In
          </Link>
        </li>
        <li>
          <Link
            to={"/join"}
            onClick={toggleJoinModal}
            className="button button-s header_join-button border-radius-6px"
          >
            Join
          </Link>
        </li>
      </ul>
      <LoginModal
        isOpen={isLoginOpen}
        onRequestClose={toggleLoginModal}
        contentLabel="My dialog"
        portalClassName="login-modal"
        overlayClassName="login-modal-overlay"
      >
        <div>My login modal dialog</div>
        <button onClick={toggleLoginModal}>Close login modal</button>
      </LoginModal>
      <JoinModal
        isOpen={isJoinOpen}
        onRequestClose={toggleJoinModal}
        contentLabel="My dialog"
        portalClassName="join-modal"
        overlayClassName="join-modal-overlay"
      >
        <div>My join modal dialog</div>
        <button onClick={toggleJoinModal}>Close join modal</button>
      </JoinModal>
    </nav>
  );
}

export default Nav;
