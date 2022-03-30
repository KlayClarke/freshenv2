function Home() {
  return (
    <div className="home-content-wrapper">
      <div className="home-content-container">
        <h1>
          For those struggling to find a reputable barbershop or salon nearby
        </h1>
        <h2>
          As both an assistant and an intermediary, we promise to connect
          trustworthy hairstylists to potential clientele around the world.
        </h2>
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
          <h2>We are currently working to implement the following features:</h2>
          <ul>
            <li>
              <h3>Ability to join and login using Gmail</h3>
            </li>
            <li>
              <h3>Handle scheduling and appointments</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
