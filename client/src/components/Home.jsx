import { CirclesWithBar } from "react-loader-spinner";

function Home({ user, loading }) {
  if (loading) {
    return (
      <div className="loading-icon-wrapper">
        <div className="loading-icon centered">
          <CirclesWithBar
            type="Circles"
            color="rgb(1, 102, 255)"
            height={80}
            width={80}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="home-content-wrapper">
      <div className="home-content-container">
        {user ? (
          <h1>
            <span>Welcome back, {user.first_name}!</span>
          </h1>
        ) : (
          ""
        )}
        {!user ? (
          <h1>
            Whether you are a customer searching for a new hairstylist or a
            hairstylist searching for new customers, <span>freshen</span> is the
            answer.
          </h1>
        ) : (
          ""
        )}

        {!user ? (
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
