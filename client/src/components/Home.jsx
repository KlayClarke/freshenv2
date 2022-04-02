function Home() {
  return (
    <div className="home-content-wrapper">
      <div className="home-content-container">
        <h1>
          Whether you are a customer searching for a reputable salon or a
          hairstylist searching for new customers, <span>freshen</span> is the
          answer.
        </h1>
        <form action="">
          <a
            href="/join"
            className="button button-l home_get-started-button border-radius-6px"
          >
            Create A New Account
          </a>
          <a
            href="/login"
            className="button button-l home_login-button border-radius-6px"
          >
            Log In Using An Existing Account
          </a>
        </form>
        <div className="home-content-divider"></div>
        <div className="coming-soon-container">
          <h2>Upcoming Features Below:</h2>
          <ul>
            <li>
              <h3>Salon index</h3>
            </li>
            <li>
              <h3>Salon detail page</h3>
            </li>
            <li>
              <h3>Add google maps cluster map to salon index</h3>
            </li>
            <li>
              <h3>Ability to login - session persistence</h3>
            </li>
            <li>
              <h3>Ability to join and login using Gmail</h3>
            </li>
            <li>
              <h3>Ability to handle scheduling and appointments</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
