import { useState, useEffect, useRef } from "react";

function Home() {
  return (
    <div className="home-content-container">
      <h1>
        FOR THOSE STRUGGLING TO FIND A TRUSTWORTHY BARBERSHOP OR SALON NEARBY
      </h1>
      <h2>
        Freshen serves as both an assistant and an intermediary - connecting
        trustworthy hairstylists to potential clientele across the nation.
      </h2>
      <form action="">
        <a
          href="/join"
          className="button button-l home_get-started-button border-radius-6px"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="button button-l home_login-button border-radius-6px"
        >
          Log In
        </a>
      </form>
      <div className="coming-soon-container">
        <h2>We are currently working to implement the following features:</h2>
        <ul>
          <li>
            <h3>Overall webpage styling</h3>
          </li>
          <li>
            <h3>Login and Join Form styling</h3>
          </li>
          <li>
            <h3>Ability to Join using gmail</h3>
          </li>
          <li>
            <h3>Salon index page styling</h3>
          </li>
          <li>
            <h3>Salon detail page styling</h3>
          </li>
          <li>
            <h3>Scheduling and appointment handling</h3>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
